"use client";

import { useState, useEffect } from "react";
import InvestmentForm from "@/components/investment/InvestmentForm";
import InvestmentSummary from "@/components/investment/InvestmentSummary";
import InvestmentCharts from "@/components/investment/InvestmentCharts";
import AccumulationTable from "@/components/investment/AccumulationTable";
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
          The Investment Calculator can be used to calculate a specific
          parameter for an investment plan. The tabs represent the desired
          parameter to be found. For example, to calculate the return rate
          needed to reach an investment goal with particular inputs, click the
          'Return Rate' tab.
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

      {/* FAQ Section */}
      <FAQSection />

      {/* Educational Content */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Understanding Investment Calculations
        </h2>

        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            Investing is the act of using money to make more money. The
            Investment Calculator can help determine one of many different
            variables concerning investments with a fixed rate of return.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Variables Involved
          </h3>
          <p className="mb-4">
            For any typical financial investment, there are several crucial
            elements that make up the investment:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Return rate</strong> – This is what matters most to many
              investors. It appears as a percentage and is used to compare the
              attractiveness of various types of financial investments.
            </li>
            <li>
              <strong>Starting amount</strong> – Sometimes called the principal,
              this is the amount present at the inception of the investment.
            </li>
            <li>
              <strong>End amount</strong> – The desired amount at the end of the
              investment period.
            </li>
            <li>
              <strong>Investment length</strong> – The duration of the
              investment. Generally, longer investments allow for more
              compounding and potentially greater rewards.
            </li>
            <li>
              <strong>Additional contribution</strong> – Regular contributions
              during the life of an investment will result in greater
              accumulated returns and a higher end value.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            The Power of Compound Interest
          </h3>
          <p className="mb-4">
            Compound interest is often called the "eighth wonder of the world"
            because of its powerful effect on investment growth. When you earn
            interest on both your original investment and previously earned
            interest, your money grows exponentially rather than linearly. The
            frequency of compounding (how often interest is calculated and added
            to your account) can significantly impact your returns over time.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Important Considerations
          </h3>
          <p className="mb-4">
            While this calculator provides valuable estimates, remember that
            actual investment returns can vary significantly due to market
            volatility, economic conditions, and other factors. It's important
            to:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Diversify your investments to reduce risk</li>
            <li>Consider the impact of inflation on your purchasing power</li>
            <li>
              Account for taxes, which can significantly affect your actual
              returns
            </li>
            <li>Review and adjust your investment strategy regularly</li>
            <li>
              Consult with a qualified financial advisor for personalized advice
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
