import { AmortizationResults } from "@/types/amortization";
import {
  formatCurrency,
  formatCurrencyDetailed,
  formatDate,
} from "@/utils/amortizationCalculations";

interface AmortizationSummaryProps {
  results: AmortizationResults;
}

export default function AmortizationSummary({
  results,
}: AmortizationSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          Monthly Payment: {formatCurrencyDetailed(results.monthlyPayment)}
        </h2>

        {/* Pie Chart */}
        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48">
            <svg width="192" height="192" className="transform -rotate-90">
              {/* Principal slice */}
              <path
                d={`M 96 96 L 96 16 A 80 80 0 ${
                  results.principalPercentage > 50 ? 1 : 0
                } 1 ${
                  96 +
                  80 *
                    Math.cos(
                      (results.principalPercentage / 100) * 2 * Math.PI -
                        Math.PI / 2
                    )
                } ${
                  96 +
                  80 *
                    Math.sin(
                      (results.principalPercentage / 100) * 2 * Math.PI -
                        Math.PI / 2
                    )
                } Z`}
                fill="#2b7ddb"
                className="hover:opacity-80 cursor-pointer"
              />

              {/* Interest slice */}
              <path
                d={`M 96 96 L ${
                  96 +
                  80 *
                    Math.cos(
                      (results.principalPercentage / 100) * 2 * Math.PI -
                        Math.PI / 2
                    )
                } ${
                  96 +
                  80 *
                    Math.sin(
                      (results.principalPercentage / 100) * 2 * Math.PI -
                        Math.PI / 2
                    )
                } A 80 80 0 ${
                  results.interestPercentage > 50 ? 1 : 0
                } 1 96 16 Z`}
                fill="#8bbc21"
                className="hover:opacity-80 cursor-pointer"
              />

              {/* Center circle */}
              <circle cx="96" cy="96" r="25" fill="white" />

              {/* Percentage labels */}
              <text
                x={
                  96 +
                  50 *
                    Math.cos(
                      (results.principalPercentage / 200) * 2 * Math.PI -
                        Math.PI / 2
                    )
                }
                y={
                  96 +
                  50 *
                    Math.sin(
                      (results.principalPercentage / 200) * 2 * Math.PI -
                        Math.PI / 2
                    )
                }
                className="fill-white text-sm font-bold"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(90 ${
                  96 +
                  50 *
                    Math.cos(
                      (results.principalPercentage / 200) * 2 * Math.PI -
                        Math.PI / 2
                    )
                } ${
                  96 +
                  50 *
                    Math.sin(
                      (results.principalPercentage / 200) * 2 * Math.PI -
                        Math.PI / 2
                    )
                })`}
              >
                {Math.round(results.principalPercentage)}%
              </text>

              <text
                x={
                  96 +
                  50 *
                    Math.cos(
                      ((results.principalPercentage +
                        results.interestPercentage / 2) /
                        100) *
                        2 *
                        Math.PI -
                        Math.PI / 2
                    )
                }
                y={
                  96 +
                  50 *
                    Math.sin(
                      ((results.principalPercentage +
                        results.interestPercentage / 2) /
                        100) *
                        2 *
                        Math.PI -
                        Math.PI / 2
                    )
                }
                className="fill-white text-sm font-bold"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(90 ${
                  96 +
                  50 *
                    Math.cos(
                      ((results.principalPercentage +
                        results.interestPercentage / 2) /
                        100) *
                        2 *
                        Math.PI -
                        Math.PI / 2
                    )
                } ${
                  96 +
                  50 *
                    Math.sin(
                      ((results.principalPercentage +
                        results.interestPercentage / 2) /
                        100) *
                        2 *
                        Math.PI -
                        Math.PI / 2
                    )
                })`}
              >
                {Math.round(results.interestPercentage)}%
              </text>
            </svg>

            {/* Legend */}
            <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Principal</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-gray-700">
                Total of {results.totalPayments} monthly payments
              </td>
              <td className="py-2 text-right font-semibold">
                {formatCurrency(results.totalAmount)}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-gray-700">Total interest</td>
              <td className="py-2 text-right font-semibold">
                {formatCurrency(results.totalInterest)}
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-gray-700">Payoff date</td>
              <td className="py-2 text-right font-semibold">
                {formatDate(results.payoffDate)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
