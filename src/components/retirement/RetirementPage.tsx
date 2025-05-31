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
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Retirement Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Plan your retirement with comprehensive calculators for savings needs,
          withdrawal strategies, and timeline planning. Calculate how much to
          save, determine optimal withdrawal amounts, and see how long your
          money will last in retirement. Factor in Social Security, inflation,
          investment returns, and multiple retirement accounts to create a
          complete retirement plan. Essential for 401(k) planning, IRA
          strategies, and long-term financial security.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b">
        {(
          [
            "needs",
            "savings",
            "withdrawal",
            "duration",
          ] as RetirementCalculatorType[]
        ).map((type) => (
          <button
            key={type}
            onClick={() => setCalculatorType(type)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none whitespace-nowrap
                        ${
                          calculatorType === type
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            {getTabTitle(type)}
          </button>
        ))}
      </div>

      {/* Tab Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {getTabTitle(calculatorType)}
        </h2>
        <p className="text-gray-600">{getTabDescription(calculatorType)}</p>
      </div>

      {/* Calculator Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {calculatorType === "needs" && (
            <RetirementForm
              values={retirementFormValues}
              onChange={handleRetirementInputChange}
            />
          )}
          {calculatorType === "savings" && (
            <SavingsForm
              values={savingsFormValues}
              onChange={handleSavingsInputChange}
            />
          )}
          {calculatorType === "withdrawal" && (
            <WithdrawalForm
              values={withdrawalFormValues}
              onChange={handleWithdrawalInputChange}
            />
          )}
          {calculatorType === "duration" && (
            <DurationForm
              values={durationFormValues}
              onChange={handleDurationInputChange}
            />
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {calculatorType === "needs" && retirementResults && (
            <RetirementSummary results={retirementResults} />
          )}
          {calculatorType === "savings" && savingsResults && (
            <SavingsSummary results={savingsResults} />
          )}
          {calculatorType === "withdrawal" && withdrawalResults && (
            <WithdrawalSummary results={withdrawalResults} />
          )}
          {calculatorType === "duration" && durationResults && (
            <DurationSummary results={durationResults} />
          )}

          {/* Show message when no results */}
          {((calculatorType === "needs" && !retirementResults) ||
            (calculatorType === "savings" && !savingsResults) ||
            (calculatorType === "withdrawal" && !withdrawalResults) ||
            (calculatorType === "duration" && !durationResults)) && (
            <p className="text-center text-gray-500 md:mt-20">
              Enter details to see the results update automatically.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8">
        <RetirementBasics />
        <RetirementSavingsRules />
        <RetirementAccounts />
      </div>

      {/* FAQ Section */}
      <RetirementFAQ />
    </div>
  );
}
