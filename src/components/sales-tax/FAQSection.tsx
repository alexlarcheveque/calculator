"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Sales Tax?",
    answer:
      "A sales tax is a consumption tax paid to a government on the sale of certain goods and services. Usually, the vendor collects the sales tax from the consumer as the consumer makes a purchase. In most countries, the sales tax is called value-added tax (VAT) or goods and services tax (GST), which is a different form of consumption tax.",
  },
  {
    question: "How is Sales Tax calculated?",
    answer:
      "Sales tax is calculated by multiplying the purchase price by the sales tax rate. For example, if you buy an item for $100 and the sales tax rate is 6.5%, the sales tax would be $100 × 0.065 = $6.50, making your total $106.50.",
  },
  {
    question: "Do all states have sales tax?",
    answer:
      "No, not all states have statewide sales tax. Five states do not impose statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some local jurisdictions in these states may still impose sales taxes.",
  },
  {
    question: "What's the difference between sales tax and VAT?",
    answer:
      "Sales tax is only applied at the final point of sale to the end consumer, while VAT (Value-Added Tax) is applied at multiple stages of production and distribution. VAT is commonly used outside the U.S. in over 160 countries, while sales tax is primarily used in the United States.",
  },
  {
    question: "Can I deduct sales tax on my federal income tax?",
    answer:
      "Yes, but only if you itemize deductions instead of taking the standard deduction. You can choose to deduct either state and local income taxes OR sales taxes, but not both. Most taxpayers find that deducting income taxes results in a larger deduction.",
  },
  {
    question: "Why do sales tax rates vary so much?",
    answer:
      "Sales tax rates vary because they are set by state and local governments independently. States set their base rates, and local jurisdictions (cities, counties) can add their own sales taxes on top of the state rate. This is why you might see different rates even within the same state.",
  },
  {
    question: "Are all purchases subject to sales tax?",
    answer:
      "No, sales tax exemptions vary by state. Common exemptions include prescription medications, certain food items, and sometimes clothing. Some states also have sales tax holidays where certain items are temporarily exempt from sales tax.",
  },
  {
    question: "How do online purchases affect sales tax?",
    answer:
      "Online purchases are generally subject to sales tax based on where the item is delivered, not where it's purchased from. Many online retailers now collect sales tax at the time of purchase, but consumers may still owe 'use tax' on purchases where sales tax wasn't collected.",
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
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className="ml-2 flex-shrink-0">
                {openItems.includes(index) ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-3">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          Need More Information?
        </h3>
        <p className="text-blue-800 text-sm">
          Sales tax laws and rates change frequently. For the most current
          information about sales tax in your area, consult your state's
          department of revenue or a qualified tax professional.
        </p>
      </div>
    </div>
  );
}
