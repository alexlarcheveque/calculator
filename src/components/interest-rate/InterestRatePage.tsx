"use client";

import { useState, useEffect } from "react";
import {
  calculateInterestRate,
  calculateAmortizationSchedule,
} from "@/utils/interestRateCalculations";
import {
  InterestRateFormValues,
  InterestRateResults,
  AmortizationDataPoint,
} from "@/types/interestRate";
import FAQSection from "@/components/interest-rate/FAQSection";
import InterestRateForm from "@/components/interest-rate/InterestRateForm";
import InterestRateSummary from "@/components/interest-rate/InterestRateSummary";
import InterestRateCharts from "@/components/interest-rate/InterestRateCharts";
import AmortizationTable from "@/components/interest-rate/AmortizationTable";
import InterestRateBasics from "@/components/interest-rate/InterestRateBasics";
import InterestRateFactors from "@/components/interest-rate/InterestRateFactors";
import InterestRateStrategies from "@/components/interest-rate/InterestRateStrategies";

export default function InterestRatePage() {
  const [formValues, setFormValues] = useState<InterestRateFormValues>({
    loanAmount: 32000,
    loanTermYears: 3,
    loanTermMonths: 0,
    monthlyPayment: 960,
  });

  const [results, setResults] = useState<InterestRateResults | null>(null);
  const [amortizationData, setAmortizationData] = useState<
    AmortizationDataPoint[]
  >([]);

  useEffect(() => {
    const { loanAmount, loanTermYears, loanTermMonths, monthlyPayment } =
      formValues;

    if (
      loanAmount <= 0 ||
      monthlyPayment <= 0 ||
      (loanTermYears === 0 && loanTermMonths === 0)
    ) {
      return;
    }

    // Check if monthly payment is sufficient to pay off the loan
    const totalPayments = loanTermYears * 12 + loanTermMonths;
    const minimumPayment = loanAmount / totalPayments;

    if (monthlyPayment < minimumPayment) {
      return;
    }

    const interestRateResults = calculateInterestRate({
      loanAmount,
      loanTermYears,
      loanTermMonths,
      monthlyPayment,
    });

    const schedule = calculateAmortizationSchedule({
      loanAmount,
      loanTermYears,
      loanTermMonths,
      monthlyPayment,
    });

    setResults(interestRateResults);
    setAmortizationData(schedule);
  }, [formValues]);

  const handleInputChange = (name: string, value: number) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <InterestRateForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <InterestRateSummary results={results} />
              <InterestRateCharts
                results={results}
                amortizationData={amortizationData}
              />
              <AmortizationTable data={amortizationData} />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter loan details to calculate the interest rate automatically.
            </p>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 mb-8">
        <InterestRateBasics />
        <InterestRateFactors />
        <InterestRateStrategies />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
