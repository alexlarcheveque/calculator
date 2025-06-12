"use client";

import { BodyFatResults, Gender } from "@/types/bodyFat";
import { getBodyFatCategories } from "@/utils/bodyFatCalculations";

interface CategoryComparisonChartProps {
  results: BodyFatResults;
  gender: Gender;
}

export default function CategoryComparisonChart({
  results,
  gender,
}: CategoryComparisonChartProps) {
  const categories = getBodyFatCategories();
  const userBodyFat = results.bodyFatPercentageNavy;

  // Parse ranges to get numeric values
  const parseRange = (range: string) => {
    if (range.includes("+")) {
      return [parseInt(range.replace("+", "").replace("%", "")), 50];
    }
    const parts = range.split("-");
    return [parseInt(parts[0]), parseInt(parts[1].replace("%", ""))];
  };

  // Get ranges for current gender
  const ranges = categories.map((cat) => {
    const range = gender === Gender.FEMALE ? cat.womenRange : cat.menRange;
    return {
      ...cat,
      min: parseRange(range)[0],
      max: parseRange(range)[1],
      range: range,
    };
  });

  const maxBodyFat = 50;
  const minBodyFat = 2;

  // Calculate position of user's body fat on the scale (0-100%)
  const userPosition = Math.min(
    Math.max(((userBodyFat - minBodyFat) / (maxBodyFat - minBodyFat)) * 100, 0),
    100
  );

  // Category boundary points for labels (actual transition points)
  const boundaryPoints = ranges.slice(0, -1).map((category) => category.max);

  return (
    <div className="space-y-4">
      {/* Fixed height container */}
      <div className="h-96 flex flex-col justify-center">
        {/* Body Fat Value Display */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {userBodyFat.toFixed(1)}%
          </div>
          <div className="text-lg font-semibold mt-1 text-blue-600">
            {results.bodyFatCategory}
          </div>
        </div>

        {/* Linear Gauge */}
        <div className="relative mb-6 mt-20">
          {/* Boundary indicators above the gauge */}
          <div className="relative mb-4">
            {boundaryPoints.map((bodyFat) => {
              const position =
                ((bodyFat - minBodyFat) / (maxBodyFat - minBodyFat)) * 100;
              return (
                <div
                  key={bodyFat}
                  className="absolute"
                  style={{ left: `${position}%` }}
                >
                  {/* Body fat value label */}
                  <div
                    className="absolute text-xs font-medium text-gray-700 whitespace-nowrap"
                    style={{
                      transform: "translateX(-50%)",
                      bottom: "32px",
                    }}
                  >
                    {bodyFat}%
                  </div>
                  {/* Downward pointing triangle */}
                  <div
                    className="absolute w-0 h-0"
                    style={{
                      transform: "translateX(-50%)",
                      bottom: "20px",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: "6px solid #374151",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Background track with user indicator */}
          <div className="relative">
            {/* User's Body Fat Indicator triangle above */}
            <div
              className="absolute w-0 h-0 z-20"
              style={{
                left: `${userPosition}%`,
                transform: "translateX(-50%)",
                top: "-8px",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid #1f2937",
              }}
            />

            {/* User's position label */}
            <div
              className="absolute text-xs font-bold text-gray-900 whitespace-nowrap z-20"
              style={{
                left: `${userPosition}%`,
                transform: "translateX(-50%)",
                top: "-24px",
              }}
            >
              You: {userBodyFat.toFixed(1)}%
            </div>

            {/* The gauge bar with colored segments */}
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              {ranges.map((category, index) => {
                // Calculate positions but adjust to eliminate gaps
                let startPos =
                  ((category.min - minBodyFat) / (maxBodyFat - minBodyFat)) *
                  100;
                let endPos =
                  ((category.max - minBodyFat) / (maxBodyFat - minBodyFat)) *
                  100;

                // For the first segment, always start at 0% (minBodyFat position)
                if (index === 0) {
                  startPos = 0;
                }

                // For all segments except the first, start where the previous one ended
                if (index > 0) {
                  const prevCategory = ranges[index - 1];
                  startPos =
                    ((prevCategory.max - minBodyFat) /
                      (maxBodyFat - minBodyFat)) *
                    100;
                }

                // For the last segment, extend to the end
                if (index === ranges.length - 1) {
                  endPos = 100;
                }

                const width = endPos - startPos;

                return (
                  <div
                    key={index}
                    className="absolute h-full transition-all duration-300"
                    style={{
                      left: `${startPos}%`,
                      width: `${width}%`,
                      backgroundColor: category.color,
                      opacity:
                        category.name === results.bodyFatCategory ? 1 : 0.7,
                    }}
                  />
                );
              })}

              {/* User's exact position marker */}
              <div
                className="absolute top-0 h-full w-1 bg-gray-900 z-10"
                style={{
                  left: `${userPosition}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Category legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mt-8">
          {ranges.map((category, index) => {
            const isUserCategory = category.name === results.bodyFatCategory;
            return (
              <div
                key={index}
                className={`p-2 rounded text-center ${
                  isUserCategory
                    ? "bg-blue-50 border-2 border-blue-300"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <div
                  className={`font-medium ${
                    isUserCategory ? "text-blue-800" : "text-gray-700"
                  }`}
                >
                  {category.name}
                </div>
                <div className="text-gray-600">{category.range}</div>
                {isUserCategory && (
                  <div className="font-bold text-blue-600 mt-1">
                    You: {userBodyFat.toFixed(1)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
