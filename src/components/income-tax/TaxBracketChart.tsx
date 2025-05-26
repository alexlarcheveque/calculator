"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { TaxCalculationBreakdown } from "@/types/incomeTax";
import { formatCurrency } from "@/utils/incomeTaxCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TaxBracketChartProps {
  breakdown: TaxCalculationBreakdown;
}

export default function TaxBracketChart({ breakdown }: TaxBracketChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const data = {
    labels: breakdown.taxByBracket.map((item, index) => {
      const rate = (item.bracket.rate * 100).toFixed(0);
      return `${rate}% Bracket`;
    }),
    datasets: [
      {
        label: "Tax Owed",
        data: breakdown.taxByBracket.map((item) => item.taxOwed),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Yellow
          "rgba(239, 68, 68, 0.8)", // Red
          "rgba(139, 92, 246, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(6, 182, 212, 0.8)", // Cyan
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(6, 182, 212, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const bracketInfo = breakdown.taxByBracket[context.dataIndex];
            return [
              `Tax Owed: ${formatCurrency(context.parsed.y)}`,
              `Taxable Amount: ${formatCurrency(bracketInfo.taxableAmount)}`,
              `Rate: ${(bracketInfo.bracket.rate * 100).toFixed(1)}%`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  if (breakdown.taxByBracket.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
        <p className="text-gray-500">No tax brackets applicable</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
