"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { FinanceResults, FinanceScheduleDataPoint } from "@/types/finance";
import { formatCurrencyDetailed } from "@/utils/financeCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FinanceChartsProps {
  results: FinanceResults;
  scheduleData: FinanceScheduleDataPoint[];
}

export default function FinanceCharts({
  results,
  scheduleData,
}: FinanceChartsProps) {
  if (!scheduleData.length) {
    return null;
  }

  // Prepare data for the chart
  const labels = scheduleData.map((_, index) => index.toString());
  const pvData = [
    results.presentValue,
    ...scheduleData.map((item) => item.presentValue),
  ];
  const fvData = scheduleData.map((item) => item.futureValue);
  const sumOfPaymentsData = scheduleData.map((item) => -item.sumOfPayments);
  const accumulatedInterestData = scheduleData.map(
    (item) => item.accumulatedInterest
  );

  const chartData = {
    labels: ["0", ...labels.slice(0, scheduleData.length)],
    datasets: [
      {
        label: "PV",
        data: pvData,
        borderColor: "#2b7ddb",
        backgroundColor: "#2b7ddb",
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: "FV",
        data: [0, ...fvData],
        borderColor: "#8bbc21",
        backgroundColor: "#8bbc21",
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: "Sum of PMT",
        data: [0, ...sumOfPaymentsData],
        borderColor: "#910000",
        backgroundColor: "#910000",
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: "Accumulated Interest",
        data: [0, ...accumulatedInterestData],
        borderColor: "#1aadce",
        backgroundColor: "#1aadce",
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Value changes over time",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${formatCurrencyDetailed(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Period",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value ($)",
        },
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          callback: function (value) {
            const numValue = Number(value);
            if (Math.abs(numValue) >= 1000) {
              return `$${(numValue / 1000).toFixed(0)}K`;
            }
            return `$${numValue.toFixed(0)}`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
