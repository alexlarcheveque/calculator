"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is BMR and how is it calculated?",
    answer: "Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions at rest. It's calculated using formulas like Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle, which consider your age, gender, height, and weight (and body fat percentage for Katch-McArdle)."
  },
  {
    question: "Which BMR formula should I use?",
    answer: "The Mifflin-St Jeor equation is generally considered the most accurate for the general population. Use Harris-Benedict for comparison, and Katch-McArdle if you know your body fat percentage and want the most precise calculation for lean individuals."
  },
  {
    question: "How accurate are these calorie calculations?",
    answer: "These calculations provide estimates based on established scientific formulas. Individual metabolism can vary by ±10-15% due to factors like genetics, muscle mass, hormones, and metabolic adaptation. Use these numbers as a starting point and adjust based on your actual results."
  },
  {
    question: "Is it safe to eat below my BMR?",
    answer: "Generally, it's not recommended to eat significantly below your BMR for extended periods. This can slow your metabolism, cause muscle loss, and lead to nutritional deficiencies. The calculator ensures weight loss calories don't go below sedentary level (BMR × 1.2)."
  },
  {
    question: "How much weight can I safely lose per week?",
    answer: "A safe and sustainable rate is 0.5-2 pounds per week. Losing more than 2 pounds per week can result in muscle loss and metabolic slowdown. The calculator provides three options: mild (0.5 lbs), moderate (1 lb), and aggressive (2 lbs) per week."
  },
  {
    question: "What's the difference between calories and kilojoules?",
    answer: "Calories and kilojoules are both units of energy. 1 calorie equals approximately 4.184 kilojoules. The calculator can display results in either unit based on your preference."
  },
  {
    question: "How should I distribute my macronutrients?",
    answer: "The calculator suggests 30% protein, 40% carbohydrates, and 30% fat as a balanced starting point. However, optimal ratios can vary based on your goals, activity level, and personal preferences. Consult a nutritionist for personalized recommendations."
  },
  {
    question: "Should I eat back exercise calories?",
    answer: "The activity level you select should account for your regular exercise. If you do additional exercise beyond your normal routine, you may need to eat some of those calories back to maintain your planned deficit/surplus."
  },
  {
    question: "Why am I not losing weight despite following the calorie recommendations?",
    answer: "Weight loss plateaus are common due to metabolic adaptation, water retention, muscle gain, or inaccurate calorie tracking. Consider adjusting your calorie intake, changing your exercise routine, or consulting a healthcare professional."
  },
  {
    question: "How often should I recalculate my calorie needs?",
    answer: "Recalculate every 10-15 pounds of weight loss/gain, or every 2-3 months. As your weight changes, so do your calorie needs. Regular adjustments help maintain progress toward your goals."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
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
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="ml-6 flex-shrink-0">
                {openItems.includes(index) ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Important Note</h3>
        <p className="text-blue-700 text-sm">
          This calculator provides estimates for educational purposes. For personalized nutrition advice, 
          especially if you have health conditions or specific fitness goals, consult with a registered 
          dietitian or healthcare professional.
        </p>
      </div>
    </div>
  );
} 