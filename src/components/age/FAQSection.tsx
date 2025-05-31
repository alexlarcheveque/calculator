"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "age-calculation-methods",
    question: "How is age calculated and what methods are most accurate?",
    answer: (
      <>
        <p className="mb-2">
          Age calculation follows the standard Western system where age
          increases only on your birthday, with precise time calculations
          accounting for leap years and calendar variations.
        </p>
        <p className="mb-2">
          <strong>Standard age calculation principles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Birthday rule:</strong> Age increases by one year only on
            your birth date
          </li>
          <li>
            <strong>Partial years:</strong> Time before next birthday doesn't
            count toward main age
          </li>
          <li>
            <strong>Leap year accuracy:</strong> February 29th births handled
            correctly
          </li>
          <li>
            <strong>Precise timing:</strong> Calculations down to seconds for
            exact age
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation (born March 15, 2000):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>On March 14, 2024: 23 years, 11 months, 30 days old</li>
          <li>On March 15, 2024: 24 years, 0 months, 0 days old</li>
          <li>
            Precise breakdown includes weeks, days, hours, minutes, seconds
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cultural-age-systems-differences",
    question: "How do different cultures calculate age differently?",
    answer: (
      <>
        <p className="mb-2">
          Age calculation varies significantly across cultures, with different
          starting points and anniversary systems affecting when age increases.
        </p>
        <p className="mb-2">
          <strong>Major cultural age systems:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Western system:</strong> Born at age 0, increases on
            birthday (most common)
          </li>
          <li>
            <strong>Traditional Chinese:</strong> Born at age 1, increases on
            Chinese New Year
          </li>
          <li>
            <strong>Korean system:</strong> Born at age 1, increases on January
            1st for everyone
          </li>
          <li>
            <strong>Ordinal counting:</strong> "In my 25th year" when 24 years
            old
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical example (baby born December 31, 2023):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Western age on January 1, 2024: 1 day old (0 years)</li>
          <li>Korean age on January 1, 2024: 2 years old</li>
          <li>Chinese age varies by lunar calendar timing</li>
          <li>
            These differences can create 1-2 year age gaps between systems
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "month-day-calculation-complexity",
    question: "Why are month and day calculations sometimes confusing?",
    answer: (
      <>
        <p className="mb-2">
          Month calculations become complex due to uneven month lengths (28-31
          days), creating ambiguity when crossing month boundaries, especially
          with end-of-month dates.
        </p>
        <p className="mb-2">
          <strong>Common calculation challenges:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Month-end dates:</strong> January 31st to February 28th = 28
            days or 1 month?
          </li>
          <li>
            <strong>February complications:</strong> Leap years affect February
            calculations
          </li>
          <li>
            <strong>Variable month lengths:</strong> 30 vs 31-day months create
            inconsistencies
          </li>
          <li>
            <strong>Cross-year calculations:</strong> December to January
            boundary handling
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example: February 28, 2022 to March 31, 2022:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Method 1: Feb 28 → Mar 28 (1 month) + Mar 28 → Mar 31 (3 days) = 1
            month, 3 days
          </li>
          <li>Method 2: Both are month-end dates = exactly 1 month</li>
          <li>Our calculator uses Method 1 for precision and consistency</li>
          <li>Leap year awareness prevents calculation errors</li>
        </ul>
      </>
    ),
  },
  {
    id: "life-statistics-calculations",
    question:
      "How are heartbeats, breaths, and other life statistics calculated?",
    answer: (
      <>
        <p className="mb-2">
          Life statistics use medically accepted averages for healthy adults,
          though individual rates vary significantly based on age, fitness
          level, health conditions, and activity.
        </p>
        <p className="mb-2">
          <strong>Standard calculation rates (per minute):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Heartbeats:</strong> 70 beats/min (60-100 normal range)
          </li>
          <li>
            <strong>Breathing:</strong> 15 breaths/min (12-20 normal range)
          </li>
          <li>
            <strong>Blinking:</strong> 12 blinks/min (~17,000 daily)
          </li>
          <li>
            <strong>Sleep:</strong> 8 hours daily (33% of life average)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Lifetime totals example (75-year lifespan):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Heartbeats:</strong> ~2.7 billion beats total
          </li>
          <li>
            <strong>Breaths:</strong> ~591 million breaths
          </li>
          <li>
            <strong>Sleep time:</strong> ~25 years sleeping
          </li>
          <li>
            <strong>Blood pumped:</strong> ~54.75 million gallons
          </li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> These are statistical averages for
          illustration. Individual rates vary significantly based on health,
          fitness, age, and medical conditions.
        </p>
      </>
    ),
  },
  {
    id: "zodiac-birthstone-information",
    question: "What zodiac signs and birthstones correspond to my birth date?",
    answer: (
      <>
        <p className="mb-2">
          Birth dates determine various cultural associations including Western
          zodiac signs, Chinese zodiac animals, birthstones, and birth flowers,
          though these have cultural rather than scientific significance.
        </p>
        <p className="mb-2">
          <strong>
            Western zodiac signs (12 signs based on sun position):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fire signs:</strong> Aries (Mar 21-Apr 19), Leo (Jul 23-Aug
            22), Sagittarius (Nov 22-Dec 21)
          </li>
          <li>
            <strong>Earth signs:</strong> Taurus (Apr 20-May 20), Virgo (Aug
            23-Sep 22), Capricorn (Dec 22-Jan 19)
          </li>
          <li>
            <strong>Air signs:</strong> Gemini (May 21-Jun 20), Libra (Sep
            23-Oct 22), Aquarius (Jan 20-Feb 18)
          </li>
          <li>
            <strong>Water signs:</strong> Cancer (Jun 21-Jul 22), Scorpio (Oct
            23-Nov 21), Pisces (Feb 19-Mar 20)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Chinese zodiac (12-year cycle based on birth year):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster,
            Dog, Pig
          </li>
          <li>Example: 1996, 2008, 2020 are Rat years</li>
          <li>
            Each animal has associated personality traits and compatibility
            patterns
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "leap-year-birthday-handling",
    question: "How are leap year birthdays (February 29th) handled?",
    answer: (
      <>
        <p className="mb-2">
          People born on February 29th during leap years face unique challenges
          since their exact birth date only occurs every four years, requiring
          special handling for age calculations.
        </p>
        <p className="mb-2">
          <strong>Leap year birthday solutions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Legal approach:</strong> Most jurisdictions recognize
            February 28th as the legal birthday
          </li>
          <li>
            <strong>March 1st option:</strong> Some prefer celebrating on March
            1st (day after Feb 28)
          </li>
          <li>
            <strong>Age calculation:</strong> Age increases on Feb 28 in
            non-leap years
          </li>
          <li>
            <strong>Precise timing:</strong> Our calculator tracks exact leap
            day births accurately
          </li>
        </ul>
        <p className="mb-2">
          <strong>Leap year cycle pattern:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard rule:</strong> Every 4 years (2020, 2024, 2028...)
          </li>
          <li>
            <strong>Century exception:</strong> Century years must be divisible
            by 400
          </li>
          <li>
            <strong>Examples:</strong> 2000 was a leap year, 1900 was not, 2100
            will not be
          </li>
        </ul>
        <p className="text-sm">
          <strong>Fun fact:</strong> "Leaplings" (Feb 29 babies) have a 1 in
          1,461 chance of being born on leap day, making them quite rare!
        </p>
      </>
    ),
  },
  {
    id: "age-calculation-precision-tools",
    question: "What level of precision does the age calculator provide?",
    answer: (
      <>
        <p className="mb-2">
          Our age calculator provides multi-level precision from broad year
          calculations down to exact seconds, allowing for precise timing in
          various applications.
        </p>
        <p className="mb-2">
          <strong>Precision levels available:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard age:</strong> Years only (traditional age)
          </li>
          <li>
            <strong>Detailed breakdown:</strong> Years, months, weeks, days
          </li>
          <li>
            <strong>Time precision:</strong> Hours, minutes, seconds
          </li>
          <li>
            <strong>Total conversions:</strong> Age expressed entirely in days,
            hours, minutes, or seconds
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example precision (born Jan 1, 2000 at 12:00 PM):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Basic:</strong> 24 years old
          </li>
          <li>
            <strong>Detailed:</strong> 24 years, 3 months, 2 weeks, 4 days
          </li>
          <li>
            <strong>Precise:</strong> 24 years, 3 months, 2 weeks, 4 days, 8
            hours, 30 minutes, 45 seconds
          </li>
          <li>
            <strong>Total days:</strong> 8,856 days old
          </li>
        </ul>
        <p className="text-sm">
          <strong>Applications:</strong> Useful for legal documentation,
          milestone celebrations, scientific research, and personal curiosity
          about exact life duration.
        </p>
      </>
    ),
  },
  {
    id: "calendar-system-differences",
    question: "How do different calendar systems affect age calculation?",
    answer: (
      <>
        <p className="mb-2">
          Age calculations depend on the calendar system used, with the
          Gregorian calendar being most common worldwide, though other systems
          create different age results.
        </p>
        <p className="mb-2">
          <strong>Major calendar systems:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Gregorian calendar:</strong> 365.25-day year average,
            standard worldwide
          </li>
          <li>
            <strong>Lunar calendar:</strong> 354-day year (Islamic calendar)
          </li>
          <li>
            <strong>Lunisolar calendar:</strong> Chinese calendar with
            intercalary months
          </li>
          <li>
            <strong>Julian calendar:</strong> 365.25-day year, 13 days behind
            Gregorian
          </li>
        </ul>
        <p className="mb-2">
          <strong>
            Age differences by calendar system (10 Gregorian years):
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Gregorian:</strong> 10.0 years
          </li>
          <li>
            <strong>Islamic lunar:</strong> ~10.3 years (faster aging)
          </li>
          <li>
            <strong>Chinese lunisolar:</strong> Varies with intercalary
            adjustments
          </li>
          <li>
            <strong>Julian:</strong> Slightly different due to leap year rules
          </li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> Our calculator uses the Gregorian calendar as
          the global standard, which is used in most legal and official contexts
          worldwide.
        </p>
      </>
    ),
  },
  {
    id: "age-milestones-significance",
    question: "What are important age milestones and their significance?",
    answer: (
      <>
        <p className="mb-2">
          Age milestones carry legal, social, and cultural significance, varying
          by country and culture but marking important transitions in rights,
          responsibilities, and life stages.
        </p>
        <p className="mb-2">
          <strong>Legal milestones (US examples):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>16 years:</strong> Driving permit, working permits in many
            states
          </li>
          <li>
            <strong>18 years:</strong> Voting, military service, legal
            adulthood, contracts
          </li>
          <li>
            <strong>21 years:</strong> Alcohol consumption, full adult legal
            status
          </li>
          <li>
            <strong>65 years:</strong> Medicare eligibility, traditional
            retirement age
          </li>
        </ul>
        <p className="mb-2">
          <strong>Biological milestones:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>25 years:</strong> Brain fully developed (prefrontal cortex)
          </li>
          <li>
            <strong>30s:</strong> Peak physical performance for most athletes
          </li>
          <li>
            <strong>40s-50s:</strong> Hormonal changes, metabolism shifts
          </li>
          <li>
            <strong>Life expectancy:</strong> ~79 years globally, varies by
            region and lifestyle
          </li>
        </ul>
        <p className="text-sm">
          <strong>Cultural variations:</strong> Age of majority ranges from
          15-21 years globally, retirement ages vary from 55-67, and cultural
          celebrations differ significantly.
        </p>
      </>
    ),
  },
  {
    id: "age-calculator-practical-applications",
    question: "What are practical applications for precise age calculations?",
    answer: (
      <>
        <p className="mb-2">
          Precise age calculations serve numerous practical purposes in legal,
          medical, educational, and personal contexts where exact timing matters
          for eligibility or documentation.
        </p>
        <p className="mb-2">
          <strong>Legal and official applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Eligibility verification:</strong> Voting, driving, drinking
            age compliance
          </li>
          <li>
            <strong>Employment:</strong> Child labor laws, retirement planning,
            benefit eligibility
          </li>
          <li>
            <strong>Immigration:</strong> Age-dependent visa categories and
            requirements
          </li>
          <li>
            <strong>Legal proceedings:</strong> Statute of limitations, juvenile
            vs adult court
          </li>
        </ul>
        <p className="mb-2">
          <strong>Medical and health applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pediatric care:</strong> Age-specific developmental
            milestones and treatments
          </li>
          <li>
            <strong>Medication dosing:</strong> Age-based prescription
            calculations
          </li>
          <li>
            <strong>Health screenings:</strong> Age-appropriate testing
            schedules (colonoscopy at 45, mammograms at 40)
          </li>
          <li>
            <strong>Clinical trials:</strong> Precise age requirements for
            research participation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Personal and social uses:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Milestone celebrations (exact 10,000-day birthday)</li>
          <li>Relationship age gaps and compatibility calculations</li>
          <li>Educational planning and grade level determinations</li>
          <li>Sports competition age groups and eligibility</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Age calculations are based on the Gregorian calendar system and standard
      Western age counting methods. Results may vary in different cultural
      contexts or calendar systems. For legal or medical purposes, consult
      appropriate professionals regarding specific age requirements or
      calculations.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Age Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="age-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/date", label: "Date Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/hours", label: "Hours Calculator" },
        { href: "/retirement", label: "Retirement Calculator" },
      ]}
    />
  );
}
