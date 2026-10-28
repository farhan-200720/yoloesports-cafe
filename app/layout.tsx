import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "YOLO Esports Cafe | Navi Mumbai",
  description: "India's Premier 360Hz Gaming Arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-[var(--font-inter)] bg-[#050508] text-white antialiased">
        {children}
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}