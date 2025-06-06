"use client";

import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import InvestmentForm from "@/components/investment/InvestmentForm";
import InvestmentSummary from "@/components/investment/InvestmentSummary";
import InvestmentCharts from "@/components/investment/InvestmentCharts";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";
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
  formatCurrency,
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
  const [formValues, setFormValues] = useLocalStorage<InvestmentFormValues>(
    "investment-calculator-values",
    {
      calculatorType: CalculatorType.END_AMOUNT,
      startingAmount: 20000,
      targetAmount: 1000000,
      additionalContribution: 1000,
      returnRate: 6,
      investmentLength: 10,
      compoundFrequency: CompoundFrequency.ANNUALLY,
      contributionTiming: ContributionTiming.END,
      contributionFrequency: ContributionFrequency.ANNUALLY,
    }
  );

  const [results, setResults] = useLocalStorage<InvestmentResults | null>(
    "investment-calculator-results",
    null
  );
  const [accumulationData, setAccumulationData] = useLocalStorage<
    AccumulationDataPoint[]
  >("investment-calculator-accumulation-data", []);
  const [monthlyAccumulationData, setMonthlyAccumulationData] = useLocalStorage<
    MonthlyAccumulationDataPoint[]
  >("investment-calculator-monthly-data", []);
  const [calculatedValue, setCalculatedValue] = useLocalStorage<
    number | undefined
  >("investment-calculator-calculated-value", undefined);

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
          try {
            calculatedVal = calculateRequiredReturnRate(params);
            investmentResults = calculateInvestment({
              ...params,
              returnRate: calculatedVal,
            });
          } catch (error) {
            console.error("Return Rate calculation failed:", error);
            // Show error in results
            setResults({
              endBalance: 0,
              startingAmount,
              totalContributions: 0,
              totalInterest: 0,
            });
            setCalculatedValue(undefined);
            setAccumulationData([]);
            setMonthlyAccumulationData([]);
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error occurred";
            alert(`Return Rate calculation failed: ${errorMessage}`);
            return;
          }
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
      console.error("❌ Calculation error:", error);
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

  const handleCalculatorTypeChange = (type: CalculatorType) => {
    setFormValues((prev) => ({
      ...prev,
      calculatorType: type,
    }));
  };

  const clearCache = () => {
    // Clear all localStorage keys
    localStorage.removeItem("investment-calculator-values");
    localStorage.removeItem("investment-calculator-results");
    localStorage.removeItem("investment-calculator-accumulation-data");
    localStorage.removeItem("investment-calculator-monthly-data");
    localStorage.removeItem("investment-calculator-calculated-value");

    // Reset to default values
    setFormValues({
      calculatorType: CalculatorType.END_AMOUNT,
      startingAmount: 20000,
      targetAmount: 1000000,
      additionalContribution: 1000,
      returnRate: 6,
      investmentLength: 10,
      compoundFrequency: CompoundFrequency.ANNUALLY,
      contributionTiming: ContributionTiming.END,
      contributionFrequency: ContributionFrequency.ANNUALLY,
    });

    // Clear results
    setResults(null);
    setAccumulationData([]);
    setMonthlyAccumulationData([]);
    setCalculatedValue(undefined);

    alert("Cache cleared! Calculator reset to defaults.");
  };

  // Transform investment accumulation data to AmortizationDataPoint format
  const transformedAnnualData = useMemo((): AmortizationDataPoint[] => {
    return accumulationData.map((item, index) => ({
      paymentNumber: item.year,
      year: item.year,
      principal: item.deposit, // Map deposit to principal
      interest: item.interest,
      remainingBalance: item.endingBalance,
      totalInterestPaid: item.totalInterest,
      totalPrincipalPaid: item.totalContributions,
      isYearEnd: true,
    }));
  }, [accumulationData]);

  const transformedMonthlyData = useMemo((): AmortizationDataPoint[] => {
    return monthlyAccumulationData.map((item, index) => ({
      paymentNumber: index + 1,
      month: item.month,
      year: item.year,
      principal: item.deposit, // Map deposit to principal
      interest: item.interest,
      remainingBalance: item.endingBalance,
      isYearEnd: item.month === 12,
    }));
  }, [monthlyAccumulationData]);

  // Combine both datasets for the table - prefer annual for annual toggle, monthly as fallback
  const combinedData = useMemo((): AmortizationDataPoint[] => {
    return [...transformedMonthlyData];
  }, [transformedMonthlyData]);

  return (
    <div className="space-y-8">
      {/* Calculator Type Tabs */}
      <div className="flex justify-center mb-6 border-b">
        {Object.values(CalculatorType).map((type) => (
          <button
            key={type}
            onClick={() => handleCalculatorTypeChange(type)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none whitespace-nowrap
                        ${
                          formValues.calculatorType === type
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            {type}
          </button>
        ))}
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
                contributionFrequency={formValues.contributionFrequency}
              />
              <InvestmentCharts
                results={results}
                accumulationData={accumulationData}
              />
              <AmortizationTable
                data={combinedData}
                formatCurrency={formatCurrency}
                title="Investment Accumulation Schedule"
                showAnnualToggle={true}
                emptyStateMessage="No accumulation data available."
                paymentsPerYear={12}
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
