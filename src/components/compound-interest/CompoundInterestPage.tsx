"use client";

import { useState, useEffect } from "react";
import CompoundInterestForm from "@/components/compound-interest/CompoundInterestForm";
import CompoundInterestSummary from "@/components/compound-interest/CompoundInterestSummary";
import CompoundInterestExample from "@/components/compound-interest/CompoundInterestExample";
import FAQSection from "@/components/compound-interest/FAQSection";
import {
  calculateCompoundInterestConversion,
  getCompoundingFrequencyDisplayName,
} from "@/utils/compoundInterestCalculations";
import {
  CompoundInterestFormValues,
  CompoundInterestResults,
  CompoundingFrequency,
} from "@/types/compoundInterest";

export default function CompoundInterestPage() {
  const [formValues, setFormValues] = useState<CompoundInterestFormValues>({
    inputInterestRate: 6,
    inputCompoundingFrequency: CompoundingFrequency.MONTHLY,
    outputCompoundingFrequency: CompoundingFrequency.ANNUALLY,
  });

  const [results, setResults] = useState<CompoundInterestResults | null>(null);

  useEffect(() => {
    const {
      inputInterestRate,
      inputCompoundingFrequency,
      outputCompoundingFrequency,
    } = formValues;

    if (inputInterestRate <= 0) {
      setResults(null);
      return;
    }

    const conversionResults = calculateCompoundInterestConversion({
      interestRate: inputInterestRate,
      inputFrequency: inputCompoundingFrequency,
      outputFrequency: outputCompoundingFrequency,
    });

    setResults(conversionResults);
  }, [formValues]);

  const handleInputChange = (
    name: string,
    value: number | CompoundingFrequency
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <CompoundInterestForm
            values={formValues}
            onChange={handleInputChange}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && <CompoundInterestSummary results={results} />}

          {/* Show conversion result prominently */}
          {results && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-6 mb-4">
                  {/* Input Rate */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      Input Interest
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {results.inputRate.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {getCompoundingFrequencyDisplayName(
                        results.inputFrequency
                      )}
                    </div>
                  </div>

                  {/* Equals Sign */}
                  <div className="text-4xl font-bold text-blue-600">=</div>

                  {/* Output Rate */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      Output Interest
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                      {results.outputRate.toFixed(5)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {getCompoundingFrequencyDisplayName(
                        results.outputFrequency
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Effective Annual Rate (APY):{" "}
                  <span className="font-semibold text-blue-600">
                    {results.effectiveAnnualRate.toFixed(5)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Educational content about compound interest */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              About Compound Interest
            </h2>
            <div className="prose prose-sm text-gray-600">
              <p className="mb-4">
                The <em>Compound Interest Calculator</em> above can be used to
                compare or convert the interest rates of different compounding
                periods. Use our examples below to see how compound interest
                grows over time.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is compound interest?
              </h3>
              <p className="mb-4">
                Interest is the cost of using borrowed money, or more
                specifically, the amount a lender receives for advancing money
                to a borrower. When paying interest, the borrower will mostly
                pay a percentage of the principal (the borrowed amount). The
                concept of interest can be categorized into simple interest or
                compound interest.
              </p>

              <p className="mb-4">
                Simple interest refers to interest earned only on the principal,
                usually denoted as a specified percentage of the principal.
                Compound interest is widely used instead. Compound interest is
                interest earned on both the principal and on the accumulated
                interest.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Example:</h4>
                <p className="text-blue-700 text-sm">
                  If you borrowed $100 at 10% compound interest per year for two
                  years:
                </p>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• Year 1: $100 × 10% = $10 interest → Balance: $110</li>
                  <li>• Year 2: $110 × 10% = $11 interest → Balance: $121</li>
                  <li>
                    • Total compound interest: $21 vs $20 for simple interest
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compound Interest Growth Example */}
      <div className="mb-16">
        <CompoundInterestExample />
      </div>

      {/* Educational Content */}
      <div className="mb-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Different Compounding Frequencies
        </h2>
        <div className="prose prose-sm text-gray-600">
          <p className="mb-4">
            Interest can compound on any given frequency schedule but will
            typically compound annually or monthly. Compounding frequencies
            impact the interest owed on a loan. For example, a loan with a 10%
            interest rate compounding semi-annually has an interest rate of 10%
            / 2, or 5% every half a year.
          </p>

          <p className="mb-4">
            The interest rates of savings accounts and Certificate of Deposits
            (CD) tend to compound annually. Mortgage loans, home equity loans,
            and credit card accounts usually compound monthly. Also, an interest
            rate compounded more frequently tends to appear lower. For this
            reason, lenders often like to present interest rates compounded
            monthly instead of annually.
          </p>

          <p className="mb-4">
            For example, a 6% mortgage interest rate amounts to a monthly 0.5%
            interest rate. However, after compounding monthly, interest totals
            6.17% compounded annually.
          </p>
        </div>
      </div>

      {/* Compound Interest Formulas */}
      <div className="mb-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Compound Interest Formulas
        </h2>
        <div className="prose prose-sm text-gray-600">
          <p className="mb-4">
            The calculation of compound interest can involve complicated
            formulas. Our calculator provides a simple solution to address that
            difficulty. However, those who want a deeper understanding of how
            the calculations work can refer to the formulas below:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Basic Compound Interest
            </h3>
            <p className="mb-2">The basic formula for compound interest is:</p>
            <div className="bg-white p-3 rounded border text-center font-mono">
              A<sub>t</sub> = A<sub>0</sub>(1 + r)<sup>n</sup>
            </div>
            <div className="mt-2 text-sm">
              <p>
                <strong>Where:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  A<sub>0</sub>: principal amount, or initial investment
                </li>
                <li>
                  A<sub>t</sub>: amount after time t
                </li>
                <li>r: interest rate</li>
                <li>
                  n: number of compounding periods, usually expressed in years
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Compound Interest with Different Frequencies
            </h3>
            <p className="mb-2">
              For other compounding frequencies (monthly, weekly, daily):
            </p>
            <div className="bg-white p-3 rounded border text-center font-mono">
              A<sub>t</sub> = A<sub>0</sub> × (1 + r/n)<sup>nt</sup>
            </div>
            <div className="mt-2 text-sm">
              <p>
                <strong>Where:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  A<sub>0</sub>: principal amount, or initial investment
                </li>
                <li>
                  A<sub>t</sub>: amount after time t
                </li>
                <li>n: number of compounding periods in a year</li>
                <li>r: interest rate</li>
                <li>t: number of years</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">
              Continuous Compound Interest
            </h3>
            <p className="mb-2">For continuous compounding:</p>
            <div className="bg-white p-3 rounded border text-center font-mono">
              A<sub>t</sub> = A<sub>0</sub>e<sup>rt</sup>
            </div>
            <div className="mt-2 text-sm">
              <p>
                <strong>Where:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  A<sub>0</sub>: principal amount, or initial investment
                </li>
                <li>
                  A<sub>t</sub>: amount after time t
                </li>
                <li>r: interest rate</li>
                <li>t: number of years</li>
                <li>e: mathematical constant e, ~2.718</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
