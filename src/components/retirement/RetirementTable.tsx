"use client";

import { RetirementResults } from "@/types/retirement";
import { formatCurrency } from "@/utils/formatters";

interface RetirementTableProps {
  results: RetirementResults;
}

interface TableItem {
  label: string;
  value: string;
  highlight?: boolean;
  isPositive?: boolean;
}

interface TableSection {
  category: string;
  items: TableItem[];
}

export default function RetirementTable({ results }: RetirementTableProps) {
  const tableData: TableSection[] = [
    {
      category: "Timeline",
      items: [
        {
          label: "Years to Retirement",
          value: `${results.yearsToRetirement} years`,
        },
        {
          label: "Years in Retirement",
          value: `${results.yearsInRetirement} years`,
        },
      ],
    },
    {
      category: "Income & Needs",
      items: [
        {
          label: "Income Needed at Retirement",
          value: formatCurrency(results.incomeNeededAtRetirement),
        },
        {
          label: "Total Needed at Retirement",
          value: formatCurrency(results.totalNeededAtRetirement),
        },
      ],
    },
    {
      category: "Savings & Projections",
      items: [
        {
          label: "Projected Savings at Retirement",
          value: formatCurrency(results.projectedSavingsAtRetirement),
        },
        {
          label: "Total Contributions by Retirement",
          value: formatCurrency(results.totalContributionsByRetirement),
        },
        {
          label: "Final Retirement Savings",
          value: formatCurrency(results.finalRetirementSavings),
        },
      ],
    },
    {
      category: "Shortfall/Surplus Analysis",
      items: [
        {
          label: results.shortfallOrSurplus >= 0 ? "Surplus" : "Shortfall",
          value: formatCurrency(Math.abs(results.shortfallOrSurplus)),
          highlight: true,
          isPositive: results.shortfallOrSurplus >= 0,
        },
        {
          label: "Additional Monthly Savings Needed",
          value:
            results.monthlyAdditionalSavingsNeeded > 0
              ? formatCurrency(results.monthlyAdditionalSavingsNeeded)
              : "None required",
          highlight: results.monthlyAdditionalSavingsNeeded > 0,
        },
      ],
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">
        Detailed Retirement Analysis
      </h3>

      <div className="space-y-6">
        {tableData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h4 className="text-md font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">
              {section.category}
            </h4>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex justify-between items-center py-2 px-3 rounded ${
                    item.highlight
                      ? item.isPositive
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      item.highlight
                        ? item.isPositive
                          ? "text-green-700"
                          : "text-red-700"
                        : "text-gray-800"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          {results.shortfallOrSurplus >= 0 ? (
            <div className="text-green-700">
              <p className="text-sm font-medium">
                ✓ You're on track for retirement!
              </p>
              <p className="text-xs mt-1">
                Your projected savings exceed your retirement needs by{" "}
                {formatCurrency(results.shortfallOrSurplus)}.
              </p>
            </div>
          ) : (
            <div className="text-red-700">
              <p className="text-sm font-medium">
                ⚠ Additional savings required
              </p>
              <p className="text-xs mt-1">
                Save an additional{" "}
                {formatCurrency(results.monthlyAdditionalSavingsNeeded)} per
                month to meet your retirement goals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
