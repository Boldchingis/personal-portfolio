import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import LenisProvider from "./utils/LenisProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f3f3f3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Boldchingis' Portfolio",
  description: "Full-stack developer with a strong focus on front-end development. Creating smooth, user-friendly interfaces with modern frameworks.",
  keywords: ["developer", "portfolio", "frontend", "fullstack", "react", "nextjs", "typescript"],
  authors: [{ name: "Boldchingis" }],
  creator: "Boldchingis",
  publisher: "Boldchingis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Boldchingis' Portfolio",
    description: "Full-stack developer with a strong focus on front-end development.",
    siteName: "Boldchingis' Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Boldchingis' Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boldchingis' Portfolio",
    description: "Full-stack developer with a strong focus on front-end development.",
    images: ["/profile.png"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/profile.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${nunito.className} antialiased`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
