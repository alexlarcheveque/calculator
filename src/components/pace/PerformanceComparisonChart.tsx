"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PaceResults } from "@/types/pace";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceComparisonChartProps {
  results: PaceResults;
}

export default function PerformanceComparisonChart({
  results,
}: PerformanceComparisonChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Performance benchmarks in seconds per mile
  const performanceBenchmarks = [
    { name: "Elite", pace: 300, color: "rgba(239, 68, 68, 0.8)" }, // 5:00
    { name: "Competitive", pace: 360, color: "rgba(245, 158, 11, 0.8)" }, // 6:00
    { name: "Advanced", pace: 420, color: "rgba(34, 197, 94, 0.8)" }, // 7:00
    { name: "Intermediate", pace: 480, color: "rgba(59, 130, 246, 0.8)" }, // 8:00
    { name: "Recreational", pace: 540, color: "rgba(147, 51, 234, 0.8)" }, // 9:00
    { name: "Beginner", pace: 600, color: "rgba(156, 163, 175, 0.8)" }, // 10:00
  ];

  // Get user's current pace in seconds
  const getUserPaceSeconds = () => {
    if (!results.pace) return null;

    const paceMatch = results.pace.match(/(\d+):(\d+)/);
    if (!paceMatch) return null;

    return parseInt(paceMatch[1]) * 60 + parseInt(paceMatch[2]);
  };

  const userPaceSeconds = getUserPaceSeconds();

  const chartData = {
    labels: performanceBenchmarks.map((b) => b.name),
    datasets: [
      {
        label: "Benchmark Pace",
        data: performanceBenchmarks.map((b) => b.pace / 60), // Convert to minutes for display
        backgroundColor: performanceBenchmarks.map((b, index) =>
          userPaceSeconds && Math.abs(userPaceSeconds - b.pace) < 30
            ? "rgba(59, 130, 246, 0.9)" // Highlight user's level
            : b.color
        ),
        borderColor: performanceBenchmarks.map((b, index) =>
          userPaceSeconds && Math.abs(userPaceSeconds - b.pace) < 30
            ? "rgb(59, 130, 246)"
            : b.color.replace("0.8", "1")
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Performance Level Comparison",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const totalSeconds = context.parsed.y * 60;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.round(totalSeconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, "0")} per mile`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 4, // Start at 4 minutes
        max: 11, // End at 11 minutes
        title: {
          display: true,
          text: "Pace (minutes per mile)",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          callback: function (value: any) {
            return `${Math.floor(value)}:${String(
              Math.round((value - Math.floor(value)) * 60)
            ).padStart(2, "0")}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Performance Level",
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
  };

  const getUserPerformanceLevel = () => {
    if (!userPaceSeconds) return "Unknown";

    if (userPaceSeconds < 360) return "Elite"; // < 6:00
    if (userPaceSeconds < 420) return "Competitive"; // < 7:00
    if (userPaceSeconds < 480) return "Advanced"; // < 8:00
    if (userPaceSeconds < 540) return "Intermediate"; // < 9:00
    if (userPaceSeconds < 600) return "Recreational"; // < 10:00
    return "Beginner"; // > 10:00
  };

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} data={chartData} options={options} />

      {userPaceSeconds && (
        <div className="mt-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              Your Performance Level
            </h4>
            <div className="text-sm text-blue-700">
              <p>
                <strong>Current Pace:</strong> {results.pace} per mile
              </p>
              <p>
                <strong>Performance Level:</strong> {getUserPerformanceLevel()}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        {performanceBenchmarks.map((benchmark) => (
          <div key={benchmark.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded mr-2"
              style={{ backgroundColor: benchmark.color }}
            ></div>
            <span className="text-gray-600">
              {benchmark.name}: {Math.floor(benchmark.pace / 60)}:
              {String(benchmark.pace % 60).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
