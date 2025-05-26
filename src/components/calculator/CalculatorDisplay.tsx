"use client";

import { CalculationHistory } from "@/types/calculator";

interface CalculatorDisplayProps {
  input: string;
  output: string;
  history: CalculationHistory[];
}

export default function CalculatorDisplay({
  input,
  output,
  history,
}: CalculatorDisplayProps) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-t-lg">
      {/* Input display */}
      <div className="text-sm text-gray-400 min-h-[20px] mb-2 text-right">
        {input || "\u00A0"}
      </div>

      {/* Output display */}
      <div className="text-2xl font-mono text-right min-h-[40px] flex items-center justify-end">
        {output}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-2">
          <div className="text-xs text-gray-500 mb-2">History:</div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {history.slice(-5).map((item, index) => (
              <div
                key={index}
                className="text-xs text-gray-400 flex justify-between"
              >
                <span className="truncate mr-2">{item.expression}</span>
                <span className="text-gray-300">{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
