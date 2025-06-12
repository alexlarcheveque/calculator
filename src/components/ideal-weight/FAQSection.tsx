"use client";

import FAQSectionUI from "@/components/ui/FAQSection";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much should I weigh?",
    answer:
      'Most everyone has at some point tried to lose weight, or at least known somebody who has. This is largely due to the perception of an "ideal" body weight, which is often based on what we see promoted through various media such as social media, TV, movies, magazines, etc. Although ideal body weight (IBW) today is sometimes based on perceived visual appeal, IBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight.',
  },
  {
    question: "What factors affect ideal weight?",
    answer:
      "Several factors can affect ideal weight including age, gender, height, body frame size, muscle mass, bone density, and overall health. Age shouldn't be a large determinant past adolescence, but lean muscle mass decreases as people age. Gender affects weight as males generally have higher muscle mass and bone density. Height directly correlates with weight, and body frame size (small, medium, or large) can significantly impact ideal weight calculations.",
  },
  {
    question: "What are the different IBW formulas?",
    answer:
      "The main formulas are: Robinson (1983) - modification of Devine formula; Miller (1983) - another Devine modification; Devine (1974) - originally for medicinal dosages, became universal IBW determinant; Hamwi (1964) - invented for medicinal dosage purposes. All formulas use a base weight for 5 feet height with incremental weight added per inch over 5 feet.",
  },
  {
    question: "How accurate are these calculations?",
    answer:
      "IBW formulas have limitations as they only consider height and gender, not muscle mass, bone density, body composition, or individual health factors. They're designed to be applicable to a wide range of people but cannot be highly accurate for every individual. These should be used as general guidelines, not strict values to achieve.",
  },
  {
    question: "What is the healthy BMI range?",
    answer:
      "The World Health Organization (WHO) recommends a healthy BMI range of 18.5-25 for both males and females. BMI is calculated as weight in kg divided by height in meters squared. While BMI is widely used in medical fields as a quick health indicator, it also has limitations as it doesn't account for muscle mass or body composition.",
  },
  {
    question: "Are these formulas suitable for children?",
    answer:
      "No, all the adult IBW formulas are for ages 18 and older. For children and teens, refer to CDC BMI charts which show percentiles based on age. The CDC recommends children maintain a BMI between the 5th and 85th percentile for their age group.",
  },
  {
    question: "Should I try to achieve my calculated ideal weight?",
    answer:
      "Not necessarily. These calculations are references only and it's more important to focus on healthy lifestyle choices like regular exercise, eating unprocessed foods, getting enough sleep, and managing stress. You can be perfectly healthy above or below your calculated IBW. Consult healthcare professionals for personalized guidance.",
  },
  {
    question: "How do I determine my body frame size?",
    answer:
      'Body frame size is categorized as small, medium, or large based on wrist circumference relative to height. For women under 5\'2": small (<5.5"), medium (5.5"-5.75"), large (>5.75"). For women 5\'2"-5\'5": small (<6"), medium (6"-6.25"), large (>6.25"). For women over 5\'5": small (<6.25"), medium (6.25"-6.5"), large (>6.5"). For men over 5\'5": small (5.5"-6.5"), medium (6.5"-7.5"), large (>7.5").',
  },
];

export default function IdealWeightFAQSection() {
  return (
    <FAQSectionUI
      items={faqData}
      allowMultipleOpen={true}
      includeSchema={true}
    />
  );
}
