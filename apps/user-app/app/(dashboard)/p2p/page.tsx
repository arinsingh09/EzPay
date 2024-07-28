import React from 'react';
import { SendCard } from '../../../components/SendCard';

export default function P2PTransfer() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">P2P Transfer</h1>
      <SendCard />
    </div>
  );
}