"use client";

import React, { useState } from "react";
import {
  DistanceUnit,
  PaceUnit,
  MultipointSegment,
  MultipointResults,
} from "@/types/pace";
import { calculateMultipoint } from "@/utils/paceCalculations";

export default function MultipointCalculator() {
  const [segments, setSegments] = useState<MultipointSegment[]>(
    Array.from({ length: 12 }, () => ({
      distance: 0,
      distanceUnit: DistanceUnit.KILOMETERS,
      time: "",
    }))
  );
  const [preferredPaceUnit, setPreferredPaceUnit] = useState<PaceUnit>(
    PaceUnit.TIME_PER_MILE
  );
  const [results, setResults] = useState<MultipointResults | null>(null);

  // Initialize with sample data
  React.useEffect(() => {
    const sampleSegments = [...segments];
    sampleSegments[0] = { distance: 1, distanceUnit: DistanceUnit.KILOMETERS, time: "3:25" };
    sampleSegments[1] = { distance: 2, distanceUnit: DistanceUnit.KILOMETERS, time: "6:55" };
    sampleSegments[2] = { distance: 3, distanceUnit: DistanceUnit.KILOMETERS, time: "10:25" };
    sampleSegments[3] = { distance: 4, distanceUnit: DistanceUnit.KILOMETERS, time: "14:01" };
    sampleSegments[4] = { distance: 5, distanceUnit: DistanceUnit.KILOMETERS, time: "17:25" };
    setSegments(sampleSegments);
  }, []);

  const handleSegmentChange = (
    index: number,
    field: keyof MultipointSegment,
    value: string | number | DistanceUnit
  ) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    setSegments(newSegments);
  };

  const handleCalculate = () => {
    const validSegments = segments.filter(
      (segment) => segment.distance > 0 && segment.time
    );
    if (validSegments.length > 0) {
      const calculatedResults = calculateMultipoint(
        validSegments,
        preferredPaceUnit
      );
      setResults(calculatedResults);
    }
  };

  const handleClear = () => {
    setSegments(
      Array.from({ length: 12 }, () => ({
        distance: 0,
        distanceUnit: DistanceUnit.KILOMETERS,
        time: "",
      }))
    );
    setResults(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Multipoint Pace Calculator
      </h3>
      <p className="text-gray-600 mb-6">
        The following calculator can determine the pace of segments of a run (or
        other activity) for those with access to the time at intermittent points
        during the run.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Distance
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Unit
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Time (hh:mm:ss)
              </th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={segment.distance || ""}
                    onChange={(e) =>
                      handleSegmentChange(
                        index,
                        "distance",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    step="0.1"
                    min="0"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={segment.distanceUnit}
                    onChange={(e) =>
                      handleSegmentChange(
                        index,
                        "distanceUnit",
                        e.target.value as DistanceUnit
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.values(DistanceUnit).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={segment.time}
                    onChange={(e) =>
                      handleSegmentChange(index, "time", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="mm:ss"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Your Preferred Pace Unit:
          </label>
          <select
            value={preferredPaceUnit}
            onChange={(e) => setPreferredPaceUnit(e.target.value as PaceUnit)}
            className="px-3 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={PaceUnit.TIME_PER_MILE}>Per Mile</option>
            <option value={PaceUnit.TIME_PER_KILOMETER}>Per Kilometer</option>
            <option value={PaceUnit.MILES_PER_HOUR}>Miles Per Hour</option>
            <option value={PaceUnit.KILOMETERS_PER_HOUR}>
              Kilometers Per Hour
            </option>
            <option value={PaceUnit.METERS_PER_MINUTE}>
              Meters Per Minute
            </option>
            <option value={PaceUnit.METERS_PER_SECOND}>Meters Per Second</option>
            <option value={PaceUnit.YARDS_PER_MINUTE}>Yards Per Minute</option>
            <option value={PaceUnit.YARDS_PER_SECOND}>Yards Per Second</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleCalculate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">
            Segment Results
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Segment
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Distance
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Time
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Pace
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                    Speed
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.segments.map((segment, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-3 py-2 text-sm text-gray-700">
                      {segment.segmentNumber}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700">
                      {segment.distance}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700 font-mono">
                      {segment.segmentTime}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700 font-mono">
                      {segment.pace}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700">
                      {segment.speed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">Total Distance</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.totalDistance.toFixed(2)} miles
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">Total Time</p>
              <p className="text-lg font-semibold text-gray-800 font-mono">
                {results.totalTime}
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-600 font-medium">Average Pace</p>
              <p className="text-lg font-semibold text-gray-800 font-mono">
                {results.averagePace}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 