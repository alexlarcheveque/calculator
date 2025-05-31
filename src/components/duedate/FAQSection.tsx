"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "due-date-calculation-accuracy",
    question: "How accurate are due date calculations and what should I expect?",
    answer: (
      <>
        <p className="mb-2">
          Due date calculations provide an estimate rather than an exact
          prediction, with only about 4% of babies born on their calculated due
          date. Understanding accuracy helps set realistic expectations.
        </p>
        <p className="mb-2">
          <strong>Accuracy statistics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Exact due date:</strong> Only 4% of babies are born on the
            calculated date
          </li>
          <li>
            <strong>Within 1 week:</strong> 25% of babies are born within 1
            week of due date
          </li>
          <li>
            <strong>Within 2 weeks:</strong> 85% of babies are born within 2
            weeks of due date
          </li>
          <li>
            <strong>Normal range:</strong> 37-42 weeks gestation is considered
            normal
          </li>
        </ul>
        <p className="mb-2">
          <strong>Factors affecting accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculation method:</strong> Early ultrasound most accurate,
            LMP less precise
          </li>
          <li>
            <strong>Cycle regularity:</strong> Irregular cycles reduce LMP-based
            accuracy
          </li>
          <li>
            <strong>Individual variation:</strong> Each pregnancy is unique
          </li>
          <li>
            <strong>First vs. subsequent pregnancies:</strong> First babies
            often arrive 8 days late on average
          </li>
        </ul>
        <p className="text-sm">
          <strong>Important note:</strong> Due date is better thought of as a
          "due month" with a range of normal delivery times.
        </p>
      </>
    ),
  },
  {
    id: "gestational-age-vs-fetal-age",
    question: "What's the difference between gestational age and fetal age?",
    answer: (
      <>
        <p className="mb-2">
          Understanding the difference between gestational age and fetal age is
          crucial for interpreting pregnancy timelines and medical information.
        </p>
        <p className="mb-2">
          <strong>Gestational age (standard medical measurement):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculation:</strong> From first day of last menstrual
            period (LMP)
          </li>
          <li>
            <strong>Duration:</strong> Approximately 280 days (40 weeks)
          </li>
          <li>
            <strong>Medical use:</strong> Standard for all pregnancy dating and
            milestones
          </li>
          <li>
            <strong>Includes:</strong> 2 weeks before actual conception occurs
          </li>
        </ul>
        <p className="mb-2">
          <strong>Fetal age (conceptional age):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculation:</strong> From actual conception/fertilization
            date
          </li>
          <li>
            <strong>Duration:</strong> Approximately 266 days (38 weeks)
          </li>
          <li>
            <strong>Scientific use:</strong> More accurate for embryological
            development
          </li>
          <li>
            <strong>Relationship:</strong> Gestational age = Fetal age + 2 weeks
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>At 12 weeks gestational age, the fetus is 10 weeks old</li>
          <li>Medical appointments and milestones use gestational age</li>
          <li>Fetal development charts may reference either measurement</li>
        </ul>
      </>
    ),
  },
  {
    id: "ultrasound-dating-accuracy",
    question: "When is ultrasound dating most accurate and why?",
    answer: (
      <>
        <p className="mb-2">
          Ultrasound dating accuracy varies significantly by timing, with early
          pregnancy ultrasounds providing the most precise due date estimates.
        </p>
        <p className="mb-2">
          <strong>Accuracy by trimester:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>First trimester (6-13 weeks):</strong> ±3-5 days accuracy
          </li>
          <li>
            <strong>Second trimester (14-27 weeks):</strong> ±1-2 weeks accuracy
          </li>
          <li>
            <strong>Third trimester (28+ weeks):</strong> ±2-3 weeks accuracy
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why early ultrasounds are most accurate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Consistent growth:</strong> Early fetal development follows
            predictable patterns
          </li>
          <li>
            <strong>Crown-rump length:</strong> Reliable measurement for dating
            between 6-13 weeks
          </li>
          <li>
            <strong>Minimal variation:</strong> Genetic factors haven't
            significantly influenced size yet
          </li>
          <li>
            <strong>No growth restriction:</strong> Maternal factors haven't
            affected fetal growth
          </li>
        </ul>
        <p className="mb-2">
          <strong>When ultrasound dating is preferred over LMP:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Irregular menstrual cycles</li>
          <li>Uncertain LMP date</li>
          <li>Discrepancy >7 days between LMP and ultrasound dating</li>
          <li>Conception occurred while breastfeeding or on birth control</li>
        </ul>
      </>
    ),
  },
  {
    id: "pregnancy-term-definitions",
    question: "What do 'full-term,' 'preterm,' and 'post-term' pregnancies mean?",
    answer: (
      <>
        <p className="mb-2">
          Medical professionals use specific gestational age ranges to classify
          pregnancy terms, which help guide care decisions and understand risks.
        </p>
        <p className="mb-2">
          <strong>Current pregnancy term classifications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Preterm:</strong> Born before 37 weeks gestation
          </li>
          <li>
            <strong>Early term:</strong> 37 weeks 0 days to 38 weeks 6 days
          </li>
          <li>
            <strong>Full term:</strong> 39 weeks 0 days to 40 weeks 6 days
          </li>
          <li>
            <strong>Late term:</strong> 41 weeks 0 days to 41 weeks 6 days
          </li>
          <li>
            <strong>Post-term:</strong> 42 weeks 0 days and beyond
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why these distinctions matter:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Organ maturity:</strong> Lungs, brain, and liver continue
            developing through 39 weeks
          </li>
          <li>
            <strong>Risk assessment:</strong> Each category has different
            associated risks
          </li>
          <li>
            <strong>Treatment decisions:</strong> Helps guide medical
            interventions
          </li>
          <li>
            <strong>Delivery planning:</strong> Optimal timing for elective
            procedures
          </li>
        </ul>
        <p className="mb-2">
          <strong>Preterm subcategories:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Extremely preterm:</strong> Less than 28 weeks
          </li>
          <li>
            <strong>Very preterm:</strong> 28-32 weeks
          </li>
          <li>
            <strong>Moderate to late preterm:</strong> 32-37 weeks
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ivf-due-date-calculation",
    question: "How is IVF due date calculation different and more precise?",
    answer: (
      <>
        <p className="mb-2">
          IVF pregnancies allow for more precise due date calculations because
          exact fertilization and transfer dates are known, eliminating
          guesswork about conception timing.
        </p>
        <p className="mb-2">
          <strong>IVF calculation advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Known fertilization date:</strong> Exact conception timing
            is documented
          </li>
          <li>
            <strong>Embryo age tracking:</strong> Development stage at transfer
            is precise
          </li>
          <li>
            <strong>No cycle variation:</strong> Eliminates irregular cycle
            uncertainty
          </li>
          <li>
            <strong>Consistent methodology:</strong> Standardized across IVF
            clinics
          </li>
        </ul>
        <p className="mb-2">
          <strong>Calculation formulas by embryo age at transfer:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Day 3 embryo transfer:</strong> Transfer date + 266 days =
            due date (or transfer date - 17 days = LMP)
          </li>
          <li>
            <strong>Day 5 embryo transfer (blastocyst):</strong> Transfer date +
            264 days = due date (or transfer date - 19 days = LMP)
          </li>
          <li>
            <strong>Day 6 embryo transfer:</strong> Transfer date + 263 days =
            due date (or transfer date - 20 days = LMP)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why the calculations differ:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Day 3 embryos have been developing for 3 days since fertilization
          </li>
          <li>
            Day 5 blastocysts have been developing for 5 days since
            fertilization
          </li>
          <li>Each day of development corresponds to gestational age timing</li>
        </ul>
        <p className="text-sm">
          <strong>Clinical advantage:</strong> IVF due dates are typically
          accurate within 1-2 days, making them more reliable than LMP-based
          calculations.
        </p>
      </>
    ),
  },
  {
    id: "irregular-cycles-due-date",
    question: "How do irregular cycles affect due date calculation accuracy?",
    answer: (
      <>
        <p className="mb-2">
          Irregular menstrual cycles significantly impact the accuracy of
          LMP-based due date calculations, often requiring alternative dating
          methods for reliable estimates.
        </p>
        <p className="mb-2">
          <strong>Why irregular cycles affect accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Variable ovulation:</strong> Ovulation may not occur on day
            14 of cycle
          </li>
          <li>
            <strong>Unpredictable cycle length:</strong> Makes conception timing
            uncertain
          </li>
          <li>
            <strong>Hormonal fluctuations:</strong> Can affect implantation
            timing
          </li>
          <li>
            <strong>Standard formula limitations:</strong> 280-day calculation
            assumes regular 28-day cycles
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common causes of irregular cycles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>PCOS:</strong> Polycystic ovary syndrome affects ovulation
            regularity
          </li>
          <li>
            <strong>Thyroid disorders:</strong> Can disrupt menstrual cycle
            patterns
          </li>
          <li>
            <strong>Stress:</strong> Physical or emotional stress affects
            hormones
          </li>
          <li>
            <strong>Weight changes:</strong> Significant weight gain/loss
            impacts cycles
          </li>
          <li>
            <strong>Recent birth control:</strong> Hormonal contraceptives can
            affect cycle regularity
          </li>
        </ul>
        <p className="mb-2">
          <strong>Alternative dating methods for irregular cycles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Early ultrasound:</strong> Most reliable method,
            preferably 6-13 weeks
          </li>
          <li>
            <strong>Conception date:</strong> If known from fertility tracking
          </li>
          <li>
            <strong>Serial ultrasounds:</strong> Multiple measurements to
            confirm dating
          </li>
          <li>
            <strong>Clinical assessment:</strong> Healthcare provider evaluation
            of multiple factors
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pregnancy-trimesters-timeline",
    question: "When do the trimesters begin and end, and what happens in each?",
    answer: (
      <>
        <p className="mb-2">
          Pregnancy is divided into three trimesters, each with distinct
          developmental milestones and maternal changes that guide medical care
          and monitoring.
        </p>
        <p className="mb-2">
          <strong>First trimester (Weeks 1-13):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fetal development:</strong> Organ formation, heartbeat
            begins, limb development
          </li>
          <li>
            <strong>Maternal changes:</strong> Morning sickness, breast
            tenderness, fatigue
          </li>
          <li>
            <strong>Key milestones:</strong> First prenatal visit, genetic
            screening options
          </li>
          <li>
            <strong>Miscarriage risk:</strong> Highest risk period (80% of
            losses occur in first trimester)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Second trimester (Weeks 14-27):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fetal development:</strong> Rapid growth, movement felt,
            viability threshold at 24 weeks
          </li>
          <li>
            <strong>Maternal changes:</strong> Energy returns, baby bump shows,
            movement felt
          </li>
          <li>
            <strong>Key milestones:</strong> Anatomy scan (18-22 weeks), gender
            determination
          </li>
          <li>
            <strong>Often called:</strong> "Golden period" due to reduced
            symptoms
          </li>
        </ul>
        <p className="mb-2">
          <strong>Third trimester (Weeks 28-40+):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Fetal development:</strong> Lung maturation, brain
            development, weight gain
          </li>
          <li>
            <strong>Maternal changes:</strong> Back pain, Braxton Hicks
            contractions, frequent urination
          </li>
          <li>
            <strong>Key milestones:</strong> Growth scans, Group B strep
            testing, birth preparation
          </li>
          <li>
            <strong>Preparation phase:</strong> Labor signs, birth plan,
            hospital bag packing
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "viability-24-weeks-significance",
    question: "What is the significance of viability at 24 weeks?",
    answer: (
      <>
        <p className="mb-2">
          24 weeks gestational age represents a crucial milestone known as the
          "threshold of viability," marking when survival outside the womb
          becomes possible with intensive medical support.
        </p>
        <p className="mb-2">
          <strong>Survival statistics by gestational age:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>22 weeks:</strong> 10-15% survival rate with severe
            complications likely
          </li>
          <li>
            <strong>23 weeks:</strong> 20-35% survival rate with intensive care
          </li>
          <li>
            <strong>24 weeks:</strong> 50-70% survival rate (viability
            threshold)
          </li>
          <li>
            <strong>25 weeks:</strong> 70-80% survival rate with good outcomes
            improving
          </li>
          <li>
            <strong>28 weeks:</strong> 90%+ survival rate with significantly
            better outcomes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Critical developments by 24 weeks:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Lung development:</strong> Alveoli begin forming, surfactant
            production starts
          </li>
          <li>
            <strong>Brain maturation:</strong> Key neural pathways develop
          </li>
          <li>
            <strong>Weight milestone:</strong> Typically 500-600 grams (1.1-1.3
            lbs)
          </li>
          <li>
            <strong>Organ function:</strong> Kidneys, liver begin functioning
          </li>
        </ul>
        <p className="mb-2">
          <strong>Medical implications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Treatment decisions:</strong> Intensive interventions
            considered appropriate
          </li>
          <li>
            <strong>Steroid therapy:</strong> Administered to accelerate lung
            development if preterm labor threatens
          </li>
          <li>
            <strong>NICU care:</strong> Specialized premature infant care
            protocols activated
          </li>
          <li>
            <strong>Long-term outcomes:</strong> Higher survival rates with
            fewer severe disabilities
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "multiple-dating-methods",
    question: "Which due date calculation method should I trust if they differ?",
    answer: (
      <>
        <p className="mb-2">
          When different calculation methods provide varying due dates, medical
          guidelines help determine which estimate to trust based on accuracy
          and timing of assessments.
        </p>
        <p className="mb-2">
          <strong>Method reliability hierarchy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>1st priority: IVF transfer date</strong> - Most accurate
            (±1-2 days)
          </li>
          <li>
            <strong>2nd priority: Early ultrasound (6-13 weeks)</strong> -
            Highly accurate (±3-5 days)
          </li>
          <li>
            <strong>3rd priority: Known conception date</strong> - Very accurate
            if timing certain
          </li>
          <li>
            <strong>4th priority: LMP with regular cycles</strong> - Moderately
            accurate (±1 week)
          </li>
          <li>
            <strong>5th priority: Later ultrasounds</strong> - Less accurate
            (±1-3 weeks)
          </li>
        </ul>
        <p className="mb-2">
          <strong>When to change due date (medical guidelines):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Early ultrasound difference:</strong> ≥7 days from LMP
            calculation
          </li>
          <li>
            <strong>Second trimester ultrasound:</strong> ≥10-14 days from
            established date
          </li>
          <li>
            <strong>Third trimester ultrasound:</strong> ≥21 days from
            established date
          </li>
          <li>
            <strong>Irregular cycles:</strong> Early ultrasound preferred over
            LMP
          </li>
        </ul>
        <p className="mb-2">
          <strong>Clinical decision factors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Consistency with fetal growth patterns
          </li>
          <li>
            Maternal cycle history and regularity
          </li>
          <li>
            Quality and timing of ultrasound measurements
          </li>
          <li>
            Other clinical indicators and symptoms
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "due-date-labor-signs",
    question: "What are the signs that labor is approaching my due date?",
    answer: (
      <>
        <p className="mb-2">
          As you approach your due date, your body provides various signs that
          labor may be starting soon, though timing can still vary significantly.
        </p>
        <p className="mb-2">
          <strong>Early labor signs (may occur days to weeks before):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Lightening:</strong> Baby "drops" lower into pelvis,
            breathing easier
          </li>
          <li>
            <strong>Increased Braxton Hicks:</strong> More frequent "practice"
            contractions
          </li>
          <li>
            <strong>Cervical changes:</strong> Softening, thinning (effacement),
            early dilation
          </li>
          <li>
            <strong>Mucus plug loss:</strong> Thick, sometimes bloody discharge
          </li>
          <li>
            <strong>Nesting instinct:</strong> Sudden energy burst to organize
            and clean
          </li>
        </ul>
        <p className="mb-2">
          <strong>Active labor signs (labor beginning):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Regular contractions:</strong> Consistent pattern,
            increasing intensity
          </li>
          <li>
            <strong>Water breaking:</strong> Rupture of membranes (occurs in
            ~15% before contractions)
          </li>
          <li>
            <strong>Bloody show:</strong> Increased bloody mucus discharge
          </li>
          <li>
            <strong>Back pain:</strong> Persistent, rhythmic lower back pain
          </li>
        </ul>
        <p className="mb-2">
          <strong>When to contact your healthcare provider:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Contractions 5 minutes apart for 1 hour (first baby)
          </li>
          <li>
            Contractions 10 minutes apart (subsequent babies)
          </li>
          <li>
            Water breaks (clear, yellow, green, or bloody fluid)
          </li>
          <li>
            Decreased fetal movement or other concerning symptoms
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
      This calculator provides estimates for educational purposes only. Only
      about 4% of babies are born on their exact due date, with most deliveries
      occurring within 2 weeks before or after the estimated date. Always
      consult with your healthcare provider for personalized medical advice,
      accurate pregnancy dating, and monitoring. Your doctor may adjust your due
      date based on ultrasound measurements, clinical factors, and individual
      circumstances.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Due Date Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="due-date-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/conception", label: "Conception Calculator" },
        { href: "/pregnancy", label: "Pregnancy Calculator" },
        { href: "/age", label: "Age Calculator" },
        { href: "/date", label: "Date Calculator" },
      ]}
    />
  );
} 