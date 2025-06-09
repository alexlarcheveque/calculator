"use client";

import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import FinanceForm from "@/components/finance/FinanceForm";
import FinanceSummary from "@/components/finance/FinanceSummary";
import FinanceCharts from "@/components/finance/FinanceCharts";
import TabbedContainer, { TabItem } from "@/components/ui/TabbedContainer";
import AmortizationTable, {
  AmortizationDataPoint,
} from "@/components/ui/AmortizationTable";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection";
import {
  calculateFinance,
  calculateFinanceSchedule,
  formatCurrencyDetailed,
} from "@/utils/financeCalculations";
import {
  FinanceFormValues,
  FinanceResults,
  FinanceScheduleDataPoint,
  CalculationType,
  PaymentTiming,
} from "@/types/finance";
import FinanceTypes from "@/components/finance/FinanceTypes";
import FinanceBasics from "@/components/finance/FinanceBasics";
import InvestmentVsSavings from "@/components/finance/InvestmentVsSavings";

export default function FinancePage() {
  const [calculationType, setCalculationType] =
    useLocalStorage<CalculationType>(
      "finance-calculator-type",
      CalculationType.FV
    );

  const [formValues, setFormValues] = useLocalStorage<FinanceFormValues>(
    "finance-calculator-inputs",
    {
      calculationType: CalculationType.FV,
      numberOfPeriods: 10,
      interestPerYear: 6,
      presentValue: 20000,
      periodicPayment: -2000,
      futureValue: -10000,
      periodsPerYear: 1,
      compoundingPerYear: 1,
      paymentTiming: PaymentTiming.END,
    }
  );

  const [results, setResults] = useState<FinanceResults | null>(null);
  const [scheduleData, setScheduleData] = useState<FinanceScheduleDataPoint[]>(
    []
  );

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    setFormValues((prev) => ({
      ...prev,
      calculationType: type,
    }));
  };

  useEffect(() => {
    const {
      numberOfPeriods,
      interestPerYear,
      presentValue,
      periodicPayment,
      futureValue,
      periodsPerYear,
      compoundingPerYear,
      paymentTiming,
    } = formValues;

    // Validate inputs based on calculation type
    const hasRequiredInputs = validateInputs(formValues);

    if (!hasRequiredInputs) {
      setResults(null);
      setScheduleData([]);
      return;
    }

    try {
      const financeResults = calculateFinance({
        calculationType,
        numberOfPeriods:
          calculationType !== CalculationType.N ? numberOfPeriods : undefined,
        interestPerYear:
          calculationType !== CalculationType.IY ? interestPerYear : undefined,
        presentValue:
          calculationType !== CalculationType.PV ? presentValue : undefined,
        periodicPayment:
          calculationType !== CalculationType.PMT ? periodicPayment : undefined,
        futureValue:
          calculationType !== CalculationType.FV ? futureValue : undefined,
        periodsPerYear,
        compoundingPerYear,
        paymentTiming,
      });

      const schedule = calculateFinanceSchedule({
        calculationType,
        numberOfPeriods: financeResults.numberOfPeriods,
        interestPerYear: financeResults.interestPerYear,
        presentValue: financeResults.presentValue,
        periodicPayment: financeResults.periodicPayment,
        futureValue: financeResults.futureValue,
        periodsPerYear,
        compoundingPerYear,
        paymentTiming,
      });

      setResults(financeResults);
      setScheduleData(schedule);
    } catch (error) {
      console.error("Calculation error:", error);
      setResults(null);
      setScheduleData([]);
    }
  }, [formValues, calculationType]);

  const validateInputs = (values: FinanceFormValues): boolean => {
    const {
      numberOfPeriods,
      interestPerYear,
      presentValue,
      periodicPayment,
      futureValue,
    } = values;

    switch (calculationType) {
      case CalculationType.FV:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined
        );
      case CalculationType.PV:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          futureValue !== undefined &&
          periodicPayment !== undefined
        );
      case CalculationType.PMT:
        return (
          numberOfPeriods > 0 &&
          interestPerYear >= 0 &&
          presentValue !== undefined &&
          futureValue !== undefined
        );
      case CalculationType.N:
        return (
          interestPerYear > 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined &&
          futureValue !== undefined
        );
      case CalculationType.IY:
        return (
          numberOfPeriods > 0 &&
          presentValue !== undefined &&
          periodicPayment !== undefined &&
          futureValue !== undefined
        );
      default:
        return false;
    }
  };

  const handleInputChange = (name: string, value: number | string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Transform finance schedule data to AmortizationDataPoint format
  const transformedScheduleData = useMemo((): AmortizationDataPoint[] => {
    return scheduleData.map((item, index) => ({
      paymentNumber: item.period,
      year: Math.ceil(item.period / (formValues.periodsPerYear || 1)),
      month: ((item.period - 1) % 12) + 1,
      principal: Math.abs(item.payment), // Payment amount as principal
      interest: item.interest,
      remainingBalance: Math.abs(item.futureValue),
      totalInterestPaid: item.accumulatedInterest,
      totalPrincipalPaid: item.sumOfPayments,
      isYearEnd: item.period % (formValues.periodsPerYear || 1) === 0,
    }));
  }, [scheduleData, formValues.periodsPerYear]);

  // Create content for calculator (shared across all tabs)
  const calculatorContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <FinanceForm
          values={formValues}
          onChange={handleInputChange}
          onCalculationTypeChange={handleCalculationTypeChange}
        />
      </div>
      <div className="lg:col-span-8 space-y-6">
        {results ? (
          <>
            <FinanceSummary
              results={results}
              calculationType={calculationType}
            />
            <FinanceCharts results={results} scheduleData={scheduleData} />
            {scheduleData.length > 0 && (
              <AmortizationTable
                data={transformedScheduleData}
                formatCurrency={formatCurrencyDetailed}
                title="Finance Schedule"
                showAnnualToggle={true}
                emptyStateMessage="No schedule data available."
                paymentsPerYear={formValues.periodsPerYear}
              />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Enter finance details to see the results update automatically.
          </p>
        )}
      </div>
    </div>
  );

  // Create tabs for the main calculator
  const calculatorTabs: TabItem[] = [
    {
      id: CalculationType.FV,
      label: "Future Value (FV)",
      content: calculatorContent,
    },
    {
      id: CalculationType.PV,
      label: "Present Value (PV)",
      content: calculatorContent,
    },
    {
      id: CalculationType.PMT,
      label: "Payment (PMT)",
      content: calculatorContent,
    },
    {
      id: CalculationType.N,
      label: "Periods (N)",
      content: calculatorContent,
    },
    {
      id: CalculationType.IY,
      label: "Interest Rate (I/Y)",
      content: calculatorContent,
    },
  ];

  // FAQ items for finance calculator
  const faqItems: FAQItem[] = [
    {
      id: "what-is-tvm",
      question: "What is the Time Value of Money?",
      answer: (
        <div>
          <p className="mb-3">
            The Time Value of Money (TVM) is a fundamental financial principle
            stating that money available today is worth more than the same
            amount in the future due to its potential earning capacity.
          </p>
          <p className="mb-3">
            This concept forms the foundation for all financial calculations,
            including present value, future value, annuities, and loan payments.
          </p>
          <p>
            Key factors include the interest rate, number of periods, and
            payment timing.
          </p>
        </div>
      ),
    },
    {
      id: "pv-vs-fv",
      question: "What's the difference between Present Value and Future Value?",
      answer: (
        <div>
          <p className="mb-3">
            <strong>Present Value (PV)</strong> is the current worth of a future
            sum of money, discounted at a specific interest rate. It answers:
            "How much is a future amount worth today?"
          </p>
          <p className="mb-3">
            <strong>Future Value (FV)</strong> is what a current sum of money
            will be worth at a future date, given a specific interest rate. It
            answers: "What will my money be worth in the future?"
          </p>
          <p>
            Both calculations are essential for investment planning, loan
            analysis, and financial decision-making.
          </p>
        </div>
      ),
    },
    {
      id: "payment-timing",
      question: "Does payment timing matter?",
      answer: (
        <div>
          <p className="mb-3">
            Yes, payment timing significantly affects calculations. Payments can
            be made at:
          </p>
          <ul className="list-disc list-inside mb-3 space-y-1">
            <li>
              <strong>End of period:</strong> Most common for loans and
              investments
            </li>
            <li>
              <strong>Beginning of period:</strong> Results in higher future
              values due to extra compounding time
            </li>
          </ul>
          <p>
            The difference becomes more significant with higher interest rates
            and longer time periods.
          </p>
        </div>
      ),
    },
    {
      id: "compound-frequency",
      question: "How does compounding frequency affect results?",
      answer: (
        <div>
          <p className="mb-3">
            Compounding frequency determines how often interest is calculated
            and added to the principal. More frequent compounding generally
            results in higher returns:
          </p>
          <ul className="list-disc list-inside mb-3 space-y-1">
            <li>
              <strong>Annual:</strong> Once per year
            </li>
            <li>
              <strong>Quarterly:</strong> Four times per year
            </li>
            <li>
              <strong>Monthly:</strong> Twelve times per year
            </li>
            <li>
              <strong>Daily:</strong> 365 times per year
            </li>
          </ul>
          <p>
            The effect is more pronounced with higher interest rates and longer
            time periods.
          </p>
        </div>
      ),
    },
    {
      id: "negative-values",
      question: "What do negative values mean?",
      answer: (
        <div>
          <p className="mb-3">
            In financial calculations, negative and positive values represent
            cash flow directions:
          </p>
          <ul className="list-disc list-inside mb-3 space-y-1">
            <li>
              <strong>Negative values:</strong> Cash outflows (payments you
              make)
            </li>
            <li>
              <strong>Positive values:</strong> Cash inflows (money you receive)
            </li>
          </ul>
          <p>
            For example, if you invest $1,000 (negative) and receive $1,200 in
            return (positive), this represents the cash flow from your
            perspective.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Calculator with Tabs */}
      <TabbedContainer
        tabs={calculatorTabs}
        defaultActiveTab={calculationType}
        onActiveTabChange={(tabId) =>
          handleCalculationTypeChange(tabId as CalculationType)
        }
        className="mb-16"
      />

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <FinanceTypes />
        <FinanceBasics />
        <InvestmentVsSavings />
      </div>

      {/* FAQ Section */}
      <FAQSection
        items={faqItems}
        title="Finance Calculator FAQ"
        includeSchema={true}
        schemaId="finance-calculator-faq"
      />
    </div>
  );
}
