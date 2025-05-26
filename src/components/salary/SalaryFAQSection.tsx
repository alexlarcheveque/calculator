"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the difference between salary and wage?",
    answer:
      "A salary is normally paid on a regular basis, and the amount normally does not fluctuate based on the quality or quantity of work performed. An employee's salary is commonly defined as an annual figure in an employment contract. A wage is best associated with employee compensation based on the number of hours worked multiplied by an hourly rate of pay. Wage-earners tend to be non-exempt, which means they are subject to overtime wage regulations.",
  },
  {
    question: "How are unadjusted and adjusted salaries calculated?",
    answer:
      "Using a $30 hourly rate, an average of eight hours worked each day, and 260 working days a year (52 weeks multiplied by 5 working days a week), the annual unadjusted salary can be calculated as: $30 × 8 × (260) = $62,400. The adjusted annual salary accounts for holidays and vacation days: $30 × 8 × (260 - 25) = $56,400, using 10 holidays and 15 paid vacation days a year.",
  },
  {
    question: "What are the different pay frequencies?",
    answer:
      "The most common pay period frequencies are: Daily (pays every day), Weekly (pays once each week), Bi-Weekly (pays every two weeks, 26 times a year), Semi-Monthly (pays twice each month, usually on the 15th and last day), Monthly (pays once per month), and Quarterly (pays every three months).",
  },
  {
    question: "What factors influence salary in the U.S.?",
    answer:
      "Several factors influence salary including: Age (peak income years are typically 40-65), Education (higher education generally leads to higher salaries), Experience (more experience typically means higher pay), Race and Ethnicity, Gender (there is a documented gender pay gap), Industry (different industries pay different wages), Location (cost of living and local market conditions), and other miscellaneous factors like company performance and hazard pay.",
  },
  {
    question: "How many federal holidays are there in the U.S.?",
    answer:
      "There are 11 federal holidays in the U.S.: New Year's Day, Martin Luther King Jr. Day, Washington's Birthday, Memorial Day, Juneteenth National Independence Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving Day, and Christmas Day. However, companies typically allow time off for 6 to 11 holidays, and only federal government employees benefit from all federal holidays.",
  },
  {
    question: "What is PTO (Paid Time Off)?",
    answer:
      "PTO provides a pool of days that an employee can use for personal leave, sick leave, or vacation days without having to distinguish the reasons for taking time off. In the U.S., the Fair Labor Standards Act (FLSA) does not require employers to give their employees any vacation time off, paid or unpaid. The average American gets around 10 days of PTO a year, with the bottom 25% of wage earners only getting an average of four paid vacation days a year.",
  },
];

export default function SalaryFAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
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

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          How to Increase Your Salary
        </h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">Education:</span>
            <span>
              Pursue higher education, certifications, or specialized training
              relevant to your field.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">
              Experience:
            </span>
            <span>
              Stay within your industry long-term to build expertise and
              demonstrate commitment.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">Network:</span>
            <span>
              Join professional organizations and trade associations to connect
              with others in your field.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">
              Performance:
            </span>
            <span>
              Excel in performance reviews and highlight your achievements to
              justify salary increases.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">Negotiate:</span>
            <span>
              Don't be afraid to negotiate your salary, especially during
              performance reviews or when starting a new job.
            </span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-600 mr-2">
              Change Jobs:
            </span>
            <span>
              Sometimes changing jobs can result in a 10% or more increase in
              salary.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
