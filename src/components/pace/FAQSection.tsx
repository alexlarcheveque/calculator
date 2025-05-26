"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is pace in running?",
    answer:
      "Pace is the rate of activity or movement, typically measured as time per unit distance (e.g., minutes per mile or minutes per kilometer). It indicates how fast you're moving and is commonly used in running, walking, and cycling.",
  },
  {
    question: "How do I calculate my running pace?",
    answer:
      "To calculate pace, divide your total time by the distance covered. For example, if you run 5 miles in 40 minutes, your pace is 40 ÷ 5 = 8 minutes per mile. Our calculator can help you with these conversions automatically.",
  },
  {
    question: "What's the difference between pace and speed?",
    answer:
      "Pace is time per unit distance (e.g., 8:00 per mile), while speed is distance per unit time (e.g., 7.5 mph). They are inversely related - a faster pace means higher speed. Our calculator can convert between both formats.",
  },
  {
    question: "What is a good running pace for beginners?",
    answer:
      "A good beginner pace varies by individual fitness level, but generally ranges from 10-12 minutes per mile for jogging. The key is to start at a comfortable pace where you can maintain a conversation while running, then gradually improve over time.",
  },
  {
    question: "How do I use the multipoint pace calculator?",
    answer:
      "The multipoint calculator helps analyze segment paces during a run. Enter the cumulative distance and time at each checkpoint. The calculator will determine your pace for each segment, helping identify where you sped up or slowed down during your run.",
  },
  {
    question: "What are split times?",
    answer:
      "Split times show how long it would take to complete specific distances at your current pace. For example, if your pace is 8:00 per mile, your 5K split would be approximately 24:51. This helps with race planning and pacing strategies.",
  },
  {
    question: "How accurate is the finish time calculator?",
    answer:
      "The finish time calculator provides estimates based on your current pace. Accuracy depends on maintaining consistent effort throughout the race. Factors like fatigue, terrain, weather, and pacing strategy can affect actual finish times.",
  },
  {
    question: "What's the difference between aerobic and anaerobic pace?",
    answer:
      "Aerobic pace (typically 70-80% max heart rate) can be sustained for long periods using oxygen efficiently. Anaerobic pace (80-90% max heart rate) involves short, intense efforts where muscles work without sufficient oxygen, producing lactate.",
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-gray-500 text-xl">
                {openItems.includes(index) ? "−" : "+"}
              </span>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-3 text-gray-600 border-t border-gray-200">
                <p className="pt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold mb-3 text-gray-800">
          Training Through Pace and Heart Rate
        </h4>
        <div className="text-gray-700 space-y-3">
          <p>
            Pace and heart rate have a positive correlation; higher pace
            corresponds to higher heart rate. The use of both in training can
            help a person improve performance, avoid over-training, as well as
            track progress and fitness over time.
          </p>
          <p>
            <strong>Aerobic vs. Anaerobic Exercise:</strong> Aerobic exercises
            (~70-80% MHR) involve light activity sustained over a long period,
            while anaerobic exercises (~80-90% MHR) involve short, intense
            bursts of activity.
          </p>
          <p>
            Understanding aerobic exercise is particularly important when
            training for long-distance activities such as marathons. Determining
            a pace that can be maintained while using energy primarily derived
            through aerobic means helps maintain a balance between fat and
            carbohydrate utilization.
          </p>
        </div>
      </div>
    </div>
  );
}
