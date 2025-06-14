import { ConceptionResults } from "@/types/conception";
import { formatDate, formatShortDate } from "@/utils/conceptionCalculations";

interface ConceptionSummaryProps {
  results: ConceptionResults;
}

export default function ConceptionSummary({ results }: ConceptionSummaryProps) {
  const getDaysUntilOvulation = () => {
    const today = new Date();
    const timeDiff = results.ovulationDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days;
  };

  const getFertilityStatus = () => {
    const today = new Date();
    const isInFertileWindow =
      today >= results.fertilityWindowStart &&
      today <= results.fertilityWindowEnd;
    const isOvulationDay =
      today.toDateString() === results.ovulationDate.toDateString();

    if (isOvulationDay) return "Ovulation Day";
    if (isInFertileWindow) return "Fertile Window Active";

    const daysUntilOvulation = getDaysUntilOvulation();
    if (daysUntilOvulation > 0)
      return `Ovulation in ${daysUntilOvulation} days`;

    return "Outside fertile window";
  };

  const getBestConceptionDays = () => {
    // Best conception days are typically 2-3 days before ovulation through ovulation day
    const bestStart = new Date(results.ovulationDate);
    bestStart.setDate(bestStart.getDate() - 2);

    return {
      start: bestStart,
      end: results.ovulationDate,
    };
  };

  const getActionableAdvice = () => {
    const today = new Date();
    const daysUntilOvulation = getDaysUntilOvulation();
    const isInFertileWindow =
      today >= results.fertilityWindowStart &&
      today <= results.fertilityWindowEnd;
    const isOvulationDay =
      today.toDateString() === results.ovulationDate.toDateString();

    if (isOvulationDay) {
      return "Today is ovulation day! This is your most fertile day.";
    }

    if (isInFertileWindow) {
      return "You're in your fertile window. Focus on timing for the next few days.";
    }

    if (daysUntilOvulation > 0 && daysUntilOvulation <= 5) {
      return `Your fertile window starts soon. Begin timing intercourse in ${Math.max(
        0,
        daysUntilOvulation - 3
      )} days.`;
    }

    return "Track your cycle and prepare for your next fertile window.";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Fertility Analysis
      </h2>

      {/* 1. Current Status (Hero Section) */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Current Status</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {getFertilityStatus()}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {getActionableAdvice()}
          </div>
        </div>
      </div>

      {/* 2. This Cycle (Most Important) */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          This Cycle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Ovulation Date</div>
            <div className="text-xl font-bold text-gray-900">
              {formatShortDate(results.ovulationDate)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getDaysUntilOvulation() > 0
                ? `${getDaysUntilOvulation()} days away`
                : getDaysUntilOvulation() === 0
                ? "Today!"
                : `${Math.abs(getDaysUntilOvulation())} days ago`}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Fertile Window</div>
            <div className="text-lg font-bold text-gray-900">
              {formatShortDate(results.fertilityWindowStart)} -{" "}
              {formatShortDate(results.fertilityWindowEnd)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Best day to try: {formatShortDate(getBestConceptionDays().start)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. If Conception Occurs */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          If Conception Occurs
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Estimated Due Date</div>
          <div className="text-xl font-bold text-gray-900">
            {formatShortDate(results.dueDate)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Take pregnancy test:{" "}
            {formatShortDate(
              new Date(
                results.fertilityWindowEnd.getTime() + 14 * 24 * 60 * 60 * 1000
              )
            )}
          </div>
        </div>
      </div>

      {/* 4. Recommendations */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Recommendations
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <strong>Optimal Timing:</strong> Have intercourse every other day
              during your fertile window, with focus on the 2-3 days before and
              including ovulation.
            </p>
            <p className="mb-2">
              <strong>Best Strategy:</strong> Start timing 2-3 days before your
              fertile window begins to ensure sperm are present when ovulation
              occurs.
            </p>
            <p className="mb-2">
              <strong>Track Signs:</strong> Monitor cervical mucus, basal body
              temperature, or use ovulation predictor kits for more precise
              timing.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Remember: These are estimates based on average cycles. Individual
              patterns may vary. Consult your healthcare provider for
              personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
