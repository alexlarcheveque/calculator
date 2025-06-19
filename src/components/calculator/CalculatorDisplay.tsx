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
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 text-white p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)]"
        style={{ backgroundSize: "20px 20px" }}
      ></div>

      <div className="relative z-10">
        {/* Input display */}
        <div className="text-sm text-slate-400 min-h-[24px] mb-3 text-right font-light tracking-wide">
          {input || "\u00A0"}
        </div>

        {/* Output display */}
        <div className="text-3xl font-light text-right min-h-[48px] flex items-center justify-end tracking-tight">
          <span className="font-mono">{output}</span>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 border-t border-slate-700/50 pt-4">
            <div className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">
              Recent
            </div>
            <div className="max-h-28 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
              {history
                .slice(-4)
                .reverse()
                .map((item, index) => (
                  <div
                    key={`${item.timestamp.getTime()}-${index}`}
                    className="text-xs text-slate-400 flex justify-between items-center py-1 hover:text-slate-300 transition-colors"
                  >
                    <span className="truncate mr-3 font-mono">
                      {item.expression}
                    </span>
                    <span className="text-slate-300 font-mono flex-shrink-0">
                      {item.result}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
