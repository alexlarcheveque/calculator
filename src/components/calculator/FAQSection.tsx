"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "degree-radian-mode-switching",
    question:
      "How do I switch between degrees and radians for trigonometric functions?",
    answer: (
      <>
        <p className="mb-2">
          Use the Deg/Rad toggle buttons at the top of the calculator to switch
          between degree and radian modes. This setting affects all
          trigonometric functions and their inverse functions.
        </p>
        <p className="mb-2">
          <strong>When to use each mode:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Degrees mode:</strong> For everyday calculations, geometry
            problems, and when working with angles in degrees (0° to 360°)
          </li>
          <li>
            <strong>Radians mode:</strong> For advanced mathematics, calculus,
            physics, and when working with π-based measurements
          </li>
        </ul>
        <p className="mb-2">
          <strong>Quick reference conversions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>180° = π radians</li>
          <li>90° = π/2 radians ≈ 1.571</li>
          <li>60° = π/3 radians ≈ 1.047</li>
          <li>45° = π/4 radians ≈ 0.785</li>
          <li>30° = π/6 radians ≈ 0.524</li>
        </ul>
      </>
    ),
  },
  {
    id: "scientific-functions-overview",
    question: "What scientific functions are available and how do I use them?",
    answer: (
      <>
        <p className="mb-2">
          The calculator includes comprehensive scientific functions organized
          into several categories for advanced mathematical calculations.
        </p>
        <p className="mb-2">
          <strong>Trigonometric functions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>sin, cos, tan:</strong> Basic trigonometric functions
          </li>
          <li>
            <strong>sin⁻¹, cos⁻¹, tan⁻¹:</strong> Inverse trigonometric
            functions (arcsin, arccos, arctan)
          </li>
          <li>
            <strong>Usage:</strong> Enter angle value, then press the function
            button
          </li>
        </ul>
        <p className="mb-2">
          <strong>Logarithmic and exponential functions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>ln:</strong> Natural logarithm (base e)
          </li>
          <li>
            <strong>log:</strong> Common logarithm (base 10)
          </li>
          <li>
            <strong>e^x:</strong> Exponential function (e to the power of x)
          </li>
          <li>
            <strong>10^x:</strong> 10 to the power of x
          </li>
        </ul>
        <p className="mb-2">
          <strong>Power and root functions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>x²:</strong> Square function
          </li>
          <li>
            <strong>x³:</strong> Cube function
          </li>
          <li>
            <strong>x^y:</strong> Any power (enter base, press x^y, enter
            exponent, press =)
          </li>
          <li>
            <strong>√x:</strong> Square root
          </li>
          <li>
            <strong>³√x:</strong> Cube root
          </li>
          <li>
            <strong>ʸ√x:</strong> Any root (y-th root of x)
          </li>
          <li>
            <strong>n!:</strong> Factorial function
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "memory-functions-usage",
    question: "How do I use memory functions effectively?",
    answer: (
      <>
        <p className="mb-2">
          Memory functions allow you to store, recall, and manipulate values
          during complex calculations, making multi-step problems easier to
          solve.
        </p>
        <p className="mb-2">
          <strong>Memory function buttons:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>M+:</strong> Adds the current display value to memory
          </li>
          <li>
            <strong>M-:</strong> Subtracts the current display value from memory
          </li>
          <li>
            <strong>MR:</strong> Recalls (displays) the current memory value
          </li>
          <li>
            <strong>MC:</strong> Clears memory (sets memory to zero)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Calculate 15 × 3 = 45, then press M+ (memory = 45)</li>
          <li>Calculate 8 × 7 = 56, then press M+ (memory = 45 + 56 = 101)</li>
          <li>Calculate 20 ÷ 4 = 5, then press M- (memory = 101 - 5 = 96)</li>
          <li>Press MR to recall the final memory value: 96</li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> The MR button is disabled when memory is empty
          (equals zero) to prevent confusion.
        </p>
      </>
    ),
  },
  {
    id: "keyboard-shortcuts-support",
    question: "What keyboard shortcuts can I use for faster calculations?",
    answer: (
      <>
        <p className="mb-2">
          The calculator supports extensive keyboard input for faster operation
          without clicking buttons. All basic and some advanced functions are
          accessible via keyboard.
        </p>
        <p className="mb-2">
          <strong>Number and basic operation keys:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>0-9:</strong> Input numbers directly
          </li>
          <li>
            <strong>. (period):</strong> Decimal point
          </li>
          <li>
            <strong>+ - * /:</strong> Basic arithmetic operators
          </li>
          <li>
            <strong>Enter or =:</strong> Execute calculation (equals)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Control and editing keys:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Escape or C:</strong> All Clear (AC) - resets calculator
          </li>
          <li>
            <strong>Backspace:</strong> Delete last digit or character
          </li>
          <li>
            <strong>( ) parentheses:</strong> Grouping for order of operations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Efficiency tips:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use parentheses to control calculation order</li>
          <li>Press Enter instead of clicking = for faster calculations</li>
          <li>Use Escape for quick resets between calculations</li>
          <li>
            Combine keyboard input with mouse clicks for scientific functions
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "answer-function-usage",
    question: "How does the 'Ans' button work for chaining calculations?",
    answer: (
      <>
        <p className="mb-2">
          The Ans (Answer) button recalls the result of the last calculation,
          allowing you to chain multiple calculations together without manually
          re-entering previous results.
        </p>
        <p className="mb-2">
          <strong>How Ans works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            After any calculation that produces a result, that value is
            automatically stored as "Ans"
          </li>
          <li>
            Press the Ans button to recall this value into the current
            calculation
          </li>
          <li>The Ans value updates every time you perform a calculation</li>
          <li>
            Ans persists until you perform another calculation or refresh the
            page
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical example sequence:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Calculate: 25 × 4 = 100 (Ans = 100)</li>
          <li>New calculation: Ans ÷ 5 = 20 (using previous result 100)</li>
          <li>New calculation: Ans + 15 = 35 (using previous result 20)</li>
          <li>New calculation: √(Ans) = 5.916 (square root of 35)</li>
        </ul>
        <p className="mb-2">
          <strong>Common use cases:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Multi-step calculations requiring intermediate results</li>
          <li>Converting units through multiple operations</li>
          <li>Iterative calculations and approximations</li>
          <li>Complex formulas broken into smaller parts</li>
        </ul>
      </>
    ),
  },
  {
    id: "powers-roots-calculation",
    question: "How do I calculate powers and roots accurately?",
    answer: (
      <>
        <p className="mb-2">
          The calculator provides multiple methods for calculating powers and
          roots, each optimized for different types of calculations.
        </p>
        <p className="mb-2">
          <strong>Power calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>x²:</strong> Quick squares - enter number, press x² button
          </li>
          <li>
            <strong>x³:</strong> Quick cubes - enter number, press x³ button
          </li>
          <li>
            <strong>x^y:</strong> Any power - enter base, press x^y, enter
            exponent, press =
          </li>
          <li>
            <strong>e^x:</strong> Exponential - enter exponent, press e^x button
          </li>
          <li>
            <strong>10^x:</strong> Power of 10 - enter exponent, press 10^x
            button
          </li>
        </ul>
        <p className="mb-2">
          <strong>Root calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>√x:</strong> Square root - enter number, press √x button
          </li>
          <li>
            <strong>³√x:</strong> Cube root - enter number, press ³√x button
          </li>
          <li>
            <strong>ʸ√x:</strong> Any root - enter the number (x), press ʸ√x,
            enter root index (y), press =
          </li>
        </ul>
        <p className="mb-2">
          <strong>Examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>2^8: Enter 2, press x^y, enter 8, press = → Result: 256</li>
          <li>∛125: Enter 125, press ³√x → Result: 5</li>
          <li>⁴√16: Enter 16, press ʸ√x, enter 4, press = → Result: 2</li>
        </ul>
      </>
    ),
  },
  {
    id: "error-handling-troubleshooting",
    question: "What do error messages mean and how do I fix them?",
    answer: (
      <>
        <p className="mb-2">
          The calculator displays "Error" when invalid mathematical operations
          are attempted. Understanding common error causes helps prevent and
          resolve calculation issues.
        </p>
        <p className="mb-2">
          <strong>Common error causes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Division by zero:</strong> Any number ÷ 0 is mathematically
            undefined
          </li>
          <li>
            <strong>Square root of negative numbers:</strong> √(-x) is not
            defined in real numbers
          </li>
          <li>
            <strong>Logarithm domain errors:</strong> ln(0) or ln(negative
            number) are undefined
          </li>
          <li>
            <strong>Factorial of negative numbers:</strong> (-n)! is not defined
            for negative integers
          </li>
          <li>
            <strong>Invalid trigonometric inputs:</strong> Some functions have
            domain restrictions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Error resolution steps:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Press AC (All Clear):</strong> This resets the calculator
            and clears the error
          </li>
          <li>
            <strong>Check your input:</strong> Verify that all values and
            operations are valid
          </li>
          <li>
            <strong>Use parentheses:</strong> Ensure proper order of operations
            with grouping
          </li>
          <li>
            <strong>Verify angle mode:</strong> Check if Deg/Rad setting is
            appropriate for trigonometric functions
          </li>
        </ul>
        <p className="text-sm">
          <strong>Prevention tip:</strong> When working with complex
          calculations, break them into smaller steps to isolate potential error
          sources.
        </p>
      </>
    ),
  },
  {
    id: "calculation-precision-accuracy",
    question: "How precise are the calculations and what are the limitations?",
    answer: (
      <>
        <p className="mb-2">
          The calculator uses JavaScript's double-precision floating-point
          arithmetic, which provides high accuracy for most practical
          calculations but has some inherent limitations.
        </p>
        <p className="mb-2">
          <strong>Precision specifications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Significant digits:</strong> Approximately 15-17 decimal
            digits of precision
          </li>
          <li>
            <strong>Range:</strong> Numbers from approximately 5×10⁻³²⁴ to
            1.8×10³⁰⁸
          </li>
          <li>
            <strong>Scientific notation:</strong> Very large or small numbers
            display in exponential format
          </li>
          <li>
            <strong>Rounding:</strong> Results are rounded to prevent
            floating-point display artifacts
          </li>
        </ul>
        <p className="mb-2">
          <strong>Known limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Floating-point errors:</strong> 0.1 + 0.2 may not exactly
            equal 0.3 due to binary representation
          </li>
          <li>
            <strong>Very large numbers:</strong> May lose precision in the least
            significant digits
          </li>
          <li>
            <strong>Repeated operations:</strong> Small errors can accumulate
            over many calculations
          </li>
          <li>
            <strong>Trigonometric functions:</strong> May have tiny errors at
            special angles due to π approximation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices for accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Use exact values when possible (e.g., π button instead of 3.14159)
          </li>
          <li>
            Minimize intermediate rounding by using Ans for chained calculations
          </li>
          <li>
            Be aware of precision limits when working with very large or small
            numbers
          </li>
          <li>
            For critical applications, verify results with alternative methods
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "order-operations-parentheses",
    question:
      "How does the calculator handle order of operations and parentheses?",
    answer: (
      <>
        <p className="mb-2">
          The calculator follows standard mathematical order of operations
          (PEMDAS/BODMAS) and supports parentheses for grouping expressions and
          controlling calculation sequence.
        </p>
        <p className="mb-2">
          <strong>Order of operations (PEMDAS):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>P - Parentheses:</strong> Operations inside parentheses are
            performed first
          </li>
          <li>
            <strong>E - Exponents:</strong> Powers and roots (x², x³, x^y, √)
          </li>
          <li>
            <strong>MD - Multiplication/Division:</strong> Performed left to
            right
          </li>
          <li>
            <strong>AS - Addition/Subtraction:</strong> Performed left to right
          </li>
        </ul>
        <p className="mb-2">
          <strong>Examples of order of operations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>2 + 3 × 4</strong> = 2 + 12 = 14 (not 20)
          </li>
          <li>
            <strong>(2 + 3) × 4</strong> = 5 × 4 = 20
          </li>
          <li>
            <strong>2^3 + 1</strong> = 8 + 1 = 9
          </li>
          <li>
            <strong>√(16 + 9)</strong> = √25 = 5
          </li>
        </ul>
        <p className="mb-2">
          <strong>Using parentheses effectively:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Group terms that should be calculated together</li>
          <li>Use nested parentheses for complex expressions</li>
          <li>Parentheses override normal order of operations</li>
          <li>Clear parentheses help prevent calculation errors</li>
        </ul>
      </>
    ),
  },
  {
    id: "calculation-history-tips",
    question:
      "How does the calculation history work and what are some productivity tips?",
    answer: (
      <>
        <p className="mb-2">
          The calculator maintains a history of your recent calculations and
          includes several features designed to improve calculation efficiency
          and accuracy.
        </p>
        <p className="mb-2">
          <strong>History features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Last 10 calculations:</strong> Automatically stored and
            displayed
          </li>
          <li>
            <strong>Input and result tracking:</strong> Shows both the
            expression and answer
          </li>
          <li>
            <strong>Persistent memory:</strong> History persists until page
            refresh
          </li>
          <li>
            <strong>Visual reference:</strong> Helps verify previous
            calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Productivity tips:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Use Ans for chaining:</strong> Build complex calculations
            step by step
          </li>
          <li>
            <strong>Memory functions:</strong> Store intermediate results for
            multi-part problems
          </li>
          <li>
            <strong>Keyboard shortcuts:</strong> Faster input than mouse clicks
          </li>
          <li>
            <strong>Scientific notation:</strong> Automatically handles very
            large/small numbers
          </li>
        </ul>
        <p className="mb-2">
          <strong>Advanced usage scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Statistical calculations using memory functions for running totals
          </li>
          <li>Unit conversions with multiple step calculations</li>
          <li>
            Engineering calculations requiring multiple intermediate results
          </li>
          <li>
            Financial calculations with compound interest and payment formulas
          </li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">
      Calculator Notes
    </h3>
    <p className="text-blue-700 text-sm">
      This scientific calculator provides high-precision mathematical
      calculations for educational and professional use. While results are
      mathematically accurate within the limits of double-precision arithmetic,
      users should be aware of floating-point limitations for critical
      applications. For complex scientific or engineering calculations requiring
      higher precision, consider specialized mathematical software. Always
      verify important calculations using alternative methods when precision is
      critical.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About the Scientific Calculator"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/finance", label: "Finance Calculator" },
        { href: "/fraction", label: "Fraction Calculator" },
        { href: "/triangle", label: "Triangle Calculator" },
      ]}
    />
  );
}
