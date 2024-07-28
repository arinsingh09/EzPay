import React from 'react';
import { BalanceCard } from '../../../components/BalanceCard';
import { OnRampTransactions } from '../../../components/OnRampTransactions';
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    // User is not logged in, return default balance values
    return { amount: 0, locked: 0 };
  }

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id)
    }
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    // User is not logged in, return an empty array
    return [];
  }

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id)
    }
  });
  return txns.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

export default async function Dashboard() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
}