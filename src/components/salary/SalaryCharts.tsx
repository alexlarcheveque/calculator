"use client";

import { SalaryResults } from "@/types/salary";
import { formatCurrency } from "@/utils/salaryCalculations";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SalaryChartsProps {
  results: SalaryResults;
}

export default function SalaryCharts({ results }: SalaryChartsProps) {
  // Bar chart comparing unadjusted vs adjusted salaries
  const barChartData = {
    labels: [
      "Hourly",
      "Daily",
      "Weekly",
      "Bi-weekly",
      "Semi-monthly",
      "Monthly",
      "Quarterly",
      "Annual",
    ],
    datasets: [
      {
        label: "Unadjusted",
        data: [
          results.unadjusted.hourly,
          results.unadjusted.daily,
          results.unadjusted.weekly,
          results.unadjusted.biWeekly,
          results.unadjusted.semiMonthly,
          results.unadjusted.monthly,
          results.unadjusted.quarterly,
          results.unadjusted.annual,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Adjusted",
        data: [
          results.adjusted.hourly,
          results.adjusted.daily,
          results.adjusted.weekly,
          results.adjusted.biWeekly,
          results.adjusted.semiMonthly,
          results.adjusted.monthly,
          results.adjusted.quarterly,
          results.adjusted.annual,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Salary Comparison: Unadjusted vs Adjusted",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${formatCurrency(
              context.parsed.y
            )}`;
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
      },
    },
  };

  // Doughnut chart showing working days breakdown
  const workingDaysData = {
    labels: ["Working Days", "Holidays", "Vacation Days"],
    datasets: [
      {
        data: [
          results.adjustedWorkingDaysPerYear,
          results.workingDaysPerYear - results.adjustedWorkingDaysPerYear,
          0, // This will be calculated from the difference
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Update the vacation days calculation
  const totalNonWorkingDays =
    results.workingDaysPerYear - results.adjustedWorkingDaysPerYear;
  workingDaysData.datasets[0].data = [
    results.adjustedWorkingDaysPerYear,
    totalNonWorkingDays,
  ];
  workingDaysData.labels = ["Working Days", "Holidays & Vacation"];

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Working Days Breakdown",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} days (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      {/* Working Days Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Doughnut data={workingDaysData} options={doughnutOptions} />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Working Statistics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total working days per year:</span>
                  <span className="font-medium">
                    {results.workingDaysPerYear} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Adjusted working days:</span>
                  <span className="font-medium">
                    {results.adjustedWorkingDaysPerYear} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total hours per year:</span>
                  <span className="font-medium">
                    {results.totalHoursPerYear.toLocaleString()} hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Adjusted hours per year:</span>
                  <span className="font-medium">
                    {Math.round(
                      results.adjustedTotalHoursPerYear
                    ).toLocaleString()}{" "}
                    hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
