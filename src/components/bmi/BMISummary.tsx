"use client";

import { BMIResults } from "@/types/bmi";
import { formatNumber, formatWeight } from "@/utils/bmiCalculations";

interface BMISummaryProps {
  results: BMIResults;
}

export default function BMISummary({ results }: BMISummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">BMI Results</h2>

      {/* BMI Assessment Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          BMI Assessment
        </h3>
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Your BMI</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatNumber(results.bmi, 1)} kg/m²
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {results.category}
          </div>
        </div>
      </div>

      {/* Health Metrics Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Health Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Healthy BMI Range</div>
            <div className="text-lg font-semibold text-gray-900">
              18.5 - 25 kg/m²
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">
              Healthy Weight Range
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatWeight(
                results.healthyWeightRange.min,
                results.healthyWeightRange.unit
              )}{" "}
              -{" "}
              {formatWeight(
                results.healthyWeightRange.max,
                results.healthyWeightRange.unit
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">BMI Prime</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatNumber(results.bmiPrime, 2)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Ponderal Index</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatNumber(results.ponderalIndex, 1)} kg/m³
            </div>
          </div>
        </div>
      </div>

      {/* Weight Recommendations Section */}
      {(results.weightToLose || results.weightToGain) && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Weight Recommendation
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            {results.weightToLose && (
              <p className="text-sm text-yellow-700">
                To reach a healthy weight, consider losing{" "}
                <span className="font-semibold">
                  {formatWeight(
                    results.weightToLose,
                    results.healthyWeightRange.unit
                  )}
                </span>
              </p>
            )}
            {results.weightToGain && (
              <p className="text-sm text-yellow-700">
                To reach a healthy weight, consider gaining{" "}
                <span className="font-semibold">
                  {formatWeight(
                    results.weightToGain,
                    results.healthyWeightRange.unit
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Special Information Section */}
      {(results.category === "BMI Not Applicable" ||
        results.percentile !== undefined) && (
        <div>
          <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
            Age-Specific Information
          </h3>

          {/* Special notice for infants/toddlers */}
          {results.category === "BMI Not Applicable" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                ℹ️ BMI Not Applicable for Infants/Toddlers
              </h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>
                    BMI is not used for children under 2 years old.
                  </strong>
                </p>
                <p>
                  For infants and toddlers, growth is tracked using
                  weight-for-length charts and other age-appropriate growth
                  indicators.
                </p>
                <p className="font-medium">
                  Please consult your pediatrician for appropriate growth
                  assessment.
                </p>
              </div>
            </div>
          )}

          {/* Percentile information for children */}
          {results.percentile !== undefined && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                📊 CDC BMI-for-Age Percentile Information
              </h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p>
                  <strong>
                    Your BMI is at the {Math.round(results.percentile)}th
                    percentile
                  </strong>{" "}
                  for {results.category.includes("male") ? "boys" : "girls"} of
                  the same age.
                </p>
                <p>
                  This means your BMI is equal to or higher than{" "}
                  {Math.round(results.percentile)}% of children your age and
                  gender.
                </p>

                <div className="mt-3">
                  <p className="font-medium mb-2">
                    CDC Categories for Children:
                  </p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-xs">
                    <li>
                      <strong>Underweight:</strong> Less than 5th percentile
                    </li>
                    <li>
                      <strong>Healthy Weight:</strong> 5th to 85th percentile
                    </li>
                    <li>
                      <strong>At Risk of Overweight:</strong> 85th to 95th
                      percentile
                    </li>
                    <li>
                      <strong>Overweight:</strong> 95th percentile or higher
                    </li>
                  </ul>
                </div>

                <p className="font-medium text-blue-800 mt-3">
                  Remember: Children's BMI naturally changes as they grow.
                  Always discuss growth patterns with your healthcare provider.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
