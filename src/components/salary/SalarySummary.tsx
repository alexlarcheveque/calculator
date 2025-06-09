"use client";

import { SalaryResults } from "@/types/salary";
import {
  formatCurrency,
  formatCurrencyDetailed,
} from "@/utils/salaryCalculations";

interface SalarySummaryProps {
  results: SalaryResults;
}

export default function SalarySummary({ results }: SalarySummaryProps) {
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return formatCurrency(value);
    } else {
      return formatCurrencyDetailed(value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Salary Summary
      </h2>

      {/* Annual Salary Section - Featured */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Annual Salary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Adjusted Annual - Primary */}
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
            <div className="text-sm text-gray-600">Adjusted Annual Salary</div>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(results.adjusted.annual)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Accounting for holidays & vacation days
            </div>
          </div>

          {/* Unadjusted Annual */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-600">
              Unadjusted Annual Salary
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(results.unadjusted.annual)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Without holiday & vacation adjustments
            </div>
          </div>
        </div>
      </div>

      {/* Other Frequencies Table */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-4 text-gray-700 border-b pb-1">
          Other Pay Frequencies
        </h3>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-700"></th>
                <th className="text-center py-3 px-2 font-medium text-gray-700 border-l border-gray-200">
                  Unadjusted
                </th>
                <th className="text-center py-3 px-2 font-medium text-gray-700 border-l border-gray-200">
                  Holidays & vacation days adjusted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">Hourly</td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatValue(results.unadjusted.hourly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatValue(results.adjusted.hourly)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">Daily</td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatValue(results.unadjusted.daily)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatValue(results.adjusted.daily)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">Weekly</td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.unadjusted.weekly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.adjusted.weekly)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">
                  Bi-weekly
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.unadjusted.biWeekly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.adjusted.biWeekly)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700 whitespace-nowrap">
                  Semi-monthly
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.unadjusted.semiMonthly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.adjusted.semiMonthly)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">Monthly</td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.unadjusted.monthly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.adjusted.monthly)}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium text-gray-700">
                  Quarterly
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.unadjusted.quarterly)}
                </td>
                <td className="py-3 px-2 text-right border-l border-gray-200">
                  {formatCurrency(results.adjusted.quarterly)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
