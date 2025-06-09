"use client";

import React from "react";
import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const InvestmentVsSavings: React.FC = () => {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Understanding the distinction between investments and savings is
          crucial for building a solid financial foundation. Each serves
          different purposes regarding risk, return, and accessibility.
        </p>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "💰 Savings",
          description:
            "Low-risk preservation of capital with guaranteed returns (0.5%-5%) and immediate access. Ideal for emergency funds and short-term goals.",
        },
        {
          title: "📈 Investments",
          description:
            "Higher-risk wealth building with potential for greater returns (4%-10%+) over longer time periods. Best for retirement and long-term goals.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "When to Use Each Strategy",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Choose Savings For:",
          description:
            "Emergency funds (3-6 months expenses), short-term goals (under 3 years), guaranteed access needs, and capital preservation priorities.",
        },
        {
          title: "Choose Investments For:",
          description:
            "Long-term goals (5+ years), retirement planning, wealth building, inflation protection, and when you have emergency savings established.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Compound Interest Impact",
      headingLevel: "h3",
      content: (
        <p>
          Both savings and investments benefit from compound interest, but
          investments can provide exponential growth through compound returns,
          though with added volatility compared to steady savings growth.
        </p>
      ),
    },
    {
      type: "callout",
      callout: {
        type: "info",
        title: "Financial Strategy Tip",
        content:
          "A balanced approach includes both savings (for security and short-term goals) and investments (for long-term wealth building). Start with an emergency fund, then gradually build your investment portfolio.",
      },
    },
  ];

  return (
    <InfoCard title="Investment vs. Savings Strategy" sections={sections} />
  );
};

export default InvestmentVsSavings;
