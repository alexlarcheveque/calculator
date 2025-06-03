"use client";

import { useState, useEffect, useCallback } from "react";
import AutoLoanForm from "@/components/auto-loan/AutoLoanForm";
import AutoLoanSummary from "@/components/auto-loan/AutoLoanSummary";
import AutoLoanCharts from "@/components/auto-loan/AutoLoanCharts";
import AmortizationTable from "@/components/auto-loan/AmortizationTable";
import AutoLoanBasics from "@/components/auto-loan/AutoLoanBasics";
import AutoLoanFinancing from "@/components/auto-loan/AutoLoanFinancing";
import AutoLoanCostFactors from "@/components/auto-loan/AutoLoanCostFactors";
import FAQSection from "@/components/auto-loan/FAQSection";
import { AutoLoanFormValues, AutoLoanResults } from "@/types/autoLoan";
import { calculateAutoLoan } from "@/utils/autoLoanCalculations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  const [formValues, setFormValues, isInitialized] =
    useLocalStorage<AutoLoanFormValues>(
      "autoLoanFormValues",
      initialFormValues
    );
  const [results, setResults] = useState<AutoLoanResults | null>(null);

  const handleFormChange = useCallback(
    (name: string, value: string | number | boolean) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [setFormValues]
  );

  useEffect(() => {
    // Only calculate after localStorage has initialized to avoid calculations with default values
    if (!isInitialized) return;

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
  }, [formValues, isInitialized]);

  // Show loading state until localStorage has initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your saved data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <AutoLoanForm values={formValues} onChange={handleFormChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <AutoLoanSummary results={results} />
              {results.monthlyAmortization &&
                results.monthlyAmortization.length > 0 && (
                  <AutoLoanCharts
                    results={results}
                    amortizationData={results.monthlyAmortization}
                    loanTermMonths={formValues.loanTermMonths}
                  />
                )}
              {results.monthlyAmortization &&
                results.monthlyAmortization.length > 0 && (
                  <AmortizationTable
                    monthlyData={results.monthlyAmortization}
                    yearlyData={results.yearlyAmortization}
                    loanTermMonths={formValues.loanTermMonths}
                  />
                )}
            </>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <AutoLoanBasics />
        <AutoLoanFinancing />
        <AutoLoanCostFactors />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
