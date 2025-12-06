// src/app/api/user/data/route.ts
import { NextResponse } from 'next/server';
import getMongoConnection from "@/db/connections";
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getMongoSecrets } from "@/app/api/_lib/ids";

const uri = process.env.DB || '';

export async function POST(request: Request) {
 
  const { uri, dbName } = await getMongoSecrets()
  try {
    const { db } = await getMongoConnection(uri, dbName);
    const cookieStore = await cookies();
    const token = cookieStore.get('machine_session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || ''));
    const decodedEmail = payload.email as string;

    const { email } = await request.json();

    if (email !== decodedEmail) {
      return NextResponse.json({ error: 'Email does not match authenticated user' }, { status: 403 });
    }    
    
    const collection = db.collection('users');

    const user = await collection.findOne({ email });    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } 
}