"use client";

import { InflationResults, InflationCalculatorType } from "@/types/inflation";
import { getHistoricalInflationData } from "@/utils/inflationCalculations";
import InflationTrendChart from "./InflationTrendChart";
import ValueComparisonChart from "./ValueComparisonChart";

interface InflationChartsProps {
  results: InflationResults;
}

export default function InflationCharts({ results }: InflationChartsProps) {
  const historicalData = getHistoricalInflationData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Inflation Analysis Charts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Value Comparison Chart */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Value Comparison
          </h3>
          <ValueComparisonChart results={results} />
        </div>

        {/* Historical Inflation Trend */}
        {results.calculationType === InflationCalculatorType.CPI_DATA && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              Historical Inflation Rate (1925-2024)
            </h3>
            <InflationTrendChart data={historicalData} />
          </div>
        )}

        {/* Projection Chart for Forward/Backward calculations */}
        {(results.calculationType === InflationCalculatorType.FORWARD_RATE ||
          results.calculationType ===
            InflationCalculatorType.BACKWARD_RATE) && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              {results.calculationType === InflationCalculatorType.FORWARD_RATE
                ? "Future Value Projection"
                : "Historical Value Estimation"}
            </h3>
            <InflationTrendChart
              data={historicalData}
              projectionRate={results.inflationRate}
              projectionYears={results.yearsDifference}
              calculationType={results.calculationType}
            />
          </div>
        )}
      </div>
    </div>
  );
}
