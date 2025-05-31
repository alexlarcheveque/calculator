"use client";

import { useState, useEffect } from "react";
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

export default function IncomeTaxPage() {
  const [formValues, setFormValues] = useState<IncomeTaxFormValues>({
    filingStatus: FilingStatus.SINGLE,
    youngDependents: 0,
    otherDependents: 0,
    taxYear: TaxYear.YEAR_2024,

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
  });

  const [results, setResults] = useState<IncomeTaxResults | null>(null);
  const [breakdown, setBreakdown] = useState<TaxCalculationBreakdown | null>(
    null
  );

  useEffect(() => {
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
  }, [formValues]);

  const handleInputChange = (
    name: string,
    value: number | string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Income Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your federal income tax liability with precision. Estimate
          taxes owed or refund expected based on your income, filing status,
          deductions, and credits. Compare standard vs. itemized deductions,
          understand tax brackets, and plan your tax strategy. Updated for 2024
          tax year with current rates and thresholds.
        </p>
      </div>

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
