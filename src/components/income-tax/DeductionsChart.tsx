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

interface DeductionsChartProps {
  breakdown: TaxCalculationBreakdown;
}

export default function DeductionsChart({ breakdown }: DeductionsChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const data = {
    labels: ["Standard Deduction", "Itemized Deductions"],
    datasets: [
      {
        label: "Deduction Amount",
        data: [
          breakdown.deductionsBreakdown.standardDeduction,
          breakdown.deductionsBreakdown.itemizedDeductions.total,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue for standard
          "rgba(16, 185, 129, 0.8)", // Green for itemized
        ],
        borderColor: ["rgba(59, 130, 246, 1)", "rgba(16, 185, 129, 1)"],
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
            if (context.dataIndex === 0) {
              return `Standard Deduction: ${formatCurrency(context.parsed.y)}`;
            } else {
              const itemized = breakdown.deductionsBreakdown.itemizedDeductions;
              return [
                `Total Itemized: ${formatCurrency(context.parsed.y)}`,
                `Real Estate Tax: ${formatCurrency(itemized.realEstateTax)}`,
                `Mortgage Interest: ${formatCurrency(
                  itemized.mortgageInterest
                )}`,
                `Charitable: ${formatCurrency(itemized.charitableDonations)}`,
                `State/Local Tax: ${formatCurrency(itemized.stateLocalTax)}`,
                `Other: ${formatCurrency(itemized.otherDeductibles)}`,
              ];
            }
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

  return (
    <div className="h-64">
      <Bar ref={chartRef} data={data} options={options} />

      {/* Itemized Deductions Breakdown */}
      {breakdown.deductionsBreakdown.itemizedDeductions.total > 0 && (
        <div className="mt-4 text-sm">
          <h4 className="font-medium text-gray-700 mb-2">
            Itemized Breakdown:
          </h4>
          <div className="space-y-1 text-gray-600">
            {breakdown.deductionsBreakdown.itemizedDeductions.realEstateTax >
              0 && (
              <div className="flex justify-between">
                <span>Real Estate Tax:</span>
                <span>
                  {formatCurrency(
                    breakdown.deductionsBreakdown.itemizedDeductions
                      .realEstateTax
                  )}
                </span>
              </div>
            )}
            {breakdown.deductionsBreakdown.itemizedDeductions.mortgageInterest >
              0 && (
              <div className="flex justify-between">
                <span>Mortgage Interest:</span>
                <span>
                  {formatCurrency(
                    breakdown.deductionsBreakdown.itemizedDeductions
                      .mortgageInterest
                  )}
                </span>
              </div>
            )}
            {breakdown.deductionsBreakdown.itemizedDeductions
              .charitableDonations > 0 && (
              <div className="flex justify-between">
                <span>Charitable Donations:</span>
                <span>
                  {formatCurrency(
                    breakdown.deductionsBreakdown.itemizedDeductions
                      .charitableDonations
                  )}
                </span>
              </div>
            )}
            {breakdown.deductionsBreakdown.itemizedDeductions.stateLocalTax >
              0 && (
              <div className="flex justify-between">
                <span>State/Local Tax:</span>
                <span>
                  {formatCurrency(
                    breakdown.deductionsBreakdown.itemizedDeductions
                      .stateLocalTax
                  )}
                </span>
              </div>
            )}
            {breakdown.deductionsBreakdown.itemizedDeductions.otherDeductibles >
              0 && (
              <div className="flex justify-between">
                <span>Other Deductibles:</span>
                <span>
                  {formatCurrency(
                    breakdown.deductionsBreakdown.itemizedDeductions
                      .otherDeductibles
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
