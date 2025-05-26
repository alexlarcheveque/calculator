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
import { CompoundInterestGrowthDataPoint } from "@/types/compoundInterest";
import { formatCurrency } from "@/utils/compoundInterestCalculations";

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

interface CompoundInterestChartProps {
  data: CompoundInterestGrowthDataPoint[];
  title: string;
  showComparison?: boolean;
  comparisonData?: CompoundInterestGrowthDataPoint[];
  comparisonLabel?: string;
}

export default function CompoundInterestChart({
  data,
  title,
  showComparison = false,
  comparisonData,
  comparisonLabel = "Simple Interest",
}: CompoundInterestChartProps) {
  const chartData = {
    labels: data.map((point) => `Year ${point.year}`),
    datasets: [
      {
        label: "Total Value",
        data: data.map((point) => point.totalValue),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Principal",
        data: data.map((point) => point.principal),
        borderColor: "#64748b",
        backgroundColor: "rgba(100, 116, 139, 0.1)",
        fill: false,
        tension: 0,
        pointRadius: 2,
        pointHoverRadius: 4,
        borderDash: [5, 5],
      },
      ...(showComparison && comparisonData
        ? [
            {
              label: comparisonLabel,
              data: comparisonData.map((point) => point.totalValue),
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: false,
              tension: 0.4,
              pointRadius: 3,
              pointHoverRadius: 5,
              borderDash: [10, 5],
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
            family: "system-ui",
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 600,
          family: "system-ui",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#0ea5e9",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${formatCurrency(value)}`;
          },
          afterBody: function (tooltipItems: any[]) {
            if (tooltipItems.length > 0) {
              const dataIndex = tooltipItems[0].dataIndex;
              const dataPoint = data[dataIndex];
              if (dataPoint) {
                return [
                  `Interest Earned: ${formatCurrency(dataPoint.interest)}`,
                  `Growth: ${(
                    (dataPoint.totalValue / dataPoint.principal - 1) *
                    100
                  ).toFixed(1)}%`,
                ];
              }
            }
            return [];
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time (Years)",
          font: {
            size: 12,
            weight: 600,
            family: "system-ui",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value ($)",
          font: {
            size: 12,
            weight: 600,
            family: "system-ui",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
