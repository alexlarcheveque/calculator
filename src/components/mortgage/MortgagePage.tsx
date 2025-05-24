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

export default function MortgagePage() {
  const [formValues, setFormValues] = useState<MortgageFormValues>({
    calculatorType: CalculatorType.FIXED_30,
    homeValue: 400000,
    downPayment: 80000,
    loanTerm: 30,
    interestRate: 5.75,
    propertyTax: 3000,
    homeInsurance: 1500,
    hoa: 0,
  });

  const [results, setResults] = useState<MortgageResults | null>(null);
  const [amortizationData, setAmortizationData] = useState<
    AmortizationDataPoint[]
  >([]);

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
    const newValues = { ...formValues, [name]: value };

    // Ensure down payment isn't greater than home value
    if (name === "downPayment" && value > formValues.homeValue) {
      newValues.downPayment = formValues.homeValue;
    }

    setFormValues(newValues);
  };

  return (
    <div>
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

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
