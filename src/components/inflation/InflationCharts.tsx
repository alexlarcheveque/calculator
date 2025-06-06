"use client";

import { useMemo } from "react";
import { InflationResults } from "@/types/inflation";
import PurchasingPowerChart from "./PurchasingPowerChart";
import ValueComparisonChart from "./ValueComparisonChart";
import TabbedContainer, { TabItem } from "@/components/ui/TabbedContainer";

interface InflationChartsProps {
  results: InflationResults;
}

export default function InflationCharts({ results }: InflationChartsProps) {
  // Define tabs
  const tabs: TabItem[] = useMemo(() => {
    const tabList: TabItem[] = [
      {
        id: "comparison",
        label: "Value Comparison",
        ariaLabel: "View value comparison chart",
        content: <ValueComparisonChart results={results} />,
      },
      {
        id: "purchasing-power",
        label: "Purchasing Power Over Time",
        ariaLabel: "View purchasing power erosion over time",
        content: <PurchasingPowerChart results={results} />,
      },
    ];

    return tabList;
  }, [results]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <TabbedContainer tabs={tabs} defaultActiveTab="comparison" />
    </div>
  );
}
