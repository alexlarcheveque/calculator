"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-are-fractions-definition",
    question: "What are fractions and how are they represented?",
    answer: (
      <>
        <p className="mb-2">
          In mathematics, a fraction is a number that represents a part of a
          whole. It consists of two main components: a numerator and a
          denominator, separated by a horizontal line or slash.
        </p>
        <p className="mb-2">
          <strong>Components of a fraction:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Numerator:</strong> The top number that represents how many
            parts we have
          </li>
          <li>
            <strong>Denominator:</strong> The bottom number that represents the
            total number of equal parts
          </li>
          <li>
            <strong>Fraction bar:</strong> The line separating numerator and
            denominator
          </li>
        </ul>
        <p className="mb-2">
          <strong>Visual example:</strong>
        </p>
        <p className="text-sm mb-3">
          In the fraction 3/8, the numerator is 3 and the denominator is 8. If
          you imagine a pie divided into 8 equal slices, and you take 3 slices,
          you have 3/8 of the pie. The remaining portion would be 5/8.
        </p>
        <p className="mb-2">
          <strong>Important rule:</strong>
        </p>
        <p className="text-sm">
          The denominator of a fraction cannot be 0, as this would make the
          fraction undefined. Division by zero is undefined in mathematics.
        </p>
      </>
    ),
  },
  {
    id: "fraction-addition-methods",
    question: "How do you add fractions with different denominators?",
    answer: (
      <>
        <p className="mb-2">
          Adding fractions requires a common denominator. Unlike whole numbers,
          you cannot simply add numerators and denominators separately when
          denominators are different.
        </p>
        <p className="mb-2">
          <strong>General addition formula:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          a/b + c/d = (a×d + c×b) / (b×d)
        </div>
        <p className="mb-2">
          <strong>Step-by-step process:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Find a common denominator (often by multiplying denominators)</li>
          <li>
            Convert each fraction to equivalent fractions with common
            denominator
          </li>
          <li>Add the numerators while keeping the common denominator</li>
          <li>Simplify the result if possible</li>
        </ol>
        <p className="mb-2">
          <strong>Worked example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Problem: 3/4 + 1/6</li>
          <li>Find common denominator: 4 × 6 = 24</li>
          <li>Convert fractions: 3/4 = 18/24 and 1/6 = 4/24</li>
          <li>Add: 18/24 + 4/24 = 22/24</li>
          <li>Simplify: 22/24 = 11/12 (divide by GCD of 2)</li>
        </ul>
        <p className="text-sm">
          <strong>Tip:</strong> For easier calculations, you can find the Least
          Common Multiple (LCM) of the denominators instead of simply
          multiplying them together.
        </p>
      </>
    ),
  },
  {
    id: "fraction-subtraction-methods",
    question: "How do you subtract fractions and mixed numbers?",
    answer: (
      <>
        <p className="mb-2">
          Fraction subtraction follows the same principles as addition,
          requiring a common denominator before performing the operation. The
          key difference is subtracting rather than adding the numerators.
        </p>
        <p className="mb-2">
          <strong>Basic subtraction formula:</strong>
        </p>
        <div className="bg-gray-100 p-3 rounded text-center font-mono mb-3">
          a/b - c/d = (a×d - c×b) / (b×d)
        </div>
        <p className="mb-2">
          <strong>For fractions with same denominators:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Simply subtract the numerators: 7/9 - 2/9 = 5/9</li>
          <li>Keep the common denominator unchanged</li>
          <li>Simplify if possible</li>
        </ul>
        <p className="mb-2">
          <strong>Mixed number subtraction:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Convert mixed numbers to improper fractions</li>
          <li>Find common denominator</li>
          <li>Subtract as regular fractions</li>
          <li>Convert back to mixed number if desired</li>
        </ol>
        <p className="mb-2">
          <strong>Example with borrowing:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Problem: 3 1/4 - 1 3/4</li>
          <li>Since 1/4 &lt; 3/4, borrow 1 from 3: 2 5/4 - 1 3/4</li>
          <li>Subtract: (2-1) + (5/4 - 3/4) = 1 2/4 = 1 1/2</li>
        </ul>
      </>
    ),
  },
  {
    id: "fraction-multiplication-division",
    question: "How do you multiply and divide fractions?",
    answer: (
      <>
        <p className="mb-2">
          Multiplying and dividing fractions are actually simpler operations
          than addition and subtraction because they don't require finding
          common denominators.
        </p>
        <p className="mb-2">
          <strong>Multiplication process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Multiply numerators together: a × c</li>
          <li>Multiply denominators together: b × d</li>
          <li>Formula: (a/b) × (c/d) = (a×c)/(b×d)</li>
          <li>Simplify the result</li>
        </ul>
        <p className="mb-2">
          <strong>Multiplication example:</strong>
        </p>
        <p className="text-sm mb-3">2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2</p>
        <p className="mb-2">
          <strong>Division process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Keep the first fraction unchanged</li>
          <li>
            Find the reciprocal of the second fraction (flip numerator and
            denominator)
          </li>
          <li>Multiply by the reciprocal</li>
          <li>Formula: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c)</li>
        </ul>
        <p className="mb-2">
          <strong>Division example:</strong>
        </p>
        <p className="text-sm mb-3">
          2/3 ÷ 3/4 = 2/3 × 4/3 = (2×4)/(3×3) = 8/9
        </p>
        <p className="text-sm">
          <strong>Memory tip:</strong> "Keep, Change, Flip" - Keep the first
          fraction, change division to multiplication, flip the second fraction.
        </p>
      </>
    ),
  },
  {
    id: "fraction-simplification-methods",
    question: "How do you simplify fractions to their lowest terms?",
    answer: (
      <>
        <p className="mb-2">
          Simplifying fractions means reducing them to their lowest terms by
          dividing both the numerator and denominator by their greatest common
          factor (GCF). This makes fractions easier to work with and understand.
        </p>
        <p className="mb-2">
          <strong>Simplification process:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            Find the Greatest Common Factor (GCF) of numerator and denominator
          </li>
          <li>Divide both numerator and denominator by the GCF</li>
          <li>Check if further simplification is possible</li>
          <li>Continue until no common factors remain (except 1)</li>
        </ol>
        <p className="mb-2">
          <strong>Finding the GCF methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Prime factorization:</strong> Find common prime factors
          </li>
          <li>
            <strong>Euclidean algorithm:</strong> Repeatedly apply division
          </li>
          <li>
            <strong>Factor listing:</strong> List all factors and find the
            largest common one
          </li>
        </ul>
        <p className="mb-2">
          <strong>Worked examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Example 1:</strong> 12/18 → GCF(12,18) = 6 → 12÷6 / 18÷6 =
            2/3
          </li>
          <li>
            <strong>Example 2:</strong> 24/36 → GCF(24,36) = 12 → 24÷12 / 36÷12
            = 2/3
          </li>
          <li>
            <strong>Example 3:</strong> 15/25 → GCF(15,25) = 5 → 15÷5 / 25÷5 =
            3/5
          </li>
        </ul>
        <p className="text-sm">
          <strong>Why simplify?</strong> Simplified fractions are easier to
          compare, calculate with, and interpret. For example, 1/2 is much
          clearer than 220/440.
        </p>
      </>
    ),
  },
  {
    id: "mixed-numbers-improper-fractions",
    question:
      "How do you convert between mixed numbers and improper fractions?",
    answer: (
      <>
        <p className="mb-2">
          Mixed numbers and improper fractions are two different ways to
          represent the same value. Understanding how to convert between them is
          essential for fraction calculations.
        </p>
        <p className="mb-2">
          <strong>Definitions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mixed number:</strong> A whole number plus a fraction (e.g.,
            2 3/4)
          </li>
          <li>
            <strong>Improper fraction:</strong> Numerator is larger than or
            equal to denominator (e.g., 11/4)
          </li>
          <li>
            <strong>Proper fraction:</strong> Numerator is smaller than
            denominator (e.g., 3/4)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Converting mixed number to improper fraction:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Multiply the whole number by the denominator</li>
          <li>Add the numerator to this product</li>
          <li>Place the sum over the original denominator</li>
          <li>Formula: a b/c = (a×c + b)/c</li>
        </ol>
        <p className="mb-2">
          <strong>Example: 2 3/4 to improper fraction:</strong>
        </p>
        <p className="text-sm mb-3">(2×4 + 3)/4 = (8 + 3)/4 = 11/4</p>
        <p className="mb-2">
          <strong>Converting improper fraction to mixed number:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Divide the numerator by the denominator</li>
          <li>The quotient becomes the whole number</li>
          <li>The remainder becomes the new numerator</li>
          <li>Keep the same denominator</li>
        </ol>
        <p className="mb-2">
          <strong>Example: 11/4 to mixed number:</strong>
        </p>
        <p className="text-sm">11 ÷ 4 = 2 remainder 3, so 11/4 = 2 3/4</p>
      </>
    ),
  },
  {
    id: "decimal-fraction-conversions",
    question: "How do you convert between fractions and decimals?",
    answer: (
      <>
        <p className="mb-2">
          Converting between fractions and decimals is a fundamental skill that
          helps in various mathematical applications and real-world
          calculations.
        </p>
        <p className="mb-2">
          <strong>Converting fractions to decimals:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Divide the numerator by the denominator</li>
          <li>Use long division or a calculator</li>
          <li>Example: 3/4 = 3 ÷ 4 = 0.75</li>
          <li>Example: 1/3 = 1 ÷ 3 = 0.333... (repeating decimal)</li>
        </ul>
        <p className="mb-2">
          <strong>Converting decimals to fractions:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Identify the place value of the last digit</li>
          <li>Write the decimal digits as the numerator</li>
          <li>Use the place value as the denominator</li>
          <li>Simplify the resulting fraction</li>
        </ol>
        <p className="mb-2">
          <strong>Decimal to fraction examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>0.5:</strong> 5/10 = 1/2 (simplified)
          </li>
          <li>
            <strong>0.25:</strong> 25/100 = 1/4 (simplified)
          </li>
          <li>
            <strong>0.125:</strong> 125/1000 = 1/8 (simplified)
          </li>
          <li>
            <strong>0.75:</strong> 75/100 = 3/4 (simplified)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Place value reference:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>1st decimal place: tenths (10)</li>
          <li>2nd decimal place: hundredths (100)</li>
          <li>3rd decimal place: thousandths (1000)</li>
          <li>4th decimal place: ten-thousandths (10,000)</li>
        </ul>
      </>
    ),
  },
  {
    id: "comparing-ordering-fractions",
    question: "How do you compare and order fractions?",
    answer: (
      <>
        <p className="mb-2">
          Comparing fractions helps determine which is larger, smaller, or if
          they're equal. There are several methods depending on the fractions
          you're comparing.
        </p>
        <p className="mb-2">
          <strong>Method 1: Common denominators</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Find a common denominator for all fractions</li>
          <li>
            Convert each fraction to equivalent fractions with common
            denominator
          </li>
          <li>Compare the numerators directly</li>
          <li>Larger numerator = larger fraction</li>
        </ol>
        <p className="mb-2">
          <strong>Example:</strong> Compare 2/3 and 3/4
        </p>
        <p className="text-sm mb-3">
          Common denominator: 12 → 2/3 = 8/12 and 3/4 = 9/12 → 3/4 &gt; 2/3
        </p>
        <p className="mb-2">
          <strong>Method 2: Cross multiplication</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>For fractions a/b and c/d: compare a×d with b×c</li>
          <li>If a×d &gt; b×c, then a/b &gt; c/d</li>
          <li>
            Example: 2/3 vs 3/4 → 2×4 = 8 and 3×3 = 9 → 8 &lt; 9, so 2/3 &lt;
            3/4
          </li>
        </ul>
        <p className="mb-2">
          <strong>Method 3: Convert to decimals</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Convert each fraction to decimal form</li>
          <li>Compare the decimal values</li>
          <li>Example: 2/3 = 0.667 and 3/4 = 0.75 → 0.75 &gt; 0.667</li>
        </ul>
        <p className="mb-2">
          <strong>Special cases:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Same numerators: smaller denominator = larger fraction</li>
          <li>Same denominators: larger numerator = larger fraction</li>
          <li>Unit fractions (1/n): smaller denominator = larger fraction</li>
        </ul>
      </>
    ),
  },
  {
    id: "fraction-real-world-applications",
    question: "What are common real-world applications of fractions?",
    answer: (
      <>
        <p className="mb-2">
          Fractions appear frequently in everyday life and various professional
          fields. Understanding fractions helps with practical problem-solving
          and measurements.
        </p>
        <p className="mb-2">
          <strong>Cooking and baking:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Recipe scaling: doubling a recipe requires multiplying fractions
          </li>
          <li>Ingredient measurements: 3/4 cup flour, 1/2 teaspoon salt</li>
          <li>Portion control: dividing meals into equal parts</li>
          <li>Converting between measurement units</li>
        </ul>
        <p className="mb-2">
          <strong>Construction and DIY:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Measurements: 2 3/4 inches, 5/8 inch screws</li>
          <li>Material calculations: determining lumber lengths</li>
          <li>Scaling blueprints and plans</li>
          <li>Tile and flooring calculations</li>
        </ul>
        <p className="mb-2">
          <strong>Financial applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Interest rates: 1/4 point increase = 0.25%</li>
          <li>Stock prices: 5 1/8 dollars per share</li>
          <li>Budget allocation: spending 1/3 on housing</li>
          <li>Profit sharing and partnerships</li>
        </ul>
        <p className="mb-2">
          <strong>Time and scheduling:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Time fractions: 1/2 hour = 30 minutes</li>
          <li>Work schedules: 3/4 time position</li>
          <li>Project timelines: 2/3 complete</li>
        </ul>
        <p className="mb-2">
          <strong>Science and medicine:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Dosage calculations: 1/2 tablet twice daily</li>
          <li>Solution concentrations: 1/4 strength solution</li>
          <li>Probability and statistics in research</li>
          <li>Measurement precision in experiments</li>
        </ul>
      </>
    ),
  },
  {
    id: "fraction-calculator-usage-tips",
    question:
      "How do you effectively use fraction calculators and avoid common mistakes?",
    answer: (
      <>
        <p className="mb-2">
          Fraction calculators are powerful tools that can handle complex
          calculations, but understanding their features and avoiding common
          pitfalls ensures accurate results.
        </p>
        <p className="mb-2">
          <strong>Calculator features to utilize:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Multiple input formats:</strong> Enter fractions as a/b or
            mixed numbers as a b/c
          </li>
          <li>
            <strong>Automatic simplification:</strong> Results shown in lowest
            terms
          </li>
          <li>
            <strong>Mixed/improper conversion:</strong> Toggle between formats
          </li>
          <li>
            <strong>Decimal conversion:</strong> See fraction and decimal
            equivalents
          </li>
          <li>
            <strong>Step-by-step solutions:</strong> Understand the calculation
            process
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common mistakes to avoid:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Input errors:</strong> Double-check numerators and
            denominators
          </li>
          <li>
            <strong>Operation confusion:</strong> Verify you selected the
            correct operation (+, -, ×, ÷)
          </li>
          <li>
            <strong>Mixed number format:</strong> Enter spaces correctly: "2
            3/4" not "23/4"
          </li>
          <li>
            <strong>Negative fractions:</strong> Place negative sign before the
            fraction: "-2/3"
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Verify results by converting to decimals for reasonableness check
          </li>
          <li>
            Use manual calculation for simple fractions to maintain skills
          </li>
          <li>
            Check if answers need to be in specific format (mixed vs improper)
          </li>
          <li>Understand the mathematical concepts behind the calculations</li>
        </ul>
        <p className="mb-2">
          <strong>When to use different calculator modes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Basic operations:</strong> Addition, subtraction,
            multiplication, division
          </li>
          <li>
            <strong>Simplification:</strong> Reducing fractions to lowest terms
          </li>
          <li>
            <strong>Conversion:</strong> Between decimals, fractions, and mixed
            numbers
          </li>
          <li>
            <strong>Complex calculations:</strong> Multiple operations in
            sequence
          </li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Fraction calculations are based on mathematical principles and algorithms.
      Results are automatically simplified to lowest terms when possible. For
      educational purposes, understanding the underlying mathematical concepts
      is important alongside calculator usage. For academic assessments, verify
      if specific answer formats (mixed numbers vs improper fractions) are
      required. Always double-check critical calculations, especially in
      professional applications like construction, medicine, or finance.
    </p>
  </>
);

export default function FractionFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Fraction Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="fraction-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/calculator", label: "Basic Calculator" },
        { href: "/triangle", label: "Triangle Calculator" },
        { href: "/random", label: "Random Number Generator" },
      ]}
    />
  );
}
