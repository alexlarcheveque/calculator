"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AccumulationData, formatCurrency } from "./InterestPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AccumulationLineChartProps {
  schedule: AccumulationData[];
  investmentLengthYears: number;
}

const CHART_COLORS = {
  endingBalance: "rgb(136, 132, 216)", // Recharts default #8884d8
  totalDeposits: "rgb(130, 202, 157)", // Recharts default #82ca9d
  grid: "rgba(200, 200, 200, 0.3)",
  text: "#4b5563", // text-gray-600 for labels/ticks
};

export default function AccumulationLineChart({
  schedule,
  investmentLengthYears,
}: AccumulationLineChartProps) {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Chart data not available.
      </div>
    );
  }

  const isYearlyView = investmentLengthYears >= 1;
  // Prepare data for Chart.js
  // If investment length is very short (e.g., < 1 year), we might want to show periodic (e.g., monthly) data.
  // Otherwise, show yearly data.
  const chartDisplayData = isYearlyView
    ? schedule.filter((item) => item.isYearEnd)
    : schedule;

  if (chartDisplayData.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Not enough data points for chart.
      </div>
    );
  }

  const labels = chartDisplayData.map((item) =>
    isYearlyView ? `Year ${item.year}` : `Period ${item.period}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Ending Balance",
        data: chartDisplayData.map((item) => item.endingBalance),
        borderColor: CHART_COLORS.endingBalance,
        backgroundColor: CHART_COLORS.endingBalance
          .replace(")", ", 0.5)")
          .replace("rgb", "rgba"),
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Total Deposits/Contributions",
        data: chartDisplayData.map((item) => item.deposit), // deposit is cumulative principal + contributions
        borderColor: CHART_COLORS.totalDeposits,
        backgroundColor: CHART_COLORS.totalDeposits
          .replace(")", ", 0.5)")
          .replace("rgb", "rgba"),
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderDash: [5, 5], // Dashed line for deposits
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: isYearlyView ? "Year" : "Period",
          font: { size: 12, family: "system-ui, sans-serif" },
          color: CHART_COLORS.text,
        },
        ticks: {
          color: CHART_COLORS.text,
          font: { size: 10, family: "system-ui, sans-serif" },
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
      y: {
        title: {
          display: true,
          text: "Balance",
          font: { size: 12, family: "system-ui, sans-serif" },
          color: CHART_COLORS.text,
        },
        ticks: {
          callback: function (value: string | number) {
            return formatCurrency(Number(value));
          },
          color: CHART_COLORS.text,
          font: { size: 10, family: "system-ui, sans-serif" },
        },
        grid: {
          color: CHART_COLORS.grid,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          font: { size: 12, family: "system-ui, sans-serif" },
          color: CHART_COLORS.text,
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
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          },
        },
      },
      title: {
        display: false, // No main title on the chart, using the one in InterestCharts.tsx
      },
    },
  };

  return (
    <div className="w-full h-72 md:h-80 mx-auto">
      <Line options={options} data={data} />
    </div>
  );
}
