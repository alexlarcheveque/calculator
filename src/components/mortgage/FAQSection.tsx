import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const mortgageFAQItems: FAQItem[] = [
  {
    id: "how-mortgage-payment-calculated",
    question: "How is my monthly mortgage payment calculated?",
    answer: (
      <>
        <p className="mb-2">
          Your monthly mortgage payment consists of four main components (often
          called PITI):
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Principal:</strong> Payment toward the loan balance
          </li>
          <li>
            <strong>Interest:</strong> Cost of borrowing the money
          </li>
          <li>
            <strong>Taxes:</strong> Property taxes collected in escrow
          </li>
          <li>
            <strong>Insurance:</strong> Homeowners insurance and PMI (if
            applicable)
          </li>
        </ul>
        <p className="mb-2">
          <strong>The principal and interest formula:</strong>
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          M = P × [r(1+r)^n] / [(1+r)^n-1]
        </p>
        <p className="text-sm">
          Where M = monthly payment, P = principal loan amount, r = monthly
          interest rate, n = total number of payments
        </p>
      </>
    ),
  },
  {
    id: "down-payment-amount-needed",
    question: "How much down payment do I need for a house?",
    answer: (
      <>
        <p className="mb-2">
          Down payment requirements vary significantly by loan type and lender:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Conventional loans:</strong> 3-20% (20% avoids PMI)
          </li>
          <li>
            <strong>FHA loans:</strong> 3.5% minimum
          </li>
          <li>
            <strong>VA loans:</strong> 0% for eligible veterans
          </li>
          <li>
            <strong>USDA loans:</strong> 0% for eligible rural areas
          </li>
        </ul>
        <p className="mb-2">
          <strong>Benefits of 20% down payment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>No private mortgage insurance (PMI) required</li>
          <li>Lower monthly payments</li>
          <li>More equity from day one</li>
          <li>Stronger negotiating position with sellers</li>
        </ul>
      </>
    ),
  },
  {
    id: "15-year-vs-30-year-mortgage",
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: (
      <>
        <p className="mb-2">
          <strong>15-year mortgage advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Lower interest rates (typically 0.5-1% lower)</li>
          <li>Pay off loan faster, build equity quicker</li>
          <li>Save tens of thousands in interest over loan life</li>
          <li>Own home outright sooner</li>
        </ul>
        <p className="mb-2">
          <strong>30-year mortgage advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Lower monthly payments (more cash flow flexibility)</li>
          <li>Easier to qualify for larger loan amounts</li>
          <li>More money available for investing or emergencies</li>
          <li>Tax deduction benefits spread over longer period</li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> $300,000 loan at 6.5% costs $1,896/month
          (30-year) vs. $2,613/month (15-year), but saves $170,000+ in total
          interest with 15-year option.
        </p>
      </>
    ),
  },
  {
    id: "factors-affecting-mortgage-rate",
    question: "What factors affect my mortgage interest rate?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Personal factors you can control:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credit score:</strong> 740+ gets best rates, each 20-point
            drop costs ~0.25%
          </li>
          <li>
            <strong>Down payment:</strong> 20%+ typically qualifies for better
            rates
          </li>
          <li>
            <strong>Debt-to-income ratio:</strong> Lower DTI (under 36%)
            preferred
          </li>
          <li>
            <strong>Loan amount:</strong> Jumbo loans often have higher rates
          </li>
          <li>
            <strong>Loan term:</strong> 15-year typically 0.5-1% lower than
            30-year
          </li>
        </ul>
        <p className="mb-2">
          <strong>Market factors beyond your control:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Federal Reserve interest rate policies</li>
          <li>Bond market performance and investor demand</li>
          <li>Economic outlook and inflation expectations</li>
          <li>Housing market conditions in your area</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-much-house-can-afford",
    question: "How much house can I afford on my salary?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Standard affordability guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>28% rule:</strong> Housing costs ≤ 28% of gross monthly
            income
          </li>
          <li>
            <strong>36% rule:</strong> Total debt payments ≤ 36% of gross
            monthly income
          </li>
          <li>
            <strong>2.5x rule:</strong> Home price ≤ 2.5-3x annual income
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation for $75,000 annual income:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Gross monthly income: $6,250</li>
          <li>Maximum housing payment: $1,750 (28%)</li>
          <li>Estimated affordable home price: $187,500-$225,000</li>
        </ul>
        <p className="text-sm">
          <strong>Remember:</strong> Include property taxes, insurance, HOA
          fees, and maintenance costs in your budget planning.
        </p>
      </>
    ),
  },
  {
    id: "property-taxes-explained",
    question: "How are property taxes calculated and paid?",
    answer: (
      <>
        <p className="mb-2">
          Property taxes are calculated by multiplying your home's assessed
          value by the local tax rate (mill rate):
        </p>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-3">
          Annual Property Tax = Assessed Value × Tax Rate
        </p>
        <p className="mb-2">
          <strong>Key factors affecting property taxes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Location:</strong> Rates vary dramatically by state/locality
            (0.3% to 2.4%)
          </li>
          <li>
            <strong>Home value:</strong> Higher assessed values = higher taxes
          </li>
          <li>
            <strong>Local services:</strong> Schools, roads, emergency services
            affect rates
          </li>
          <li>
            <strong>Exemptions:</strong> Homestead, senior, veteran exemptions
            may apply
          </li>
        </ul>
        <p className="mb-2">
          <strong>Payment methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Escrow account (most common): Collected monthly with mortgage
            payment
          </li>
          <li>
            Direct payment: Pay annually or semi-annually to tax authority
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "private-mortgage-insurance-pmi",
    question: "What is PMI and when can I remove it?",
    answer: (
      <>
        <p className="mb-2">
          Private Mortgage Insurance (PMI) protects lenders when borrowers put
          down less than 20% and costs 0.3% to 1.5% of the loan amount annually.
        </p>
        <p className="mb-2">
          <strong>PMI removal options:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Automatic removal:</strong> When loan balance reaches 78% of
            original home value
          </li>
          <li>
            <strong>Request removal:</strong> When balance reaches 80% (may
            require appraisal)
          </li>
          <li>
            <strong>Reappraisal:</strong> If home value increased, request
            removal based on new value
          </li>
          <li>
            <strong>Refinancing:</strong> If home value rose enough to reach 20%
            equity
          </li>
        </ul>
        <p className="mb-2">
          <strong>FHA loans:</strong> Have mortgage insurance premiums (MIP)
          that work differently - often require refinancing to remove.
        </p>
      </>
    ),
  },
  {
    id: "refinancing-when-worth-it",
    question: "When is refinancing worth it?",
    answer: (
      <>
        <p className="mb-2">
          <strong>General refinancing guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Interest rate drop:</strong> Traditional "1% rule" is now
            more like 0.75%
          </li>
          <li>
            <strong>Break-even period:</strong> Closing costs recovered within
            2-3 years
          </li>
          <li>
            <strong>Loan term considerations:</strong> Remaining loan term vs.
            new term
          </li>
        </ul>
        <p className="mb-2">
          <strong>Good refinancing scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Interest rates dropped significantly since original loan</li>
          <li>Credit score improved substantially</li>
          <li>Home value increased enough to eliminate PMI</li>
          <li>Switching from ARM to fixed-rate mortgage</li>
          <li>
            Cash-out refinance for home improvements or debt consolidation
          </li>
        </ul>
        <p className="text-sm">
          <strong>Calculate carefully:</strong> Factor in closing costs
          ($2,000-$5,000), appraisal fees, and time remaining on current loan.
        </p>
      </>
    ),
  },
  {
    id: "pre-approval-vs-pre-qualification",
    question:
      "What's the difference between pre-approval and pre-qualification?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Pre-qualification:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Quick estimate based on self-reported financial information</li>
          <li>No document verification or credit check required</li>
          <li>Takes minutes to complete online or over phone</li>
          <li>Provides rough borrowing capacity estimate</li>
          <li>Not binding and carries little weight with sellers</li>
        </ul>
        <p className="mb-2">
          <strong>Pre-approval:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Formal application with documentation verification</li>
          <li>Hard credit check and income/asset verification</li>
          <li>Takes 1-3 days and requires extensive paperwork</li>
          <li>Provides specific loan amount and rate estimate</li>
          <li>Shows sellers you're a serious, qualified buyer</li>
        </ul>
        <p className="text-sm">
          <strong>Recommendation:</strong> Get pre-approved before house hunting
          in competitive markets to strengthen your offers.
        </p>
      </>
    ),
  },
  {
    id: "mortgage-calculator-accuracy",
    question: "How accurate is this mortgage calculator?",
    answer: (
      <>
        <p className="mb-2">
          This calculator provides highly accurate estimates for principal and
          interest payments using standard mortgage formulas. However, actual
          costs may vary due to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Property taxes:</strong> Rates vary by location and property
            assessment
          </li>
          <li>
            <strong>Insurance costs:</strong> Premiums depend on coverage,
            location, home features
          </li>
          <li>
            <strong>PMI rates:</strong> Vary by lender, loan type, and borrower
            profile
          </li>
          <li>
            <strong>HOA fees:</strong> Community-specific and may change
            annually
          </li>
          <li>
            <strong>Loan fees:</strong> Origination fees, points, and other
            closing costs
          </li>
        </ul>
        <p className="mb-2">
          <strong>For most accurate estimates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Get quotes from multiple lenders</li>
          <li>Research local property tax rates</li>
          <li>Obtain insurance quotes for specific properties</li>
          <li>Consider all closing costs and fees</li>
        </ul>
      </>
    ),
  },
];

export default function MortgageFAQSection() {
  return (
    <FAQSection
      items={mortgageFAQItems}
      title="Frequently Asked Questions About Mortgages"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="mortgage-calculator-faq-schema"
      className="mt-16"
      relatedLinks={[
        { href: "/auto-loan", label: "Auto Loan Calculator" },
        { href: "/loan", label: "Loan Calculator" },
        { href: "/investment", label: "Investment Calculator" },
        { href: "/income-tax", label: "Income Tax Calculator" },
      ]}
    />
  );
}
