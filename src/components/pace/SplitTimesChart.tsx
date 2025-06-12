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

interface SplitTimesChartProps {
  results: PaceResults;
}

export default function SplitTimesChart({ results }: SplitTimesChartProps) {
  const chartRef = useRef<ChartJS<"bar">>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Convert splits data for chart
  const chartData = () => {
    if (!results.splits || results.splits.length === 0) {
      return {
        labels: ["No split data available"],
        datasets: [
          {
            label: "Split Times",
            data: [0],
            backgroundColor: "rgba(156, 163, 175, 0.6)",
          },
        ],
      };
    }

    const labels = results.splits.map((split) => split.distance);
    const times = results.splits.map((split) => {
      // Convert time string to minutes for visualization
      const timeMatch = split.time.match(/(\d+):(\d+):?(\d+)?/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1]) || 0;
        const minutes = parseInt(timeMatch[2]) || 0;
        const seconds = parseInt(timeMatch[3]) || 0;
        return hours * 60 + minutes + seconds / 60;
      }
      return 0;
    });

    return {
      labels,
      datasets: [
        {
          label: "Split Time (minutes)",
          data: times,
          backgroundColor: times.map((_, index) =>
            index % 2 === 0
              ? "rgba(59, 130, 246, 0.8)"
              : "rgba(16, 185, 129, 0.8)"
          ),
          borderColor: times.map((_, index) =>
            index % 2 === 0 ? "rgb(59, 130, 246)" : "rgb(16, 185, 129)"
          ),
          borderWidth: 2,
        },
      ],
    };
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
        text: "Split Times Analysis",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const minutes = Math.floor(context.parsed.y);
            const seconds = Math.round((context.parsed.y - minutes) * 60);
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time (minutes)",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          callback: function (value: any) {
            const minutes = Math.floor(value);
            const seconds = Math.round((value - minutes) * 60);
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Distance",
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} data={chartData()} options={options} />
      {(!results.splits || results.splits.length === 0) && (
        <div className="mt-4 text-center text-gray-500">
          <p>
            Split times will appear here when available from your pace
            calculation.
          </p>
        </div>
      )}
    </div>
  );
}
