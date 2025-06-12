import { IdealWeightResults, UnitSystem } from "@/types/idealWeight";
import {
  formatWeight,
  getAllFormulaResults,
} from "@/utils/idealWeightCalculations";

interface IdealWeightSummaryProps {
  results: IdealWeightResults;
}

export default function IdealWeightSummary({
  results,
}: IdealWeightSummaryProps) {
  const formulaResults = getAllFormulaResults(results).sort(
    (a, b) => a.weight - b.weight
  );
  const weightUnit = results.unitSystem === UnitSystem.IMPERIAL ? "lbs" : "kg";

  // Calculate average of all formulas
  const averageWeight =
    formulaResults.reduce((sum, formula) => sum + formula.weight, 0) /
    formulaResults.length;

  // Find the formula with highest and lowest estimates
  const sortedFormulas = [...formulaResults].sort(
    (a, b) => a.weight - b.weight
  );
  const lowestFormula = sortedFormulas[0];
  const highestFormula = sortedFormulas[sortedFormulas.length - 1];

  const getFormulaDescription = (name: string) => {
    switch (name) {
      case "Robinson":
        return "Modern and widely used";
      case "Miller":
        return "Slight variation of Robinson";
      case "Devine":
        return "Based on drug dosing studies";
      case "Hamwi":
        return "Used in clinical settings";
      default:
        return "Formula-based estimate";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Ideal Weight Analysis
      </h2>

      {/* Main Average Result */}
      <div className="mb-6">
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="text-sm text-gray-600 mb-1">Average Ideal Weight</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            ~ {formatWeight(averageWeight, results.unitSystem)}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            Average of {formulaResults.length} weight formulas
          </div>
        </div>
      </div>

      {/* Formula Results Breakdown */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Formula Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {formulaResults.map((formula) => {
            // Default neutral classes
            let cardClass = "bg-gray-50 border border-gray-200";
            let titleClass = "text-sm mb-1 text-gray-600";
            let valueClass = "text-lg font-bold text-gray-900";

            // Apply colors to match FormulaComparisonChart
            if (formula.name.startsWith("Robinson")) {
              cardClass = "bg-blue-50 border border-blue-100";
              titleClass = "text-sm mb-1 text-blue-600";
              valueClass = "text-lg font-bold text-blue-900";
            } else if (formula.name.startsWith("Miller")) {
              cardClass = "bg-green-50 border border-green-100";
              titleClass = "text-sm mb-1 text-green-600";
              valueClass = "text-lg font-bold text-green-900";
            } else if (formula.name.startsWith("Devine")) {
              cardClass = "bg-yellow-50 border border-yellow-100";
              titleClass = "text-sm mb-1 text-yellow-600";
              valueClass = "text-lg font-bold text-yellow-900";
            } else if (formula.name.startsWith("Hamwi")) {
              cardClass = "bg-red-50 border border-red-100";
              titleClass = "text-sm mb-1 text-red-600";
              valueClass = "text-lg font-bold text-red-900";
            }

            return (
              <div key={formula.name} className={`p-4 rounded-lg ${cardClass}`}>
                <div className={titleClass}>{formula.name} Formula</div>
                <div className={valueClass}>
                  {formatWeight(formula.weight, results.unitSystem)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getFormulaDescription(formula.name)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BMI Range Assessment */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          BMI-Based Healthy Weight Range
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Healthy Weight Range</div>
          <div className="text-lg font-semibold text-gray-900">
            {formatWeight(results.bmiRangeMin, results.unitSystem)} -{" "}
            {formatWeight(results.bmiRangeMax, results.unitSystem)}
            <span className="text-gray-500 text-sm font-normal ml-2">
              (BMI 18.5 – 24.9)
            </span>
          </div>
        </div>
      </div>

      {/* Health Note */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-700 border-b pb-1">
          Important Health Information
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <strong>These calculations are estimates</strong> based on height
              and gender only. Ideal weight varies significantly based on:
            </p>
            <ul className="list-disc list-inside text-xs space-y-1 text-gray-600">
              <li>Muscle mass and body composition</li>
              <li>Bone density and frame size</li>
              <li>Age and metabolic health</li>
              <li>Athletic training and fitness level</li>
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              Consult healthcare professionals for personalized weight
              management advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
