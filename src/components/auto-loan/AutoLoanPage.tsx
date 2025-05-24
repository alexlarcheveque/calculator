"use client";

import { useState, useEffect, useCallback } from "react";
import AutoLoanForm from "@/components/auto-loan/AutoLoanForm";
import AutoLoanSummary from "@/components/auto-loan/AutoLoanSummary";
import AutoLoanCharts from "@/components/auto-loan/AutoLoanCharts";
import AmortizationTable from "@/components/auto-loan/AmortizationTable";
import FAQSection from "@/components/auto-loan/FAQSection";
import { AutoLoanFormValues, AutoLoanResults } from "@/types/autoLoan";
import { calculateAutoLoan } from "@/utils/autoLoanCalculations";

const initialFormValues: AutoLoanFormValues = {
  autoPrice: 50000,
  loanTermMonths: 60,
  interestRate: 5,
  cashIncentives: 0,
  downPayment: 10000,
  tradeInValue: 0,
  amountOwedOnTradeIn: 0,
  state: "CA", // Default to California as in example
  salesTaxRate: 7.25,
  titleRegFees: 2800,
  includeTaxesAndFeesInLoan: false, // HTML default is unchecked
};

export default function AutoLoanPage() {
  const [formValues, setFormValues] =
    useState<AutoLoanFormValues>(initialFormValues);
  const [results, setResults] = useState<AutoLoanResults | null>(null);

  const handleFormChange = useCallback(
    (name: string, value: string | number | boolean) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  useEffect(() => {
    // Basic validation to ensure essential numbers are present and positive for calculation
    if (
      formValues.autoPrice > 0 &&
      formValues.loanTermMonths > 0 &&
      formValues.interestRate >= 0 &&
      formValues.salesTaxRate >= 0
      // Add other critical validations if needed
    ) {
      const calculatedResults = calculateAutoLoan(formValues);
      setResults(calculatedResults);
    } else {
      // If inputs are not valid for a calculation (e.g. price is 0), clear results
      setResults(null);
    }
  }, [formValues]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <AutoLoanForm values={formValues} onChange={handleFormChange} />
        </div>
        {/* Right Column: Summary and Charts */}
        <div className="lg:col-span-2 space-y-8">
          <AutoLoanSummary results={results} />
          {results &&
            results.monthlyAmortization &&
            results.monthlyAmortization.length > 0 && (
              <AutoLoanCharts
                results={results}
                amortizationData={results.monthlyAmortization}
                loanTermMonths={formValues.loanTermMonths}
              />
            )}
        </div>
      </div>
      {/* Full Width: Amortization Table */}
      {results &&
        results.monthlyAmortization &&
        results.monthlyAmortization.length > 0 && (
          <div className="mt-8">
            <AmortizationTable
              monthlyData={results.monthlyAmortization}
              yearlyData={results.yearlyAmortization}
              loanTermMonths={formValues.loanTermMonths}
            />
          </div>
        )}
      {/* Full Width: FAQ Section */}
      <FAQSection />
    </div>
  );
}
