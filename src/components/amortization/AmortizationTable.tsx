"use client";

import { useState } from "react";
import { AmortizationScheduleItem } from "@/types/amortization";
import {
  formatCurrencyDetailed,
  formatDate,
} from "@/utils/amortizationCalculations";

interface AmortizationTableProps {
  data: AmortizationScheduleItem[];
}

export default function AmortizationTable({ data }: AmortizationTableProps) {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("yearly");

  // Group data by year for yearly view
  const yearlyData = data.reduce(
    (acc, item) => {
      const year = item.date.getFullYear();
      if (!acc[year]) {
        acc[year] = {
          year,
          totalInterest: 0,
          totalPrincipal: 0,
          totalExtra: 0,
          endingBalance: 0,
          payments: [],
        };
      }

      acc[year].totalInterest += item.interestPayment;
      acc[year].totalPrincipal += item.principalPayment;
      acc[year].totalExtra += item.extraPayment;
      acc[year].endingBalance = item.remainingBalance;
      acc[year].payments.push(item);

      return acc;
    },
    {} as Record<
      number,
      {
        year: number;
        totalInterest: number;
        totalPrincipal: number;
        totalExtra: number;
        endingBalance: number;
        payments: AmortizationScheduleItem[];
      }
    >
  );

  const yearlyArray = Object.values(yearlyData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Amortization Schedule
        </h2>

        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === "yearly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Annual Schedule
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Monthly Schedule
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {viewMode === "yearly" ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  Year
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  Interest
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  Principal
                </th>
                {yearlyArray.some((year) => year.totalExtra > 0) && (
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Extra Payments
                  </th>
                )}
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  Ending Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {yearlyArray.map((yearData) => (
                <tr key={yearData.year} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {yearData.year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {formatCurrencyDetailed(yearData.totalInterest)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {formatCurrencyDetailed(yearData.totalPrincipal)}
                  </td>
                  {yearlyArray.some((year) => year.totalExtra > 0) && (
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {formatCurrencyDetailed(yearData.totalExtra)}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {formatCurrencyDetailed(yearData.endingBalance)}
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
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Month
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Interest
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Principal
                  </th>
                  {data.some((item) => item.extraPayment > 0) && (
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                      Extra Payment
                    </th>
                  )}
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    Ending Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const isYearEnd =
                    index === data.length - 1 ||
                    (index < data.length - 1 &&
                      item.date.getFullYear() !==
                        data[index + 1].date.getFullYear());

                  return (
                    <>
                      <tr key={item.paymentNumber} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {item.paymentNumber}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {formatDate(item.date)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {formatCurrencyDetailed(item.interestPayment)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {formatCurrencyDetailed(item.principalPayment)}
                        </td>
                        {data.some((item) => item.extraPayment > 0) && (
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {item.extraPayment > 0
                              ? formatCurrencyDetailed(item.extraPayment)
                              : "-"}
                          </td>
                        )}
                        <td className="border border-gray-300 px-4 py-2 text-right">
                          {formatCurrencyDetailed(item.remainingBalance)}
                        </td>
                      </tr>
                      {isYearEnd && (
                        <tr className="bg-blue-50">
                          <td
                            colSpan={
                              data.some((item) => item.extraPayment > 0) ? 6 : 5
                            }
                            className="border border-gray-300 px-4 py-2 text-center font-medium text-blue-800"
                          >
                            End of year {item.date.getFullYear()}
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
    </div>
  );
}
