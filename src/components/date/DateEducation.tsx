export default function DateEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About Date Calculations
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            How Date Calculations Work
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Date calculations involve determining the time difference between
              two dates or adding/subtracting time periods from a given date.
              These calculations must account for varying month lengths, leap
              years, and different calendar systems.
            </p>
            <p>
              When calculating the difference between dates, the result can be
              expressed in various units:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Years, Months, Days:</strong> The most precise breakdown
                accounting for calendar irregularities
              </li>
              <li>
                <strong>Total Days:</strong> The absolute number of days between
                dates
              </li>
              <li>
                <strong>Business Days:</strong> Excluding weekends and holidays
                for work-related calculations
              </li>
              <li>
                <strong>Weeks:</strong> Useful for scheduling and planning
                purposes
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Business Day Calculations
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Business day calculations are essential for financial, legal, and
              commercial applications. They typically exclude:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Weekends:</strong> Saturday and Sunday in most Western
                countries
              </li>
              <li>
                <strong>Public Holidays:</strong> National, state, or regional
                holidays
              </li>
              <li>
                <strong>Custom Holidays:</strong> Company-specific or
                industry-specific non-working days
              </li>
            </ul>
            <p>
              Different countries and industries may have varying definitions of
              business days, so it's important to configure the appropriate
              settings for your specific needs.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            The Gregorian Calendar
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The Gregorian calendar, used in most of the world today, was
              introduced by Pope Gregory XIII in 1582 as a reform of the Julian
              calendar. Key features include:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>365 days per year:</strong> With an additional day every
                four years (leap year)
              </li>
              <li>
                <strong>Leap year rules:</strong> Years divisible by 4 are leap
                years, except century years not divisible by 400
              </li>
              <li>
                <strong>Month variations:</strong> 28-31 days per month, with
                February having 28 or 29 days
              </li>
              <li>
                <strong>Week structure:</strong> 7-day weeks with Sunday or
                Monday as the first day (varies by region)
              </li>
            </ul>
            <p>
              This calendar system is accurate to within 1 day every 3,030 years
              compared to the solar year.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Leap Years and Edge Cases
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Leap years add complexity to date calculations. The rules are:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Years divisible by 4 are leap years (e.g., 2024)</li>
              <li>
                However, years divisible by 100 are not leap years (e.g., 1900)
              </li>
              <li>
                Except years divisible by 400, which are leap years (e.g., 2000)
              </li>
            </ul>
            <p>Common edge cases in date calculations include:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Month-end dates:</strong> Adding months to January 31st
                results in February 28th/29th
              </li>
              <li>
                <strong>Leap day calculations:</strong> February 29th only
                exists in leap years
              </li>
              <li>
                <strong>Time zone considerations:</strong> Date boundaries can
                shift based on time zones
              </li>
              <li>
                <strong>Daylight saving time:</strong> Can affect calculations
                involving specific times
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Holiday Systems
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>Holidays can be categorized into different types:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Fixed holidays:</strong> Same date every year (e.g.,
                Christmas, Independence Day)
              </li>
              <li>
                <strong>Floating holidays:</strong> Based on specific rules
                (e.g., Thanksgiving, Easter)
              </li>
              <li>
                <strong>Observed holidays:</strong> When a holiday falls on a
                weekend, it may be observed on a weekday
              </li>
              <li>
                <strong>Regional variations:</strong> Different countries and
                states have different holiday calendars
              </li>
            </ul>
            <p>
              In the United States, federal holidays include New Year's Day,
              Martin Luther King Jr. Day, Presidents' Day, Memorial Day,
              Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans
              Day, Thanksgiving, and Christmas.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Practical Applications
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>Date calculations are used in many real-world scenarios:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Project management:</strong> Calculating project
                durations and deadlines
              </li>
              <li>
                <strong>Financial services:</strong> Interest calculations, loan
                terms, and settlement dates
              </li>
              <li>
                <strong>Legal contracts:</strong> Determining contract periods
                and expiration dates
              </li>
              <li>
                <strong>Human resources:</strong> Employee tenure, vacation
                accrual, and benefit eligibility
              </li>
              <li>
                <strong>Healthcare:</strong> Treatment schedules, medication
                intervals, and appointment planning
              </li>
              <li>
                <strong>Education:</strong> Academic calendars, semester
                lengths, and graduation dates
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Tips for Accurate Calculations
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>To ensure accurate date calculations:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Specify time zones:</strong> When working across
                different regions
              </li>
              <li>
                <strong>Consider business rules:</strong> Different industries
                may have specific requirements
              </li>
              <li>
                <strong>Account for holidays:</strong> Include relevant holidays
                for your calculation context
              </li>
              <li>
                <strong>Validate inputs:</strong> Ensure dates are valid and in
                the expected range
              </li>
              <li>
                <strong>Document assumptions:</strong> Clearly state what is
                included or excluded in calculations
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Calculators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <a
              href="/age"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Age Calculator
            </a>
            <a
              href="/time"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Time Calculator
            </a>
            <a
              href="/hours"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Hours Calculator
            </a>
            <a
              href="/due-date"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Due Date Calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
