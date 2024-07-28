import { NextRequest, NextResponse } from 'next/server';
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { recipientPhone, amount } = await req.json();

    if (!recipientPhone || !amount || amount <= 0) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    try {
        const recipient = await prisma.user.findFirst({
            where: { number: recipientPhone }
        });

        if (!recipient) {
            return NextResponse.json({ message: 'Recipient not found' }, { status: 404 });
        }

        const result = await prisma.$transaction(async (prisma) => {
            const senderBalance = await prisma.balance.update({
                where: { userId: Number(session.user.id) },
                data: { amount: { decrement: amount } },
            });

            const recipientBalance = await prisma.balance.update({
                where: { userId: recipient.id },
                data: { amount: { increment: amount } },
            });

            await prisma.p2pTransfer.create({
                data: {
                    fromUserId: Number(session.user.id),
                    toUserId: recipient.id,
                    amount: amount,
                    timestamp: new Date(),
                },
            });

            return { senderBalance, recipientBalance };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Transfer error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Allow': 'POST, OPTIONS',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Origin': '*', // Adjust as needed for security
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}