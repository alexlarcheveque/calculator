"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BodyFatResults } from "@/types/bodyFat";
import { formatWeight, formatPercentage } from "@/utils/bodyFatCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BodyCompositionChartProps {
  results: BodyFatResults;
}

export default function BodyCompositionChart({
  results,
}: BodyCompositionChartProps) {
  const bodyFatMass = results.bodyFatMass;
  const leanBodyMass = results.leanBodyMass;
  const totalWeight = bodyFatMass + leanBodyMass;

  const bodyFatPercentage = ((bodyFatMass / totalWeight) * 100).toFixed(1);
  const leanMassPercentage = ((leanBodyMass / totalWeight) * 100).toFixed(1);

  const data = {
    labels: ["Body Fat", "Lean Mass"],
    datasets: [
      {
        data: [bodyFatMass, leanBodyMass],
        backgroundColor: ["#EF4444", "#10B981"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverBackgroundColor: ["#DC2626", "#059669"],
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
                const percentage =
                  i === 0 ? bodyFatPercentage : leanMassPercentage;

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
            const percentage = ((value / totalWeight) * 100).toFixed(1);
            return `${label}: ${formatWeight(
              value,
              results.unitSystem
            )} (${percentage}%)`;
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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">
              Body Fat: {formatWeight(bodyFatMass, results.unitSystem)} (
              {bodyFatPercentage}%)
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">
              Lean Mass: {formatWeight(leanBodyMass, results.unitSystem)} (
              {leanMassPercentage}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
