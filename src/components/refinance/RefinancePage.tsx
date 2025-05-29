"use client";

import { useState, useEffect } from "react";
import RefinanceForm from "@/components/refinance/RefinanceForm";
import RefinanceCharts from "@/components/refinance/RefinanceCharts";
import RefinanceFAQ from "@/components/refinance/RefinanceFAQ";
import RefinanceInfo from "@/components/refinance/RefinanceInfo";
import {
  calculateRefinance,
  calculateCurrentLoanFromOriginal,
} from "@/utils/refinanceCalculations";
import {
  RefinanceFormValues,
  RefinanceResults,
  CurrentLoanInputMode,
} from "@/types/refinance";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LoanComparisonSummary from "./RefinanceSummary";
import LoanComparisonDetails from "./LoanComparisonDetails";
import LoanBalanceChart from "./LoanBalanceChart";

export default function RefinancePage() {
  const [formValues, setFormValues, isLoaded] =
    useLocalStorage<RefinanceFormValues>("refinanceFormValues", {
      currentLoanInputMode: CurrentLoanInputMode.REMAINING_BALANCE,

      // Remaining balance mode
      remainingBalance: 250000,
      currentMonthlyPayment: 1800,

      // Original loan mode
      originalLoanAmount: 300000,
      originalLoanTerm: 30,
      timeRemainingYears: 23,
      timeRemainingMonths: 8,

      // Common
      currentInterestRate: 7.0,

      // New loan
      newLoanTerm: 20,
      newInterestRate: 6.0,
      points: 2.5,
      costsAndFees: 4000,
      cashOutAmount: 0,
    });

  const [results, setResults] = useState<RefinanceResults | null>(null);

  useEffect(() => {
    const {
      currentLoanInputMode,
      remainingBalance,
      currentMonthlyPayment,
      originalLoanAmount,
      originalLoanTerm,
      timeRemainingYears,
      timeRemainingMonths,
      currentInterestRate,
      newLoanTerm,
      newInterestRate,
      points,
      costsAndFees,
      cashOutAmount,
    } = formValues;

    let currentLoanRemainingBalance: number;
    let currentRemainingPayments: number;
    let currentMonthlyPaymentValue: number;

    if (currentLoanInputMode === CurrentLoanInputMode.REMAINING_BALANCE) {
      currentLoanRemainingBalance = remainingBalance;
      currentMonthlyPaymentValue = currentMonthlyPayment;
      // Calculate remaining payments by simulating the amortization
      const monthlyRate = currentInterestRate / 100 / 12;

      if (monthlyRate > 0) {
        let balance = currentLoanRemainingBalance;
        let payments = 0;
        const maxPayments = 500; // Safety limit

        while (balance > 0.01 && payments < maxPayments) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = currentMonthlyPaymentValue - interestPayment;

          if (principalPayment <= 0) {
            // Payment doesn't cover interest, loan will never be paid off
            payments = maxPayments;
            break;
          }

          balance -= principalPayment;
          payments++;
        }

        currentRemainingPayments = payments;
      } else {
        currentRemainingPayments = Math.ceil(
          currentLoanRemainingBalance / currentMonthlyPaymentValue
        );
      }
    } else {
      // Calculate from original loan
      const calculatedValues = calculateCurrentLoanFromOriginal(
        originalLoanAmount,
        originalLoanTerm,
        currentInterestRate,
        timeRemainingYears,
        timeRemainingMonths
      );

      currentLoanRemainingBalance = calculatedValues.remainingBalance;
      currentRemainingPayments = calculatedValues.remainingPayments;
      currentMonthlyPaymentValue = calculatedValues.monthlyPayment;
    }

    if (
      currentLoanRemainingBalance <= 0 ||
      currentInterestRate <= 0 ||
      newInterestRate <= 0 ||
      newLoanTerm <= 0
    ) {
      return;
    }

    const refinanceResults = calculateRefinance({
      currentLoanRemainingBalance,
      currentInterestRate,
      currentRemainingPayments,
      currentMonthlyPayment: currentMonthlyPaymentValue,
      newLoanTerm,
      newInterestRate,
      points,
      costsAndFees,
      cashOutAmount,
    });

    setResults(refinanceResults);
  }, [formValues]);

  const handleInputChange = (
    name: string,
    value: number | CurrentLoanInputMode
  ) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Show loading state until localStorage is loaded
  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <RefinanceForm values={formValues} onChange={handleInputChange} />
        </div>

        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <LoanComparisonSummary
                results={results}
                currentInterestRate={formValues.currentInterestRate}
                newInterestRate={formValues.newInterestRate}
              />
              <div className="space-y-8">
                <LoanComparisonDetails
                  results={results}
                  currentInterestRate={formValues.currentInterestRate}
                  newInterestRate={formValues.newInterestRate}
                />
              </div>
              <div className="space-y-8">
                <RefinanceCharts
                  results={results}
                  currentInterestRate={formValues.currentInterestRate}
                  newInterestRate={formValues.newInterestRate}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-16">
        <RefinanceInfo />
      </div>
      <div className="mt-16">
        <RefinanceFAQ />
      </div>
    </div>
  );
}
