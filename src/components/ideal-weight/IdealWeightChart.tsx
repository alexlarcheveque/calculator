"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IdealWeightResults, UnitSystem } from "@/types/idealWeight";
import {
  getAllFormulaResults,
  formatWeight,
} from "@/utils/idealWeightCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IdealWeightChartProps {
  results: IdealWeightResults;
}

export default function IdealWeightChart({ results }: IdealWeightChartProps) {
  const formulaResults = getAllFormulaResults(results);
  const weightUnit = results.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";

  const chartData = {
    labels: [
      ...formulaResults.map((f) => f.name),
      "BMI Range Min",
      "BMI Range Max",
    ],
    datasets: [
      {
        label: `Ideal Weight (${weightUnit})`,
        data: [
          ...formulaResults.map((f) => f.weight),
          results.bmiRangeMin,
          results.bmiRangeMax,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(245, 158, 11, 0.8)", // Yellow
          "rgba(239, 68, 68, 0.8)", // Red
          "rgba(139, 92, 246, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Ideal Weight Comparison (${weightUnit})`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        color: "#374151",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y.toFixed(1)} ${weightUnit}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Weight (${weightUnit})`,
          font: {
            size: 12,
            weight: "bold" as const,
          },
          color: "#6B7280",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        ticks: {
          color: "#6B7280",
          callback: function (value: any) {
            return `${value} ${weightUnit}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Formula",
          font: {
            size: 12,
            weight: "bold" as const,
          },
          color: "#6B7280",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Chart Explanation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Each bar represents the ideal weight calculated using different
            formulas
          </li>
          <li>
            BMI Range shows the healthy weight range based on WHO guidelines
            (BMI 18.5-25)
          </li>
          <li>
            All formulas are designed for adults and may vary based on
            individual factors
          </li>
        </ul>
      </div>
    </div>
  );
}
