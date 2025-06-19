"use client";

import { useState } from "react";
import { StandardDeviationResult } from "@/types/standardDeviation";
import {
  formatNumber,
  calculateDescriptiveStatistics,
  detectOutliers,
} from "@/utils/standardDeviationCalculations";

interface StandardDeviationResultsProps {
  result: StandardDeviationResult;
}

export default function StandardDeviationResults({
  result,
}: StandardDeviationResultsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const descriptiveStats = calculateDescriptiveStatistics(result.data);
  const outlierInfo = detectOutliers(result.data);

  return (
    <div className="mt-6 space-y-6">
      {/* Main Results */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {result.calculationType === "population" ? "Population" : "Sample"}{" "}
          Statistics Results
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Key Statistics */}
          <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
            <h4 className="text-xl font-semibold mb-6 text-center text-blue-800">
              Key Results
            </h4>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {formatNumber(result.statistics.standardDeviation)}
                </div>
                <div className="text-sm text-gray-600">Standard Deviation</div>
                <div className="text-xs text-gray-500 mt-1">
                  {result.calculationType === "population" ? "σ" : "s"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {formatNumber(result.statistics.variance)}
                </div>
                <div className="text-sm text-gray-600">Variance</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {formatNumber(result.statistics.mean)}
                </div>
                <div className="text-sm text-gray-600">Mean</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {result.statistics.count}
                </div>
                <div className="text-sm text-gray-600">Count</div>
              </div>
            </div>

            {result.statistics.confidenceInterval && (
              <div className="text-center bg-blue-50 rounded-lg p-4">
                <div className="text-lg font-semibold text-blue-800 mb-2">
                  95% Confidence Interval
                </div>
                <div className="text-xl font-bold text-blue-700">
                  [{formatNumber(result.statistics.confidenceInterval.lower)},{" "}
                  {formatNumber(result.statistics.confidenceInterval.upper)}]
                </div>
                <div className="text-sm text-blue-600 mt-2">
                  Margin of Error: ±
                  {formatNumber(result.statistics.marginOfError || 0)}
                </div>
              </div>
            )}
          </div>

          {/* Data Visualization */}
          <div className="bg-white rounded-lg p-6 border">
            <h4 className="text-lg font-semibold mb-4 text-center">
              Your Data ({result.data.length} values)
            </h4>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">
                  Original Data
                </h5>
                <div className="flex flex-wrap gap-2">
                  {result.data.map((value, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        outlierInfo.indices.includes(index)
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {formatNumber(value, 2)}
                    </span>
                  ))}
                </div>
                {outlierInfo.outliers.length > 0 && (
                  <p className="text-xs text-yellow-600 mt-2">
                    ⚠ {outlierInfo.outliers.length} outlier(s) detected
                    (highlighted in yellow)
                  </p>
                )}
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">
                  Sorted Data
                </h5>
                <div className="flex flex-wrap gap-2">
                  {[...result.data]
                    .sort((a, b) => a - b)
                    .map((value, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium"
                      >
                        {formatNumber(value, 2)}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {showSteps ? "Hide" : "Show"} Calculation Steps
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Statistics
          </button>
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {showFormulas ? "Hide" : "Show"} Formulas
          </button>
        </div>
      </div>

      {/* Calculation Steps - Collapsible */}
      {showSteps && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-4 text-green-800">
            Calculation Steps
          </h3>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white text-sm rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="text-green-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Statistics - Collapsible */}
      {showAdvanced && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-6 text-blue-800">
            Advanced Statistics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.min)}
              </div>
              <div className="text-sm text-gray-600">Minimum</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.q1)}
              </div>
              <div className="text-sm text-gray-600">Q1 (25th)</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.median)}
              </div>
              <div className="text-sm text-gray-600">Median</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.q3)}
              </div>
              <div className="text-sm text-gray-600">Q3 (75th)</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.max)}
              </div>
              <div className="text-sm text-gray-600">Maximum</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.range)}
              </div>
              <div className="text-sm text-gray-600">Range</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(descriptiveStats.iqr)}
              </div>
              <div className="text-sm text-gray-600">IQR</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(result.statistics.sum)}
              </div>
              <div className="text-sm text-gray-600">Sum</div>
            </div>
          </div>
        </div>
      )}

      {/* Formulas - Collapsible */}
      {showFormulas && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-6 text-purple-800">
            Formulas Used
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-red-600">
                {result.calculationType === "population"
                  ? "Population"
                  : "Sample"}{" "}
                Standard Deviation
              </h4>
              {result.calculationType === "population" ? (
                <div className="space-y-2">
                  <p className="font-mono text-center text-lg">
                    σ = √[Σ(xᵢ - μ)² / N]
                  </p>
                  <p className="text-sm text-gray-600">
                    Where σ is population standard deviation, μ is population
                    mean, N is population size
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-mono text-center text-lg">
                    s = √[Σ(xᵢ - x̄)² / (N-1)]
                  </p>
                  <p className="text-sm text-gray-600">
                    Where s is sample standard deviation, x̄ is sample mean, N is
                    sample size
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-purple-600">Variance</h4>
              <div className="space-y-2">
                <p className="font-mono text-center text-lg">
                  {result.calculationType === "population"
                    ? "σ² = Σ(xᵢ - μ)² / N"
                    : "s² = Σ(xᵢ - x̄)² / (N-1)"}
                </p>
                <p className="text-sm text-gray-600">
                  Variance is the square of standard deviation
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-green-600">Mean</h4>
              <div className="space-y-2">
                <p className="font-mono text-center text-lg">
                  {result.calculationType === "population"
                    ? "μ = Σxᵢ / N"
                    : "x̄ = Σxᵢ / N"}
                </p>
                <p className="text-sm text-gray-600">
                  Sum of all values divided by count
                </p>
              </div>
            </div>

            {result.statistics.marginOfError && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 text-blue-600">
                  Margin of Error (95% CI)
                </h4>
                <div className="space-y-2">
                  <p className="font-mono text-center text-lg">
                    ME = 1.96 × (s / √n)
                  </p>
                  <p className="text-sm text-gray-600">
                    Where 1.96 is the z-score for 95% confidence level
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
