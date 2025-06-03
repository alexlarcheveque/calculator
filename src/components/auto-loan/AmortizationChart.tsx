"use client";

import { AutoLoanMonthlyAmortizationDataPoint } from "@/types/autoLoan";
import { formatCurrency } from "@/utils/autoLoanCalculations";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AutoLoanAmortizationChartProps {
  data: AutoLoanMonthlyAmortizationDataPoint[];
  loanTermMonths: number;
}

export default function AutoLoanAmortizationChart({
  data,
  loanTermMonths,
}: AutoLoanAmortizationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Amortization chart will appear here.</p>
      </div>
    );
  }

  const chartData = useMemo(() => {
    // Calculate cumulative values
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    const dataWithCumulatives = data.map((point) => {
      cumulativePrincipal += point.principal;
      cumulativeInterest += point.interest;
      return {
        ...point,
        cumulativePrincipal,
        cumulativeInterest,
      };
    });

    // Create labels for years instead of all months for cleaner display
    const yearlyData = dataWithCumulatives.filter(
      (_, index) =>
        (index + 1) % 12 === 0 || index === dataWithCumulatives.length - 1
    );
    const labels = yearlyData.map((_, index) => {
      if (
        index === yearlyData.length - 1 &&
        dataWithCumulatives.length % 12 !== 0
      ) {
        return `${Math.ceil(dataWithCumulatives.length / 12)}y`;
      }
      return `${index + 1}y`;
    });

    return {
      labels,
      datasets: [
        {
          label: "Remaining Balance",
          data: yearlyData.map((point) => point.endingBalance),
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Principal Paid",
          data: yearlyData.map((point) => point.cumulativePrincipal),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Interest Paid",
          data: yearlyData.map((point) => point.cumulativeInterest),
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [data]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
            font: {
              size: 12,
              family: "system-ui",
            },
          },
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
          callbacks: {
            label: function (context: any) {
              const label = context.dataset.label || "";
              const value = context.raw;
              return `${label}: ${formatCurrency(value)}`;
            },
          },
        },
        title: {
          display: true,
          text: "Loan Balance & Payments Over Time",
          font: {
            size: 16,
            weight: "bold" as const,
          },
          padding: {
            bottom: 30,
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Years",
            font: {
              size: 12,
              weight: "bold" as const,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Amount ($)",
            font: {
              size: 12,
              weight: "bold" as const,
            },
          },
          ticks: {
            callback: function (value: any) {
              return formatCurrency(value);
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
      interaction: {
        mode: "nearest" as const,
        axis: "x" as const,
        intersect: false,
      },
    }),
    []
  );

  return (
    <div className="w-full h-96 px-4 sm:px-0">
      <Line data={chartData} options={options} />
    </div>
  );
}
