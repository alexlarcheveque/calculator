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
    id: "how-monthly-payment-calculated",
    question: "How is the monthly payment calculated?",
    answer:
      "The monthly payment is calculated using the loan amount, interest rate, and loan term. The formula ensures that if you make the same payment each month, the loan will be completely paid off by the end of the term. The calculation uses compound interest to determine the exact payment amount needed.",
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
    id: "when-make-extra-payments",
    question: "When should I make extra payments?",
    answer:
      "Extra payments are most effective early in the loan term when the principal balance is highest. However, they can be beneficial at any time. Consider making extra payments when you have surplus income, receive bonuses, or want to pay off the loan faster.",
  },
  {
    id: "loan-term-years-vs-months",
    question: "What's the difference between loan term in years vs. months?",
    answer:
      "Most loans are quoted in years (like 15-year or 30-year mortgages), but you can also specify additional months. For example, a 15-year 6-month loan would be 15 years and 6 months total. This gives you more precise control over your loan term.",
  },
  {
    id: "calculation-accuracy",
    question: "How accurate are these calculations?",
    answer:
      "These calculations are mathematically accurate based on the standard amortization formula used by most lenders. However, actual loan terms may include additional fees, insurance, or other costs not reflected in this basic calculation. Always consult with your lender for exact payment amounts.",
  },
  {
    id: "what-loans-work-with-calculator",
    question: "Can I use this for any type of loan?",
    answer:
      "This calculator works for any fixed-rate, fully amortizing loan including mortgages, auto loans, personal loans, and student loans. It does not work for interest-only loans, adjustable-rate loans, or credit cards with revolving balances.",
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
    id: "best-time-refinance",
    question: "When should I consider refinancing instead of extra payments?",
    answer:
      "Consider refinancing if current interest rates are significantly lower than your loan rate (typically 0.5-1% or more). Refinancing can reduce your monthly payment or loan term. Compare the costs of refinancing against the benefits of making extra payments to determine the best strategy.",
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
          <li>
            <strong>Final payment:</strong> $8 interest, $1,572 principal, $0
            remaining
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> In year 1, 86% goes to interest. By year
          25, 71% goes to principal.
        </p>
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
        <p className="mb-2">
          <strong>Timing impact of single $5,000 extra payment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Year 1: Saves $26,776 in total interest</li>
          <li>Year 10: Saves $16,089 in total interest</li>
          <li>Year 20: Saves $6,982 in total interest</li>
          <li>Earlier payments have 3.8x more impact than later payments</li>
        </ul>
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
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
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
        <p className="text-sm">
          <strong>Additional factors:</strong> Tax deductibility of mortgage
          interest, emergency fund adequacy, and other high-interest debt.
        </p>
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
        <p className="mb-2">
          <strong>Interest percentage breakdown by term:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>15-year:</strong> 36% of payments go to interest
          </li>
          <li>
            <strong>20-year:</strong> 43% of payments go to interest
          </li>
          <li>
            <strong>25-year:</strong> 51% of payments go to interest
          </li>
          <li>
            <strong>30-year:</strong> 56% of payments go to interest
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
          <li>
            <strong>Equivalent strategy:</strong> Same as adding $125/month
            extra to regular payment
          </li>
        </ul>
        <p className="mb-2">
          <strong>Biweekly payment advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Automatic acceleration:</strong> Built into payment
            schedule, no discipline required
          </li>
          <li>
            <strong>Cash flow alignment:</strong> Matches biweekly paycheck
            cycles
          </li>
          <li>
            <strong>Psychological benefit:</strong> Smaller individual payments
            feel more manageable
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
    id: "principal-vs-interest-tax-implications",
    question: "How do tax implications affect my amortization strategy?",
    answer: (
      <>
        <p className="mb-2">
          Mortgage interest deductibility affects the real cost of borrowing and
          optimal payment strategy.
        </p>
        <p className="mb-2">
          <strong>
            Tax impact example ($400,000 mortgage at 6.5%, 24% tax bracket):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Year 1 interest paid:</strong> $25,800
          </li>
          <li>
            <strong>Tax deduction value:</strong> $6,192 (24% of interest)
          </li>
          <li>
            <strong>Effective interest rate:</strong> 4.94% after tax benefit
          </li>
          <li>
            <strong>Real monthly cost:</strong> $2,530 gross payment - $516 tax
            savings = $2,014 net
          </li>
        </ul>
        <p className="mb-2">
          <strong>Strategy implications by tax situation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High tax bracket (32%+):</strong> Mortgage interest
            deduction more valuable, consider investing vs extra payments
          </li>
          <li>
            <strong>Standard deduction users:</strong> No mortgage interest
            benefit, extra payments more attractive
          </li>
          <li>
            <strong>SALT cap impact:</strong> Limited state/local deductions
            make mortgage interest more valuable
          </li>
        </ul>
        <p className="text-sm">
          <strong>2024 consideration:</strong> Standard deduction is $14,600
          (single) / $29,200 (married), so mortgage interest must exceed this
          for tax benefit.
        </p>
      </>
    ),
  },
  {
    id: "recast-vs-extra-payments",
    question: "Should I recast my mortgage or make regular extra payments?",
    answer: (
      <>
        <p className="mb-2">
          Mortgage recasting reduces monthly payments while extra payments
          reduce loan term. Each serves different financial goals.
        </p>
        <p className="mb-2">
          <strong>
            $300,000 mortgage at 6% (5 years in, $275,000 remaining):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Current payment:</strong> $1,799/month for 25 years
            remaining
          </li>
          <li>
            <strong>$50,000 recast option:</strong> $225,000 balance,
            $1,349/month for 25 years ($450 monthly savings)
          </li>
          <li>
            <strong>$50,000 extra payment:</strong> Keep $1,799/month, paid off
            in 18.2 years (6.8 years early)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose recasting when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Need cash flow relief:</strong> Lower monthly obligations
            for budgeting
          </li>
          <li>
            <strong>Have income reduction:</strong> Job change, retirement,
            family situation
          </li>
          <li>
            <strong>Want flexibility:</strong> Lower required payment with
            option to pay extra
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose extra payments when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Want to eliminate debt fastest and save maximum interest</li>
          <li>Plan to stay in home long-term</li>
          <li>Have stable income and emergency fund</li>
        </ul>
      </>
    ),
  },
  {
    id: "amortization-schedule-loan-types",
    question: "How does amortization differ across different types of loans?",
    answer: (
      <>
        <p className="mb-2">
          Different loan types have varying amortization patterns based on
          rates, terms, and payment structures.
        </p>
        <p className="mb-2">
          <strong>$25,000 loan comparison across loan types:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Auto loan (5%, 60 months):</strong> $472/month, $3,306 total
            interest
          </li>
          <li>
            <strong>Personal loan (12%, 60 months):</strong> $556/month, $8,347
            total interest
          </li>
          <li>
            <strong>Home equity loan (7%, 120 months):</strong> $290/month,
            $9,831 total interest
          </li>
          <li>
            <strong>Student loan (6%, 120 months):</strong> $277/month, $8,281
            total interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>Amortization characteristics by loan type:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mortgages:</strong> Longest terms (15-30 years), lowest
            rates, highest total interest
          </li>
          <li>
            <strong>Auto loans:</strong> Medium terms (3-7 years), moderate
            rates, collateral-secured
          </li>
          <li>
            <strong>Personal loans:</strong> Short terms (2-7 years), higher
            rates, unsecured
          </li>
          <li>
            <strong>Student loans:</strong> Long terms (10-25 years), moderate
            rates, payment flexibility
          </li>
        </ul>
        <p className="text-sm">
          <strong>Strategy tip:</strong> Focus extra payments on highest-rate
          loans first for maximum interest savings.
        </p>
      </>
    ),
  },
  {
    id: "refinancing-vs-amortization-acceleration",
    question: "When should I refinance vs accelerate my current amortization?",
    answer: (
      <>
        <p className="mb-2">
          Compare refinancing costs against extra payment benefits to determine
          optimal strategy.
        </p>
        <p className="mb-2">
          <strong>$200,000 remaining mortgage at 7% with 20 years left:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Current situation:</strong> $1,550/month, $172,000 remaining
            interest
          </li>
          <li>
            <strong>Refinance to 5% (20 years):</strong> $1,320/month, $116,800
            total interest, $8,000 closing costs
          </li>
          <li>
            <strong>Extra $230/month payments:</strong> Paid off in 14.2 years,
            $109,400 total interest
          </li>
          <li>
            <strong>Net comparison:</strong> Extra payments save $7,400 more
            than refinancing
          </li>
        </ul>
        <p className="mb-2">
          <strong>Refinancing makes sense when:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rate difference 1%+:</strong> Significant monthly savings
            justify closing costs
          </li>
          <li>
            <strong>Long time remaining:</strong> More years to recoup
            refinancing costs
          </li>
          <li>
            <strong>Cash flow needs:</strong> Lower payments more important than
            total cost
          </li>
          <li>
            <strong>Large loan balance:</strong> Fixed costs spread over bigger
            principal
          </li>
        </ul>
        <p className="text-sm">
          <strong>Break-even rule:</strong> Monthly savings should recover
          closing costs within 24-36 months.
        </p>
      </>
    ),
  },
  {
    id: "amortization-calculator-limitations",
    question: "What are the limitations of amortization calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Standard assumptions that may not reflect reality:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fixed interest rate:</strong> ARMs and variable rates change
            over time
          </li>
          <li>
            <strong>Consistent payments:</strong> Real life includes missed
            payments, late fees
          </li>
          <li>
            <strong>No additional costs:</strong> PMI, taxes, insurance not
            included
          </li>
          <li>
            <strong>Perfect payment timing:</strong> Assumes payments made on
            exact due dates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors not captured:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Economic changes:</strong> Job loss, income reduction,
            emergency needs
          </li>
          <li>
            <strong>Life events:</strong> Marriage, divorce, health issues
            affecting payment ability
          </li>
          <li>
            <strong>Market conditions:</strong> Refinancing opportunities, rate
            environment changes
          </li>
          <li>
            <strong>Prepayment penalties:</strong> Some loans charge fees for
            early payoff
          </li>
        </ul>
        <p className="mb-2">
          <strong>Loan types with different amortization:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Interest-only loans: No principal reduction during initial period
          </li>
          <li>
            Balloon loans: Large final payment changes amortization pattern
          </li>
          <li>Graduated payment loans: Payment amounts increase over time</li>
          <li>
            Negative amortization loans: Balance can actually grow initially
          </li>
        </ul>
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
