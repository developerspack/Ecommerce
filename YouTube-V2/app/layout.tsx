import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "react-tuby/css/main.css";

import { NextAuthProvider } from "@/components/Auth/NextAuthProvider";
import ClientProvider from "@/components/client/ClientProvider";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube",
  description: "YouTube Clone using Next js Appwrite Tailwindcss ShadcnUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("dark:bg-black bg-white", inter.className)}>
        <ThemeProvider attribute="class" enableSystem>
          <NextAuthProvider>
            <ClientProvider />
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
