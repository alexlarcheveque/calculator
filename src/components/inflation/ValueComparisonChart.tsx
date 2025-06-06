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
import { InflationResults, InflationCalculatorType } from "@/types/inflation";
import { formatCurrency } from "@/utils/inflationCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ValueComparisonChartProps {
  results: InflationResults;
}

export default function ValueComparisonChart({
  results,
}: ValueComparisonChartProps) {
  const getChartLabels = () => {
    switch (results.calculationType) {
      case InflationCalculatorType.CPI_DATA:
        return ["Original Value", "Inflation-Adjusted Value"];
      case InflationCalculatorType.FORWARD_RATE:
        return ["Today's Value", `Value in ${results.yearsDifference} Years`];
      case InflationCalculatorType.BACKWARD_RATE:
        return [`Value ${results.yearsDifference} Years Ago`, "Today's Value"];
      default:
        return ["Original", "Adjusted"];
    }
  };

  const data = {
    labels: getChartLabels(),
    datasets: [
      {
        label: "Amount",
        data: [results.originalAmount, results.adjustedAmount],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"],
        borderColor: ["rgb(59, 130, 246)", "rgb(16, 185, 129)"],
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
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
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
