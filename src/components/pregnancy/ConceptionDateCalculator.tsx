"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ConceptionFormValues {
  lastPeriodDate: string;
  dueDate: string;
  cycleLength: number;
  calculationMethod: "lastPeriod" | "dueDate";
}

interface ConceptionResults {
  conceptionDate: Date;
  conceptionWindow: {
    start: Date;
    end: Date;
  };
  ovulationDate: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
  implantationWindow: {
    start: Date;
    end: Date;
  };
}

export default function ConceptionDateCalculator() {
  const [formValues, setFormValues] = useLocalStorage<ConceptionFormValues>(
    "conceptionCalculatorFormValues",
    {
      lastPeriodDate: new Date(Date.now() - 10 * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      dueDate: new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      cycleLength: 28,
      calculationMethod: "lastPeriod",
    }
  );

  const [results, setResults] = useState<ConceptionResults | null>(null);

  const calculateConception = (
    values: ConceptionFormValues
  ): ConceptionResults => {
    let conceptionDate: Date;

    if (values.calculationMethod === "lastPeriod") {
      const lastPeriod = new Date(values.lastPeriodDate);
      // Conception typically occurs around ovulation (cycle length - 14 days)
      conceptionDate = new Date(
        lastPeriod.getTime() + (values.cycleLength - 14) * 24 * 60 * 60 * 1000
      );
    } else {
      const dueDate = new Date(values.dueDate);
      // Work backwards from due date (280 days - 14 days for conception = 266 days)
      conceptionDate = new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000);
    }

    // Conception window (sperm can live up to 5 days, egg lives 24 hours)
    const conceptionWindowStart = new Date(
      conceptionDate.getTime() - 5 * 24 * 60 * 60 * 1000
    );
    const conceptionWindowEnd = new Date(
      conceptionDate.getTime() + 1 * 24 * 60 * 60 * 1000
    );

    // Ovulation typically same as conception date
    const ovulationDate = new Date(conceptionDate);

    // Fertile window (5 days before + 1 day after ovulation)
    const fertileWindowStart = new Date(
      ovulationDate.getTime() - 5 * 24 * 60 * 60 * 1000
    );
    const fertileWindowEnd = new Date(
      ovulationDate.getTime() + 1 * 24 * 60 * 60 * 1000
    );

    // Implantation typically occurs 6-12 days after conception
    const implantationStart = new Date(
      conceptionDate.getTime() + 6 * 24 * 60 * 60 * 1000
    );
    const implantationEnd = new Date(
      conceptionDate.getTime() + 12 * 24 * 60 * 60 * 1000
    );

    return {
      conceptionDate,
      conceptionWindow: {
        start: conceptionWindowStart,
        end: conceptionWindowEnd,
      },
      ovulationDate,
      fertileWindow: {
        start: fertileWindowStart,
        end: fertileWindowEnd,
      },
      implantationWindow: {
        start: implantationStart,
        end: implantationEnd,
      },
    };
  };

  useEffect(() => {
    if (
      (formValues.calculationMethod === "lastPeriod" &&
        formValues.lastPeriodDate) ||
      (formValues.calculationMethod === "dueDate" && formValues.dueDate)
    ) {
      const conceptionResults = calculateConception(formValues);
      setResults(conceptionResults);
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

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Conception Date Calculator
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
              <option value="dueDate">From Due Date</option>
            </select>
          </div>

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

          {formValues.calculationMethod === "lastPeriod" && (
            <div>
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
          )}

          {formValues.calculationMethod === "dueDate" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formValues.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Main Conception Date */}
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
            <div className="text-sm text-gray-600 mb-1">
              Most Likely Conception Date
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatDate(results.conceptionDate)}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Estimated ovulation date
            </div>
          </div>

          {/* Key Windows */}
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
              Fertility Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Fertile Window</div>
                <div className="text-xl font-bold text-gray-900">
                  {formatDateRange(
                    results.fertileWindow.start,
                    results.fertileWindow.end
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Best time for conception
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Conception Window
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {formatDateRange(
                    results.conceptionWindow.start,
                    results.conceptionWindow.end
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  When conception likely occurred
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Timeline */}
          <div>
            <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
              Detailed Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Ovulation Date</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(results.ovulationDate)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Egg released</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  Implantation Window
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDateRange(
                    results.implantationWindow.start,
                    results.implantationWindow.end
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  6-12 days after conception
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Pregnancy Test</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(
                    new Date(
                      results.implantationWindow.end.getTime() +
                        3 * 24 * 60 * 60 * 1000
                    )
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Earliest reliable test
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">
              Important Notes
            </h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>
                • These are estimates based on average cycle lengths and
                ovulation timing
              </p>
              <p>
                • Actual conception can occur within the fertile window (sperm
                can survive up to 5 days)
              </p>
              <p>
                • Cycle length and ovulation timing can vary between individuals
                and cycles
              </p>
              <p>• For precise dating, consult with your healthcare provider</p>
            </div>
          </div>
        </div>
      )}

      {!results && (
        <p className="text-center text-gray-500">
          Enter your information to calculate conception dates and fertility
          windows.
        </p>
      )}
    </div>
  );
}
