import { NextResponse } from 'next/server'
import getMongoConnection from "@/db/connections";
import { getMongoSecrets } from "@/app/api/_lib/ids";

export async function GET() {  

  const { uri, dbName } = await getMongoSecrets()
  const { db } = await getMongoConnection(uri, dbName);
  const collection = db.collection('villas'); 

  try {
    
    const villas = await collection.find({}).toArray();
    return NextResponse.json(villas);
  } catch (error) {
    console.error('Error fetching villas:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}