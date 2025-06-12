"use client";

import { BMIResults, BMI_CATEGORIES } from "@/types/bmi";
import { formatNumber } from "@/utils/bmiCalculations";

interface BMIGaugeChartProps {
  results: BMIResults;
}

export default function BMIGaugeChart({ results }: BMIGaugeChartProps) {
  // Don't render if BMI is invalid (0, NaN, or Infinity)
  if (!results || !isFinite(results.bmi) || results.bmi <= 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-100">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className="py-2 px-4 font-medium text-sm mr-4 text-primary-600 border-b-2 border-primary-500"
            aria-label="View BMI gauge"
          >
            BMI Gauge
          </button>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">
            Enter valid height and weight to see BMI gauge
          </p>
        </div>
      </div>
    );
  }

  // Check if this is a child (has percentile data) or under 2 years old
  const isChild = results.percentile !== undefined;
  const isTooYoung = results.category === "BMI Not Applicable";

  // For children and infants, don't show the adult BMI gauge
  if (isChild || isTooYoung) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-100">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className="py-2 px-4 font-medium text-sm mr-4 text-primary-600 border-b-2 border-primary-500"
            aria-label="View BMI gauge"
          >
            BMI Gauge
          </button>
        </div>

        <div className="w-full">
          {/* BMI Value Display */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-900">
              BMI {formatNumber(results.bmi, 1)}
            </div>
            <div
              className="text-lg font-semibold mt-1"
              style={{ color: results.categoryColor }}
            >
              {results.category}
            </div>
          </div>

          {/* Explanation for why gauge is not shown */}
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="text-center space-y-4">
              <div className="text-6xl text-gray-300">📊</div>

              {isTooYoung ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    BMI Gauge Not Available
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md">
                    BMI categories are not used for children under 2 years old.
                    Growth is tracked using other age-appropriate measurements.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    Adult BMI Ranges Don't Apply to Children
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md">
                    For children and teens (ages 2-19), BMI is evaluated using
                    percentiles compared to peers of the same age and gender,
                    not adult BMI categories.
                  </p>
                  {results.percentile !== undefined && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Your BMI percentile: {Math.round(results.percentile)}th
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        See the detailed percentile information above for proper
                        evaluation.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For adults (20+), show the normal BMI gauge
  // Use the same BMI categories as the table for consistent colors
  const BMI_RANGES = BMI_CATEGORIES.map((category) => ({
    min: category.minBMI,
    max: category.maxBMI,
    color: category.color,
    name: category.name,
  }));

  const maxBMI = 45;
  const minBMI = 0;

  // Calculate position of current BMI on the scale (0-100%)
  const bmiPosition = Math.min(
    Math.max(((results.bmi - minBMI) / (maxBMI - minBMI)) * 100, 0),
    100
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-100">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className="py-2 px-4 font-medium text-sm mr-4 text-primary-600 border-b-2 border-primary-500"
          aria-label="View BMI gauge"
        >
          BMI Gauge
        </button>
      </div>

      <div className="w-full">
        {/* BMI Value Display */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-gray-900">
            BMI {formatNumber(results.bmi, 1)}
          </div>
          <div
            className="text-lg font-semibold mt-1"
            style={{ color: results.categoryColor }}
          >
            {results.category}
          </div>
        </div>

        {/* Linear Gauge */}
        <div className="relative mb-6 mt-20">
          {/* Boundary indicators above the chart */}
          <div className="relative mb-2">
            {[16, 17, 18.5, 25, 30, 35, 40].map((bmi) => {
              const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
              return (
                <div
                  key={bmi}
                  className="absolute"
                  style={{ left: `${position}%` }}
                >
                  {/* BMI value label */}
                  <div
                    className="absolute text-xs font-medium text-gray-700 whitespace-nowrap"
                    style={{
                      transform: "translateX(-50%)",
                      bottom: "20px",
                    }}
                  >
                    {bmi}
                  </div>
                  {/* Downward pointing triangle */}
                  <div
                    className="absolute w-0 h-0"
                    style={{
                      transform: "translateX(-50%)",
                      bottom: "8px",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: "6px solid #374151",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Background track with indicator */}
          <div className="relative">
            {/* BMI Indicator triangle above */}
            <div
              className="absolute w-0 h-0 z-20"
              style={{
                left: `${bmiPosition}%`,
                transform: "translateX(-50%)",
                top: "-8px",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid #1f2937",
              }}
            />

            {/* Colored segments */}
            <div className="h-8 bg-gray-200 rounded-lg relative overflow-hidden">
              {BMI_RANGES.map((range, index) => {
                const startPercent =
                  ((range.min - minBMI) / (maxBMI - minBMI)) * 100;
                const widthPercent =
                  ((range.max - range.min) / (maxBMI - minBMI)) * 100;

                return (
                  <div
                    key={index}
                    className="absolute top-0 h-full"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                      backgroundColor: range.color,
                    }}
                  />
                );
              })}

              {/* BMI Indicator line */}
              <div
                className="absolute top-0 h-full w-1 bg-gray-900 shadow-lg z-10"
                style={{
                  left: `${bmiPosition}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* BMI Scale Labels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-center my-10">
          {BMI_CATEGORIES.map((category, index) => (
            <div key={index}>
              <div
                className="w-3 h-3 mx-auto mb-1 rounded"
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="font-medium">{category.name}</div>
              <div className="text-gray-500">{category.range}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
