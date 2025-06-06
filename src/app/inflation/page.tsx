import InflationPage from "@/components/inflation/InflationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Inflation Calculator | Calculate Purchasing Power Over Time | Calcy.net",
  description:
    "Free inflation calculator that calculates purchasing power changes over time using U.S. CPI data or custom inflation rates. Track dollar value erosion from 1925-2025. Plan your finances with accurate inflation projections.",
  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "CPI calculator",
    "inflation rate calculator",
    "money value calculator",
    "dollar purchasing power",
    "inflation impact calculator",
    "financial planning tool",
    "investment inflation calculator",
    "cost of living calculator",
    "economic inflation tool",
    "retirement planning inflation",
  ],
  authors: [{ name: "Calcy.net" }],
  creator: "Calcy.net",
  publisher: "Calcy.net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://calcy.net"),
  alternates: {
    canonical: "/inflation",
  },
  openGraph: {
    title: "Free Inflation Calculator | Calculate Purchasing Power Over Time",
    description:
      "Calculate how inflation affects your money's purchasing power over time. Free tool with U.S. CPI data and custom inflation rates for accurate financial planning.",
    url: "/inflation",
    siteName: "Calcy.net",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/inflation-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Inflation Calculator - Track Purchasing Power Over Time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Inflation Calculator | Calculate Purchasing Power Over Time",
    description:
      "Calculate how inflation affects your money's purchasing power. Free tool with historical CPI data and custom rates for financial planning.",
    site: "@CalcyNet",
    creator: "@CalcyNet",
    images: ["/images/inflation-calculator-twitter.jpg"],
  },
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
  category: "Finance",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://calcy.net/inflation#webapp",
      name: "Inflation Calculator",
      url: "https://calcy.net/inflation",
      description:
        "Free online inflation calculator that calculates purchasing power changes over time using U.S. CPI data or custom inflation rates.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      permissions: "browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Calculate future value with inflation",
        "Calculate past value with inflation",
        "Historical CPI data from 1925-2025",
        "Custom inflation rate calculations",
        "Interactive charts and visualizations",
        "Purchasing power comparison",
        "Educational content about inflation",
      ],
      screenshot:
        "https://calcy.net/images/inflation-calculator-screenshot.jpg",
      softwareVersion: "1.0",
      author: {
        "@type": "Organization",
        name: "Calcy.net",
        url: "https://calcy.net",
      },
    },
    {
      "@type": "Calculator",
      "@id": "https://calcy.net/inflation#calculator",
      name: "Inflation Rate Calculator",
      description:
        "Calculate the impact of inflation on purchasing power over time with forward and backward inflation calculations.",
      url: "https://calcy.net/inflation",
      potentialAction: {
        "@type": "UseAction",
        object: {
          "@type": "WebApplication",
          name: "Inflation Calculator",
        },
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://calcy.net/inflation#webpage",
      url: "https://calcy.net/inflation",
      name: "Free Inflation Calculator | Calculate Purchasing Power Over Time",
      description:
        "Free inflation calculator that calculates purchasing power changes over time using U.S. CPI data or custom inflation rates.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://calcy.net#website",
        name: "Calcy.net",
        url: "https://calcy.net",
      },
      about: [
        {
          "@type": "Thing",
          name: "Inflation",
          sameAs: "https://en.wikipedia.org/wiki/Inflation",
        },
        {
          "@type": "Thing",
          name: "Consumer Price Index",
          sameAs: "https://en.wikipedia.org/wiki/Consumer_price_index",
        },
        {
          "@type": "Thing",
          name: "Purchasing Power",
          sameAs: "https://en.wikipedia.org/wiki/Purchasing_power",
        },
      ],
      breadcrumb: {
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
            name: "Inflation Calculator",
            item: "https://calcy.net/inflation",
          },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": "https://calcy.net#organization",
      name: "Calcy.net",
      url: "https://calcy.net",
      description: "Free online financial calculators and educational tools",
      sameAs: ["https://twitter.com/CalcyNet", "https://github.com/calcynet"],
    },
  ],
};

export default function InflationCalculatorRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Inflation Calculator
          </h1>
          <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
            Calculate the equivalent purchasing power of money over time using
            U.S. CPI data or custom inflation rates. Track how inflation affects
            dollar values from 1925 to 2025.
          </p>
        </header>
        <InflationPage />
      </div>
    </>
  );
}
