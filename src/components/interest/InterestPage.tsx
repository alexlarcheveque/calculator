"use client";

import { useState, useEffect } from "react";
import InterestForm from "./InterestForm";
import InterestSummary from "./InterestSummary";
import InterestCharts from "./InterestCharts";
import AccumulationScheduleTable from "./AccumulationScheduleTable";
import InterestInfoSection from "./InterestInfoSection";

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

  const calculateInterest = () => {
    setShowAccumulationSchedule(false);

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
      continuously: Infinity, // Placeholder, handled separately
    };
    const N = compoundPeriodsPerYearMap[compoundFrequency];

    if (!N) {
      setResults(null);
      return;
    }

    const totalPeriods = years * N;
    const periodicRate =
      compoundFrequency === "continuously" ? annualRate : annualRate / N;
    const periodicTaxRate = taxRate / N; // Assuming tax is applied per compounding period on gains

    let currentBalance = P;
    let totalInterestEarned = 0;
    let totalContributionsMade = 0;
    let interestFromPrincipal = 0;
    let interestFromContributions = 0;
    let principalBalance = P;
    let contributionsBalance = 0;

    const schedule: AccumulationData[] = [];
    let cumulativeDeposit = P;

    for (let i = 0; i < totalPeriods; i++) {
      let periodInterest = 0;
      let periodContribution = 0;
      let yearForSchedule = Math.floor(i / N) + 1;
      let periodInYear = (i % N) + 1;

      // Determine contribution for this period
      if (N === 12 && monthlyContribution > 0) {
        // Monthly contribution
        periodContribution = monthlyContribution;
      } else if (i % N === 0 && annualContribution > 0) {
        // Annual contribution at start of compounding year for non-monthly
        periodContribution = annualContribution;
      }

      if (contributionAtBeginning && periodContribution > 0) {
        currentBalance += periodContribution;
        contributionsBalance += periodContribution;
        totalContributionsMade += periodContribution;
        cumulativeDeposit += periodContribution;
      }

      let interestEarnedThisPeriod;
      if (compoundFrequency === "continuously") {
        if (i > 0) {
          // Apply continuous compounding for periods > 0
          const continuousGrowth = Math.exp(annualRate / N) - 1; // Effective rate for one Nth of a year
          interestEarnedThisPeriod = currentBalance * continuousGrowth;
        } else {
          // For the very first sub-period of continuous, effectively it is like one period of N
          interestEarnedThisPeriod = currentBalance * (annualRate / N);
        }
      } else {
        interestEarnedThisPeriod = currentBalance * periodicRate;
      }

      const taxableInterest = interestEarnedThisPeriod * (1 - taxRate);
      totalInterestEarned += taxableInterest;
      currentBalance += taxableInterest;

      // Apportion interest to principal and contributions
      if (currentBalance > 0 && interestEarnedThisPeriod > 0) {
        const principalProportion =
          principalBalance / (principalBalance + contributionsBalance) || 0;
        const contributionProportion =
          contributionsBalance / (principalBalance + contributionsBalance) || 0;
        interestFromPrincipal += taxableInterest * principalProportion;
        interestFromContributions += taxableInterest * contributionProportion;
      }
      principalBalance +=
        taxableInterest *
        (principalBalance / (principalBalance + contributionsBalance) || 0);
      contributionsBalance +=
        taxableInterest *
        (contributionsBalance / (principalBalance + contributionsBalance) || 0);

      if (!contributionAtBeginning && periodContribution > 0) {
        currentBalance += periodContribution;
        contributionsBalance += periodContribution;
        totalContributionsMade += periodContribution;
        cumulativeDeposit += periodContribution;
      }

      const isYearEnd = (i + 1) % N === 0 || i + 1 === totalPeriods;

      schedule.push({
        period: i + 1,
        year: yearForSchedule,
        deposit: P + totalContributionsMade, // This represents total principal + contributions up to this point
        interest: taxableInterest,
        endingBalance: currentBalance,
        isYearEnd: isYearEnd,
      });
    }

    // Adjust schedule for yearly summary if N > 1 and totalPeriods is not a multiple of N
    if (N > 1 && totalPeriods % N !== 0 && schedule.length > 0) {
      const lastEntry = schedule[schedule.length - 1];
      if (!lastEntry.isYearEnd) {
        // Find the last actual year end to ensure we have one if we didn't hit it naturally
        let lastYearEndIdx = -1;
        for (let k = schedule.length - 1; k >= 0; k--) {
          if (schedule[k].isYearEnd) {
            lastYearEndIdx = k;
            break;
          }
        }
        // if the very last entry is not a year end, but it's the final period, mark it as a pseudo year-end for chart
        if (lastYearEndIdx < schedule.length - 1) {
          schedule[schedule.length - 1].isYearEnd = true;
        }
      }
    }

    // Create a yearly summary if N > 1 for the table and potentially chart
    const yearlySchedule: AccumulationData[] = [];
    if (N > 1) {
      let yearDeposits = P; // Start with initial investment
      let yearInterest = 0;
      let lastYearEndBalance = P;

      for (let y = 1; y <= Math.ceil(years); y++) {
        let yearEndBalanceForYear = lastYearEndBalance;
        let depositsThisYear = 0;
        let interestThisYear = 0;

        const periodsInThisYear = schedule.filter((s) => s.year === y);
        periodsInThisYear.forEach((p) => {
          // Summing contributions made during this year
          // This logic needs to be careful not to double count initial P
          // `p.deposit` in the main schedule is cumulative. So we need to find periodic deposit.
          const prevPeriodIdx = schedule.findIndex(
            (s) => s.period === p.period - 1
          );
          const prevDepositTotal =
            prevPeriodIdx !== -1 ? schedule[prevPeriodIdx].deposit : P;
          depositsThisYear += p.deposit - prevDepositTotal;
          interestThisYear += p.interest;
        });

        // If it is the first year, add initial investment to depositsThisYear if not already captured
        if (
          y === 1 &&
          !periodsInThisYear.some((p) => p.period === 1 && p.deposit === P)
        ) {
          // This case should ideally not happen if initial P is correctly added to first period's deposit
        }
        yearDeposits += depositsThisYear; // This becomes cumulative for the year
        yearInterest += interestThisYear; // Cumulative interest for the year

        const yearEndEntry = periodsInThisYear[periodsInThisYear.length - 1];
        if (yearEndEntry) yearEndBalanceForYear = yearEndEntry.endingBalance;
        else if (yearlySchedule.length > 0)
          yearEndBalanceForYear =
            yearlySchedule[yearlySchedule.length - 1].endingBalance; // if no periods this year (e.g. fractional year)

        yearlySchedule.push({
          period: y, // Using year number as period for yearly summary
          year: y,
          deposit: yearDeposits, // Cumulative deposits up to this year end
          interest: interestThisYear, // Interest specifically for this year
          endingBalance: yearEndBalanceForYear,
          isYearEnd: true,
        });
        lastYearEndBalance = yearEndBalanceForYear;
      }
    }
    const displaySchedule = N === 1 ? schedule : yearlySchedule; // Use yearly if compounding is not annual
    if (
      compoundFrequency === "continuously" &&
      yearlySchedule.length === 0 &&
      schedule.length > 0
    ) {
      // if continuous and only one year or less, yearlySchedule might be empty, use raw schedule
      // but mark all as year end for chart
      schedule.forEach((s) => (s.isYearEnd = true));
      // displaySchedule = schedule;
    }

    const totalPrincipalInvested = P + totalContributionsMade;
    const buyingPower = currentBalance / Math.pow(1 + inflationRate, years);

    setResults({
      endingBalance: currentBalance,
      totalPrincipal: totalPrincipalInvested,
      totalContributions: totalContributionsMade,
      totalInterest: totalInterestEarned,
      interestOfInitialInvestment: interestFromPrincipal, // This is an approximation
      interestOfContributions: interestFromContributions, // This is an approximation
      buyingPowerAfterInflation: buyingPower,
      accumulationSchedule:
        displaySchedule.length > 0 ? displaySchedule : schedule, // Fallback to raw if yearly is empty
    });
    setShowAccumulationSchedule(true);
  };

  useEffect(() => {
    // Optionally, calculate on initial load or specific input changes
    // calculateInterest();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Interest Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Estimate the growth of your investments with compound interest.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-card p-6 rounded-lg shadow-lg">
          <InterestForm
            inputs={inputs}
            onInputChange={handleInputChange}
            onSubmit={calculateInterest}
          />
        </div>

        <div className="md:col-span-2 space-y-8">
          {results && (
            <>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <InterestSummary results={results} />
              </div>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <InterestCharts results={results} inputs={inputs} />
              </div>
            </>
          )}
        </div>
      </div>

      {results &&
        showAccumulationSchedule &&
        results.accumulationSchedule.length > 0 && (
          <div className="mt-8 bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Accumulation Schedule
            </h2>
            <AccumulationScheduleTable data={results.accumulationSchedule} />
          </div>
        )}

      <div className="mt-12">
        <InterestInfoSection />
      </div>

      <footer className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Calculator App. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Disclaimer: This calculator is for informational purposes only and
          should not be considered financial advice.
        </p>
      </footer>
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
