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

  const getBabySize = (week: number) => {
    // Baby size data based on gestational week (approximate averages)
    const sizeData: {
      [key: number]: {
        length: number;
        lengthCm: number;
        weight: number;
        weightGrams: number;
      };
    } = {
      8: { length: 0.6, lengthCm: 1.6, weight: 0.002, weightGrams: 1 },
      12: { length: 2.1, lengthCm: 5.4, weight: 0.03, weightGrams: 14 },
      16: { length: 4.6, lengthCm: 11.6, weight: 0.22, weightGrams: 100 },
      20: { length: 6.5, lengthCm: 16.4, weight: 0.66, weightGrams: 300 },
      24: { length: 11.8, lengthCm: 30.0, weight: 1.32, weightGrams: 600 },
      28: { length: 14.8, lengthCm: 37.6, weight: 2.2, weightGrams: 1000 },
      32: { length: 16.7, lengthCm: 42.4, weight: 3.75, weightGrams: 1700 },
      36: { length: 18.7, lengthCm: 47.4, weight: 5.78, weightGrams: 2622 },
      40: { length: 20.2, lengthCm: 51.2, weight: 7.63, weightGrams: 3462 },
    };

    // Find the closest week data or interpolate
    const weeks = Object.keys(sizeData)
      .map(Number)
      .sort((a, b) => a - b);

    if (week <= weeks[0]) return sizeData[weeks[0]];
    if (week >= weeks[weeks.length - 1])
      return sizeData[weeks[weeks.length - 1]];

    // Find the two closest weeks for interpolation
    let lowerWeek = weeks[0];
    let upperWeek = weeks[weeks.length - 1];

    for (let i = 0; i < weeks.length - 1; i++) {
      if (week >= weeks[i] && week <= weeks[i + 1]) {
        lowerWeek = weeks[i];
        upperWeek = weeks[i + 1];
        break;
      }
    }

    // Linear interpolation
    const ratio = (week - lowerWeek) / (upperWeek - lowerWeek);
    const lowerData = sizeData[lowerWeek];
    const upperData = sizeData[upperWeek];

    return {
      length: +(
        lowerData.length +
        (upperData.length - lowerData.length) * ratio
      ).toFixed(1),
      lengthCm: +(
        lowerData.lengthCm +
        (upperData.lengthCm - lowerData.lengthCm) * ratio
      ).toFixed(1),
      weight: +(
        lowerData.weight +
        (upperData.weight - lowerData.weight) * ratio
      ).toFixed(2),
      weightGrams: Math.round(
        lowerData.weightGrams +
          (upperData.weightGrams - lowerData.weightGrams) * ratio
      ),
    };
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
            <div className="text-sm text-gray-600 mb-1">Baby Size</div>
            <div className="text-lg font-bold text-gray-900">
              {getBabySize(results.currentWeek).length}" (
              {getBabySize(results.currentWeek).lengthCm} cm)
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {getBabySize(results.currentWeek).weight} lbs (
              {getBabySize(results.currentWeek).weightGrams}g)
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Average at {results.currentWeek} weeks
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
