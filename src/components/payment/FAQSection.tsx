import { useState } from "react";
import Script from "next/script";
import FAQSection, { FAQItem } from "../ui/FAQSection";

const paymentFAQItems: FAQItem[] = [
  {
    id: "fixed-term-vs-fixed-payment-modes",
    question:
      "What's the difference between Fixed Term and Fixed Payment calculation modes?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Fixed Term mode:</strong> Calculate monthly payment when you
          know the exact loan term (years to pay off).
        </p>
        <p className="mb-2">
          <strong>Fixed Payment mode:</strong> Calculate loan term when you know
          how much you can afford monthly.
        </p>
        <p className="mb-2">
          <strong>Example comparison ($200,000 loan at 6.5% interest):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fixed Term (30 years):</strong> $1,264/month payment
          </li>
          <li>
            <strong>Fixed Term (15 years):</strong> $1,742/month payment
          </li>
          <li>
            <strong>Fixed Payment ($2,000/month):</strong> Paid off in 12.1
            years
          </li>
          <li>
            <strong>Fixed Payment ($1,500/month):</strong> Paid off in 17.8
            years
          </li>
        </ul>
        <p className="text-sm">
          <strong>Use case:</strong> Fixed Term for budget planning, Fixed
          Payment for optimizing payoff strategies.
        </p>
      </>
    ),
  },
  {
    id: "loan-term-length-comparison",
    question: "How do I choose between shorter and longer loan terms?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Real example ($300,000 mortgage at 6.5% interest):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>15-year term:</strong> $2,613/month, $170,334 total interest
          </li>
          <li>
            <strong>30-year term:</strong> $1,896/month, $382,560 total interest
          </li>
          <li>
            <strong>Difference:</strong> Save $212,226 with 15-year term
          </li>
        </ul>
        <p className="mb-2">
          <strong>Choose shorter terms when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Can comfortably afford higher payments ($717 more in example)</li>
          <li>Want to save maximum interest and build equity faster</li>
          <li>Plan to stay in home/keep loan long-term</li>
          <li>Have stable income and adequate emergency fund</li>
        </ul>
        <p className="mb-2">
          <strong>Choose longer terms when you:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Need lower payments for cash flow flexibility</li>
          <li>Have other high-return investment opportunities</li>
          <li>Expect income to increase significantly over time</li>
        </ul>
      </>
    ),
  },
  {
    id: "interest-rate-dramatic-impact",
    question: "How dramatically does interest rate affect my payments?",
    answer: (
      <>
        <p className="mb-2">
          Small interest rate changes create large payment and cost differences
          over time.
        </p>
        <p className="mb-2">
          <strong>$250,000 loan over 30 years at different rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>5.5% rate:</strong> $1,420/month, $261,160 total interest
          </li>
          <li>
            <strong>6.5% rate:</strong> $1,580/month, $318,861 total interest
          </li>
          <li>
            <strong>7.5% rate:</strong> $1,748/month, $379,281 total interest
          </li>
          <li>
            <strong>8.5% rate:</strong> $1,923/month, $442,205 total interest
          </li>
        </ul>
        <p className="mb-2">
          <strong>1% rate increase impact:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>6.5% vs 5.5%: $160 more per month, $57,701 more total</li>
          <li>Over loan life: $1.92 more cost for every $1,000 borrowed</li>
          <li>
            Worth significant effort to improve credit score and shop rates
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "extra-payments-savings-strategy",
    question: "How much can extra payments save me?",
    answer: (
      <>
        <p className="mb-2">
          Extra payments create dramatic savings by reducing principal early,
          which eliminates future interest on that amount.
        </p>
        <p className="mb-2">
          <strong>
            $200,000 mortgage at 6.5% for 30 years ($1,264 payment):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>No extra payments:</strong> $255,008 total interest
          </li>
          <li>
            <strong>$100 extra monthly:</strong> $183,119 interest, save $71,889
          </li>
          <li>
            <strong>$200 extra monthly:</strong> $145,398 interest, save
            $109,610
          </li>
          <li>
            <strong>One extra payment yearly:</strong> $214,389 interest, save
            $40,619
          </li>
        </ul>
        <p className="mb-2">
          <strong>Time savings with extra payments:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>$100 extra: Paid off 6.8 years early (23.2 years total)</li>
          <li>$200 extra: Paid off 10.5 years early (19.5 years total)</li>
          <li>One extra payment yearly: Paid off 4.8 years early</li>
        </ul>
      </>
    ),
  },
  {
    id: "payment-priority-debt-strategy",
    question: "Should I make extra loan payments or pay other debts first?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Optimal debt payment priority order:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Emergency fund:</strong> 3-6 months expenses first
          </li>
          <li>
            <strong>Employer 401(k) match:</strong> Immediate 100% return
          </li>
          <li>
            <strong>High-interest debt:</strong> Credit cards, personal loans
            (&gt;7%)
          </li>
          <li>
            <strong>Mid-rate debt:</strong> Auto loans, student loans (4-7%)
          </li>
          <li>
            <strong>Low-rate debt:</strong> Mortgages (&lt;4%) - consider
            investing instead
          </li>
        </ol>
        <p className="mb-2">
          <strong>Example decision ($500 extra monthly budget):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credit card at 22%:</strong> Pay this first - guaranteed 22%
            return
          </li>
          <li>
            <strong>Auto loan at 5%:</strong> Pay after high-interest debt
          </li>
          <li>
            <strong>Mortgage at 3%:</strong> Consider investing in index funds
            (7-10% historical)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Rule of thumb:</strong> Pay extra on debts with rates higher
          than expected investment returns.
        </p>
      </>
    ),
  },
  {
    id: "amortization-schedule-early-payments",
    question: "Why do early payments in amortization save more money?",
    answer: (
      <>
        <p className="mb-2">
          Early loan payments consist mostly of interest, so extra principal
          payments eliminate more future interest.
        </p>
        <p className="mb-2">
          <strong>
            $200,000 mortgage at 6% for 30 years ($1,199 payment):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Payment 1:</strong> $1,000 interest, $199 principal
          </li>
          <li>
            <strong>Payment 60:</strong> $943 interest, $256 principal
          </li>
          <li>
            <strong>Payment 180:</strong> $724 interest, $475 principal
          </li>
          <li>
            <strong>Payment 300:</strong> $367 interest, $832 principal
          </li>
        </ul>
        <p className="mb-2">
          <strong>Impact of $1,000 extra principal payment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Year 1: Saves $4,891 in total interest over loan life</li>
          <li>Year 10: Saves $2,324 in total interest over loan life</li>
          <li>Year 20: Saves $748 in total interest over loan life</li>
          <li>Earlier payments have 6.5x more impact than later payments</li>
        </ul>
      </>
    ),
  },
  {
    id: "payment-calculator-loan-types",
    question: "What types of loans can I use this payment calculator for?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Perfect for fixed-rate, fully-amortizing loans:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mortgages:</strong> Conventional, FHA, VA loans (15/30 year
            terms)
          </li>
          <li>
            <strong>Auto loans:</strong> New/used car financing (3-7 year terms)
          </li>
          <li>
            <strong>Personal loans:</strong> Fixed-rate installment loans
          </li>
          <li>
            <strong>Student loans:</strong> Fixed-rate federal/private loans
          </li>
          <li>
            <strong>Home equity loans:</strong> Fixed-rate second mortgages
          </li>
        </ul>
        <p className="mb-2">
          <strong>NOT suitable for:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Variable interest rates:</strong> ARM mortgages, variable
            credit lines
          </li>
          <li>
            <strong>Interest-only loans:</strong> No principal reduction period
          </li>
          <li>
            <strong>Credit cards:</strong> Revolving credit with variable
            payments
          </li>
          <li>
            <strong>Balloon loans:</strong> Large final payment required
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best accuracy:</strong> Use actual loan terms including any
          fees or points in the principal amount.
        </p>
      </>
    ),
  },
  {
    id: "payment-calculation-formula-accuracy",
    question:
      "How accurate is the payment calculation and what formula is used?",
    answer: (
      <>
        <p className="mb-2">
          The calculator uses the standard loan payment formula that provides
          exact results for basic loan scenarios.
        </p>
        <p className="mb-2">
          <strong>Payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>M:</strong> Monthly payment
          </li>
          <li>
            <strong>P:</strong> Principal loan amount
          </li>
          <li>
            <strong>r:</strong> Monthly interest rate (annual rate ÷ 12)
          </li>
          <li>
            <strong>n:</strong> Total number of payments (years × 12)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Calculation limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Doesn't include:</strong> PMI, taxes, insurance, HOA fees
          </li>
          <li>
            <strong>Assumes:</strong> Fixed rate, regular monthly payments
          </li>
          <li>
            <strong>Doesn't factor:</strong> Origination fees, closing costs
          </li>
        </ul>
        <p className="text-sm">
          <strong>For actual loans:</strong> Add insurance, taxes, and fees to
          get total monthly housing payment.
        </p>
      </>
    ),
  },
  {
    id: "biweekly-payment-strategy",
    question: "Is switching to biweekly payments worth it?",
    answer: (
      <>
        <p className="mb-2">
          Biweekly payments (every 2 weeks) result in 26 payments yearly,
          equivalent to 13 monthly payments instead of 12.
        </p>
        <p className="mb-2">
          <strong>
            $250,000 mortgage at 6.5% for 30 years ($1,580 monthly):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Monthly payments:</strong> $568,800 total cost, 30 years
          </li>
          <li>
            <strong>Biweekly payments ($790):</strong> $487,653 total cost, 24.3
            years
          </li>
          <li>
            <strong>Savings:</strong> $81,147 and 5.7 years earlier payoff
          </li>
          <li>
            <strong>Equivalent:</strong> Adding $132/month to regular payment
          </li>
        </ul>
        <p className="mb-2">
          <strong>Biweekly pros and cons:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Pro:</strong> Automatic extra payment, aligns with paychecks
          </li>
          <li>
            <strong>Pro:</strong> Significant interest savings over time
          </li>
          <li>
            <strong>Con:</strong> Less flexibility than choosing extra amount
          </li>
          <li>
            <strong>Con:</strong> Some lenders charge fees for biweekly setup
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payment-calculator-limitations",
    question: "What are the limitations of payment calculators?",
    answer: (
      <>
        <p className="mb-2">
          <strong>What payment calculators don't include:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Total housing costs:</strong> Property taxes, insurance,
            PMI, HOA fees
          </li>
          <li>
            <strong>Loan fees:</strong> Origination, processing, closing costs
          </li>
          <li>
            <strong>Rate changes:</strong> Adjustable rate mortgages, rate
            resets
          </li>
          <li>
            <strong>Prepayment penalties:</strong> Fees for paying off early
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world factors to consider:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Income stability:</strong> Job security, variable income
          </li>
          <li>
            <strong>Life changes:</strong> Family size, relocation, health
            issues
          </li>
          <li>
            <strong>Market conditions:</strong> Interest rate environment,
            refinancing opportunities
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best use:</strong> Initial planning and comparison tool.
          Always verify with lenders for actual loan terms and total costs.
        </p>
      </>
    ),
  },
];

export default function PaymentFAQSection() {
  return (
    <FAQSection
      items={paymentFAQItems}
      title="Frequently Asked Questions About Loan Payments"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="payment-calculator-faq-schema"
      relatedLinks={[
        { href: "/mortgage", label: "Mortgage Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/auto-loan", label: "Auto Loan Calculator" },
        { href: "/amortization", label: "Amortization Calculator" },
        { href: "/interest-rate", label: "Interest Rate Calculator" },
      ]}
    />
  );
}
