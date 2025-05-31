"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "bmr-calculation-formulas",
    question: "What is BMR and how do different calculation formulas compare?",
    answer: (
      <>
        <p className="mb-2">
          Basal Metabolic Rate (BMR) is the number of calories your body burns
          at complete rest to maintain vital functions like breathing,
          circulation, and cellular repair.
        </p>
        <p className="mb-2">
          <strong>
            BMR formula comparison (40-year-old man, 5'10", 175 lbs):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mifflin-St Jeor:</strong> 1,742 calories (most accurate for
            general population)
          </li>
          <li>
            <strong>Harris-Benedict:</strong> 1,801 calories (tends to
            overestimate by 5%)
          </li>
          <li>
            <strong>Katch-McArdle:</strong> 1,825 calories (requires body fat %,
            best for lean individuals)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Key differences:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Mifflin-St Jeor: Most validated, accounts for modern lifestyles
          </li>
          <li>
            Harris-Benedict: Older formula, may overestimate for sedentary
            people
          </li>
          <li>
            Katch-McArdle: Uses lean body mass, ideal for athletes with known
            body fat
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "daily-calorie-needs-activity-levels",
    question: "How do activity levels affect my daily calorie needs?",
    answer: (
      <>
        <p className="mb-2">
          Total Daily Energy Expenditure (TDEE) multiplies your BMR by activity
          factors to account for daily movement and exercise.
        </p>
        <p className="mb-2">
          <strong>
            Activity level multipliers (BMR of 1,750 calories example):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sedentary (1.2):</strong> 2,100 calories - desk job, minimal
            exercise
          </li>
          <li>
            <strong>Lightly active (1.375):</strong> 2,406 calories - light
            exercise 1-3 days/week
          </li>
          <li>
            <strong>Moderately active (1.55):</strong> 2,713 calories - moderate
            exercise 3-5 days/week
          </li>
          <li>
            <strong>Very active (1.725):</strong> 3,019 calories - hard exercise
            6-7 days/week
          </li>
          <li>
            <strong>Extremely active (1.9):</strong> 3,325 calories - physical
            job + exercise
          </li>
        </ul>
        <p className="text-sm">
          <strong>Tip:</strong> Most people overestimate their activity level.
          Be honest about your actual exercise frequency and intensity.
        </p>
      </>
    ),
  },
  {
    id: "weight-loss-calorie-deficit",
    question:
      "How many calories should I cut for safe and effective weight loss?",
    answer: (
      <>
        <p className="mb-2">
          Safe weight loss requires a consistent calorie deficit while
          preserving muscle mass and maintaining energy levels.
        </p>
        <p className="mb-2">
          <strong>Weight loss rates and required deficits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mild loss (0.5 lbs/week):</strong> 250 calorie daily deficit
          </li>
          <li>
            <strong>Moderate loss (1 lb/week):</strong> 500 calorie daily
            deficit
          </li>
          <li>
            <strong>Aggressive loss (2 lbs/week):</strong> 1,000 calorie daily
            deficit
          </li>
        </ul>
        <p className="mb-2">
          <strong>Safety guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Minimum calories:</strong> Women 1,200/day, Men 1,500/day
          </li>
          <li>
            <strong>Never below BMR:</strong> Body needs baseline calories for
            vital functions
          </li>
          <li>
            <strong>Maximum weekly loss:</strong> 1% of body weight to preserve
            muscle
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> 200 lb person should lose max 2 lbs/week;
          150 lb person should lose max 1.5 lbs/week.
        </p>
      </>
    ),
  },
  {
    id: "calorie-accuracy-tracking-tips",
    question:
      "How accurate are calorie calculations and how can I improve tracking?",
    answer: (
      <>
        <p className="mb-2">
          Calorie calculations are estimates with ±10-15% variation due to
          individual differences in metabolism, genetics, and body composition.
        </p>
        <p className="mb-2">
          <strong>Factors affecting accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Metabolic adaptation:</strong> Metabolism slows 5-15% during
            weight loss
          </li>
          <li>
            <strong>Non-exercise thermogenesis:</strong> Fidgeting, posture can
            vary 350 calories/day
          </li>
          <li>
            <strong>Muscle mass:</strong> Each pound of muscle burns 6-7
            calories/day at rest
          </li>
          <li>
            <strong>Hormonal fluctuations:</strong> Thyroid, cortisol, insulin
            affect metabolism
          </li>
        </ul>
        <p className="mb-2">
          <strong>Improving tracking accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Weigh food on digital scale vs. measuring cups (30% more accurate)
          </li>
          <li>Track for 2-3 weeks, then adjust based on actual results</li>
          <li>Log everything including condiments, cooking oils, beverages</li>
          <li>
            Use verified database entries, avoid generic "homemade" options
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "macronutrient-distribution-optimal",
    question: "What's the optimal macronutrient distribution for my goals?",
    answer: (
      <>
        <p className="mb-2">
          Macronutrient ratios should align with your specific goals, activity
          level, and personal preferences.
        </p>
        <p className="mb-2">
          <strong>General guidelines by goal (based on total calories):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weight loss:</strong> 25-35% protein, 25-35% fat, 30-50%
            carbs
          </li>
          <li>
            <strong>Muscle building:</strong> 25-30% protein, 20-30% fat, 40-55%
            carbs
          </li>
          <li>
            <strong>Endurance athletes:</strong> 15-20% protein, 20-25% fat,
            55-65% carbs
          </li>
          <li>
            <strong>Ketogenic:</strong> 20-25% protein, 70-80% fat, 5-10% carbs
          </li>
        </ul>
        <p className="mb-2">
          <strong>Minimum requirements for health:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Protein:</strong> 0.8g per kg body weight (0.36g per lb)
            minimum
          </li>
          <li>
            <strong>Fat:</strong> 20-25% of calories for hormone production
          </li>
          <li>
            <strong>Carbs:</strong> 130g/day minimum for brain function
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example for 150 lb person eating 2,000 calories:</strong> 150g
          protein (30%), 67g fat (30%), 200g carbs (40%).
        </p>
      </>
    ),
  },
  {
    id: "eating-below-bmr-safety",
    question: "Is it safe to eat below my BMR and what are the risks?",
    answer: (
      <>
        <p className="mb-2">
          Eating significantly below BMR for extended periods can trigger
          metabolic adaptations that harm your health and weight loss efforts.
        </p>
        <p className="mb-2">
          <strong>Risks of extreme calorie restriction:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Metabolic slowdown:</strong> BMR can decrease 15-40% in
            severe restriction
          </li>
          <li>
            <strong>Muscle loss:</strong> Body breaks down lean tissue for
            energy
          </li>
          <li>
            <strong>Nutrient deficiencies:</strong> Inadequate vitamins,
            minerals, essential fatty acids
          </li>
          <li>
            <strong>Hormonal disruption:</strong> Thyroid, leptin, cortisol
            imbalances
          </li>
          <li>
            <strong>Psychological effects:</strong> Food obsession, binge
            eating, mood changes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Safe minimum calorie targets:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Women:</strong> Generally no less than 1,200 calories/day
          </li>
          <li>
            <strong>Men:</strong> Generally no less than 1,500 calories/day
          </li>
          <li>
            <strong>Active individuals:</strong> May need 300-500 calories above
            minimums
          </li>
        </ul>
        <p className="text-sm">
          <strong>Better approach:</strong> Moderate deficit (500-750 calories)
          with adequate protein and strength training to preserve muscle.
        </p>
      </>
    ),
  },
  {
    id: "calories-vs-kilojoules-conversion",
    question: "What's the difference between calories and kilojoules?",
    answer: (
      <>
        <p className="mb-2">
          Calories and kilojoules are both units measuring energy content in
          food, with different regional preferences for usage.
        </p>
        <p className="mb-2">
          <strong>Conversion relationship:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>1 calorie (kcal) = 4.184 kilojoules (kJ)</strong>
          </li>
          <li>
            <strong>1 kilojoule = 0.239 calories</strong>
          </li>
          <li>
            <strong>Quick estimate:</strong> Divide kJ by 4.2 to get calories
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>2,000 calories = 8,368 kJ</strong> (typical daily intake)
          </li>
          <li>
            <strong>500 calories = 2,092 kJ</strong> (weight loss deficit)
          </li>
          <li>
            <strong>100 calories = 418 kJ</strong> (small snack)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Regional usage:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>United States, Canada: Primarily calories (kcal)</li>
          <li>Australia, New Zealand: Kilojoules mandatory on labels</li>
          <li>Europe: Both units commonly used</li>
          <li>Scientific literature: Often uses kilojoules</li>
        </ul>
      </>
    ),
  },
  {
    id: "exercise-calories-eating-back",
    question:
      "Should I eat back exercise calories and how do I calculate them?",
    answer: (
      <>
        <p className="mb-2">
          Whether to eat back exercise calories depends on how you've set up
          your calorie targets and activity level calculations.
        </p>
        <p className="mb-2">
          <strong>Two main approaches:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>TDEE method:</strong> Include exercise in activity level,
            don't eat back calories
          </li>
          <li>
            <strong>NEAT + Exercise:</strong> Use sedentary TDEE, then add/eat
            back exercise calories
          </li>
        </ul>
        <p className="mb-2">
          <strong>Exercise calorie burns (155 lb person, 30 minutes):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Walking (3.5 mph):</strong> 149 calories
          </li>
          <li>
            <strong>Running (6 mph):</strong> 372 calories
          </li>
          <li>
            <strong>Cycling (12-14 mph):</strong> 298 calories
          </li>
          <li>
            <strong>Weight training:</strong> 112 calories
          </li>
          <li>
            <strong>Swimming (moderate):</strong> 223 calories
          </li>
        </ul>
        <p className="mb-2">
          <strong>Important considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Fitness trackers often overestimate calories by 15-30%</li>
          <li>
            If using TDEE method, extra exercise may warrant eating back 25-50%
          </li>
          <li>
            Monitor energy levels and performance to determine if you need more
            fuel
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "weight-loss-plateau-troubleshooting",
    question:
      "Why am I not losing weight despite following calorie recommendations?",
    answer: (
      <>
        <p className="mb-2">
          Weight loss plateaus are common and result from multiple physiological
          and behavioral factors.
        </p>
        <p className="mb-2">
          <strong>Common plateau causes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Metabolic adaptation:</strong> BMR decreases 10-15% during
            weight loss
          </li>
          <li>
            <strong>Water retention:</strong> Stress, sodium, hormones can mask
            fat loss
          </li>
          <li>
            <strong>Calorie creep:</strong> Portion sizes gradually increase
            over time
          </li>
          <li>
            <strong>Body recomposition:</strong> Gaining muscle while losing fat
            (same weight)
          </li>
          <li>
            <strong>Reduced NEAT:</strong> Subconscious decrease in daily
            movement
          </li>
        </ul>
        <p className="mb-2">
          <strong>Troubleshooting strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Recalculate calories:</strong> Adjust for new body weight
            every 10-15 lbs
          </li>
          <li>
            <strong>Tighten tracking:</strong> Re-weigh and measure foods, check
            entries
          </li>
          <li>
            <strong>Take diet breaks:</strong> 1-2 weeks at maintenance to reset
            hormones
          </li>
          <li>
            <strong>Change exercise:</strong> Add strength training or increase
            activity
          </li>
          <li>
            <strong>Monitor non-scale victories:</strong> Measurements, photos,
            energy levels
          </li>
        </ul>
        <p className="text-sm">
          <strong>Timeline expectation:</strong> Plateaus lasting 2-4 weeks are
          normal; longer periods warrant strategy changes.
        </p>
      </>
    ),
  },
  {
    id: "calorie-recalculation-frequency",
    question: "How often should I recalculate my calorie needs?",
    answer: (
      <>
        <p className="mb-2">
          Regular recalculation ensures your calorie targets remain appropriate
          as your body composition and goals change.
        </p>
        <p className="mb-2">
          <strong>Recalculation triggers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weight change:</strong> Every 10-15 lbs lost or gained
          </li>
          <li>
            <strong>Time-based:</strong> Every 6-8 weeks regardless of weight
            change
          </li>
          <li>
            <strong>Goal changes:</strong> Switching from cutting to bulking or
            maintenance
          </li>
          <li>
            <strong>Activity changes:</strong> New job, exercise routine, or
            lifestyle
          </li>
          <li>
            <strong>Plateau periods:</strong> No progress for 3-4 weeks despite
            adherence
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why recalculation matters:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>BMR decreases:</strong> Every 10 lbs lost reduces BMR by
            ~50-70 calories
          </li>
          <li>
            <strong>Activity efficiency:</strong> Same exercise burns fewer
            calories as you get fitter
          </li>
          <li>
            <strong>Body composition:</strong> Muscle gain increases BMR, fat
            loss decreases it
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> 200 lb person loses 20 lbs → BMR drops
          ~100-140 calories, requiring calorie adjustment to maintain same
          deficit.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      This calculator provides estimates for educational purposes. For
      personalized nutrition advice, especially if you have health conditions or
      specific fitness goals, consult with a registered dietitian or healthcare
      professional.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Calorie Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="calorie-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/bmi", label: "BMI Calculator" },
        { href: "/bmr", label: "BMR Calculator" },
        { href: "/body-fat", label: "Body Fat Calculator" },
        { href: "/ideal-weight", label: "Ideal Weight Calculator" },
      ]}
    />
  );
}
