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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AccumulationDataPoint } from "@/types/investment";
import { formatCurrency } from "@/utils/investmentCalculations";

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

interface AccumulationChartProps {
  data: AccumulationDataPoint[];
}

export default function AccumulationChart({ data }: AccumulationChartProps) {
  // Use yearly data for the chart
  const yearlyData = data.filter((item) => item.year % 1 === 0);

  if (yearlyData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No data available for chart display.
      </div>
    );
  }

  // Calculate the starting amount (only shows in year 0/1)
  const startingAmount =
    yearlyData.length > 0
      ? yearlyData[0].endingBalance -
        yearlyData[0].totalContributions -
        yearlyData[0].totalInterest
      : 0;

  const chartData = {
    labels: yearlyData.map((item) => `Year ${item.year}`),
    datasets: [
      {
        label: "Starting Amount",
        data: yearlyData.map(() => startingAmount),
        backgroundColor: "rgba(14, 165, 233, 0.8)", // blue-500 with transparency
        borderColor: "#0ea5e9",
        borderWidth: 1,
        fill: "origin", // Fill from zero
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#0ea5e9",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Contributions",
        data: yearlyData.map(
          (item) => startingAmount + item.totalContributions
        ),
        backgroundColor: "rgba(16, 185, 129, 0.8)", // emerald-500 with transparency
        borderColor: "#10b981",
        borderWidth: 1,
        fill: "-1", // Fill to previous dataset
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Interest",
        data: yearlyData.map((item) => item.endingBalance),
        backgroundColor: "rgba(139, 92, 246, 0.8)", // violet-500 with transparency
        borderColor: "#8b5cf6",
        borderWidth: 1,
        fill: "-1", // Fill to previous dataset
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "system-ui",
          },
          color: "#6b7280", // gray-500
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
          font: {
            size: 12,
            family: "system-ui",
          },
          color: "#6b7280", // gray-500
          padding: 8,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 13,
            family: "system-ui",
            weight: 500,
          },
          color: "#374151", // gray-700
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function (tooltipItems: any) {
            return tooltipItems[0].label;
          },
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            const yearData = yearlyData[dataIndex];

            if (context.datasetIndex === 0) {
              return `Starting Amount: ${formatCurrency(startingAmount)}`;
            } else if (context.datasetIndex === 1) {
              return `Total Contributions: ${formatCurrency(
                yearData.totalContributions
              )}`;
            } else {
              return `Interest Earned: ${formatCurrency(
                yearData.totalInterest
              )}`;
            }
          },
          afterBody: function (tooltipItems: any) {
            const dataIndex = tooltipItems[0].dataIndex;
            const yearData = yearlyData[dataIndex];
            return [`Total Balance: ${formatCurrency(yearData.endingBalance)}`];
          },
        },
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Chart takes full h-96 height */}
      <div className="w-full h-96">
        <Line data={chartData} options={options} />
      </div>

      {/* Summary below chart - additional space */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase tracking-wide">
            Final Balance
          </span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(
              yearlyData[yearlyData.length - 1]?.endingBalance || 0
            )}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase tracking-wide">
            Total Interest
          </span>
          <span className="font-semibold text-emerald-600">
            {formatCurrency(
              yearlyData[yearlyData.length - 1]?.totalInterest || 0
            )}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs uppercase tracking-wide">
            Growth Rate
          </span>
          <span className="font-semibold text-violet-600">
            {yearlyData.length > 0 && startingAmount > 0
              ? `${(
                  (Math.pow(
                    (yearlyData[yearlyData.length - 1]?.endingBalance || 0) /
                      (startingAmount +
                        (yearlyData[yearlyData.length - 1]
                          ?.totalContributions || 0)),
                    1 / yearlyData.length
                  ) -
                    1) *
                  100
                ).toFixed(1)}%`
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
