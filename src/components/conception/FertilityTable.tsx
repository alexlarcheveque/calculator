import { FertilityPeriod } from "@/types/conception";
import { formatShortDate } from "@/utils/conceptionCalculations";

interface FertilityTableProps {
  data: FertilityPeriod[];
}

export default function FertilityTable({ data }: FertilityTableProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        6-Month Fertility Calendar
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cycle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fertility Window Start
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ovulation Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fertility Window End
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date (if conceived)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((cycle, index) => (
              <tr
                key={cycle.cycleNumber}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Cycle {cycle.cycleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatShortDate(cycle.fertilityWindowStart)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                    {formatShortDate(cycle.ovulationDate)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatShortDate(cycle.fertilityWindowEnd)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatShortDate(cycle.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Understanding Your Fertility Calendar
        </h3>
        <div className="text-xs text-blue-700 space-y-1">
          <p>
            • <strong>Fertility Window:</strong> The 6-day period when
            conception is most likely to occur
          </p>
          <p>
            • <strong>Ovulation Date:</strong> The day when the egg is released
            (highlighted in pink)
          </p>
          <p>
            • <strong>Due Date:</strong> Estimated delivery date if conception
            occurs during that cycle
          </p>
          <p>
            • <strong>Best Days for Conception:</strong> 3 days before ovulation
            through ovulation day
          </p>
        </div>
      </div>
    </div>
  );
}
