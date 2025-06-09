"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import IncomeTaxForm from "@/components/income-tax/IncomeTaxForm";
import IncomeTaxSummary from "@/components/income-tax/IncomeTaxSummary";
import IncomeTaxCharts from "@/components/income-tax/IncomeTaxCharts";
import TaxBasics from "@/components/income-tax/TaxBasics";
import DeductionsCredits from "@/components/income-tax/DeductionsCredits";
import TaxPlanning from "@/components/income-tax/TaxPlanning";
import IncomeTaxFAQSection from "@/components/income-tax/FAQSection";
import {
  calculateIncomeTax,
  calculateTaxBreakdown,
} from "@/utils/incomeTaxCalculations";
import {
  IncomeTaxFormValues,
  IncomeTaxResults,
  TaxCalculationBreakdown,
  FilingStatus,
  TaxYear,
} from "@/types/incomeTax";

const defaultFormValues: IncomeTaxFormValues = {
  filingStatus: FilingStatus.SINGLE,
  youngDependents: 0,
  otherDependents: 0,
  taxYear: TaxYear.YEAR_2025,

  // Person 1 Income
  salaryIncome: 80000,
  federalTaxWithheld: 9000,
  stateTaxWithheld: 0,
  localTaxWithheld: 0,
  hasBusiness: false,
  businessIncome: 0,
  estimatedTaxPaid: 0,
  medicareWages: 0,

  // Person 2 Income
  salaryIncome2: 0,
  federalTaxWithheld2: 0,
  stateTaxWithheld2: 0,
  localTaxWithheld2: 0,
  hasBusiness2: false,
  businessIncome2: 0,
  estimatedTaxPaid2: 0,
  medicareWages2: 0,

  // Other Income
  interestIncome: 0,
  ordinaryDividends: 0,
  qualifiedDividends: 0,
  passiveIncome: 0,
  shortTermCapitalGain: 0,
  longTermCapitalGain: 0,
  otherIncome: 0,
  stateLocalTaxRate: 0,

  // Deductions & Credits
  iraContributions: 0,
  realEstateTax: 0,
  mortgageInterest: 0,
  charitableDonations: 0,
  studentLoanInterest: 0,
  childCareExpense: 0,
  tuition1: 0,
  tuition2: 0,
  tuition3: 0,
  tuition4: 0,
  otherDeductibles: 0,
};

export default function IncomeTaxPage() {
  const [formValues, setFormValues, isFormLoaded] =
    useLocalStorage<IncomeTaxFormValues>(
      "income-tax-form-values",
      defaultFormValues
    );

  const [results, setResults] = useState<IncomeTaxResults | null>(null);
  const [breakdown, setBreakdown] = useState<TaxCalculationBreakdown | null>(
    null
  );

  useEffect(() => {
    // Only calculate if form values are loaded from localStorage
    if (!isFormLoaded) return;

    try {
      const taxResults = calculateIncomeTax(formValues);
      const taxBreakdown = calculateTaxBreakdown(formValues);

      setResults(taxResults);
      setBreakdown(taxBreakdown);
    } catch (error) {
      console.error("Error calculating tax:", error);
      setResults(null);
      setBreakdown(null);
    }
  }, [formValues, isFormLoaded]);

  const handleInputChange = (
    name: string,
    value: number | string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show loading state until localStorage data is loaded
  if (!isFormLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading calculator...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <IncomeTaxForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && breakdown && (
            <>
              <IncomeTaxSummary results={results} />
              <IncomeTaxCharts results={results} breakdown={breakdown} />
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter your income and tax information to calculate your federal
              tax liability.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <TaxBasics />
        <DeductionsCredits />
        <TaxPlanning />
      </div>

      {/* FAQ Section */}
      <IncomeTaxFAQSection />
    </div>
  );
}
