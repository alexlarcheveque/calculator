"use client";

import { useState, useEffect } from "react";
import InvestmentForm from "@/components/investment/InvestmentForm";
import InvestmentSummary from "@/components/investment/InvestmentSummary";
import InvestmentCharts from "@/components/investment/InvestmentCharts";
import AccumulationTable from "@/components/investment/AccumulationTable";
import InvestmentBasics from "@/components/investment/InvestmentBasics";
import CompoundInterest from "@/components/investment/CompoundInterest";
import InvestmentStrategy from "@/components/investment/InvestmentStrategy";
import FAQSection from "@/components/investment/FAQSection";
import {
  calculateInvestment,
  calculateAccumulationSchedule,
  calculateMonthlyAccumulationSchedule,
  calculateRequiredStartingAmount,
  calculateRequiredReturnRate,
  calculateRequiredInvestmentLength,
  calculateRequiredContribution,
} from "@/utils/investmentCalculations";
import {
  InvestmentFormValues,
  InvestmentResults,
  AccumulationDataPoint,
  MonthlyAccumulationDataPoint,
  CalculatorType,
  CompoundFrequency,
  ContributionTiming,
  ContributionFrequency,
} from "@/types/investment";

export default function InvestmentPage() {
  const [formValues, setFormValues] = useState<InvestmentFormValues>({
    calculatorType: CalculatorType.END_AMOUNT,
    startingAmount: 20000,
    targetAmount: 1000000,
    additionalContribution: 1000,
    returnRate: 6,
    investmentLength: 10,
    compoundFrequency: CompoundFrequency.ANNUALLY,
    contributionTiming: ContributionTiming.END,
    contributionFrequency: ContributionFrequency.MONTHLY,
  });

  const [results, setResults] = useState<InvestmentResults | null>(null);
  const [accumulationData, setAccumulationData] = useState<
    AccumulationDataPoint[]
  >([]);
  const [monthlyAccumulationData, setMonthlyAccumulationData] = useState<
    MonthlyAccumulationDataPoint[]
  >([]);
  const [calculatedValue, setCalculatedValue] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const {
      calculatorType,
      startingAmount,
      targetAmount,
      additionalContribution,
      returnRate,
      investmentLength,
      compoundFrequency,
      contributionTiming,
      contributionFrequency,
    } = formValues;

    // Validate inputs
    if (returnRate < 0 || investmentLength <= 0) {
      return;
    }

    const params = {
      startingAmount,
      targetAmount,
      additionalContribution,
      returnRate,
      investmentLength,
      compoundFrequency,
      contributionTiming,
      contributionFrequency,
    };

    let investmentResults: InvestmentResults;
    let calculatedVal: number | undefined;

    try {
      switch (calculatorType) {
        case CalculatorType.END_AMOUNT:
          investmentResults = calculateInvestment(params);
          break;

        case CalculatorType.STARTING_AMOUNT:
          calculatedVal = calculateRequiredStartingAmount(params);
          investmentResults = calculateInvestment({
            ...params,
            startingAmount: calculatedVal,
          });
          break;

        case CalculatorType.RETURN_RATE:
          calculatedVal = calculateRequiredReturnRate(params);
          investmentResults = calculateInvestment({
            ...params,
            returnRate: calculatedVal,
          });
          break;

        case CalculatorType.INVESTMENT_LENGTH:
          calculatedVal = calculateRequiredInvestmentLength(params);
          investmentResults = calculateInvestment({
            ...params,
            investmentLength: calculatedVal,
          });
          break;

        case CalculatorType.ADDITIONAL_CONTRIBUTION:
          calculatedVal = calculateRequiredContribution(params);
          investmentResults = calculateInvestment({
            ...params,
            additionalContribution: calculatedVal,
          });
          break;

        default:
          investmentResults = calculateInvestment(params);
      }

      // Use the calculated parameters for schedule generation
      const scheduleParams = {
        ...params,
        startingAmount:
          calculatorType === CalculatorType.STARTING_AMOUNT
            ? calculatedVal!
            : startingAmount,
        returnRate:
          calculatorType === CalculatorType.RETURN_RATE
            ? calculatedVal!
            : returnRate,
        investmentLength:
          calculatorType === CalculatorType.INVESTMENT_LENGTH
            ? calculatedVal!
            : investmentLength,
        additionalContribution:
          calculatorType === CalculatorType.ADDITIONAL_CONTRIBUTION
            ? calculatedVal!
            : additionalContribution,
      };

      const schedule = calculateAccumulationSchedule(scheduleParams);
      const monthlySchedule =
        calculateMonthlyAccumulationSchedule(scheduleParams);

      setResults(investmentResults);
      setAccumulationData(schedule);
      setMonthlyAccumulationData(monthlySchedule);
      setCalculatedValue(calculatedVal);
    } catch (error) {
      console.error("Calculation error:", error);
      // Set default values on error
      setResults(null);
      setAccumulationData([]);
      setMonthlyAccumulationData([]);
      setCalculatedValue(undefined);
    }
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Investment Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive investment calculator for portfolio planning and wealth
          building. Calculate future value, required returns, time horizons, and
          contribution amounts with compound interest projections. Analyze
          investment growth scenarios for stocks, bonds, retirement accounts,
          and savings goals. Features multiple calculation modes including lump
          sum investing, dollar-cost averaging, and regular contributions.
          Essential for retirement planning, college savings, and long-term
          financial goal achievement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <InvestmentForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <InvestmentSummary
                results={results}
                calculatorType={formValues.calculatorType}
                calculatedValue={calculatedValue}
              />
              <InvestmentCharts
                results={results}
                accumulationData={accumulationData}
              />
              <AccumulationTable
                annualData={accumulationData}
                monthlyData={monthlyAccumulationData}
              />
            </>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <InvestmentBasics />
        <CompoundInterest />
        <InvestmentStrategy />
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
