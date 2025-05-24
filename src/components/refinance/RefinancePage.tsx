"use client";

import { useState, useEffect } from "react";
import RefinanceForm from "@/components/refinance/RefinanceForm";
import RefinanceSummary from "@/components/refinance/RefinanceSummary";
import RefinanceComparisonTable from "@/components/refinance/RefinanceComparisonTable";
import RefinanceFAQ from "@/components/refinance/RefinanceFAQ";
import {
  calculateRefinance,
  calculateCurrentLoanFromOriginal,
} from "@/utils/refinanceCalculations";
import {
  RefinanceFormValues,
  RefinanceResults,
  CurrentLoanInputMode,
} from "@/types/refinance";

export default function RefinancePage() {
  const [formValues, setFormValues] = useState<RefinanceFormValues>({
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
      // Estimate remaining payments based on current payment and balance
      const monthlyRate = currentInterestRate / 100 / 12;
      if (monthlyRate > 0) {
        currentRemainingPayments = Math.ceil(
          Math.log(
            1 +
              (currentLoanRemainingBalance * monthlyRate) /
                currentMonthlyPaymentValue
          ) / Math.log(1 + monthlyRate)
        );
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

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <RefinanceForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <RefinanceSummary results={results} />
              <RefinanceComparisonTable
                results={results}
                currentInterestRate={formValues.currentInterestRate}
              />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <RefinanceFAQ />

      {/* Information Section */}
      <div className="mt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            What is Loan Refinancing?
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="mb-4">
              Loan refinancing involves taking out a new loan, usually with more
              favorable terms, in order to pay off an old one. Terms and
              conditions of refinancing vary widely. Refinancing is more
              commonly associated with home mortgages, car loans, or student
              loans.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">
              Common Reasons to Refinance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-600">
                  Save Money
                </h4>
                <p className="text-sm text-gray-700">
                  If interest rates have decreased since you got your original
                  loan, refinancing can help you secure a lower rate and save
                  money on interest costs.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-600">
                  Need Cash
                </h4>
                <p className="text-sm text-gray-700">
                  Cash-out refinancing allows you to borrow against your home's
                  equity and receive cash for home improvements, debt
                  consolidation, or other expenses.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-600">
                  Lower Payments
                </h4>
                <p className="text-sm text-gray-700">
                  Extending your loan term through refinancing can reduce your
                  monthly payments, providing more breathing room in your
                  budget.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-600">
                  Shorten the Loan
                </h4>
                <p className="text-sm text-gray-700">
                  Refinancing to a shorter term can help you pay off your loan
                  faster and save significantly on total interest paid.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4">
              Refinance Costs to Consider
            </h3>

            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>
                <strong>Application Fee:</strong> Typically 1% of the loan
                amount
              </li>
              <li>
                <strong>Home Appraisal:</strong> Usually a few hundred dollars
              </li>
              <li>
                <strong>Origination Fee/Points:</strong> Normally 0-2% of the
                loan amount
              </li>
              <li>
                <strong>Title Search:</strong> A few hundred dollars for title
                verification
              </li>
              <li>
                <strong>Recording Fees:</strong> County/city paperwork handling
                charges
              </li>
              <li>
                <strong>Inspection Fees:</strong> Property condition evaluation
                costs
              </li>
            </ul>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Consider the break-even point when
                refinancing. This is how long it will take for your monthly
                savings to offset the closing costs. If you plan to move before
                reaching the break-even point, refinancing may not be
                beneficial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
