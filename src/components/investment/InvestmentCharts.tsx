"use client";

import { useMemo } from "react";
import { InvestmentResults, AccumulationDataPoint } from "@/types/investment";
import PaymentDistributionChart, {
  ChartDataPoint,
} from "@/components/ui/PaymentDistributionChart";
import TabbedContainer, { TabItem } from "@/components/ui/TabbedContainer";
import AccumulationChart from "./AccumulationChart";
import { formatCurrency } from "@/utils/investmentCalculations";

interface InvestmentChartsProps {
  results: InvestmentResults;
  accumulationData: AccumulationDataPoint[];
}

export default function InvestmentCharts({
  results,
  accumulationData,
}: InvestmentChartsProps) {
  // Transform investment results into chart data format
  const chartData: ChartDataPoint[] = useMemo(() => {
    const data = [
      {
        label: "Starting Amount",
        value: results.startingAmount,
        color: "#0ea5e9", // blue-500
      },
      {
        label: "Contributions",
        value: results.totalContributions,
        color: "#10b981", // emerald-500
      },
    ];

    // Only include interest if it's positive
    if (results.totalInterest > 0) {
      data.push({
        label: "Interest",
        value: results.totalInterest,
        color: "#8b5cf6", // violet-500
      });
    }

    return data;
  }, [results]);

  const centerTextConfig = useMemo(
    () => ({
      label: "Final Balance",
      value: results.endBalance,
    }),
    [results.endBalance]
  );

  // Define tabs
  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: "composition",
        label: "Investment Composition",
        ariaLabel: "View investment composition chart",
        content: (
          <PaymentDistributionChart
            data={chartData}
            centerText={centerTextConfig}
            formatCurrency={formatCurrency}
            emptyStateMessage="No investment data available to display."
          />
        ),
      },
      {
        id: "accumulation",
        label: "Accumulation Over Time",
        ariaLabel: "View accumulation over time chart",
        content: <AccumulationChart data={accumulationData} />,
      },
    ],
    [chartData, centerTextConfig, accumulationData]
  );

  return <TabbedContainer tabs={tabs} defaultActiveTab="composition" />;
}
