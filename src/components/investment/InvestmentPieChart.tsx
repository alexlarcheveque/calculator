"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { InvestmentResults } from "@/types/investment";
import { formatCurrency } from "@/utils/investmentCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InvestmentPieChartProps {
  results: InvestmentResults;
}

export default function InvestmentPieChart({
  results,
}: InvestmentPieChartProps) {
  const data = {
    labels: ["Starting Amount", "Total Contributions", "Interest"],
    datasets: [
      {
        data: [
          results.startingAmount,
          results.totalContributions,
          results.totalInterest,
        ],
        backgroundColor: [
          "#0ea5e9", // blue-500
          "#10b981", // emerald-500
          "#dc2626", // red-600
        ],
        borderColor: ["#0ea5e9", "#10b981", "#dc2626"],
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

      // Draw "Final Balance" text
      ctx.font = "500 18px system-ui";
      ctx.fillStyle = "#4B5563"; // text-gray-600
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("Final Balance", centerX, centerY - 15);

      // Draw amount
      ctx.font = "600 28px system-ui";
      ctx.fillStyle = "#111827"; // text-gray-900
      ctx.fillText(formatCurrency(results.endBalance), centerX, centerY + 15);
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
            const percentage = ((value / results.endBalance) * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="w-full h-96 px-4 sm:px-0">
      <div className="relative w-full max-w-sm mx-auto">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>

      {/* Summary below chart */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Starting: {formatCurrency(results.startingAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>
            Contributions: {formatCurrency(results.totalContributions)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Interest: {formatCurrency(results.totalInterest)}</span>
        </div>
      </div>
    </div>
  );
}
