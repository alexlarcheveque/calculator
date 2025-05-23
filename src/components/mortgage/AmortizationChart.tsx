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
import { AmortizationDataPoint } from "@/types/mortgage";
import { formatCurrency } from "@/utils/formatters";

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
  data: AmortizationDataPoint[];
}

export default function AmortizationChart({ data }: AmortizationChartProps) {
  // Convert monthly data to yearly for the chart
  const yearlyData = data.reduce<AmortizationDataPoint[]>((acc, item) => {
    if (item.paymentNumber % 12 === 0) {
      acc.push(item);
    }
    return acc;
  }, []);

  const chartData = {
    labels: yearlyData.map((item) => `Year ${item.paymentNumber / 12}`),
    datasets: [
      {
        label: "Remaining Balance",
        data: yearlyData.map((item) => item.remainingBalance),
        borderColor: "#0ea5e9", // primary-500
        backgroundColor: "rgba(14, 165, 233, 0.1)", // primary-500 with opacity
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#0ea5e9",
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
    ],
  };

  const options = {
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
            const yearIndex = Math.floor(tooltipItems[0].dataIndex);
            if (yearIndex >= 0 && yearIndex < yearlyData.length) {
              const yearData = yearlyData[yearIndex];
              return [
                `Total Interest Paid: ${formatCurrency(
                  yearData.totalInterestPaid
                )}`,
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
  };

  return <Line data={chartData} options={options} />;
}
