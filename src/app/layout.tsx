import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple notes",
  description: "Create and save your notes, text and to-do lists, checklist. No ads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>
          <p>
            ©Copyright 2025. Created with love by <a href="https://github.com/aliendostea">Ang.dev</a> All rights
            reversed.
          </p>
        </footer>
      </body>
    </html>
  );
}
