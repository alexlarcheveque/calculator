"use client";

import { useState, useEffect } from "react";
import LoanForm from "@/components/loan/LoanForm";
import LoanSummary from "@/components/loan/LoanSummary";
import LoanCharts from "@/components/loan/LoanCharts";
import AmortizationTable from "@/components/ui/AmortizationTable";
import GeneralLoanInformation from "./GeneralLoanInformation";
import LoanTypes from "./LoanTypes";
import LoanBasics from "./LoanBasics";
import SecuredVsUnsecuredLoans from "./SecuredVsUnsecuredLoans";
import LoanFAQSection from "./FAQSection";

export type LoanType = "amortized" | "deferred" | "bond";

export type ExtendedCompoundFrequency =
  | "annually"
  | "semiannually"
  | "quarterly"
  | "monthly"
  | "semimonthly"
  | "biweekly"
  | "weekly"
  | "daily"
  | "continuously";

export type AmortizedPaybackFrequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "halfmonth"
  | "month"
  | "quarter"
  | "halfyear"
  | "year";

export interface AmortizedLoanInput {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  interestRate: number;
  compoundFrequency: ExtendedCompoundFrequency;
  payBackFrequency: AmortizedPaybackFrequency;
}

// Define the type for individual entries in the amortization schedule
export interface ScheduleEntry {
  paymentNumber: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  totalInterest: number;
  remainingBalance: number;
}

export interface AmortizedLoanResult {
  paymentPerPeriod: number;
  totalPaymentsValue: number;
  numberOfPayments: number;
  totalInterest: number;
  principal: number;
  amortizationSchedule: ScheduleEntry[]; // Use the defined type
}

export interface DeferredLoanInput {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  interestRate: number;
  compoundFrequency: ExtendedCompoundFrequency;
}

export interface DeferredLoanResult {
  amountDueAtMaturity: number;
  totalInterest: number;
  principal: number;
}

export interface BondLoanInput {
  predeterminedDueAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  interestRate: number;
  compoundFrequency: ExtendedCompoundFrequency;
}

export interface BondLoanResult {
  amountReceivedAtStart: number;
  totalInterest: number;
  faceValue: number;
}

export type LoanInput = AmortizedLoanInput | DeferredLoanInput | BondLoanInput;
export type LoanResult =
  | AmortizedLoanResult
  | DeferredLoanResult
  | BondLoanResult;

