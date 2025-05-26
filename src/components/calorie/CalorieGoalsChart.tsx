"use client";

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
import { CalorieResults, ResultUnit } from "@/types/calorie";
import { convertCaloriesForDisplay } from "@/utils/calorieCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CalorieGoalsChartProps {
  results: CalorieResults;
  resultUnit: ResultUnit;
}

export default function CalorieGoalsChart({
  results,
  resultUnit,
}: CalorieGoalsChartProps) {
  const unitLabel = resultUnit === "kilojoules" ? "kJ" : "cal";

  const data = {
    labels: [
      "Aggressive Loss\n(-2 lbs/week)",
      "Moderate Loss\n(-1 lb/week)",
      "Mild Loss\n(-0.5 lbs/week)",
      "Maintenance",
      "Mild Gain\n(+0.5 lbs/week)",
      "Moderate Gain\n(+1 lb/week)",
      "Aggressive Gain\n(+2 lbs/week)",
    ],
    datasets: [
      {
        label: `Calories (${unitLabel})`,
        data: [
          convertCaloriesForDisplay(
            results.weightLossCalories.aggressive,
            resultUnit
          ),
          convertCaloriesForDisplay(
            results.weightLossCalories.moderate,
            resultUnit
          ),
          convertCaloriesForDisplay(
            results.weightLossCalories.mild,
            resultUnit
          ),
          convertCaloriesForDisplay(results.maintenanceCalories, resultUnit),
          convertCaloriesForDisplay(
            results.weightGainCalories.mild,
            resultUnit
          ),
          convertCaloriesForDisplay(
            results.weightGainCalories.moderate,
            resultUnit
          ),
          convertCaloriesForDisplay(
            results.weightGainCalories.aggressive,
            resultUnit
          ),
        ],
        backgroundColor: [
          "#dc2626", // red-600 - aggressive loss
          "#ef4444", // red-500 - moderate loss
          "#f97316", // orange-500 - mild loss
          "#22c55e", // green-500 - maintenance
          "#3b82f6", // blue-500 - mild gain
          "#8b5cf6", // violet-500 - moderate gain
          "#a855f7", // purple-500 - aggressive gain
        ],
        borderColor: [
          "#b91c1c", // red-700
          "#dc2626", // red-600
          "#ea580c", // orange-600
          "#16a34a", // green-600
          "#2563eb", // blue-600
          "#7c3aed", // violet-600
          "#9333ea", // purple-600
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
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            return `${value.toLocaleString()} ${unitLabel}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Calories (${unitLabel})`,
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Weight Goals",
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return (
    <div className="relative">
      <Bar data={data} options={options} />
    </div>
  );
}
