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

  if (breakdown.taxByBracket.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">Tax by Bracket</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">No tax brackets applicable</p>
        </div>
      </div>
    );
  }

  const totalTax = breakdown.taxByBracket.reduce(
    (sum, item) => sum + item.taxOwed,
    0
  );

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
          "rgba(34, 197, 94, 0.8)", // Green for 10%
          "rgba(59, 130, 246, 0.8)", // Blue for 12%
          "rgba(245, 158, 11, 0.8)", // Yellow for 22%
          "rgba(239, 68, 68, 0.8)", // Red for 24%
          "rgba(139, 92, 246, 0.8)", // Purple for 32%
          "rgba(236, 72, 153, 0.8)", // Pink for 35%
          "rgba(6, 182, 212, 0.8)", // Cyan for 37%
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(6, 182, 212, 1)",
        ],
        borderWidth: 2,
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
            const percentage = ((bracketInfo.taxOwed / totalTax) * 100).toFixed(
              1
            );
            return [
              `Tax Owed: ${formatCurrency(context.parsed.y)}`,
              `Taxable Amount: ${formatCurrency(bracketInfo.taxableAmount)}`,
              `Rate: ${(bracketInfo.bracket.rate * 100).toFixed(1)}%`,
              `% of Total Tax: ${percentage}%`,
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
      <h3 className="text-lg font-medium text-gray-800">Tax by Bracket</h3>

      <div className="h-64">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      {/* Bracket Details */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 text-sm">
          Bracket Breakdown:
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {breakdown.taxByBracket.map((item, index) => {
            const percentage = ((item.taxOwed / totalTax) * 100).toFixed(1);
            const rate = (item.bracket.rate * 100).toFixed(0);

            return (
              <div
                key={index}
                className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{
                      backgroundColor: data.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <span className="font-medium">{rate}% Bracket</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    {formatCurrency(item.taxOwed)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage}% of total tax
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm font-medium">
            <span>Total Federal Tax:</span>
            <span className="text-lg font-bold text-gray-800">
              {formatCurrency(totalTax)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
