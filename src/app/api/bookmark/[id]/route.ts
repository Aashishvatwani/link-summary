// app/api/bookmarks/[id]/route.ts

import dbConnect from '@/lib/db';
import Bookmark from '@/lib/models/Bookmark';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    await Bookmark.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /bookmarks/:id error:', err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
