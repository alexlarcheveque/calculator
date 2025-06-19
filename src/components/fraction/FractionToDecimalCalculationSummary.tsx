import React from "react";

interface FractionToDecimalCalculationSummaryProps {
  numerator: number;
  denominator: number;
  decimal: number;
  percentage: number;
}

export default function FractionToDecimalCalculationSummary({
  numerator,
  denominator,
  decimal,
  percentage,
}: FractionToDecimalCalculationSummaryProps) {
  const renderFraction = (num: number, den: number, className = "") => (
    <div className={`inline-flex flex-col items-center mx-2 ${className}`}>
      <div className="text-lg font-medium">{num}</div>
      <div className="w-8 h-0.5 bg-black my-1"></div>
      <div className="text-lg font-medium">{den}</div>
    </div>
  );

  // Analyze if the decimal is terminating or repeating
  const decimalStr = decimal.toString();
  const isTerminating =
    !decimalStr.includes("e") && decimalStr.split(".")[1]?.length <= 10;

  // Perform long division to show steps
  const performLongDivision = (num: number, den: number) => {
    const steps = [];
    let dividend = Math.abs(num);
    const divisor = Math.abs(den);
    let quotient = Math.floor(dividend / divisor);
    let remainder = dividend % divisor;

    steps.push({
      step: `${dividend} ÷ ${divisor}`,
      quotient: quotient,
      remainder: remainder,
      description: `${quotient} with remainder ${remainder}`,
    });

    // Show a few decimal places
    let decimalPart = "";
    let currentRemainder = remainder;
    const maxSteps = 6;

    for (let i = 0; i < maxSteps && currentRemainder !== 0; i++) {
      currentRemainder *= 10;
      const digit = Math.floor(currentRemainder / divisor);
      decimalPart += digit;
      currentRemainder = currentRemainder % divisor;

      steps.push({
        step: `${(currentRemainder * 10) / 10} ÷ ${divisor}`,
        quotient: digit,
        remainder: currentRemainder,
        description: `Bring down 0, ${
          currentRemainder * 10
        } ÷ ${divisor} = ${digit} remainder ${currentRemainder}`,
      });
    }

    return { wholePart: quotient, decimalPart, steps };
  };

  const divisionResult = performLongDivision(numerator, denominator);
  const isNegative = numerator < 0 !== denominator < 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Fraction to Decimal Converter
      </h2>
      <p className="text-gray-600 mb-6">
        Convert fractions to decimal form using long division. This shows the
        step-by-step process of dividing the numerator by the denominator.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Conversion Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center space-x-4 text-xl">
          {renderFraction(numerator, denominator)}
          <span className="text-2xl font-medium">=</span>
          <span className="text-lg font-medium text-blue-600">{decimal}</span>
        </div>
      </div>

      {/* Percentage Result */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>As percentage:</strong>{" "}
          <span className="font-mono text-blue-600">
            {percentage.toFixed(4)}%
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Conversion Steps */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Long division steps:
        </h4>

        <div className="space-y-6">
          {/* Step 1: Setup */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 1: Set up the division
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg">
                {Math.abs(numerator)} ÷ {Math.abs(denominator)}
              </span>
              {isNegative && (
                <span className="text-sm text-gray-600">
                  (Result will be negative)
                </span>
              )}
            </div>
          </div>

          {/* Step 2: Whole number part */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 2: Find the whole number part
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                How many times does {Math.abs(denominator)} go into{" "}
                {Math.abs(numerator)}?
              </p>
              <p className="text-lg">
                {Math.abs(denominator)} × {divisionResult.wholePart} ={" "}
                {Math.abs(denominator) * divisionResult.wholePart}
              </p>
              <p className="text-sm text-gray-700">
                Remainder: {Math.abs(numerator)} -{" "}
                {Math.abs(denominator) * divisionResult.wholePart} ={" "}
                {Math.abs(numerator) % Math.abs(denominator)}
              </p>
            </div>
          </div>

          {/* Step 3: Decimal places */}
          {divisionResult.steps.length > 1 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">
                Step 3: Calculate decimal places
              </div>
              <div className="space-y-3">
                {divisionResult.steps.slice(1, 4).map((step, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-gray-700">
                      Decimal place {index + 1}: {step.description}
                    </p>
                  </div>
                ))}
                {divisionResult.steps.length > 4 && (
                  <p className="text-xs text-gray-600">
                    ... (continuing the pattern)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Final result */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 4: Complete result
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                {renderFraction(numerator, denominator)}
                <span className="text-xl">=</span>
                <span className="text-lg font-semibold text-blue-600">
                  {decimal}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Decimal: {decimal}</p>
                <p>Percentage: {percentage.toFixed(4)}%</p>
                <p>Precision: {decimal.toFixed(8)} (8 decimal places)</p>
              </div>
            </div>
          </div>

          {/* Step 5: Verification */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 5: Verification
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                Check: {decimal} × {denominator} ={" "}
                {(decimal * denominator).toFixed(6)}
              </p>
              <p className="text-xs text-gray-600">
                {Math.abs(decimal * denominator - numerator) < 0.0001
                  ? "✓ Calculation verified"
                  : "≈ Close approximation due to rounding"}
              </p>
            </div>
          </div>

          {/* Additional info for special cases */}
          {decimal === Math.floor(decimal) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> This fraction equals a whole number (
                {decimal}).
              </p>
            </div>
          )}

          {isTerminating && decimal !== Math.floor(decimal) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                <strong>Note:</strong> This is a terminating decimal (finite
                number of decimal places).
              </p>
            </div>
          )}

          {!isTerminating && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> This may be a repeating decimal. The
                pattern might repeat after more decimal places.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
