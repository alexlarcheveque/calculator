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

interface WeightRangeChartProps {
  results: IdealWeightResults;
}

export default function WeightRangeChart({ results }: WeightRangeChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const formulaResults = getAllFormulaResults(results);
  const weightUnit = results.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: ["BMI Range", "Formula Average"],
    datasets: [
      {
        label: "Minimum",
        data: [
          results.bmiRangeMin,
          Math.min(...formulaResults.map((f) => f.weight)),
        ],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
      {
        label: "Maximum",
        data: [
          results.bmiRangeMax,
          Math.max(...formulaResults.map((f) => f.weight)),
        ],
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weight Range Comparison",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(
              1
            )} ${weightUnit}`;
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
            weight: "bold" as const,
          },
        },
        ticks: {
          callback: function (value: any) {
            return `${value} ${weightUnit}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Range Type",
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
  };

  const averageFormula =
    formulaResults.reduce((sum, f) => sum + f.weight, 0) /
    formulaResults.length;
  const bmiAverage = (results.bmiRangeMin + results.bmiRangeMax) / 2;

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} data={chartData} options={options} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">BMI-Based Range</h4>
          <div className="text-sm text-blue-700">
            <p>
              <strong>Range:</strong>{" "}
              {formatWeight(results.bmiRangeMin, results.unitSystem)} -{" "}
              {formatWeight(results.bmiRangeMax, results.unitSystem)}
            </p>
            <p>
              <strong>Average:</strong>{" "}
              {formatWeight(bmiAverage, results.unitSystem)}
            </p>
            <p className="text-xs mt-2">Based on BMI 18.5-25</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">
            Formula-Based Range
          </h4>
          <div className="text-sm text-green-700">
            <p>
              <strong>Range:</strong>{" "}
              {formatWeight(
                Math.min(...formulaResults.map((f) => f.weight)),
                results.unitSystem
              )}{" "}
              -{" "}
              {formatWeight(
                Math.max(...formulaResults.map((f) => f.weight)),
                results.unitSystem
              )}
            </p>
            <p>
              <strong>Average:</strong>{" "}
              {formatWeight(averageFormula, results.unitSystem)}
            </p>
            <p className="text-xs mt-2">
              Based on {formulaResults.length} formulas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
