import { PregnancyMilestone } from "@/types/pregnancy";
import { formatShortDate } from "@/utils/pregnancyCalculations";

interface MilestonesTableProps {
  milestones: PregnancyMilestone[];
  currentWeek: number;
}

export default function MilestonesTable({
  milestones,
  currentWeek,
}: MilestonesTableProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "development":
        return "🌱";
      case "appointment":
        return "🏥";
      case "test":
        return "🔬";
      case "preparation":
        return "📋";
      default:
        return "📅";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "development":
        return "bg-green-100 text-green-800";
      case "appointment":
        return "bg-blue-100 text-blue-800";
      case "test":
        return "bg-yellow-100 text-yellow-800";
      case "preparation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRowStyle = (week: number) => {
    if (week === currentWeek) {
      return "bg-blue-50 border-l-4 border-blue-500";
    } else if (week < currentWeek) {
      return "bg-gray-50";
    }
    return "";
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
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milestone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {milestones.map((milestone, index) => (
              <tr
                key={index}
                className={`${getRowStyle(
                  milestone.week
                )} hover:bg-gray-50 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {milestone.week === currentWeek && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Current
                    </span>
                  )}
                  Week {milestone.week}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatShortDate(milestone.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{getTypeIcon(milestone.type)}</span>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        milestone.type
                      )}`}
                    >
                      {milestone.type.charAt(0).toUpperCase() +
                        milestone.type.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {milestone.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {milestone.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Legend:</strong>
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="mr-1">🌱</span>
            <span>Development</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🏥</span>
            <span>Appointment</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🔬</span>
            <span>Test</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📋</span>
            <span>Preparation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
