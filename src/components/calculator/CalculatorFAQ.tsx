"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I switch between degrees and radians?",
    answer:
      "Use the Deg/Rad toggle buttons at the top of the calculator. This affects trigonometric functions (sin, cos, tan) and their inverses. Degrees mode is selected by default.",
  },
  {
    question: "What scientific functions are available?",
    answer:
      "The calculator includes trigonometric functions (sin, cos, tan and their inverses), logarithmic functions (ln, log), exponential functions (e^x, 10^x), power functions (x², x³, x^y), root functions (√, ³√, ʸ√x), factorial (n!), and constants (π, e).",
  },
  {
    question: "How do I use memory functions?",
    answer:
      "M+ adds the current display to memory, M- subtracts from memory, MR recalls the memory value, and MC clears memory. The MR button is disabled when memory is empty.",
  },
  {
    question: "Can I use my keyboard?",
    answer:
      "Yes! You can use number keys (0-9), operators (+, -, *, /), decimal point (.), Enter or = for equals, Escape for clear (AC), and Backspace for deleting the last digit.",
  },
  {
    question: "What does the 'Ans' button do?",
    answer:
      "The Ans button recalls the result of the last calculation. This is useful for chaining calculations without having to re-enter previous results.",
  },
  {
    question: "How do I calculate powers and roots?",
    answer:
      "Use x² for squares, x³ for cubes, x^y for any power (enter base, press x^y, enter exponent, press =). For roots, use √x for square root, ³√x for cube root, or ʸ√x for any root.",
  },
  {
    question: "What happens if I get an error?",
    answer:
      "Errors occur for invalid operations like division by zero, square root of negative numbers, or domain errors for functions. Press AC to clear the error and start fresh.",
  },
  {
    question: "How precise are the calculations?",
    answer:
      "The calculator uses JavaScript's built-in math functions with double-precision floating-point arithmetic. Very large or very small numbers are displayed in scientific notation.",
  },
];

export default function CalculatorFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 text-xl">
                {openItems.includes(index) ? "−" : "+"}
              </span>
            </button>

            {openItems.includes(index) && (
              <div className="px-4 pb-3 text-gray-600 border-t border-gray-100">
                <p className="pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Calculator Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use parentheses to control order of operations</li>
          <li>
            • The calculator maintains a history of your last 10 calculations
          </li>
          <li>• Scientific notation is used for very large or small numbers</li>
          <li>
            • Memory functions persist until you clear them or refresh the page
          </li>
          <li>
            • All trigonometric functions work with the selected angle mode
          </li>
        </ul>
      </div>
    </div>
  );
}
