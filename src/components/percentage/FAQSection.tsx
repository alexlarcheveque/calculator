"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-percentage-definition",
    question: "What is a percentage and how is it represented?",
    answer: (
      <>
        <p className="mb-2">
          A percentage is a number or ratio that represents a fraction of 100.
          It's a standardized way to express a dimensionless relationship
          between two numbers, making comparisons and calculations easier across
          different scales and contexts.
        </p>
        <p className="mb-2">
          <strong>Different representations of percentages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Symbol form:</strong> 35% (most common notation)
          </li>
          <li>
            <strong>Written form:</strong> 35 percent or 35 pct
          </li>
          <li>
            <strong>Decimal form:</strong> 0.35 (percentage ÷ 100)
          </li>
          <li>
            <strong>Fraction form:</strong> 35/100 = 7/20 (simplified)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Conversion examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>50% = 0.50 = 50/100 = 1/2</li>
          <li>25% = 0.25 = 25/100 = 1/4</li>
          <li>75% = 0.75 = 75/100 = 3/4</li>
          <li>100% = 1.00 = 100/100 = 1</li>
        </ul>
        <p className="mb-2">
          <strong>Real-world example:</strong>
        </p>
        <p className="text-sm">
          If 25 out of 50 students are male: 25/50 = 0.5 → 0.5 × 100 = 50% of
          students are male.
        </p>
      </>
    ),
  },
  {
    id: "basic-percentage-calculations",
    question:
      "How do you calculate basic percentages using the percentage formula?",
    answer: (
      <>
        <p className="mb-2">
          The basic percentage formula is an algebraic equation involving three
          values, where knowing any two values allows you to calculate the
          third.
        </p>
        <p className="mb-2">
          <strong>Basic percentage formula:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono text-lg mb-3">
          Percentage × Value = Result
        </div>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          P × V₁ = V₂
        </div>
        <p className="mb-2">
          <strong>Three main calculation types:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Find the result:</strong> What is 15% of 80? → 0.15 × 80 =
            12
          </li>
          <li>
            <strong>Find the percentage:</strong> 12 is what percent of 80? → 12
            ÷ 80 × 100 = 15%
          </li>
          <li>
            <strong>Find the total:</strong> 12 is 15% of what number? → 12 ÷
            0.15 = 80
          </li>
        </ul>
        <p className="mb-2">
          <strong>Step-by-step example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Problem: P × 30 = 1.5, find P</li>
          <li>Solve: P = 1.5 ÷ 30 = 0.05</li>
          <li>Convert to percentage: 0.05 × 100 = 5%</li>
        </ul>
        <p className="text-sm">
          <strong>Key tip:</strong> When calculating manually, remember to
          convert percentages to decimals (divide by 100) before multiplying,
          then convert back to percentages for the final answer when needed.
        </p>
      </>
    ),
  },
  {
    id: "percentage-of-number-calculations",
    question: "How do you calculate what percentage one number is of another?",
    answer: (
      <>
        <p className="mb-2">
          Finding what percentage one number is of another is a common
          calculation used in statistics, grading, financial analysis, and
          everyday comparisons.
        </p>
        <p className="mb-2">
          <strong>Formula for percentage of a number:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          (Part ÷ Whole) × 100 = Percentage
        </div>
        <p className="mb-2">
          <strong>Step-by-step process:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Identify the part (numerator) and whole (denominator)</li>
          <li>Divide the part by the whole to get a decimal</li>
          <li>Multiply the decimal by 100 to convert to percentage</li>
          <li>Round to appropriate decimal places if needed</li>
        </ol>
        <p className="mb-2">
          <strong>Worked examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Example 1:</strong> 45 out of 60 students passed → (45 ÷ 60)
            × 100 = 75%
          </li>
          <li>
            <strong>Example 2:</strong> You scored 87 out of 100 points → (87 ÷
            100) × 100 = 87%
          </li>
          <li>
            <strong>Example 3:</strong> $25 tip on $150 bill → (25 ÷ 150) × 100
            = 16.67%
          </li>
          <li>
            <strong>Example 4:</strong> 15 minutes of 2 hours → (15 ÷ 120) × 100
            = 12.5%
          </li>
        </ul>
        <p className="text-sm">
          <strong>Common applications:</strong> Test scores, survey results,
          financial ratios, completion rates, success rates, and statistical
          analysis.
        </p>
      </>
    ),
  },
  {
    id: "percentage-increase-decrease",
    question: "How do you calculate percentage increase and decrease?",
    answer: (
      <>
        <p className="mb-2">
          Percentage increase and decrease calculations measure the relative
          change between an original value and a new value, expressing the
          change as a percentage of the original amount.
        </p>
        <p className="mb-2">
          <strong>Percentage change formula:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          ((New Value - Original Value) ÷ Original Value) × 100
        </div>
        <p className="mb-2">
          <strong>Calculation process:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Subtract the original value from the new value</li>
          <li>Divide the difference by the original value</li>
          <li>Multiply by 100 to convert to percentage</li>
          <li>Positive result = increase, negative result = decrease</li>
        </ol>
        <p className="mb-2">
          <strong>Worked examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Price increase:</strong> $50 → $65: (65-50) ÷ 50 × 100 = 30%
            increase
          </li>
          <li>
            <strong>Weight loss:</strong> 200 lbs → 180 lbs: (180-200) ÷ 200 ×
            100 = -10% (10% decrease)
          </li>
          <li>
            <strong>Sales growth:</strong> 1000 units → 1250 units: (1250-1000)
            ÷ 1000 × 100 = 25% increase
          </li>
        </ul>
        <p className="mb-2">
          <strong>Alternative method (finding new value):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Increase:</strong> Original × (1 + percentage) → 500 × (1 +
            0.10) = 550
          </li>
          <li>
            <strong>Decrease:</strong> Original × (1 - percentage) → 500 × (1 -
            0.10) = 450
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "percentage-difference-calculation",
    question: "What is percentage difference and how is it calculated?",
    answer: (
      <>
        <p className="mb-2">
          Percentage difference measures the relative difference between two
          values without considering which one is the "original" or "base"
          value. It's useful when comparing two independent measurements or
          values.
        </p>
        <p className="mb-2">
          <strong>Percentage difference formula:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          |Value₁ - Value₂| ÷ ((Value₁ + Value₂) ÷ 2) × 100
        </div>
        <p className="mb-2">
          <strong>Key characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Uses absolute difference:</strong> |V₁ - V₂| ensures
            positive result
          </li>
          <li>
            <strong>Average as denominator:</strong> Uses mean of both values as
            reference point
          </li>
          <li>
            <strong>Symmetric:</strong> Same result regardless of value order
          </li>
          <li>
            <strong>No direction:</strong> Doesn't indicate which value is
            larger
          </li>
        </ul>
        <p className="mb-2">
          <strong>Step-by-step calculation:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Find the absolute difference between the two values</li>
          <li>Calculate the average of the two values</li>
          <li>Divide the absolute difference by the average</li>
          <li>Multiply by 100 to convert to percentage</li>
        </ol>
        <p className="mb-2">
          <strong>Worked example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Compare values 10 and 6:</li>
          <li>Absolute difference: |10 - 6| = 4</li>
          <li>Average: (10 + 6) ÷ 2 = 8</li>
          <li>Percentage difference: 4 ÷ 8 × 100 = 50%</li>
        </ul>
        <p className="text-sm">
          <strong>When to use:</strong> Comparing test results, measurements,
          survey responses, or any two independent values where neither is
          considered the "baseline."
        </p>
      </>
    ),
  },
  {
    id: "percentage-vs-percentage-points",
    question: "What's the difference between percentage and percentage points?",
    answer: (
      <>
        <p className="mb-2">
          Understanding the distinction between percentage and percentage points
          is crucial for accurate interpretation of statistical data and
          avoiding common misunderstandings in data analysis.
        </p>
        <p className="mb-2">
          <strong>Percentage points (absolute change):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> The arithmetic difference between two
            percentages
          </li>
          <li>
            <strong>Calculation:</strong> New percentage - Old percentage
          </li>
          <li>
            <strong>Example:</strong> 30% to 35% = 5 percentage points increase
          </li>
          <li>
            <strong>Use case:</strong> Election results, interest rates, survey
            changes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Percentage change (relative change):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> The relative change expressed as a
            percentage
          </li>
          <li>
            <strong>Calculation:</strong> (New - Old) ÷ Old × 100
          </li>
          <li>
            <strong>Example:</strong> 30% to 35% = (35-30) ÷ 30 × 100 = 16.67%
            increase
          </li>
          <li>
            <strong>Use case:</strong> Growth rates, performance metrics,
            financial analysis
          </li>
        </ul>
        <p className="mb-2">
          <strong>Comparative example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Interest rate changes from 2% to 3%:</li>
          <li>
            <strong>Percentage points:</strong> 3% - 2% = 1 percentage point
            increase
          </li>
          <li>
            <strong>Percentage change:</strong> (3-2) ÷ 2 × 100 = 50% increase
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> Media often confuses these terms. A 1
          percentage point increase from 2% to 3% is actually a 50% relative
          increase, which sounds much more dramatic but represents the same
          change.
        </p>
      </>
    ),
  },
  {
    id: "percentage-applications-business",
    question:
      "What are common business and financial applications of percentage calculations?",
    answer: (
      <>
        <p className="mb-2">
          Percentages are fundamental in business and finance for measuring
          performance, analyzing trends, making comparisons, and communicating
          results effectively to stakeholders.
        </p>
        <p className="mb-2">
          <strong>Sales and revenue analysis:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sales growth:</strong> Year-over-year revenue
            increase/decrease
          </li>
          <li>
            <strong>Market share:</strong> Company sales ÷ total market × 100
          </li>
          <li>
            <strong>Commission rates:</strong> Sales representative compensation
          </li>
          <li>
            <strong>Discount calculations:</strong> Sale prices and promotional
            offers
          </li>
        </ul>
        <p className="mb-2">
          <strong>Financial ratios and metrics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Profit margins:</strong> (Revenue - Costs) ÷ Revenue × 100
          </li>
          <li>
            <strong>Return on investment (ROI):</strong> (Gain - Cost) ÷ Cost ×
            100
          </li>
          <li>
            <strong>Interest rates:</strong> Loan costs, investment returns
          </li>
          <li>
            <strong>Tax calculations:</strong> Sales tax, income tax rates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Performance measurement:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Employee performance:</strong> Goal achievement rates
          </li>
          <li>
            <strong>Customer satisfaction:</strong> Survey response percentages
          </li>
          <li>
            <strong>Quality metrics:</strong> Defect rates, error percentages
          </li>
          <li>
            <strong>Productivity measures:</strong> Efficiency improvements
          </li>
        </ul>
        <p className="mb-2">
          <strong>Budgeting and forecasting:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Budget variance analysis (actual vs. planned spending)</li>
          <li>Cost allocation across departments or projects</li>
          <li>Growth projections and scenario planning</li>
          <li>Break-even analysis and pricing strategies</li>
        </ul>
      </>
    ),
  },
  {
    id: "percentage-word-problems",
    question: "How do you solve percentage word problems effectively?",
    answer: (
      <>
        <p className="mb-2">
          Percentage word problems require careful reading to identify the given
          information and what needs to be calculated. A systematic approach
          helps avoid confusion and ensures accurate solutions.
        </p>
        <p className="mb-2">
          <strong>Problem-solving strategy:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Read carefully:</strong> Identify what information is given
            and what you need to find
          </li>
          <li>
            <strong>Identify the type:</strong> Basic percentage,
            increase/decrease, or difference calculation
          </li>
          <li>
            <strong>Set up the equation:</strong> Choose appropriate formula
            based on problem type
          </li>
          <li>
            <strong>Solve step by step:</strong> Perform calculations
            methodically
          </li>
          <li>
            <strong>Check reasonableness:</strong> Verify that your answer makes
            sense
          </li>
        </ol>
        <p className="mb-2">
          <strong>Common question types and approaches:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>"What is X% of Y?"</strong> → X ÷ 100 × Y
          </li>
          <li>
            <strong>"X is what percent of Y?"</strong> → X ÷ Y × 100
          </li>
          <li>
            <strong>"X is Y% of what number?"</strong> → X ÷ (Y ÷ 100)
          </li>
          <li>
            <strong>"What percent increase/decrease?"</strong> → (New - Old) ÷
            Old × 100
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example problems:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Shopping:</strong> "A $80 jacket is 25% off. What's the sale
            price?" → $80 × (1 - 0.25) = $60
          </li>
          <li>
            <strong>Test scores:</strong> "You got 45 out of 60 questions
            correct. What's your percentage?" → 45 ÷ 60 × 100 = 75%
          </li>
          <li>
            <strong>Tips:</strong> "What's a 18% tip on a $85 bill?" → $85 ×
            0.18 = $15.30
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key tip:</strong> Draw diagrams or use visual aids when
          helpful, and always double-check by working backwards from your
          answer.
        </p>
      </>
    ),
  },
  {
    id: "percentage-calculator-features",
    question:
      "How do percentage calculators work and what are their key features?",
    answer: (
      <>
        <p className="mb-2">
          Percentage calculators automate complex calculations and provide
          multiple calculation modes to handle various percentage problems
          efficiently and accurately.
        </p>
        <p className="mb-2">
          <strong>Basic percentage calculator features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Three-way calculations:</strong> Find percentage, value, or
            total when given two inputs
          </li>
          <li>
            <strong>Automatic detection:</strong> Identifies which variable to
            calculate based on inputs
          </li>
          <li>
            <strong>Decimal conversion:</strong> Handles percentage-to-decimal
            conversions automatically
          </li>
          <li>
            <strong>Result formatting:</strong> Displays answers in appropriate
            format (percentage or number)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Advanced calculator modes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Percentage change:</strong> Calculates increase/decrease
            between values
          </li>
          <li>
            <strong>Percentage difference:</strong> Compares two values
            symmetrically
          </li>
          <li>
            <strong>Common phrases:</strong> Handles "X is Y% more/less than Z"
            type problems
          </li>
          <li>
            <strong>Markup/markdown:</strong> Retail pricing and discount
            calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Benefits of using calculators:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Accuracy:</strong> Eliminates arithmetic errors in complex
            calculations
          </li>
          <li>
            <strong>Speed:</strong> Instantly calculates results for multiple
            scenarios
          </li>
          <li>
            <strong>Verification:</strong> Confirms manual calculations and
            provides confidence
          </li>
          <li>
            <strong>Learning aid:</strong> Shows step-by-step processes for
            educational purposes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices for calculator use:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Double-check inputs to ensure correct values are entered</li>
          <li>Understand the calculation method being used</li>
          <li>Verify results against expected ranges or manual estimates</li>
          <li>Use appropriate precision for your specific application</li>
        </ul>
      </>
    ),
  },
  {
    id: "percentage-common-mistakes",
    question:
      "What are common mistakes when working with percentages and how to avoid them?",
    answer: (
      <>
        <p className="mb-2">
          Understanding common percentage mistakes helps avoid errors in
          calculations, interpretations, and real-world applications of
          percentage concepts.
        </p>
        <p className="mb-2">
          <strong>Calculation errors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Forgetting to convert:</strong> Using 15% instead of 0.15 in
            calculations
          </li>
          <li>
            <strong>Wrong base value:</strong> Using the wrong denominator in
            percentage calculations
          </li>
          <li>
            <strong>Decimal placement:</strong> Moving decimal point incorrectly
            during conversions
          </li>
          <li>
            <strong>Order confusion:</strong> Mixing up which value is the part
            vs. the whole
          </li>
        </ul>
        <p className="mb-2">
          <strong>Conceptual misunderstandings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Percentage vs. percentage points:</strong> Confusing
            relative and absolute changes
          </li>
          <li>
            <strong>Base reference errors:</strong> Not identifying the correct
            base for comparison
          </li>
          <li>
            <strong>Symmetry assumptions:</strong> Thinking 50% increase
            followed by 50% decrease returns to original
          </li>
          <li>
            <strong>Additive fallacy:</strong> Adding percentages that represent
            different bases
          </li>
        </ul>
        <p className="mb-2">
          <strong>Real-world application mistakes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Compound percentage errors:</strong> Not accounting for
            compounding effects
          </li>
          <li>
            <strong>Sample size ignorance:</strong> Not considering the size of
            the dataset
          </li>
          <li>
            <strong>Context misinterpretation:</strong> Misunderstanding what
            the percentage represents
          </li>
          <li>
            <strong>Precision false confidence:</strong> Over-interpreting
            slight percentage differences
          </li>
        </ul>
        <p className="mb-2">
          <strong>Prevention strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Always identify what the percentage is "of" before calculating
          </li>
          <li>Use estimation to check if results are reasonable</li>
          <li>Double-check decimal point placement and conversions</li>
          <li>Consider the context and limitations of the data</li>
          <li>
            Practice with simple examples before tackling complex problems
          </li>
          <li>Use multiple calculation methods to verify important results</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Percentage calculations are based on mathematical formulas and ratios.
      Results should be interpreted within appropriate context and with
      consideration for significant figures and rounding. For critical
      financial, academic, or business applications, verify calculations and
      consider consulting with relevant professionals. Always ensure you
      understand which values represent the part, whole, and percentage in your
      specific calculation.
    </p>
  </>
);

export default function PercentageFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Percentage Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="percentage-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/calculator", label: "Basic Calculator" },
        { href: "/fraction", label: "Fraction Calculator" },
        { href: "/triangle", label: "Triangle Calculator" },
        { href: "/random", label: "Random Number Generator" },
      ]}
    />
  );
}
