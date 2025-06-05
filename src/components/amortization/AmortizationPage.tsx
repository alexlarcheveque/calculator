"use client";

import { useState, useEffect } from "react";
import AmortizationForm from "@/components/amortization/AmortizationForm";
import AmortizationSummary from "@/components/amortization/AmortizationSummary";
import AmortizationCharts from "@/components/amortization/AmortizationCharts";
import AmortizationTableWrapper from "@/components/amortization/AmortizationTableWrapper";
import AmortizationFAQSection from "@/components/amortization/AmortizationFAQ";
import AmortizationBasics from "@/components/amortization/AmortizationBasics";
import AmortizationStrategies from "@/components/amortization/AmortizationStrategies";
import AmortizationBenefits from "@/components/amortization/AmortizationBenefits";
import {
  calculateAmortization,
  calculateAmortizationSchedule,
} from "@/utils/amortizationCalculations";
import {
  AmortizationFormValues,
  AmortizationResults,
  AmortizationScheduleItem,
} from "@/types/amortization";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function AmortizationPage() {
  const [formValues, setFormValues] = useLocalStorage<AmortizationFormValues>(
    "amortizationFormValues",
    {
      loanAmount: 200000,
      loanTermYears: 15,
      loanTermMonths: 0,
      interestRate: 6.0,
      startDate: new Date(),
      extraPayments: {
        monthlyExtra: 0,
        monthlyExtraStartDate: new Date(),
        yearlyExtra: 0,
        yearlyExtraStartDate: new Date(),
        oneTimePayments: [],
      },
    }
  );

  const [results, setResults] = useState<AmortizationResults | null>(null);
  const [scheduleData, setScheduleData] = useState<AmortizationScheduleItem[]>(
    []
  );

  useEffect(() => {
    const {
      loanAmount,
      loanTermYears,
      loanTermMonths,
      interestRate,
      startDate,
      extraPayments,
    } = formValues;

    // Validate inputs
    if (
      loanAmount <= 0 ||
      interestRate < 0 ||
      (loanTermYears === 0 && loanTermMonths === 0)
    ) {
      return;
    }

    try {
      const amortizationResults = calculateAmortization({
        loanAmount,
        interestRate,
        loanTermYears,
        loanTermMonths,
        startDate,
        extraPayments,
      });

      const schedule = calculateAmortizationSchedule({
        loanAmount,
        interestRate,
        loanTermYears,
        loanTermMonths,
        startDate,
        extraPayments,
      });

      setResults(amortizationResults);
      setScheduleData(schedule);
    } catch (error) {
      console.error("Error calculating amortization:", error);
    }
  }, [formValues]);

  const handleInputChange = (name: string, value: any) => {
    if (name === "extraPayments") {
      setFormValues((prev) => ({
        ...prev,
        extraPayments: value,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <AmortizationForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && scheduleData.length > 0 && (
            <>
              <AmortizationSummary
                results={results}
                originalLoanTermYears={formValues.loanTermYears}
                originalLoanTermMonths={formValues.loanTermMonths}
              />
              <AmortizationCharts
                results={results}
                scheduleData={scheduleData}
              />
              <AmortizationTableWrapper data={scheduleData} />
            </>
          )}

          {(!results || scheduleData.length === 0) && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter loan details to generate an amortization schedule.
            </p>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 mb-8">
        <AmortizationBasics />
        <AmortizationStrategies />
        <AmortizationBenefits />
      </div>

      {/* FAQ Section */}
      <AmortizationFAQSection />
    </div>
  );
}
