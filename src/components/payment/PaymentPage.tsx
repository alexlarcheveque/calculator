"use client";

import { useState, useEffect } from "react";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentSummary from "@/components/payment/PaymentSummary";
import PaymentCharts from "@/components/payment/PaymentCharts";
import AmortizationTable from "@/components/payment/AmortizationTable";
import PaymentBasics from "@/components/payment/PaymentBasics";
import PaymentStrategies from "@/components/payment/PaymentStrategies";
import LoanTerms from "@/components/payment/LoanTerms";
import PaymentFAQSection from "@/components/payment/FAQSection";
import {
  calculatePayment,
  calculatePaymentAmortizationSchedule,
} from "@/utils/paymentCalculations";
import {
  PaymentFormValues,
  PaymentResults,
  PaymentAmortizationDataPoint,
  PaymentCalculatorMode,
} from "@/types/payment";

export default function PaymentPage() {
  const [formValues, setFormValues] = useState<PaymentFormValues>({
    calculatorMode: PaymentCalculatorMode.FIXED_TERM,
    loanAmount: 200000,
    loanTermYears: 15,
    monthlyPayment: 2000,
    interestRate: 6,
  });

  const [results, setResults] = useState<PaymentResults | null>(null);
  const [amortizationData, setAmortizationData] = useState<
    PaymentAmortizationDataPoint[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const {
      calculatorMode,
      loanAmount,
      loanTermYears,
      monthlyPayment,
      interestRate,
    } = formValues;

    if (loanAmount <= 0 || interestRate < 0) {
      setResults(null);
      setAmortizationData([]);
      setError(null);
      return;
    }

    if (
      calculatorMode === PaymentCalculatorMode.FIXED_TERM &&
      loanTermYears <= 0
    ) {
      setResults(null);
      setAmortizationData([]);
      setError(null);
      return;
    }

    if (
      calculatorMode === PaymentCalculatorMode.FIXED_PAYMENT &&
      monthlyPayment <= 0
    ) {
      setResults(null);
      setAmortizationData([]);
      setError(null);
      return;
    }

    try {
      const paymentResults = calculatePayment({
        loanAmount,
        interestRate,
        calculatorMode,
        loanTermYears:
          calculatorMode === PaymentCalculatorMode.FIXED_TERM
            ? loanTermYears
            : undefined,
        monthlyPayment:
          calculatorMode === PaymentCalculatorMode.FIXED_PAYMENT
            ? monthlyPayment
            : undefined,
      });

      const schedule = calculatePaymentAmortizationSchedule({
        loanAmount,
        interestRate,
        calculatorMode,
        loanTermYears:
          calculatorMode === PaymentCalculatorMode.FIXED_TERM
            ? loanTermYears
            : undefined,
        monthlyPayment:
          calculatorMode === PaymentCalculatorMode.FIXED_PAYMENT
            ? monthlyPayment
            : undefined,
      });

      setResults(paymentResults);
      setAmortizationData(schedule);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResults(null);
      setAmortizationData([]);
    }
  }, [formValues]);

  const handleInputChange = (
    name: string,
    value: number | PaymentCalculatorMode
  ) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <PaymentForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {results && !error && (
            <>
              <PaymentSummary
                results={results}
                calculatorMode={formValues.calculatorMode}
              />
              <PaymentCharts
                results={results}
                amortizationData={amortizationData}
              />
              <AmortizationTable data={amortizationData} />
            </>
          )}

          {!results && !error && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter loan details to calculate payments and schedules.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <PaymentBasics />
        <PaymentStrategies />
        <LoanTerms />
      </div>

      {/* FAQ Section */}
      <PaymentFAQSection />
    </div>
  );
}
