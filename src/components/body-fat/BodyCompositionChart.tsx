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

  // Custom plugin to draw text inside pie segments
  const textInsidePlugin = {
    id: "textInside",
    afterDatasetsDraw: function (chart: any) {
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);

      ctx.save();
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";

      meta.data.forEach((element: any, index: number) => {
        const model = element;
        const x = model.x;
        const y = model.y;

        // Calculate angle to position text in the middle of the segment
        const startAngle = model.startAngle;
        const endAngle = model.endAngle;
        const midAngle = (startAngle + endAngle) / 2;

        // Calculate position for text (slightly inward from edge)
        const radius = (model.innerRadius + model.outerRadius) / 2;
        const textX = x + Math.cos(midAngle) * radius * 0.7;
        const textY = y + Math.sin(midAngle) * radius * 0.7;

        // Draw the label text
        const label = chart.data.labels[index];
        ctx.fillText(label, textX, textY);

        // Draw the percentage below the label
        ctx.font = "bold 12px Arial";
        const percentage = index === 0 ? bodyFatPercentage : leanMassPercentage;
        ctx.fillText(`${percentage}%`, textX, textY + 16);
        ctx.font = "bold 14px Arial"; // Reset font for next iteration
      });

      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we now have text inside
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
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Body Composition
        </h3>
        <p className="text-sm text-gray-600">
          Your body fat vs lean mass distribution
        </p>
      </div>

      <div className="h-96 flex items-center justify-center">
        <div className="w-full max-w-md h-full">
          <Pie data={data} options={options} plugins={[textInsidePlugin]} />
        </div>
      </div>
    </div>
  );
}
