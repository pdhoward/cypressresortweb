"use client";

import React, { useEffect, useState } from "react";

type ConsentCategory = "necessary" | "functional" | "analytics" | "marketing";

interface ConsentState {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  lastUpdated?: string;
  consentType?: "accept_all" | "reject_non_essential" | "custom";
  consentVersion?: string;
}

const STORAGE_KEY = "cookieConsent_v1";
const CONSENT_VERSION = "1.0.0";

declare global {
  interface Window {
    cookieConsent?: ConsentState;
    cookieConsentManager?: {
      getConsent: () => ConsentState | null;
      hasConsent: (category: ConsentCategory) => boolean;
      open: () => void;
      clearConsent: () => void;
    };
  }
}

const defaultConsent: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function persistConsent(consent: ConsentState): ConsentState {
  if (typeof window === "undefined") return consent;

  const record: ConsentState = {
    ...consent,
    necessary: true,
    lastUpdated: new Date().toISOString(),
    consentVersion: CONSENT_VERSION,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // ignore
  }

  try {
    const cookieValue = encodeURIComponent(
      JSON.stringify({
        necessary: true,
        functional: record.functional,
        analytics: record.analytics,
        marketing: record.marketing,
        lastUpdated: record.lastUpdated,
        consentVersion: record.consentVersion,
      })
    );

    document.cookie =
      "cookie_consent=" +
      cookieValue +
      "; path=/; max-age=" +
      60 * 60 * 24 * 365 +
      "; SameSite=Lax";
  } catch {
    // ignore
  }

  window.cookieConsent = record;
  return record;
}

export const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [open, setOpen] = useState(false);

  // Init from storage on client
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      window.cookieConsent = stored;
      setOpen(false);
    } else {
      // First visit -> show modal
      setConsent(defaultConsent);
      window.cookieConsent = defaultConsent;
      setOpen(true);
    }

    // Expose global manager
    window.cookieConsentManager = {
      getConsent: () => window.cookieConsent ?? readStoredConsent(),
      hasConsent: (category: ConsentCategory) => {
        const c = window.cookieConsent ?? readStoredConsent();
        if (!c) return false;
        if (category === "necessary") return true;
        return !!c[category];
      },
      open: () => setOpen(true),
      clearConsent: () => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(STORAGE_KEY);
        document.cookie = "cookie_consent=; Max-Age=0; path=/";
        const reset = { ...defaultConsent };
        window.cookieConsent = reset;
        setConsent(reset);
        setOpen(true);
      },
    };
  }, []);

  if (!consent) return null; // still hydrating / SSR

  const updateCategory = (category: Exclude<ConsentCategory, "necessary">, value: boolean) => {
    setConsent((prev) =>
      prev
        ? {
            ...prev,
            [category]: value,
          }
        : {
            ...defaultConsent,
            [category]: value,
          }
    );
  };

  const applyAndClose = (next: ConsentState, consentType: ConsentState["consentType"]) => {
    const record = persistConsent({ ...next, consentType });
    setConsent(record);
    setOpen(false);
  };

  const handleAcceptAll = () => {
    const allOn: ConsentState = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      consentType: "accept_all",
      consentVersion: CONSENT_VERSION,
      lastUpdated: new Date().toISOString(),
    };
    applyAndClose(allOn, "accept_all");
  };

  const handleRejectNonEssential = () => {
    const allOff: ConsentState = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      consentType: "reject_non_essential",
      consentVersion: CONSENT_VERSION,
      lastUpdated: new Date().toISOString(),
    };
    applyAndClose(allOff, "reject_non_essential");
  };

  const handleSave = () => {
    const c: ConsentState = {
      ...(consent ?? defaultConsent),
      necessary: true,
      consentType: "custom",
      consentVersion: CONSENT_VERSION,
      lastUpdated: new Date().toISOString(),
    };
    applyAndClose(c, "custom");
  };

return (
  <>
    {/* Floating reopen button */}
    <button
      type="button"
      className="fixed bottom-4 right-4 z-[9998] rounded-full border border-gray-300 px-4 py-2 text-xs font-medium shadow-md hover:bg-gray-800"
      onClick={() => setOpen(true)}
    >
      Cookie &amp; Privacy Settings
    </button>

    {/* Modal */}
    {open && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-modal-title"
      >
        <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-lg bg-white font-sans shadow-xl">
          {/* Header */}
          <div className="border-b px-4 pb-3 pt-4">
            <h2 id="cc-modal-title" className="text-base font-semibold">
              Privacy &amp; Cookie Settings
            </h2>
            <p className="mt-1 text-xs text-gray-700">
              We use cookies to run this site and understand usage. You can choose which optional
              cookies to allow. Strictly necessary cookies are always on.
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
            <div className="space-y-3">
              {/* Necessary */}
              <div className="flex gap-3 border-b pb-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Strictly necessary</div>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Core functions like security, navigation, and saving your choices. Without
                    these, the site may not work.
                  </p>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                    Always on
                  </span>
                </div>
              </div>

              {/* Functional */}
              <div className="flex gap-3 border-b pb-3 pt-1">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Functional</div>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Remember preferences (e.g. language, region). Site still works if off, but you
                    may need to re-set options.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex h-5 w-10 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={!!consent.functional}
                      onChange={(e) => updateCategory("functional", e.target.checked)}
                      aria-label="Functional cookies"
                    />
                    <span className="h-5 w-10 rounded-full bg-gray-300 transition peer-checked:bg-blue-600" />
                    <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex gap-3 border-b pb-3 pt-1">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Analytics</div>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Help us understand how the site is used so we can improve it. Site still works
                    if off.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex h-5 w-10 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={!!consent.analytics}
                      onChange={(e) => updateCategory("analytics", e.target.checked)}
                      aria-label="Analytics cookies"
                    />
                    <span className="h-5 w-10 rounded-full bg-gray-300 transition peer-checked:bg-blue-600" />
                    <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex gap-3 pt-1">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Advertising &amp; marketing</div>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Used for more relevant ads and measuring campaigns. May involve sharing data
                    with advertising partners. You may still see ads if off, but they&apos;ll be
                    less tailored.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex h-5 w-10 cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={!!consent.marketing}
                      onChange={(e) => updateCategory("marketing", e.target.checked)}
                      aria-label="Advertising and marketing cookies"
                    />
                    <span className="h-5 w-10 rounded-full bg-gray-300 transition peer-checked:bg-blue-600" />
                    <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed footer inside modal */}
          <div className="border-t px-4 py-3 text-[11px] text-gray-600">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex-1">
                View our{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Privacy Policy
                </a>{" "}
                for more details and your rights.
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  className="rounded-full border border-red-600 bg-white px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  onClick={handleRejectNonEssential}
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-medium hover:bg-gray-200"
                  onClick={handleSave}
                >
                  Save choices
                </button>
                <button
                  type="button"
                  className="rounded-full border border-blue-700 bg-blue-700 px-3 py-1 text-xs font-medium text-white hover:bg-blue-800"
                  onClick={handleAcceptAll}
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

};
