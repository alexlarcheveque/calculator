"use client";

import {
  AmortizationResults,
  AmortizationScheduleItem,
} from "@/types/amortization";
import { formatCurrency } from "@/utils/amortizationCalculations";
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
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

interface PrincipalInterestChartProps {
  results: AmortizationResults;
  scheduleData: AmortizationScheduleItem[];
}

export default function PrincipalInterestChart({
  results,
  scheduleData,
}: PrincipalInterestChartProps) {
  // Find crossover point where principal > interest
  const crossoverIndex = scheduleData.findIndex(
    (item) => item.principalPayment > item.interestPayment
  );
  const crossoverYear =
    crossoverIndex !== -1 ? Math.ceil((crossoverIndex + 1) / 12) : null;

  // Create data for the chart - sample every month for the first few years, then annually
  const maxMonths = scheduleData.length;
  const labels: number[] = Array.from({ length: maxMonths }, (_, i) => i + 1);

  const principalData = scheduleData.map((item) => item.principalPayment);
  const interestData = scheduleData.map((item) => item.interestPayment);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Interest Payment",
        data: interestData,
        borderColor: "#ef4444", // Red
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "Principal Payment",
        data: principalData,
        borderColor: "#2563eb", // Blue
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
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
          boxWidth: 10,
          font: { size: 12, family: "system-ui" },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          title: function (context) {
            const month = context[0].parsed.x;
            const years = Math.floor(month / 12);
            const remainingMonths = month % 12;
            let titleStr = `Month ${month}`;
            if (years > 0) {
              titleStr += ` (${years}y`;
              if (remainingMonths > 0) titleStr += ` ${remainingMonths}m`;
              titleStr += `)`;
            }
            return titleStr;
          },
          label: function (context) {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            return `${datasetLabel}: ${formatCurrency(value)}`;
          },
        },
      },
      annotation: {
        annotations: {
          crossover:
            crossoverIndex !== -1 && crossoverIndex < maxMonths
              ? {
                  type: "line",
                  xMin: crossoverIndex + 1,
                  xMax: crossoverIndex + 1,
                  borderColor: "#059669",
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    display: true,
                    content: `Principal > Interest: Year ${crossoverYear}`,
                    position: "start",
                    backgroundColor: "rgba(5, 150, 105, 0.8)",
                    font: { size: 10, weight: "bold" },
                    padding: 4,
                    yAdjust: -15,
                  },
                }
              : {},
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Months)",
          color: "#4b5563",
          font: { size: 12, weight: "normal" },
        },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          color: "#4b5563",
          font: { size: 11 },
          callback: function (value) {
            const month = Number(labels[value as number]);
            if (month === 1) return "Start";
            if (month % 12 === 0) return `${month / 12}yr`;
            if (maxMonths <= 60 && month % 6 === 0) return `${month}mo`;
            if (maxMonths > 60 && maxMonths <= 240 && month % 24 === 0)
              return `${month / 12}yr`;
            if (maxMonths > 240 && month % 60 === 0) return `${month / 12}yr`;
            return "";
          },
          maxRotation: 0,
          autoSkipPadding: 20,
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: "Monthly Payment Amount ($)",
          color: "#4b5563",
          font: { size: 12, weight: "normal" },
        },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          color: "#4b5563",
          font: { size: 11 },
          callback: function (value) {
            return formatCurrency(value as number);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  let chartTitle = "Monthly Payment Breakdown Over Time";
  let summaryText =
    "See how your payment allocation shifts from interest to principal over the life of your loan.";

  if (crossoverYear) {
    summaryText += ` Principal payments exceed interest payments starting in year ${crossoverYear}.`;
  }

  summaryText += ` Early payments are mostly interest (${Math.round(
    results.interestPercentage
  )}% total).`;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-1 text-gray-800 text-center">
        {chartTitle}
      </h3>
      <p className="text-xs text-gray-500 text-center mb-4 px-4">
        {summaryText}
      </p>
      <div className="h-72 sm:h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
