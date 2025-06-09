"use client";

import React from "react";
import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const FinanceBasics: React.FC = () => {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Understanding financial calculations is essential for making informed
          decisions about investments, savings, and financial planning using
          time value of money principles.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Key Financial Concepts",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Present Value (PV)",
          description:
            "The current worth of future cash flows, helping determine how much a future amount is worth in today's dollars.",
        },
        {
          title: "Future Value (FV)",
          description:
            "The value of a current asset at a future date based on an assumed rate of growth over time.",
        },
        {
          title: "Periodic Payment (PMT)",
          description:
            "Regular payments made at consistent intervals to reach financial goals or service debt obligations.",
        },
        {
          title: "Interest Rate (I/Y)",
          description:
            "The percentage charged or earned on money over time, crucial for evaluating opportunities and costs.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Time Value of Money",
      headingLevel: "h3",
      content: (
        <p>
          The fundamental principle that money available now is worth more than
          the same amount in the future due to its potential earning capacity.
          This concept forms the basis for all financial calculations.
        </p>
      ),
    },
    {
      type: "subheader",
      heading: "Interest Types",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Simple Interest",
          description:
            "Interest calculated only on the principal amount, resulting in linear growth over time.",
        },
        {
          label: "Compound Interest",
          description:
            "Interest calculated on both principal and previously earned interest, resulting in exponential growth. Compounding frequency significantly affects the final amount.",
        },
      ],
    },
  ];

  return <InfoCard title="Finance Calculator Basics" sections={sections} />;
};

export default FinanceBasics;
