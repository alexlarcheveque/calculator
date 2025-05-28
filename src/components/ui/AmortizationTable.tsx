"use client";

import { useState } from "react";

export interface AmortizationDataPoint {
  // Common fields that should be present in all data
  paymentNumber?: number;
  month?: number;
  year?: number;

  // Payment fields (different naming across components)
  payment?: number;
  paymentAmount?: number;

  // Principal fields
  principal?: number;
  principalPayment?: number;
  principalPaid?: number;

  // Interest fields
  interest?: number;
  interestPayment?: number;
  interestPaid?: number;

  // Balance fields
  remainingBalance?: number;
  endingBalance?: number;

  // Cumulative fields
  totalInterest?: number;
  totalInterestPaid?: number;
  totalPrincipalPaid?: number;

  // Additional fields
  isYearEnd?: boolean;
  date?: Date;
  extraPayment?: number;
  totalPayment?: number;
}

export interface AmortizationTableProps {
  data: AmortizationDataPoint[];
  formatCurrency: (value: number) => string;
  title?: string;
  showAnnualToggle?: boolean;
  emptyStateMessage?: string;
}

export default function AmortizationTable({
  data,
  formatCurrency,
  title = "Amortization Schedule",
  showAnnualToggle = true,
  emptyStateMessage = "Amortization data is not available.",
}: AmortizationTableProps) {
  const [viewMode, setViewMode] = useState<"annual" | "monthly">("annual");
  const [currentPage, setCurrentPage] = useState(1);

  // Create annual summary data by properly aggregating monthly data
  const annualData = (() => {
    // If data already has year markers, use them
    const existingAnnualData = data.filter(
      (item) => item.isYearEnd || item.year
    );
    if (existingAnnualData.length > 0) {
      return existingAnnualData;
    }

    // Otherwise, aggregate monthly data into annual summaries
    const yearlyAggregates: { [year: number]: AmortizationDataPoint } = {};

    data.forEach((item) => {
      if (!item.paymentNumber) return;

      const year = Math.ceil(item.paymentNumber / 12);

      if (!yearlyAggregates[year]) {
        yearlyAggregates[year] = {
          year,
          paymentNumber: year * 12, // Last payment number of the year
          payment: 0,
          principal: 0,
          principalPayment: 0,
          interest: 0,
          interestPayment: 0,
          remainingBalance: 0,
          totalInterestPaid: 0,
          totalPrincipalPaid: 0,
        };
      }

      const yearData = yearlyAggregates[year];

      // Sum up the payments for the year
      yearData.payment = (yearData.payment || 0) + (item.payment || 0);

      // Sum up principal payments for the year
      const principal =
        item.principal || item.principalPayment || item.principalPaid || 0;
      yearData.principal = (yearData.principal || 0) + principal;
      yearData.principalPayment = yearData.principal;

      // Sum up interest payments for the year
      const interest =
        item.interest || item.interestPayment || item.interestPaid || 0;
      yearData.interest = (yearData.interest || 0) + interest;
      yearData.interestPayment = yearData.interest;

      // Use the last month's values for end-of-year balances
      if (item.paymentNumber % 12 === 0 || item.paymentNumber === data.length) {
        yearData.remainingBalance =
          item.remainingBalance || item.endingBalance || 0;
        yearData.totalInterestPaid =
          item.totalInterestPaid || item.totalInterest || 0;
        yearData.totalPrincipalPaid = item.totalPrincipalPaid || 0;
      }
    });

    return Object.values(yearlyAggregates).sort(
      (a, b) => (a.year || 0) - (b.year || 0)
    );
  })();

  // Use annual data if available and toggle is enabled, otherwise use monthly
  const displayData =
    showAnnualToggle && viewMode === "annual" && annualData.length > 0
      ? annualData
      : data;

  // Pagination
  const itemsPerPage = viewMode === "annual" ? 10 : 12;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = displayData.slice(startIndex, endIndex);

  // Reset to page 1 when switching view modes
  const handleViewModeChange = (mode: "annual" | "monthly") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // Helper functions to get values with fallbacks
  const getPaymentNumber = (item: AmortizationDataPoint) =>
    item.paymentNumber || item.month || item.year || 0;

  const getPaymentAmount = (item: AmortizationDataPoint) =>
    item.payment || item.paymentAmount || 0;

  const getPrincipal = (item: AmortizationDataPoint) =>
    item.principal || item.principalPayment || item.principalPaid || 0;

  const getInterest = (item: AmortizationDataPoint) =>
    item.interest || item.interestPayment || item.interestPaid || 0;

  const getBalance = (item: AmortizationDataPoint) =>
    item.remainingBalance || item.endingBalance || 0;

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-500">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        {/* View Toggle */}
        {showAnnualToggle && annualData.length > 0 && (
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => handleViewModeChange("annual")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                viewMode === "annual"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Annual Schedule
            </button>
            <button
              onClick={() => handleViewModeChange("monthly")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                viewMode === "monthly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Monthly Schedule
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {viewMode === "annual" ? "Year" : "Month"}
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Principal
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => (
              <tr
                key={`${getPaymentNumber(item)}-${index}`}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-center">
                  {viewMode === "annual"
                    ? item.year || Math.ceil(getPaymentNumber(item) / 12)
                    : getPaymentNumber(item)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-center">
                  {formatCurrency(getPrincipal(item))}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-center">
                  {formatCurrency(getInterest(item))}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium text-center">
                  {formatCurrency(getBalance(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
