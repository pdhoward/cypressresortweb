import { NextResponse } from 'next/server';
import getMongoConnection from "@/db/connections";
import { getMongoSecrets } from "@/app/api/_lib/ids";


export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const uri = process.env.DB || ""; // e.g., mongodb+srv://...
  const dbName = process.env.WEBDBNAME || ""; // e.g., website 
  
  try {
     const resolvedParams = await params;
     const id = resolvedParams.id;
     const { uri, dbName } = await getMongoSecrets()
    const { db } = await getMongoConnection(uri, dbName);
    const collection = db.collection('villas');
    const result = await collection.updateOne(
      { id: id },
      { $inc: { likes: 1 } } // Increment likes by 1
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Villa not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Like updated' });
  } catch (error) {
    console.error('Error updating like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}