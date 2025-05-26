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
import { BMRResults, BMRFormValues } from "@/types/bmr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityLevelChartProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function ActivityLevelChart({
  results,
  formValues,
}: ActivityLevelChartProps) {
  const unit = formValues.resultUnit === "calories" ? "Calories" : "kJ";

  const data = {
    labels: [
      "BMR",
      "Sedentary",
      "Light Exercise",
      "Moderate Exercise",
      "Very Active",
      "Extremely Active",
      "Super Active",
    ],
    datasets: [
      {
        label: `Daily ${unit}`,
        data: [
          results.bmr,
          results.activityLevels.sedentary,
          results.activityLevels.lightlyActive,
          results.activityLevels.moderatelyActive,
          results.activityLevels.veryActive,
          results.activityLevels.extremelyActive,
          results.activityLevels.superActive,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // BMR - blue
          "rgba(34, 197, 94, 0.8)", // Sedentary - green
          "rgba(251, 191, 36, 0.8)", // Light - yellow
          "rgba(249, 115, 22, 0.8)", // Moderate - orange
          "rgba(239, 68, 68, 0.8)", // Very Active - red
          "rgba(168, 85, 247, 0.8)", // Extremely Active - purple
          "rgba(236, 72, 153, 0.8)", // Super Active - pink
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 1,
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
        text: `Daily Calorie Needs by Activity Level (${unit})`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        color: "#374151",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y.toLocaleString()} ${unit}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
          color: "#6B7280",
        },
        grid: {
          color: "#E5E7EB",
        },
        title: {
          display: true,
          text: `${unit} per Day`,
          color: "#374151",
          font: {
            weight: "bold" as const,
          },
        },
      },
      x: {
        ticks: {
          color: "#6B7280",
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-96">
      <Bar data={data} options={options} />
    </div>
  );
}
