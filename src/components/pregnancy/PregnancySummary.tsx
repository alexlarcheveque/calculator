import { PregnancyResults } from "@/types/pregnancy";

interface PregnancySummaryProps {
  results: PregnancyResults;
}

export default function PregnancySummary({ results }: PregnancySummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentTrimester = (weeks: number) => {
    if (weeks < 13) return "First Trimester";
    if (weeks < 27) return "Second Trimester";
    return "Third Trimester";
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const timeDiff = results.dueDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pregnancy Analysis
      </h2>

      {/* Main Pregnancy Status */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">
            Current Pregnancy Stage
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {results.currentWeek} weeks, {results.currentDay} days
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {getCurrentTrimester(results.currentWeek)}
          </div>
        </div>
      </div>

      {/* Key Dates */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Important Dates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Due Date</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatDate(results.dueDate)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getDaysRemaining()} days remaining
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Conception Date</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatDate(results.conceptionDate)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Estimated date</div>
          </div>
        </div>
      </div>

      {/* Pregnancy Progress */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Development Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Weeks Completed</div>
            <div className="text-xl font-bold text-gray-900">
              {results.currentWeek} / 40
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((results.currentWeek / 40) * 100)}% complete
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Trimester</div>
            <div className="text-xl font-bold text-gray-900">
              {results.currentWeek < 13
                ? "1st"
                : results.currentWeek < 27
                ? "2nd"
                : "3rd"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getCurrentTrimester(results.currentWeek)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Gestational Age</div>
            <div className="text-xl font-bold text-gray-900">
              {Math.floor(results.totalDays / 7)}w {results.totalDays % 7}d
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {results.totalDays} total days
            </div>
          </div>
        </div>
      </div>

      {/* Current Development */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Development Highlights
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <strong>Baby Size:</strong> Approximately{" "}
              {results.currentWeek < 8
                ? "grape-sized"
                : results.currentWeek < 12
                ? "lime-sized"
                : results.currentWeek < 16
                ? "apple-sized"
                : results.currentWeek < 20
                ? "banana-sized"
                : results.currentWeek < 24
                ? "corn-sized"
                : results.currentWeek < 28
                ? "eggplant-sized"
                : results.currentWeek < 32
                ? "squash-sized"
                : results.currentWeek < 36
                ? "pineapple-sized"
                : "watermelon-sized"}
            </p>
            <p className="mb-2">
              <strong>Key Developments:</strong>{" "}
              {results.currentWeek < 12
                ? "Major organs forming, heartbeat detectable"
                : results.currentWeek < 20
                ? "Baby can move, gender may be visible"
                : results.currentWeek < 28
                ? "Brain development, survival outside womb possible"
                : results.currentWeek < 36
                ? "Lungs maturing, weight gain accelerating"
                : "Baby is full-term, ready for birth"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Note: Development varies for each pregnancy. Consult with your
              healthcare provider for personalized information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
