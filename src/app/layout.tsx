import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Norma — моніторинг законодавства для вашого бізнесу",
  description: "Преміальний моніторинг законодавчих ініціатив України для бізнесу.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--ink)]">{children}</body>
    </html>
  );
}

