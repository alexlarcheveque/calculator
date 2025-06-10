"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { SalesTaxResults } from "@/types/salesTax";
import { formatCurrency } from "@/utils/salesTaxCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SalesTaxChartProps {
  results: SalesTaxResults;
}

export default function SalesTaxChart({ results }: SalesTaxChartProps) {
  const [activeTab, setActiveTab] = useState<"breakdown" | "comparison">(
    "breakdown"
  );

  // Calculate percentages for legend labels
  const beforeTaxPercentage =
    results.afterTaxPrice > 0
      ? ((results.beforeTaxPrice / results.afterTaxPrice) * 100).toFixed(1)
      : "0.0";
  const salesTaxPercentage =
    results.afterTaxPrice > 0
      ? ((results.salesTaxAmount / results.afterTaxPrice) * 100).toFixed(1)
      : "0.0";

  // Doughnut chart data for tax breakdown
  const doughnutData = {
    labels: [
      `Before Tax Price (${beforeTaxPercentage}%)`,
      `Sales Tax (${salesTaxPercentage}%)`,
    ],
    datasets: [
      {
        data: [results.beforeTaxPrice, results.salesTaxAmount],
        backgroundColor: ["#3B82F6", "#EF4444"],
        borderColor: ["#2563EB", "#DC2626"],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const originalLabels = ["Before Tax Price", "Sales Tax"];
            const label = originalLabels[context.dataIndex] || "";
            const value = context.parsed;
            const percentage = ((value / results.afterTaxPrice) * 100).toFixed(
              1
            );
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Rate comparison data - common state/city rates
  const userRatePercent = results.salesTaxRate; // Already in percentage form

  // Create array of all rates and sort them
  const allRates = [
    { name: "Your State's Rate", rate: userRatePercent, isUser: true },
    { name: "Colorado", rate: 2.9, isUser: false },
    { name: "Wyoming", rate: 4, isUser: false },
    { name: "Utah", rate: 4.7, isUser: false },
    { name: "Nevada", rate: 4.6, isUser: false },
    { name: "Louisiana", rate: 5.0, isUser: false },
    { name: "Wisconsin", rate: 5.7, isUser: false },
    { name: "Virginia", rate: 5.77, isUser: false },
    { name: "North Carolina", rate: 7.0, isUser: false },
    { name: "Texas", rate: 8.2, isUser: false },
    { name: "Nevada", rate: 8.24, isUser: false },
    { name: "Illinois", rate: 8.86, isUser: false },
    { name: "Tennessee", rate: 9.55, isUser: false },
    { name: "Washington", rate: 9.38, isUser: false },
    { name: "Louisiana", rate: 10.11, isUser: false },
  ].sort((a, b) => a.rate - b.rate);

  // Generate chart data from sorted array
  const sortedLabels = allRates.map((item) => item.name);
  const sortedData = allRates.map((item) => item.rate);
  const sortedBackgroundColors = allRates.map((item) => {
    if (item.isUser) {
      return "#EF4444"; // User's rate in red
    } else {
      return "#3B82F6"; // All other states in blue
    }
  });

  const sortedBorderColors = allRates.map((item) => {
    if (item.isUser) {
      return "#DC2626"; // User's rate border
    } else {
      return "#2563EB"; // All other states border
    }
  });

  const rateComparisonData = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Sales Tax Rate (%)",
        data: sortedData,
        backgroundColor: sortedBackgroundColors,
        borderColor: sortedBorderColors,
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const rateComparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
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
            const rate = context.parsed.x;
            return `${context.label}: ${rate.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value: any) {
            return `${value}%`;
          },
        },
        title: {
          display: true,
          text: "Tax Rate (%)",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Don't render charts if no meaningful data
  if (results.beforeTaxPrice <= 0 && results.afterTaxPrice <= 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p>Enter values to see visual breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "breakdown"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View price breakdown chart"
        >
          Price Breakdown
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "comparison"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View rate comparison chart"
        >
          Rate Comparison
        </button>
      </div>

      <div className="w-full h-96">
        {activeTab === "breakdown" ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-md h-full">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        ) : (
          <Bar data={rateComparisonData} options={rateComparisonOptions} />
        )}
      </div>
    </div>
  );
}
