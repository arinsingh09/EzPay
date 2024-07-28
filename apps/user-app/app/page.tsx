import React from 'react';
import Link from 'next/link';
import { Button } from '@repo/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to EzPay</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Manage your finances with ease. Send money, track transactions, and more.
      </p>
      <Link href="/dashboard">
        <Button className="bg-white text-purple-600 hover:bg-purple-100">
          Get Started
        </Button>
      </Link>
    </div>
  );
}