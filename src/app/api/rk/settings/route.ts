import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('kidokulture');
    const settings = await db.collection('settings').findOne({ type: 'game_visibility' });
    
    if (!settings) {
      // Default state if not found
      return NextResponse.json({ 
        activeGames: {
          'ColoringSuite': true, 'SoundExplorer': true, 'BubblePopMath': true,
          'ShadowMatch': true, 'HungryCaterpillar': true, 'LetterTrace': true,
          'SinkOrFloat': true, 'SeedToFlower': true, 'MixTheColors': true
        } 
      });
    }

    return NextResponse.json(settings);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('kidokulture');
    
    await db.collection('settings').updateOne(
      { type: 'game_visibility' },
      { $set: { activeGames: body.activeGames } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
