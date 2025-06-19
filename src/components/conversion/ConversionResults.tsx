"use client";

import React from "react";
import { ConversionResult } from "@/types/conversion";
import {
  formatConversionValue,
  getUnitName,
  getUnitSymbol,
} from "@/utils/conversionUtils";

interface ConversionResultsProps {
  result: ConversionResult;
}

const ConversionResults: React.FC<ConversionResultsProps> = ({ result }) => {
  const fromUnitName = getUnitName(result.fromUnit, result.category);
  const fromUnitSymbol = getUnitSymbol(result.fromUnit, result.category);
  const toUnitName = getUnitName(result.toUnit, result.category);
  const toUnitSymbol = getUnitSymbol(result.toUnit, result.category);

  const formattedFromValue = formatConversionValue(result.fromValue);
  const formattedToValue = formatConversionValue(result.toValue);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Result</h2>
      <p className="text-sm text-gray-600 mb-6">Conversion result</p>

      <div className="space-y-4">
        {/* Main Conversion Result */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Conversion
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {formattedFromValue} {fromUnitSymbol} = {formattedToValue}{" "}
              {toUnitSymbol}
            </div>
            <div className="text-sm text-gray-600">
              {formattedFromValue} {fromUnitName} equals {formattedToValue}{" "}
              {toUnitName}
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Formula</h3>
          <div className="text-center">
            <code className="text-sm bg-white px-3 py-2 rounded border font-mono">
              {result.formula}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionResults;
