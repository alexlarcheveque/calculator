"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-fertile-window",
    question: "What is the fertile window and when does it occur?",
    answer: (
      <>
        <p className="mb-2">
          The fertile window is the period during your menstrual cycle when
          conception is most likely to occur. It typically spans about 6 days,
          including the 5 days before ovulation and the day of ovulation itself.
        </p>
        <p className="mb-2">
          <strong>Key timing factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Ovulation timing:</strong> Usually occurs 12-16 days before
            your next period
          </li>
          <li>
            <strong>Egg viability:</strong> An egg survives 12-24 hours after
            ovulation
          </li>
          <li>
            <strong>Sperm survival:</strong> Sperm can live 3-5 days in the
            female reproductive tract
          </li>
          <li>
            <strong>Peak fertility:</strong> The 2-3 days before and including
            ovulation day
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example for a 28-day cycle:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Ovulation: Day 14</li>
          <li>Fertile window: Days 9-14</li>
          <li>Peak fertility: Days 12-14</li>
        </ul>
      </>
    ),
  },
  {
    id: "conception-calculator-accuracy",
    question: "How accurate is this conception calculator?",
    answer: (
      <>
        <p className="mb-2">
          This calculator provides estimates based on average menstrual cycle
          patterns and assumes ovulation occurs approximately 14 days before
          your next period. Accuracy varies depending on cycle regularity and
          individual factors.
        </p>
        <p className="mb-2">
          <strong>Accuracy factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Regular cycles (25-35 days):</strong> Generally 70-80%
            accurate for predicting ovulation
          </li>
          <li>
            <strong>Irregular cycles:</strong> Less reliable, may vary by
            several days
          </li>
          <li>
            <strong>Individual variation:</strong> Ovulation can occur 12-16
            days before next period
          </li>
          <li>
            <strong>Cycle length changes:</strong> Stress, illness, or lifestyle
            changes can affect timing
          </li>
        </ul>
        <p className="mb-2">
          <strong>Improving accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Track cycles for 3-6 months to identify patterns</li>
          <li>Monitor basal body temperature daily</li>
          <li>Observe cervical mucus changes</li>
          <li>Use ovulation predictor kits for confirmation</li>
        </ul>
      </>
    ),
  },
  {
    id: "best-time-to-conceive",
    question: "When is the best time to try to conceive?",
    answer: (
      <>
        <p className="mb-2">
          The optimal time for conception is during your fertile window,
          particularly the 2-3 days before ovulation and the day of ovulation.
          However, regular intimacy throughout your cycle is also important.
        </p>
        <p className="mb-2">
          <strong>Timing strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Targeted approach:</strong> Focus on fertile window days for
            maximum efficiency
          </li>
          <li>
            <strong>Regular approach:</strong> Intimate relations every 2-3 days
            throughout cycle
          </li>
          <li>
            <strong>Combined approach:</strong> Regular intimacy plus increased
            frequency during fertile window
          </li>
        </ul>
        <p className="mb-2">
          <strong>Success rates during fertile window:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>3 days before ovulation: ~27% chance per cycle</li>
          <li>2 days before ovulation: ~33% chance per cycle</li>
          <li>1 day before ovulation: ~41% chance per cycle</li>
          <li>Day of ovulation: ~20% chance per cycle</li>
        </ul>
        <p className="text-sm">
          <strong>Important note:</strong> Even with perfect timing, healthy
          couples have only a 20-25% chance of conception per cycle.
        </p>
      </>
    ),
  },
  {
    id: "sperm-survival-female-body",
    question: "How long can sperm survive in the female body?",
    answer: (
      <>
        <p className="mb-2">
          Sperm can survive in the female reproductive tract for 3-5 days under
          optimal conditions, with some studies suggesting up to 7 days in rare
          cases. This extended survival time is why the fertile window includes
          several days before ovulation.
        </p>
        <p className="mb-2">
          <strong>Factors affecting sperm survival:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Cervical mucus quality:</strong> Fertile-quality mucus
            protects and nourishes sperm
          </li>
          <li>
            <strong>pH levels:</strong> Optimal vaginal pH (7.0-8.5) during
            fertile window
          </li>
          <li>
            <strong>Sperm health:</strong> Healthy sperm with good motility
            survive longer
          </li>
          <li>
            <strong>Timing in cycle:</strong> Survival is best around ovulation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Sperm survival timeline:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Vagina:</strong> Few hours due to acidic environment
          </li>
          <li>
            <strong>Cervix:</strong> Up to 5 days in fertile mucus
          </li>
          <li>
            <strong>Uterus:</strong> 3-5 days with proper conditions
          </li>
          <li>
            <strong>Fallopian tubes:</strong> Up to 5 days, where fertilization
            occurs
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical implication:</strong> This is why having relations
          before ovulation can still result in pregnancy when the egg is
          released.
        </p>
      </>
    ),
  },
  {
    id: "irregular-cycles-conception",
    question:
      "What if my cycles are irregular? How does this affect conception timing?",
    answer: (
      <>
        <p className="mb-2">
          Irregular cycles (varying by more than 7-9 days) make it more
          challenging to predict ovulation and fertile windows. However,
          conception is still possible with adjusted tracking methods.
        </p>
        <p className="mb-2">
          <strong>Common causes of irregular cycles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Hormonal imbalances:</strong> PCOS, thyroid disorders,
            insulin resistance
          </li>
          <li>
            <strong>Lifestyle factors:</strong> Stress, extreme exercise,
            significant weight changes
          </li>
          <li>
            <strong>Age-related changes:</strong> Perimenopause, adolescence
          </li>
          <li>
            <strong>Medical conditions:</strong> Endometriosis, uterine fibroids
          </li>
        </ul>
        <p className="mb-2">
          <strong>Tracking strategies for irregular cycles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Basal body temperature:</strong> Track daily temperature to
            confirm ovulation
          </li>
          <li>
            <strong>Cervical mucus monitoring:</strong> Watch for egg-white
            consistency
          </li>
          <li>
            <strong>Ovulation predictor kits:</strong> Use LH surge detection
            tests
          </li>
          <li>
            <strong>Fertility apps:</strong> Use apps that adapt to irregular
            patterns
          </li>
        </ul>
        <p className="text-sm">
          <strong>When to seek help:</strong> If cycles are consistently
          irregular (less than 21 days or more than 35 days), consult a
          healthcare provider for evaluation.
        </p>
      </>
    ),
  },
  {
    id: "fertility-tracking-methods",
    question: "How can I track my fertility more accurately?",
    answer: (
      <>
        <p className="mb-2">
          Accurate fertility tracking combines multiple methods to identify
          ovulation patterns and optimize conception timing. The most effective
          approach uses several indicators together.
        </p>
        <p className="mb-2">
          <strong>Basal Body Temperature (BBT) tracking:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Take temperature immediately upon waking, before any activity</li>
          <li>Use a basal thermometer for accuracy (to 0.1°F)</li>
          <li>Temperature rises 0.5-1°F after ovulation and stays elevated</li>
          <li>Track for 3+ months to identify patterns</li>
        </ul>
        <p className="mb-2">
          <strong>Cervical mucus observation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Post-menstrual:</strong> Dry or minimal mucus
          </li>
          <li>
            <strong>Pre-ovulation:</strong> Sticky, thick, cloudy mucus
          </li>
          <li>
            <strong>Fertile window:</strong> Clear, stretchy, egg-white
            consistency
          </li>
          <li>
            <strong>Post-ovulation:</strong> Thick, sticky, or dry again
          </li>
        </ul>
        <p className="mb-2">
          <strong>Ovulation predictor kits (OPKs):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Detect luteinizing hormone (LH) surge 12-36 hours before ovulation
          </li>
          <li>Test daily during expected fertile window</li>
          <li>Digital tests may be easier to interpret than test strips</li>
          <li>Most effective when combined with other tracking methods</li>
        </ul>
      </>
    ),
  },
  {
    id: "regular-intimacy-conception",
    question: "What role does regular intimacy play in conception?",
    answer: (
      <>
        <p className="mb-2">
          Regular intimacy throughout your cycle, not just during the fertile
          window, plays several important roles in optimizing conception chances
          and overall reproductive health.
        </p>
        <p className="mb-2">
          <strong>Benefits of regular intimacy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Hormonal optimization:</strong> Regular activity helps
            maintain healthy hormone levels
          </li>
          <li>
            <strong>Sperm quality:</strong> Frequent ejaculation (every 2-3
            days) maintains optimal sperm health
          </li>
          <li>
            <strong>Cervical mucus:</strong> Regular activity may improve
            cervical mucus quality
          </li>
          <li>
            <strong>Stress reduction:</strong> Intimacy reduces stress hormones
            that can interfere with ovulation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Recommended frequency:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>General guideline:</strong> Every 2-3 days throughout the
            cycle
          </li>
          <li>
            <strong>Fertile window:</strong> Daily or every other day for
            maximum coverage
          </li>
          <li>
            <strong>Quality over quantity:</strong> Focus on timing rather than
            excessive frequency
          </li>
        </ul>
        <p className="mb-2">
          <strong>Avoiding common mistakes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Don't "save up" sperm - this can reduce quality</li>
          <li>
            Avoid excessive frequency (daily for weeks) which may cause fatigue
          </li>
          <li>
            Don't restrict intimacy only to fertile days - this adds pressure
          </li>
          <li>
            Maintain intimacy for relationship health, not just conception
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pregnancy-test-timing",
    question: "When should I take a pregnancy test for accurate results?",
    answer: (
      <>
        <p className="mb-2">
          Proper timing of pregnancy tests is crucial for accurate results.
          Testing too early can lead to false negatives, while waiting too long
          may cause unnecessary anxiety.
        </p>
        <p className="mb-2">
          <strong>Optimal testing timeline:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Best timing:</strong> First day of missed period or later
          </li>
          <li>
            <strong>Early testing:</strong> 10-12 days after ovulation (with
            sensitive tests)
          </li>
          <li>
            <strong>Most accurate:</strong> One week after missed period
          </li>
          <li>
            <strong>Blood test:</strong> Can detect pregnancy 6-8 days after
            ovulation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Understanding hCG levels:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Implantation:</strong> Occurs 6-12 days after ovulation
          </li>
          <li>
            <strong>hCG production:</strong> Begins after implantation
          </li>
          <li>
            <strong>Doubling time:</strong> hCG levels double every 48-72 hours
            early in pregnancy
          </li>
          <li>
            <strong>Detection threshold:</strong> Most tests detect 25-50 mIU/mL
            hCG
          </li>
        </ul>
        <p className="mb-2">
          <strong>Test accuracy factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Test sensitivity:</strong> More sensitive tests detect lower
            hCG levels
          </li>
          <li>
            <strong>Time of day:</strong> First morning urine has highest hCG
            concentration
          </li>
          <li>
            <strong>Dilution:</strong> Drinking lots of fluids can dilute urine
            and affect results
          </li>
          <li>
            <strong>Medications:</strong> Fertility drugs containing hCG can
            cause false positives
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "conception-success-rates",
    question: "What are typical conception success rates and timelines?",
    answer: (
      <>
        <p className="mb-2">
          Understanding normal conception timelines helps set realistic
          expectations and reduces anxiety during the trying-to-conceive
          journey.
        </p>
        <p className="mb-2">
          <strong>Success rates by age (per cycle):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Under 25:</strong> 25-30% chance per cycle
          </li>
          <li>
            <strong>25-29:</strong> 20-25% chance per cycle
          </li>
          <li>
            <strong>30-34:</strong> 15-20% chance per cycle
          </li>
          <li>
            <strong>35-39:</strong> 10-15% chance per cycle
          </li>
          <li>
            <strong>40+:</strong> 5-10% chance per cycle
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cumulative success rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>3 months:</strong> 50-60% of couples conceive
          </li>
          <li>
            <strong>6 months:</strong> 75-80% of couples conceive
          </li>
          <li>
            <strong>12 months:</strong> 85-90% of couples conceive
          </li>
          <li>
            <strong>24 months:</strong> 95% of couples conceive
          </li>
        </ul>
        <p className="mb-2">
          <strong>Factors affecting success rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Age of both partners (female age has greater impact)</li>
          <li>Overall health and lifestyle factors</li>
          <li>Frequency and timing of intercourse</li>
          <li>Previous pregnancy history</li>
          <li>Underlying fertility issues</li>
          <li>Stress levels and mental health</li>
        </ul>
      </>
    ),
  },
  {
    id: "lifestyle-factors-fertility",
    question: "How do lifestyle factors affect fertility and conception?",
    answer: (
      <>
        <p className="mb-2">
          Lifestyle choices significantly impact fertility for both partners.
          Optimizing these factors can improve conception chances and support
          healthy pregnancy outcomes.
        </p>
        <p className="mb-2">
          <strong>Nutrition and fertility:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Folic acid:</strong> 400-800 mcg daily before conception and
            during pregnancy
          </li>
          <li>
            <strong>Healthy weight:</strong> BMI 18.5-24.9 optimizes hormone
            balance
          </li>
          <li>
            <strong>Mediterranean diet:</strong> Rich in antioxidants, healthy
            fats, and nutrients
          </li>
          <li>
            <strong>Limit processed foods:</strong> Reduce trans fats and
            excessive sugar
          </li>
        </ul>
        <p className="mb-2">
          <strong>Substances to avoid or limit:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Alcohol:</strong> Can disrupt ovulation and hormone
            production
          </li>
          <li>
            <strong>Smoking:</strong> Reduces egg quality and sperm count
          </li>
          <li>
            <strong>Excessive caffeine:</strong> Limit to 200mg daily (1-2 cups
            coffee)
          </li>
          <li>
            <strong>Environmental toxins:</strong> Minimize exposure to
            pesticides and chemicals
          </li>
        </ul>
        <p className="mb-2">
          <strong>Exercise and stress management:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Moderate exercise:</strong> 150 minutes weekly of moderate
            activity
          </li>
          <li>
            <strong>Avoid excessive exercise:</strong> Can disrupt ovulation in
            some women
          </li>
          <li>
            <strong>Stress reduction:</strong> Practice meditation, yoga, or
            other relaxation techniques
          </li>
          <li>
            <strong>Adequate sleep:</strong> 7-9 hours nightly for hormone
            regulation
          </li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      This conception calculator provides estimates based on average menstrual
      cycle patterns and should not replace professional medical advice.
      Individual cycles can vary significantly, and many factors affect
      fertility. If you have concerns about fertility, irregular cycles, or have
      been trying to conceive for more than 12 months (or 6 months if over 35),
      consult with a healthcare provider or fertility specialist for
      personalized guidance and evaluation.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Conception and Fertility"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="conception-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/pregnancy", label: "Pregnancy Calculator" },
        { href: "/duedate", label: "Due Date Calculator" },
        { href: "/age", label: "Age Calculator" },
        { href: "/date", label: "Date Calculator" },
      ]}
    />
  );
}
