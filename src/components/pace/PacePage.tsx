"use client";

import { useState, useEffect } from "react";
import PaceForm from "@/components/pace/PaceForm";
import PaceSummary from "@/components/pace/PaceSummary";
import MultipointCalculator from "@/components/pace/MultipointCalculator";
import PaceConverter from "@/components/pace/PaceConverter";
import FinishTimeCalculator from "@/components/pace/FinishTimeCalculator";
import WorldRecordsTable from "@/components/pace/WorldRecordsTable";
import FAQSection from "@/components/pace/FAQSection";
import {
  CalculatorType,
  DistanceUnit,
  PaceUnit,
  PaceFormValues,
  PaceResults,
} from "@/types/pace";
import { calculatePace } from "@/utils/paceCalculations";

export default function PacePage() {
  const [formValues, setFormValues] = useState<PaceFormValues>({
    calculatorType: CalculatorType.PACE,
    time: "00:50:25",
    distance: 5,
    distanceUnit: DistanceUnit.MILES,
    pace: "00:08:10",
    paceUnit: PaceUnit.TIME_PER_MILE,
  });

  const [results, setResults] = useState<PaceResults | null>(null);

  useEffect(() => {
    // Calculate results when form values change
    if (
      (formValues.calculatorType === CalculatorType.PACE &&
        formValues.time &&
        formValues.distance > 0) ||
      (formValues.calculatorType === CalculatorType.TIME &&
        formValues.pace &&
        formValues.distance > 0) ||
      (formValues.calculatorType === CalculatorType.DISTANCE &&
        formValues.time &&
        formValues.pace)
    ) {
      const calculatedResults = calculatePace(formValues);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  }, [formValues]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getCalculationTypeLabel = () => {
    switch (formValues.calculatorType) {
      case CalculatorType.PACE:
        return "Pace";
      case CalculatorType.TIME:
        return "Time";
      case CalculatorType.DISTANCE:
        return "Distance";
      default:
        return "Result";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <PaceForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <PaceSummary
              results={results}
              calculationType={getCalculationTypeLabel()}
            />
          )}
        </div>
      </div>

      {/* Additional Calculators */}
      <div className="space-y-8 mb-16">
        {/* Multipoint Calculator */}
        <div id="multipoint">
          <MultipointCalculator />
        </div>

        {/* Pace Converter */}
        <div id="paceconverter">
          <PaceConverter />
        </div>

        {/* Finish Time Calculator */}
        <div id="finishtime">
          <FinishTimeCalculator />
        </div>

        {/* World Records Table */}
        <WorldRecordsTable />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
