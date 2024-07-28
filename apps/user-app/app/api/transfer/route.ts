import { NextRequest, NextResponse } from 'next/server';
import { p2pTransfer } from '../../lib/actions/p2pTransfer';

export async function POST(req: NextRequest) {
    const { to, amount } = await req.json();
    const result = await p2pTransfer(to, amount);
    return NextResponse.json(result);
}