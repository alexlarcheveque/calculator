import React from "react";
import { FractionOperation } from "@/types/fraction";

interface BigNumberCalculationSummaryProps {
  numerator1: string;
  denominator1: string;
  numerator2: string;
  denominator2: string;
  operation: FractionOperation;
  resultNumerator: string;
  resultDenominator: string;
  decimal: number;
}

export default function BigNumberCalculationSummary({
  numerator1,
  denominator1,
  numerator2,
  denominator2,
  operation,
  resultNumerator,
  resultDenominator,
  decimal,
}: BigNumberCalculationSummaryProps) {
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

  const getOperationName = (op: FractionOperation) => {
    switch (op) {
      case FractionOperation.ADD:
        return "Addition";
      case FractionOperation.SUBTRACT:
        return "Subtraction";
      case FractionOperation.MULTIPLY:
        return "Multiplication";
      case FractionOperation.DIVIDE:
        return "Division";
      default:
        return "Operation";
    }
  };

  const renderBigFraction = (num: string, den: string, className = "") => (
    <div className={`inline-flex flex-col items-center mx-2 ${className}`}>
      <div className="text-sm font-medium text-center break-all max-w-32">
        {num}
      </div>
      <div className="w-32 h-0.5 bg-black my-1"></div>
      <div className="text-sm font-medium text-center break-all max-w-32">
        {den}
      </div>
    </div>
  );

  // Helper functions for big number operations (simplified for display)
  const gcdBig = (a: string, b: string): string => {
    try {
      let aBig = BigInt(a);
      let bBig = BigInt(b);
      aBig = aBig < BigInt(0) ? -aBig : aBig;
      bBig = bBig < BigInt(0) ? -bBig : bBig;
      while (bBig !== BigInt(0)) {
        const temp = bBig;
        bBig = aBig % bBig;
        aBig = temp;
      }
      return aBig.toString();
    } catch {
      return "1";
    }
  };

  const lcmBig = (a: string, b: string): string => {
    try {
      const aBig = BigInt(a);
      const bBig = BigInt(b);
      const gcd = BigInt(gcdBig(a, b));
      return ((aBig * bBig) / gcd).toString();
    } catch {
      return (BigInt(a) * BigInt(b)).toString();
    }
  };

  // Calculate intermediate steps based on operation
  let intermediateSteps = [];

  if (
    operation === FractionOperation.ADD ||
    operation === FractionOperation.SUBTRACT
  ) {
    const commonDen = lcmBig(denominator1, denominator2);
    const adjustedNum1 = (
      (BigInt(numerator1) * BigInt(commonDen)) /
      BigInt(denominator1)
    ).toString();
    const adjustedNum2 = (
      (BigInt(numerator2) * BigInt(commonDen)) /
      BigInt(denominator2)
    ).toString();

    intermediateSteps = [
      {
        title: "Find common denominator (LCM)",
        content: `LCM of ${denominator1} and ${denominator2} = ${commonDen}`,
      },
      {
        title: "Convert to equivalent fractions",
        content: `${numerator1}/${denominator1} = ${adjustedNum1}/${commonDen} and ${numerator2}/${denominator2} = ${adjustedNum2}/${commonDen}`,
      },
      {
        title: `${
          operation === FractionOperation.ADD ? "Add" : "Subtract"
        } numerators`,
        content: `${adjustedNum1} ${getOperationSymbol(
          operation
        )} ${adjustedNum2} = ${
          operation === FractionOperation.ADD
            ? (BigInt(adjustedNum1) + BigInt(adjustedNum2)).toString()
            : (BigInt(adjustedNum1) - BigInt(adjustedNum2)).toString()
        }`,
      },
    ];
  } else if (operation === FractionOperation.MULTIPLY) {
    intermediateSteps = [
      {
        title: "Multiply numerators and denominators",
        content: `(${numerator1} × ${numerator2}) / (${denominator1} × ${denominator2})`,
      },
      {
        title: "Calculate products",
        content: `${(BigInt(numerator1) * BigInt(numerator2)).toString()} / ${(
          BigInt(denominator1) * BigInt(denominator2)
        ).toString()}`,
      },
    ];
  } else if (operation === FractionOperation.DIVIDE) {
    intermediateSteps = [
      {
        title: "Multiply by reciprocal",
        content: `${numerator1}/${denominator1} × ${denominator2}/${numerator2}`,
      },
      {
        title: "Multiply numerators and denominators",
        content: `(${numerator1} × ${denominator2}) / (${denominator1} × ${numerator2})`,
      },
      {
        title: "Calculate products",
        content: `${(
          BigInt(numerator1) * BigInt(denominator2)
        ).toString()} / ${(
          BigInt(denominator1) * BigInt(numerator2)
        ).toString()}`,
      },
    ];
  }

  // Check if result was simplified
  const originalNum =
    operation === FractionOperation.MULTIPLY
      ? (BigInt(numerator1) * BigInt(numerator2)).toString()
      : operation === FractionOperation.DIVIDE
      ? (BigInt(numerator1) * BigInt(denominator2)).toString()
      : "calculated";

  const originalDen =
    operation === FractionOperation.MULTIPLY
      ? (BigInt(denominator1) * BigInt(denominator2)).toString()
      : operation === FractionOperation.DIVIDE
      ? (BigInt(denominator1) * BigInt(numerator2)).toString()
      : "calculated";

  const wasSimplified =
    originalNum !== "calculated" &&
    (originalNum !== resultNumerator || originalDen !== resultDenominator);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Big Number Fraction Calculator
      </h2>
      <p className="text-gray-600 mb-6">
        Perform arithmetic operations on fractions with very large numbers using
        arbitrary precision arithmetic. This calculator can handle numbers with
        hundreds of digits.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Calculation Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center space-x-4 text-xl flex-wrap">
          {renderBigFraction(numerator1, denominator1)}
          <span className="text-2xl font-medium">
            {getOperationSymbol(operation)}
          </span>
          {renderBigFraction(numerator2, denominator2)}
          <span className="text-2xl font-medium">=</span>
          {renderBigFraction(
            resultNumerator,
            resultDenominator,
            "text-blue-600"
          )}
        </div>
      </div>

      {/* Decimal Approximation */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>Decimal approximation:</strong>{" "}
          <span className="font-mono text-blue-600">
            {isFinite(decimal) ? decimal.toFixed(10) : "Too large to display"}
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Calculation Steps */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {getOperationName(operation)} steps:
        </h4>

        <div className="space-y-6">
          {/* Step 1: Original equation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step 1: Original equation
            </div>
            <div className="flex items-center space-x-4 flex-wrap">
              {renderBigFraction(numerator1, denominator1)}
              <span className="text-xl">{getOperationSymbol(operation)}</span>
              {renderBigFraction(numerator2, denominator2)}
              <span className="text-xl">=</span>
            </div>
          </div>

          {/* Intermediate steps */}
          {intermediateSteps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">
                Step {index + 2}: {step.title}
              </div>
              <div className="text-sm text-gray-700 break-all">
                {step.content}
              </div>
            </div>
          ))}

          {/* Simplification step */}
          {wasSimplified && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">
                Step {intermediateSteps.length + 2}: Simplify the result
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Find GCD and divide both numerator and denominator by it
                </p>
                <div className="flex items-center space-x-4 flex-wrap">
                  {renderBigFraction(
                    resultNumerator,
                    resultDenominator,
                    "text-blue-600 font-semibold"
                  )}
                  <span className="text-sm text-gray-600">
                    (simplified form)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Final result */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Final result:
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4 flex-wrap">
                {renderBigFraction(
                  resultNumerator,
                  resultDenominator,
                  "text-blue-600 font-semibold"
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p>Numerator: {resultNumerator}</p>
                <p>Denominator: {resultDenominator}</p>
                <p>
                  Decimal:{" "}
                  {isFinite(decimal) ? decimal.toFixed(10) : "Value too large"}
                </p>
              </div>
            </div>
          </div>

          {/* Big number info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-800 mb-2">
              Big Number Information:
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Numerator has {resultNumerator.length} digits</p>
              <p>• Denominator has {resultDenominator.length} digits</p>
              <p>• This calculator uses arbitrary precision arithmetic</p>
              <p>
                • Results are exact (not approximations) until converted to
                decimal
              </p>
            </div>
          </div>

          {/* Performance note */}
          {(resultNumerator.length > 50 || resultDenominator.length > 50) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Very large numbers may take longer to
                process and display. The decimal approximation is limited to
                prevent browser performance issues.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
