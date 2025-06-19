import React from "react";
import { formatFraction } from "@/utils/fractionCalculations";

interface DecimalToFractionCalculationSummaryProps {
  decimal: number;
  fraction: { numerator: number; denominator: number };
}

export default function DecimalToFractionCalculationSummary({
  decimal,
  fraction,
}: DecimalToFractionCalculationSummaryProps) {
  const renderFraction = (num: number, den: number, className = "") => (
    <div className={`inline-flex flex-col items-center mx-2 ${className}`}>
      <div className="text-lg font-medium">{num}</div>
      <div className="w-8 h-0.5 bg-black my-1"></div>
      <div className="text-lg font-medium">{den}</div>
    </div>
  );

  // Analyze the decimal to show conversion steps
  const decimalStr = decimal.toString();
  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);
  const absDecimalStr = absDecimal.toString();

  // Check if it's a terminating decimal
  const decimalPart = absDecimalStr.includes(".")
    ? absDecimalStr.split(".")[1]
    : "";
  const decimalPlaces = decimalPart.length;
  const isTerminating = decimalPlaces > 0 && decimalPlaces <= 10; // Reasonable limit for display

  // For terminating decimals, show the conversion process
  let powerOf10 = 1;
  let numeratorBeforeSimplify = 0;

  if (isTerminating && decimalPlaces > 0) {
    powerOf10 = Math.pow(10, decimalPlaces);
    numeratorBeforeSimplify = Math.round(absDecimal * powerOf10);
    if (isNegative) numeratorBeforeSimplify = -numeratorBeforeSimplify;
  }

  // Calculate GCD for showing simplification
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const commonFactor = isTerminating
    ? gcd(Math.abs(numeratorBeforeSimplify), powerOf10)
    : 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Decimal to Fraction Converter
      </h2>
      <p className="text-gray-600 mb-6">
        Convert decimal numbers to their equivalent fraction form by analyzing
        the decimal places and simplifying to the lowest terms.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Conversion Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="text-lg font-medium">{decimal}</span>
          <span className="text-2xl font-medium">=</span>
          {renderFraction(
            fraction.numerator,
            fraction.denominator,
            "text-blue-600"
          )}
        </div>
      </div>

      {/* Mixed Number Result */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>As mixed number:</strong>{" "}
          <span className="font-mono text-blue-600">
            {formatFraction(fraction, true)}
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Conversion Steps */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Conversion steps:
        </h4>

        <div className="space-y-6">
          {/* Step 1: Original decimal */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 1: Original decimal
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">{decimal}</span>
            </div>
          </div>

          {isTerminating && decimalPlaces > 0 ? (
            <>
              {/* Step 2: Express as fraction over power of 10 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 2: Express as fraction over power of 10
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    {decimal} has {decimalPlaces} decimal place
                    {decimalPlaces !== 1 ? "s" : ""}, so multiply by 10^
                    {decimalPlaces} = {powerOf10}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg">{decimal}</span>
                    <span className="text-xl">=</span>
                    {renderFraction(numeratorBeforeSimplify, powerOf10)}
                  </div>
                </div>
              </div>

              {/* Step 3: Simplify if needed */}
              {commonFactor > 1 ? (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 3: Find the Greatest Common Divisor (GCD)
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        GCD of {Math.abs(numeratorBeforeSimplify)} and{" "}
                        {powerOf10} = {commonFactor}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 4: Divide both numerator and denominator by the GCD
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numeratorBeforeSimplify} ÷ {commonFactor}
                        </div>
                        <div className="w-20 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {powerOf10} ÷ {commonFactor}
                        </div>
                      </div>
                      <span className="text-xl">=</span>
                      {renderFraction(
                        fraction.numerator,
                        fraction.denominator,
                        "text-blue-600 font-semibold"
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    Step 3: Fraction is already in simplest form
                  </div>
                  <div className="flex items-center space-x-4">
                    {renderFraction(
                      fraction.numerator,
                      fraction.denominator,
                      "text-blue-600 font-semibold"
                    )}
                    <span className="text-sm text-gray-600">
                      (GCD = 1, no further simplification needed)
                    </span>
                  </div>
                </div>
              )}

              {/* Final step: Show all forms */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Final result in different forms:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 w-20">Decimal:</span>
                    <span className="font-mono text-lg">{decimal}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 w-20">
                      Fraction:
                    </span>
                    {renderFraction(
                      fraction.numerator,
                      fraction.denominator,
                      "text-blue-600"
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 w-20">Mixed:</span>
                    <span className="font-mono text-lg text-blue-600">
                      {formatFraction(fraction, true)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* For non-terminating or complex decimals */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 2: Convert using approximation algorithm
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    This decimal{" "}
                    {decimalPlaces === 0
                      ? "is a whole number"
                      : "requires advanced conversion techniques"}
                    to find the exact fractional representation.
                  </p>
                  <div className="flex items-center space-x-4">
                    {renderFraction(
                      fraction.numerator,
                      fraction.denominator,
                      "text-blue-600 font-semibold"
                    )}
                  </div>
                </div>
              </div>

              {/* Verification step */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 3: Verification
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    {fraction.numerator} ÷ {fraction.denominator} ={" "}
                    {(fraction.numerator / fraction.denominator).toFixed(10)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {Math.abs(
                      fraction.numerator / fraction.denominator - decimal
                    ) < 0.0001
                      ? "✓ Exact match"
                      : "≈ Close approximation"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
