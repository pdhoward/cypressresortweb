// src/app/api/contact/route.ts

//////////////////////////////////////////////////
//  This route updates the user profile - when //
//  user email is in the db and  verified    //
//////////////////////////////////////////////
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import getMongoConnection from '@/db/connections';
import { getMongoSecrets } from '@/app/api/_lib/ids';

type ContactBody = {
  email: string;
  name?: string;
  title?: string;
  company?: string;
  phone?: string;
  interest?: string;
  subscriptions?: unknown; // tighten if you know the shape
};

export async function POST(request: Request) {
  const { uri, dbName } = await getMongoSecrets();
  const { db } = await getMongoConnection(uri, dbName);

  try {
    // 1) Auth via signed cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('machine_session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Fail fast if misconfigured
      console.error('JWT_SECRET is not set');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const decodedEmail = (payload as JWTPayload & { email?: string }).email;
    if (!decodedEmail) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2) Parse & validate body (lightweight; consider zod/yup for strict typing)
    const data = (await request.json()) as ContactBody;
    if (!data?.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (data.email !== decodedEmail) {
      return NextResponse.json(
        { error: 'Email does not match authenticated user' },
        { status: 403 }
      );
    }

    const users = db.collection('users');
    const auth = db.collection('auth');

    // 3) Ensure this user is verified in your auth store
    const verifiedUser = await auth.findOne({ email: decodedEmail /*, isVerified: true */ });
    if (!verifiedUser) {
      return NextResponse.json(
        { message: 'Application Error - User not found', exists: false },
        { status: 404 }
      );
    }

    // 4) Build the update doc
    // Only set fields that were provided; avoid overwriting with undefined
    const toSet: Record<string, unknown> = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.title !== undefined && { title: data.title }),
      ...(data.company !== undefined && { company: data.company }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.interest !== undefined && { interest: data.interest }),
      ...(data.subscriptions !== undefined && { subscriptions: data.subscriptions }),
      isVerified: true,
      updatedAt: new Date(),
    };

    // 5) Upsert so first-time submissions create the document
    const res = await users.updateOne(
      { email: decodedEmail },
      {
        $set: toSet,
        $setOnInsert: {
          email: decodedEmail,
          createdAt: new Date(),
        },
        // If the doc exists and had verification scaffolding, drop it.
        // On first insert, $unset is ignored (harmless).
        $unset: {
          verificationCode: '',
          expiresAt: '',
        },
      },
      { upsert: true }
    );

    // 6) Friendly response depending on whether we inserted or just updated
    const created = Boolean(res.upsertedCount && res.upsertedId);
    return NextResponse.json(
      {
        message: created ? 'Contact created' : 'Contact information saved',
        created,
        exists: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
