"use client";

import { useState, useEffect } from "react";
import InterestForm from "./InterestForm";
import InterestSummary from "./InterestSummary";
import InterestCharts from "./InterestCharts";
import AmortizationTable from "../ui/AmortizationTable";
import InterestBasicsCard from "./InterestBasicsCard";
import InterestStrategiesCard from "./InterestStrategiesCard";
import InterestFAQSection from "./InterestFAQ";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateInterestResults } from "@/utils/interestCalculations";

export type CompoundFrequency = "annually" | "monthly" | "daily";

export type ContributionPaymentFrequency = "monthly" | "annually";

export type ContributionTiming = "beginning" | "end";

export interface InterestCalculatorInput {
  initialInvestment: number;
  regularContributionAmount: number;
  contributionPaymentFrequency: ContributionPaymentFrequency;
  contributionTiming: ContributionTiming;
  interestRate: number;
  compoundFrequency: CompoundFrequency;
  investmentLengthYears: number;
  investmentLengthMonths: number;
}

export interface InterestCalculatorResult {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  interestOfInitialInvestment: number;
  interestOfContributions: number;
  monthlyAccumulationSchedule: AccumulationData[];
  yearlyAccumulationSchedule: AccumulationData[];
}

export interface AccumulationData {
  period: number;
  year?: number;
  deposit: number;
  interest: number;
  endingBalance: number;
  isYearEnd?: boolean;
}

const InterestPage = () => {
  const [inputs, setInputs, isInitialized] = useLocalStorage<
    Partial<InterestCalculatorInput>
  >("interestCalculatorInputs_v3", {
    initialInvestment: 20000,
    regularContributionAmount: 500,
    contributionPaymentFrequency: "monthly",
    contributionTiming: "beginning",
    interestRate: 5,
    compoundFrequency: "annually",
    investmentLengthYears: 5,
    investmentLengthMonths: 0,
  });
  const [results, setResults] = useState<InterestCalculatorResult | null>(null);
  const [showAccumulationSchedule, setShowAccumulationSchedule] =
    useState(false);
  const [scheduleType, setScheduleType] = useState<"monthly" | "yearly">(
    "yearly"
  );

  const handleInputChange = (
    field: keyof InterestCalculatorInput,
    value: any
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!isInitialized) return;

    // Simple calculation call - all logic moved to utils/interestCalculations.ts
    const calculationResults = calculateInterestResults(inputs);
    setResults(calculationResults);
    setShowAccumulationSchedule(calculationResults !== null);
  }, [inputs, isInitialized]);

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

  // Get current schedule data based on selected type
  const currentScheduleData = results
    ? scheduleType === "monthly"
      ? results.monthlyAccumulationSchedule
      : results.yearlyAccumulationSchedule
    : [];

  const hasMonthlyData =
    results?.monthlyAccumulationSchedule &&
    results.monthlyAccumulationSchedule.length > 0;
  const hasYearlyData =
    results?.yearlyAccumulationSchedule &&
    results.yearlyAccumulationSchedule.length > 0;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-4">
          <InterestForm inputs={inputs} onInputChange={handleInputChange} />
        </div>

        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <InterestSummary results={results} />
              <InterestCharts results={results} inputs={inputs} />
              {showAccumulationSchedule && currentScheduleData.length > 0 && (
                <div>
                  {/* Schedule Type Toggle */}
                  {hasMonthlyData && hasYearlyData && (
                    <div className="flex justify-end mb-4">
                      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => setScheduleType("yearly")}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            scheduleType === "yearly"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Yearly
                        </button>
                        <button
                          onClick={() => setScheduleType("monthly")}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            scheduleType === "monthly"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                  )}

                  <AmortizationTable
                    data={currentScheduleData.map((item) => ({
                      paymentNumber: item.period,
                      year: item.year,
                      principal: item.deposit,
                      interest: item.interest,
                      endingBalance: item.endingBalance,
                      isYearEnd: item.isYearEnd,
                    }))}
                    formatCurrency={formatCurrency}
                    title={
                      scheduleType === "monthly"
                        ? "Monthly Accumulation Schedule"
                        : "Yearly Accumulation Schedule"
                    }
                    showAnnualToggle={false}
                    emptyStateMessage="Investment data is not available."
                  />
                </div>
              )}
            </>
          )}

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter investment details to see interest calculations and
              projections.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-8 mb-16">
        <InterestBasicsCard />
        <InterestStrategiesCard />
      </div>

      <InterestFAQSection />
    </div>
  );
};

export default InterestPage;

export const formatCurrency = (value: number | undefined) => {
  if (value === undefined || isNaN(value)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatPercentage = (value: number | undefined) => {
  if (value === undefined || isNaN(value)) {
    return "0.00%";
  }
  return value.toFixed(2) + "%";
};
