import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BIOMIND",
  description: "Can you crack the code? Mastermind with bioman faces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={silkscreen.className}>
      <body>{children}</body>
    </html>
  );
}
