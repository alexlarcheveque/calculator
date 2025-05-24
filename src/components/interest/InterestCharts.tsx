"use client";

import {
  InterestCalculatorInput,
  InterestCalculatorResult,
} from "./InterestPage";
import BreakdownPieChart from "./BreakdownPieChart"; // This will be a new component
import AccumulationLineChart from "./AccumulationLineChart"; // This will be a new component

interface InterestChartsProps {
  inputs: Partial<InterestCalculatorInput>;
  results: InterestCalculatorResult;
}

export default function InterestCharts({
  inputs,
  results,
}: InterestChartsProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary text-center">
          Investment Breakdown
        </h2>
        <BreakdownPieChart results={results} />
      </div>
      {results.accumulationSchedule &&
        results.accumulationSchedule.length > 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary text-center">
              Investment Growth Over Time
            </h2>
            <AccumulationLineChart
              schedule={results.accumulationSchedule}
              investmentLengthYears={inputs.investmentLengthYears || 0}
            />
          </div>
        )}
    </div>
  );
}
