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

const thClass =
  "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider";
const tdClass = "px-4 py-3 whitespace-nowrap text-sm";

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
      <div className="p-6 rounded-lg shadow-lg bg-card mt-8">
        <p className="text-center text-muted-foreground">
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
    <div className="bg-card p-6 rounded-lg shadow-lg mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-primary">
          Accumulation Schedule
        </h3>
        {hasMonthlyData && yearlyData.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleScheduleTypeChange("yearly")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                ${
                  scheduleType === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              Yearly
            </button>
            <button
              onClick={() => handleScheduleTypeChange("periodic")}
              disabled={!hasMonthlyData} // Disable if only yearly data exists
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                ${
                  scheduleType === "periodic"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50"
                }`}
            >
              {/* Adjust label if periods are not monthly, e.g. "Detailed" */}
              Monthly / Detailed
            </button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className={thClass}>
                {scheduleType === "yearly" ? "Year" : "Period"}
              </th>
              <th className={thClass}>Deposits / Contributions</th>
              <th className={thClass}>Interest Earned</th>
              <th className={thClass}>Ending Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-muted/30 transition-colors duration-150"
              >
                <td className={`${tdClass} text-foreground`}>
                  {scheduleType === "yearly" ? item.year : item.period}
                </td>
                <td className={`${tdClass} text-foreground`}>
                  {formatCurrency(item.deposit)}
                </td>
                <td className={`${tdClass} text-foreground`}>
                  {formatCurrency(item.interest)}
                </td>
                <td className={`${tdClass} text-foreground font-semibold`}>
                  {formatCurrency(item.endingBalance)}
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  No data available for this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
