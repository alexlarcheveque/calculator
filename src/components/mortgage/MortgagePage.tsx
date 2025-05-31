"use client";

import { useState, useEffect } from "react";
import MortgageForm from "@/components/mortgage/MortgageForm";
import MortgageSummary from "@/components/mortgage/MortgageSummary";
import MortgageCharts from "@/components/mortgage/MortgageCharts";
import AmortizationTable from "@/components/mortgage/AmortizationTable";
import {
  calculateMortgage,
  calculateAmortizationSchedule,
} from "@/utils/mortgageCalculations";
import {
  MortgageFormValues,
  MortgageResults,
  AmortizationDataPoint,
  CalculatorType,
} from "@/types/mortgage";
import FAQSection from "@/components/mortgage/FAQSection";
import MortgageBasics from "@/components/mortgage/MortgageBasics";
import MortgageQualification from "@/components/mortgage/MortgageQualification";
import MortgageRateTips from "@/components/mortgage/MortgageRateTips";
import MortgageFAQSection from "@/components/mortgage/FAQSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function MortgagePage() {
  const [formValues, setFormValues] = useLocalStorage<MortgageFormValues>(
    "mortgageFormValues",
    {
      calculatorType: CalculatorType.FIXED_30,
      homeValue: 400000,
      downPayment: 80000,
      loanTerm: 30,
      interestRate: 5.75,
      propertyTax: 3000,
      homeInsurance: 1500,
      hoa: 0,
    }
  );

  const [results, setResults] = useState<MortgageResults | null>(null);
  const [amortizationData, setAmortizationData] = useState<
    AmortizationDataPoint[]
  >([]);

  // Calculate mortgage results whenever form values change
  useEffect(() => {
    const {
      homeValue,
      downPayment,
      loanTerm,
      interestRate,
      propertyTax,
      homeInsurance,
      hoa,
    } = formValues;

    const loanAmount = homeValue - downPayment;

    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      return;
    }

    const mortgageResults = calculateMortgage({
      loanAmount,
      interestRate,
      loanTerm,
      propertyTax,
      homeInsurance,
      hoa,
    });

    const schedule = calculateAmortizationSchedule({
      loanAmount,
      interestRate,
      loanTerm,
    });

    setResults(mortgageResults);
    setAmortizationData(schedule);
  }, [formValues]);

  const handleInputChange = (name: string, value: number) => {
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };

      // Ensure down payment isn't greater than home value
      if (name === "downPayment" && value > prevValues.homeValue) {
        newValues.downPayment = prevValues.homeValue;
      }

      return newValues;
    });
  };

  console.log("amortization data", amortizationData);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Mortgage Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate monthly mortgage payments, total interest costs, and
          amortization schedules for any home loan. Compare 15-year vs 30-year
          mortgages, determine affordability based on your income, and
          understand how down payments and interest rates affect your monthly
          housing costs. Essential for home buyers, refinancing decisions, and
          mortgage planning with detailed payment breakdowns and charts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <MortgageForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <MortgageSummary results={results} />
              <MortgageCharts
                results={results}
                amortizationData={amortizationData}
              />
              <AmortizationTable data={amortizationData} />
            </>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8">
        <MortgageBasics />
        <MortgageQualification />
        <MortgageRateTips />
      </div>

      {/* FAQ Section */}
      <MortgageFAQSection />
    </div>
  );
}
