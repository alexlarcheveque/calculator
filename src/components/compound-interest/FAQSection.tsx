"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const compoundInterestFAQItems: FAQItem[] = [
  {
    id: "what-is-compound-interest",
    question: "What is compound interest and how does it work?",
    answer: (
      <>
        <p className="mb-2">
          Compound interest is interest earned on both the original principal
          and previously earned interest, creating exponential growth over time.
        </p>
        <p className="mb-2">
          <strong>Compound vs simple interest example ($1,000 at 10%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Year 1:</strong> Simple = $1,100, Compound = $1,100 (same)
          </li>
          <li>
            <strong>Year 2:</strong> Simple = $1,200, Compound = $1,210 (+$10)
          </li>
          <li>
            <strong>Year 5:</strong> Simple = $1,500, Compound = $1,611 (+$111)
          </li>
          <li>
            <strong>Year 10:</strong> Simple = $2,000, Compound = $2,594 (+$594)
          </li>
          <li>
            <strong>Year 20:</strong> Simple = $3,000, Compound = $6,728
            (+$3,728)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> The longer the time period, the greater
          the advantage of compound interest over simple interest.
        </p>
      </>
    ),
  },
  {
    id: "compounding-frequency-effect",
    question: "How does compounding frequency affect my returns?",
    answer: (
      <>
        <p className="mb-2">
          More frequent compounding increases your returns, but the effect
          diminishes at higher frequencies.
        </p>
        <p className="mb-2">
          <strong>
            $10,000 at 6% for 10 years with different frequencies:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Annual:</strong> $17,908 (compound 1x/year)
          </li>
          <li>
            <strong>Semi-annual:</strong> $18,061 (compound 2x/year, +$153)
          </li>
          <li>
            <strong>Quarterly:</strong> $18,140 (compound 4x/year, +$232)
          </li>
          <li>
            <strong>Monthly:</strong> $18,194 (compound 12x/year, +$286)
          </li>
          <li>
            <strong>Daily:</strong> $18,221 (compound 365x/year, +$313)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical tip:</strong> While daily compounding is best, the
          difference from monthly is minimal. Focus more on getting the highest
          interest rate available.
        </p>
      </>
    ),
  },
  {
    id: "rule-of-72-doubling-time",
    question: "How do I use the Rule of 72 to calculate doubling time?",
    answer: (
      <>
        <p className="mb-2">
          The Rule of 72 provides a quick estimate of how long it takes to
          double your money: divide 72 by the annual interest rate.
        </p>
        <p className="mb-2">
          <strong>Rule of 72 examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>3% interest:</strong> 72 ÷ 3 = 24 years to double
          </li>
          <li>
            <strong>6% interest:</strong> 72 ÷ 6 = 12 years to double
          </li>
          <li>
            <strong>9% interest:</strong> 72 ÷ 9 = 8 years to double
          </li>
          <li>
            <strong>12% interest:</strong> 72 ÷ 12 = 6 years to double
          </li>
        </ul>
        <p className="mb-2">
          <strong>Verification example ($5,000 at 6%):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Rule of 72 prediction: 12 years to reach $10,000</li>
          <li>Actual calculation: $5,000 × 1.06^12 = $10,060</li>
          <li>The rule is remarkably accurate for rates between 6-10%</li>
        </ul>
      </>
    ),
  },
  {
    id: "apr-vs-apy-difference",
    question: "What's the difference between APR and APY?",
    answer: (
      <>
        <p className="mb-2">
          <strong>APR (Annual Percentage Rate):</strong> The simple annual rate
          without compounding effects.
        </p>
        <p className="mb-2">
          <strong>APY (Annual Percentage Yield):</strong> The effective annual
          rate including compounding effects.
        </p>
        <p className="mb-2">
          <strong>Example comparison (6% APR with monthly compounding):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>APR:</strong> 6.00% (nominal rate)
          </li>
          <li>
            <strong>APY:</strong> 6.17% (effective rate with compounding)
          </li>
          <li>
            <strong>On $10,000:</strong> Earns $617 instead of $600
          </li>
        </ul>
        <p className="text-sm">
          <strong>Important:</strong> Always compare APY when shopping for
          savings accounts or loans, as it shows the true cost or return after
          accounting for compounding.
        </p>
      </>
    ),
  },
  {
    id: "time-value-money-early-investing",
    question: "Why is starting early so important for compound interest?",
    answer: (
      <>
        <p className="mb-2">
          Starting early gives compound interest more time to work, creating
          dramatic differences in final amounts.
        </p>
        <p className="mb-2">
          <strong>$200/month invested at 7% annual return:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Start at age 25:</strong> $1.37 million by age 65 (40 years)
          </li>
          <li>
            <strong>Start at age 35:</strong> $610,000 by age 65 (30 years)
          </li>
          <li>
            <strong>Start at age 45:</strong> $262,000 by age 65 (20 years)
          </li>
          <li>
            <strong>Delay cost:</strong> Waiting 10 years (25→35) costs
            $760,000!
          </li>
        </ul>
        <p className="mb-2">
          <strong>The power of just 5 extra years:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            $100/month from age 25-30 (5 years), then stop: $432,000 at 65
          </li>
          <li>$100/month from age 30-65 (35 years): $398,000 at 65</li>
          <li>5 early years beat 35 later years due to compound growth!</li>
        </ul>
      </>
    ),
  },
  {
    id: "compound-interest-debt-dangers",
    question: "How does compound interest work against me with debt?",
    answer: (
      <>
        <p className="mb-2">
          Compound interest works against you with debt, especially credit cards
          that compound monthly on unpaid balances.
        </p>
        <p className="mb-2">
          <strong>
            $5,000 credit card debt at 18% APR (minimum payments):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Monthly payment:</strong> $100 (2% of balance minimum)
          </li>
          <li>
            <strong>Time to pay off:</strong> 94 months (nearly 8 years)
          </li>
          <li>
            <strong>Total interest paid:</strong> $4,311
          </li>
          <li>
            <strong>Total cost:</strong> $9,311 (nearly double original debt)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Strategy comparison for same debt:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$200/month payment: 32 months, $1,362 interest</li>
          <li>$300/month payment: 20 months, $810 interest</li>
          <li>Higher payments save thousands in compound interest</li>
        </ul>
      </>
    ),
  },
  {
    id: "effective-annual-rate-calculation",
    question: "How do I calculate the effective annual rate (EAR)?",
    answer: (
      <>
        <p className="mb-2">
          The Effective Annual Rate (EAR) formula accounts for compounding
          frequency: EAR = (1 + r/n)^n - 1
        </p>
        <p className="mb-2">
          <strong>Where:</strong> r = nominal rate, n = compounding periods per
          year
        </p>
        <p className="mb-2">
          <strong>Example: 8% nominal rate, quarterly compounding:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> EAR = (1 + 0.08/4)^4 - 1
          </li>
          <li>
            <strong>Calculation:</strong> (1 + 0.02)^4 - 1
          </li>
          <li>
            <strong>Result:</strong> (1.02)^4 - 1 = 1.0824 - 1 = 0.0824
          </li>
          <li>
            <strong>EAR:</strong> 8.24% (vs 8% nominal)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Real impact:</strong> On $10,000, this means $824 annual
          interest instead of $800, earning an extra $24 from compounding.
        </p>
      </>
    ),
  },
  {
    id: "best-compound-interest-investments",
    question: "What are the best investments for maximizing compound interest?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Short-term/conservative options:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High-yield savings:</strong> 4-5% APY, daily compounding
          </li>
          <li>
            <strong>CDs:</strong> 4-6% APY, guaranteed returns, various terms
          </li>
          <li>
            <strong>Money market accounts:</strong> 3-5% APY, limited
            withdrawals
          </li>
        </ul>
        <p className="mb-2">
          <strong>Long-term/growth options:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Index funds:</strong> Historical 7-10% average, reinvested
            dividends
          </li>
          <li>
            <strong>Dividend growth stocks:</strong> Growing dividend payments
            plus appreciation
          </li>
          <li>
            <strong>401(k) with employer match:</strong> Immediate 100% return
            on matched contributions
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key factor:</strong> Choose investments that automatically
          reinvest earnings for true compound growth.
        </p>
      </>
    ),
  },
  {
    id: "continuous-compounding-explanation",
    question: "What is continuous compounding and when is it used?",
    answer: (
      <>
        <p className="mb-2">
          Continuous compounding is the mathematical limit where interest
          compounds an infinite number of times per year.
        </p>
        <p className="mb-2">
          <strong>Formula:</strong> A = Pe^(rt), where e ≈ 2.71828
        </p>
        <p className="mb-2">
          <strong>$1,000 at 8% for 10 years comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Annual:</strong> $1,000 × (1.08)^10 = $2,159
          </li>
          <li>
            <strong>Monthly:</strong> $1,000 × (1 + 0.08/12)^120 = $2,220
          </li>
          <li>
            <strong>Daily:</strong> $1,000 × (1 + 0.08/365)^3650 = $2,226
          </li>
          <li>
            <strong>Continuous:</strong> $1,000 × e^(0.08×10) = $2,226
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical use:</strong> Continuous compounding provides the
          theoretical maximum return and is used in advanced financial modeling
          and some specialized investment products.
        </p>
      </>
    ),
  },
  {
    id: "compound-interest-calculator-limitations",
    question: "What are the limitations of compound interest calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Calculator assumptions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Constant interest rates:</strong> Real rates fluctuate with
            market conditions
          </li>
          <li>
            <strong>Regular contributions:</strong> Life events may interrupt
            planned contributions
          </li>
          <li>
            <strong>No withdrawals:</strong> Emergencies may require early
            withdrawals
          </li>
          <li>
            <strong>Tax implications:</strong> Taxes reduce actual returns
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors to consider:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Inflation:</strong> Erodes purchasing power over time
          </li>
          <li>
            <strong>Market volatility:</strong> Stock returns vary significantly
            year-to-year
          </li>
          <li>
            <strong>Fees and expenses:</strong> Reduce effective returns
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best use:</strong> Use calculators for planning and
          goal-setting, but build in safety margins and review regularly.
        </p>
      </>
    ),
  },
];

export default function CompoundInterestFAQSection() {
  return (
    <FAQSection
      items={compoundInterestFAQItems}
      title="Frequently Asked Questions About Compound Interest"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="compound-interest-calculator-faq-schema"
      relatedLinks={[
        { href: "/interest", label: "Interest Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
        { href: "/savings", label: "Savings Calculator" },
      ]}
    />
  );
}
