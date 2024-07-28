import React from "react";
import { Card } from "@repo/ui/card";

interface BalanceCardProps {
  amount: number;
  locked: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ amount, locked }) => {
  return (
    <Card title="Balance" className="text-black bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="space-y-4 text-white">
        <div className="flex justify-between items-center">
          <span>Unlocked balance</span>
          <span className="text-2xl font-bold">{(amount / 100).toFixed(2)} INR</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Locked balance</span>
          <span className="text-2xl font-bold">{(locked / 100).toFixed(2)} INR</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/20">
          <span>Total Balance</span>
          <span className="text-3xl font-bold">{((amount + locked) / 100).toFixed(2)} INR</span>
        </div>
      </div>
    </Card>
  );
};