import { InvestmentResults, CalculatorType } from "@/types/investment";
import {
  formatCurrency,
  formatPercentage,
} from "@/utils/investmentCalculations";

interface InvestmentSummaryProps {
  results: InvestmentResults;
  calculatorType: CalculatorType;
  calculatedValue?: number;
}

export default function InvestmentSummary({
  results,
  calculatorType,
  calculatedValue,
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            {/* Show calculated value if not calculating end amount */}
            {calculatorType !== CalculatorType.END_AMOUNT &&
              calculatedValue !== undefined && (
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                    {getCalculatedValueLabel()}
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-gray-900 text-right">
                    {formatCalculatedValue()}
                  </td>
                </tr>
              )}

            {/* End Balance */}
            <tr className="bg-gray-50">
              <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                End Balance
              </td>
              <td className="py-3 px-4 text-sm font-bold text-gray-900 text-right">
                {formatCurrency(results.endBalance)}
              </td>
            </tr>

            {/* Starting Amount */}
            <tr>
              <td className="py-3 px-4 text-sm text-gray-700">
                Starting Amount
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 text-right">
                {formatCurrency(results.startingAmount)}
              </td>
            </tr>

            {/* Total Contributions */}
            <tr>
              <td className="py-3 px-4 text-sm text-gray-700">
                Total Contributions
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 text-right">
                {formatCurrency(results.totalContributions)}
              </td>
            </tr>

            {/* Total Interest */}
            <tr>
              <td className="py-3 px-4 text-sm text-gray-700">
                Total Interest
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 text-right">
                {formatCurrency(results.totalInterest)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Breakdown percentages */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Starting Amount
            </div>
            <div className="text-sm font-medium text-gray-900">
              {((results.startingAmount / results.endBalance) * 100).toFixed(0)}
              %
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Contributions
            </div>
            <div className="text-sm font-medium text-gray-900">
              {(
                (results.totalContributions / results.endBalance) *
                100
              ).toFixed(0)}
              %
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Interest
            </div>
            <div className="text-sm font-medium text-gray-900">
              {((results.totalInterest / results.endBalance) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
