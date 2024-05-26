import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/app/_components/NavBar';
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mockafy Ai",
  description: "Generate a backend without standing up a server!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
