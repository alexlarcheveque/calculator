"use client";

import { useState, useEffect } from "react";
import RetirementForm from "@/components/retirement/RetirementForm";
import RetirementSummary from "@/components/retirement/RetirementSummary";
import SavingsForm from "@/components/retirement/SavingsForm";
import SavingsSummary from "@/components/retirement/SavingsSummary";
import WithdrawalForm from "@/components/retirement/WithdrawalForm";
import WithdrawalSummary from "@/components/retirement/WithdrawalSummary";
import DurationForm from "@/components/retirement/DurationForm";
import DurationSummary from "@/components/retirement/DurationSummary";
import RetirementBasics from "@/components/retirement/RetirementBasics";
import RetirementSavingsRules from "@/components/retirement/RetirementSavingsRules";
import RetirementAccounts from "@/components/retirement/RetirementAccounts";
import RetirementFAQ from "@/components/retirement/RetirementFAQ";
import {
  calculateRetirement,
  calculateSavingsNeeded,
  calculateWithdrawalAmount,
  calculateMoneyDuration,
} from "@/utils/retirementCalculations";
import {
  RetirementFormValues,
  RetirementResults,
  SavingsFormValues,
  SavingsResults,
  WithdrawalFormValues,
  WithdrawalResults,
  DurationFormValues,
  DurationResults,
  IncomeAfterRetirementUnit,
  FutureSavingsUnit,
} from "@/types/retirement";
import RetirementCharts from "./RetirementCharts";
import RetirementTable from "./RetirementTable";

export type RetirementCalculatorType =
  | "needs"
  | "savings"
  | "withdrawal"
  | "duration";

