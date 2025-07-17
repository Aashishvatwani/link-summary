import dbConnect from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Bookmark ID is required' }, { status: 400 });
  }

  try {
    const deleted = await Bookmark.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/bookmark/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
  }
}
