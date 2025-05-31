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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Interest Rate Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Advanced interest rate calculator for reverse-engineering rates from
          payment information. Discover the actual APR when you know loan
          amount, monthly payment, and term length. Perfect for verifying dealer
          financing quotes, comparing loan offers, and detecting rate markups.
          Uses Newton-Raphson method for precise calculations. Essential for
          auto loans, personal loans, and mortgage verification. Features
          detailed amortization schedules, payment breakdowns, and rate analysis
          to help you make informed borrowing decisions and negotiate better
          loan terms.
        </p>
      </div>

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

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
