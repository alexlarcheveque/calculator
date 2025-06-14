"use client";

import { useState } from "react";
import { ConceptionResults, FertilityPeriod } from "@/types/conception";
import { formatShortDate } from "@/utils/conceptionCalculations";

interface ConceptionChartProps {
  results: ConceptionResults;
  multipleCycles: FertilityPeriod[];
  cycleLength: number;
}

export default function ConceptionChart({
  results,
  multipleCycles,
  cycleLength,
}: ConceptionChartProps) {
  const [activeTab, setActiveTab] = useState<"current" | "upcoming">("current");

  const getCurrentMonthCalendar = () => {
    // Use the ovulation date to determine which month to show
    const ovulationDate = results.ovulationDate;
    const year = ovulationDate.getFullYear();
    const month = ovulationDate.getMonth();

    // Get first day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Create calendar grid
    const calendar = [];
    let date = 1;

    // Create 6 weeks (42 days) to ensure full month display
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startingDayOfWeek) {
          weekDays.push(null); // Empty cell
        } else if (date > daysInMonth) {
          weekDays.push(null); // Empty cell
        } else {
          weekDays.push(new Date(year, month, date));
          date++;
        }
      }
      calendar.push(weekDays);
      if (date > daysInMonth) break;
    }

    return calendar;
  };

  const getUpcomingCyclesCalendar = () => {
    // Show the next cycle's month based on the current ovulation date
    const currentOvulation = results.ovulationDate;
    const nextCycleDate = new Date(currentOvulation);
    nextCycleDate.setDate(nextCycleDate.getDate() + cycleLength);
    const year = nextCycleDate.getFullYear();
    const month = nextCycleDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    let date = 1;

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startingDayOfWeek) {
          weekDays.push(null);
        } else if (date > daysInMonth) {
          weekDays.push(null);
        } else {
          weekDays.push(new Date(year, month, date));
          date++;
        }
      }
      calendar.push(weekDays);
      if (date > daysInMonth) break;
    }

    return calendar;
  };

  const getDayStatus = (date: Date, isUpcoming = false) => {
    if (!date) return null;

    const dateStr = date.toDateString();
    const today = new Date().toDateString();

    // For current month
    if (!isUpcoming) {
      if (dateStr === results.ovulationDate.toDateString()) {
        return { type: "ovulation", label: "Ovulation" };
      }

      // Best conception days (2 days before ovulation through ovulation) - check this FIRST
      const bestStart = new Date(results.ovulationDate);
      bestStart.setDate(bestStart.getDate() - 2);

      // Use date-only comparison to avoid time issues
      const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const bestStartOnly = new Date(
        bestStart.getFullYear(),
        bestStart.getMonth(),
        bestStart.getDate()
      );
      const ovulationOnly = new Date(
        results.ovulationDate.getFullYear(),
        results.ovulationDate.getMonth(),
        results.ovulationDate.getDate()
      );

      if (dateOnly >= bestStartOnly && dateOnly <= ovulationOnly) {
        return { type: "best", label: "Best" };
      }

      // Then check for general fertile window
      if (
        date >= results.fertilityWindowStart &&
        date <= results.fertilityWindowEnd
      ) {
        return { type: "fertile", label: "Fertile" };
      }
    } else {
      // For upcoming cycles
      const upcomingCycle = multipleCycles.find((cycle) => {
        const cycleMonth = cycle.ovulationDate.getMonth();
        const dateMonth = date.getMonth();
        return cycleMonth === dateMonth;
      });

      if (upcomingCycle) {
        if (dateStr === upcomingCycle.ovulationDate.toDateString()) {
          return { type: "ovulation", label: "Ovulation" };
        }

        // Best conception days for upcoming cycle
        const bestStart = new Date(upcomingCycle.ovulationDate);
        bestStart.setDate(bestStart.getDate() - 2);

        // Use date-only comparison to avoid time issues
        const dateOnly = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        const bestStartOnly = new Date(
          bestStart.getFullYear(),
          bestStart.getMonth(),
          bestStart.getDate()
        );
        const ovulationOnly = new Date(
          upcomingCycle.ovulationDate.getFullYear(),
          upcomingCycle.ovulationDate.getMonth(),
          upcomingCycle.ovulationDate.getDate()
        );

        if (dateOnly >= bestStartOnly && dateOnly <= ovulationOnly) {
          return { type: "best", label: "Best" };
        }

        if (
          date >= upcomingCycle.fertilityWindowStart &&
          date <= upcomingCycle.fertilityWindowEnd
        ) {
          return { type: "fertile", label: "Fertile" };
        }
      }
    }

    if (dateStr === today) {
      return { type: "today", label: "Today" };
    }

    return null;
  };

  const getDayClasses = (status: any) => {
    const baseClasses =
      "w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full";

    if (!status) return `${baseClasses} text-gray-700 hover:bg-gray-100`;

    switch (status.type) {
      case "ovulation":
        return `${baseClasses} bg-pink-500 text-white`;
      case "best":
        return `${baseClasses} bg-green-500 text-white`;
      case "fertile":
        return `${baseClasses} bg-green-200 text-green-800`;
      case "today":
        return `${baseClasses} bg-blue-500 text-white ring-2 ring-blue-300`;
      default:
        return `${baseClasses} text-gray-700 hover:bg-gray-100`;
    }
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const renderCalendar = (calendar: (Date | null)[][], isUpcoming = false) => {
    const monthDate = isUpcoming
      ? (() => {
          const currentOvulation = results.ovulationDate;
          const nextCycleDate = new Date(currentOvulation);
          nextCycleDate.setDate(nextCycleDate.getDate() + cycleLength);
          return nextCycleDate;
        })()
      : results.ovulationDate;

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {getMonthName(monthDate)}
        </h3>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 gap-1">
          {calendar.map((week, weekIndex) =>
            week.map((date, dayIndex) => {
              const status = date ? getDayStatus(date, isUpcoming) : null;
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="flex justify-center"
                >
                  {date ? (
                    <div
                      className={getDayClasses(status)}
                      title={status?.label}
                    >
                      {date.getDate()}
                    </div>
                  ) : (
                    <div className="w-8 h-8"></div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`py-2 px-4 font-medium text-sm mr-4 ${
            activeTab === "current"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View current month calendar"
        >
          This Month
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "upcoming"
              ? "text-primary-600 border-b-2 border-primary-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-label="View upcoming cycles calendar"
        >
          Next Month
        </button>
      </div>

      <div className="w-full">
        {activeTab === "current" ? (
          <div>
            {renderCalendar(getCurrentMonthCalendar(), false)}

            {/* Current Month Legend */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800 mb-3">
                Calendar Legend
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                  <span>Ovulation Day</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Best Days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-200 rounded-full mr-2"></div>
                  <span>Fertile Window</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {renderCalendar(getUpcomingCyclesCalendar(), true)}

            {/* Next Month Legend */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800 mb-3">
                Calendar Legend
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                  <span>Ovulation Day</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Best Days</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-200 rounded-full mr-2"></div>
                  <span>Fertile Window</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
