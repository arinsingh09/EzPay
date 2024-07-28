import React from 'react';
import { SidebarItem } from "../../components/SidebarItem";
import { HomeIcon, ArrowsRightLeftIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">EzPay Dashboard</h2>
          <nav className="space-y-2">
            <SidebarItem href="/dashboard" icon={<HomeIcon className="w-5 h-5" />} title="Home" />
            <SidebarItem href="/transfer" icon={<ArrowsRightLeftIcon className="w-5 h-5" />} title="Transfer" />
            <SidebarItem href="/transactions" icon={<ClockIcon className="w-5 h-5" />} title="Transactions" />
            <SidebarItem href="/p2p" icon={<UsersIcon className="w-5 h-5" />} title="P2P Transfer" />
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}