export default function RetirementPage() {
  const [calculatorType, setCalculatorType] =
    useState<RetirementCalculatorType>("needs");

  // Calculator 1: How much do you need to retire?
  const [retirementFormValues, setRetirementFormValues] =
    useState<RetirementFormValues>({
      currentAge: 35,
      retirementAge: 67,
      lifeExpectancy: 85,
      currentIncome: 70000,
      incomeIncrease: 3,
      incomeAfterRetirement: 75,
      incomeAfterRetirementUnit: IncomeAfterRetirementUnit.PERCENTAGE,
      averageInvestmentReturn: 6,
      inflationRate: 3,
      otherIncomeAfterRetirement: 0,
      currentRetirementSavings: 30000,
      futureSavings: 10,
      futureSavingsUnit: FutureSavingsUnit.PERCENTAGE,
    });

  const [retirementResults, setRetirementResults] =
    useState<RetirementResults | null>(null);

  // Calculator 2: How can you save for retirement?
  const [savingsFormValues, setSavingsFormValues] = useState<SavingsFormValues>(
    {
      currentAge: 35,
      retirementAge: 67,
      amountNeededAtRetirement: 600000,
      currentRetirementSavings: 30000,
      averageInvestmentReturn: 6,
    }
  );

  const [savingsResults, setSavingsResults] = useState<SavingsResults | null>(
    null
  );

  // Calculator 3: How much can you withdraw after retirement?
  const [withdrawalFormValues, setWithdrawalFormValues] =
    useState<WithdrawalFormValues>({
      currentAge: 35,
      retirementAge: 67,
      lifeExpectancy: 85,
      currentRetirementSavings: 30000,
      annualContribution: 0,
      monthlyContribution: 500,
      averageInvestmentReturn: 6,
      inflationRate: 3,
    });

  const [withdrawalResults, setWithdrawalResults] =
    useState<WithdrawalResults | null>(null);

  // Calculator 4: How long can your money last?
  const [durationFormValues, setDurationFormValues] =
    useState<DurationFormValues>({
      currentAmount: 600000,
      monthlyWithdrawal: 5000,
      averageInvestmentReturn: 6,
    });

  const [durationResults, setDurationResults] =
    useState<DurationResults | null>(null);

  // Calculate retirement needs
  useEffect(() => {
    if (calculatorType !== "needs") return;

    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentIncome,
      incomeIncrease,
      incomeAfterRetirement,
      incomeAfterRetirementUnit,
      averageInvestmentReturn,
      inflationRate,
      otherIncomeAfterRetirement,
      currentRetirementSavings,
      futureSavings,
      futureSavingsUnit,
    } = retirementFormValues;

    if (
      currentAge >= retirementAge ||
      retirementAge >= lifeExpectancy ||
      currentIncome <= 0 ||
      averageInvestmentReturn < 0 ||
      inflationRate < 0
    ) {
      return;
    }

    const results = calculateRetirement({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentIncome,
      incomeIncrease,
      incomeAfterRetirement,
      incomeAfterRetirementUnit,
      averageInvestmentReturn,
      inflationRate,
      otherIncomeAfterRetirement,
      currentRetirementSavings,
      futureSavings,
      futureSavingsUnit,
    });

    setRetirementResults(results);
  }, [retirementFormValues, calculatorType]);

  // Calculate savings needed
  useEffect(() => {
    if (calculatorType !== "savings") return;

    const {
      currentAge,
      retirementAge,
      amountNeededAtRetirement,
      currentRetirementSavings,
      averageInvestmentReturn,
    } = savingsFormValues;

    if (
      currentAge >= retirementAge ||
      amountNeededAtRetirement <= 0 ||
      averageInvestmentReturn < 0
    ) {
      return;
    }

    const results = calculateSavingsNeeded(savingsFormValues);
    setSavingsResults(results);
  }, [savingsFormValues, calculatorType]);

  // Calculate withdrawal amount
  useEffect(() => {
    if (calculatorType !== "withdrawal") return;

    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentRetirementSavings,
      annualContribution,
      monthlyContribution,
      averageInvestmentReturn,
      inflationRate,
    } = withdrawalFormValues;

    if (
      currentAge >= retirementAge ||
      retirementAge >= lifeExpectancy ||
      averageInvestmentReturn < 0 ||
      inflationRate < 0
    ) {
      return;
    }

    const results = calculateWithdrawalAmount(withdrawalFormValues);
    setWithdrawalResults(results);
  }, [withdrawalFormValues, calculatorType]);

  // Calculate money duration
  useEffect(() => {
    if (calculatorType !== "duration") return;

    const { currentAmount, monthlyWithdrawal, averageInvestmentReturn } =
      durationFormValues;

    if (
      currentAmount <= 0 ||
      monthlyWithdrawal <= 0 ||
      averageInvestmentReturn < 0
    ) {
      return;
    }

    const results = calculateMoneyDuration(durationFormValues);
    setDurationResults(results);
  }, [durationFormValues, calculatorType]);

  const handleRetirementInputChange = (
    name: string,
    value: number | IncomeAfterRetirementUnit | FutureSavingsUnit
  ) => {
    setRetirementFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavingsInputChange = (name: string, value: number) => {
    setSavingsFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleWithdrawalInputChange = (name: string, value: number) => {
    setWithdrawalFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDurationInputChange = (name: string, value: number) => {
    setDurationFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getTabTitle = (type: RetirementCalculatorType) => {
    switch (type) {
      case "needs":
        return "How much do you need to retire?";
      case "savings":
        return "How can you save for retirement?";
      case "withdrawal":
        return "How much can you withdraw after retirement?";
      case "duration":
        return "How long can your money last?";
      default:
        return "";
    }
  };

  const getTabDescription = (type: RetirementCalculatorType) => {
    switch (type) {
      case "needs":
        return "Calculate how much you need to save for retirement based on your income and lifestyle goals.";
      case "savings":
        return "Determine how much you need to save monthly to reach your retirement goal.";
      case "withdrawal":
        return "Find out how much you can withdraw monthly during retirement.";
      case "duration":
        return "See how long your retirement savings will last at your current withdrawal rate.";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <RetirementForm
            values={retirementFormValues}
            onChange={handleRetirementInputChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {retirementResults && (
            <>
              <RetirementSummary results={retirementResults} />
              <RetirementCharts results={retirementResults} />
              <RetirementTable results={retirementResults} />
            </>
          )}

          {!retirementResults && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter retirement details to calculate savings plan.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <RetirementBasics />
        <RetirementSavingsRules />
        <RetirementAccounts />
      </div>

      {/* FAQ Section */}
      <RetirementFAQ />
    </div>
  );
}
