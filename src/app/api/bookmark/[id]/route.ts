import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';

export async function DELETE(
  req: NextRequest
) {
  await dbConnect();

  // Extract id from the URL pathname
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Bookmark ID is required' }, { status: 400 });
  }

  try {
    const deleted = await Bookmark.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bookmark deleted successfully' });
  } catch (error) { // Added 'any' for err type for broader compatibility
    console.error('DELETE /api/bookmark/[id] error:', error);
   return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500})
  }
}
