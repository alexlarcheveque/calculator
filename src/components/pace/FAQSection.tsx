"use client";

import FAQSectionUI from "@/components/ui/FAQSection";

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

export default function PaceFAQSection() {
  return (
    <FAQSectionUI
      items={faqData}
      allowMultipleOpen={true}
      includeSchema={true}
    />
  );
}
