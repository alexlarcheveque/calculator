"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { RetirementResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RetirementChartsProps {
  results: RetirementResults;
}

export default function RetirementCharts({ results }: RetirementChartsProps) {
  // Data for savings growth chart
  const savingsData = {
    labels: ["Current Savings", "Projected at Retirement", "Total Needed"],
    datasets: [
      {
        label: "Amount",
        data: [
          results.finalRetirementSavings -
            results.totalContributionsByRetirement,
          results.projectedSavingsAtRetirement,
          results.totalNeededAtRetirement,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: ["#2563eb", "#059669", "#d97706"],
        borderWidth: 1,
      },
    ],
  };

  // Data for retirement timeline
  const timelineData = {
    labels: ["Years to Retirement", "Years in Retirement"],
    datasets: [
      {
        label: "Years",
        data: [results.yearsToRetirement, results.yearsInRetirement],
        backgroundColor: ["#8b5cf6", "#ec4899"],
        borderColor: ["#7c3aed", "#db2777"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return formatCurrency(context.raw);
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

  const timelineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw} years`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `${value} years`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Savings Overview Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Retirement Savings Overview
        </h3>
        <div className="h-64">
          <Bar data={savingsData} options={barOptions} />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Current/Base Savings</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Projected at Retirement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span>Total Needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Retirement Timeline
        </h3>
        <div className="h-64">
          <Bar data={timelineData} options={timelineOptions} />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span>Years Until Retirement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded mr-2"></div>
              <span>Years in Retirement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shortfall/Surplus Indicator */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Retirement Readiness
        </h3>
        <div className="text-center">
          {results.shortfallOrSurplus >= 0 ? (
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Surplus: {formatCurrency(Math.abs(results.shortfallOrSurplus))}
              </div>
              <p className="text-green-700">
                You're on track for retirement! You'll have extra savings beyond
                your needs.
              </p>
            </div>
          ) : (
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">
                Shortfall:{" "}
                {formatCurrency(Math.abs(results.shortfallOrSurplus))}
              </div>
              <p className="text-red-700 mb-2">
                You need to save more to meet your retirement goals.
              </p>
              <p className="text-sm text-red-600">
                Additional monthly savings needed:{" "}
                {formatCurrency(results.monthlyAdditionalSavingsNeeded)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
