"use client";

import FAQSection, { FAQItem } from "@/components/ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-bmi-calculation",
    question: "What is BMI and how is it calculated accurately?",
    answer: (
      <>
        <p className="mb-2">
          BMI (Body Mass Index) measures body fat based on height and weight,
          providing a standardized way to assess if you're underweight, normal
          weight, overweight, or obese.
        </p>
        <p className="mb-2">
          <strong>BMI formulas:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Metric:</strong> BMI = weight (kg) ÷ height (m)²
          </li>
          <li>
            <strong>Imperial:</strong> BMI = 703 × weight (lbs) ÷ height
            (inches)²
          </li>
        </ul>
        <p className="mb-2">
          <strong>Calculation examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Person: 5'9" (69 inches), 160 lbs → BMI = 703 × 160 ÷ (69)² = 23.6
          </li>
          <li>Person: 175 cm (1.75 m), 70 kg → BMI = 70 ÷ (1.75)² = 22.9</li>
          <li>
            Both examples fall in the "normal weight" category (18.5-24.9)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "bmi-categories-health-risks",
    question: "What do different BMI categories mean for my health?",
    answer: (
      <>
        <p className="mb-2">
          <strong>BMI categories and associated health risks:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Underweight (&lt;18.5):</strong> Risk of malnutrition,
            osteoporosis, anemia, decreased immunity
          </li>
          <li>
            <strong>Normal weight (18.5-24.9):</strong> Lowest risk of
            weight-related health problems
          </li>
          <li>
            <strong>Overweight (25-29.9):</strong> Increased risk of type 2
            diabetes, high blood pressure
          </li>
          <li>
            <strong>Obese Class I (30-34.9):</strong> High risk of
            cardiovascular disease, sleep apnea
          </li>
          <li>
            <strong>Obese Class II (35-39.9):</strong> Very high risk of serious
            health complications
          </li>
          <li>
            <strong>Obese Class III (≥40):</strong> Extreme risk requiring
            immediate medical intervention
          </li>
        </ul>
        <p className="text-sm">
          <strong>Important:</strong> These are statistical correlations.
          Individual health depends on many factors beyond BMI.
        </p>
      </>
    ),
  },
  {
    id: "bmi-accuracy-limitations",
    question: "How accurate is BMI and what are its limitations?",
    answer: (
      <>
        <p className="mb-2">
          BMI is a useful screening tool but has significant limitations for
          individual assessment.
        </p>
        <p className="mb-2">
          <strong>BMI limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Muscle vs fat:</strong> Athletes with high muscle mass may
            have "overweight" BMI while being very healthy
          </li>
          <li>
            <strong>Age differences:</strong> Older adults may have higher
            healthy BMI ranges (23-28 for 65+)
          </li>
          <li>
            <strong>Ethnic variations:</strong> Asian populations may have
            health risks at lower BMI values (≥23)
          </li>
          <li>
            <strong>Gender differences:</strong> Women typically have higher
            body fat percentage at same BMI
          </li>
          <li>
            <strong>Body shape:</strong> Doesn't distinguish between "apple" vs
            "pear" body types
          </li>
        </ul>
        <p className="mb-2">
          <strong>Better measures for body composition:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Waist-to-hip ratio, waist circumference, body fat percentage</li>
          <li>DEXA scans, bioelectrical impedance analysis</li>
        </ul>
      </>
    ),
  },
  {
    id: "bmi-prime-ponderal-index",
    question:
      "What are BMI Prime and Ponderal Index, and when should I use them?",
    answer: (
      <>
        <p className="mb-2">
          <strong>BMI Prime:</strong> Ratio of your BMI to the upper limit of
          normal BMI (25).
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculation:</strong> BMI Prime = Your BMI ÷ 25
          </li>
          <li>
            <strong>Interpretation:</strong> 1.0 = upper limit of normal,
            &gt;1.0 = overweight
          </li>
          <li>
            <strong>Example:</strong> BMI of 30 → BMI Prime = 1.2 (20% above
            normal)
          </li>
          <li>
            <strong>Advantage:</strong> Easy to understand percentage
            above/below normal
          </li>
        </ul>
        <p className="mb-2">
          <strong>Ponderal Index:</strong> Similar to BMI but uses height cubed
          instead of squared.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> Weight (kg) ÷ Height (m)³
          </li>
          <li>
            <strong>Normal range:</strong> 11-15 kg/m³
          </li>
          <li>
            <strong>Better for:</strong> Very tall (&gt;6'2") or very short
            (&lt;5'0") individuals
          </li>
          <li>
            <strong>Used in:</strong> Newborn health assessment, extreme height
            cases
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "healthy-bmi-range-factors",
    question:
      "What's the ideal BMI range and how does it vary by demographics?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Standard BMI ranges (adults 20+):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>General population:</strong> 18.5-24.9 (optimal: 20-22)
          </li>
          <li>
            <strong>Asian populations:</strong> 18.5-22.9 (higher disease risk
            ≥23)
          </li>
          <li>
            <strong>Older adults (65+):</strong> 23-28 may be healthiest
          </li>
          <li>
            <strong>Athletes:</strong> May be healthy up to 27-28 due to muscle
            mass
          </li>
        </ul>
        <p className="mb-2">
          <strong>Age-specific considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>20s-30s:</strong> Aim for 20-24 for long-term health
          </li>
          <li>
            <strong>40s-50s:</strong> 22-26 may be protective against illness
          </li>
          <li>
            <strong>60s+:</strong> Slightly higher BMI (23-27) associated with
            better survival
          </li>
        </ul>
        <p className="text-sm">
          <strong>Research finding:</strong> Mortality risk is lowest at BMI
          20-25 for most populations, but individual optimal ranges vary.
        </p>
      </>
    ),
  },
  {
    id: "bmi-children-teens",
    question: "How is BMI calculated and interpreted for children and teens?",
    answer: (
      <>
        <p className="mb-2">
          Children's BMI uses the same formula but different interpretation
          based on age and sex percentiles.
        </p>
        <p className="mb-2">
          <strong>Pediatric BMI categories (ages 2-19):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Underweight:</strong> &lt;5th percentile for age/sex
          </li>
          <li>
            <strong>Normal weight:</strong> 5th to &lt;85th percentile
          </li>
          <li>
            <strong>Overweight:</strong> 85th to &lt;95th percentile
          </li>
          <li>
            <strong>Obese:</strong> ≥95th percentile
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why percentiles matter for children:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Growth patterns:</strong> Children grow at different rates
          </li>
          <li>
            <strong>Puberty effects:</strong> Body composition changes
            dramatically
          </li>
          <li>
            <strong>Normal variation:</strong> Wide range of healthy weights at
            each age
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> A 12-year-old boy with BMI 21 might be 75th
          percentile (normal), while the same BMI would be concerning for a
          6-year-old.
        </p>
      </>
    ),
  },
  {
    id: "bmi-health-risk-prediction",
    question: "How well does BMI predict actual health risks and diseases?",
    answer: (
      <>
        <p className="mb-2">
          BMI is a moderate predictor of health risks at population level but
          has significant individual variation.
        </p>
        <p className="mb-2">
          <strong>Diseases strongly correlated with high BMI:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Type 2 diabetes:</strong> Risk doubles with each 5-unit BMI
            increase above 22
          </li>
          <li>
            <strong>Heart disease:</strong> 1.5x higher risk for BMI 25-30, 2.5x
            for BMI 30+
          </li>
          <li>
            <strong>Sleep apnea:</strong> 10% weight gain increases risk by 32%
          </li>
          <li>
            <strong>Stroke:</strong> Risk increases 4% per unit BMI above 22
          </li>
        </ul>
        <p className="mb-2">
          <strong>BMI's predictive limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Metabolically healthy obesity:</strong> 15-30% of obese
            individuals have normal metabolic markers
          </li>
          <li>
            <strong>Normal weight obesity:</strong> 20% of normal BMI
            individuals have excess body fat
          </li>
          <li>
            <strong>Fitness factor:</strong> Fit obese individuals often
            healthier than unfit normal-weight people
          </li>
        </ul>
        <p className="text-sm">
          <strong>Better health indicators:</strong> Waist circumference
          (&gt;40" men, &gt;35" women), blood pressure, blood sugar, cholesterol
          levels.
        </p>
      </>
    ),
  },
  {
    id: "healthy-weight-management",
    question: "What should I do if my BMI is outside the normal range?",
    answer: (
      <>
        <p className="mb-2">
          <strong>If your BMI indicates overweight/obesity:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Consult healthcare provider:</strong> Rule out medical
            causes, assess overall health
          </li>
          <li>
            <strong>Gradual weight loss:</strong> Aim for 1-2 lbs per week
            (500-1000 calorie deficit daily)
          </li>
          <li>
            <strong>Focus on habits:</strong> Sustainable diet changes, regular
            physical activity
          </li>
          <li>
            <strong>Monitor progress:</strong> Track waist circumference, energy
            levels, not just weight
          </li>
        </ul>
        <p className="mb-2">
          <strong>If your BMI indicates underweight:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Medical evaluation:</strong> Check for underlying
            conditions, eating disorders
          </li>
          <li>
            <strong>Healthy weight gain:</strong> 300-500 calorie surplus daily,
            strength training
          </li>
          <li>
            <strong>Nutrient density:</strong> Focus on protein, healthy fats,
            complex carbs
          </li>
        </ul>
        <p className="text-sm">
          <strong>Remember:</strong> Health is multifaceted. A person with
          "overweight" BMI who exercises regularly may be healthier than a
          sedentary person with "normal" BMI.
        </p>
      </>
    ),
  },
  {
    id: "bmi-vs-other-measurements",
    question: "How does BMI compare to other body composition measurements?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Waist-to-Hip Ratio (WHR):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculation:</strong> Waist circumference ÷ Hip
            circumference
          </li>
          <li>
            <strong>Healthy ranges:</strong> Men &lt;0.9, Women &lt;0.8
          </li>
          <li>
            <strong>Advantage:</strong> Better predictor of cardiovascular risk
            than BMI
          </li>
        </ul>
        <p className="mb-2">
          <strong>Body Fat Percentage:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Healthy ranges:</strong> Men 10-20%, Women 18-28%
          </li>
          <li>
            <strong>Measurement methods:</strong> DEXA scan, bioelectrical
            impedance, skinfold calipers
          </li>
          <li>
            <strong>Advantage:</strong> Directly measures fat vs muscle
            composition
          </li>
        </ul>
        <p className="mb-2">
          <strong>Waist Circumference:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Simple measurement at narrowest part of waist</li>
          <li>Risk increases: Men &gt;40", Women &gt;35"</li>
          <li>Strong predictor of metabolic syndrome</li>
        </ul>
      </>
    ),
  },
  {
    id: "bmi-calculator-accuracy-tips",
    question:
      "How can I ensure accurate BMI calculations and what factors affect them?",
    answer: (
      <>
        <p className="mb-2">
          <strong>For most accurate BMI calculation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Consistent timing:</strong> Weigh yourself same time daily
            (morning after bathroom, before eating)
          </li>
          <li>
            <strong>Proper measurement:</strong> Stand tall against wall, mark
            highest point of head
          </li>
          <li>
            <strong>Minimal clothing:</strong> Weigh in underwear or light
            clothing
          </li>
          <li>
            <strong>Quality scale:</strong> Digital scale on hard, flat surface
          </li>
        </ul>
        <p className="mb-2">
          <strong>Factors that affect weight/BMI readings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Hydration:</strong> Dehydration can affect weight by 2-4 lbs
          </li>
          <li>
            <strong>Food intake:</strong> Full stomach can add 1-3 lbs
            temporarily
          </li>
          <li>
            <strong>Menstrual cycle:</strong> Women may fluctuate 2-5 lbs during
            cycle
          </li>
          <li>
            <strong>Sodium intake:</strong> High salt can cause 2-3 lbs water
            retention
          </li>
          <li>
            <strong>Exercise:</strong> Muscle glycogen and inflammation affect
            scale weight
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Track trends over weeks/months rather
          than daily fluctuations. Consider weekly averages for more accurate
          assessment.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      This BMI calculator is for informational purposes only and should not
      replace professional medical advice. Always consult with a healthcare
      provider for personalized health assessments and recommendations.
    </p>
  </>
);

export default function BMIFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About BMI"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="bmi-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/body-fat", label: "Body Fat Calculator" },
        { href: "/bmr", label: "BMR Calculator" },
        { href: "/calorie", label: "Calorie Calculator" },
        { href: "/ideal-weight", label: "Ideal Weight Calculator" },
      ]}
    />
  );
}
