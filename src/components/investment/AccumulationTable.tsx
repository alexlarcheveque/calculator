import {
  AccumulationDataPoint,
  MonthlyAccumulationDataPoint,
} from "@/types/investment";
import { formatCurrency } from "@/utils/investmentCalculations";
import { useState } from "react";

interface AccumulationTableProps {
  annualData: AccumulationDataPoint[];
  monthlyData: MonthlyAccumulationDataPoint[];
}

export default function AccumulationTable({
  annualData,
  monthlyData,
}: AccumulationTableProps) {
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");

  if (!annualData || annualData.length === 0) {
    return <div className="text-gray-500 text-center">No data available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Accumulation Schedule
        </h2>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("annual")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Annual Schedule
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly Schedule
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {viewMode === "annual" ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  Year
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  Deposit
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  Interest
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  Ending Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {annualData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">
                    {row.year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">
                    {formatCurrency(row.deposit)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">
                    {formatCurrency(row.interest)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm font-medium text-gray-900">
                    {formatCurrency(row.endingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                    Month
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                    Deposit
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                    Interest
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                    Ending Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, index) => {
                  const isYearEnd = row.month === 12;
                  return (
                    <>
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">
                          {row.month}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">
                          {formatCurrency(row.deposit)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(row.endingBalance)}
                        </td>
                      </tr>
                      {isYearEnd && (
                        <tr>
                          <td
                            colSpan={4}
                            className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600 bg-blue-50"
                          >
                            End of year {row.year}
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-500 font-medium">Final Balance</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(
                annualData[annualData.length - 1]?.endingBalance || 0
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-medium">Total Contributions</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(
                annualData[annualData.length - 1]?.totalContributions || 0
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-medium">Total Interest</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(
                annualData[annualData.length - 1]?.totalInterest || 0
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-medium">Investment Period</div>
            <div className="text-lg font-bold text-gray-900">
              {annualData.length} years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
