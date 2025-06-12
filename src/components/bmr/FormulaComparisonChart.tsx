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
import { calculateBMR } from "@/utils/bmrCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FormulaComparisonChartProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function FormulaComparisonChart({
  results,
  formValues,
}: FormulaComparisonChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate BMR using different formulas
  const generateFormulaData = () => {
    const formulas = ["mifflin", "harris", "katch"] as const;
    const labels = ["Mifflin-St Jeor", "Harris-Benedict", "Katch-McArdle"];
    const values = [];

    for (const formula of formulas) {
      const testFormValues = {
        ...formValues,
        formula: formula,
      };

      const bmrResult = calculateBMR(testFormValues);
      values.push(bmrResult.bmr);
    }

    return { labels, values };
  };

  const { labels, values } = generateFormulaData();

  // Determine which bar to highlight (current formula)
  const currentFormulaIndex = labels.findIndex((label) =>
    label.toLowerCase().includes(formValues.formula)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "BMR Value",
        data: values,
        backgroundColor: values.map((_, index) =>
          index === currentFormulaIndex
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(156, 163, 175, 0.6)"
        ),
        borderColor: values.map((_, index) =>
          index === currentFormulaIndex
            ? "rgb(59, 130, 246)"
            : "rgb(156, 163, 175)"
        ),
        borderWidth: 2,
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
        text: "BMR Formula Comparison",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const unit =
              formValues.resultUnit === "calories" ? "cal/day" : "kJ/day";
            const difference = context.parsed.y - results.bmr;
            const diffText =
              difference === 0
                ? " (Current)"
                : difference > 0
                ? ` (+${Math.round(difference)})`
                : ` (${Math.round(difference)})`;
            return `BMR: ${context.parsed.y.toLocaleString()} ${unit}${diffText}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Formula",
          font: {
            weight: "bold" as const,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `BMR (${
            formValues.resultUnit === "calories" ? "calories/day" : "kJ/day"
          })`,
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  const getFormulaDescription = (index: number) => {
    const descriptions = [
      "Most accurate for general population",
      "Traditional formula, slightly higher estimates",
      "Best for lean individuals with known body fat",
    ];
    return descriptions[index];
  };

  return (
    <div className="w-full">
      <div className="h-96">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      <div className="mt-4 space-y-2">
        {labels.map((label, index) => {
          const isSelected = index === currentFormulaIndex;
          return (
            <div
              key={label}
              className={`text-xs px-2 py-1 rounded ${
                isSelected
                  ? "bg-blue-50 border border-blue-200 text-blue-800"
                  : "text-gray-600"
              }`}
            >
              <div className="font-medium">{label}</div>
              <div className="text-xs opacity-75">
                {getFormulaDescription(index)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
