"use client";

import { useState, useEffect } from "react";
import InterestForm from "./InterestForm";
import InterestSummary from "./InterestSummary";
import InterestCharts from "./InterestCharts";
import AccumulationScheduleTable from "./AccumulationScheduleTable";
import InterestBasicsCard from "./InterestBasicsCard";
import TaxesInflationCard from "./TaxesInflationCard";
import InterestStrategiesCard from "./InterestStrategiesCard";
import InterestFAQSection from "./InterestFAQ";

export type CompoundFrequency =
  | "annually"
  | "semiannually"
  | "quarterly"
  | "monthly"
  | "semimonthly"
  | "biweekly"
  | "weekly"
  | "daily"
  | "continuously";

export type ContributionTiming = "beginning" | "end";

export interface InterestCalculatorInput {
  initialInvestment: number;
  annualContribution: number;
  monthlyContribution: number;
  contributionTiming: ContributionTiming;
  interestRate: number;
  compoundFrequency: CompoundFrequency;
  investmentLengthYears: number;
  investmentLengthMonths: number;
  taxRate: number;
  inflationRate: number;
}

export interface InterestCalculatorResult {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  interestOfInitialInvestment: number;
  interestOfContributions: number;
  buyingPowerAfterInflation: number;
  accumulationSchedule: AccumulationData[];
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
  const [inputs, setInputs] = useState<Partial<InterestCalculatorInput>>({
    initialInvestment: 20000,
    annualContribution: 5000,
    monthlyContribution: 0,
    contributionTiming: "beginning",
    interestRate: 5,
    compoundFrequency: "annually",
    investmentLengthYears: 5,
    investmentLengthMonths: 0,
    taxRate: 0,
    inflationRate: 3,
  });
  const [results, setResults] = useState<InterestCalculatorResult | null>(null);
  const [showAccumulationSchedule, setShowAccumulationSchedule] =
    useState(false);

  const handleInputChange = (
    field: keyof InterestCalculatorInput,
    value: any
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Automatically calculate when inputs change
    const P = inputs.initialInvestment || 0;
    const annualRate = (inputs.interestRate || 0) / 100;
    const taxRate = (inputs.taxRate || 0) / 100;
    const inflationRate = (inputs.inflationRate || 0) / 100;
    const years =
      (inputs.investmentLengthYears || 0) +
      (inputs.investmentLengthMonths || 0) / 12;
    const annualContribution = inputs.annualContribution || 0;
    const monthlyContribution = inputs.monthlyContribution || 0;
    const contributionAtBeginning = inputs.contributionTiming === "beginning";
    const compoundFrequency = inputs.compoundFrequency || "annually";

    if (P < 0 || annualRate < 0 || years <= 0) {
      setResults(null);
      return;
    }

    const compoundPeriodsPerYearMap: Record<CompoundFrequency, number> = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      semimonthly: 24,
      biweekly: 26,
      weekly: 52,
      daily: 365,
      continuously: Infinity,
    };
    const N = compoundPeriodsPerYearMap[compoundFrequency];

    if (!N) {
      setResults(null);
      return;
    }

    // Calculate using proper compound interest formulas
    let futureValuePrincipal = 0;
    let futureValueAnnualContributions = 0;
    let futureValueMonthlyContributions = 0;
    let totalContributionsMade = 0;

    // 1. Future Value of Principal
    if (P > 0) {
      if (compoundFrequency === "continuously") {
        futureValuePrincipal = P * Math.exp(annualRate * years);
      } else {
        futureValuePrincipal = P * Math.pow(1 + annualRate / N, N * years);
      }
    }

    // 2. Future Value of Annual Contributions
    if (annualContribution > 0 && years >= 1) {
      const numberOfYears = Math.floor(years);
      totalContributionsMade += annualContribution * numberOfYears;

      if (compoundFrequency === "continuously") {
        // For continuous compounding with annual payments
        let annualContributionFV = 0;
        for (let year = 1; year <= numberOfYears; year++) {
          const timeRemaining =
            years - (contributionAtBeginning ? year - 1 : year);
          if (timeRemaining > 0) {
            annualContributionFV +=
              annualContribution * Math.exp(annualRate * timeRemaining);
          }
        }
        futureValueAnnualContributions = annualContributionFV;
      } else {
        // Standard annuity formula for annual contributions
        const periodicRate = annualRate / N;
        const totalPeriods = N * years;
        const contributionGrowthFactor = contributionAtBeginning
          ? 1 + periodicRate
          : 1;

        // Calculate effective annual rate from compound frequency
        const effectiveAnnualRate = Math.pow(1 + periodicRate, N) - 1;

        futureValueAnnualContributions =
          ((annualContribution *
            (Math.pow(1 + effectiveAnnualRate, numberOfYears) - 1)) /
            effectiveAnnualRate) *
          contributionGrowthFactor;
      }
    }

