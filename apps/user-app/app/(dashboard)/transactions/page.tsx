import React from 'react';
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getAllTransactions() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    // User is not logged in, return an empty array
    return [];
  }

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id)
    },
    orderBy: {
      startTime: 'desc'
    }
  });
  return txns.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

export default async function Transactions() {
  const transactions = await getAllTransactions();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
      <OnRampTransactions transactions={transactions} />
    </div>
  );
}