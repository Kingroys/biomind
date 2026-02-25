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
  html, body { min-height: 100%; margin: 0; background: linear-gradient(180deg, #1a0a2e 0%, #3d1f5c 50%, #5c2d7a 100%); }
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
