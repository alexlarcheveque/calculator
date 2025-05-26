"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DueDateResults, PregnancyMilestone } from "@/types/dueDate";
import { formatShortDate } from "@/utils/dueDateCalculations";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface PregnancyChartProps {
  results: DueDateResults;
  milestones: PregnancyMilestone[];
}

export default function PregnancyChart({
  results,
  milestones,
}: PregnancyChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  // Create timeline data
  const createTimelineData = () => {
    const today = new Date();
    const startDate = new Date(results.conceptionDate);
    startDate.setDate(startDate.getDate() - 14); // LMP date

    const timelinePoints = [];

    // Add key pregnancy milestones
    const keyMilestones = [
      { date: startDate, week: 0, label: "LMP" },
      { date: results.conceptionDate, week: 2, label: "Conception" },
      { date: results.implantationDate, week: 3, label: "Implantation" },
      { date: results.firstTrimesterEnd, week: 13, label: "End 1st Trimester" },
      {
        date: results.secondTrimesterEnd,
        week: 27,
        label: "End 2nd Trimester",
      },
      { date: results.viabilityDate, week: 24, label: "Viability" },
      { date: results.fullTermStart, week: 37, label: "Full Term" },
      { date: results.dueDate, week: 40, label: "Due Date" },
    ];

    // Add current position if pregnancy is ongoing
    if (today >= startDate && today <= results.dueDate) {
      const daysSinceLMP = Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const currentWeek = daysSinceLMP / 7;
      keyMilestones.push({
        date: today,
        week: currentWeek,
        label: "Today",
      });
    }

    return keyMilestones.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const timelineData = createTimelineData();

  const data = {
    labels: timelineData.map((point) => point.date),
    datasets: [
      {
        label: "Pregnancy Timeline",
        data: timelineData.map((point) => point.week),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: timelineData.map((point) => {
          if (point.label === "Today") return "rgb(34, 197, 94)";
          if (point.label === "Due Date") return "rgb(239, 68, 68)";
          return "rgb(59, 130, 246)";
        }),
        pointBorderColor: timelineData.map((point) => {
          if (point.label === "Today") return "rgb(21, 128, 61)";
          if (point.label === "Due Date") return "rgb(185, 28, 28)";
          return "rgb(37, 99, 235)";
        }),
        pointRadius: timelineData.map((point) => {
          if (point.label === "Today" || point.label === "Due Date") return 8;
          return 6;
        }),
        tension: 0.1,
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
        text: "Pregnancy Timeline",
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const point = timelineData[context[0].dataIndex];
            return `${point.label} - ${formatShortDate(point.date)}`;
          },
          label: (context: any) => {
            const weeks = Math.floor(context.parsed.y);
            const days = Math.round((context.parsed.y - weeks) * 7);
            return `Week ${weeks}, Day ${days}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "week" as const,
          displayFormats: {
            week: "MMM dd",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Gestational Week",
        },
        min: 0,
        max: 42,
        ticks: {
          stepSize: 2,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-80">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Milestones</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Current Position</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Due Date</span>
        </div>
      </div>
    </div>
  );
}
