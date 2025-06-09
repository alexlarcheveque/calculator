"use client";

import React from "react";
import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const FinanceTypes: React.FC = () => {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <p>
          Our finance calculator supports five key calculation types, each
          designed to solve specific financial planning scenarios.
        </p>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Future Value (FV)",
          description:
            "Calculate what your investment will be worth at a future date with compound interest.",
        },
        {
          title: "Present Value (PV)",
          description:
            "Determine the current value of future cash flows or required lump sum investment.",
        },
        {
          title: "Payment (PMT)",
          description:
            "Calculate regular payment amounts needed to achieve financial goals or loan payments.",
        },
        {
          title: "Periods (N)",
          description:
            "Determine how long it takes to reach financial goals with specific payments and rates.",
        },
        {
          title: "Interest Rate (I/Y)",
          description:
            "Calculate required interest rates to achieve goals or determine actual investment returns.",
        },
        {
          title: "Payment Timing",
          description:
            "Choose between end-of-period (most common) or beginning-of-period payments for optimal results.",
        },
      ],
    },
  ];

  return <InfoCard title="Financial Calculation Types" sections={sections} />;
};

export default FinanceTypes;
