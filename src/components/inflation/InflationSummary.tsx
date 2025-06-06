import { InflationResults, InflationCalculatorType } from "@/types/inflation";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/inflationCalculations";

interface InflationSummaryProps {
  results: InflationResults;
}

export default function InflationSummary({ results }: InflationSummaryProps) {
  const isBackward =
    results.calculationType === InflationCalculatorType.BACKWARD_RATE;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Inflation Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Starting Amount */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            {isBackward ? "Past Value" : "Starting Amount"}
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(results.originalAmount)}
          </p>
        </div>

        {/* Result Amount */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">
            {isBackward ? "Current Value" : "Future Value"}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(results.adjustedAmount)}
          </p>
        </div>

        {/* Inflation Rate */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Inflation Rate
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {formatPercentage(results.inflationRate)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            over {results.yearsDifference} years
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          {isBackward ? (
            <>
              What cost{" "}
              <strong>{formatCurrency(results.originalAmount)}</strong>{" "}
              {results.yearsDifference} years ago would cost{" "}
              <strong>{formatCurrency(results.adjustedAmount)}</strong> today
            </>
          ) : (
            <>
              <strong>{formatCurrency(results.originalAmount)}</strong> will
              have the purchasing power of{" "}
              <strong>{formatCurrency(results.adjustedAmount)}</strong> in{" "}
              {results.yearsDifference} years
            </>
          )}
        </p>
      </div>
    </div>
  );
}
