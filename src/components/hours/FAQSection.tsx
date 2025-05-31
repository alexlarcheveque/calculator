"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-an-hour-definition",
    question: "What is an hour and how is it defined?",
    answer: (
      <>
        <p className="mb-2">
          An hour is a unit of time equal to 60 minutes or 3,600 seconds. It
          represents 1/24th of a day and serves as a fundamental measurement for
          scheduling, work time tracking, and daily planning.
        </p>
        <p className="mb-2">
          <strong>Basic time relationships:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>1 hour = 60 minutes = 3,600 seconds</li>
          <li>1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
          <li>1 week = 168 hours = 10,080 minutes</li>
          <li>1 month = 672-744 hours (depending on days in month)</li>
        </ul>
        <p className="mb-2">
          <strong>Scientific definition:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Based on atomic time standards and international coordination</li>
          <li>Maintained by Coordinated Universal Time (UTC) worldwide</li>
          <li>
            Leap seconds occasionally added to align with Earth's rotation
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical importance:</strong> Hours provide the standard
          framework for work schedules, appointment times, and daily routines
          across all cultures and industries.
        </p>
      </>
    ),
  },
  {
    id: "12-hour-vs-24-hour-clock",
    question:
      "What's the difference between 12-hour and 24-hour clock formats?",
    answer: (
      <>
        <p className="mb-2">
          The 12-hour and 24-hour clock systems represent different approaches
          to displaying time, each with specific advantages for different
          contexts and global usage patterns.
        </p>
        <p className="mb-2">
          <strong>12-hour clock format:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Numbers used:</strong> 1-12 with AM/PM designations
          </li>
          <li>
            <strong>AM (Ante Meridiem):</strong> "Before midday" - 12:00 AM
            (midnight) to 11:59 AM
          </li>
          <li>
            <strong>PM (Post Meridiem):</strong> "After noon" - 12:00 PM (noon)
            to 11:59 PM
          </li>
          <li>
            <strong>Common usage:</strong> United States, Canada, Australia,
            Philippines
          </li>
        </ul>
        <p className="mb-2">
          <strong>24-hour clock format (Military time):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Numbers used:</strong> 00:00 to 23:59 (no AM/PM needed)
          </li>
          <li>
            <strong>00:00-11:59:</strong> Equivalent to 12:00 AM-11:59 AM
          </li>
          <li>
            <strong>12:00-23:59:</strong> Equivalent to 12:00 PM-11:59 PM
          </li>
          <li>
            <strong>Global usage:</strong> Most countries, military, aviation,
            healthcare
          </li>
        </ul>
        <p className="mb-2">
          <strong>Conversion examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>1:30 PM = 13:30, 6:45 PM = 18:45, 11:15 PM = 23:15</li>
          <li>14:20 = 2:20 PM, 09:30 = 9:30 AM, 00:45 = 12:45 AM</li>
        </ul>
      </>
    ),
  },
  {
    id: "hours-in-time-periods",
    question: "How many hours are in different time periods?",
    answer: (
      <>
        <p className="mb-2">
          Understanding hours across various time periods helps with planning,
          scheduling, and time management for both personal and professional
          contexts.
        </p>
        <p className="mb-2">
          <strong>Common time period calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Day:</strong> 24 hours
          </li>
          <li>
            <strong>Week:</strong> 168 hours (7 days × 24 hours)
          </li>
          <li>
            <strong>Month:</strong> 672-744 hours (varies by days in month)
          </li>
          <li>
            <strong>Quarter:</strong> 2,160 hours average (3 months)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Monthly variations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>February (28 days): 672 hours</li>
          <li>February (29 days, leap year): 696 hours</li>
          <li>April, June, September, November (30 days): 720 hours</li>
          <li>
            January, March, May, July, August, October, December (31 days): 744
            hours
          </li>
          <li>Average month: 730.5 hours</li>
        </ul>
        <p className="mb-2">
          <strong>Yearly calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Regular year (365 days): 8,760 hours</li>
          <li>Leap year (366 days): 8,784 hours</li>
          <li>Average year: 8,766 hours</li>
          <li>Decade: 87,660 hours average</li>
          <li>Century: 876,600 hours</li>
        </ul>
        <p className="text-sm">
          <strong>Planning applications:</strong> These calculations help with
          project timelines, work scheduling, and long-term planning across
          various timeframes.
        </p>
      </>
    ),
  },
  {
    id: "work-time-standards",
    question: "What are standard work time measurements and calculations?",
    answer: (
      <>
        <p className="mb-2">
          Work time standards provide frameworks for employment, payroll, and
          productivity tracking, with variations based on industry, location,
          and employment type.
        </p>
        <p className="mb-2">
          <strong>Standard work measurements:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard work day:</strong> 8 hours (480 minutes)
          </li>
          <li>
            <strong>Standard work week:</strong> 40 hours (5 days × 8 hours)
          </li>
          <li>
            <strong>Lunch break:</strong> Typically 30-60 minutes (unpaid)
          </li>
          <li>
            <strong>Break periods:</strong> 15 minutes per 4-hour work period
          </li>
        </ul>
        <p className="mb-2">
          <strong>Employment classifications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Full-time:</strong> 35-40+ hours per week (benefits
            eligible)
          </li>
          <li>
            <strong>Part-time:</strong> Less than 35 hours per week
          </li>
          <li>
            <strong>Overtime:</strong> Hours beyond 40/week (often 1.5× pay
            rate)
          </li>
          <li>
            <strong>Double-time:</strong> Premium pay for holidays/excessive
            overtime
          </li>
        </ul>
        <p className="mb-2">
          <strong>Annual work calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Standard work year: 2,080 hours (40 hours × 52 weeks)</li>
          <li>With 2 weeks vacation: 2,000 hours</li>
          <li>With holidays and vacation: 1,880-1,960 hours typical</li>
        </ul>
        <p className="text-sm">
          <strong>Legal considerations:</strong> Work time standards vary by
          jurisdiction, with specific regulations for overtime, break
          requirements, and maximum work hours.
        </p>
      </>
    ),
  },
  {
    id: "decimal-hours-vs-minutes",
    question: "How do decimal hours compare to hours and minutes format?",
    answer: (
      <>
        <p className="mb-2">
          Decimal hours and hours:minutes formats serve different purposes, with
          decimal format preferred for calculations and traditional format for
          scheduling and time display.
        </p>
        <p className="mb-2">
          <strong>Decimal hours format:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Format:</strong> Whole hours plus decimal fractions (e.g.,
            8.5 hours)
          </li>
          <li>
            <strong>Benefits:</strong> Easy mathematical calculations, payroll
            processing
          </li>
          <li>
            <strong>Usage:</strong> Time tracking software, project management,
            billing
          </li>
          <li>
            <strong>Precision:</strong> Can represent any fraction of an hour
            precisely
          </li>
        </ul>
        <p className="mb-2">
          <strong>Hours and minutes format:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Format:</strong> Hours:minutes (e.g., 8:30)
          </li>
          <li>
            <strong>Benefits:</strong> Intuitive for humans, matches clock
            displays
          </li>
          <li>
            <strong>Usage:</strong> Schedules, appointments, daily time
            management
          </li>
          <li>
            <strong>Familiarity:</strong> Universal understanding across
            cultures
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common conversions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            15 minutes = 0.25 hours, 30 minutes = 0.5 hours, 45 minutes = 0.75
            hours
          </li>
          <li>8:15 = 8.25 hours, 6:30 = 6.5 hours, 2:45 = 2.75 hours</li>
          <li>Formula: Minutes ÷ 60 = decimal hours</li>
        </ul>
        <p className="text-sm">
          <strong>Best practices:</strong> Use decimal hours for calculations
          and data processing, hours:minutes for human-readable schedules and
          time displays.
        </p>
      </>
    ),
  },
  {
    id: "time-zone-considerations",
    question: "How do time zones affect hours calculations?",
    answer: (
      <>
        <p className="mb-2">
          Time zones create complexity in hours calculations for global
          business, travel planning, and remote work coordination, requiring
          careful consideration of local vs. universal time.
        </p>
        <p className="mb-2">
          <strong>Time zone fundamentals:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>UTC (Coordinated Universal Time):</strong> Global time
            standard, no seasonal changes
          </li>
          <li>
            <strong>GMT (Greenwich Mean Time):</strong> Time zone at 0°
            longitude, equivalent to UTC
          </li>
          <li>
            <strong>Local time zones:</strong> Offset from UTC (e.g., EST =
            UTC-5, PST = UTC-8)
          </li>
          <li>
            <strong>Time zone count:</strong> 24 standard zones, plus fractional
            zones
          </li>
        </ul>
        <p className="mb-2">
          <strong>Daylight Saving Time complications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Spring forward:</strong> Lose 1 hour (23-hour day)
          </li>
          <li>
            <strong>Fall back:</strong> Gain 1 hour (25-hour day)
          </li>
          <li>
            <strong>Not universal:</strong> Some regions don't observe DST
          </li>
          <li>
            <strong>Date variations:</strong> DST changes occur on different
            dates globally
          </li>
        </ul>
        <p className="mb-2">
          <strong>Business applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Meeting scheduling:</strong> Coordinate across multiple time
            zones
          </li>
          <li>
            <strong>Project deadlines:</strong> Specify time zone for clarity
          </li>
          <li>
            <strong>Remote work:</strong> Track hours across different locations
          </li>
          <li>
            <strong>Travel planning:</strong> Calculate flight times and jet lag
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practices:</strong> Always specify time zones for
          important calculations, use UTC for international coordination, and
          account for DST transitions in scheduling.
        </p>
      </>
    ),
  },
  {
    id: "hours-calculator-applications",
    question: "What are practical applications for hours calculators?",
    answer: (
      <>
        <p className="mb-2">
          Hours calculators serve diverse applications across business,
          education, healthcare, and personal productivity, providing precise
          time management and planning capabilities.
        </p>
        <p className="mb-2">
          <strong>Business and payroll applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Employee time tracking:</strong> Calculate total work hours,
            overtime, and break times
          </li>
          <li>
            <strong>Payroll processing:</strong> Convert hours to wages, handle
            multiple pay rates
          </li>
          <li>
            <strong>Project billing:</strong> Track billable hours for client
            invoicing
          </li>
          <li>
            <strong>Resource planning:</strong> Estimate project durations and
            staffing needs
          </li>
        </ul>
        <p className="mb-2">
          <strong>Personal productivity:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Study planning:</strong> Allocate time for coursework and
            exam preparation
          </li>
          <li>
            <strong>Exercise tracking:</strong> Monitor workout duration and
            weekly activity goals
          </li>
          <li>
            <strong>Sleep analysis:</strong> Calculate sleep duration and
            optimize sleep schedules
          </li>
          <li>
            <strong>Travel planning:</strong> Estimate journey times and arrival
            schedules
          </li>
        </ul>
        <p className="mb-2">
          <strong>Healthcare and scheduling:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Medication schedules:</strong> Calculate intervals between
            doses
          </li>
          <li>
            <strong>Treatment duration:</strong> Track therapy sessions and
            recovery time
          </li>
          <li>
            <strong>Shift planning:</strong> Schedule healthcare workers across
            24/7 operations
          </li>
          <li>
            <strong>Appointment booking:</strong> Optimize scheduling efficiency
          </li>
        </ul>
        <p className="text-sm">
          <strong>Advanced features:</strong> Modern hours calculators often
          include time zone conversion, break time deduction, rounding options,
          and integration with payroll systems.
        </p>
      </>
    ),
  },
  {
    id: "time-calculation-accuracy",
    question: "How can I ensure accuracy in time calculations?",
    answer: (
      <>
        <p className="mb-2">
          Accurate time calculations require attention to detail, understanding
          of time formats, and consideration of various factors that can affect
          precision in different contexts.
        </p>
        <p className="mb-2">
          <strong>Common calculation errors to avoid:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>AM/PM confusion:</strong> Misreading 12:00 AM as noon
            instead of midnight
          </li>
          <li>
            <strong>Date boundary crossing:</strong> Not accounting for
            calculations spanning midnight
          </li>
          <li>
            <strong>Time zone mistakes:</strong> Mixing local time with UTC or
            other zones
          </li>
          <li>
            <strong>DST transitions:</strong> Forgetting spring forward/fall
            back adjustments
          </li>
        </ul>
        <p className="mb-2">
          <strong>Precision considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rounding rules:</strong> Decide whether to round to nearest
            minute, quarter-hour, or exact time
          </li>
          <li>
            <strong>Break time handling:</strong> Include or exclude unpaid
            breaks in total calculations
          </li>
          <li>
            <strong>Overtime thresholds:</strong> Apply correct rates for
            different hour categories
          </li>
          <li>
            <strong>Decimal precision:</strong> Maintain appropriate decimal
            places for calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Verification methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Double-check calculations:</strong> Use multiple methods or
            tools for important calculations
          </li>
          <li>
            <strong>Cross-reference sources:</strong> Verify time zone
            information and DST dates
          </li>
          <li>
            <strong>Test edge cases:</strong> Check calculations around
            midnight, month boundaries, DST transitions
          </li>
          <li>
            <strong>Document assumptions:</strong> Record time zones, rounding
            rules, and calculation methods
          </li>
        </ul>
        <p className="text-sm">
          <strong>Quality assurance:</strong> Implement systematic checks for
          payroll calculations, maintain audit trails, and regularly validate
          calculation logic against known standards.
        </p>
      </>
    ),
  },
  {
    id: "hours-tracking-best-practices",
    question: "What are best practices for tracking and managing hours?",
    answer: (
      <>
        <p className="mb-2">
          Effective hours tracking combines appropriate tools, consistent
          processes, and clear policies to ensure accurate time management for
          both individuals and organizations.
        </p>
        <p className="mb-2">
          <strong>Individual time tracking:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Real-time logging:</strong> Record time as activities
            happen, not retroactively
          </li>
          <li>
            <strong>Detailed categories:</strong> Break down time by project,
            task, or client
          </li>
          <li>
            <strong>Regular review:</strong> Daily or weekly review of logged
            hours for accuracy
          </li>
          <li>
            <strong>Consistent format:</strong> Use same time format and
            rounding rules throughout
          </li>
        </ul>
        <p className="mb-2">
          <strong>Organizational policies:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Clear guidelines:</strong> Define work hours, break
            policies, and overtime rules
          </li>
          <li>
            <strong>Approval processes:</strong> Implement review and approval
            workflows
          </li>
          <li>
            <strong>Grace periods:</strong> Establish reasonable clock-in/out
            windows
          </li>
          <li>
            <strong>Exception handling:</strong> Process for correcting errors
            and missed punches
          </li>
        </ul>
        <p className="mb-2">
          <strong>Technology solutions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Time tracking software:</strong> Automated logging with
            project categorization
          </li>
          <li>
            <strong>Mobile apps:</strong> GPS and geofencing for remote workers
          </li>
          <li>
            <strong>Integration:</strong> Connect time tracking with payroll and
            project management
          </li>
          <li>
            <strong>Reporting:</strong> Generate detailed reports for analysis
            and compliance
          </li>
        </ul>
        <p className="text-sm">
          <strong>Compliance considerations:</strong> Ensure tracking methods
          meet labor law requirements, maintain appropriate records retention,
          and protect employee privacy while gathering necessary data.
        </p>
      </>
    ),
  },
  {
    id: "international-hour-standards",
    question: "How do international standards affect hours calculations?",
    answer: (
      <>
        <p className="mb-2">
          International standards for time measurement ensure global
          coordination and consistency, affecting everything from business
          operations to scientific research and digital systems.
        </p>
        <p className="mb-2">
          <strong>Global time standards:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>ISO 8601:</strong> International standard for date and time
            representation (YYYY-MM-DD HH:MM:SS)
          </li>
          <li>
            <strong>UTC coordination:</strong> Maintained by International
            Bureau of Weights and Measures
          </li>
          <li>
            <strong>Leap seconds:</strong> Occasional adjustments to keep atomic
            time aligned with Earth rotation
          </li>
          <li>
            <strong>Time zone database:</strong> IANA time zone database
            maintains global time zone information
          </li>
        </ul>
        <p className="mb-2">
          <strong>Regional variations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Work week standards:</strong> Vary from 35-48 hours across
            countries
          </li>
          <li>
            <strong>Overtime regulations:</strong> Different thresholds and
            rates globally
          </li>
          <li>
            <strong>Holiday calculations:</strong> National and religious
            holidays affect work hours
          </li>
          <li>
            <strong>Break requirements:</strong> Mandatory break periods vary by
            jurisdiction
          </li>
        </ul>
        <p className="mb-2">
          <strong>Digital system considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unix timestamps:</strong> Seconds since January 1, 1970 UTC
          </li>
          <li>
            <strong>Database storage:</strong> Store times in UTC, display in
            local time
          </li>
          <li>
            <strong>API standards:</strong> Use ISO 8601 format for data
            exchange
          </li>
          <li>
            <strong>Synchronization:</strong> Network Time Protocol (NTP) for
            system clock accuracy
          </li>
        </ul>
        <p className="text-sm">
          <strong>Business implications:</strong> Understanding international
          standards is crucial for global operations, compliance with local
          labor laws, and interoperability of time-based systems.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Hours calculations are based on standard time measurements and common
      business practices. Work time regulations, overtime rules, and time
      tracking requirements vary by jurisdiction and industry. Always consult
      local labor laws and company policies for accurate time management and
      payroll calculations.
    </p>
  </>
);

export default function FAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Hours Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="hours-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/time", label: "Time Calculator" },
        { href: "/date", label: "Date Calculator" },
        { href: "/age", label: "Age Calculator" },
        { href: "/percentage", label: "Percentage Calculator" },
      ]}
    />
  );
}
