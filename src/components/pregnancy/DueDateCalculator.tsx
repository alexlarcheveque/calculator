"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DueDateFormValues {
  lastPeriodDate: string;
  conceptionDate: string;
  cycleLength: number;
  calculationMethod: "lastPeriod" | "conception";
}

interface DueDateResults {
  dueDate: Date;
  gestationalAge: {
    weeks: number;
    days: number;
    totalDays: number;
  };
  trimester: 1 | 2 | 3;
  keyMilestones: {
    firstTrimesterEnd: Date;
    secondTrimesterEnd: Date;
    viabilityDate: Date;
    fullTermStart: Date;
  };
  estimatedConceptionDate: Date;
  daysUntilDue: number;
}

export default function DueDateCalculator() {
  const [formValues, setFormValues] = useLocalStorage<DueDateFormValues>(
    "dueDateCalculatorFormValues",
    {
      lastPeriodDate: new Date(Date.now() - 10 * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      conceptionDate: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      cycleLength: 28,
      calculationMethod: "lastPeriod",
    }
  );

  const [results, setResults] = useState<DueDateResults | null>(null);

  const calculateDueDate = (values: DueDateFormValues): DueDateResults => {
    let dueDate: Date;
    let estimatedConceptionDate: Date;

    if (values.calculationMethod === "lastPeriod") {
      const lastPeriod = new Date(values.lastPeriodDate);
      // Standard due date calculation: LMP + 280 days (40 weeks)
      dueDate = new Date(lastPeriod.getTime() + 280 * 24 * 60 * 60 * 1000);
      // Estimated conception: LMP + (cycle length - 14) days
      estimatedConceptionDate = new Date(
        lastPeriod.getTime() + (values.cycleLength - 14) * 24 * 60 * 60 * 1000
      );
    } else {
      const conception = new Date(values.conceptionDate);
      // Due date from conception: conception + 266 days (38 weeks)
      dueDate = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000);
      estimatedConceptionDate = conception;
    }

    // Calculate current gestational age
    const today = new Date();
    const gestationalStart =
      values.calculationMethod === "lastPeriod"
        ? new Date(values.lastPeriodDate)
        : new Date(
            new Date(values.conceptionDate).getTime() - 14 * 24 * 60 * 60 * 1000
          );

    const totalDays = Math.floor(
      (today.getTime() - gestationalStart.getTime()) / (24 * 60 * 60 * 1000)
    );
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // Determine trimester
    let trimester: 1 | 2 | 3;
    if (weeks < 13) trimester = 1;
    else if (weeks < 27) trimester = 2;
    else trimester = 3;

    // Key milestones
    const firstTrimesterEnd = new Date(
      gestationalStart.getTime() + 13 * 7 * 24 * 60 * 60 * 1000
    );
    const secondTrimesterEnd = new Date(
      gestationalStart.getTime() + 27 * 7 * 24 * 60 * 60 * 1000
    );
    const viabilityDate = new Date(
      gestationalStart.getTime() + 24 * 7 * 24 * 60 * 60 * 1000
    );
    const fullTermStart = new Date(
      gestationalStart.getTime() + 37 * 7 * 24 * 60 * 60 * 1000
    );

    // Days until due date
    const daysUntilDue = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
    );

    return {
      dueDate,
      gestationalAge: {
        weeks,
        days,
        totalDays,
      },
      trimester,
      keyMilestones: {
        firstTrimesterEnd,
        secondTrimesterEnd,
        viabilityDate,
        fullTermStart,
      },
      estimatedConceptionDate,
      daysUntilDue,
    };
  };

  useEffect(() => {
    if (
      (formValues.calculationMethod === "lastPeriod" &&
        formValues.lastPeriodDate) ||
      (formValues.calculationMethod === "conception" &&
        formValues.conceptionDate)
    ) {
      const dueDateResults = calculateDueDate(formValues);
      setResults(dueDateResults);
    }
  }, [formValues]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTrimesterName = (trimester: number) => {
    switch (trimester) {
      case 1:
        return "First Trimester";
      case 2:
        return "Second Trimester";
      case 3:
        return "Third Trimester";
      default:
        return "Unknown";
    }
  };

  const getDaysUntilText = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today!";
    return `${days} days remaining`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Due Date Calculator
      </h2>

      {/* Form */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Method
            </label>
            <select
              value={formValues.calculationMethod}
              onChange={(e) =>
                handleInputChange("calculationMethod", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lastPeriod">From Last Period Date</option>
              <option value="conception">From Conception Date</option>
            </select>
          </div>

          {formValues.calculationMethod === "lastPeriod" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cycle Length (days)
                </label>
                <input
                  type="number"
                  min="21"
                  max="35"
                  value={formValues.cycleLength}
                  onChange={(e) =>
                    handleInputChange("cycleLength", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Menstrual Period Date
                </label>
                <input
                  type="date"
                  value={formValues.lastPeriodDate}
                  onChange={(e) =>
                    handleInputChange("lastPeriodDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {formValues.calculationMethod === "conception" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conception Date
              </label>
              <input
                type="date"
                value={formValues.conceptionDate}
                onChange={(e) =>
                  handleInputChange("conceptionDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Main Due Date */}
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
            <div className="text-sm text-gray-600 mb-1">Estimated Due Date</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatDate(results.dueDate)}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {getDaysUntilText(results.daysUntilDue)}
            </div>
          </div>

          {/* Current Status */}
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
              Current Pregnancy Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Gestational Age
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {results.gestationalAge.weeks}w {results.gestationalAge.days}d
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {results.gestationalAge.totalDays} total days
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Current Trimester
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {results.trimester}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getTrimesterName(results.trimester)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Progress</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((results.gestationalAge.weeks / 40) * 100)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">Complete</div>
              </div>
            </div>
          </div>

          {/* Key Milestones */}
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
              Important Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  First Trimester Ends
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(results.keyMilestones.firstTrimesterEnd)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  13 weeks (miscarriage risk decreases)
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Viability</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(results.keyMilestones.viabilityDate)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  24 weeks (survival outside womb possible)
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Second Trimester Ends
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(results.keyMilestones.secondTrimesterEnd)}
                </div>
                <div className="text-xs text-gray-500 mt-1">27 weeks</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Full Term</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(results.keyMilestones.fullTermStart)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  37 weeks (safe for delivery)
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
              Additional Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Estimated Conception:</span>
                  <div className="font-medium text-gray-900">
                    {formatDate(results.estimatedConceptionDate)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Delivery Window:</span>
                  <div className="font-medium text-gray-900">
                    {formatDate(
                      new Date(
                        results.dueDate.getTime() - 14 * 24 * 60 * 60 * 1000
                      )
                    )}{" "}
                    -{" "}
                    {formatDate(
                      new Date(
                        results.dueDate.getTime() + 14 * 24 * 60 * 60 * 1000
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Important Notes</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                • Due dates are estimates - only 5% of babies are born on their
                exact due date
              </p>
              <p>• Full-term delivery can occur anywhere from 37-42 weeks</p>
              <p>
                • These calculations are based on a standard 280-day pregnancy
              </p>
              <p>
                • Your healthcare provider may adjust dates based on ultrasound
                measurements
              </p>
            </div>
          </div>
        </div>
      )}

      {!results && (
        <p className="text-center text-gray-500">
          Enter your information to calculate your estimated due date and
          pregnancy milestones.
        </p>
      )}
    </div>
  );
}
