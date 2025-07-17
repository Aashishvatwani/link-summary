import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Clear the token cookie to log out the user
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('token', '', { maxAge: 0, path: '/' });
    return response;
  } catch (err) {
    console.error('POST /auth/logout error:', err);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
