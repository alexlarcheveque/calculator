"use client";

import { useState, useEffect } from "react";
import FinanceForm from "@/components/finance/FinanceForm";
import FinanceSummary from "@/components/finance/FinanceSummary";
import FinanceCharts from "@/components/finance/FinanceCharts";
import FinanceScheduleTable from "@/components/finance/FinanceScheduleTable";
import {
  calculateFinance,
  calculateFinanceSchedule,
} from "@/utils/financeCalculations";
import {
  FinanceFormValues,
  FinanceResults,
  FinanceScheduleDataPoint,
  CalculationType,
  PaymentTiming,
} from "@/types/finance";
import FinanceFAQSection from "@/components/finance/FinanceFAQSection";

export default function FinancePage() {
  const [formValues, setFormValues] = useState<FinanceFormValues>({
    calculationType: CalculationType.FV,
    numberOfPeriods: 10,
    interestPerYear: 6,
    presentValue: 20000,
    periodicPayment: -2000,
    futureValue: -10000,
    periodsPerYear: 1,
    compoundingPerYear: 1,
    paymentTiming: PaymentTiming.END,
  });

  const [results, setResults] = useState<FinanceResults | null>(null);
  const [scheduleData, setScheduleData] = useState<FinanceScheduleDataPoint[]>(
    []
  );

  useEffect(() => {
    const {
      calculationType,
      numberOfPeriods,
      interestPerYear,
      presentValue,
      periodicPayment,
      futureValue,
      periodsPerYear,
      compoundingPerYear,
      paymentTiming,
    } = formValues;

    // Validate inputs based on calculation type
    const hasRequiredInputs = validateInputs(formValues);

    if (!hasRequiredInputs) {
      return;
    }

    try {
      const financeResults = calculateFinance({
        calculationType,
        numberOfPeriods:
          calculationType !== CalculationType.N ? numberOfPeriods : undefined,
        interestPerYear:
          calculationType !== CalculationType.IY ? interestPerYear : undefined,
        presentValue:
          calculationType !== CalculationType.PV ? presentValue : undefined,
        periodicPayment:
          calculationType !== CalculationType.PMT ? periodicPayment : undefined,
        futureValue:
          calculationType !== CalculationType.FV ? futureValue : undefined,
        periodsPerYear,
        compoundingPerYear,
        paymentTiming,
      });

      const schedule = calculateFinanceSchedule({
        calculationType,
        numberOfPeriods: financeResults.numberOfPeriods,
        interestPerYear: financeResults.interestPerYear,
        presentValue: financeResults.presentValue,
        periodicPayment: financeResults.periodicPayment,
        futureValue: financeResults.futureValue,
        periodsPerYear,
        compoundingPerYear,
        paymentTiming,
      });

      setResults(financeResults);
      setScheduleData(schedule);
    } catch (error) {
      console.error("Calculation error:", error);
      setResults(null);
      setScheduleData([]);
    }
  }, [formValues]);

  const validateInputs = (values: FinanceFormValues): boolean => {
    const {
      calculationType,
      numberOfPeriods,
      interestPerYear,
      presentValue,
      periodicPayment,
      futureValue,
    } = values;

    switch (calculationType) {
      case CalculationType.FV:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined
        );
      case CalculationType.PV:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          futureValue !== undefined &&
          periodicPayment !== undefined
        );
      case CalculationType.PMT:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          presentValue !== undefined &&
          futureValue !== undefined
        );
      case CalculationType.N:
        return (
          interestPerYear > 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined &&
          futureValue !== undefined
        );
      case CalculationType.IY:
        return (
          numberOfPeriods > 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined &&
          futureValue !== undefined
        );
      default:
        return false;
    }
  };

  const handleInputChange = (name: string, value: number | string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculationTypeChange = (calculationType: CalculationType) => {
    setFormValues((prev) => ({
      ...prev,
      calculationType,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <FinanceForm
            values={formValues}
            onChange={handleInputChange}
            onCalculationTypeChange={handleCalculationTypeChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <FinanceSummary
                results={results}
                calculationType={formValues.calculationType}
              />
              <FinanceCharts results={results} scheduleData={scheduleData} />
              <FinanceScheduleTable data={scheduleData} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FinanceFAQSection />
    </div>
  );
}
