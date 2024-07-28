import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EzPay - Simple Wallet App",
  description: "Manage your finances with ease using EzPay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-h-screen bg-gray-100">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}