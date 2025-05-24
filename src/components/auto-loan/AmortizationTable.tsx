import {
  AutoLoanMonthlyAmortizationDataPoint,
  AutoLoanYearlyAmortizationDataPoint,
} from "@/types/autoLoan";
import { formatCurrency } from "@/utils/autoLoanCalculations";
import { useState } from "react";

interface AmortizationTableProps {
  monthlyData: AutoLoanMonthlyAmortizationDataPoint[];
  yearlyData: AutoLoanYearlyAmortizationDataPoint[];
  loanTermMonths: number;
}

export default function AmortizationTable({
  monthlyData,
  yearlyData,
  loanTermMonths,
}: AmortizationTableProps) {
  const [scheduleType, setScheduleType] = useState<"annual" | "monthly">(
    "annual"
  );

  if (!monthlyData || !yearlyData || monthlyData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 text-center">
        <p className="text-gray-500">
          Amortization schedule will appear here once calculations are complete.
        </p>
      </div>
    );
  }

  const dataToDisplay = scheduleType === "annual" ? yearlyData : monthlyData;
  const headers =
    scheduleType === "annual"
      ? ["Year", "Interest Paid", "Principal Paid", "Ending Balance"]
      : ["Month", "Interest", "Principal", "Ending Balance"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Amortization Schedule
        </h2>
        <div>
          <button
            onClick={() => setScheduleType("annual")}
            disabled={scheduleType === "annual"}
            className={`px-3 py-1 text-sm rounded-md mr-2 ${
              scheduleType === "annual"
                ? "bg-primary-500 text-white cursor-default"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setScheduleType("monthly")}
            disabled={scheduleType === "monthly"}
            className={`px-3 py-1 text-sm rounded-md ${
              scheduleType === "monthly"
                ? "bg-primary-500 text-white cursor-default"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(dataToDisplay as Array<any>).map((row, index) => (
              <tr
                key={scheduleType === "annual" ? row.year : row.month}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {scheduleType === "annual" ? row.year : row.month}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(row.principal)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(row.endingBalance)}
                </td>
              </tr>
            ))}
            {dataToDisplay.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data to display for the selected schedule.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {scheduleType === "monthly" && loanTermMonths > 12 && (
        <p className="text-xs text-gray-500 mt-2">
          Scroll horizontally to see all months if needed.
        </p>
      )}
    </div>
  );
}
