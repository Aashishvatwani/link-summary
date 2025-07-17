import dbConnect from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { fetchMetadata } from '@/lib/fetchMetadata';
import { getSummary } from '@/lib/summary';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
type JwtPayload = {
  userId: string;
  email?: string; // optional, if present
};
// GET /api/bookmarks
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const bookmarks = await Bookmark.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json(bookmarks);
  } catch (err) {
    console.error('GET /bookmarks error:', err);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

// POST /api/bookmarks
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { url } = await req.json();
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const { title, favicon } = await fetchMetadata(url);
    const summary = await getSummary(url);

    const bookmark = await Bookmark.create({ userId, url, title, favicon, summary });
    return NextResponse.json(bookmark);
  } catch (err) {
    console.error('POST /bookmarks error:', err);
    return NextResponse.json({ error: 'Bookmark creation failed' }, { status: 500 });
  }
}
