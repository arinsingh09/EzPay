"use client"

import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

export const AddMoney: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);

  return (
    <Card title="Add Money">
      <div className="space-y-4">
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
          onClick={async () => {
            await createOnRampTransaction(provider, value);
            window.location.href = redirectUrl || "";
          }}
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};