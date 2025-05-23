"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MortgageResults } from "@/types/mortgage";
import { formatCurrencyDetailed } from "@/utils/mortgageCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentDistributionChartProps {
  results: MortgageResults;
}

export default function PaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const data = {
    labels: ["Principal & Interest", "Property Tax", "Home Insurance", "HOA"],
    datasets: [
      {
        data: [
          results.monthlyPrincipalAndInterest,
          results.monthlyPropertyTax,
          results.monthlyHomeInsurance,
          results.monthlyHOA,
        ],
        backgroundColor: [
          "#0ea5e9", // primary-500
          "#f59e0b", // amber-500
          "#10b981", // emerald-500
          "#8b5cf6", // violet-500
        ],
        borderColor: ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6"],
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { ctx, width, height } = chart;
      ctx.restore();

      // Calculate center points
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw "Monthly Payment" text
      ctx.font = "500 18px system-ui";
      ctx.fillStyle = "#4B5563"; // text-gray-600
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("Monthly Payment", centerX, centerY - 50);

      // Draw amount
      ctx.font = "600 28px system-ui";
      ctx.fillStyle = "#111827"; // text-gray-900
      ctx.fillText(
        formatCurrencyDetailed(results.totalMonthlyPayment),
        centerX,
        centerY - 15
      );
      ctx.save();
    },
  };

  const options = {
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
              (value / results.totalMonthlyPayment) *
              100
            ).toFixed(1);
            return `${label}: ${formatCurrencyDetailed(
              value
            )} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative w-full max-w-sm mx-auto">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
