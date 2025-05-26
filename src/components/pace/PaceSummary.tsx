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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Results</h3>

      <div className="space-y-4">
        {/* Main Result */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium mb-1">
              Calculated {calculationType}
            </p>
            <p className="text-2xl font-bold text-blue-800">
              {results.calculatedValue}
            </p>
          </div>
        </div>

        {/* Additional Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.pace && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Pace</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.pace}
              </p>
            </div>
          )}

          {results.speed && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Speed</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.speed}
              </p>
            </div>
          )}

          {results.timeFormatted && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Time</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.timeFormatted}
              </p>
            </div>
          )}

          {results.distanceFormatted && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Distance</p>
              <p className="text-lg font-semibold text-gray-800">
                {results.distanceFormatted}
              </p>
            </div>
          )}
        </div>

        {/* Split Times */}
        {results.splits && results.splits.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3 text-gray-800">
              Split Times
            </h4>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-gray-200">
                <div className="bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                  Distance
                </div>
                <div className="bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                  Time
                </div>
                {results.splits.map((split, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-white px-3 py-2 text-sm text-gray-800">
                      {split.distance}
                    </div>
                    <div className="bg-white px-3 py-2 text-sm text-gray-800 font-mono">
                      {split.time}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