    // 3. Future Value of Monthly Contributions
    if (monthlyContribution > 0) {
      const numberOfMonths = years * 12;
      totalContributionsMade += monthlyContribution * numberOfMonths;

      if (compoundFrequency === "continuously") {
        // For continuous compounding with monthly payments
        let monthlyContributionFV = 0;
        for (let month = 1; month <= numberOfMonths; month++) {
          const timeRemaining =
            years - (contributionAtBeginning ? (month - 1) / 12 : month / 12);
          if (timeRemaining > 0) {
            monthlyContributionFV +=
              monthlyContribution * Math.exp(annualRate * timeRemaining);
          }
        }
        futureValueMonthlyContributions = monthlyContributionFV;
      } else {
        // Calculate effective monthly rate from compound frequency
        const periodicRate = annualRate / N;
        let effectiveMonthlyRate;

        if (N === 12) {
          // Monthly compounding
          effectiveMonthlyRate = periodicRate;
        } else {
          // Convert to effective monthly rate
          effectiveMonthlyRate = Math.pow(1 + periodicRate, N / 12) - 1;
        }

        const contributionGrowthFactor = contributionAtBeginning
          ? 1 + effectiveMonthlyRate
          : 1;

        futureValueMonthlyContributions =
          ((monthlyContribution *
            (Math.pow(1 + effectiveMonthlyRate, numberOfMonths) - 1)) /
            effectiveMonthlyRate) *
          contributionGrowthFactor;
      }
    }

    // Total before taxes
    const totalBeforeTax =
      futureValuePrincipal +
      futureValueAnnualContributions +
      futureValueMonthlyContributions;

    // Apply tax to interest only (not principal or contributions)
    const totalPrincipalInvested = P + totalContributionsMade;
    const totalInterestBeforeTax = totalBeforeTax - totalPrincipalInvested;
    const totalInterestAfterTax = totalInterestBeforeTax * (1 - taxRate);
    const currentBalance = totalPrincipalInvested + totalInterestAfterTax;

    // Calculate interest breakdown (approximate)
    const interestFromPrincipal = (futureValuePrincipal - P) * (1 - taxRate);
    const interestFromContributions =
      totalInterestAfterTax - interestFromPrincipal;

    // Generate schedule for display (simplified yearly summary)
    const schedule: AccumulationData[] = [];
    const yearsToShow = Math.ceil(years);

    for (let year = 1; year <= yearsToShow; year++) {
      const yearFraction = Math.min(year, years);

      // Calculate values for this year
      let yearPrincipalFV = 0;
      let yearContributionsFV = 0;
      let yearContributions = 0;

      if (P > 0) {
        if (compoundFrequency === "continuously") {
          yearPrincipalFV = P * Math.exp(annualRate * yearFraction);
        } else {
          yearPrincipalFV = P * Math.pow(1 + annualRate / N, N * yearFraction);
        }
      }

      // Contributions up to this year
      if (annualContribution > 0) {
        yearContributions += Math.min(year, years) * annualContribution;
      }
      if (monthlyContribution > 0) {
        yearContributions +=
          Math.min(year * 12, years * 12) * monthlyContribution;
      }

      // Calculate FV of contributions made up to this year
      if (yearContributions > 0) {
        const contributionYears = yearFraction;
        if (compoundFrequency === "continuously") {
          // Simplified calculation for display
          yearContributionsFV =
            yearContributions * Math.exp((annualRate * contributionYears) / 2);
        } else {
          const periodicRate = annualRate / N;
          const avgGrowthPeriods = (N * contributionYears) / 2; // Approximate average growth time
          yearContributionsFV =
            yearContributions * Math.pow(1 + periodicRate, avgGrowthPeriods);
        }
      }

      const yearTotalBeforeTax = yearPrincipalFV + yearContributionsFV;
      const yearInterestBeforeTax =
        yearTotalBeforeTax - (P + yearContributions);
      const yearInterestAfterTax = yearInterestBeforeTax * (1 - taxRate);
      const yearEndingBalance = P + yearContributions + yearInterestAfterTax;

      schedule.push({
        period: year,
        year: year,
        deposit: P + yearContributions,
        interest: yearInterestAfterTax,
        endingBalance: yearEndingBalance,
        isYearEnd: true,
      });
    }

    const buyingPower = currentBalance / Math.pow(1 + inflationRate, years);

    setResults({
      endingBalance: currentBalance,
      totalPrincipal: totalPrincipalInvested,
      totalContributions: totalContributionsMade,
      totalInterest: totalInterestAfterTax,
      interestOfInitialInvestment: interestFromPrincipal,
      interestOfContributions: interestFromContributions,
      buyingPowerAfterInflation: buyingPower,
      accumulationSchedule: schedule,
    });
    setShowAccumulationSchedule(true);
  }, [inputs]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Interest Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Advanced interest calculator for comprehensive financial planning.
          Calculate compound interest with regular contributions, compare
          different compounding frequencies, and analyze the impact of taxes and
          inflation on your returns. Features multiple contribution options
          (monthly, annual), contribution timing analysis (beginning vs end),
          and detailed accumulation schedules. Essential for savings goals,
          investment growth projections, retirement planning, and understanding
          the true power of compound interest over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <InterestForm inputs={inputs} onInputChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <InterestSummary results={results} />
              <InterestCharts results={results} inputs={inputs} />
              {showAccumulationSchedule &&
                results.accumulationSchedule.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      Accumulation Schedule
                    </h2>
                    <AccumulationScheduleTable
                      data={results.accumulationSchedule}
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

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <InterestBasicsCard />
        <TaxesInflationCard />
        <InterestStrategiesCard />
      </div>

      {/* FAQ Section */}
      <InterestFAQSection />
    </div>
  );
};

export default InterestPage;

// Helper function (can be moved to a utils file later)
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
