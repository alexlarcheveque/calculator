import RefinancePage from "@/components/refinance/RefinancePage";
import { Metadata } from "next";
// import { URL } from 'url'; // URL is a global constructor, no import needed

export const metadata: Metadata = {
  title: "Refinance Calculator | Calcy.net",
  description:
    "Free calculator to plan the refinancing of loans by comparing existing and refinanced loans side by side, with options for cash out, mortgage points, and fees.",
  metadataBase: new URL("https://calcy.net"), // Assuming this is your site's base URL
  keywords: [
    "refinance calculator",
    "loan refinance",
    "mortgage refinance",
    "debt consolidation",
    "loan comparison",
    "cash out refinance",
    "interest rate calculator",
    "loan amortization",
    "financial planning tool",
    "refinance options",
  ],
  alternates: {
    canonical: "/refinance",
  },
  openGraph: {
    title: "Refinance Calculator | Calcy.net",
    description:
      "Free calculator to plan the refinancing of loans by comparing existing and refinanced loans side by side, with options for cash out, mortgage points, and fees.",
    url: "/refinance",
    siteName: "Calcy.net",
    images: [
      {
        url: "/images/og-refinance-calculator.png", // TODO: Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Refinance Calculator on Calcy.net - Visual representation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refinance Calculator | Calcy.net",
    description:
      "Free calculator to plan the refinancing of loans by comparing existing and refinanced loans side by side, with options for cash out, mortgage points, and fees.",
    site: "@YourSiteTwitterHandle", // TODO: Replace with your site's Twitter handle
    creator: "@YourCreatorTwitterHandle", // TODO: Replace with the content creator's Twitter handle (optional)
    images: ["/images/og-refinance-calculator.png"], // TODO: Replace with your actual image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RefinanceCalculatorRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Refinance Calculator",
    description:
      "Free calculator to plan the refinancing of loans by comparing existing and refinanced loans side by side, with options for cash out, mortgage points, and fees.",
    url: "https://calcy.net/refinance",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any", // Indicates a web application
    browserRequirements:
      "Requires a modern web browser with JavaScript enabled.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Calcy.net",
    },
    keywords:
      "refinance, loan, mortgage, calculator, interest, savings, financial planning, debt management",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://calcy.net/refinance",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="product-jsonld" // Added key for React
      />
      <div className="container mx-auto p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Refinance Calculator
          </h1>
          <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
            Our comprehensive calculator helps you compare your current loan
            with new refinancing options to evaluate potential savings, cash-out
            opportunities, and overall benefits.
          </p>
        </header>
        <RefinancePage />
      </div>
    </>
  );
}
