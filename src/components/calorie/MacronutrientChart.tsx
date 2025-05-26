"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CalorieResults, ResultUnit } from "@/types/calorie";
import { formatCalories, formatNumber } from "@/utils/calorieCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacronutrientChartProps {
  results: CalorieResults;
  resultUnit: ResultUnit;
}

export default function MacronutrientChart({
  results,
  resultUnit,
}: MacronutrientChartProps) {
  const { protein, carbs, fat } = results.macronutrients;

  const data = {
    labels: ["Protein", "Carbohydrates", "Fat"],
    datasets: [
      {
        data: [protein.calories, carbs.calories, fat.calories],
        backgroundColor: ["#ef4444", "#eab308", "#22c55e"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverBackgroundColor: ["#dc2626", "#ca8a04", "#16a34a"],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const macroData = i === 0 ? protein : i === 1 ? carbs : fat;
                const percentage = macroData.percentage;

                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            const macroData =
              context.dataIndex === 0
                ? protein
                : context.dataIndex === 1
                ? carbs
                : fat;
            return [
              `${label}: ${formatCalories(value, resultUnit)}`,
              `${formatNumber(macroData.grams)}g (${macroData.percentage}%)`,
            ];
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
      <Pie data={data} options={options} />

      {/* Summary below chart */}
      <div className="mt-4 text-center">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">
              Protein: {formatNumber(protein.grams)}g
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">
              Carbs: {formatNumber(carbs.grams)}g
            </span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">
              Fat: {formatNumber(fat.grams)}g
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
