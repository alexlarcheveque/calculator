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
import { formatCurrency } from "@/utils/formatters";

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

  const chartData = {
    labels: yearlyData.map((item) => `Year ${item.year}`),
    datasets: [
      {
        label: "Starting Amount",
        data: yearlyData.map((item, index) =>
          index === 0
            ? item.endingBalance - item.totalContributions - item.totalInterest
            : 0
        ),
        backgroundColor: "#0ea5e9", // blue-500
        borderColor: "#0ea5e9",
        borderWidth: 0,
        fill: true,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Total Contributions",
        data: yearlyData.map((item, index) =>
          index === 0
            ? item.endingBalance - item.totalInterest
            : item.totalContributions
        ),
        backgroundColor: "#10b981", // emerald-500
        borderColor: "#10b981",
        borderWidth: 0,
        fill: "-1", // Fill to previous dataset
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Interest",
        data: yearlyData.map((item) => item.endingBalance),
        backgroundColor: "#dc2626", // red-600
        borderColor: "#dc2626",
        borderWidth: 2,
        fill: "-1", // Fill to previous dataset
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            const yearData = yearlyData[dataIndex];

            if (context.datasetIndex === 0) {
              const startingAmount =
                dataIndex === 0
                  ? yearData.endingBalance -
                    yearData.totalContributions -
                    yearData.totalInterest
                  : 0;
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
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />

      {/* Summary below chart */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-6">
          <span>
            Final Balance:{" "}
            {formatCurrency(data[data.length - 1]?.endingBalance || 0)}
          </span>
          <span>
            Total Interest:{" "}
            {formatCurrency(data[data.length - 1]?.totalInterest || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
