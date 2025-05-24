"use client";

import { useState } from "react";
import { formatCurrency } from "./InterestPage"; // Assuming formatCurrency is available

// This type should align with the AccumulationData used in InterestPage.tsx calculation
export interface AccumulationData {
  period: number; // Could be month number or year number
  year?: number; // Explicit year number, useful for yearly summaries
  deposit: number; // Contribution for the period (could be initial investment for period 1)
  interest: number; // Interest earned in this period
  endingBalance: number; // Balance at the end of this period
  isYearEnd?: boolean; // Flag to indicate if this row is an end-of-year summary
}

interface AccumulationScheduleTableProps {
  data: AccumulationData[];
  // Potentially add a prop to switch between monthly/yearly view if detailed monthly data is generated
}

export default function AccumulationScheduleTable({
  data,
}: AccumulationScheduleTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleType, setScheduleType] = useState<"yearly" | "periodic">(
    "yearly"
  ); // Default to yearly view

  const itemsPerPage = 12;

  const yearlyData = data.filter((item) => item.isYearEnd);
  const periodicData = data; // This would be all data points (e.g., monthly)

  const currentTableData =
    scheduleType === "yearly" ? yearlyData : periodicData;
  const totalPages = Math.ceil(currentTableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentTableData.slice(startIndex, endIndex);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-500">
          Accumulation schedule data is not available.
        </p>
      </div>
    );
  }

  const hasMonthlyData = data.some(
    (item) => !item.isYearEnd && item.period > 0
  );

  const handleScheduleTypeChange = (type: "yearly" | "periodic") => {
    setScheduleType(type);
    setCurrentPage(1); // Reset to first page on type change
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Accumulation Schedule
        </h3>
        {hasMonthlyData && yearlyData.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleScheduleTypeChange("yearly")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                scheduleType === "yearly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => handleScheduleTypeChange("periodic")}
              disabled={!hasMonthlyData} // Disable if only yearly data exists
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                scheduleType === "periodic"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              }`}
            >
              {/* Adjust label if periods are not monthly, e.g. "Detailed" */}
              Monthly / Detailed
            </button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {scheduleType === "yearly" ? "Year" : "Period"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deposits / Contributions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ending Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {scheduleType === "yearly" ? item.year : item.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.deposit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.endingBalance)}
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  No data available for this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
