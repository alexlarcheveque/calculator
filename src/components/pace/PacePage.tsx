"use client";

import { useState, useEffect } from "react";
import PaceForm from "@/components/pace/PaceForm";
import PaceSummary from "@/components/pace/PaceSummary";
import PaceCharts from "@/components/pace/PaceCharts";
import WorldRecordsTable from "@/components/pace/WorldRecordsTable";
import PaceTrainingGuide from "@/components/pace/PaceTrainingGuide";
import RunningMetricsGuide from "@/components/pace/RunningMetricsGuide";
import FAQSection from "@/components/pace/FAQSection";
import {
  CalculatorType,
  DistanceUnit,
  PaceUnit,
  PaceFormValues,
  PaceResults,
} from "@/types/pace";
import { calculatePace } from "@/utils/paceCalculations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function PacePage() {
  const [formValues, setFormValues] = useLocalStorage<PaceFormValues>(
    "paceFormValues",
    {
      calculatorType: CalculatorType.PACE,
      time: "00:50:25",
      distance: 5,
      distanceUnit: DistanceUnit.MILES,
      pace: "00:08:10",
      paceUnit: PaceUnit.TIME_PER_MILE,
    }
  );

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

  const handlePresetChange = (updates: Partial<PaceFormValues>) => {
    setFormValues((prev) => ({ ...prev, ...updates }));
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
          <PaceForm
            values={formValues}
            onChange={handleInputChange}
            onPresetChange={handlePresetChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <PaceSummary
                results={results}
                calculationType={getCalculationTypeLabel()}
                formValues={formValues}
              />
              <PaceCharts results={results} formValues={formValues} />
              <WorldRecordsTable />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter your pace, time, or distance to calculate running metrics.
            </p>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 mb-16">
        <PaceTrainingGuide />
        <RunningMetricsGuide />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
