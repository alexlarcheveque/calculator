"use client";

import { useRef } from "react";
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
import { IncomeTaxResults } from "@/types/incomeTax";
import { formatCurrency } from "@/utils/incomeTaxCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WithholdingVsLiabilityProps {
  results: IncomeTaxResults;
}

export default function WithholdingVsLiability({
  results,
}: WithholdingVsLiabilityProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const isRefund = results.refundOrOwed > 0;
  const difference = Math.abs(results.refundOrOwed);

  const data = {
    labels: ["Tax Withheld", "Tax Owed"],
    datasets: [
      {
        label: "Amount",
        data: [results.totalTaxWithheld, results.federalTaxOwed],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue for withheld
          isRefund ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)", // Green if refund, red if owed
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          isRefund ? "rgba(16, 185, 129, 1)" : "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const maxValue = Math.max(results.totalTaxWithheld, results.federalTaxOwed);
  const yAxisMax = Math.ceil((maxValue * 1.2) / 1000) * 1000; // Round up to nearest thousand

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
            return `${context.label}: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yAxisMax,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800">
        Withholding vs Tax Liability
      </h3>

      <div className="h-64">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      {/* Result Summary */}
      <div className="space-y-4">
        {/* Key Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">
              Tax Withheld
            </div>
            <div className="text-xl font-bold text-blue-800">
              {formatCurrency(results.totalTaxWithheld)}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 font-medium">Tax Owed</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(results.federalTaxOwed)}
            </div>
          </div>
        </div>

        {/* Result */}
        <div
          className={`text-center p-4 rounded-lg ${
            isRefund
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div
            className={`text-sm font-medium ${
              isRefund ? "text-green-600" : "text-red-600"
            }`}
          >
            {isRefund ? "Expected Refund" : "Amount Owed"}
          </div>
          <div
            className={`text-3xl font-bold ${
              isRefund ? "text-green-700" : "text-red-700"
            }`}
          >
            {formatCurrency(difference)}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {isRefund
              ? "You may receive a refund"
              : "Additional tax payment required"}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <strong>How this works:</strong>
            </p>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>
                • <strong>Tax Withheld:</strong> Amount your employer(s) sent to
                the IRS
              </li>
              <li>
                • <strong>Tax Owed:</strong> Your actual tax liability after
                deductions and credits
              </li>
              <li>
                • <strong>{isRefund ? "Refund" : "Owed"}:</strong> The
                difference between what was withheld and what you owe
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
