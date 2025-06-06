"use client";

import { useMemo } from "react";
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
  // Memoize the yearly data processing
  const yearlyData = useMemo(() => {
    const grouped = data.reduce((acc, point) => {
      if (!acc[point.year]) {
        acc[point.year] = [];
      }
      acc[point.year].push(point.inflationRate);
      return acc;
    }, {} as { [year: number]: number[] });

    // Calculate annual averages
    const yearlyAverages = Object.entries(grouped).map(([year, rates]) => ({
      year: parseInt(year),
      avgRate: rates.reduce((sum, rate) => sum + rate, 0) / rates.length,
    }));

    // Sort by year and sample every 5 years for performance
    // (keep first, last, and every 5th year)
    const sortedData = yearlyAverages.sort((a, b) => a.year - b.year);
    const sampledData = sortedData.filter((item, index) => {
      return (
        index === 0 || // First year
        index === sortedData.length - 1 || // Last year
        item.year % 5 === 0 // Every 5th year
      );
    });

    const chartLabels = sampledData.map((item) => item.year.toString());
    const chartData = sampledData.map((item) => item.avgRate);

    return { chartLabels, chartData };
  }, [data]);

  // Memoize projection data processing
  const projectionData = useMemo(() => {
    if (!projectionRate || !projectionYears || !calculationType) {
      return { projectionLabels: [], projectionData: [] };
    }

    const currentYear = new Date().getFullYear();
    const startYear =
      calculationType === InflationCalculatorType.BACKWARD_RATE
        ? currentYear - projectionYears
        : currentYear;
    const endYear =
      calculationType === InflationCalculatorType.BACKWARD_RATE
        ? currentYear
        : currentYear + projectionYears;

    const projectionLabels: string[] = [];
    const projectionDataPoints: number[] = [];

    for (let year = startYear; year <= endYear; year++) {
      projectionLabels.push(year.toString());
      projectionDataPoints.push(projectionRate);
    }

    return { projectionLabels, projectionData: projectionDataPoints };
  }, [projectionRate, projectionYears, calculationType]);

  // Memoize chart configuration
  const chartConfig = useMemo(() => {
    const datasets: any[] = [
      {
        label: "Historical Inflation Rate",
        data: yearlyData.chartData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ];

    // Add projection dataset if available
    if (projectionData.projectionData.length > 0) {
      datasets.push({
        label:
          calculationType === InflationCalculatorType.BACKWARD_RATE
            ? "Assumed Historical Rate"
            : "Projected Rate",
        data: projectionData.projectionData,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderDash: [5, 5],
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
      });
    }

    let labels = yearlyData.chartLabels;
    let displayDatasets = [datasets[0]];

    // Handle projection data display
    if (projectionData.projectionData.length > 0) {
      if (yearlyData.chartData.length > 0) {
        // Combine historical and projection data
        labels = [
          ...yearlyData.chartLabels,
          ...projectionData.projectionLabels.slice(1),
        ];
        displayDatasets = datasets;
      } else {
        // Only projection data
        labels = projectionData.projectionLabels;
        displayDatasets = [datasets[1]];
      }
    }

    return {
      labels,
      datasets: displayDatasets,
    };
  }, [yearlyData, projectionData, calculationType]);

  // Memoize options
  const options = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <div className="h-64">
      <Line data={chartConfig} options={options} />
    </div>
  );
}
