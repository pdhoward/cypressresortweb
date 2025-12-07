// app/api/auth/signout/route.ts
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { sha256Hex } from "@/app/api/_lib/ids";
import getMongoConnection from "@/db/connections";
import { getMongoSecrets } from "@/app/api/_lib/ids";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const c = await cookies();

  // Read the same cookie your session code uses
  const token = c.get("cypress_session")?.value || null;

  // Always clear both (defensive, covers any legacy cookie)
  const clear = (name: string) =>
    c.set(name, "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

  clear("cypress_session"); 

  // If no token, just succeed (idempotent)
  if (!token) {
    return NextResponse.json({ ok: true });
  }

  // Optional decode for logging/analytics only — no tenantId needed
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    // ignore verification failure; we still treat signout as success
  }

  // Best-effort: close any active OTP session that used this token hash
  try {
    const { uri, dbName } = await getMongoSecrets()
    const tokenHash = sha256Hex(token);
    const { db } = await getMongoConnection(uri, dbName);
    const now = new Date();

    const doc = await db.collection("auth").findOne({
      kind: "otp_session",
      sessionTokenHash: tokenHash,
      status: "active",
    });

    if (doc) {
      const started = doc.sessionIssuedAt ? new Date(doc.sessionIssuedAt) : now;
      const durationSec = Math.max(0, Math.floor((now.getTime() - started.getTime()) / 1000));
      await db.collection("auth").updateOne(
        { _id: doc._id },
        {
          $set: {
            status: "ended",
            sessionEndedAt: now,
            durationSec,
            lastSeenAt: now,
          },
        }
      );
    }
  } catch {
    // swallow DB errors; cookie is already cleared
  }

  return NextResponse.json({ ok: true });
}
