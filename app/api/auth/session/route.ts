// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const t = cookieStore.get("cypress_session")?.value;
  if (!t) return NextResponse.json({ token: null, email: null, exp: null }, { status: 200 });

  try {
    const payload = jwt.verify(t, JWT_SECRET) as any;
    return NextResponse.json(
      {
        token: t,
        email: payload?.email ?? null,
        exp: payload?.exp ?? null,
      },
      { status: 200 }
    );
  } catch {
    // Last resort: non-trusting decode just to gently show an email if present
    try {
      const payload = jwt.decode(t) as any;
      return NextResponse.json(
        {
          token: null,
          email: payload?.email ?? null,
          exp: payload?.exp ?? null,
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ token: null, email: null, exp: null }, { status: 200 });
    }
  }
}
