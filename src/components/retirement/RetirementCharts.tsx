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
import { RetirementResults } from "@/types/retirement";
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

interface RetirementChartsProps {
  results: RetirementResults;
}

export default function RetirementCharts({ results }: RetirementChartsProps) {
  // Calculate yearly data points for the trajectory
  const currentAge = results.currentAge;
  const retirementAge = currentAge + results.yearsToRetirement;
  const maxAge = retirementAge + results.yearsInRetirement;
  const years = Array.from(
    { length: maxAge - currentAge + 1 },
    (_, i) => currentAge + i
  );

  // Calculate savings trajectory
  const yearlyContribution =
    results.totalContributionsByRetirement / results.yearsToRetirement;
  const returnRate = 0.07; // 7% average market return

  const savingsData = years.map((age) => {
    if (age >= retirementAge) {
      // After retirement, calculate drawdown
      const yearsInRetirement = age - retirementAge;
      const withdrawalRate = 0.04; // 4% withdrawal rate
      return Math.max(
        0,
        results.projectedSavingsAtRetirement *
          Math.pow(1 - withdrawalRate, yearsInRetirement)
      );
    } else {
      // During saving years
      const yearsOfGrowth = age - currentAge;
      return (
        results.currentSavings * Math.pow(1 + returnRate, yearsOfGrowth) +
        yearlyContribution *
          ((Math.pow(1 + returnRate, yearsOfGrowth) - 1) / returnRate)
      );
    }
  });

  // Calculate needs trajectory - should have similar shape to savings
  const needsData = years.map((age) => {
    if (age >= retirementAge) {
      // During retirement, both lines should decline similarly from their respective peaks
      const yearsIntoRetirement = age - retirementAge;
      const withdrawalRate = 0.04; // Same withdrawal rate as savings line
      return Math.max(
        0,
        results.totalNeededAtRetirement *
          Math.pow(1 - withdrawalRate, yearsIntoRetirement)
      );
    } else {
      // Before retirement, calculate required savings trajectory
      // This should reach totalNeededAtRetirement at retirement age
      const yearsOfGrowth = age - currentAge;

      // Scale the needed trajectory to reach the correct target
      const targetRatio =
        results.totalNeededAtRetirement / results.projectedSavingsAtRetirement;

      // Use similar compound growth but scaled to reach the higher target
      const scaledCurrentSavings = results.currentSavings * targetRatio;
      const scaledYearlyContribution = yearlyContribution * targetRatio;

      return (
        scaledCurrentSavings * Math.pow(1 + returnRate, yearsOfGrowth) +
        scaledYearlyContribution *
          ((Math.pow(1 + returnRate, yearsOfGrowth) - 1) / returnRate)
      );
    }
  });

  // Create gradient for "What you'll have"
  const createGradient = (
    ctx: any,
    chartArea: any,
    colorStart: string,
    colorEnd: string
  ) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  const chartData = {
    labels: years.map((year) => year.toString()),
    datasets: [
      {
        label: "What you'll have",
        data: savingsData,
        borderColor: "#3b82f6", // blue-500
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(59, 130, 246, 0.1)";
          return createGradient(
            ctx,
            chartArea,
            "rgba(59, 130, 246, 0.02)",
            "rgba(59, 130, 246, 0.15)"
          );
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      },
      {
        label: "What you'll need",
        data: needsData,
        borderColor: "#10b981", // emerald-500
        backgroundColor: "transparent",
        borderDash: [8, 4],
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#10b981",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
          font: {
            size: 12,
            family: "'Inter', 'system-ui', sans-serif",
          },
          color: "#6b7280",
          padding: 12,
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: "'Inter', 'system-ui', sans-serif",
          },
          color: "#6b7280",
          padding: 8,
          maxTicksLimit: 12,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 24,
          font: {
            size: 14,
            family: "'Inter', 'system-ui', sans-serif",
            weight: "normal" as const,
          },
          color: "#374151",
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#111827",
        titleFont: {
          size: 14,
          family: "'Inter', 'system-ui', sans-serif",
          weight: "bold" as const,
        },
        bodyColor: "#4b5563",
        bodyFont: {
          size: 13,
          family: "'Inter', 'system-ui', sans-serif",
        },
        padding: 16,
        borderColor: "rgba(0, 0, 0, 0.08)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 8,
        caretPadding: 8,
        callbacks: {
          title: function (context: any) {
            const age = context[0].label;
            return `Age ${age}${
              parseInt(age) === retirementAge ? " (Retirement)" : ""
            }`;
          },
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
          afterBody: function (context: any) {
            const age = parseInt(context[0].label);
            if (age === retirementAge) {
              const gap =
                results.totalNeededAtRetirement -
                results.projectedSavingsAtRetirement;
              if (gap > 0) {
                return [`Gap: ${formatCurrency(gap)}`];
              } else if (gap < 0) {
                return [`Surplus: ${formatCurrency(Math.abs(gap))}`];
              }
            }
            return [];
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutQuart" as const,
    },
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Retirement Savings Trajectory
        </h3>
        <p className="text-sm text-gray-600">
          Track your progress toward your retirement goal
        </p>
      </div>
      <div className="w-full h-96 px-4 sm:px-0 relative">
        <Line data={chartData} options={options} />
        {/* Add retirement age indicator */}
        <div className="absolute top-4 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
          Retirement at {retirementAge}
        </div>
      </div>
    </div>
  );
}
