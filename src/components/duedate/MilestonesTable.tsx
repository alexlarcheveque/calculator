import { PregnancyMilestone } from "@/types/dueDate";
import { formatShortDate } from "@/utils/dueDateCalculations";

interface MilestonesTableProps {
  milestones: PregnancyMilestone[];
}

export default function MilestonesTable({ milestones }: MilestonesTableProps) {
  const today = new Date();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "trimester":
        return "bg-blue-100 text-blue-800";
      case "development":
        return "bg-green-100 text-green-800";
      case "medical":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isUpcoming = (date: Date) => date > today;
  const isPast = (date: Date) => date < today;
  const isToday = (date: Date) => {
    const todayStr = today.toDateString();
    const dateStr = date.toDateString();
    return todayStr === dateStr;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pregnancy Milestones
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milestone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {milestones.map((milestone, index) => (
              <tr
                key={index}
                className={`
                  ${
                    isToday(milestone.date)
                      ? "bg-yellow-50 border-l-4 border-yellow-400"
                      : ""
                  }
                  ${isPast(milestone.date) ? "opacity-75" : ""}
                  hover:bg-gray-50
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {milestone.week}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatShortDate(milestone.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {milestone.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                      milestone.category
                    )}`}
                  >
                    {milestone.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isToday(milestone.date) && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Today
                    </span>
                  )}
                  {isPast(milestone.date) && !isToday(milestone.date) && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Completed
                    </span>
                  )}
                  {isUpcoming(milestone.date) && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Upcoming
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Trimester</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Development</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
          <span>Medical</span>
        </div>
      </div>
    </div>
  );
}
