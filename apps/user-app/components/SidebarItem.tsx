"use client"

import React from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, title, icon }) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex items-center cursor-pointer p-3 rounded-md transition-colors ${
        selected ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => router.push(href)}
    >
      <div className="mr-3">{icon}</div>
      <div className={`font-medium ${selected ? "text-purple-700" : "text-gray-700"}`}>
        {title}
      </div>
    </div>
  );
};