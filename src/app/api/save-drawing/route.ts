export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { image, userId, drawingId } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'kidokulture_drawings',
    });

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('kidokulture');
    const result = await db.collection('drawings').insertOne({
      userId,
      drawingId,
      imageUrl: uploadResponse.secure_url,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, drawingId: result.insertedId });
  } catch (error) {
    console.error('Error saving drawing:', error);
    return NextResponse.json({ error: 'Failed to save drawing' }, { status: 500 });
  }
}
