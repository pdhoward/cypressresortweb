// components/security/access-gate.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  LockKeyhole,
  Mail,
  RotateCcw,
  LogOut,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { decodeJwt } from "jose";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context"; 
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const MotionHelpCircle = motion.create(HelpCircle);

import {
  DISCLAIMER_TEXT,
  DISCLAIMER_TITLE,
} from "@/assets/disclaimers/20251030";

type Stage = "email" | "otp" | "done";
type VisualState = "default" | "error" | "success";

export function AccessGate() {
  const {
    isAuthenticated,
    user,
    token,
    setToken,
    setIsAuthenticated,
    setUser,
    signout,
  } = useAuth();

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [otp, setOtp] = useState("");
  const isSix = /^\d{6}$/.test(otp);

  const [challengeToken, setChallengeToken] = useState<string | null>(null);

  const [cooldown, setCooldown] = useState(0);

  const isAuthed = useMemo(
    () => isAuthenticated || Boolean(token),
    [isAuthenticated, token],
  );

  const decodedEmail = useMemo(() => {
    if (!token) return null;
    try {
      const claims = decodeJwt(token) as { email?: string };
      return claims.email ?? null;
    } catch {
      return null;
    }
  }, [token]);

  // any page can open the access gate programmatically
  // see lib/access-gate for companion function

  useEffect(() => {
    // Preferred: direct global function (no timing issues)
    (window as any).__openAccessGate = () => setOpen(true);

    // Back-compat: custom event
    const onOpen = () => setOpen(true);
    window.addEventListener('open-access-gate', onOpen);

    return () => {
      delete (window as any).__openAccessGate;
      window.removeEventListener('open-access-gate', onOpen);
    };
  }, []);


  useEffect(() => {
    if (isAuthed) {
      setStage("done");
    } else {
      setStage("email");
    }
  }, [isAuthed]);

  // Auto-verify once 6 digits entered
  useEffect(() => {
    if (stage === "otp" && isSix && !verifying) {
      verify(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, stage]);

  // countdown effect for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const visualState: VisualState = error
    ? "error"
    : stage === "done"
    ? "success"
    : "default";

  function maskEmail(v: string | null) {
    if (!v) return "";
    const [userPart, domain] = v.split("@");
    if (!userPart || !domain) return v;
    const maskedUser =
      userPart.length <= 2
        ? userPart[0] + "*"
        : userPart[0] +
          "*".repeat(userPart.length - 2) +
          userPart[userPart.length - 1];
    return `${maskedUser}@${domain}`;
  }

  async function sendEmail() {
    setError(null);
    setSending(true);
    try {
      const userId = email;
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email, user: userId }), // user-based, no tenantId
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Email failed");
      setChallengeToken(data.challengeToken);
      setStage("otp");
      setOtp("");
      setCooldown(30);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  async function verify(code: string) {
    if (!challengeToken) return;
    setError(null);
    setVerifying(true);
    try {
      const userId = email;
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, code, challengeToken, user: userId  }), // user-based
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Verification failed");

      // session cookie is set server-side; mirror in context
      if (data.sessionToken) {
        setToken(data.sessionToken);
        setIsAuthenticated(true);

        const resolvedEmail =
          data.email ?? email ?? decodedEmail ?? user?.email ?? null;
        if (resolvedEmail) {
          setUser({ email: resolvedEmail });
        }
      }

      // let the rest of the app know
      window.dispatchEvent(new CustomEvent("auth-updated"));

      setStage("done");
      setTimeout(() => setOpen(false), 600);
    } catch (e: any) {
      setError(e.message);
      setOtp("");
    } finally {
      setVerifying(false);
    }
  }

  async function handleSignOut() {
    setError(null);
    setSigningOut(true);
    try {     
      await signout(); // context signout handles /api/auth/signout + broadcasting
    } catch {
      // ignore; context still clears local state
    } finally {
      setSigningOut(false);
      setStage("email");
      setOtp("");
      setEmail("");
      setError(null);
      setChallengeToken(null);
      setCooldown(0);
      setOpen(false);
    }
  }

  function onEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && email && !sending) {
      e.preventDefault();
      sendEmail();
    }
  }

  const signedInAs =
    user?.email || email || decodedEmail || null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
     <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={isAuthed ? "Guest access (signed in)" : "Open guest access"}
          className="
            inline-flex items-center gap-2
            text-[0.75rem] tracking-[0.28em] uppercase
            font-medium
            text-foreground/70 hover:text-foreground
            transition-colors duration-200
            focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60
          "
        >
         {isAuthed ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">Signed in</span>
          </>
        ) : (
          <>
            <LockKeyhole className="h-3.5 w-3.5 text-white/80 md:text-foreground/60" />
            <span className="hidden md:inline">Guest access</span>
          </>
        )}

        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[22rem] p-4" align="end">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
           <LockKeyhole className="h-4 w-4 text-emerald-500" />
            <p className="text-sm font-medium">
              {stage === "done" ? "Guest Access Activated" : "Activate Guest Access"}
            </p>


            {/* Disclaimer icon with nested popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  aria-label="View disclaimer"
                >
                  <MotionHelpCircle
                    className="h-4 w-4 text-muted-foreground"
                    animate={{
                      color: ["#6b7280", "#10b981", "#6b7280"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <h3 className="text-sm font-medium mb-2">
                  {DISCLAIMER_TITLE}
                </h3>
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  {DISCLAIMER_TEXT}
                </p>
              </PopoverContent>
            </Popover>
          </div>

          <AnimatePresence mode="wait">
            {stage === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-3"
              >
                <p className="text-xs text-muted-foreground">
                  Enter your email to receive a 6-digit code.
                </p>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="pl-8 h-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={onEmailKeyDown}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={sendEmail}
                    disabled={!email || sending}
                  >
                    {sending ? "Sending…" : "Send code"}
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-3"
              >
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium">{maskEmail(email)}</span>.
                </p>

                <div className="flex items-center gap-2">
                  <InputOTP
                    aria-label="Enter 6-digit code"
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}                   
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} state={visualState as any} />
                      <InputOTPSlot index={1} state={visualState as any} />
                      <InputOTPSlot index={2} state={visualState as any} />
                      <InputOTPSeparator className="mx-1 opacity-60" />
                      <InputOTPSlot index={3} state={visualState as any} />
                      <InputOTPSlot index={4} state={visualState as any} />
                      <InputOTPSlot index={5} state={visualState as any} />
                    </InputOTPGroup>
                  </InputOTP>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    title={
                      cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"
                    }
                    onClick={sendEmail}
                    disabled={cooldown > 0 || sending}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setStage("email");
                      setOtp("");
                      setError(null);
                    }}
                    disabled={verifying}
                  >
                    Use a different email
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => isSix && !verifying && verify(otp)}
                    disabled={!isSix || verifying}
                  >
                    {verifying ? "Verifying…" : "Verify"}
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-3"
              >
                {signedInAs && (
                  <p className="text-xs text-muted-foreground">
                    Signed in as{" "}
                    <span className="font-medium">
                      {maskEmail(signedInAs)}
                    </span>
                  </p>
                )}

                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Access granted</span>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="inline-flex items-center gap-2"
                  >
                    {signingOut ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing out…
                      </>
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="text-[11px] text-red-500 font-medium">{error}</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
