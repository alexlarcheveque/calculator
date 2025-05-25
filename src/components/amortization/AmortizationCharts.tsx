import {
  AmortizationResults,
  AmortizationScheduleItem,
} from "@/types/amortization";
import { formatCurrency } from "@/utils/amortizationCalculations";

interface AmortizationChartsProps {
  results: AmortizationResults;
  scheduleData: AmortizationScheduleItem[];
}

export default function AmortizationCharts({
  results,
  scheduleData,
}: AmortizationChartsProps) {
  // Create data points for the balance chart (yearly data points)
  const chartData = scheduleData.filter((_, index) => {
    // Include first payment, last payment, and end of each year
    if (index === 0 || index === scheduleData.length - 1) return true;

    const currentYear = scheduleData[index].date.getFullYear();
    const nextYear = scheduleData[index + 1]?.date.getFullYear();

    return currentYear !== nextYear;
  });

  const maxBalance = Math.max(...chartData.map((d) => d.remainingBalance));
  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 40;

  // Calculate chart points
  const points = chartData.map((item, index) => {
    const x =
      padding + (index / (chartData.length - 1)) * (chartWidth - 2 * padding);
    const y =
      chartHeight -
      padding -
      (item.remainingBalance / maxBalance) * (chartHeight - 2 * padding);
    return { x, y, item };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Balance Over Time Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Remaining Balance Over Time
        </h3>

        <div className="flex justify-center">
          <svg
            width={chartWidth}
            height={chartHeight}
            className="border border-gray-200"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y =
                chartHeight - padding - ratio * (chartHeight - 2 * padding);
              return (
                <g key={ratio}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={padding - 5}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-600"
                  >
                    {formatCurrency(maxBalance * ratio)}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {points.map((point, index) => {
              if (
                index % Math.ceil(points.length / 5) === 0 ||
                index === points.length - 1
              ) {
                return (
                  <text
                    key={index}
                    x={point.x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {point.item.date.getFullYear()}
                  </text>
                );
              }
              return null;
            })}

            {/* Balance line */}
            <path
              d={`M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#2563eb"
                className="hover:r-6 cursor-pointer"
              >
                <title>
                  {point.item.date.getFullYear()}:{" "}
                  {formatCurrency(point.item.remainingBalance)}
                </title>
              </circle>
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="#374151"
              strokeWidth="2"
            />
            <line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="#374151"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Payment Breakdown
        </h3>

        <div className="space-y-4">
          {/* Principal vs Interest */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Principal</span>
              <span>{Math.round(results.principalPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${results.principalPercentage}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 mt-1">
              {formatCurrency(results.totalAmount - results.totalInterest)}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Interest</span>
              <span>{Math.round(results.interestPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${results.interestPercentage}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 mt-1">
              {formatCurrency(results.totalInterest)}
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>{formatCurrency(results.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
