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
import { InflationDataPoint, InflationCalculatorType } from "@/types/inflation";
import { formatPercentage } from "@/utils/inflationCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InflationTrendChartProps {
  data: InflationDataPoint[];
  projectionRate?: number;
  projectionYears?: number;
  calculationType?: InflationCalculatorType;
}

export default function InflationTrendChart({
  data,
  projectionRate,
  projectionYears,
  calculationType,
}: InflationTrendChartProps) {
  // Group data by year and calculate annual averages
  const yearlyData = data.reduce((acc, point) => {
    if (!acc[point.year]) {
      acc[point.year] = [];
    }
    acc[point.year].push(point.inflationRate);
    return acc;
  }, {} as { [year: number]: number[] });

  const chartLabels = Object.keys(yearlyData).map((year) => year);
  const chartData = Object.values(yearlyData).map(
    (rates) => rates.reduce((sum, rate) => sum + rate, 0) / rates.length
  );

  // Add projection data if provided
  let projectionLabels: string[] = [];
  let projectionData: number[] = [];

  if (projectionRate && projectionYears && calculationType) {
    const currentYear = new Date().getFullYear();
    const startYear =
      calculationType === InflationCalculatorType.BACKWARD_RATE
        ? currentYear - projectionYears
        : currentYear;
    const endYear =
      calculationType === InflationCalculatorType.BACKWARD_RATE
        ? currentYear
        : currentYear + projectionYears;

    for (let year = startYear; year <= endYear; year++) {
      projectionLabels.push(year.toString());
      projectionData.push(projectionRate);
    }
  }

  const datasets: any[] = [
    {
      label: "Historical Inflation Rate",
      data: chartData,
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ];

  // Add projection dataset if available
  if (projectionData.length > 0) {
    datasets.push({
      label:
        calculationType === InflationCalculatorType.BACKWARD_RATE
          ? "Assumed Historical Rate"
          : "Projected Rate",
      data: projectionData,
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderDash: [5, 5],
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
    });
  }

  const chartConfig = {
    labels: projectionLabels.length > 0 ? projectionLabels : chartLabels,
    datasets: projectionData.length > 0 ? [datasets[1]] : [datasets[0]],
  };

  // If we have both historical and projection data, combine them
  if (projectionData.length > 0 && chartData.length > 0) {
    chartConfig.labels = [...chartLabels, ...projectionLabels.slice(1)];
    chartConfig.datasets = datasets;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${formatPercentage(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatPercentage(value);
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartConfig} options={options} />
    </div>
  );
}
