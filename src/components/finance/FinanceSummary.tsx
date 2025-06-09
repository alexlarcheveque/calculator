import { FinanceResults, CalculationType } from "@/types/finance";
import {
  formatCurrencyDetailed,
  formatNumber,
} from "@/utils/financeCalculations";

interface FinanceSummaryProps {
  results: FinanceResults;
  calculationType: CalculationType;
}

export default function FinanceSummary({
  results,
  calculationType,
}: FinanceSummaryProps) {
  // Check if the scenario is impossible (contains NaN values)
  const isImpossibleScenario =
    !isFinite(results.calculatedValue) ||
    isNaN(results.calculatedValue) ||
    !isFinite(results.sumOfPayments) ||
    isNaN(results.sumOfPayments);

  const getCalculatedValueLabel = () => {
    switch (calculationType) {
      case CalculationType.FV:
        return "FV";
      case CalculationType.PV:
        return "PV";
      case CalculationType.PMT:
        return "PMT";
      case CalculationType.N:
        return "N";
      case CalculationType.IY:
        return "I/Y";
      default:
        return "Result";
    }
  };

  const formatCalculatedValue = () => {
    if (isImpossibleScenario) {
      return "No Solution";
    }

    switch (calculationType) {
      case CalculationType.FV:
      case CalculationType.PV:
      case CalculationType.PMT:
        return formatCurrencyDetailed(results.calculatedValue);
      case CalculationType.N:
        return formatNumber(results.calculatedValue, 2);
      case CalculationType.IY:
        return `${formatNumber(results.calculatedValue, 2)}%`;
      default:
        return formatNumber(results.calculatedValue, 2);
    }
  };

  const getValueColor = () => {
    if (isImpossibleScenario) {
      return "text-red-600";
    }
    if (
      calculationType === CalculationType.N ||
      calculationType === CalculationType.IY
    ) {
      return "text-blue-600";
    }
    return results.calculatedValue >= 0 ? "text-green-600" : "text-red-600";
  };

  if (isImpossibleScenario) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        </div>

        {/* Error Message */}
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">
              Impossible Financial Scenario
            </h3>
          </div>
          <p className="text-red-700 mb-2">
            This combination of values creates a mathematically impossible
            financial scenario.
          </p>
          <div className="text-sm text-red-600">
            <p className="mb-1">
              <strong>Common causes:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Payments too small to cover interest charges</li>
              <li>Interest rate too high relative to payment amounts</li>
              <li>Conflicting cash flow directions</li>
              <li>Unrealistic time periods or amounts</li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <strong>Suggestion:</strong> Try adjusting your inputs, such as:
          </p>
          <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
            <li>Increasing the payment amount</li>
            <li>Decreasing the interest rate</li>
            <li>Adjusting the present or future value</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          title="Save this calculation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Main Result */}
      <div className="mb-6">
        <p className="text-2xl font-bold">
          {getCalculatedValueLabel()} ={" "}
          <span className={`${getValueColor()}`}>
            {formatCalculatedValue()}
          </span>
        </p>
      </div>

      {/* Summary Table */}
      <div className="space-y-2">
        <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
          <span className="text-gray-700">Sum of all periodic payments</span>
          <span className="font-medium">
            {formatCurrencyDetailed(results.sumOfPayments)}
          </span>
        </div>
        <div className="flex justify-between py-2 px-4 bg-gray-50 rounded">
          <span className="text-gray-700">Total Interest</span>
          <span className="font-medium">
            {formatCurrencyDetailed(results.totalInterest)}
          </span>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Calculation Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Present Value:</span>
            <div className="font-medium">
              {formatCurrencyDetailed(results.presentValue)}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Future Value:</span>
            <div className="font-medium">
              {formatCurrencyDetailed(results.futureValue)}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Periodic Payment:</span>
            <div className="font-medium">
              {formatCurrencyDetailed(results.periodicPayment)}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Number of Periods:</span>
            <div className="font-medium">
              {formatNumber(results.numberOfPeriods, 2)}
            </div>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Interest Rate per Year:</span>
            <div className="font-medium">
              {formatNumber(results.interestPerYear, 2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
