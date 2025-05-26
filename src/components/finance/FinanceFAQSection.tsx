"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the Time Value of Money (TVM)?",
    answer: `The "time value of money" refers to the fact that a dollar in hand today is worth more than a dollar promised at some future time. This is because money available today can be invested to earn interest, making it worth more in the future. For example, $100 today invested at 10% interest will be worth $110 in one year.`,
  },
  {
    question: "How do I use this Finance Calculator?",
    answer: `This calculator works like a 5-key time value of money calculator (such as BA II Plus or HP 12CP). Enter values for four of the five variables (N, I/Y, PV, PMT, FV), then select which variable you want to calculate by clicking its tab. The calculator will solve for the unknown variable using standard TVM formulas.`,
  },
  {
    question: "What is Present Value (PV)?",
    answer: `Present Value is the current worth of a future sum of money or stream of cash flows given a specified rate of return. It represents how much a future amount is worth in today's dollars. For example, if you expect to receive $121 in two years and the discount rate is 10%, the present value is $100.`,
  },
  {
    question: "What is Future Value (FV)?",
    answer: `Future Value is the value of a current asset at a future date based on an assumed rate of growth. It represents how much an investment made today will be worth at a specific time in the future. For example, $100 invested today at 10% annual interest will have a future value of $110 after one year.`,
  },
  {
    question: "What is Periodic Payment (PMT)?",
    answer: `Periodic Payment (PMT) is an inflow or outflow amount that occurs at each period of a financial stream. This could be monthly rent payments, annual loan payments, or regular investment contributions. PMT can be positive (money received) or negative (money paid out).`,
  },
  {
    question: "What does N represent?",
    answer: `N represents the number of compounding periods in the calculation. This could be years, months, quarters, or any other time period depending on how often interest is compounded and payments are made. For example, a 5-year loan with monthly payments would have N = 60 periods.`,
  },
  {
    question: "What is I/Y (Interest per Year)?",
    answer: `I/Y is the annual interest rate expressed as a percentage. This is the rate at which money grows or the cost of borrowing money per year. The calculator automatically adjusts this rate based on the compounding frequency you specify in the settings.`,
  },
  {
    question:
      "When should payments be made at the beginning vs. end of periods?",
    answer: `Most financial calculations assume payments are made at the end of each period (ordinary annuity). However, some situations like rent or lease payments are typically made at the beginning of each period (annuity due). The timing affects the calculation because payments made at the beginning have more time to earn interest.`,
  },
];

export default function FinanceFAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openItems.includes(index) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Calculators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Related Calculators
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            href="/mortgage"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Mortgage Calculator
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Loan Calculator
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Investment Calculator
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            Interest Calculator
          </a>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Understanding Finance Calculations
        </h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 mb-4">
            In basic finance courses, lots of time is spent on the computation
            of the time value of money, which can involve 4 or 5 different
            elements, including Present Value (PV), Future Value (FV), Interest
            Rate (I/Y), and Number of Periods (N). Periodic Payment (PMT) can be
            included but is not a required element.
          </p>

          <p className="text-gray-700 mb-4">
            This Finance Calculator is the foundation for most financial
            calculators. It helps to think of it as an equivalent to the steam
            engine that was eventually used to power a wide variety of things
            such as the steamboat, railway locomotives, factories, and road
            vehicles.
          </p>

          <p className="text-gray-700">
            For any business student, it is an immensely difficult task to
            navigate finance courses without a handy financial calculator. While
            most basic financial calculations can technically be done by hand,
            professors generally allow students to use financial calculators,
            even during exams.
          </p>
        </div>
      </div>
    </div>
  );
}
