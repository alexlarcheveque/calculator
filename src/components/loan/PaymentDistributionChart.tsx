"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  LoanResult,
  LoanType,
  AmortizedLoanResult,
  DeferredLoanResult,
  BondLoanResult,
  formatCurrency,
} from "./LoanPage";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentDistributionChartProps {
  loanType: LoanType;
  results: LoanResult;
}

export default function PaymentDistributionChart({
  loanType,
  results,
}: PaymentDistributionChartProps) {
  let chartData: number[] = [];
  let chartLabels: string[] = [];
  let totalValueForPercentage: number = 0;
  let centerTextValue: number | undefined;
  let centerTextLabel: string = "";

  if (loanType === "amortized" && results) {
    const amortizedResults = results as AmortizedLoanResult;
    chartLabels = ["Principal", "Interest"];
    chartData = [amortizedResults.principal, amortizedResults.totalInterest];
    totalValueForPercentage =
      amortizedResults.principal + amortizedResults.totalInterest; // This is total cost of loan
    centerTextValue = amortizedResults.paymentPerPeriod;
    centerTextLabel = "Payment / Period";
  } else if (loanType === "deferred" && results) {
    const deferredResults = results as DeferredLoanResult;
    chartLabels = ["Principal", "Interest"];
    chartData = [deferredResults.principal, deferredResults.totalInterest];
    totalValueForPercentage = deferredResults.amountDueAtMaturity;
    centerTextValue = deferredResults.amountDueAtMaturity;
    centerTextLabel = "Amount Due";
  } else if (loanType === "bond" && results) {
    const bondResults = results as BondLoanResult;
    // For bond, the interest is the difference between face value and amount received.
    // The "parts" are the amount received (principal-like) and the total interest.
    chartLabels = ["Amount Received", "Total Interest"];
    chartData = [bondResults.amountReceivedAtStart, bondResults.totalInterest];
    totalValueForPercentage = bondResults.faceValue; // Total repaid is the face value
    centerTextValue = bondResults.faceValue;
    centerTextLabel = "Face Value";
  }

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "#3b82f6", // blue-500
          "#ef4444", // red-500
        ],
        borderColor: ["#3b82f6", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerTextLoan",
    beforeDraw: (chart: any) => {
      if (!centerTextValue) return;
      const { ctx, width, height } = chart;
      ctx.restore();
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.font = "600 16px system-ui";
      ctx.fillStyle = "#4B5563"; // text-gray-600
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(centerTextLabel, centerX, centerY - 35);
      ctx.font = "bold 24px system-ui";
      ctx.fillStyle = "#111827"; // text-gray-900
      ctx.fillText(formatCurrency(centerTextValue), centerX, centerY - 5);
      ctx.save();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 12,
          font: {
            size: 14,
            family: "system-ui",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw as number;
            if (totalValueForPercentage === 0)
              return `${label}: ${formatCurrency(value)}`;
            const percentage = (
              (value / totalValueForPercentage) *
              100
            ).toFixed(1);
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  if (chartData.every((val) => val === 0 || val === undefined)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Chart data not available.
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-80 mx-auto mt-4">
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
