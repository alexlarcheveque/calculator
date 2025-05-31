import MortgagePage from "@/components/mortgage/MortgagePage";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Free Mortgage Calculator 2024 | Calculate Monthly Payments & Amortization | Calcy.net",
  description:
    "Calculate monthly mortgage payments, total interest, and amortization schedules with our free 2024 mortgage calculator. Includes property tax, insurance, and PMI calculations. Get accurate estimates instantly.",
  keywords:
    "mortgage calculator, home loan calculator, monthly payment calculator, amortization schedule, property tax calculator, mortgage payment estimator, home affordability calculator",
  authors: [{ name: "Calcy.net" }],
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
    title: "Free Mortgage Calculator 2024 | Calculate Monthly Payments",
    description:
      "Calculate monthly mortgage payments, total interest, and amortization schedules. Includes property tax, insurance, and PMI calculations.",
    type: "website",
    url: "https://calcy.net/mortgage",
    siteName: "Calcy.net",
    images: [
      {
        url: "https://calcy.net/og-mortgage-calculator.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Mortgage Calculator - Calculate Monthly Payments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Mortgage Calculator 2024 | Calculate Monthly Payments",
    description:
      "Calculate monthly mortgage payments, total interest, and amortization schedules. Free and accurate.",
    images: ["https://calcy.net/og-mortgage-calculator.jpg"],
  },
  alternates: {
    canonical: "https://calcy.net/mortgage",
  },
};

// Structured data for the mortgage calculator tool
const mortgageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mortgage Calculator",
  description:
    "Calculate monthly mortgage payments, amortization schedules, and total costs including property tax and insurance.",
  url: "https://calcy.net/mortgage",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Monthly payment calculation",
    "Amortization schedule",
    "Total interest calculation",
    "Property tax integration",
    "Insurance cost calculation",
    "Down payment analysis",
    "Payment breakdown charts",
  ],
  author: {
    "@type": "Organization",
    name: "Calcy.net",
  },
  publisher: {
    "@type": "Organization",
    name: "Calcy.net",
  },
};

// BreadcrumbList schema for better navigation understanding
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://calcy.net",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: "https://calcy.net/calculators",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mortgage Calculator",
      item: "https://calcy.net/mortgage",
    },
  ],
};

export default function MortgageCalculatorRoute() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="mortgage-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mortgageCalculatorSchema),
        }}
      />
      <Script
        id="mortgage-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="container mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Calculate your monthly mortgage payments, view detailed amortization
            schedules, and explore different loan scenarios with our
            comprehensive mortgage calculator. Includes property taxes,
            insurance, and HOA fees for accurate estimates.
          </p>
        </header>
        <MortgagePage />
      </div>
    </>
  );
}
