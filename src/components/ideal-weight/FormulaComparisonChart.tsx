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

interface FormulaComparisonChartProps {
  results: IdealWeightResults;
}

export default function FormulaComparisonChart({
  results,
}: FormulaComparisonChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const formulaResults = getAllFormulaResults(results).sort(
    (a, b) => a.weight - b.weight
  );
  const weightUnit = results.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const colorMap = (name: string) => {
    if (name.startsWith("Robinson"))
      return ["rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 1)"]; // Blue
    if (name.startsWith("Miller"))
      return ["rgba(16, 185, 129, 0.8)", "rgba(16, 185, 129, 1)"]; // Green
    if (name.startsWith("Devine"))
      return ["rgba(245, 158, 11, 0.8)", "rgba(245, 158, 11, 1)"]; // Yellow
    return ["rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 1)"]; // Red (Hamwi)
  };

  const backgroundColors = formulaResults.map((f) => colorMap(f.name)[0]);
  const borderColors = formulaResults.map((f) => colorMap(f.name)[1]);

  const chartData = {
    labels: formulaResults.map((f) => f.name),
    datasets: [
      {
        label: `Ideal Weight (${weightUnit})`,
        data: formulaResults.map((f) => f.weight),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
        text: `Ideal Weight Formula Comparison`,
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
        },
      },
    },
  };

  const getFormulaDescription = (name: string) => {
    switch (name) {
      case "Robinson":
        return "Modern and widely used formula";
      case "Miller":
        return "Slight variation of Robinson formula";
      case "Devine":
        return "Based on drug dosing studies";
      case "Hamwi":
        return "Used in clinical settings";
      default:
        return "Formula-based estimate";
    }
  };

  return (
    <div className="w-full">
      <div className="h-96">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {formulaResults.map((formula) => (
          <div key={formula.name} className="text-sm p-2 rounded bg-gray-50">
            <div className="font-medium text-gray-800">{formula.name}</div>
            <div className="text-xs text-gray-600">
              {getFormulaDescription(formula.name)}
            </div>
            <div className="text-xs text-gray-500">
              {formatWeight(formula.weight, results.unitSystem)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
