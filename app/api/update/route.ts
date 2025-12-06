// src/app/api/update/route.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import getMongoConnection from "@/db/connections";
import { getMongoSecrets } from "@/app/api/_lib/ids";


//////////////////////////////////////////////
//  triggered by the user to edit profile  //
////////////////////////////////////////////

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
    const data = await request.json();    

    if (data.email !== decodedEmail) {
      return NextResponse.json({ error: 'Email does not match authenticated user' }, { status: 403 });
    }    
    
    const collection = db.collection('users');

    const user = await collection.findOne({ email: decodedEmail });

    if (!user ) {
      return NextResponse.json({ error: 'Application Error - User Not on File' }, { status: 404 });
    }

    await collection.updateOne(
      { email: decodedEmail },
      {
        $set: {
          name: data.name,
          title: data.title,
          company: data.company,
          phone: data.phone,
          interest: data.interest,
          subscriptions: data.subscriptions,
          isVerified: true,
          verificationCode: null,
          codeExpires: null,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } 
}