"use client";

import { useState } from "react";
import { PaymentAmortizationDataPoint } from "@/types/payment";
import { formatCurrency } from "@/utils/paymentCalculations";

interface AmortizationTableProps {
  data: PaymentAmortizationDataPoint[];
}

export default function AmortizationTable({ data }: AmortizationTableProps) {
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");
  const [showAllRows, setShowAllRows] = useState(false);

  // Create annual summary data
  const annualData = data.reduce<PaymentAmortizationDataPoint[]>(
    (acc, item) => {
      if (item.isYearEnd || item.paymentNumber === data.length) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  const displayData = viewMode === "annual" ? annualData : data;
  const visibleData = showAllRows ? displayData : displayData.slice(0, 12);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Amortization Schedule
        </h2>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            onClick={() => setViewMode("annual")}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              viewMode === "annual"
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Annual Schedule
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              viewMode === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly Schedule
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                {viewMode === "annual" ? "Year" : "Payment #"}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Interest
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Principal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Ending Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {viewMode === "annual"
                    ? item.year || Math.ceil(item.paymentNumber / 12)
                    : item.paymentNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(
                    viewMode === "annual"
                      ? item.totalInterestPaid -
                          (index > 0
                            ? visibleData[index - 1].totalInterestPaid
                            : 0)
                      : item.interestPayment
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(
                    viewMode === "annual"
                      ? item.totalPrincipalPaid -
                          (index > 0
                            ? visibleData[index - 1].totalPrincipalPaid
                            : 0)
                      : item.principalPayment
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(item.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More/Less Button */}
      {displayData.length > 12 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllRows(!showAllRows)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            {showAllRows
              ? `Show Less (showing all ${displayData.length} ${
                  viewMode === "annual" ? "years" : "payments"
                })`
              : `Show All ${displayData.length} ${
                  viewMode === "annual" ? "years" : "payments"
                }`}
          </button>
        </div>
      )}
    </div>
  );
}
