"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { InterestRateResults } from "@/types/interestRate";
import { formatCurrency } from "@/utils/interestRateCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentDistributionChartProps {
  results: InterestRateResults;
}

export default function PaymentDistributionChart({
  results,
}: PaymentDistributionChartProps) {
  const principalAmount = results.loanAmount;
  const interestAmount = results.totalInterestPaid;
  const totalAmount = principalAmount + interestAmount;

  const principalPercentage = ((principalAmount / totalAmount) * 100).toFixed(
    0
  );
  const interestPercentage = ((interestAmount / totalAmount) * 100).toFixed(0);

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [principalAmount, interestAmount],
        backgroundColor: ["#2b7ddb", "#8bbc21"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverBackgroundColor: ["#1e5a96", "#6a9419"],
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
                  i === 0 ? principalPercentage : interestPercentage;

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
            const percentage = ((value / totalAmount) * 100).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
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
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">
              Principal: {formatCurrency(principalAmount)} (
              {principalPercentage}%)
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">
              Interest: {formatCurrency(interestAmount)} ({interestPercentage}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
