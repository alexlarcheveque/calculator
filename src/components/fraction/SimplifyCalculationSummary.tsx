import React from "react";
import { formatFraction } from "@/utils/fractionCalculations";

interface SimplifyCalculationSummaryProps {
  wholeNumber: number;
  numerator: number;
  denominator: number;
  originalFraction: { numerator: number; denominator: number };
  simplifiedFraction: { numerator: number; denominator: number };
  decimal: number;
  isAlreadySimplified: boolean;
}

export default function SimplifyCalculationSummary({
  wholeNumber,
  numerator,
  denominator,
  originalFraction,
  simplifiedFraction,
  decimal,
  isAlreadySimplified,
}: SimplifyCalculationSummaryProps) {
  const renderFraction = (num: number, den: number, className = "") => (
    <div className={`inline-flex flex-col items-center mx-2 ${className}`}>
      <div className="text-lg font-medium">{num}</div>
      <div className="w-8 h-0.5 bg-black my-1"></div>
      <div className="text-lg font-medium">{den}</div>
    </div>
  );

  const renderMixedNumber = (
    whole: number,
    num: number,
    den: number,
    className = ""
  ) => (
    <div className={`inline-flex items-center mx-2 ${className}`}>
      {whole !== 0 && <span className="text-lg font-medium mr-1">{whole}</span>}
      <div className="inline-flex flex-col items-center">
        <div className="text-lg font-medium">{num}</div>
        <div className="w-8 h-0.5 bg-black my-1"></div>
        <div className="text-lg font-medium">{den}</div>
      </div>
    </div>
  );

  // Calculate GCD for showing steps
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

  const commonFactor = gcd(
    originalFraction.numerator,
    originalFraction.denominator
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Fraction Simplifier
      </h2>
      <p className="text-gray-600 mb-6">
        Simplify fractions to their lowest terms by finding the greatest common
        divisor (GCD) and dividing both numerator and denominator by it.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Simplification Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center space-x-4 text-xl">
          {wholeNumber !== 0
            ? renderMixedNumber(wholeNumber, numerator, denominator)
            : renderFraction(
                originalFraction.numerator,
                originalFraction.denominator
              )}
          <span className="text-2xl font-medium">=</span>
          {renderFraction(
            simplifiedFraction.numerator,
            simplifiedFraction.denominator,
            "text-blue-600"
          )}
        </div>
      </div>

      {/* Decimal Result */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>Result in decimals:</strong>{" "}
          <span className="font-mono text-blue-600">{decimal.toFixed(6)}</span>
        </p>
      </div>

      {/* Already Simplified Message */}
      {isAlreadySimplified && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-lg text-green-700 font-semibold">
            ✓ The fraction is already in its simplest form!
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Calculation Steps */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Simplification steps:
        </h4>

        <div className="space-y-6">
          {/* Step 1: Original fraction */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 1: Original fraction
            </div>
            <div className="flex items-center space-x-4">
              {wholeNumber !== 0 ? (
                <>
                  {renderMixedNumber(wholeNumber, numerator, denominator)}
                  <span className="text-xl">=</span>
                  {renderFraction(
                    originalFraction.numerator,
                    originalFraction.denominator
                  )}
                  <span className="text-sm text-gray-600 ml-2">
                    (converted to improper fraction)
                  </span>
                </>
              ) : (
                renderFraction(
                  originalFraction.numerator,
                  originalFraction.denominator
                )
              )}
            </div>
          </div>

          {!isAlreadySimplified && (
            <>
              {/* Step 2: Find GCD */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 2: Find the Greatest Common Divisor (GCD)
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    GCD of {Math.abs(originalFraction.numerator)} and{" "}
                    {originalFraction.denominator} = {commonFactor}
                  </p>
                  <div className="text-xs text-gray-600">
                    The GCD is the largest number that divides both the
                    numerator and denominator evenly.
                  </div>
                </div>
              </div>

              {/* Step 3: Divide by GCD */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 3: Divide both numerator and denominator by the GCD
                </div>
                <div className="flex items-center space-x-4">
                  <div className="inline-flex flex-col items-center mx-2">
                    <div className="text-lg">
                      {originalFraction.numerator} ÷ {commonFactor}
                    </div>
                    <div className="w-20 h-0.5 bg-black my-1"></div>
                    <div className="text-lg">
                      {originalFraction.denominator} ÷ {commonFactor}
                    </div>
                  </div>
                  <span className="text-xl">=</span>
                  {renderFraction(
                    simplifiedFraction.numerator,
                    simplifiedFraction.denominator,
                    "text-blue-600 font-semibold"
                  )}
                </div>
              </div>

              {/* Step 4: Final result */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Step 4: Simplified fraction
                </div>
                <div className="flex items-center space-x-4">
                  {renderFraction(
                    simplifiedFraction.numerator,
                    simplifiedFraction.denominator,
                    "text-blue-600 font-semibold"
                  )}
                  <span className="text-sm text-gray-600">
                    = {formatFraction(simplifiedFraction, true)} ={" "}
                    {decimal.toFixed(6)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
