import React from "react";
import { Card } from "@repo/ui/card";

interface Transaction {
  time: Date;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
}

export const OnRampTransactions: React.FC<OnRampTransactionsProps> = ({ transactions }) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8 text-gray-500">No recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((t, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <div>
              <div className="font-medium">Received INR</div>
              <div className="text-sm text-gray-500">{t.time.toDateString()}</div>
            </div>
            <div className="text-lg font-semibold text-green-600">+ ₹{(t.amount / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};