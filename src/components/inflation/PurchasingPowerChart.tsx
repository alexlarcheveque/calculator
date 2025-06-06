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
import { InflationResults } from "@/types/inflation";
import { formatCurrency } from "@/utils/inflationCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PurchasingPowerChartProps {
  results: InflationResults;
}

export default function PurchasingPowerChart({
  results,
}: PurchasingPowerChartProps) {
  const chartData = useMemo(() => {
    const baseAmount = results.originalAmount;
    const userInflationRate = results.inflationRate / 100;
    const maxYears = Math.max(results.yearsDifference, 10); // Use actual years, minimum 10 for better visualization

    // Generate data based on the actual years from results
    const years = Array.from({ length: maxYears + 1 }, (_, i) => i);
    const labels = years.map((year) => (year === 0 ? "Today" : `${year}Y`));

    // Calculate purchasing power erosion for different scenarios
    const scenarios = [
      { rate: 0.02, label: "2% Inflation", color: "rgb(34, 197, 94)" },
      {
        rate: userInflationRate,
        label: `${results.inflationRate.toFixed(1)}% (Your Rate)`,
        color: "rgb(59, 130, 246)",
      },
      { rate: 0.06, label: "6% Inflation", color: "rgb(239, 68, 68)" },
    ];

    const datasets = scenarios.map((scenario) => ({
      label: scenario.label,
      data: years.map((year) => baseAmount / Math.pow(1 + scenario.rate, year)),
      borderColor: scenario.color,
      backgroundColor: scenario.color
        .replace("rgb", "rgba")
        .replace(")", ", 0.1)"),
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: scenario.rate === userInflationRate ? 3 : 2,
    }));

    return {
      labels,
      datasets,
    };
  }, [results]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
          },
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function (context: any) {
              const year = context[0].label;
              return year === "Today"
                ? "Today"
                : `After ${year.replace("Y", " years")}`;
            },
            label: function (context: any) {
              const value = context.parsed.y;
              const percentLoss =
                ((results.originalAmount - value) / results.originalAmount) *
                100;
              return `${context.dataset.label}: ${formatCurrency(
                value
              )} (${percentLoss.toFixed(1)}% less buying power)`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Purchasing Power",
          },
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
          title: {
            display: true,
            text: "Years",
          },
          grid: {
            display: false,
          },
        },
      },
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
    }),
    [results]
  );

  return (
    <div className="h-96">
      <Line data={chartData} options={options} />
    </div>
  );
}
