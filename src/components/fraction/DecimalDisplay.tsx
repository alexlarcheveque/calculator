import React from "react";

interface DecimalDisplayProps {
  decimal: number;
  label?: string;
  precision?: number;
  showAsPercentage?: boolean;
  className?: string;
}

export default function DecimalDisplay({
  decimal,
  label = "Decimal",
  precision = 6,
  showAsPercentage = false,
  className = "",
}: DecimalDisplayProps) {
  const formatDecimal = (value: number, places: number) => {
    if (!isFinite(value)) return "∞";
    return value.toFixed(places);
  };

  const getDecimalColor = (value: number) => {
    if (value === 0) return "text-gray-600";
    if (value > 0) return "text-emerald-600";
    return "text-rose-600";
  };

  const isInteger = decimal % 1 === 0;
  const absoluteValue = Math.abs(decimal);
  const formattedDecimal = formatDecimal(decimal, precision);
  const percentage = decimal * 100;

  // Split the decimal into integer and fractional parts for styling
  const [integerPart, fractionalPart] = formattedDecimal.split(".");

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200/60 ${className}`}
    >
      <div className="text-center">
        <h4 className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-3">
          {label}
        </h4>

        {/* Main Decimal Display */}
        <div className="flex items-baseline justify-center space-x-1 mb-4">
          <span className={`text-4xl font-light ${getDecimalColor(decimal)}`}>
            {integerPart}
          </span>
          {fractionalPart && (
            <>
              <span className={`text-3xl ${getDecimalColor(decimal)}`}>.</span>
              <span
                className={`text-2xl font-light ${getDecimalColor(
                  decimal
                )} opacity-80`}
              >
                {fractionalPart}
              </span>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="space-y-2">
          {/* Percentage Display */}
          {showAsPercentage && (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-slate-500 text-sm">≈</span>
              <span
                className={`text-lg font-medium ${getDecimalColor(decimal)}`}
              >
                {percentage.toFixed(2)}%
              </span>
            </div>
          )}

          {/* Precision Indicator */}
          {!isInteger && precision > 0 && (
            <div className="text-xs text-slate-500">
              Rounded to {precision} decimal places
            </div>
          )}

          {/* Special Cases */}
          {isInteger && (
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Exact Integer
            </div>
          )}

          {Math.abs(decimal - Math.round(decimal * 1000) / 1000) < 0.0001 &&
            !isInteger && (
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Simple Decimal
              </div>
            )}
        </div>

        {/* Alternative Representations */}
        <div className="mt-4 pt-4 border-t border-slate-200/60">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-slate-600">
              <span className="font-medium">Scientific:</span>
              <div className="font-mono text-slate-800">
                {decimal.toExponential(3)}
              </div>
            </div>
            <div className="text-slate-600">
              <span className="font-medium">Fraction:</span>
              <div className="font-mono text-slate-800">
                {absoluteValue < 1
                  ? `≈ 1/${Math.round(1 / absoluteValue)}`
                  : `≈ ${Math.round(absoluteValue)}/1`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
