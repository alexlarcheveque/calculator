"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PaymentAmortizationDataPoint } from "@/types/payment";
import { formatCurrency } from "@/utils/formatters";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AmortizationChartProps {
  data: PaymentAmortizationDataPoint[];
}

export default function AmortizationChart({ data }: AmortizationChartProps) {
  // Convert monthly data to yearly for the chart display
  const yearlyData = useMemo(() => {
    return data.filter((item, index) => {
      // Show year-end points or if it's the last payment
      return item.isYearEnd || index === data.length - 1;
    });
  }, [data]);

  const chartData = useMemo(
    () => ({
      labels: yearlyData.map((item) => {
        if (item.year) {
          return `Year ${item.year}`;
        }
        return `Payment ${item.paymentNumber}`;
      }),
      datasets: [
        {
          label: "Remaining Balance",
          data: yearlyData.map((item) => item.remainingBalance),
          borderColor: "#3b82f6", // blue-500
          backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with opacity
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3b82f6",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Principal Paid",
          data: yearlyData.map((item) => item.totalPrincipalPaid),
          borderColor: "#10b981", // emerald-500
          backgroundColor: "rgba(16, 185, 129, 0)", // transparent
          borderDash: [6, 6],
          tension: 0.4,
          pointBackgroundColor: "#10b981",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Interest Paid",
          data: yearlyData.map((item) => item.totalInterestPaid),
          borderColor: "#f59e0b", // amber-500
          backgroundColor: "rgba(245, 158, 11, 0)", // transparent
          borderDash: [3, 3],
          tension: 0.4,
          pointBackgroundColor: "#f59e0b",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
    [yearlyData]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += formatCurrency(context.parsed.y);
              }
              return label;
            },
            afterBody: function (tooltipItems: any) {
              const dataIndex = tooltipItems[0].dataIndex;
              if (dataIndex >= 0 && dataIndex < yearlyData.length) {
                const yearData = yearlyData[dataIndex];
                return [
                  `Payment #${yearData.paymentNumber}`,
                  `Monthly Payment: ${formatCurrency(yearData.payment)}`,
                ];
              }
              return [];
            },
          },
        },
      },
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
    }),
    [yearlyData]
  );

  return <Line data={chartData} options={options} />;
}
