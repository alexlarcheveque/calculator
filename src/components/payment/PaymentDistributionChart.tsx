"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PaymentResults } from "@/types/payment";
import { formatCurrency } from "@/utils/formatters";
import { useEffect, useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentDistributionChartProps {
  results: PaymentResults;
}

export default function PaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const data = useMemo(
    () => ({
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [results.loanAmount, results.totalInterest],
          backgroundColor: [
            "#3b82f6", // blue-500
            "#10b981", // emerald-500
          ],
          borderColor: ["#3b82f6", "#10b981"],
          borderWidth: 1,
        },
      ],
    }),
    [results.loanAmount, results.totalInterest]
  );

  const centerTextPlugin = useMemo(
    () => ({
      id: "centerText",
      beforeDraw: (chart: any) => {
        const { ctx, width, height } = chart;
        ctx.restore();

        // Calculate center points
        const centerX = width / 2;
        const centerY = height / 2;

        // Draw "Total Payments" text
        ctx.font = "500 18px system-ui";
        ctx.fillStyle = "#4B5563"; // text-gray-600
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Total Payments", centerX, centerY - 50);

        // Draw amount
        ctx.font = "600 28px system-ui";
        ctx.fillStyle = "#111827"; // text-gray-900
        ctx.fillText(
          formatCurrency(results.totalPayments),
          centerX,
          centerY - 15
        );
        ctx.save();
      },
    }),
    [results.totalPayments]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 16,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            font: {
              size: 14,
              family: "system-ui",
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const label = context.label || "";
              const value = context.raw;
              const percentage = (
                (value / results.totalPayments) *
                100
              ).toFixed(1);
              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
            },
          },
        },
      },
      cutout: "65%",
    }),
    [results.totalPayments]
  );

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative w-full max-w-sm mx-auto">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
