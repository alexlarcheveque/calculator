"use client";

import { PregnancyResults } from "@/types/pregnancy";
import { formatShortDate } from "@/utils/pregnancyCalculations";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface PregnancyChartsProps {
  results: PregnancyResults;
}

export default function PregnancyCharts({ results }: PregnancyChartsProps) {
  // Generate pregnancy timeline data
  const generateTimelineData = () => {
    const weeks = Array.from({ length: 41 }, (_, i) => i);
    const dates = weeks.map((week) => {
      const date = new Date(
        results.lastPeriodDate.getTime() + week * 7 * 24 * 60 * 60 * 1000
      );
      return formatShortDate(date);
    });

    return {
      labels: dates.filter((_, index) => index % 4 === 0), // Show every 4 weeks
      datasets: [
        {
          label: "Pregnancy Progress",
          data: weeks.filter((_, index) => index % 4 === 0),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.1,
          pointBackgroundColor: weeks
            .filter((_, index) => index % 4 === 0)
            .map((week, i) =>
              week <= results.currentWeek
                ? "rgb(59, 130, 246)"
                : "rgba(156, 163, 175, 0.5)"
            ),
          pointBorderColor: weeks
            .filter((_, index) => index % 4 === 0)
            .map((week, i) =>
              week <= results.currentWeek
                ? "rgb(59, 130, 246)"
                : "rgba(156, 163, 175, 0.5)"
            ),
          pointRadius: weeks
            .filter((_, index) => index % 4 === 0)
            .map((week, i) => (week === results.currentWeek ? 8 : 4)),
        },
      ],
    };
  };

  // Generate trimester breakdown
  const generateTrimesterData = () => {
    const currentWeek = Math.max(0, results.currentWeek);

    let firstTrimester = Math.min(currentWeek, 12);
    let secondTrimester = Math.max(0, Math.min(currentWeek - 12, 14));
    let thirdTrimester = Math.max(0, currentWeek - 26);

    return {
      labels: ["First Trimester", "Second Trimester", "Third Trimester"],
      datasets: [
        {
          data: [firstTrimester, secondTrimester, thirdTrimester],
          backgroundColor: [
            "rgba(34, 197, 94, 0.8)",
            "rgba(59, 130, 246, 0.8)",
            "rgba(147, 51, 234, 0.8)",
          ],
          borderColor: [
            "rgb(34, 197, 94)",
            "rgb(59, 130, 246)",
            "rgb(147, 51, 234)",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const timelineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pregnancy Timeline",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Week ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        title: {
          display: true,
          text: "Weeks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  const trimesterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Trimester Progress",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            const maxWeeks =
              context.dataIndex === 0 ? 12 : context.dataIndex === 1 ? 14 : 14;
            return `${label}: ${value}/${maxWeeks} weeks`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Pregnancy Timeline Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-80">
          <Line data={generateTimelineData()} options={timelineOptions} />
        </div>
      </div>

      {/* Trimester Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-80">
          <Doughnut data={generateTrimesterData()} options={trimesterOptions} />
        </div>
      </div>
    </div>
  );
}
