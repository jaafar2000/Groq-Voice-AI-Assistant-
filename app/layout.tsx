import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groq AI Co-Pilot | Voice Chat for Next.js Devs",
  description:
    "A high-performance voice chat AI Co-Pilot powered by Groq and Next.js 15. Built by Jaafar Youssef for web development accountability and rapid prototyping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
