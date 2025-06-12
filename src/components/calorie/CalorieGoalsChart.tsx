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
import {
  convertCaloriesForDisplay,
  formatCalories,
} from "@/utils/calorieCalculations";

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
      "Aggressive\nLoss\n(-2 lbs/week)",
      "Moderate\nLoss\n(-1 lb/week)",
      "Mild\nLoss\n(-0.5 lbs/week)",
      "Maintenance",
      "Mild\nGain\n(+0.5 lbs/week)",
      "Moderate\nGain\n(+1 lb/week)",
      "Aggressive\nGain\n(+2 lbs/week)",
    ],
    datasets: [
      {
        label: `Daily Calories`,
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
          "#b91c1c",
          "#dc2626",
          "#ea580c",
          "#16a34a",
          "#2563eb",
          "#7c3aed",
          "#9333ea",
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
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Daily Calories (${unitLabel})`,
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          font: {
            size: 12,
          },
          padding: 10,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center h-96">
      <div className="flex-1 w-full">
        <Bar data={data} options={options} />
      </div>

      {/* Legend below chart */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-700"></div>
          <span>
            Aggressive Loss (-2 lbs/week):{" "}
            {formatCalories(results.weightLossCalories.aggressive, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600"></div>
          <span>
            Mild Gain (+0.5 lbs/week):{" "}
            {formatCalories(results.weightGainCalories.mild, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-600"></div>
          <span>
            Moderate Loss (-1 lb/week):{" "}
            {formatCalories(results.weightLossCalories.moderate, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-600"></div>
          <span>
            Moderate Gain (+1 lb/week):{" "}
            {formatCalories(results.weightGainCalories.moderate, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-600"></div>
          <span>
            Mild Loss (-0.5 lbs/week):{" "}
            {formatCalories(results.weightLossCalories.mild, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-700"></div>
          <span>
            Aggressive Gain (+2 lbs/week):{" "}
            {formatCalories(results.weightGainCalories.aggressive, resultUnit)}
          </span>
        </div>
        <div className="flex items-center space-x-2 col-span-2 justify-center">
          <div className="w-3 h-3 bg-green-500"></div>
          <span className="font-medium">
            Maintenance:{" "}
            {formatCalories(results.maintenanceCalories, resultUnit)}
          </span>
        </div>
      </div>
    </div>
  );
}
