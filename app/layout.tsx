import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIOMIND",
  description: "Crack the code. A minimal Mastermind game.",
};

const fallbackStyles = `
  html, body { min-height: 100%; margin: 0; background: #1a1a1a; }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: fallbackStyles }} />
        {children}
      </body>
    </html>
  );
}
