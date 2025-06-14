"use client";

import { useState } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  annotationPlugin
);

interface PregnancyChartsProps {
  results: PregnancyResults;
}

export default function PregnancyCharts({ results }: PregnancyChartsProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "growth">("timeline");
  // Generate pregnancy timeline data
  const generateTimelineData = () => {
    const weeks = Array.from({ length: 41 }, (_, i) => i);
    const dates = weeks.map((week) => {
      const date = new Date(
        results.lastPeriodDate.getTime() + week * 7 * 24 * 60 * 60 * 1000
      );
      return formatShortDate(date);
    });

    const filteredWeeks = weeks.filter((_, index) => index % 4 === 0);
    const filteredDates = dates.filter((_, index) => index % 4 === 0);

    return {
      labels: filteredDates,
      datasets: [
        {
          label: "Pregnancy Progress",
          data: filteredWeeks,
          borderColor: filteredWeeks.map((week) => {
            if (week <= 12) return "rgb(34, 197, 94)"; // Green for 1st trimester
            if (week <= 26) return "rgb(59, 130, 246)"; // Blue for 2nd trimester
            return "rgb(147, 51, 234)"; // Purple for 3rd trimester
          }),
          backgroundColor: "transparent",
          tension: 0.1,
          pointBackgroundColor: filteredWeeks.map((week) => {
            const isCompleted = week <= results.currentWeek;
            const isCurrent = week === results.currentWeek;

            if (isCurrent) {
              if (week <= 12) return "rgb(34, 197, 94)";
              if (week <= 26) return "rgb(59, 130, 246)";
              return "rgb(147, 51, 234)";
            }

            if (isCompleted) {
              if (week <= 12) return "rgb(34, 197, 94)";
              if (week <= 26) return "rgb(59, 130, 246)";
              return "rgb(147, 51, 234)";
            }

            // Future weeks - lighter colors
            if (week <= 12) return "rgba(34, 197, 94, 0.4)";
            if (week <= 26) return "rgba(59, 130, 246, 0.4)";
            return "rgba(147, 51, 234, 0.4)";
          }),
          pointBorderColor: filteredWeeks.map((week) => {
            if (week <= 12) return "rgb(34, 197, 94)";
            if (week <= 26) return "rgb(59, 130, 246)";
            return "rgb(147, 51, 234)";
          }),
          pointRadius: filteredWeeks.map((week) =>
            week === results.currentWeek ? 8 : 4
          ),
          segment: {
            borderColor: (ctx: any) => {
              const week = ctx.p0.parsed.y;
              if (week <= 12) return "rgb(34, 197, 94)"; // Green for 1st trimester
              if (week <= 26) return "rgb(59, 130, 246)"; // Blue for 2nd trimester
              return "rgb(147, 51, 234)"; // Purple for 3rd trimester
            },
          },
        },
      ],
    };
  };

  // Generate baby growth data
  const generateBabyGrowthData = () => {
    // Baby size data by week (expanded from PregnancySummary)
    const growthData = [
      { week: 4, length: 0.04, weight: 0.001 },
      { week: 8, length: 0.6, weight: 0.002 },
      { week: 12, length: 2.1, weight: 0.03 },
      { week: 16, length: 4.6, weight: 0.22 },
      { week: 20, length: 6.5, weight: 0.66 },
      { week: 24, length: 11.8, weight: 1.32 },
      { week: 28, length: 14.8, weight: 2.2 },
      { week: 32, length: 16.7, weight: 3.75 },
      { week: 36, length: 18.7, weight: 5.78 },
      { week: 40, length: 20.2, weight: 7.63 },
    ];

    const weeks = growthData.map((d) => d.week);
    const lengths = growthData.map((d) => d.length);
    const weights = growthData.map((d) => d.weight);

    return {
      labels: weeks.map((w) => `Week ${w}`),
      datasets: [
        {
          label: "Length (inches)",
          data: lengths,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          yAxisID: "y",
          pointBackgroundColor: weeks.map((week) =>
            week <= results.currentWeek
              ? "rgb(59, 130, 246)"
              : "rgba(156, 163, 175, 0.5)"
          ),
          pointRadius: weeks.map((week) =>
            week === results.currentWeek ? 8 : 4
          ),
        },
        {
          label: "Weight (lbs)",
          data: weights,
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.4,
          yAxisID: "y1",
          pointBackgroundColor: weeks.map((week) =>
            week <= results.currentWeek
              ? "rgb(239, 68, 68)"
              : "rgba(156, 163, 175, 0.5)"
          ),
          pointRadius: weeks.map((week) =>
            week === results.currentWeek ? 8 : 4
          ),
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
        display: false,
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
      annotation: {
        annotations: {
          currentWeekLine: {
            type: "line" as const,
            xMin: (() => {
              // Get the filtered weeks that are actually shown on the chart (every 4 weeks)
              const filteredWeeks = Array.from(
                { length: 41 },
                (_, i) => i
              ).filter((_, index) => index % 4 === 0);
              const currentWeek = results.currentWeek;

              // Find the exact position by interpolating between data points
              for (let i = 0; i < filteredWeeks.length - 1; i++) {
                if (
                  currentWeek >= filteredWeeks[i] &&
                  currentWeek <= filteredWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - filteredWeeks[i]) /
                    (filteredWeeks[i + 1] - filteredWeeks[i]);
                  return i + ratio;
                }
              }

              // If current week is before first data point
              if (currentWeek < filteredWeeks[0]) {
                return (currentWeek / filteredWeeks[0]) * 0;
              }

              // If current week is after last data point
              if (currentWeek > filteredWeeks[filteredWeeks.length - 1]) {
                return filteredWeeks.length - 1;
              }

              return 0;
            })(),
            xMax: (() => {
              // Same calculation for xMax (vertical line)
              const filteredWeeks = Array.from(
                { length: 41 },
                (_, i) => i
              ).filter((_, index) => index % 4 === 0);
              const currentWeek = results.currentWeek;

              for (let i = 0; i < filteredWeeks.length - 1; i++) {
                if (
                  currentWeek >= filteredWeeks[i] &&
                  currentWeek <= filteredWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - filteredWeeks[i]) /
                    (filteredWeeks[i + 1] - filteredWeeks[i]);
                  return i + ratio;
                }
              }

              if (currentWeek < filteredWeeks[0]) {
                return (currentWeek / filteredWeeks[0]) * 0;
              }

              if (currentWeek > filteredWeeks[filteredWeeks.length - 1]) {
                return filteredWeeks.length - 1;
              }

              return 0;
            })(),
            yMin: 0,
            yMax: 40,
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 3,
            borderDash: [5, 5],
          },
          currentWeekLabel: {
            type: "label" as const,
            xValue: (() => {
              // Get the filtered weeks that are actually shown on the chart (every 4 weeks)
              const filteredWeeks = Array.from(
                { length: 41 },
                (_, i) => i
              ).filter((_, index) => index % 4 === 0);
              const currentWeek = results.currentWeek;

              // Find the exact position by interpolating between data points
              for (let i = 0; i < filteredWeeks.length - 1; i++) {
                if (
                  currentWeek >= filteredWeeks[i] &&
                  currentWeek <= filteredWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - filteredWeeks[i]) /
                    (filteredWeeks[i + 1] - filteredWeeks[i]);
                  return i + ratio;
                }
              }

              // If current week is before first data point
              if (currentWeek < filteredWeeks[0]) {
                return (currentWeek / filteredWeeks[0]) * 0;
              }

              // If current week is after last data point
              if (currentWeek > filteredWeeks[filteredWeeks.length - 1]) {
                return filteredWeeks.length - 1;
              }

              return 0;
            })(),
            yValue: 42,
            content: `👇 You are here (Week ${results.currentWeek})`,
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            color: "white",
            font: {
              size: 12,
              weight: "bold" as const,
            },
            padding: 8,
            cornerRadius: 6,
            textAlign: "center" as const,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 45,
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

  const growthOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Baby Growth Throughout Pregnancy",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label.includes("Length")) {
              return `${label}: ${value}" (${(value * 2.54).toFixed(1)} cm)`;
            } else {
              return `${label}: ${value} lbs (${(value * 453.6).toFixed(0)}g)`;
            }
          },
        },
      },
      annotation: {
        annotations: {
          currentWeekLine: {
            type: "line" as const,
            xMin: (() => {
              // Calculate position based on current week relative to data points
              const dataWeeks = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
              const currentWeek = results.currentWeek;

              // Find position between data points
              if (currentWeek <= dataWeeks[0]) return 0;
              if (currentWeek >= dataWeeks[dataWeeks.length - 1])
                return dataWeeks.length - 1;

              // Find the interpolated position
              for (let i = 0; i < dataWeeks.length - 1; i++) {
                if (
                  currentWeek >= dataWeeks[i] &&
                  currentWeek <= dataWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - dataWeeks[i]) /
                    (dataWeeks[i + 1] - dataWeeks[i]);
                  return i + ratio;
                }
              }
              return dataWeeks.length - 1;
            })(),
            xMax: (() => {
              // Same calculation for xMax (vertical line)
              const dataWeeks = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
              const currentWeek = results.currentWeek;

              if (currentWeek <= dataWeeks[0]) return 0;
              if (currentWeek >= dataWeeks[dataWeeks.length - 1])
                return dataWeeks.length - 1;

              for (let i = 0; i < dataWeeks.length - 1; i++) {
                if (
                  currentWeek >= dataWeeks[i] &&
                  currentWeek <= dataWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - dataWeeks[i]) /
                    (dataWeeks[i + 1] - dataWeeks[i]);
                  return i + ratio;
                }
              }
              return dataWeeks.length - 1;
            })(),
            yMin: -5,
            yMax: 26,
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 3,
            borderDash: [5, 5],
          },
          currentWeekLabel: {
            type: "label" as const,
            xValue: (() => {
              // Same calculation as the line
              const dataWeeks = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
              const currentWeek = results.currentWeek;

              if (currentWeek <= dataWeeks[0]) return 0;
              if (currentWeek >= dataWeeks[dataWeeks.length - 1])
                return dataWeeks.length - 1;

              for (let i = 0; i < dataWeeks.length - 1; i++) {
                if (
                  currentWeek >= dataWeeks[i] &&
                  currentWeek <= dataWeeks[i + 1]
                ) {
                  const ratio =
                    (currentWeek - dataWeeks[i]) /
                    (dataWeeks[i + 1] - dataWeeks[i]);
                  return i + ratio;
                }
              }
              return dataWeeks.length - 1;
            })(),
            yValue: 28,
            content: `Week ${results.currentWeek}\n👇 You are here`,
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            color: "white",
            font: {
              size: 12,
              weight: "bold" as const,
            },
            padding: 8,
            cornerRadius: 6,
            textAlign: "center" as const,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Pregnancy Week",
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Length (inches)",
          color: "rgb(59, 130, 246)",
        },
        ticks: {
          color: "rgb(59, 130, 246)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Weight (lbs)",
          color: "rgb(239, 68, 68)",
        },
        ticks: {
          color: "rgb(239, 68, 68)",
        },
        grid: {
          drawOnChartArea: false,
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "timeline"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View pregnancy timeline chart"
        >
          Pregnancy Timeline
        </button>

        <button
          onClick={() => setActiveTab("growth")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "growth"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View baby growth chart"
        >
          Baby Growth
        </button>
      </div>

      <div className="w-full">
        {activeTab === "timeline" ? (
          <div>
            <div className="h-96">
              <Line data={generateTimelineData()} options={timelineOptions} />
            </div>
            {/* Trimester Legend */}
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">
                  1st Trimester (Weeks 1-12)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">
                  2nd Trimester (Weeks 13-26)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-600">
                  3rd Trimester (Weeks 27-40)
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-96">
            <Line data={generateBabyGrowthData()} options={growthOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
