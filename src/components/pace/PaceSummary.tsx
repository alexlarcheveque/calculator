import React from "react";
import { PaceResults } from "@/types/pace";

interface PaceSummaryProps {
  results: PaceResults;
  calculationType: string;
}

export default function PaceSummary({
  results,
  calculationType,
}: PaceSummaryProps) {
  if (!results.calculatedValue) {
    return null;
  }

  // Calculate training zones based on pace (rough estimates)
  const calculateTrainingZones = () => {
    if (!results.pace) return null;

    // Extract pace in seconds per mile/km
    const paceMatch = results.pace.match(/(\d+):(\d+)/);
    if (!paceMatch) return null;

    const paceSeconds = parseInt(paceMatch[1]) * 60 + parseInt(paceMatch[2]);

    return {
      easy: `${Math.floor((paceSeconds * 1.15) / 60)}:${String(
        Math.floor((paceSeconds * 1.15) % 60)
      ).padStart(2, "0")}`,
      tempo: `${Math.floor((paceSeconds * 0.95) / 60)}:${String(
        Math.floor((paceSeconds * 0.95) % 60)
      ).padStart(2, "0")}`,
      interval: `${Math.floor((paceSeconds * 0.85) / 60)}:${String(
        Math.floor((paceSeconds * 0.85) % 60)
      ).padStart(2, "0")}`,
      recovery: `${Math.floor((paceSeconds * 1.25) / 60)}:${String(
        Math.floor((paceSeconds * 1.25) % 60)
      ).padStart(2, "0")}`,
    };
  };

  const trainingZones = calculateTrainingZones();

  const getPerformanceLevel = () => {
    if (!results.pace) return "Unknown";

    const paceMatch = results.pace.match(/(\d+):(\d+)/);
    if (!paceMatch) return "Unknown";

    const paceSeconds = parseInt(paceMatch[1]) * 60 + parseInt(paceMatch[2]);

    // Rough performance categories for running pace per mile
    if (paceSeconds < 360) return "Elite"; // < 6:00
    if (paceSeconds < 420) return "Competitive"; // < 7:00
    if (paceSeconds < 480) return "Advanced"; // < 8:00
    if (paceSeconds < 540) return "Intermediate"; // < 9:00
    if (paceSeconds < 600) return "Recreational"; // < 10:00
    return "Beginner"; // > 10:00
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pace Analysis
      </h2>

      {/* Main Result */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">
            Calculated {calculationType}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {results.calculatedValue}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {getPerformanceLevel()} Level
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.pace && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Pace</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.pace}
              </div>
              <div className="text-xs text-gray-500 mt-1">Per mile/km</div>
            </div>
          )}

          {results.speed && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Speed</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.speed}
              </div>
              <div className="text-xs text-gray-500 mt-1">Average velocity</div>
            </div>
          )}

          {results.timeFormatted && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Time</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.timeFormatted}
              </div>
              <div className="text-xs text-gray-500 mt-1">Duration</div>
            </div>
          )}

          {results.distanceFormatted && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Distance</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.distanceFormatted}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total distance</div>
            </div>
          )}
        </div>
      </div>

      {/* Training Zones */}
      {trainingZones && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Training Zones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Easy Run</div>
              <div className="text-lg font-bold text-gray-900">
                {trainingZones.easy}
              </div>
              <div className="text-xs text-gray-500 mt-1">70-80% effort</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Tempo</div>
              <div className="text-lg font-bold text-gray-900">
                {trainingZones.tempo}
              </div>
              <div className="text-xs text-gray-500 mt-1">85-90% effort</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Interval</div>
              <div className="text-lg font-bold text-gray-900">
                {trainingZones.interval}
              </div>
              <div className="text-xs text-gray-500 mt-1">95-100% effort</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Recovery</div>
              <div className="text-lg font-bold text-gray-900">
                {trainingZones.recovery}
              </div>
              <div className="text-xs text-gray-500 mt-1">60-70% effort</div>
            </div>
          </div>
        </div>
      )}

      {/* Split Times */}
      {results.splits && results.splits.length > 0 && (
        <div>
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Split Analysis
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              <div className="bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
                Distance
              </div>
              <div className="bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
                Split Time
              </div>
              {results.splits.map((split, index) => (
                <React.Fragment key={index}>
                  <div className="bg-white px-4 py-3 text-sm text-gray-800">
                    {split.distance}
                  </div>
                  <div className="bg-white px-4 py-3 text-sm text-gray-800 font-mono font-medium">
                    {split.time}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
