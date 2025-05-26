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
import { AmortizationDataPoint } from "@/types/interestRate";
import { formatCurrency } from "@/utils/interestRateCalculations";

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
  // Convert monthly data to yearly for the chart (or show all if less than 24 months)
  const chartData =
    data.length <= 24
      ? data
      : data.reduce<AmortizationDataPoint[]>((acc, item) => {
          if (item.paymentNumber % 12 === 0) {
            acc.push(item);
          }
          return acc;
        }, []);

  const isMonthlyView = data.length <= 24;

  const chartDataConfig = {
    labels: chartData.map((item) =>
      isMonthlyView
        ? `Month ${item.paymentNumber}`
        : `Year ${item.paymentNumber / 12}`
    ),
    datasets: [
      {
        label: "Balance",
        data: chartData.map((item) => item.remainingBalance),
        borderColor: "#2b7ddb",
        backgroundColor: "rgba(43, 125, 219, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#2b7ddb",
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Interest",
        data: chartData.map((item) => item.totalInterestPaid),
        borderColor: "#8bbc21",
        backgroundColor: "rgba(139, 188, 33, 0)",
        borderDash: [5, 5],
        tension: 0.4,
        pointBackgroundColor: "#8bbc21",
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Payment",
        data: chartData.map((item) => item.totalPrincipalPaid),
        borderColor: "#910000",
        backgroundColor: "rgba(145, 0, 0, 0)",
        tension: 0.4,
        pointBackgroundColor: "#910000",
        pointRadius: 3,
        pointHoverRadius: 5,
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
            const dataIndex = tooltipItems[0].dataIndex;
            if (dataIndex >= 0 && dataIndex < chartData.length) {
              const itemData = chartData[dataIndex];
              return [
                `Monthly Payment: ${formatCurrency(itemData.payment)}`,
                `Principal Payment: ${formatCurrency(
                  itemData.principalPayment
                )}`,
                `Interest Payment: ${formatCurrency(itemData.interestPayment)}`,
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

  return <Line data={chartDataConfig} options={options} />;
}
