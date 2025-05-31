"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-gpa-how-calculated",
    question: "What is GPA and how is it calculated?",
    answer: (
      <>
        <p className="mb-2">
          Grade Point Average (GPA) is a standardized indicator of academic
          achievement that averages all course grades, weighted by credit hours.
          It provides a comprehensive measure of student performance across
          multiple courses.
        </p>
        <p className="mb-2">
          <strong>GPA calculation formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>GPA = Total Grade Points ÷ Total Credit Hours</li>
          <li>
            Grade Points = Grade Point Value × Credit Hours for each course
          </li>
          <li>All courses are weighted by their credit hour value</li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Math (4 credits): A+ (4.3) = 4 × 4.3 = 17.2 grade points</li>
          <li>Physics (2 credits): B (3.0) = 2 × 3.0 = 6.0 grade points</li>
          <li>English (3 credits): A (4.0) = 3 × 4.0 = 12.0 grade points</li>
          <li>Total: 35.2 grade points ÷ 9 credit hours = 3.91 GPA</li>
        </ul>
        <p className="text-sm">
          <strong>Why it matters:</strong> GPA determines academic standing,
          scholarship eligibility, graduation honors, and graduate school
          admission.
        </p>
      </>
    ),
  },
  {
    id: "letter-grades-numerical-equivalents",
    question: "How do letter grades convert to numerical GPA points?",
    answer: (
      <>
        <p className="mb-2">
          Most U.S. institutions use a 4.0 scale with standardized letter grade
          conversions, though some schools don't include plus/minus grades or
          use different scales.
        </p>
        <p className="mb-2">
          <strong>Standard 4.0 GPA scale:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>A+ = 4.3</strong> (sometimes capped at 4.0)
          </li>
          <li>
            <strong>A = 4.0</strong> (Excellent performance)
          </li>
          <li>
            <strong>A- = 3.7</strong>
          </li>
          <li>
            <strong>B+ = 3.3</strong>
          </li>
          <li>
            <strong>B = 3.0</strong> (Good performance)
          </li>
          <li>
            <strong>B- = 2.7</strong>
          </li>
          <li>
            <strong>C+ = 2.3</strong>
          </li>
          <li>
            <strong>C = 2.0</strong> (Satisfactory performance)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Lower grades and special cases:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7</strong>
          </li>
          <li>
            <strong>F = 0.0</strong> (Failing grade)
          </li>
          <li>
            <strong>P (Pass), I (Incomplete), W (Withdrawal):</strong> Not
            counted in GPA
          </li>
        </ul>
        <p className="text-sm">
          <strong>Institution variations:</strong> Always check your school's
          specific grading policy as scales can differ between institutions.
        </p>
      </>
    ),
  },
  {
    id: "academic-honors-classification",
    question: "What are the different GPA classifications and academic honors?",
    answer: (
      <>
        <p className="mb-2">
          GPA classifications determine academic standing, graduation honors,
          and eligibility for various programs. Higher GPAs unlock prestigious
          recognition and opportunities.
        </p>
        <p className="mb-2">
          <strong>Graduation honors (Latin honors):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Summa Cum Laude:</strong> 3.9-4.3 GPA (highest honor, top
            1-5% of class)
          </li>
          <li>
            <strong>Magna Cum Laude:</strong> 3.7-3.89 GPA (great honor, top
            5-10% of class)
          </li>
          <li>
            <strong>Cum Laude:</strong> 3.5-3.69 GPA (with honor, top 10-25% of
            class)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Academic standing classifications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Dean's List/Good Standing:</strong> 3.0-3.49 GPA
          </li>
          <li>
            <strong>Satisfactory Standing:</strong> 2.0-2.99 GPA
          </li>
          <li>
            <strong>Academic Probation:</strong> Below 2.0 GPA (requires
            improvement plan)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Benefits of high GPA:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Scholarship eligibility (many require 3.0+ minimum)</li>
          <li>Graduate school admission (competitive programs prefer 3.5+)</li>
          <li>Honor society membership and leadership opportunities</li>
          <li>Enhanced job prospects and internship opportunities</li>
        </ul>
      </>
    ),
  },
  {
    id: "weighted-vs-unweighted-gpa",
    question: "What's the difference between weighted and unweighted GPA?",
    answer: (
      <>
        <p className="mb-2">
          Weighted and unweighted GPAs account for course difficulty
          differently, with weighted systems giving extra credit for advanced
          coursework like AP, IB, or honors classes.
        </p>
        <p className="mb-2">
          <strong>Unweighted GPA (4.0 scale):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>All courses treated equally regardless of difficulty</li>
          <li>A = 4.0 in both regular and AP classes</li>
          <li>Maximum possible GPA is 4.0 (or 4.3 with A+)</li>
          <li>Most commonly used for college admissions</li>
        </ul>
        <p className="mb-2">
          <strong>Weighted GPA (often 5.0 scale):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>AP/IB courses:</strong> A = 5.0, B = 4.0, C = 3.0
          </li>
          <li>
            <strong>Honors courses:</strong> A = 4.5, B = 3.5, C = 2.5
          </li>
          <li>
            <strong>Regular courses:</strong> A = 4.0, B = 3.0, C = 2.0
          </li>
          <li>Maximum GPA can exceed 4.0 (typically 4.5-5.0)</li>
        </ul>
        <p className="mb-2">
          <strong>Example comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Student with all A's in regular classes:</strong> 4.0
            unweighted, 4.0 weighted
          </li>
          <li>
            <strong>Student with all A's in AP classes:</strong> 4.0 unweighted,
            5.0 weighted
          </li>
          <li>Weighted GPA rewards students for taking challenging courses</li>
        </ul>
      </>
    ),
  },
  {
    id: "strategies-raising-gpa",
    question: "What are effective strategies for raising my GPA?",
    answer: (
      <>
        <p className="mb-2">
          Raising GPA requires consistent effort, strategic planning, and
          developing effective study habits. Success depends on individual
          learning style and commitment to improvement.
        </p>
        <p className="mb-2">
          <strong>Class attendance and engagement:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Attend every class:</strong> You're paying for education,
            and attendance directly correlates with performance
          </li>
          <li>
            <strong>Active participation:</strong> Ask questions, engage in
            discussions, take detailed notes
          </li>
          <li>
            <strong>Sit in front:</strong> Minimize distractions and show
            engagement to professors
          </li>
          <li>
            <strong>Office hours:</strong> Build relationships with professors
            and get personalized help
          </li>
        </ul>
        <p className="mb-2">
          <strong>Study strategies that work:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Consistent schedule:</strong> Study regularly rather than
            cramming before exams
          </li>
          <li>
            <strong>Active learning:</strong> Use flashcards, practice problems,
            teach concepts to others
          </li>
          <li>
            <strong>Study groups:</strong> Collaborate with classmates for
            different perspectives and motivation
          </li>
          <li>
            <strong>Campus resources:</strong> Utilize tutoring centers, writing
            labs, and academic support services
          </li>
        </ul>
        <p className="mb-2">
          <strong>Time management and organization:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Plan assignments well ahead of deadlines</li>
          <li>Organize notes and materials for easy access</li>
          <li>Balance coursework with adequate rest and social activities</li>
          <li>Prioritize high-credit courses for maximum GPA impact</li>
        </ul>
      </>
    ),
  },
  {
    id: "gpa-semester-vs-cumulative",
    question: "What's the difference between semester GPA and cumulative GPA?",
    answer: (
      <>
        <p className="mb-2">
          Semester and cumulative GPAs serve different purposes in tracking
          academic progress, with cumulative GPA being the primary measure for
          graduation and external evaluations.
        </p>
        <p className="mb-2">
          <strong>Semester GPA:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Scope:</strong> Only includes courses from current
            term/semester
          </li>
          <li>
            <strong>Purpose:</strong> Tracks immediate academic performance and
            improvement
          </li>
          <li>
            <strong>Impact:</strong> Used for Dean's List, academic probation
            decisions
          </li>
          <li>
            <strong>Flexibility:</strong> Can vary significantly term to term
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cumulative GPA:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Scope:</strong> Includes all completed coursework throughout
            academic career
          </li>
          <li>
            <strong>Purpose:</strong> Overall measure of academic achievement
          </li>
          <li>
            <strong>Used for:</strong> Graduation honors, scholarship
            eligibility, graduate school applications
          </li>
          <li>
            <strong>Stability:</strong> Changes more gradually as more credits
            are completed
          </li>
        </ul>
        <p className="mb-2">
          <strong>GPA recovery timeline:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Early career:</strong> Poor grades easier to overcome with
            fewer total credits
          </li>
          <li>
            <strong>Later years:</strong> More credits required to significantly
            impact cumulative GPA
          </li>
          <li>
            <strong>Strategic planning:</strong> Focus on high-credit courses
            for maximum improvement
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "international-grading-systems",
    question:
      "How do international grading systems compare to the U.S. 4.0 scale?",
    answer: (
      <>
        <p className="mb-2">
          International grading systems vary significantly worldwide, requiring
          conversion tables for accurate comparison to the U.S. 4.0 GPA scale
          for study abroad and international admissions.
        </p>
        <p className="mb-2">
          <strong>Common international systems:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>European (10-point scale):</strong> 10 = A+, 9 = A, 8 = B+,
            7 = B, 6 = C+, 5 = C (passing)
          </li>
          <li>
            <strong>UK (First/Upper Second/Lower Second/Third):</strong> First
            Class = A, Upper Second = B+, Lower Second = B-
          </li>
          <li>
            <strong>German (1.0-4.0, lower is better):</strong> 1.0-1.5 = A,
            1.6-2.5 = B, 2.6-3.5 = C, 3.6-4.0 = D
          </li>
          <li>
            <strong>Canadian:</strong> Similar to U.S. but some use percentage
            grades (90-100% = A)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Percentage to GPA conversion:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>97-100% = 4.3 (A+), 93-96% = 4.0 (A), 90-92% = 3.7 (A-)</li>
          <li>87-89% = 3.3 (B+), 83-86% = 3.0 (B), 80-82% = 2.7 (B-)</li>
          <li>77-79% = 2.3 (C+), 73-76% = 2.0 (C), 70-72% = 1.7 (C-)</li>
        </ul>
        <p className="mb-2">
          <strong>Considerations for international students:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Official credential evaluation services provide accurate conversions
          </li>
          <li>
            Different countries have varying grade distribution expectations
          </li>
          <li>Some systems don't use plus/minus distinctions</li>
          <li>Cultural differences in grading strictness affect comparisons</li>
        </ul>
      </>
    ),
  },
  {
    id: "gpa-calculator-planning-features",
    question: "How can I use GPA calculators for academic planning?",
    answer: (
      <>
        <p className="mb-2">
          GPA calculators serve as powerful planning tools for academic
          goal-setting, course selection, and graduation requirements, helping
          students make informed decisions about their academic path.
        </p>
        <p className="mb-2">
          <strong>Essential calculator features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Current GPA tracking:</strong> Input all completed courses
            with grades and credits
          </li>
          <li>
            <strong>Goal planning:</strong> Calculate required grades for target
            cumulative GPA
          </li>
          <li>
            <strong>Semester planning:</strong> Test different grade scenarios
            for upcoming courses
          </li>
          <li>
            <strong>Credit hour weighting:</strong> Understand impact of
            high-credit courses
          </li>
        </ul>
        <p className="mb-2">
          <strong>Strategic planning applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Course selection:</strong> Choose high-credit courses when
            confident in performance
          </li>
          <li>
            <strong>Workload balancing:</strong> Mix challenging and manageable
            courses each semester
          </li>
          <li>
            <strong>Recovery planning:</strong> Calculate credits needed to
            reach graduation honors
          </li>
          <li>
            <strong>Risk assessment:</strong> Understand GPA impact of
            potentially difficult courses
          </li>
        </ul>
        <p className="mb-2">
          <strong>Goal-setting examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Scholarship maintenance:</strong> Plan to maintain 3.0+ GPA
            requirement
          </li>
          <li>
            <strong>Graduate school prep:</strong> Target 3.5+ GPA for
            competitive programs
          </li>
          <li>
            <strong>Graduation honors:</strong> Calculate path to 3.7+ for magna
            cum laude
          </li>
          <li>
            <strong>Academic probation recovery:</strong> Plan to achieve 2.0+
            GPA
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "credit-hours-gpa-impact",
    question:
      "How do credit hours affect GPA calculations and academic planning?",
    answer: (
      <>
        <p className="mb-2">
          Credit hours determine the weight each course carries in GPA
          calculations, making high-credit courses significantly more impactful
          on overall academic standing than low-credit courses.
        </p>
        <p className="mb-2">
          <strong>Credit hour impact on GPA:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High-credit courses (4-5 credits):</strong> Major impact on
            cumulative GPA
          </li>
          <li>
            <strong>Standard courses (3 credits):</strong> Moderate but
            significant impact
          </li>
          <li>
            <strong>Low-credit courses (1-2 credits):</strong> Minimal
            individual impact on GPA
          </li>
          <li>
            <strong>Laboratory sections (1 credit):</strong> Often separate
            grades that still count
          </li>
        </ul>
        <p className="mb-2">
          <strong>Strategic credit hour planning:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Prioritize high-credit courses:</strong> Focus extra effort
            on 4-5 credit major courses
          </li>
          <li>
            <strong>Balance course load:</strong> Mix high and low credit
            courses for manageable semesters
          </li>
          <li>
            <strong>Recovery strategy:</strong> Take additional high-credit
            courses to improve GPA faster
          </li>
          <li>
            <strong>Risk management:</strong> Be cautious with challenging
            high-credit courses
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example impact calculation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Current: 60 credits with 3.0 GPA = 180 total grade points</li>
          <li>
            Adding 4-credit A (4.0): 196 grade points ÷ 64 credits = 3.06 GPA
          </li>
          <li>
            Adding 1-credit A (4.0): 184 grade points ÷ 61 credits = 3.02 GPA
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> Higher-credit courses offer both greater
          opportunity for improvement and higher risk for GPA damage.
        </p>
      </>
    ),
  },
  {
    id: "common-gpa-mistakes-avoid",
    question:
      "What are common mistakes students make with GPA calculations and planning?",
    answer: (
      <>
        <p className="mb-2">
          Students often make calculation errors, misunderstand grading
          policies, or fail to consider strategic course planning, leading to
          missed opportunities and academic setbacks.
        </p>
        <p className="mb-2">
          <strong>Calculation and tracking errors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Ignoring credit hours:</strong> Not weighting courses by
            credit value in calculations
          </li>
          <li>
            <strong>Including non-credit courses:</strong> Adding pass/fail or
            audit courses to GPA
          </li>
          <li>
            <strong>Transfer credit confusion:</strong> Misunderstanding which
            courses count toward GPA
          </li>
          <li>
            <strong>Repeated course policies:</strong> Not knowing if retakes
            replace or average with original grades
          </li>
        </ul>
        <p className="mb-2">
          <strong>Planning and strategic mistakes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Overloading difficult courses:</strong> Taking too many
            challenging classes in one semester
          </li>
          <li>
            <strong>Neglecting high-credit courses:</strong> Not prioritizing
            effort on courses with biggest GPA impact
          </li>
          <li>
            <strong>Procrastinating improvement:</strong> Waiting until late in
            college career to address low GPA
          </li>
          <li>
            <strong>Unrealistic goals:</strong> Setting unattainable GPA targets
            given remaining credits
          </li>
        </ul>
        <p className="mb-2">
          <strong>Policy misunderstandings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Graduation requirements:</strong> Confusing minimum GPA for
            degree vs. honors
          </li>
          <li>
            <strong>Major vs. cumulative GPA:</strong> Different requirements
            for major courses vs. overall
          </li>
          <li>
            <strong>Scholarship maintenance:</strong> Not understanding specific
            GPA requirements and review periods
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Regularly review academic transcripts,
          understand institutional policies, and use GPA calculators for
          informed planning throughout college career.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      GPA calculations are based on standard 4.0 scale formulas and common
      institutional practices. Individual schools may use different grading
      scales, credit systems, or calculation methods. Always refer to your
      specific institution's academic policies and registrar's office for
      official GPA calculations and graduation requirements.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About GPA Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="gpa-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/grade", label: "Grade Calculator" },
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/concrete", label: "Concrete Calculator" },
      ]}
    />
  );
}
