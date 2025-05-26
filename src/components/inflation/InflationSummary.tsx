import { InflationResults, InflationCalculatorType } from "@/types/inflation";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/inflationCalculations";

interface InflationSummaryProps {
  results: InflationResults;
}

export default function InflationSummary({ results }: InflationSummaryProps) {
  const getSummaryTitle = () => {
    switch (results.calculationType) {
      case InflationCalculatorType.CPI_DATA:
        return "Inflation-Adjusted Value (CPI Data)";
      case InflationCalculatorType.FORWARD_RATE:
        return "Future Value with Inflation";
      case InflationCalculatorType.BACKWARD_RATE:
        return "Past Purchasing Power";
      default:
        return "Inflation Results";
    }
  };

  const getSummaryDescription = () => {
    switch (results.calculationType) {
      case InflationCalculatorType.CPI_DATA:
        return `Based on historical U.S. Consumer Price Index data over ${results.yearsDifference.toFixed(
          1
        )} years`;
      case InflationCalculatorType.FORWARD_RATE:
        return `Projected value after ${
          results.yearsDifference
        } years at ${formatPercentage(results.inflationRate)} annual inflation`;
      case InflationCalculatorType.BACKWARD_RATE:
        return `Equivalent purchasing power ${
          results.yearsDifference
        } years ago at ${formatPercentage(
          results.inflationRate
        )} annual inflation`;
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {getSummaryTitle()}
      </h2>

      <p className="text-sm text-gray-600 mb-6">{getSummaryDescription()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Original Amount */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            {results.calculationType === InflationCalculatorType.BACKWARD_RATE
              ? "Past Value"
              : "Original Amount"}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(results.originalAmount)}
          </p>
        </div>

        {/* Adjusted Amount */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            {results.calculationType === InflationCalculatorType.BACKWARD_RATE
              ? "Current Value"
              : "Adjusted Amount"}
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(results.adjustedAmount)}
          </p>
        </div>

        {/* Total Inflation */}
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <h3 className="text-sm font-medium text-orange-800 mb-2">
            Total Inflation
          </h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatPercentage(results.totalInflation)}
          </p>
        </div>

        {/* Annual Rate */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-2">
            {results.calculationType === InflationCalculatorType.CPI_DATA
              ? "Average Annual Rate"
              : "Annual Inflation Rate"}
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatPercentage(results.inflationRate)}
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Purchasing Power Change:</strong>
            <br />
            {results.calculationType ===
            InflationCalculatorType.BACKWARD_RATE ? (
              <>
                What cost {formatCurrency(results.originalAmount)}{" "}
                {results.yearsDifference} years ago would cost{" "}
                {formatCurrency(results.adjustedAmount)} today.
              </>
            ) : (
              <>
                {formatCurrency(results.originalAmount)} has the same purchasing
                power as {formatCurrency(results.adjustedAmount)}
                {results.calculationType ===
                InflationCalculatorType.FORWARD_RATE
                  ? ` in ${results.yearsDifference} years`
                  : " today"}
                .
              </>
            )}
          </div>
          <div>
            <strong>Time Period:</strong>
            <br />
            {results.yearsDifference.toFixed(1)} years
            {results.calculationType === InflationCalculatorType.CPI_DATA &&
              " (based on historical CPI data)"}
          </div>
        </div>
      </div>
    </div>
  );
}
