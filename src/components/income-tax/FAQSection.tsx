"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How accurate is this income tax calculator?",
    answer:
      "This calculator provides estimates based on current federal tax brackets and standard deductions. Actual tax calculations may vary based on additional factors not included in this calculator, such as alternative minimum tax (AMT), additional Medicare tax, or specific tax situations. Always consult a tax professional for complex situations.",
  },
  {
    question: "What's the difference between standard and itemized deductions?",
    answer:
      "The standard deduction is a fixed amount that reduces your taxable income, while itemized deductions are specific expenses you can deduct (like mortgage interest, charitable donations, state/local taxes). The calculator automatically uses whichever deduction method gives you the larger benefit.",
  },
  {
    question: "What are tax credits and how do they work?",
    answer:
      "Tax credits directly reduce the amount of tax you owe, dollar for dollar. For example, a $1,000 tax credit reduces your tax bill by $1,000. This is different from deductions, which only reduce your taxable income. Common credits include the Child Tax Credit, Child and Dependent Care Credit, and Education Credits.",
  },
  {
    question: "What's the difference between effective and marginal tax rates?",
    answer:
      "Your marginal tax rate is the percentage of tax you pay on your last dollar of income - essentially the tax bracket you're in. Your effective tax rate is your total tax divided by your total income, representing the average rate you pay on all your income.",
  },
  {
    question: "How is the Child Tax Credit calculated?",
    answer:
      "For 2024, the Child Tax Credit is $2,000 per qualifying child under 17. The credit begins to phase out for single filers with income over $200,000 and married filing jointly over $400,000. Up to $1,400 of the credit may be refundable.",
  },
  {
    question: "What income should I include in my calculation?",
    answer:
      "Include all taxable income such as wages, tips, business income, interest, dividends, capital gains, and other income reported on tax forms like W-2, 1099-INT, 1099-DIV, etc. Don't include non-taxable income like municipal bond interest or certain Social Security benefits.",
  },
  {
    question: "How does the SALT deduction cap work?",
    answer:
      "The State and Local Tax (SALT) deduction is capped at $10,000 for both single and married filing jointly taxpayers. This includes state income taxes, local income taxes, and property taxes combined. Any amount over $10,000 cannot be deducted.",
  },
  {
    question: "When should I use this calculator?",
    answer:
      "Use this calculator for tax planning, estimating quarterly payments, comparing tax scenarios, or getting a rough estimate of your tax liability. It's particularly useful for planning major financial decisions that could affect your taxes.",
  },
  {
    question: "What if I'm married filing separately?",
    answer:
      "Married filing separately typically results in higher taxes than filing jointly, but may be beneficial in certain situations like when one spouse has significant medical expenses or miscellaneous deductions. The calculator supports this filing status with appropriate tax brackets and deduction limits.",
  },
  {
    question: "How do I handle business income and self-employment?",
    answer:
      "Business income from self-employment is subject to both income tax and self-employment tax (Social Security and Medicare). This calculator estimates the income tax portion. For complete self-employment tax calculations, consult a tax professional or use specialized business tax software.",
  },
];

export default function FAQSection() {
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
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 ml-2">
                {openItems.includes(index) ? "−" : "+"}
              </span>
            </button>

            {openItems.includes(index) && (
              <div className="px-4 pb-3 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Disclaimer</h3>
        <p className="text-sm text-blue-700">
          This calculator is for estimation purposes only and should not be used
          as a substitute for professional tax advice. Tax laws are complex and
          subject to change. For accurate tax planning and preparation, please
          consult with a qualified tax professional or use official IRS
          resources.
        </p>
      </div>
    </div>
  );
}
