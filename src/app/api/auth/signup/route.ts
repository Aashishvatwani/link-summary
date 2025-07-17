import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  return NextResponse.json({ message: 'User created', user });
}
