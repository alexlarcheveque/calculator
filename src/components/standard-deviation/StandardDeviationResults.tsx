"use client";

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
  const descriptiveStats = calculateDescriptiveStatistics(result.data);
  const outlierInfo = detectOutliers(result.data);

  return (
    <div className="mt-6 space-y-6">
      {/* Main Results Summary */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-blue-800">
          {result.calculationType === "population" ? "Population" : "Sample"}{" "}
          Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Count</h4>
            <p className="text-2xl font-bold">{result.statistics.count}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">Mean</h4>
            <p className="text-2xl font-bold">
              {formatNumber(result.statistics.mean)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-purple-600">Variance</h4>
            <p className="text-2xl font-bold">
              {formatNumber(result.statistics.variance)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">
              Standard Deviation
            </h4>
            <p className="text-2xl font-bold">
              {formatNumber(result.statistics.standardDeviation)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {result.calculationType === "population" ? "σ" : "s"}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-orange-600">Sum</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.statistics.sum)}
            </p>
          </div>

          {result.statistics.marginOfError && (
            <div className="bg-white p-3 rounded border">
              <h4 className="font-medium mb-2 text-teal-600">
                Margin of Error
              </h4>
              <p className="text-xl font-bold">
                {formatNumber(result.statistics.marginOfError)}
              </p>
              <p className="text-xs text-gray-500 mt-1">95% Confidence Level</p>
            </div>
          )}
        </div>

        {result.statistics.confidenceInterval && (
          <div className="mt-4 bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-indigo-600">
              95% Confidence Interval
            </h4>
            <p className="text-lg font-bold">
              [{formatNumber(result.statistics.confidenceInterval.lower)},{" "}
              {formatNumber(result.statistics.confidenceInterval.upper)}]
            </p>
            <p className="text-sm text-gray-600 mt-1">
              We are 95% confident that the true population mean lies within
              this interval.
            </p>
          </div>
        )}
      </div>

      {/* Descriptive Statistics */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Descriptive Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">Minimum</h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.min)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">
              Q1 (25th percentile)
            </h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.q1)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-purple-600">Median (Q2)</h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.median)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-orange-600">
              Q3 (75th percentile)
            </h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.q3)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">Maximum</h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.max)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-teal-600">Range</h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.range)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-indigo-600">IQR</h4>
            <p className="text-lg font-bold">
              {formatNumber(descriptiveStats.iqr)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Interquartile Range</p>
          </div>

          {outlierInfo.outliers.length > 0 && (
            <div className="bg-white p-3 rounded border">
              <h4 className="font-medium mb-2 text-yellow-600">Outliers</h4>
              <p className="text-lg font-bold">{outlierInfo.outliers.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                {outlierInfo.outliers.map((o) => formatNumber(o, 2)).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Visualization */}
      <div className="p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-green-800">Data Set</h3>

        <div className="bg-white p-3 rounded border">
          <h4 className="font-medium mb-2">
            Original Data ({result.data.length} values)
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.data.map((value, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm ${
                  outlierInfo.indices.includes(index)
                    ? "bg-yellow-200 text-yellow-800 border border-yellow-400"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {formatNumber(value, 2)}
              </span>
            ))}
          </div>
          {outlierInfo.outliers.length > 0 && (
            <p className="text-xs text-yellow-600 mt-2">
              Yellow highlighted values are statistical outliers
            </p>
          )}
        </div>

        <div className="mt-4 bg-white p-3 rounded border">
          <h4 className="font-medium mb-2">Sorted Data</h4>
          <div className="flex flex-wrap gap-2">
            {[...result.data]
              .sort((a, b) => a - b)
              .map((value, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {formatNumber(value, 2)}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-yellow-800">
          Calculation Steps
        </h3>
        <div className="space-y-2">
          {result.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-600 text-white text-xs rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-sm text-yellow-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulas Used */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Formulas Used</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2">
              {result.calculationType === "population"
                ? "Population"
                : "Sample"}{" "}
              Standard Deviation:
            </h4>
            {result.calculationType === "population" ? (
              <div>
                <p className="font-mono text-center mb-2">
                  σ = √[Σ(xi - μ)² / N]
                </p>
                <p className="text-xs text-gray-600">
                  Where σ is population standard deviation, μ is population
                  mean, N is population size
                </p>
              </div>
            ) : (
              <div>
                <p className="font-mono text-center mb-2">
                  s = √[Σ(xi - x̄)² / (N-1)]
                </p>
                <p className="text-xs text-gray-600">
                  Where s is sample standard deviation, x̄ is sample mean, N is
                  sample size
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2">Variance:</h4>
            <p className="font-mono text-center mb-2">
              {result.calculationType === "population"
                ? "σ² = Σ(xi - μ)² / N"
                : "s² = Σ(xi - x̄)² / (N-1)"}
            </p>
            <p className="text-xs text-gray-600">
              Variance is the square of standard deviation
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2">Mean:</h4>
            <p className="font-mono text-center mb-2">
              {result.calculationType === "population"
                ? "μ = Σxi / N"
                : "x̄ = Σxi / N"}
            </p>
            <p className="text-xs text-gray-600">
              Sum of all values divided by count
            </p>
          </div>

          {result.statistics.marginOfError && (
            <div className="bg-white p-3 rounded border">
              <h4 className="font-medium mb-2">Margin of Error (95% CI):</h4>
              <p className="font-mono text-center mb-2">ME = 1.96 × (s / √n)</p>
              <p className="text-xs text-gray-600">
                Where 1.96 is the z-score for 95% confidence level
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