const LoanPage = () => {
  const [loanType, setLoanType] = useState<LoanType>("amortized");
  const [inputs, setInputs] = useState<Partial<LoanInput>>({
    loanAmount: 100000,
    loanTermYears: 10,
    loanTermMonths: 0,
    interestRate: 6,
    compoundFrequency: "monthly",
    payBackFrequency: "month",
    predeterminedDueAmount: 100000,
  });
  const [results, setResults] = useState<LoanResult | null>(null);

  const handleInputChange = (field: keyof LoanInput, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoanTypeChange = (type: LoanType) => {
    setLoanType(type);
    if (type === "amortized") {
      setInputs({
        loanAmount: 100000,
        loanTermYears: 10,
        loanTermMonths: 0,
        interestRate: 6,
        compoundFrequency: "monthly",
        payBackFrequency: "month",
      });
    } else if (type === "deferred") {
      setInputs({
        loanAmount: 100000,
        loanTermYears: 10,
        loanTermMonths: 0,
        interestRate: 6,
        compoundFrequency: "annually",
      });
    } else if (type === "bond") {
      setInputs({
        predeterminedDueAmount: 100000,
        loanTermYears: 10,
        loanTermMonths: 0,
        interestRate: 6,
        compoundFrequency: "annually",
      });
    }
  };

  const calculateLoan = () => {
    const termYears =
      (inputs.loanTermYears || 0) + (inputs.loanTermMonths || 0) / 12;
    const annualInterestRateInput = (inputs.interestRate || 0) / 100;

    if (loanType === "amortized") {
      const { loanAmount, payBackFrequency, compoundFrequency } =
        inputs as AmortizedLoanInput;
      if (
        !(typeof loanAmount === "number" && loanAmount > 0) ||
        termYears <= 0 ||
        annualInterestRateInput < 0
      ) {
        setResults(null);
        return;
      }

      const periodsPerYearMap: Record<AmortizedPaybackFrequency, number> = {
        daily: 365,
        weekly: 52,
        biweekly: 26,
        halfmonth: 24,
        month: 12,
        quarter: 4,
        halfyear: 2,
        year: 1,
      };
      const PPY = periodsPerYearMap[payBackFrequency!];
      if (!PPY) {
        setResults(null);
        return;
      }

      let periodicInterestRate: number;
      const nominalAnnualRate = annualInterestRateInput;

      if (compoundFrequency === "continuously") {
        periodicInterestRate = Math.exp(nominalAnnualRate / PPY) - 1;
      } else if (compoundFrequency === "annually") {
        periodicInterestRate = Math.pow(1 + nominalAnnualRate, 1 / PPY) - 1;
      } else {
        const C_map: Record<
          Exclude<ExtendedCompoundFrequency, "annually" | "continuously">,
          number
        > = {
          semiannually: 2,
          quarterly: 4,
          monthly: 12,
          semimonthly: 24,
          biweekly: 26,
          weekly: 52,
          daily: 365,
        };
        const C = C_map[compoundFrequency!];
        if (!C) {
          setResults(null);
          return;
        }
        periodicInterestRate = Math.pow(1 + nominalAnnualRate / C, C / PPY) - 1;
      }

      if (annualInterestRateInput === 0) periodicInterestRate = 0;

      const numberOfPayments = Math.round(termYears * PPY);
      let paymentPerPeriod: number;
      if (periodicInterestRate === 0 || numberOfPayments === 0) {
        paymentPerPeriod =
          numberOfPayments > 0 ? loanAmount / numberOfPayments : 0;
      } else {
        paymentPerPeriod =
          (loanAmount *
            (periodicInterestRate *
              Math.pow(1 + periodicInterestRate, numberOfPayments))) /
          (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1);
      }
      if (isNaN(paymentPerPeriod) || !isFinite(paymentPerPeriod))
        paymentPerPeriod = 0;

      const totalPaymentsValue = paymentPerPeriod * numberOfPayments;
      const totalInterest =
        totalPaymentsValue > 0 ? totalPaymentsValue - loanAmount : 0;

      const schedule: ScheduleEntry[] = []; // Use the defined type
      if (loanAmount > 0 && numberOfPayments > 0) {
        let balance = loanAmount;
        let totalInterestPaidRunning = 0;
        for (let i = 1; i <= numberOfPayments; i++) {
          const interestForPeriod = balance * periodicInterestRate;
          const principalForPeriod = paymentPerPeriod - interestForPeriod;
          balance -= principalForPeriod;
          totalInterestPaidRunning += interestForPeriod;
          schedule.push({
            paymentNumber: i,
            paymentAmount: paymentPerPeriod,
            principalPaid: principalForPeriod,
            interestPaid: interestForPeriod,
            totalInterest: totalInterestPaidRunning,
            remainingBalance: Math.max(0, balance),
          });
        }
      }

      setResults({
        paymentPerPeriod,
        totalPaymentsValue,
        numberOfPayments,
        totalInterest,
        principal: loanAmount,
        amortizationSchedule: schedule,
      });
    } else if (loanType === "deferred") {
      const { loanAmount, compoundFrequency } = inputs as DeferredLoanInput;
      if (
        !(typeof loanAmount === "number" && loanAmount > 0) ||
        termYears <= 0 ||
        annualInterestRateInput < 0
      ) {
        setResults(null);
        return;
      }
      let amountDueAtMaturity: number;
      if (compoundFrequency === "continuously") {
        amountDueAtMaturity =
          loanAmount * Math.exp(annualInterestRateInput * termYears);
      } else {
        const C_map: Record<
          Exclude<ExtendedCompoundFrequency, "continuously">,
          number
        > = {
          annually: 1,
          semiannually: 2,
          quarterly: 4,
          monthly: 12,
          semimonthly: 24,
          biweekly: 26,
          weekly: 52,
          daily: 365,
        };
        const C = C_map[compoundFrequency!];
        if (!C) {
          setResults(null);
          return;
        }
        const numberOfCompounds = termYears * C;
        const periodicRate = annualInterestRateInput / C;
        amountDueAtMaturity =
          loanAmount * Math.pow(1 + periodicRate, numberOfCompounds);
      }
      const totalInterest = amountDueAtMaturity - loanAmount;
      setResults({
        amountDueAtMaturity,
        totalInterest,
        principal: loanAmount,
      });
    } else if (loanType === "bond") {
      const { predeterminedDueAmount, compoundFrequency } =
        inputs as BondLoanInput;
      if (
        !(
          typeof predeterminedDueAmount === "number" &&
          predeterminedDueAmount > 0
        ) ||
        termYears <= 0 ||
        annualInterestRateInput < 0
      ) {
        setResults(null);
        return;
      }
      let amountReceivedAtStart: number;
      if (compoundFrequency === "continuously") {
        amountReceivedAtStart =
          predeterminedDueAmount /
          Math.exp(annualInterestRateInput * termYears);
      } else {
        const C_map: Record<
          Exclude<ExtendedCompoundFrequency, "continuously">,
          number
        > = {
          annually: 1,
          semiannually: 2,
          quarterly: 4,
          monthly: 12,
          semimonthly: 24,
          biweekly: 26,
          weekly: 52,
          daily: 365,
        };
        const C = C_map[compoundFrequency!];
        if (!C) {
          setResults(null);
          return;
        }
        const numberOfCompounds = termYears * C;
        const periodicRate = annualInterestRateInput / C;
        amountReceivedAtStart =
          predeterminedDueAmount /
          Math.pow(1 + periodicRate, numberOfCompounds);
      }
      const totalInterest = predeterminedDueAmount - amountReceivedAtStart;
      setResults({
        amountReceivedAtStart,
        totalInterest,
        faceValue: predeterminedDueAmount,
      });
    }
  };

  useEffect(() => {
    calculateLoan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, loanType]);

  const currentLoanInput = inputs as LoanInput;
  const currentAmortizedResult = results as AmortizedLoanResult | null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Loan Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate loan payments, total interest costs, and amortization
          schedules for amortized, deferred, and bond loans. Compare different
          loan terms and interest rates to find the best financing option for
          your needs. Understand how compound interest affects your payments and
          see detailed payment breakdowns over time. Essential for personal
          loans, business financing, and investment planning decisions.
        </p>
      </div>

      <div className="flex justify-center mb-6 border-b">
        {(["amortized", "deferred", "bond"] as LoanType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleLoanTypeChange(type)}
            className={`px-4 py-2 text-lg font-medium capitalize focus:outline-none 
                        ${
                          loanType === type
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            {type.replace("-", " ")} Loan
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <LoanForm
            loanType={loanType}
            inputs={currentLoanInput}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          {results && (
            <>
              <LoanSummary loanType={loanType} results={results} />
              <LoanCharts
                loanType={loanType}
                inputs={currentLoanInput}
                results={results}
              />
            </>
          )}
          {!results && (
            <p className="text-center text-gray-500 md:mt-20">
              Enter loan details to see the results update automatically.
            </p>
          )}
        </div>
      </div>

      {loanType === "amortized" &&
        currentAmortizedResult?.amortizationSchedule &&
        currentAmortizedResult.amortizationSchedule.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 mt-8">
            <div className="md:col-start-2 md:col-span-2 space-y-4">
              <AmortizationTable
                data={currentAmortizedResult.amortizationSchedule}
                formatCurrency={formatCurrency}
              />
            </div>
          </div>
        )}

      <div className="space-y-8">
        <LoanTypes />
        <LoanBasics />
        <SecuredVsUnsecuredLoans />
      </div>

      <LoanFAQSection />
    </div>
  );
};

export default LoanPage;

export const formatCurrency = (value: number | undefined) => {
  if (value === undefined || isNaN(value)) return "N/A";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
