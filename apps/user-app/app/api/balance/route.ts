import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import prisma from "@repo/db/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const balance = await prisma.balance.findUnique({
      where: { userId: Number(session.user.id) }
    });

    if (!balance) {
      return NextResponse.json({ message: 'Balance not found' }, { status: 404 });
    }

    return NextResponse.json({ balance: balance.amount });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}