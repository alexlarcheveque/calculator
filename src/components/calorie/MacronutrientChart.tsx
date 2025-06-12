"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { CalorieResults, ResultUnit } from "@/types/calorie";
import { formatCalories, formatNumber } from "@/utils/calorieCalculations";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
    datasets: [
      {
        data: [protein.calories, carbs.calories, fat.calories],
        backgroundColor: ["#ef4444", "#eab308", "#22c55e"],
        borderColor: ["#dc2626", "#ca8a04", "#16a34a"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed;
            const macroData =
              context.dataIndex === 0
                ? protein
                : context.dataIndex === 1
                ? carbs
                : fat;
            return `${formatCalories(value, resultUnit)} (${formatNumber(
              macroData.grams
            )}g)`;
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: function (value: any, context: any) {
          const labels = [
            `Protein (${protein.percentage}%)`,
            `Carbs (${carbs.percentage}%)`,
            `Fat (${fat.percentage}%)`,
          ];
          return labels[context.dataIndex];
        },
        textAlign: "center" as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: "350px", height: "350px" }}>
        <Pie data={data} options={options} width={350} height={350} />
      </div>

      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="font-medium">Protein</span>
          </div>
          <div className="text-gray-600">{formatNumber(protein.grams)}g</div>
          <div className="text-xs text-gray-500">
            {formatCalories(protein.calories, resultUnit)}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="font-medium">Carbs</span>
          </div>
          <div className="text-gray-600">{formatNumber(carbs.grams)}g</div>
          <div className="text-xs text-gray-500">
            {formatCalories(carbs.calories, resultUnit)}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="font-medium">Fat</span>
          </div>
          <div className="text-gray-600">{formatNumber(fat.grams)}g</div>
          <div className="text-xs text-gray-500">
            {formatCalories(fat.calories, resultUnit)}
          </div>
        </div>
      </div>
    </div>
  );
}
