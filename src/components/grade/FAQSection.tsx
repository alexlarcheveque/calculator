"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-are-weighted-grades",
    question: "What are weighted grades and how are they calculated?",
    answer: (
      <>
        <p className="mb-2">
          Weighted grades assign different levels of importance to various
          assignments, allowing more critical assessments to have greater impact
          on your final grade. Each assignment's grade is multiplied by its
          weight percentage.
        </p>
        <p className="mb-2">
          <strong>Weighted grade formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Final Grade = Σ(Assignment Grade × Weight) ÷ Total Weight</li>
          <li>Each assignment contributes proportionally to final grade</li>
          <li>Weights must add up to 100% for standard calculation</li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Homework: 85% grade × 20% weight = 1,700 points</li>
          <li>Midterm: 78% grade × 30% weight = 2,340 points</li>
          <li>Final Exam: 92% grade × 50% weight = 4,600 points</li>
          <li>Total: 8,640 ÷ 100 = 86.4% final grade</li>
        </ul>
        <p className="text-sm">
          <strong>Benefits:</strong> Emphasizes important assessments while
          allowing room for improvement on lower-weight assignments.
        </p>
      </>
    ),
  },
  {
    id: "letter-grade-percentage-conversion",
    question: "How do letter grades convert to percentages and GPA points?",
    answer: (
      <>
        <p className="mb-2">
          Letter grades provide standardized performance indicators with
          corresponding percentage ranges and GPA values. These scales may vary
          between institutions but follow general patterns.
        </p>
        <p className="mb-2">
          <strong>Standard grade scale (4.0 system):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>A+:</strong> 97-100% = 4.3 GPA
          </li>
          <li>
            <strong>A:</strong> 93-96% = 4.0 GPA
          </li>
          <li>
            <strong>A-:</strong> 90-92% = 3.7 GPA
          </li>
          <li>
            <strong>B+:</strong> 87-89% = 3.3 GPA
          </li>
          <li>
            <strong>B:</strong> 83-86% = 3.0 GPA
          </li>
          <li>
            <strong>B-:</strong> 80-82% = 2.7 GPA
          </li>
        </ul>
        <p className="mb-2">
          <strong>Lower grades:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>C+:</strong> 77-79% = 2.3 GPA
          </li>
          <li>
            <strong>C:</strong> 73-76% = 2.0 GPA
          </li>
          <li>
            <strong>C-:</strong> 70-72% = 1.7 GPA
          </li>
          <li>
            <strong>D+:</strong> 67-69% = 1.3 GPA
          </li>
          <li>
            <strong>D:</strong> 63-66% = 1.0 GPA
          </li>
          <li>
            <strong>F:</strong> Below 60% = 0.0 GPA
          </li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> Some institutions use different scales or don't
          award A+ grades. Check your school's specific grading policy.
        </p>
      </>
    ),
  },
  {
    id: "final-grade-needed-calculation",
    question:
      "How can I calculate what grade I need on my final exam to achieve a target grade?",
    answer: (
      <>
        <p className="mb-2">
          To calculate the required final exam grade, use the weighted grade
          formula in reverse, solving for the unknown final exam score based on
          your target overall grade.
        </p>
        <p className="mb-2">
          <strong>Final grade needed formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Required Final = (Target Grade × 100 - Current Weighted Points) ÷
            Final Weight
          </li>
          <li>
            Current Weighted Points = Sum of (completed assignment grade ×
            weight)
          </li>
          <li>Final Weight = percentage weight of final exam</li>
        </ul>
        <p className="mb-2">
          <strong>Example scenario:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Target overall grade: 85% (B)</li>
          <li>
            Current grades: Homework 90% (20% weight), Midterm 80% (30% weight)
          </li>
          <li>Final exam weight: 50%</li>
          <li>Current points: (90×20) + (80×30) = 4,200</li>
          <li>Required final: (85×100 - 4,200) ÷ 50 = 86%</li>
        </ul>
        <p className="text-sm">
          <strong>Strategy tip:</strong> If the required grade exceeds 100%,
          focus on extra credit opportunities or retake policies.
        </p>
      </>
    ),
  },
  {
    id: "grading-system-history",
    question: "What is the history behind modern grading systems?",
    answer: (
      <>
        <p className="mb-2">
          Modern letter grading systems evolved from various ranking methods
          used by early American colleges, transitioning from descriptive terms
          to standardized letter grades.
        </p>
        <p className="mb-2">
          <strong>Historical grading evolution:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>1785 - Yale:</strong> Used Latin terms like "optimi"
            (highest) and "pejores" (worst)
          </li>
          <li>
            <strong>William & Mary:</strong> Simple "No. 1" and "No. 2" ranking
            system
          </li>
          <li>
            <strong>Harvard (early):</strong> Numerical system 1-200 (1-100 for
            math/philosophy)
          </li>
          <li>
            <strong>Harvard (1883):</strong> Class system I-V with V
            representing failure
          </li>
        </ul>
        <p className="mb-2">
          <strong>Modern letter grades established:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>1887 - Mount Holyoke College:</strong> First to use A, B, C,
            D, E letter grades
          </li>
          <li>Much stricter scale: anything below 75% was failing (E grade)</li>
          <li>Gradually adopted by other institutions with modifications</li>
          <li>Modern scales typically set passing around 60-65%</li>
        </ul>
        <p className="text-sm">
          <strong>Global variations:</strong> Different countries use various
          scales like 1-10 numerical systems, pass/fail, or descriptive
          evaluations.
        </p>
      </>
    ),
  },
  {
    id: "point-based-vs-percentage-weights",
    question:
      "What's the difference between point-based and percentage-based weighting?",
    answer: (
      <>
        <p className="mb-2">
          Point-based and percentage-based weighting are two methods for
          calculating weighted grades, each offering different advantages for
          tracking academic performance.
        </p>
        <p className="mb-2">
          <strong>Percentage-based weighting:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Each category assigned a percentage of total grade (e.g., 30% for
            midterm)
          </li>
          <li>All percentages must sum to 100%</li>
          <li>Easy to understand relative importance of assignments</li>
          <li>Common in syllabi and gradebook systems</li>
        </ul>
        <p className="mb-2">
          <strong>Point-based weighting:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Each assignment worth specific point values</li>
          <li>Higher-point assignments automatically weighted more heavily</li>
          <li>Final grade = Total points earned ÷ Total points possible</li>
          <li>Flexible for adding assignments throughout semester</li>
        </ul>
        <p className="mb-2">
          <strong>Example comparison:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Percentage method:</strong> Quiz 85% × 20% + Final 90% × 80%
            = 89%
          </li>
          <li>
            <strong>Point method:</strong> Quiz 85/100 (20 pts) + Final 180/200
            (80 pts) = 265/300 = 88.3%
          </li>
          <li>
            Results may vary slightly due to rounding and calculation
            differences
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "grade-improvement-strategies",
    question: "What are effective strategies for improving grades?",
    answer: (
      <>
        <p className="mb-2">
          Grade improvement requires strategic planning, focusing on high-impact
          assignments, and developing effective study habits and time management
          skills.
        </p>
        <p className="mb-2">
          <strong>High-impact strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Prioritize weighted assignments:</strong> Focus effort on
            exams and projects with higher weight percentages
          </li>
          <li>
            <strong>Start early:</strong> Begin projects and studying well
            before deadlines
          </li>
          <li>
            <strong>Understand rubrics:</strong> Know exactly what instructors
            are looking for
          </li>
          <li>
            <strong>Seek feedback:</strong> Ask for input on drafts and practice
            attempts
          </li>
        </ul>
        <p className="mb-2">
          <strong>Study techniques that work:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Active learning:</strong> Summarize, teach others, create
            practice questions
          </li>
          <li>
            <strong>Spaced repetition:</strong> Review material regularly rather
            than cramming
          </li>
          <li>
            <strong>Study groups:</strong> Collaborate with classmates for
            different perspectives
          </li>
          <li>
            <strong>Office hours:</strong> Meet with instructors for
            clarification and help
          </li>
        </ul>
        <p className="mb-2">
          <strong>Participation and attendance:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Attend all classes and labs - participation often counts toward
            grades
          </li>
          <li>Ask questions during class to demonstrate engagement</li>
          <li>
            Complete all assignments, even low-weight ones for cumulative
            benefit
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "alternative-grading-systems",
    question: "What are alternatives to traditional letter grading systems?",
    answer: (
      <>
        <p className="mb-2">
          Alternative grading systems aim to provide more meaningful feedback
          and reduce grade-focused anxiety while promoting genuine learning and
          improvement.
        </p>
        <p className="mb-2">
          <strong>Narrative evaluation systems:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Anecdotal reports:</strong> Detailed written feedback
            instead of letter grades
          </li>
          <li>
            <strong>Example:</strong> Saint Ann's School (NYC) uses only written
            evaluations
          </li>
          <li>
            <strong>Benefits:</strong> More personalized, specific feedback for
            improvement
          </li>
          <li>
            <strong>Challenges:</strong> Time-intensive for teachers, harder to
            standardize
          </li>
        </ul>
        <p className="mb-2">
          <strong>Standards-based grading:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Grades based on mastery of specific learning objectives</li>
          <li>Allows retakes until standards are met</li>
          <li>Separates academic achievement from behavior/effort</li>
          <li>
            Often uses scales like "Beginning," "Developing," "Proficient,"
            "Advanced"
          </li>
        </ul>
        <p className="mb-2">
          <strong>Pass/Fail and Credit/No Credit:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Reduces grade pressure, encourages exploration</li>
          <li>Common for electives or graduate courses</li>
          <li>May impact GPA calculation differently</li>
        </ul>
        <p className="text-sm">
          <strong>Effectiveness debate:</strong> While alternative systems may
          reduce stress and promote learning, traditional grades remain
          important for college admissions and standardized comparisons.
        </p>
      </>
    ),
  },
  {
    id: "grade-calculator-features",
    question: "What features should I look for in a grade calculator?",
    answer: (
      <>
        <p className="mb-2">
          A comprehensive grade calculator should handle various weighting
          methods, support multiple assignment types, and provide goal-setting
          capabilities for academic planning.
        </p>
        <p className="mb-2">
          <strong>Essential calculator features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Multiple weighting methods:</strong> Support both percentage
            and point-based systems
          </li>
          <li>
            <strong>Dynamic assignment adding:</strong> Ability to add/remove
            assignments easily
          </li>
          <li>
            <strong>Letter grade conversion:</strong> Automatic conversion
            between percentages and letter grades
          </li>
          <li>
            <strong>Target grade calculation:</strong> Determine required scores
            for desired outcomes
          </li>
        </ul>
        <p className="mb-2">
          <strong>Advanced features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Semester planning:</strong> Track multiple courses and
            overall GPA impact
          </li>
          <li>
            <strong>Grade trends:</strong> Visual representation of performance
            over time
          </li>
          <li>
            <strong>What-if scenarios:</strong> Test different grade
            combinations
          </li>
          <li>
            <strong>Category organization:</strong> Group assignments by type
            (homework, exams, projects)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Using calculator results effectively:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Set realistic target grades based on remaining assignments</li>
          <li>Identify which assignments have most impact on final grade</li>
          <li>Plan study time allocation based on weight and difficulty</li>
          <li>
            Track progress regularly rather than waiting until end of semester
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gpa-impact-grade-calculation",
    question: "How do individual course grades affect overall GPA?",
    answer: (
      <>
        <p className="mb-2">
          Individual course grades impact cumulative GPA based on credit hours,
          with higher-credit courses having proportionally greater influence on
          overall academic standing.
        </p>
        <p className="mb-2">
          <strong>GPA calculation basics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> Total Grade Points ÷ Total Credit Hours
          </li>
          <li>
            <strong>Grade Points:</strong> Letter grade value × credit hours for
            each course
          </li>
          <li>
            <strong>Example:</strong> A (4.0) in 3-credit course = 12 grade
            points
          </li>
        </ul>
        <p className="mb-2">
          <strong>Credit hour impact:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>High-credit courses:</strong> 4-5 credit courses
            significantly impact GPA
          </li>
          <li>
            <strong>Low-credit courses:</strong> 1-2 credit courses have minimal
            individual impact
          </li>
          <li>
            <strong>Strategy:</strong> Prioritize performance in higher-credit
            major courses
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cumulative vs. semester GPA:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Semester GPA:</strong> Based only on current term courses
          </li>
          <li>
            <strong>Cumulative GPA:</strong> All completed courses throughout
            academic career
          </li>
          <li>
            <strong>Recovery time:</strong> Poor grades early require more
            effort to overcome later
          </li>
        </ul>
        <p className="text-sm">
          <strong>Long-term planning:</strong> Understand that improving GPA
          becomes progressively harder as you complete more credits, making
          early academic performance crucial.
        </p>
      </>
    ),
  },
  {
    id: "common-grading-mistakes-avoid",
    question: "What are common mistakes students make when calculating grades?",
    answer: (
      <>
        <p className="mb-2">
          Students often make calculation errors when handling weighted grades,
          misunderstanding syllabus policies, or failing to account for dropped
          grades and extra credit opportunities.
        </p>
        <p className="mb-2">
          <strong>Calculation errors to avoid:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weight confusion:</strong> Adding percentages instead of
            using weighted formula
          </li>
          <li>
            <strong>Missing assignments:</strong> Not accounting for zeros in
            grade calculations
          </li>
          <li>
            <strong>Incomplete semesters:</strong> Calculating final grades with
            missing assignments
          </li>
          <li>
            <strong>Decimal errors:</strong> Rounding too early in multi-step
            calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Syllabus misunderstandings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Dropped grades:</strong> Not knowing lowest quiz/homework
            scores are dropped
          </li>
          <li>
            <strong>Extra credit limits:</strong> Assuming extra credit can
            overcome major deficits
          </li>
          <li>
            <strong>Attendance policies:</strong> Overlooking participation
            grade components
          </li>
          <li>
            <strong>Late penalties:</strong> Not factoring in point deductions
            for late submissions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Planning mistakes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unrealistic goals:</strong> Setting target grades that
            require impossible scores
          </li>
          <li>
            <strong>Neglecting low-weight assignments:</strong> Skipping
            assignments that collectively matter
          </li>
          <li>
            <strong>Last-minute calculations:</strong> Waiting until finals week
            to assess standing
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Regular grade tracking throughout the
          semester helps identify problems early when they're still manageable.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Grade calculations are based on standard mathematical formulas and common
      grading scales. Individual institutions may use different grading
      policies, scales, or weighting methods. Always refer to your specific
      course syllabus and institutional policies for accurate grade
      determination. Results are estimates for planning purposes.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Grade Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="grade-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/gpa", label: "GPA Calculator" },
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/concrete", label: "Concrete Calculator" },
      ]}
    />
  );
}
