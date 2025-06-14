"use client";

import { PaceResults, PaceFormValues, PaceUnit } from "@/types/pace";

interface TrainingZonesChartProps {
  results: PaceResults;
  formValues: PaceFormValues;
}

export default function TrainingZonesChart({
  results,
  formValues,
}: TrainingZonesChartProps) {
  // Get the appropriate pace unit suffix
  const getPaceUnitSuffix = () => {
    switch (formValues.paceUnit) {
      case PaceUnit.TIME_PER_MILE:
        return "/mile";
      case PaceUnit.TIME_PER_KILOMETER:
        return "/km";
      case PaceUnit.MILES_PER_HOUR:
        return " mph";
      case PaceUnit.KILOMETERS_PER_HOUR:
        return " kph";
      default:
        return "";
    }
  };

  // Calculate training zones based on pace
  const calculateTrainingZones = () => {
    if (!results.pace) return null;

    const unitSuffix = getPaceUnitSuffix();

    // Handle different pace unit types
    if (
      formValues.paceUnit === PaceUnit.TIME_PER_MILE ||
      formValues.paceUnit === PaceUnit.TIME_PER_KILOMETER
    ) {
      // Time-based pace (MM:SS format)
      const paceMatch = results.pace.match(/(\d+):(\d+)/);
      if (!paceMatch) return null;

      const paceSeconds = parseInt(paceMatch[1]) * 60 + parseInt(paceMatch[2]);

      return [
        {
          name: "Recovery",
          pace: `${Math.floor((paceSeconds * 1.25) / 60)}:${String(
            Math.floor((paceSeconds * 1.25) % 60)
          ).padStart(2, "0")}${unitSuffix}`,
          description: "60-70% effort",
          color: "bg-blue-400",
          textColor: "text-blue-800",
          bgColor: "bg-blue-50",
          percentage: 60,
        },
        {
          name: "Easy Run",
          pace: `${Math.floor((paceSeconds * 1.15) / 60)}:${String(
            Math.floor((paceSeconds * 1.15) % 60)
          ).padStart(2, "0")}${unitSuffix}`,
          description: "70-80% effort",
          color: "bg-green-400",
          textColor: "text-green-800",
          bgColor: "bg-green-50",
          percentage: 75,
        },
        {
          name: "Tempo",
          pace: `${Math.floor((paceSeconds * 0.95) / 60)}:${String(
            Math.floor((paceSeconds * 0.95) % 60)
          ).padStart(2, "0")}${unitSuffix}`,
          description: "85-90% effort",
          color: "bg-yellow-400",
          textColor: "text-yellow-800",
          bgColor: "bg-yellow-50",
          percentage: 87.5,
        },
        {
          name: "Interval",
          pace: `${Math.floor((paceSeconds * 0.85) / 60)}:${String(
            Math.floor((paceSeconds * 0.85) % 60)
          ).padStart(2, "0")}${unitSuffix}`,
          description: "95-100% effort",
          color: "bg-red-400",
          textColor: "text-red-800",
          bgColor: "bg-red-50",
          percentage: 97.5,
        },
      ];
    } else if (
      formValues.paceUnit === PaceUnit.MILES_PER_HOUR ||
      formValues.paceUnit === PaceUnit.KILOMETERS_PER_HOUR
    ) {
      // Speed-based pace (numeric format like mph, kph, m/min, yd/min)
      const currentSpeed = parseFloat(results.pace);
      if (isNaN(currentSpeed)) return null;

      return [
        {
          name: "Recovery",
          pace: `${(currentSpeed * 0.8).toFixed(1)}${unitSuffix}`,
          description: "60-70% effort",
          color: "bg-blue-400",
          textColor: "text-blue-800",
          bgColor: "bg-blue-50",
          percentage: 60,
        },
        {
          name: "Easy Run",
          pace: `${(currentSpeed * 0.87).toFixed(1)}${unitSuffix}`,
          description: "70-80% effort",
          color: "bg-green-400",
          textColor: "text-green-800",
          bgColor: "bg-green-50",
          percentage: 75,
        },
        {
          name: "Tempo",
          pace: `${(currentSpeed * 1.05).toFixed(1)}${unitSuffix}`,
          description: "85-90% effort",
          color: "bg-yellow-400",
          textColor: "text-yellow-800",
          bgColor: "bg-yellow-50",
          percentage: 87.5,
        },
        {
          name: "Interval",
          pace: `${(currentSpeed * 1.18).toFixed(1)}${unitSuffix}`,
          description: "95-100% effort",
          color: "bg-red-400",
          textColor: "text-red-800",
          bgColor: "bg-red-50",
          percentage: 97.5,
        },
      ];
    } else {
      // Fallback for unsupported pace units
      return null;
    }
  };

  const trainingZones = calculateTrainingZones();

  if (!trainingZones) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Training zones will be calculated based on your pace data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Training Zone Paces
        </h3>
        <p className="text-sm text-gray-600">
          Based on your current pace: {results.pace}
        </p>
      </div>

      <div className="flex-1 space-y-6 h-96">
        {trainingZones.map((zone, index) => (
          <div
            key={zone.name}
            className={`${zone.bgColor} p-4 rounded-lg border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className={`font-semibold ${zone.textColor}`}>
                  {zone.name}
                </h4>
                <p className="text-sm text-gray-600">{zone.description}</p>
              </div>
              <div className={`text-xl font-bold ${zone.textColor}`}>
                {zone.pace}
              </div>
            </div>

            {/* Visual intensity bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${zone.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${zone.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low Intensity</span>
              <span className="font-medium">{zone.percentage}% Max Effort</span>
              <span>High Intensity</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Training zones are estimates based on your current pace. Adjust based
          on feel, heart rate, and individual fitness level.
        </p>
      </div>
    </div>
  );
}
