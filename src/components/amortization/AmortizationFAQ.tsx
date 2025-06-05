"use client";

import { useState } from "react";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const amortizationFAQItems: FAQItem[] = [
  {
    id: "what-is-amortization",
    question: "What is amortization?",
    answer:
      "Amortization is the process of paying off a loan through regular monthly payments over a set period of time. Each payment includes both principal (the amount borrowed) and interest. Early in the loan term, more of each payment goes toward interest, while later payments apply more toward the principal balance.",
  },
  {
    id: "why-early-payments-more-interest",
    question: "Why do early payments have more interest?",
    answer:
      "Interest is calculated on the remaining loan balance. Since the balance is highest at the beginning of the loan, the interest portion of early payments is larger. As you pay down the principal over time, the interest portion decreases and the principal portion increases.",
  },
  {
    id: "what-are-extra-payments",
    question: "What are extra payments and how do they help?",
    answer: (
      <>
        <p className="mb-2">
          Extra payments are additional amounts you pay toward the principal
          balance beyond your required monthly payment. These payments directly
          reduce the loan balance, which means less interest accrues over time.
        </p>
        <p className="mb-2">
          <strong>Benefits of extra payments:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Significantly reduce total interest paid</li>
          <li>Shorten the loan term</li>
          <li>Build equity faster</li>
          <li>Become debt-free sooner</li>
        </ul>
      </>
    ),
  },
  {
    id: "extra-payments-massive-savings",
    question: "How much can extra payments actually save me?",
    answer: (
      <>
        <p className="mb-2">
          Extra payments provide exponential savings by eliminating future
          interest on reduced principal.
        </p>
        <p className="mb-2">
          <strong>
            $300,000 mortgage at 7% for 30 years ($1,996 base payment):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>No extra payments:</strong> $418,527 total interest over 30
            years
          </li>
          <li>
            <strong>$100 extra monthly:</strong> $313,566 interest, save
            $104,961, paid off in 25.5 years
          </li>
          <li>
            <strong>$300 extra monthly:</strong> $252,193 interest, save
            $166,334, paid off in 21.1 years
          </li>
          <li>
            <strong>$500 extra monthly:</strong> $216,112 interest, save
            $202,415, paid off in 18.3 years
          </li>
        </ul>
        <p className="text-sm">
          Earlier payments have dramatically more impact than later payments.
        </p>
      </>
    ),
  },
  {
    id: "mortgage-vs-investment-strategy",
    question: "Should I pay extra on my mortgage or invest the money instead?",
    answer: (
      <>
        <p className="mb-2">
          The optimal strategy depends on your mortgage rate vs expected
          investment returns.
        </p>
        <p className="mb-2">
          <strong>$500 monthly decision analysis (6% mortgage rate):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Extra mortgage payments:</strong> Guaranteed 6% return,
            $109,610 savings over loan life
          </li>
          <li>
            <strong>S&P 500 investing (7% average):</strong> $500/month × 20
            years = $244,691 portfolio value
          </li>
          <li>
            <strong>Conservative investing (4% return):</strong> $500/month × 20
            years = $147,954 portfolio value
          </li>
        </ul>
        <p className="mb-2">
          <strong>Decision framework by mortgage rate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Mortgage rate 7%+:</strong> Pay extra on mortgage
            (guaranteed high return)
          </li>
          <li>
            <strong>Mortgage rate 4-7%:</strong> Depends on risk tolerance and
            investment timeline
          </li>
          <li>
            <strong>Mortgage rate under 4%:</strong> Generally invest instead
            (historically better returns)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "amortization-different-loan-terms",
    question: "How do different loan terms affect my amortization schedule?",
    answer: (
      <>
        <p className="mb-2">
          Loan term dramatically affects both payment amount and total interest
          paid.
        </p>
        <p className="mb-2">
          <strong>$200,000 loan at 6.5% interest comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>15-year term:</strong> $1,742/month, $113,505 total interest
          </li>
          <li>
            <strong>20-year term:</strong> $1,474/month, $153,847 total interest
          </li>
          <li>
            <strong>25-year term:</strong> $1,350/month, $205,069 total interest
          </li>
          <li>
            <strong>30-year term:</strong> $1,264/month, $255,008 total interest
          </li>
        </ul>
        <p className="text-sm">
          <strong>Strategic insight:</strong> Shorter terms save massive
          interest but require higher monthly budget capacity.
        </p>
      </>
    ),
  },
  {
    id: "biweekly-payment-amortization-hack",
    question: "How does switching to biweekly payments affect amortization?",
    answer: (
      <>
        <p className="mb-2">
          Biweekly payments result in 26 payments yearly (equivalent to 13
          monthly payments) and dramatically accelerate amortization.
        </p>
        <p className="mb-2">
          <strong>$250,000 mortgage at 6% interest comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Monthly payments:</strong> $1,499 for 30 years, $289,595
            total interest
          </li>
          <li>
            <strong>Biweekly payments:</strong> $749.50 every 2 weeks for 26
            years, $241,580 total interest
          </li>
          <li>
            <strong>Savings:</strong> $48,015 less interest and 4 years earlier
            payoff
          </li>
        </ul>
        <p className="text-sm">
          <strong>Setup consideration:</strong> Some lenders charge fees for
          biweekly plans. DIY approach: make 13th payment annually.
        </p>
      </>
    ),
  },
  {
    id: "best-time-refinance",
    question: "When should I consider refinancing instead of extra payments?",
    answer:
      "Consider refinancing if current interest rates are significantly lower than your loan rate (typically 0.5-1% or more). Refinancing can reduce your monthly payment or loan term. Compare the costs of refinancing against the benefits of making extra payments to determine the best strategy.",
  },
  {
    id: "understanding-amortization-schedule",
    question: "How do I read an amortization schedule?",
    answer: (
      <>
        <p className="mb-2">
          An amortization schedule shows the breakdown of each monthly payment:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Payment Number:</strong> Which payment in the sequence
          </li>
          <li>
            <strong>Principal:</strong> Amount going toward loan balance
          </li>
          <li>
            <strong>Interest:</strong> Amount going toward interest charges
          </li>
          <li>
            <strong>Remaining Balance:</strong> How much you still owe
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "amortization-schedule-breakdown",
    question: "How does loan amortization actually work with real examples?",
    answer: (
      <>
        <p className="mb-2">
          Amortization gradually shifts payment allocation from interest to
          principal over the loan term.
        </p>
        <p className="mb-2">
          <strong>
            $250,000 mortgage at 6.5% for 30 years ($1,580 monthly payment):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Payment 1:</strong> $1,354 interest, $226 principal,
            $249,774 remaining
          </li>
          <li>
            <strong>Payment 60 (Year 5):</strong> $1,274 interest, $306
            principal, $236,162 remaining
          </li>
          <li>
            <strong>Payment 180 (Year 15):</strong> $961 interest, $619
            principal, $177,654 remaining
          </li>
          <li>
            <strong>Payment 300 (Year 25):</strong> $459 interest, $1,121
            principal, $84,762 remaining
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> In year 1, 86% goes to interest. By year
          25, 71% goes to principal.
        </p>
      </>
    ),
  },
];

export default function AmortizationFAQSection() {
  return (
    <FAQSection
      items={amortizationFAQItems}
      title="Frequently Asked Questions About Loan Amortization"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="amortization-faq-schema"
      relatedLinks={[
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/auto-loan", label: "Auto Loan Calculator" },
        { href: "/interest-rate", label: "Interest Rate Calculator" },
        { href: "/payment", label: "Payment Calculator" },
        { href: "/refinance", label: "Refinance Calculator" },
      ]}
    />
  );
}
