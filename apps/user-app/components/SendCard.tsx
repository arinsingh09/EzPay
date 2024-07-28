"use client";

import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useBalance } from '@repo/store/balance';

export const SendCard: React.FC = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const { fetchBalance } = useBalance();

  const handleTransfer = async () => {
    try {
      const response = await p2pTransfer(number, Number(amount) * 100);
      if (response.message == "Transfer successful") {
        console.log('Transfer successful:', response.message);
        fetchBalance();
      } else {
        console.error('Transfer failed:', response.message);
      }
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <Card title="Send Money" className="max-w-md mx-auto">
      <div className="space-y-4">
        <TextInput
          placeholder="Enter phone number"
          label="Recipient's Phone Number"
          onChange={setNumber}
        />
        <TextInput
          placeholder="Enter amount"
          label="Amount (INR)"
          onChange={setAmount}
          type="number"
        />
        <Button
          onClick={handleTransfer}
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Send Money
        </Button>
      </div>
    </Card>
  );
};