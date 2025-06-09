"use client";

import { useState } from "react";
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
import { Doughnut } from "react-chartjs-2";

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
  const [activeTab, setActiveTab] = useState<"breakdown" | "budget">(
    "breakdown"
  );

  // Simplified Monthly Budget using 50/30/20 rule
  const monthlyGross = results.adjusted.monthly;

  const budgetCategories = [
    {
      label: "Needs (Housing, Food, Utilities)",
      percentage: 50,
      color: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
    },
    {
      label: "Wants (Entertainment, Dining, Hobbies)",
      percentage: 30,
      color: "rgba(16, 185, 129, 0.8)",
      borderColor: "rgba(16, 185, 129, 1)",
    },
    {
      label: "Savings & Debt Payments",
      percentage: 20,
      color: "rgba(245, 158, 11, 0.8)",
      borderColor: "rgba(245, 158, 11, 1)",
    },
  ];

  const budgetData = {
    labels: budgetCategories.map((cat) => cat.label),
    datasets: [
      {
        data: budgetCategories.map(
          (cat) => (monthlyGross * cat.percentage) / 100
        ),
        backgroundColor: budgetCategories.map((cat) => cat.color),
        borderColor: budgetCategories.map((cat) => cat.borderColor),
        borderWidth: 2,
      },
    ],
  };

  const budgetOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Monthly Budget: ${formatCurrency(monthlyGross)} (50/30/20 Rule)`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const percentage = budgetCategories[context.dataIndex].percentage;
            return `${context.label}: ${formatCurrency(
              context.parsed
            )} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Working days breakdown (existing)
  const workingDaysData = {
    labels: ["Working Days", "Holidays & Vacation"],
    datasets: [
      {
        data: [
          results.adjustedWorkingDaysPerYear,
          results.workingDaysPerYear - results.adjustedWorkingDaysPerYear,
        ],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const WorkingDaysChart = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
      <div className="h-full">
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
                {Math.round(results.adjustedTotalHoursPerYear).toLocaleString()}{" "}
                hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MonthlyBudgetChart = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
      <div className="h-full">
        <Doughnut data={budgetData} options={budgetOptions} />
      </div>
      <div className="flex flex-col justify-center space-y-4 overflow-hidden">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">
            Budget Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Needs (50%)</span>
              </div>
              <span className="font-medium">
                {formatCurrency((monthlyGross * 50) / 100)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Wants (30%)</span>
              </div>
              <span className="font-medium">
                {formatCurrency((monthlyGross * 30) / 100)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Savings (20%)</span>
              </div>
              <span className="font-medium">
                {formatCurrency((monthlyGross * 20) / 100)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 overflow-hidden">
          <h4 className="font-semibold text-blue-800 mb-2 text-sm">
            Budget Assumptions
          </h4>
          <div className="text-xs text-blue-700 space-y-1 leading-relaxed">
            <p>
              <strong>Needs (50%):</strong> Housing, utilities, groceries,
              transportation, insurance, minimum debt payments
            </p>
            <p>
              <strong>Wants (30%):</strong> Entertainment, dining out, hobbies,
              subscriptions, non-essential shopping
            </p>
            <p>
              <strong>Savings (20%):</strong> Emergency fund, retirement,
              investments, extra debt payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("breakdown")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "breakdown"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View working days breakdown"
        >
          Working Days Breakdown
        </button>
        <button
          onClick={() => setActiveTab("budget")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "budget"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View monthly sample budget breakdown"
        >
          50/30/20 Budget Breakdown
        </button>
      </div>

      <div className="w-full">
        {activeTab === "breakdown" ? (
          <WorkingDaysChart />
        ) : (
          <MonthlyBudgetChart />
        )}
      </div>
    </div>
  );
}
