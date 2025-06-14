import React from "react";
import {
  PaceResults,
  PaceFormValues,
  DistanceUnit,
  PaceUnit,
} from "@/types/pace";

interface PaceSummaryProps {
  results: PaceResults;
  calculationType: string;
  formValues: PaceFormValues;
}

export default function PaceSummary({
  results,
  calculationType,
  formValues,
}: PaceSummaryProps) {
  if (!results.calculatedValue) {
    return null;
  }

  // Convert any pace to minutes per mile for simpler calculations
  const getPaceInMinutesPerMile = (): number | null => {
    if (!results.pace) return null;

    // Handle time-based pace units - extract just the time part before " per"
    if (formValues.paceUnit === PaceUnit.TIME_PER_MILE) {
      const timeStr = results.pace.split(" per")[0]; // Remove " per mile" suffix
      // Try HH:MM:SS format first
      let paceMatch = timeStr.match(/(\d+):(\d+):(\d+)/);
      if (paceMatch) {
        const hours = parseInt(paceMatch[1]);
        const minutes = parseInt(paceMatch[2]);
        const seconds = parseInt(paceMatch[3]);
        return hours * 60 + minutes + seconds / 60;
      }
      // Try MM:SS format
      paceMatch = timeStr.match(/(\d+):(\d+)/);
      if (paceMatch) {
        const minutes = parseInt(paceMatch[1]);
        const seconds = parseInt(paceMatch[2]);
        return minutes + seconds / 60;
      }
      return null;
    }

    if (formValues.paceUnit === PaceUnit.TIME_PER_KILOMETER) {
      const timeStr = results.pace.split(" per")[0]; // Remove " per km" suffix
      // Try HH:MM:SS format first
      let paceMatch = timeStr.match(/(\d+):(\d+):(\d+)/);
      if (paceMatch) {
        const hours = parseInt(paceMatch[1]);
        const minutes = parseInt(paceMatch[2]);
        const seconds = parseInt(paceMatch[3]);
        const minutesPerKm = hours * 60 + minutes + seconds / 60;
        return minutesPerKm * 1.609344; // Convert km pace to mile pace
      }
      // Try MM:SS format
      paceMatch = timeStr.match(/(\d+):(\d+)/);
      if (paceMatch) {
        const minutes = parseInt(paceMatch[1]);
        const seconds = parseInt(paceMatch[2]);
        const minutesPerKm = minutes + seconds / 60;
        return minutesPerKm * 1.609344; // Convert km pace to mile pace
      }
      return null;
    }

    // Handle speed-based pace units (numeric format)
    const speed = parseFloat(results.pace);
    if (isNaN(speed)) return null;

    switch (formValues.paceUnit) {
      case PaceUnit.MILES_PER_HOUR:
        // Convert mph to min/mile: 60 min/hr / mph
        return 60 / speed;
      case PaceUnit.KILOMETERS_PER_HOUR:
        // Convert kph to min/mile: (60 min/hr / kph) * 1.609344
        return (60 / speed) * 1.609344;
      default:
        return null;
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const paceMinutesPerMile = getPaceInMinutesPerMile();

  const getPaceUnitLabel = () => {
    switch (formValues.paceUnit) {
      case PaceUnit.TIME_PER_MILE:
        return "per mile";
      case PaceUnit.TIME_PER_KILOMETER:
        return "per km";
      case PaceUnit.MILES_PER_HOUR:
        return "mph";
      case PaceUnit.KILOMETERS_PER_HOUR:
        return "kph";
      default:
        return "";
    }
  };

  const isMetric = formValues.distanceUnit === DistanceUnit.KILOMETERS;

  // Calculate popular race distances based on current unit system
  const getPopularRaceDistances = () => {
    if (!paceMinutesPerMile) return null;

    if (isMetric) {
      // Convert to minutes per km for calculations
      const paceMinutesPerKm = paceMinutesPerMile / 1.609344;
      const distances = [
        { name: "1K", km: 1 },
        { name: "5K", km: 5 },
        { name: "10K", km: 10 },
        { name: "Half Marathon", km: 21.1 },
        { name: "Marathon", km: 42.2 },
      ];

      return distances.map((distance) => ({
        name: distance.name,
        time: formatTime(distance.km * paceMinutesPerKm * 60), // Convert to seconds for formatTime
      }));
    } else {
      const distances = [
        { name: "1 Mile", miles: 1 },
        { name: "5 Miles", miles: 5 },
        { name: "10 Miles", miles: 10 },
        { name: "Half Marathon", miles: 13.1 },
        { name: "Marathon", miles: 26.2 },
      ];

      return distances.map((distance) => ({
        name: distance.name,
        time: formatTime(distance.miles * paceMinutesPerMile * 60), // Convert to seconds for formatTime
      }));
    }
  };

  // Calculate cumulative splits based on current unit system
  const getCumulativeSplits = () => {
    if (!paceMinutesPerMile) return null;

    if (isMetric) {
      // Kilometer splits (1K increments up to 8K)
      const paceMinutesPerKm = paceMinutesPerMile / 1.609344;
      const splits = [];
      for (let i = 1; i <= 8; i++) {
        splits.push({
          distance: `${i}K`,
          time: formatTime(i * paceMinutesPerKm * 60), // Convert to seconds for formatTime
        });
      }
      return splits;
    } else {
      // Mile splits (1 mile increments up to 5 miles)
      const splits = [];
      for (let i = 1; i <= 5; i++) {
        splits.push({
          distance: `${i} mile${i > 1 ? "s" : ""}`,
          time: formatTime(i * paceMinutesPerMile * 60), // Convert to seconds for formatTime
        });
      }
      return splits;
    }
  };

  const raceDistances = getPopularRaceDistances();
  const splits = getCumulativeSplits();

  const getPerformanceLevel = () => {
    if (!paceMinutesPerMile) return null;

    // Always use mile pace for performance levels (much simpler)
    if (paceMinutesPerMile < 5.0) return "Elite";
    if (paceMinutesPerMile < 6.0) return "Competitive";
    if (paceMinutesPerMile < 7.0) return "Advanced";
    if (paceMinutesPerMile < 8.0) return "Intermediate";
    if (paceMinutesPerMile < 10.0) return "Recreational";
    if (paceMinutesPerMile < 15.0) return "Beginner";
    return "Walking";
  };

  const performanceLevel = getPerformanceLevel();

  // Training zones calculation
  const getTrainingZones = () => {
    if (!paceMinutesPerMile) return null;

    // Base calculations in minutes per mile, then format for display
    const zones = [
      {
        name: "Recovery",
        multiplier: 1.25,
        color: "bg-green-100 text-green-800",
      },
      { name: "Easy", multiplier: 1.15, color: "bg-blue-100 text-blue-800" },
      {
        name: "Aerobic",
        multiplier: 1.05,
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Threshold",
        multiplier: 0.95,
        color: "bg-orange-100 text-orange-800",
      },
      { name: "VO2 Max", multiplier: 0.85, color: "bg-red-100 text-red-800" },
    ];

    return zones.map((zone) => {
      const zonePaceMinutesPerMile = paceMinutesPerMile * zone.multiplier;

      let displayPace: string;
      if (isMetric) {
        const zonePaceMinutesPerKm = zonePaceMinutesPerMile / 1.609344;
        displayPace = formatTime(zonePaceMinutesPerKm * 60) + "/km"; // Convert to seconds for formatTime
      } else {
        displayPace = formatTime(zonePaceMinutesPerMile * 60) + "/mile"; // Convert to seconds for formatTime
      }

      return {
        ...zone,
        pace: displayPace,
      };
    });
  };

  const trainingZones = getTrainingZones();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Pace Analysis
      </h2>

      {/* Performance Metrics */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Always show pace */}
          {results.pace && (
            <div
              className={`p-4 rounded-lg border ${
                calculationType === "Pace"
                  ? "bg-primary-50 border-primary-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-600 mb-1">
                {calculationType === "Pace"
                  ? `Calculated ${calculationType}`
                  : "Pace"}
              </div>
              <div
                className={`font-bold text-gray-900 ${
                  calculationType === "Pace" ? "text-3xl" : "text-2xl"
                }`}
              >
                {calculationType === "Pace"
                  ? results.calculatedValue
                  : results.pace}{" "}
                <span className="text-lg text-gray-600">
                  {getPaceUnitLabel()}
                </span>
              </div>
              {calculationType === "Pace" && performanceLevel && (
                <div className="text-sm font-medium text-gray-600 mt-1">
                  {performanceLevel} Level
                </div>
              )}
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

          {/* Always show time */}
          {results.timeFormatted && (
            <div
              className={`p-4 rounded-lg border ${
                calculationType === "Time"
                  ? "bg-primary-50 border-primary-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-600 mb-1">
                {calculationType === "Time"
                  ? `Calculated ${calculationType}`
                  : "Total Time"}
              </div>
              <div
                className={`font-bold text-gray-900 ${
                  calculationType === "Time" ? "text-3xl" : "text-2xl"
                }`}
              >
                {calculationType === "Time"
                  ? results.calculatedValue
                  : results.timeFormatted}
              </div>
              <div className="text-xs text-gray-500 mt-1">Duration</div>
            </div>
          )}

          {/* Always show distance */}
          {results.distanceFormatted && (
            <div
              className={`p-4 rounded-lg border ${
                calculationType === "Distance"
                  ? "bg-primary-50 border-primary-100"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-600 mb-1">
                {calculationType === "Distance"
                  ? `Calculated ${calculationType}`
                  : "Distance"}
              </div>
              <div
                className={`font-bold text-gray-900 ${
                  calculationType === "Distance" ? "text-3xl" : "text-2xl"
                }`}
              >
                {calculationType === "Distance"
                  ? results.calculatedValue
                  : results.distanceFormatted}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total distance</div>
            </div>
          )}
        </div>
      </div>

      {/* Popular Race Distance Times */}
      {raceDistances && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Popular Race Distance Times At Same Pace
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {raceDistances.map((race, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {race.name}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {race.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Training Zones */}
      {trainingZones && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Training Zones
          </h3>
          <div className="space-y-2">
            {trainingZones.map((zone, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${zone.color}`}
                  >
                    {zone.name}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {zone.pace}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
