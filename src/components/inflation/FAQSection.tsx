"use client";

import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const faqData: FAQItem[] = [
  {
    question: "What is inflation and how does it affect purchasing power?",
    answer:
      "Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power. When inflation occurs, each unit of currency buys fewer goods and services than it did before. For example, if inflation is 3% per year, something that costs $100 today would cost $103 next year.",
  },
  {
    question: "What is the Consumer Price Index (CPI)?",
    answer:
      "The Consumer Price Index (CPI) is a measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care. It's calculated by taking price changes for each item in the predetermined basket and averaging them. The CPI is one of the most frequently used statistics for identifying periods of inflation or deflation.",
  },
  {
    question: "How accurate are the CPI-based calculations?",
    answer:
      "CPI-based calculations use official U.S. Bureau of Labor Statistics data and provide a good approximation of historical inflation. However, individual experiences may vary based on spending patterns, geographic location, and the specific goods and services purchased. The CPI represents an average across all urban consumers.",
  },
  {
    question: "What's the difference between the three calculator types?",
    answer:
      "The CPI Data Calculator uses historical government data for precise calculations between specific dates. The Forward Rate Calculator projects future values using a constant inflation rate. The Backward Rate Calculator estimates what past purchasing power would be worth today, also using a constant rate.",
  },
  {
    question: "What is a typical inflation rate?",
    answer:
      "Historically, the U.S. has experienced an average annual inflation rate of around 2-3%. The Federal Reserve targets a 2% inflation rate as optimal for economic growth. However, inflation can vary significantly during different economic periods, ranging from negative (deflation) to double digits during periods of economic instability.",
  },
  {
    question: "How can I protect my money from inflation?",
    answer:
      "Common strategies include investing in assets that typically outpace inflation such as stocks, real estate, or Treasury Inflation-Protected Securities (TIPS). Diversifying investments, considering commodities, and maintaining some exposure to international markets can also help. However, all investments carry risk and it's important to consult with financial professionals.",
  },
  {
    question: "Why do the forward and backward calculators use flat rates?",
    answer:
      "Flat rate calculators are useful for theoretical scenarios and planning purposes. They allow you to model 'what if' situations using assumed constant inflation rates. While real inflation varies year to year, using a flat rate helps in financial planning and understanding the general impact of inflation over time.",
  },
  {
    question: "How often is CPI data updated?",
    answer:
      "The Bureau of Labor Statistics releases CPI data monthly, typically around the middle of the following month. This calculator includes data through the most recent available period. For the most current official data, visit the BLS website at bls.gov/cpi.",
  },
];

const relatedLinks = [
  { href: "/investment", label: "Investment Calculator" },
  { href: "/loan", label: "Loan Calculator" },
  { href: "/retirement", label: "Retirement Calculator" },
];

export default function InflationFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions"
      allowMultipleOpen={true}
      relatedLinks={relatedLinks}
    />
  );
}
