"use client";

import { useState, useEffect } from "react";
import InflationForm from "@/components/inflation/InflationForm";
import InflationSummary from "@/components/inflation/InflationSummary";
import InflationCharts from "@/components/inflation/InflationCharts";
import InflationBasics from "@/components/inflation/InflationBasics";
import EconomicImpacts from "@/components/inflation/EconomicImpacts";
import ProtectionStrategies from "@/components/inflation/ProtectionStrategies";
import InflationFAQSection from "@/components/inflation/FAQSection";
import {
  calculateInflationWithCPI,
  calculateForwardInflation,
  calculateBackwardInflation,
} from "@/utils/inflationCalculations";
import {
  InflationFormValues,
  InflationResults,
  InflationCalculatorType,
} from "@/types/inflation";

export default function InflationPage() {
  const [formValues, setFormValues] = useState<InflationFormValues>({
    calculatorType: InflationCalculatorType.CPI_DATA,
    startingAmount: 100,
    startMonth: 1,
    startYear: 2015,
    endMonth: 1,
    endYear: 2025,
    inflationRate: 3,
    years: 10,
  });

  const [results, setResults] = useState<InflationResults | null>(null);

  useEffect(() => {
    const {
      calculatorType,
      startingAmount,
      startMonth,
      startYear,
      endMonth,
      endYear,
      inflationRate,
      years,
    } = formValues;

    if (startingAmount <= 0) {
      return;
    }

    let inflationResults: InflationResults;

    switch (calculatorType) {
      case InflationCalculatorType.CPI_DATA:
        inflationResults = calculateInflationWithCPI({
          startingAmount,
          startMonth,
          startYear,
          endMonth,
          endYear,
        });
        break;
      case InflationCalculatorType.FORWARD_RATE:
        if (inflationRate <= 0 || years <= 0) return;
        inflationResults = calculateForwardInflation({
          startingAmount,
          inflationRate,
          years,
        });
        break;
      case InflationCalculatorType.BACKWARD_RATE:
        if (inflationRate <= 0 || years <= 0) return;
        inflationResults = calculateBackwardInflation({
          startingAmount,
          inflationRate,
          years,
        });
        break;
      default:
        return;
    }

    setResults(inflationResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCalculatorTypeChange = (type: InflationCalculatorType) => {
    setFormValues({ ...formValues, calculatorType: type });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <InflationForm
            values={formValues}
            onChange={handleInputChange}
            onCalculatorTypeChange={handleCalculatorTypeChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <InflationSummary results={results} />
              <InflationCharts results={results} />
              <InflationTable results={results} />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter values to calculate inflation impact.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <InflationBasics />
        <EconomicImpacts />
        <ProtectionStrategies />
      </div>

      {/* FAQ Section */}
      <InflationFAQSection />
    </div>
  );
}
