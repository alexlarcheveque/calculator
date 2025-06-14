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
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import { PaceResults, PaceFormValues, DistanceUnit } from "@/types/pace";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface PerformanceComparisonChartProps {
  results: PaceResults;
  formValues: PaceFormValues;
}

export default function PerformanceComparisonChart({
  results,
  formValues,
}: PerformanceComparisonChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const isMetric = formValues.distanceUnit === DistanceUnit.KILOMETERS;

  // Performance benchmarks in seconds per unit (mile or km)
  const getPerformanceBenchmarks = () => {
    if (isMetric) {
      // Benchmarks in seconds per km
      return [
        { name: "Beginner", pace: 372, color: "rgba(156, 163, 175, 0.8)" }, // 6:12/km (10:00/mile)
        { name: "Recreational", pace: 335, color: "rgba(147, 51, 234, 0.8)" }, // 5:35/km (9:00/mile)
        { name: "Intermediate", pace: 298, color: "rgba(59, 130, 246, 0.8)" }, // 4:58/km (8:00/mile)
        { name: "Advanced", pace: 261, color: "rgba(34, 197, 94, 0.8)" }, // 4:21/km (7:00/mile)
        { name: "Competitive", pace: 224, color: "rgba(245, 158, 11, 0.8)" }, // 3:44/km (6:00/mile)
        { name: "Elite", pace: 186, color: "rgba(239, 68, 68, 0.8)" }, // 3:06/km (5:00/mile)
      ];
    } else {
      // Benchmarks in seconds per mile
      return [
        { name: "Beginner", pace: 600, color: "rgba(156, 163, 175, 0.8)" }, // 10:00/mile
        { name: "Recreational", pace: 540, color: "rgba(147, 51, 234, 0.8)" }, // 9:00/mile
        { name: "Intermediate", pace: 480, color: "rgba(59, 130, 246, 0.8)" }, // 8:00/mile
        { name: "Advanced", pace: 420, color: "rgba(34, 197, 94, 0.8)" }, // 7:00/mile
        { name: "Competitive", pace: 360, color: "rgba(245, 158, 11, 0.8)" }, // 6:00/mile
        { name: "Elite", pace: 300, color: "rgba(239, 68, 68, 0.8)" }, // 5:00/mile
      ];
    }
  };

  const performanceBenchmarks = getPerformanceBenchmarks();

  // Get user's current pace in seconds per current unit (mile or km)
  const getUserPaceSeconds = () => {
    if (!results.pace) return null;

    // Extract time part before " per"
    const timeStr = results.pace.split(" per")[0];

    // Try HH:MM:SS format first
    let paceMatch = timeStr.match(/(\d+):(\d+):(\d+)/);
    if (paceMatch) {
      const hours = parseInt(paceMatch[1]);
      const minutes = parseInt(paceMatch[2]);
      const seconds = parseInt(paceMatch[3]);
      return hours * 3600 + minutes * 60 + seconds;
    }

    // Try MM:SS format
    paceMatch = timeStr.match(/(\d+):(\d+)/);
    if (paceMatch) {
      const minutes = parseInt(paceMatch[1]);
      const seconds = parseInt(paceMatch[2]);
      return minutes * 60 + seconds;
    }

    return null;
  };

  const userPaceSeconds = getUserPaceSeconds();

  // Find which category the user falls into
  const getUserCategoryIndex = () => {
    if (!userPaceSeconds) return -1;

    // Compare against the current unit system's benchmarks
    for (let i = 0; i < performanceBenchmarks.length; i++) {
      if (userPaceSeconds >= performanceBenchmarks[i].pace) {
        return i;
      }
    }
    return performanceBenchmarks.length - 1; // Elite (fastest category)
  };

  const userCategoryIndex = getUserCategoryIndex();

  const chartData = {
    labels: performanceBenchmarks.map((b) => b.name),
    datasets: [
      {
        label: "Benchmark Pace",
        data: performanceBenchmarks.map((b) => b.pace / 60), // Convert to minutes for display
        backgroundColor: performanceBenchmarks.map((b) => b.color),
        borderColor: performanceBenchmarks.map((b) =>
          b.color.replace("0.8", "1")
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40,
      },
    },
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
            return `${minutes}:${seconds.toString().padStart(2, "0")} per ${
              isMetric ? "km" : "mile"
            }`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: isMetric ? 2.5 : 4, // Start at 2.5 min for km, 4 min for miles
        max: isMetric ? 8 : 13, // End at 8 min for km, 13 min for miles
        title: {
          display: true,
          text: `Pace (minutes per ${isMetric ? "km" : "mile"})`,
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

    // Use the current unit system's benchmarks
    for (let i = performanceBenchmarks.length - 1; i >= 0; i--) {
      if (userPaceSeconds < performanceBenchmarks[i].pace) {
        return performanceBenchmarks[i].name;
      }
    }
    return performanceBenchmarks[0].name; // Beginner (slowest category)
  };

  return (
    <div className="w-full h-full">
      {userPaceSeconds && (
        <div className="Whtext-center">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              Your Performance Level
            </h4>
            <div className="text-sm text-blue-700">
              <p>
                <strong>Current Pace:</strong> {results.pace}
              </p>
              <p>
                <strong>Performance Level:</strong> {getUserPerformanceLevel()}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="h-96">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>

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
