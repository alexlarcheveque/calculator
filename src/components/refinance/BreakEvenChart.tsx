"use client";

import { RefinanceResults } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BreakEvenChartProps {
  results: RefinanceResults;
}

export default function BreakEvenChart({ results }: BreakEvenChartProps) {
  // Only show chart if there are monthly savings and break-even is reasonable
  if (
    results.monthlyPaymentDifference >= 0 ||
    results.breakEvenMonths <= 0 ||
    results.breakEvenMonths > 360
  ) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-500 mb-4">
          Break-even analysis not applicable for this refinancing scenario.
        </div>
        <div className="text-sm text-gray-400">
          {results.monthlyPaymentDifference >= 0
            ? "This refinancing increases monthly payments"
            : results.breakEvenMonths > 360
            ? "Break-even period exceeds 30 years"
            : "Break-even period is too short to analyze"}
        </div>
      </div>
    );
  }

  const monthlySavings = Math.abs(results.monthlyPaymentDifference);
  const upfrontCosts = results.totalClosingCosts;
  const breakEvenMonth = Math.round(results.breakEvenMonths);

  // Show timeline up to break-even + 50% for context
  const maxMonths = Math.min(Math.ceil(breakEvenMonth * 1.5), 120);
  const months: number[] = [];
  const netSavings: number[] = [];
  const breakEvenMarkers: (number | null)[] = [];

  for (let month = 0; month <= maxMonths; month++) {
    months.push(month);
    const totalSavings = month * monthlySavings;
    const netAmount = totalSavings - upfrontCosts;
    netSavings.push(netAmount);

    // Mark break-even point at the actual net savings value (should be ~0)
    if (month === breakEvenMonth) {
      breakEvenMarkers.push(netAmount);
    } else {
      breakEvenMarkers.push(null);
    }
  }

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Net Savings After Costs",
        data: netSavings,
        borderColor: "#0ea5e9",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(14, 165, 233, 0.2)");
          gradient.addColorStop(1, "rgba(14, 165, 233, 0.05)");
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#0ea5e9",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Break-Even Point",
        data: breakEvenMarkers.map((val) => (val === null ? NaN : val)),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        borderWidth: 0,
        pointRadius: (context: any) => {
          const value = context.parsed?.y;
          return value !== undefined && !isNaN(value) ? 10 : 0;
        },
        pointHoverRadius: 12,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 3,
        showLine: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 12,
          font: {
            size: 14,
            family: "system-ui",
          },
          filter: (legendItem) => {
            // Only show the main line in legend
            return legendItem.text === "Net Savings After Costs";
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#0ea5e9",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          title: function (context) {
            const month = context[0].parsed.x;
            if (month === 0) return "Starting Point";
            if (month === breakEvenMonth) return `🎯 Break-Even Point`;
            const years = Math.floor(month / 12);
            const remainingMonths = month % 12;
            if (years > 0) {
              return remainingMonths > 0
                ? `Month ${month} (${years}y ${remainingMonths}m)`
                : `Month ${month} (${years} year${years > 1 ? "s" : ""})`;
            }
            return `Month ${month}`;
          },
          label: function (context) {
            const value = context.parsed.y;
            const label = context.dataset.label;

            // Skip the break-even marker in tooltip
            if (label === "Break-Even Point") return "";

            if (value >= 0) {
              return `Net profit: ${formatCurrency(value)}`;
            } else {
              return `Still recovering: ${formatCurrency(
                Math.abs(value)
              )} to go`;
            }
          },
          afterBody: function (tooltipItems) {
            const month = tooltipItems[0].parsed.x;
            if (month === breakEvenMonth) {
              return [
                "",
                "🎉 Refinancing costs fully recovered!",
                "All future savings are pure profit.",
              ];
            }
            if (month > 0) {
              const monthlySavingsAmount = formatCurrency(monthlySavings);
              return [
                "",
                `Monthly savings: ${monthlySavingsAmount}`,
                `Total saved so far: ${formatCurrency(month * monthlySavings)}`,
              ];
            }
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          callback: function (value) {
            const month = Number(value);
            if (month === 0) return "Start";
            if (month === breakEvenMonth) return `Break-even\n(${month}mo)`;
            if (month % 12 === 0) return `${month / 12}yr`;
            return month % 6 === 0 ? `${month}mo` : "";
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          callback: function (value) {
            return formatCurrency(value as number);
          },
        },
        // Add a zero line for better visual reference
        afterBuildTicks: function (scale) {
          if (!scale.ticks.some((tick) => tick.value === 0)) {
            scale.ticks.push({ value: 0, major: false });
            scale.ticks.sort((a, b) => a.value - b.value);
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="h-64 sm:h-96">
      <Line data={chartData} options={options} />
    </div>
  );
}
