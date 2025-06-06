import {
  InvestmentResults,
  CalculatorType,
  ContributionFrequency,
} from "@/types/investment";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/investmentCalculations";

interface InvestmentSummaryProps {
  results: InvestmentResults;
  calculatorType: CalculatorType;
  calculatedValue?: number;
  contributionFrequency?: ContributionFrequency;
}

export default function InvestmentSummary({
  results,
  calculatorType,
  calculatedValue,
  contributionFrequency = ContributionFrequency.MONTHLY,
}: InvestmentSummaryProps) {
  const getCalculatedValueLabel = (): string => {
    switch (calculatorType) {
      case CalculatorType.STARTING_AMOUNT:
        return "Required Starting Amount";
      case CalculatorType.RETURN_RATE:
        return "Required Return Rate";
      case CalculatorType.INVESTMENT_LENGTH:
        return "Required Investment Length";
      case CalculatorType.ADDITIONAL_CONTRIBUTION:
        return "Required Additional Contribution";
      default:
        return "";
    }
  };

  const formatCalculatedValue = (): string => {
    if (calculatedValue === undefined) return "";

    switch (calculatorType) {
      case CalculatorType.STARTING_AMOUNT:
      case CalculatorType.ADDITIONAL_CONTRIBUTION:
        return formatCurrency(calculatedValue);
      case CalculatorType.RETURN_RATE:
        return formatPercentage(calculatedValue);
      case CalculatorType.INVESTMENT_LENGTH:
        return `${calculatedValue.toFixed(1)} years`;
      default:
        return "";
    }
  };

  const getCalculatedValueDescription = (): string => {
    switch (calculatorType) {
      case CalculatorType.STARTING_AMOUNT:
        return "Initial investment needed to reach your target";
      case CalculatorType.RETURN_RATE:
        return "Annual return rate needed to reach your target";
      case CalculatorType.INVESTMENT_LENGTH:
        return "Time needed to reach your target amount";
      case CalculatorType.ADDITIONAL_CONTRIBUTION:
        const frequency =
          contributionFrequency === ContributionFrequency.MONTHLY
            ? "Monthly"
            : "Annual";
        return `${frequency} contribution needed to reach your target`;
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Investment Results
        </h2>
      </div>

      {/* Main Results Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Investment Outcome
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Show calculated value if not calculating end amount */}
          {calculatorType !== CalculatorType.END_AMOUNT &&
            calculatedValue !== undefined && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-gray-600">
                  {getCalculatedValueLabel()}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCalculatedValue()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getCalculatedValueDescription()}
                </div>
              </div>
            )}

          {/* End Balance - Main Result */}
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <div className="text-sm text-gray-600">Final Balance</div>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(results.endBalance)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Total value at the end of investment period
            </div>
          </div>
        </div>
      </div>

      {/* Investment Breakdown Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Investment Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Starting Amount */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Starting Amount</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.startingAmount)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Initial investment</div>
          </div>

          {/* Total Contributions */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Total Contributions</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalContributions)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Additional money invested over time
            </div>
          </div>

          {/* Total Interest */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">Interest Earned</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Growth from compound interest
            </div>
          </div>
        </div>
      </div>

      {/* Composition Breakdown Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Portfolio Composition
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <div className="text-sm text-gray-600">Starting Amount</div>
            <div className="text-xl font-bold text-blue-600">
              {((results.startingAmount / results.endBalance) * 100).toFixed(0)}
              %
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatCurrency(results.startingAmount)}
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <div className="text-sm text-gray-600">Contributions</div>
            <div className="text-xl font-bold text-emerald-600">
              {(
                (results.totalContributions / results.endBalance) *
                100
              ).toFixed(0)}
              %
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatCurrency(results.totalContributions)}
            </div>
          </div>

          <div className="bg-violet-50 p-4 rounded-lg border border-violet-100 text-center">
            <div className="text-sm text-gray-600">Interest</div>
            <div className="text-xl font-bold text-violet-600">
              {((results.totalInterest / results.endBalance) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatCurrency(results.totalInterest)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
