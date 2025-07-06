import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import LenisProvider from "./utils/LenisProvider";


const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boldchingis' Portfolio",
  description: "Boldchingis' Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 <body className={`${nunito.variable} ${nunito.className} antialiased`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
