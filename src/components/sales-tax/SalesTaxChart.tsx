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
  // Doughnut chart data for tax breakdown
  const doughnutData = {
    labels: ["Before Tax Price", "Sales Tax"],
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
      },
      title: {
        display: true,
        text: "Price Breakdown",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
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

  // Bar chart data for comparison
  const barData = {
    labels: ["Before Tax", "Sales Tax", "After Tax"],
    datasets: [
      {
        label: "Amount",
        data: [
          results.beforeTaxPrice,
          results.salesTaxAmount,
          results.afterTaxPrice,
        ],
        backgroundColor: ["#3B82F6", "#EF4444", "#10B981"],
        borderColor: ["#2563EB", "#DC2626", "#059669"],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sales Tax Comparison",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${formatCurrency(context.parsed.y)}`;
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

  // Don't render charts if no meaningful data
  if (results.beforeTaxPrice <= 0 && results.afterTaxPrice <= 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Visual Breakdown
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Enter values to see visual breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Visual Breakdown
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="h-64">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        {/* Bar Chart */}
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Chart Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600">
              Before Tax: {formatCurrency(results.beforeTaxPrice)}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">
              Tax: {formatCurrency(results.salesTaxAmount)}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">
              Total: {formatCurrency(results.afterTaxPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
