import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PostHogProvider } from "@/components/PostHogProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Calcy.net - Free Online Calculators",
  description:
    "Access a variety of free online calculators including mortgage, loan, financial, health, fitness, and math calculators to help with your everyday calculations.",
  keywords:
    "calculator, financial calculator, mortgage calculator, loan calculator, health calculator, math calculator, online calculator",
  openGraph: {
    title: "Calcy.net - Free Online Calculators",
    description:
      "Access a variety of free online calculators for all your calculation needs.",
    url: "https://calcy.net",
    siteName: "Calcy.net",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calcy.net Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcy.net - Free Online Calculators",
    description:
      "Access a variety of free online calculators for all your calculation needs.",
    creator: "@calcy",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://calcy.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </PostHogProvider>
      </body>
    </html>
  );
}