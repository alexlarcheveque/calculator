"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "time-calculation-fundamentals",
    question:
      "How do time calculations work and what makes them different from regular math?",
    answer: (
      <>
        <p className="mb-2">
          Time calculations follow the sexagesimal (base-60) system for seconds
          and minutes, and base-24 for hours, requiring special overflow
          handling unlike decimal arithmetic.
        </p>
        <p className="mb-2">
          <strong>Key time calculation principles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>60 seconds = 1 minute:</strong> Overflow seconds into
            minutes automatically
          </li>
          <li>
            <strong>60 minutes = 1 hour:</strong> Minutes beyond 60 convert to
            hours
          </li>
          <li>
            <strong>24 hours = 1 day:</strong> Hours beyond 24 roll into next
            day
          </li>
          <li>
            <strong>Carry operations:</strong> Each unit carries to the next
            like borrowing in subtraction
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example calculation (2:45:30 + 1:25:45):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Seconds: 30 + 45 = 75 seconds = 1 minute + 15 seconds</li>
          <li>Minutes: 45 + 25 + 1 = 71 minutes = 1 hour + 11 minutes</li>
          <li>Hours: 2 + 1 + 1 = 4 hours</li>
          <li>Final result: 4:11:15</li>
        </ul>
      </>
    ),
  },
  {
    id: "time-units-conversion-table",
    question:
      "What are the standard time units and how do they convert to each other?",
    answer: (
      <>
        <p className="mb-2">
          Time units form a hierarchical system from nanoseconds to millennia,
          with each unit having specific conversion factors for accurate
          calculations.
        </p>
        <p className="mb-2">
          <strong>Common time unit conversions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Second (base unit):</strong> 1,000 milliseconds
          </li>
          <li>
            <strong>Minute:</strong> 60 seconds
          </li>
          <li>
            <strong>Hour:</strong> 60 minutes = 3,600 seconds
          </li>
          <li>
            <strong>Day:</strong> 24 hours = 1,440 minutes = 86,400 seconds
          </li>
          <li>
            <strong>Week:</strong> 7 days = 168 hours = 604,800 seconds
          </li>
        </ul>
        <p className="mb-2">
          <strong>Larger time units:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Month:</strong> 28-31 days (varies by month and leap years)
          </li>
          <li>
            <strong>Year (common):</strong> 365 days = 8,760 hours
          </li>
          <li>
            <strong>Year (leap):</strong> 366 days = 8,784 hours
          </li>
          <li>
            <strong>Year (average):</strong> 365.242 days accounting for leap
            years
          </li>
          <li>
            <strong>Decade:</strong> 10 years, Century: 100 years, Millennium:
            1,000 years
          </li>
        </ul>
        <p className="text-sm">
          <strong>Precision units:</strong> Millisecond (10⁻³), Microsecond
          (10⁻⁶), Nanosecond (10⁻⁹) seconds.
        </p>
      </>
    ),
  },
  {
    id: "time-arithmetic-operations",
    question: "How do you add and subtract time values correctly?",
    answer: (
      <>
        <p className="mb-2">
          Time arithmetic requires handling overflow and borrowing between
          units, similar to how we handle carrying in regular addition but with
          different base numbers.
        </p>
        <p className="mb-2">
          <strong>Addition process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Start with smallest unit:</strong> Add seconds first, then
            minutes, then hours
          </li>
          <li>
            <strong>Handle overflow:</strong> Convert excess seconds to minutes
            (÷60)
          </li>
          <li>
            <strong>Carry forward:</strong> Add carried amounts to next larger
            unit
          </li>
          <li>
            <strong>Repeat process:</strong> Continue through all time units
          </li>
        </ul>
        <p className="mb-2">
          <strong>Subtraction process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Borrowing when needed:</strong> If smaller unit
            insufficient, borrow from larger
          </li>
          <li>
            <strong>Convert borrowed amounts:</strong> 1 minute = 60 seconds, 1
            hour = 60 minutes
          </li>
          <li>
            <strong>Perform subtraction:</strong> After borrowing, subtract
            normally
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example subtraction (5:20:15 - 2:45:30):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Seconds: Can't do 15 - 30, borrow 1 minute: 75 - 30 = 45 seconds
          </li>
          <li>Minutes: 19 - 45, borrow 1 hour: 79 - 45 = 34 minutes</li>
          <li>Hours: 4 - 2 = 2 hours. Result: 2:34:45</li>
        </ul>
      </>
    ),
  },
  {
    id: "sexagesimal-system-history",
    question: "Why do we use base-60 for time instead of decimal system?",
    answer: (
      <>
        <p className="mb-2">
          The sexagesimal (base-60) system for time comes from ancient Sumerian
          and Babylonian mathematics, chosen because 60 has many divisors making
          it highly practical for calculations.
        </p>
        <p className="mb-2">
          <strong>Advantages of base-60 for time:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Many factors:</strong> 60 ÷ by 1, 2, 3, 4, 5, 6, 10, 12, 15,
            20, 30, 60
          </li>
          <li>
            <strong>Easy fractions:</strong> 1/2 hour = 30 min, 1/3 hour = 20
            min, 1/4 hour = 15 min
          </li>
          <li>
            <strong>Practical divisions:</strong> Convenient for splitting time
            into equal parts
          </li>
          <li>
            <strong>Historical consistency:</strong> 4,000+ years of
            mathematical tradition
          </li>
        </ul>
        <p className="mb-2">
          <strong>Historical development:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sumerians (3000 BC):</strong> First developed base-60
            counting system
          </li>
          <li>
            <strong>Babylonians (2000 BC):</strong> Refined sexagesimal
            mathematics for astronomy
          </li>
          <li>
            <strong>Egyptians:</strong> Divided day into 24 hours using sundials
            and star observations
          </li>
          <li>
            <strong>Greeks:</strong> Standardized equal-length hours from
            Egyptian innovations
          </li>
        </ul>
        <p className="text-sm">
          <strong>Modern persistence:</strong> Despite metric system adoption
          globally, time measurement remains sexagesimal due to its mathematical
          elegance and universal acceptance.
        </p>
      </>
    ),
  },
  {
    id: "time-zones-utc-standards",
    question: "How do time zones work and what is UTC?",
    answer: (
      <>
        <p className="mb-2">
          Time zones standardize time globally by dividing Earth into regions
          with uniform time, using Coordinated Universal Time (UTC) as the
          primary reference standard.
        </p>
        <p className="mb-2">
          <strong>Key time standards:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>UTC (Coordinated Universal Time):</strong> Global time
            standard based on atomic clocks
          </li>
          <li>
            <strong>GMT (Greenwich Mean Time):</strong> Historical reference,
            now largely replaced by UTC
          </li>
          <li>
            <strong>Local Time:</strong> UTC adjusted for specific geographical
            locations (+/- hours)
          </li>
          <li>
            <strong>Daylight Saving Time:</strong> Seasonal adjustments in many
            regions (+1 hour typically)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Time zone examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>EST (Eastern Standard Time):</strong> UTC-5 (UTC-4 during
            DST)
          </li>
          <li>
            <strong>PST (Pacific Standard Time):</strong> UTC-8 (UTC-7 during
            DST)
          </li>
          <li>
            <strong>CET (Central European Time):</strong> UTC+1 (UTC+2 during
            DST)
          </li>
          <li>
            <strong>JST (Japan Standard Time):</strong> UTC+9 (no DST)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Calculation tip:</strong> When calculating across time zones,
          convert to UTC first, perform calculations, then convert back to
          desired local time.
        </p>
      </>
    ),
  },
  {
    id: "philosophical-concepts-time",
    question:
      "How have philosophers and scientists understood the nature of time?",
    answer: (
      <>
        <p className="mb-2">
          Time has been debated by philosophers and scientists for millennia,
          evolving from ancient Greek concepts to Einstein's revolutionary
          spacetime theory.
        </p>
        <p className="mb-2">
          <strong>Historical perspectives on time:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Aristotle (384-322 BC):</strong> "Number of movement in
            respect of before and after" - time as measurement of change
          </li>
          <li>
            <strong>Newton (1643-1727):</strong> Absolute time that flows
            uniformly regardless of external factors
          </li>
          <li>
            <strong>Leibniz (1646-1716):</strong> Relational time that only
            exists in presence of objects and events
          </li>
          <li>
            <strong>Einstein (1879-1955):</strong> Spacetime where time and
            space are interconnected, relative to observer
          </li>
        </ul>
        <p className="mb-2">
          <strong>Modern understanding (Einstein's relativity):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Time dilation:</strong> Time moves slower at high speeds
            approaching light speed
          </li>
          <li>
            <strong>Gravitational time dilation:</strong> Time moves slower in
            stronger gravitational fields
          </li>
          <li>
            <strong>Simultaneity relativity:</strong> Events simultaneous for
            one observer may not be for another
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical impact:</strong> GPS satellites must account for
          relativistic time differences to maintain accuracy, proving Einstein's
          theories in everyday technology.
        </p>
      </>
    ),
  },
  {
    id: "timekeeping-device-evolution",
    question: "How did timekeeping devices develop throughout history?",
    answer: (
      <>
        <p className="mb-2">
          Timekeeping evolved from natural observations to atomic precision,
          driven by human needs for coordination, navigation, and scientific
          measurement.
        </p>
        <p className="mb-2">
          <strong>Ancient timekeeping methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sundials (3500 BC):</strong> Used shadow positions to track
            daylight hours
          </li>
          <li>
            <strong>Water clocks (1500 BC):</strong> Measured time by controlled
            water flow (Clepsydra)
          </li>
          <li>
            <strong>Candle clocks (520 AD):</strong> Burned at known rates for
            time measurement
          </li>
          <li>
            <strong>Hourglasses (1100 AD):</strong> Sand flow through narrow
            opening for specific durations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Mechanical advancement:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pendulum clocks (1656):</strong> First mechanical clocks
            using natural oscillation
          </li>
          <li>
            <strong>Spring-driven clocks (1400s):</strong> Portable timekeeping
            with mainspring power
          </li>
          <li>
            <strong>Quartz clocks (1927):</strong> Crystal oscillation for
            improved accuracy
          </li>
          <li>
            <strong>Atomic clocks (1949):</strong> Cesium atom oscillations for
            ultimate precision
          </li>
        </ul>
        <p className="text-sm">
          <strong>Modern precision:</strong> Atomic clocks are accurate to 1
          second in 100 million years, enabling GPS, internet synchronization,
          and scientific research requiring exact timing.
        </p>
      </>
    ),
  },
  {
    id: "practical-time-applications",
    question: "What are the main practical applications for time calculations?",
    answer: (
      <>
        <p className="mb-2">
          Time calculations are essential across virtually every industry and
          aspect of modern life, from project management to scientific research
          and daily scheduling.
        </p>
        <p className="mb-2">
          <strong>Business and project management:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Project scheduling:</strong> Task duration estimation,
            critical path analysis, deadline management
          </li>
          <li>
            <strong>Manufacturing:</strong> Production cycle timing, efficiency
            measurements, quality control intervals
          </li>
          <li>
            <strong>Transportation:</strong> Travel time calculations, route
            optimization, scheduling logistics
          </li>
          <li>
            <strong>Employee management:</strong> Work hour tracking, overtime
            calculations, shift scheduling
          </li>
        </ul>
        <p className="mb-2">
          <strong>Scientific and technical applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Research timing:</strong> Experimental intervals, data
            collection schedules, reaction timing
          </li>
          <li>
            <strong>Computer science:</strong> Algorithm performance, system
            timing, network latency measurements
          </li>
          <li>
            <strong>Sports science:</strong> Performance timing, training
            intervals, recovery period calculations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Personal and healthcare applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Medical scheduling, medication timing, treatment duration planning
          </li>
          <li>
            Personal productivity, study time tracking, fitness workout timing
          </li>
          <li>
            Financial calculations involving time-based interest and investments
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "time-expression-parsing",
    question:
      "How do time expression calculators parse and evaluate time inputs?",
    answer: (
      <>
        <p className="mb-2">
          Time expression calculators parse human-readable time inputs and
          convert them to standardized formats for mathematical operations and
          conversions.
        </p>
        <p className="mb-2">
          <strong>Common time expression formats:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>HH:MM:SS format:</strong> 14:30:45 (2:30:45 PM)
          </li>
          <li>
            <strong>Mixed units:</strong> "2 hours 30 minutes 15 seconds"
          </li>
          <li>
            <strong>Decimal hours:</strong> 2.5 hours = 2:30:00
          </li>
          <li>
            <strong>Natural language:</strong> "1 day 3 hours 45 minutes"
          </li>
        </ul>
        <p className="mb-2">
          <strong>Parsing process:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Tokenization:</strong> Split input into recognizable units
            and numbers
          </li>
          <li>
            <strong>Unit recognition:</strong> Identify hours, minutes, seconds,
            days, etc.
          </li>
          <li>
            <strong>Validation:</strong> Check for valid ranges (0-59
            minutes/seconds, 0-23 hours)
          </li>
          <li>
            <strong>Normalization:</strong> Convert to standard internal format
            for calculations
          </li>
        </ul>
        <p className="text-sm">
          <strong>Error handling:</strong> Good parsers handle ambiguous inputs,
          provide suggestions for corrections, and clearly indicate accepted
          formats for user guidance.
        </p>
      </>
    ),
  },
  {
    id: "time-calculation-accuracy",
    question: "What factors affect time calculation accuracy and precision?",
    answer: (
      <>
        <p className="mb-2">
          Time calculation accuracy depends on input precision, computational
          methods, system limitations, and the specific requirements of the
          application.
        </p>
        <p className="mb-2">
          <strong>Precision considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Input resolution:</strong> Seconds vs milliseconds vs
            microseconds
          </li>
          <li>
            <strong>Rounding methods:</strong> How fractional time units are
            handled
          </li>
          <li>
            <strong>Leap second handling:</strong> Occasional adjustments to UTC
            for Earth rotation
          </li>
          <li>
            <strong>Calendar complexities:</strong> Leap years, varying month
            lengths, time zones
          </li>
        </ul>
        <p className="mb-2">
          <strong>System limitations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Computer clock accuracy:</strong> System time drift,
            synchronization frequency
          </li>
          <li>
            <strong>Floating-point precision:</strong> Mathematical limitations
            in very long calculations
          </li>
          <li>
            <strong>Time zone databases:</strong> Updates for political changes,
            DST rule modifications
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices for accuracy:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Use appropriate precision for application (seconds for daily use,
            nanoseconds for science)
          </li>
          <li>
            Handle edge cases explicitly (leap years, month boundaries, DST
            transitions)
          </li>
          <li>
            Validate inputs and provide clear error messages for invalid time
            values
          </li>
          <li>
            Document assumptions about time zones, calendar systems, and
            precision levels
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
      Time calculations are based on standard Gregorian calendar and UTC time
      systems. Results may vary when dealing with historical dates, alternative
      calendar systems, or high-precision scientific applications. For critical
      timing applications, verify calculation methods and consider system clock
      accuracy.
    </p>
  </>
);

export default function TimeFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Time Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="time-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/date", label: "Date Calculator" },
        { href: "/age", label: "Age Calculator" },
        { href: "/hours", label: "Hours Calculator" },
        { href: "/duration", label: "Duration Calculator" },
      ]}
    />
  );
}
