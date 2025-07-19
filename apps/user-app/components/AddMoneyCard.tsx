"use client"

import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { useSession, signIn } from "next-auth/react";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

export const AddMoney: React.FC = () => {
  const { data: session, status } = useSession();
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  const [transactionInfo, setTransactionInfo] = useState<{
    token: string;
    userId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddMoney = async () => {
    setError(null);
    setTransactionInfo(null);
    
    try {
      const result = await createOnRampTransaction(provider, value);
      console.log("Transaction result:", result);
      
      if (result.token) {
        setTransactionInfo({
          token: result.token,
          userId: result.userId,
          amount: result.amount
        });
      } else if (result.message) {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      setError("Failed to create transaction");
    }
  };

  if (status === "loading") {
    return (
      <Card title="Add Money">
        <div className="text-center py-4">Loading...</div>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Card title="Add Money">
        <div className="text-center py-4">
          <p className="mb-4">You need to be logged in to add money.</p>
          <Button onClick={() => signIn()} className="bg-purple-600 text-white hover:bg-purple-700">
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Add Money">
      <div className="space-y-4">
        {session && (
          <div className="p-2 bg-green-100 rounded text-sm">
            ✓ Logged in as: {session.user?.email || session.user?.name || "User"} (ID: {(session.user as any)?.id})
          </div>
        )}
        
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(val) => setValue(Number(val))}
          type="number"
        />
        <Select
          label="Select Bank"
          onSelect={(value) => {
            const bank = SUPPORTED_BANKS.find(x => x.name === value);
            setRedirectUrl(bank?.redirectUrl || "");
            setProvider(bank?.name || "");
          }}
          options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
          }))}
        />
        <Button
          onClick={handleAddMoney}
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Add Money
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
            <h3 className="font-bold text-red-800">Error:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {transactionInfo && (
          <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
            <h3 className="font-bold text-lg mb-3">For Postman onramp transaction approval</h3>
            <div className="space-y-2">
              <div><strong>User ID:</strong> {transactionInfo.userId}</div>
              <div><strong>Token:</strong> {transactionInfo.token}</div>
              <div><strong>Amount:</strong> {transactionInfo.amount}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};