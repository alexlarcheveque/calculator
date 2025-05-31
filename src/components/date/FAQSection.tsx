"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "date-calculation-fundamentals",
    question: "How do date calculations work and what methods are most accurate?",
    answer: (
      <>
        <p className="mb-2">
          Date calculations involve determining time differences between dates or adding/subtracting 
          time periods, accounting for varying month lengths, leap years, and calendar irregularities.
        </p>
        <p className="mb-2">
          <strong>Core calculation methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Date difference:</strong> Years, months, days breakdown accounting for calendar variations
          </li>
          <li>
            <strong>Total days:</strong> Absolute number of days between dates for precise calculations
          </li>
          <li>
            <strong>Business days:</strong> Excluding weekends and holidays for commercial applications
          </li>
          <li>
            <strong>Date arithmetic:</strong> Adding/subtracting days, weeks, months, years to/from dates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation (January 15, 2023 to March 20, 2024):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Precise difference: 1 year, 2 months, 5 days</li>
          <li>Total days: 430 days</li>
          <li>Business days: ~307 days (excluding weekends and holidays)</li>
          <li>Accounts for February 2024 being a leap year</li>
        </ul>
      </>
    ),
  },
  {
    id: "business-day-calculations-rules",
    question: "How are business days calculated and what days are excluded?",
    answer: (
      <>
        <p className="mb-2">
          Business day calculations exclude non-working days to provide accurate timelines 
          for financial, legal, and commercial applications with industry-specific rules.
        </p>
        <p className="mb-2">
          <strong>Standard exclusions for business days:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weekends:</strong> Saturday and Sunday in most Western countries
          </li>
          <li>
            <strong>Federal holidays:</strong> New Year's Day, Independence Day, Christmas Day, etc.
          </li>
          <li>
            <strong>Bank holidays:</strong> Presidents' Day, Columbus Day, Veterans Day
          </li>
          <li>
            <strong>Custom holidays:</strong> Company-specific or industry-specific non-working days
          </li>
        </ul>
        <p className="mb-2">
          <strong>Business day examples (Monday to Friday workweek):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>7 calendar days:</strong> 5 business days (excluding 1 weekend)
          </li>
          <li>
            <strong>14 calendar days:</strong> 10 business days (excluding 2 weekends)
          </li>
          <li>
            <strong>30 calendar days:</strong> ~22 business days (excluding weekends + holidays)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> Different countries and industries may have varying definitions, 
          so configure appropriate settings for your specific needs.
        </p>
      </>
    ),
  },
  {
    id: "gregorian-calendar-system",
    question: "What is the Gregorian calendar and how does it affect calculations?",
    answer: (
      <>
        <p className="mb-2">
          The Gregorian calendar, introduced by Pope Gregory XIII in 1582, is the world's most 
          widely used calendar system, designed to closely match the solar year.
        </p>
        <p className="mb-2">
          <strong>Key Gregorian calendar features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>365 days per year:</strong> With an additional day every 4 years (leap year)
          </li>
          <li>
            <strong>Month variations:</strong> 28-31 days per month, February having 28 or 29 days
          </li>
          <li>
            <strong>Week structure:</strong> 7-day weeks with regional first-day variations
          </li>
          <li>
            <strong>Solar accuracy:</strong> Accurate to within 1 day every 3,030 years
          </li>
        </ul>
        <p className="mb-2">
          <strong>Calendar reform improvements over Julian calendar:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>More precise leap year rules (400-year cycle vs simple 4-year rule)</li>
          <li>Eliminated 10-day drift that had accumulated since Roman times</li>
          <li>Better alignment with seasonal cycles and solar year (365.2425 days)</li>
          <li>Standardized adoption across most of the world by the 20th century</li>
        </ul>
      </>
    ),
  },
  {
    id: "leap-year-rules-edge-cases",
    question: "How do leap years work and what edge cases affect date calculations?",
    answer: (
      <>
        <p className="mb-2">
          Leap years add complexity to date calculations with specific rules that account for 
          the fact that Earth's orbit takes approximately 365.2425 days, not exactly 365.
        </p>
        <p className="mb-2">
          <strong>Leap year determination rules:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Divisible by 4:</strong> Generally a leap year (2020, 2024, 2028)
          </li>
          <li>
            <strong>Century years exception:</strong> Must be divisible by 400 (1900 was not, 2000 was)
          </li>
          <li>
            <strong>Next exceptions:</strong> 2100, 2200, 2300 will not be leap years
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common edge cases in date calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Month-end arithmetic:</strong> January 31 + 1 month = February 28/29 (not March 3)
          </li>
          <li>
            <strong>February 29 handling:</strong> Leap day only exists in leap years
          </li>
          <li>
            <strong>Time zone boundaries:</strong> Date changes can shift with time zone calculations
          </li>
          <li>
            <strong>Daylight saving time:</strong> Can affect calculations involving specific times
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical impact:</strong> These rules ensure calendar accuracy but require special 
          handling in date arithmetic to avoid invalid dates.
        </p>
      </>
    ),
  },
  {
    id: "holiday-systems-types",
    question: "How are holidays classified and handled in date calculations?",
    answer: (
      <>
        <p className="mb-2">
          Holidays are categorized into different types based on how they're determined, 
          affecting business day calculations and scheduling applications.
        </p>
        <p className="mb-2">
          <strong>Holiday classification types:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fixed holidays:</strong> Same calendar date annually (Christmas Dec 25, July 4th)
          </li>
          <li>
            <strong>Floating holidays:</strong> Rule-based dates (Thanksgiving: 4th Thursday in November)
          </li>
          <li>
            <strong>Observed holidays:</strong> Shifted to weekdays when falling on weekends
          </li>
          <li>
            <strong>Regional variations:</strong> State, provincial, or local holidays
          </li>
        </ul>
        <p className="mb-2">
          <strong>US Federal holidays (11 total):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>New Year's Day, Martin Luther King Jr. Day, Presidents' Day</li>
          <li>Memorial Day, Juneteenth, Independence Day</li>
          <li>Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas</li>
        </ul>
        <p className="text-sm">
          <strong>Business impact:</strong> Financial markets may close, affecting settlement dates; 
          government offices closed affecting legal deadlines; shipping and delivery delays.
        </p>
      </>
    ),
  },
  {
    id: "time-zone-considerations",
    question: "How do time zones affect date calculations and what should I consider?",
    answer: (
      <>
        <p className="mb-2">
          Time zones can significantly impact date calculations, especially for applications spanning 
          multiple regions or involving precise timing requirements.
        </p>
        <p className="mb-2">
          <strong>Time zone impact scenarios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Date boundary shifts:</strong> 11 PM EST = 4 AM GMT next day
          </li>
          <li>
            <strong>Business day variations:</strong> Different countries' working days overlap differently
          </li>
          <li>
            <strong>Holiday observance:</strong> Same calendar date, different local times
          </li>
          <li>
            <strong>Contract deadlines:</strong> Legal implications of timezone-specific dates
          </li>
        </ul>
        <p className="mb-2">
          <strong>Daylight Saving Time (DST) complications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Spring forward:</strong> Lose 1 hour (2 AM becomes 3 AM)
          </li>
          <li>
            <strong>Fall back:</strong> Gain 1 hour (2 AM repeats)
          </li>
          <li>
            <strong>Regional differences:</strong> Arizona, Hawaii don't observe DST
          </li>
          <li>
            <strong>International variation:</strong> Different countries change on different dates
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practice:</strong> Always specify time zones explicitly for international 
          applications and consider UTC for consistent calculations.
        </p>
      </>
    ),
  },
  {
    id: "month-arithmetic-challenges",
    question: "Why is adding months to dates complicated and how is it handled?",
    answer: (
      <>
        <p className="mb-2">
          Month arithmetic is complex because months have different lengths (28-31 days), 
          creating ambiguity when the target month has fewer days than the starting date.
        </p>
        <p className="mb-2">
          <strong>Month arithmetic challenges:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Month length variation:</strong> January (31) → February (28/29) → March (31)
          </li>
          <li>
            <strong>End-of-month problems:</strong> January 31 + 1 month = ?
          </li>
          <li>
            <strong>Leap year complications:</strong> February 29 + 1 year in non-leap year = ?
          </li>
          <li>
            <strong>Cross-year boundaries:</strong> December 31 + 1 month = January 31 next year
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common resolution strategies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>End-of-month clamping:</strong> January 31 + 1 month = February 28/29
          </li>
          <li>
            <strong>Preserve day when possible:</strong> January 15 + 1 month = February 15
          </li>
          <li>
            <strong>Business rules:</strong> Some applications use strict 30-day months
          </li>
          <li>
            <strong>Calendar month method:</strong> Move to same day of next month when valid
          </li>
        </ul>
        <p className="text-sm">
          <strong>Example:</strong> January 31, 2024 + 1 month = February 29, 2024 (leap year); 
          January 31, 2023 + 1 month = February 28, 2023 (non-leap year).
        </p>
      </>
    ),
  },
  {
    id: "practical-applications-industries",
    question: "What are the main practical applications for date calculations?",
    answer: (
      <>
        <p className="mb-2">
          Date calculations are essential across numerous industries and applications, 
          from legal compliance to financial planning and project management.
        </p>
        <p className="mb-2">
          <strong>Financial and legal applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Interest calculations:</strong> Bond maturity, loan terms, compounding periods
          </li>
          <li>
            <strong>Settlement dates:</strong> T+2 stock trading, T+1 bond trading
          </li>
          <li>
            <strong>Contract terms:</strong> Lease periods, warranty expiration, statute of limitations
          </li>
          <li>
            <strong>Tax deadlines:</strong> Filing dates, estimated payment schedules
          </li>
        </ul>
        <p className="mb-2">
          <strong>Business and project management:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Project scheduling:</strong> Milestone deadlines, resource allocation
          </li>
          <li>
            <strong>Employee benefits:</strong> Vacation accrual, tenure calculations, eligibility dates
          </li>
          <li>
            <strong>Supply chain:</strong> Delivery schedules, inventory turnover, lead times
          </li>
          <li>
            <strong>Academic calendars:</strong> Semester lengths, enrollment deadlines
          </li>
        </ul>
        <p className="mb-2">
          <strong>Healthcare and personal applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Medical appointment scheduling, treatment intervals, prescription refills</li>
          <li>Pregnancy due dates, child development milestones</li>
          <li>Age verification for legal requirements, insurance eligibility</li>
        </ul>
      </>
    ),
  },
  {
    id: "calculation-accuracy-tips",
    question: "What tips ensure accurate and reliable date calculations?",
    answer: (
      <>
        <p className="mb-2">
          Accurate date calculations require attention to detail regarding time zones, business rules, 
          input validation, and clear documentation of assumptions and methods.
        </p>
        <p className="mb-2">
          <strong>Input validation and formatting:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Date format consistency:</strong> Use ISO 8601 (YYYY-MM-DD) when possible
          </li>
          <li>
            <strong>Range validation:</strong> Ensure dates are within reasonable bounds
          </li>
          <li>
            <strong>Leap year validation:</strong> Verify February 29 only in leap years
          </li>
          <li>
            <strong>Business context:</strong> Consider industry-specific requirements
          </li>
        </ul>
        <p className="mb-2">
          <strong>Regional and business considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Time zone specification:</strong> Always specify time zones for international use
          </li>
          <li>
            <strong>Holiday calendar selection:</strong> Use appropriate regional holiday sets
          </li>
          <li>
            <strong>Business day definitions:</strong> Clarify which days are considered working days
          </li>
          <li>
            <strong>Weekend definitions:</strong> Not all cultures use Saturday-Sunday weekends
          </li>
        </ul>
        <p className="mb-2">
          <strong>Documentation and testing:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Document assumptions clearly (inclusions, exclusions, methods)</li>
          <li>Test edge cases (leap years, month boundaries, holidays)</li>
          <li>Verify against known calculation results</li>
          <li>Consider user interface clarity for input and output formats</li>
        </ul>
      </>
    ),
  },
  {
    id: "calendar-history-systems",
    question: "How did calendar systems develop and what alternatives exist?",
    answer: (
      <>
        <p className="mb-2">
          Calendar systems evolved from astronomical observations and cultural needs, 
          with the Gregorian calendar becoming dominant but other systems still in use today.
        </p>
        <p className="mb-2">
          <strong>Historical calendar development:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Roman calendar:</strong> Originally 10 months, later 12 with irregular lengths
          </li>
          <li>
            <strong>Julian calendar (46 BC):</strong> 365.25-day year with simple leap year rule
          </li>
          <li>
            <strong>Gregorian reform (1582):</strong> Corrected drift with refined leap year rules
          </li>
          <li>
            <strong>Global adoption:</strong> Gradual adoption over centuries, completed by 1920s
          </li>
        </ul>
        <p className="mb-2">
          <strong>Alternative calendar systems still in use:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Islamic calendar:</strong> 354-day lunar year, used for religious dates
          </li>
          <li>
            <strong>Hebrew calendar:</strong> Lunisolar system with 353-385 day years
          </li>
          <li>
            <strong>Chinese calendar:</strong> Lunisolar with 12 or 13 months per year
          </li>
          <li>
            <strong>Ethiopian calendar:</strong> 13 months, ~7-8 years behind Gregorian
          </li>
        </ul>
        <p className="text-sm">
          <strong>Modern impact:</strong> While most business and legal applications use Gregorian dates, 
          religious and cultural events often use traditional calendars, requiring conversion calculations.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Date calculations are based on the Gregorian calendar system and assume standard Western business 
      day definitions. Holiday calendars and business rules may vary by region, industry, and specific 
      application requirements. For legal or financial applications, verify calculation methods with 
      appropriate professionals.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Date Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="date-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/age", label: "Age Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/hours", label: "Hours Calculator" },
        { href: "/duedate", label: "Due Date Calculator" },
      ]}
    />
  );
} 