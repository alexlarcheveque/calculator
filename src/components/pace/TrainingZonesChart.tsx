"use client";

import { PaceResults } from "@/types/pace";

interface TrainingZonesChartProps {
  results: PaceResults;
}

export default function TrainingZonesChart({
  results,
}: TrainingZonesChartProps) {
  // Calculate training zones based on pace
  const calculateTrainingZones = () => {
    if (!results.pace) return null;

    // Extract pace in seconds per mile/km
    const paceMatch = results.pace.match(/(\d+):(\d+)/);
    if (!paceMatch) return null;

    const paceSeconds = parseInt(paceMatch[1]) * 60 + parseInt(paceMatch[2]);

    return [
      {
        name: "Recovery",
        pace: `${Math.floor((paceSeconds * 1.25) / 60)}:${String(
          Math.floor((paceSeconds * 1.25) % 60)
        ).padStart(2, "0")}`,
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
        ).padStart(2, "0")}`,
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
        ).padStart(2, "0")}`,
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
        ).padStart(2, "0")}`,
        description: "95-100% effort",
        color: "bg-red-400",
        textColor: "text-red-800",
        bgColor: "bg-red-50",
        percentage: 97.5,
      },
    ];
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

      <div className="flex-1 space-y-6">
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
