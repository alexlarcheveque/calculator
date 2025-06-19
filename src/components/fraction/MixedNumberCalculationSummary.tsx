import React from "react";
import { FractionResult, FractionOperation } from "@/types/fraction";
import { formatFraction } from "@/utils/fractionCalculations";

interface MixedNumberCalculationSummaryProps {
  mixedNumber1: string;
  mixedNumber2: string;
  operation: FractionOperation;
  numerator1: number;
  denominator1: number;
  numerator2: number;
  denominator2: number;
  result: FractionResult;
}

export default function MixedNumberCalculationSummary({
  mixedNumber1,
  mixedNumber2,
  operation,
  numerator1,
  denominator1,
  numerator2,
  denominator2,
  result,
}: MixedNumberCalculationSummaryProps) {
  const getOperationSymbol = (op: FractionOperation) => {
    switch (op) {
      case FractionOperation.ADD:
        return "+";
      case FractionOperation.SUBTRACT:
        return "−";
      case FractionOperation.MULTIPLY:
        return "×";
      case FractionOperation.DIVIDE:
        return "÷";
      default:
        return "+";
    }
  };

  const renderMixedNumber = (mixedNum: string, className = "") => (
    <div className={`inline-flex items-center mx-2 ${className}`}>
      <span className="text-lg font-medium">{mixedNum}</span>
    </div>
  );

  const renderFraction = (num: number, den: number, className = "") => (
    <div className={`inline-flex flex-col items-center mx-2 ${className}`}>
      <div className="text-lg font-medium">{num}</div>
      <div className="w-8 h-0.5 bg-black my-1"></div>
      <div className="text-lg font-medium">{den}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Fraction Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Below are multiple fraction calculators capable of addition,
        subtraction, multiplication, division, simplification, and conversion
        between fractions and decimals. Fields above the solid black line
        represent the numerator, while fields below represent the denominator.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Calculation Display with Mixed Numbers */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center space-x-4 text-xl">
          {renderMixedNumber(mixedNumber1)}
          <span className="text-2xl font-medium">
            {getOperationSymbol(operation)}
          </span>
          {renderMixedNumber(mixedNumber2)}
          <span className="text-2xl font-medium">=</span>
          {renderMixedNumber(
            formatFraction(result.simplified, true),
            "text-blue-600"
          )}
        </div>
      </div>

      {/* Decimal Result */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>Result in decimals:</strong>{" "}
          <span className="font-mono text-blue-600">{result.decimal}</span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Calculation Steps */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Calculation steps:
        </h4>

        <div className="space-y-6">
          {/* Step 1: Original equation with mixed numbers */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 1: Original equation
            </div>
            <div className="flex items-center space-x-4">
              {renderMixedNumber(mixedNumber1)}
              <span className="text-xl">{getOperationSymbol(operation)}</span>
              {renderMixedNumber(mixedNumber2)}
              <span className="text-xl">=</span>
            </div>
          </div>

          {/* Step 2: Convert to improper fractions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 2: Convert mixed numbers to improper fractions
            </div>
            <div className="flex items-center space-x-4">
              {renderFraction(numerator1, denominator1)}
              <span className="text-xl">{getOperationSymbol(operation)}</span>
              {renderFraction(numerator2, denominator2)}
              <span className="text-xl">=</span>
            </div>
          </div>

          {/* For Addition and Subtraction - Show detailed steps */}
          {(operation === FractionOperation.ADD ||
            operation === FractionOperation.SUBTRACT) && (
            <>
              {/* Step 3: Find common denominator (only if denominators are different) */}
              {denominator1 !== denominator2 && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 3: Find common denominator by cross-multiplying
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1} × {denominator2}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1} × {denominator2}
                        </div>
                      </div>
                      <span className="text-xl">
                        {getOperationSymbol(operation)}
                      </span>
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator2} × {denominator1}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator2} × {denominator1}
                        </div>
                      </div>
                      <span className="text-xl">=</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 4: Simplify the fractions with common denominators
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(
                        numerator1 * denominator2,
                        denominator1 * denominator2
                      )}
                      <span className="text-xl">
                        {getOperationSymbol(operation)}
                      </span>
                      {renderFraction(
                        numerator2 * denominator1,
                        denominator2 * denominator1
                      )}
                      <span className="text-xl">=</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 5:{" "}
                      {operation === FractionOperation.ADD ? "Add" : "Subtract"}{" "}
                      the numerators
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1 * denominator2}{" "}
                          {operation === FractionOperation.ADD ? "+" : "−"}{" "}
                          {numerator2 * denominator1}
                        </div>
                        <div className="w-20 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1 * denominator2}
                        </div>
                      </div>
                      <span className="text-xl">=</span>
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {operation === FractionOperation.ADD
                            ? numerator1 * denominator2 +
                              numerator2 * denominator1
                            : numerator1 * denominator2 -
                              numerator2 * denominator1}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1 * denominator2}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 6: Convert back to mixed number if needed */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 6: Convert back to mixed number
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(
                        result.simplified.numerator,
                        result.simplified.denominator
                      )}
                      <span className="text-xl">=</span>
                      {renderMixedNumber(
                        formatFraction(result.simplified, true),
                        "text-blue-600 font-semibold"
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* For same denominators */}
              {denominator1 === denominator2 && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 3:{" "}
                      {operation === FractionOperation.ADD ? "Add" : "Subtract"}{" "}
                      the numerators (same denominators)
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1}{" "}
                          {operation === FractionOperation.ADD ? "+" : "−"}{" "}
                          {numerator2}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">{denominator1}</div>
                      </div>
                      <span className="text-xl">=</span>
                      {renderFraction(
                        result.simplified.numerator,
                        result.simplified.denominator
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 4: Convert back to mixed number
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(
                        result.simplified.numerator,
                        result.simplified.denominator
                      )}
                      <span className="text-xl">=</span>
                      {renderMixedNumber(
                        formatFraction(result.simplified, true),
                        "text-blue-600 font-semibold"
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* For Multiplication and Division - Show appropriate steps */}
          {(operation === FractionOperation.MULTIPLY ||
            operation === FractionOperation.DIVIDE) && (
            <>
              {operation === FractionOperation.MULTIPLY && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 3: Multiply numerators and denominators
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1} × {numerator2}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1} × {denominator2}
                        </div>
                      </div>
                      <span className="text-xl">=</span>
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">{numerator1 * numerator2}</div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1 * denominator2}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 4: Simplify and convert back to mixed number
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(
                        result.simplified.numerator,
                        result.simplified.denominator
                      )}
                      <span className="text-xl">=</span>
                      {renderMixedNumber(
                        formatFraction(result.simplified, true),
                        "text-blue-600 font-semibold"
                      )}
                    </div>
                  </div>
                </>
              )}

              {operation === FractionOperation.DIVIDE && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 3: Multiply by the reciprocal
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(numerator1, denominator1)}
                      <span className="text-xl">×</span>
                      {renderFraction(denominator2, numerator2)}
                      <span className="text-xl">=</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 4: Multiply numerators and denominators
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1} × {denominator2}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1} × {numerator2}
                        </div>
                      </div>
                      <span className="text-xl">=</span>
                      <div className="inline-flex flex-col items-center mx-2">
                        <div className="text-lg">
                          {numerator1 * denominator2}
                        </div>
                        <div className="w-16 h-0.5 bg-black my-1"></div>
                        <div className="text-lg">
                          {denominator1 * numerator2}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Step 5: Simplify and convert back to mixed number
                    </div>
                    <div className="flex items-center space-x-4">
                      {renderFraction(
                        result.simplified.numerator,
                        result.simplified.denominator
                      )}
                      <span className="text-xl">=</span>
                      {renderMixedNumber(
                        formatFraction(result.simplified, true),
                        "text-blue-600 font-semibold"
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
