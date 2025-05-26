"use client";

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
import { BodyFatResults, Gender } from "@/types/bodyFat";
import { getBodyFatCategories } from "@/utils/bodyFatCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryComparisonChartProps {
  results: BodyFatResults;
  gender: Gender;
}

export default function CategoryComparisonChart({
  results,
  gender,
}: CategoryComparisonChartProps) {
  const categories = getBodyFatCategories();

  // Parse ranges to get numeric values for visualization
  const parseRange = (range: string) => {
    if (range.includes("+")) {
      return [parseInt(range.replace("+", "").replace("%", "")), 50];
    }
    const parts = range.split("-");
    return [parseInt(parts[0]), parseInt(parts[1].replace("%", ""))];
  };

  const labels = categories.map((cat) => cat.name);

  const ranges = categories.map((cat) => {
    // Use appropriate gender range
    const range = gender === Gender.FEMALE ? cat.womenRange : cat.menRange;
    return parseRange(range);
  });

  // Create data for the full range bars
  const rangeData = ranges.map((range) => range[1]);

  // Create data for user's body fat percentage
  const userBodyFat = results.bodyFatPercentageNavy;
  const userCategoryIndex = categories.findIndex(
    (cat) => cat.name === results.bodyFatCategory
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Body Fat Ranges (${
          gender === Gender.FEMALE ? "Women" : "Men"
        })`,
        data: rangeData,
        backgroundColor: categories.map((cat, index) => {
          // Highlight the user's category
          return index === userCategoryIndex
            ? cat.color + "CC"
            : cat.color + "66";
        }),
        borderColor: categories.map((cat) => cat.color),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Body Fat Categories",
        },
      },
      y: {
        beginAtZero: true,
        max: 50,
        title: {
          display: true,
          text: "Body Fat Percentage (%)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const categoryIndex = context.dataIndex;
            const category = categories[categoryIndex];
            const range =
              gender === Gender.FEMALE
                ? category.womenRange
                : category.menRange;
            return `${category.name}: ${range}`;
          },
          afterLabel: function (context: any) {
            const categoryIndex = context.dataIndex;
            if (categoryIndex === userCategoryIndex) {
              return `Your body fat: ${userBodyFat.toFixed(1)}%`;
            }
            return undefined;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full">
      {/* Chart container with fixed height */}
      <div className="w-full h-64 mb-4">
        <Bar data={data} options={options} />
      </div>

      {/* User's position indicator */}
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-3">
          Your body fat percentage of{" "}
          <span className="font-medium">
            {results.bodyFatPercentageNavy.toFixed(1)}%
          </span>{" "}
          falls in the{" "}
          <span
            className="font-medium"
            style={{
              color: categories.find(
                (cat) => cat.name === results.bodyFatCategory
              )?.color,
            }}
          >
            {results.bodyFatCategory}
          </span>{" "}
          category for {gender === Gender.FEMALE ? "women" : "men"}.
        </div>

        {/* Range breakdown */}
        <div className="grid grid-cols-5 gap-2 text-xs">
          {categories.map((category, index) => {
            const range =
              gender === Gender.FEMALE
                ? category.womenRange
                : category.menRange;
            const isUserCategory = category.name === results.bodyFatCategory;
            return (
              <div
                key={index}
                className={`p-2 rounded ${
                  isUserCategory ? "bg-gray-100 border-2" : "bg-gray-50"
                }`}
                style={{
                  borderColor: isUserCategory ? category.color : "transparent",
                }}
              >
                <div className="font-medium" style={{ color: category.color }}>
                  {category.name}
                </div>
                <div className="text-gray-600">{range}</div>
                {isUserCategory && (
                  <div className="font-bold text-black">
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
