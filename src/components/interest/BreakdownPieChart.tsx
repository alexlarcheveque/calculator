"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { InterestCalculatorResult, formatCurrency } from "./InterestPage";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BreakdownPieChartProps {
  results: InterestCalculatorResult;
}

const CHART_COLORS = {
  initialInvestment: "rgb(59, 130, 246)", // Tailwind blue-500
  contributions: "rgb(16, 185, 129)", // Tailwind emerald-500
  interest: "rgb(239, 68, 68)", // Tailwind red-500
};

export default function BreakdownPieChart({ results }: BreakdownPieChartProps) {
  if (!results) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Chart data not available.
      </div>
    );
  }

  const initialInvestmentValue =
    results.totalPrincipal - results.totalContributions;
  const contributionsValue = results.totalContributions;
  const interestValue = results.totalInterest;

  const chartLabels = [];
  const chartDataValues = [];
  const backgroundColors = [];

  if (initialInvestmentValue > 0) {
    chartLabels.push("Initial Investment");
    chartDataValues.push(initialInvestmentValue);
    backgroundColors.push(CHART_COLORS.initialInvestment);
  }
  if (contributionsValue > 0) {
    chartLabels.push("Contributions");
    chartDataValues.push(contributionsValue);
    backgroundColors.push(CHART_COLORS.contributions);
  }
  if (interestValue > 0) {
    chartLabels.push("Interest");
    chartDataValues.push(interestValue);
    backgroundColors.push(CHART_COLORS.interest);
  }

  if (chartDataValues.length === 0 || chartDataValues.every((v) => v <= 0)) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Not enough data for chart.
      </div>
    );
  }

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Amount",
        data: chartDataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) =>
          color.replace(")", ", 0.7)").replace("rgb", "rgba")
        ), // Add slight transparency to border
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const totalValueForPercentage = chartDataValues.reduce(
    (sum, value) => sum + value,
    0
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          font: {
            size: 12,
            family: "system-ui, sans-serif",
          },
          color: "#4b5563", // text-gray-600, adapt if using dark mode
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 14, family: "system-ui, sans-serif" },
        bodyFont: { size: 12, family: "system-ui, sans-serif" },
        padding: 10,
        cornerRadius: 4,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw as number;
            if (totalValueForPercentage === 0)
              return `${label}: ${formatCurrency(value)}`;
            const percentage = (
              (value / totalValueForPercentage) *
              100
            ).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
      title: {
        display: false, // No main title on the chart itself
      },
    },
  };

  return (
    <div className="w-full md:h-80 mx-auto relative">
      <Doughnut data={data} options={options} />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        style={{ marginTop: "-10px" }} // Nudge up because legend is at bottom
      >
        <div className="text-sm text-muted-foreground">Ending Balance</div>
        <div className="text-2xl font-bold text-foreground">
          {formatCurrency(results.endingBalance)}
        </div>
      </div>
    </div>
  );
}
