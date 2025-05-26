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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Result</h2>
        <div className="text-sm text-gray-500">
          <svg
            className="w-5 h-5 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Save this calculation
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
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
              <td className="py-3 px-2 font-medium text-gray-700">Bi-weekly</td>
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
              <td className="py-3 px-2 font-medium text-gray-700">Quarterly</td>
              <td className="py-3 px-2 text-right border-l border-gray-200">
                {formatCurrency(results.unadjusted.quarterly)}
              </td>
              <td className="py-3 px-2 text-right border-l border-gray-200">
                {formatCurrency(results.adjusted.quarterly)}
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-2 font-medium text-gray-700">Annual</td>
              <td className="py-3 px-2 text-right border-l border-gray-200">
                {formatCurrency(results.unadjusted.annual)}
              </td>
              <td className="py-3 px-2 text-right border-l border-gray-200">
                {formatCurrency(results.adjusted.annual)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700 leading-relaxed">
          This salary calculator assumes the hourly and daily salary inputs to
          be unadjusted values. All other pay frequency inputs are assumed to be
          holidays and vacation days adjusted values. This calculator also
          assumes 52 working weeks or {results.workingDaysPerYear} weekdays per
          year in its calculations. The unadjusted results ignore the holidays
          and paid vacation days.
        </p>
      </div>
    </div>
  );
}
