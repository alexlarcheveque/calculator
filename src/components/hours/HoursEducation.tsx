export default function HoursEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About Hours and Time Measurement
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Understanding Hours
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              An hour is most commonly defined as a period of time equal to 60
              minutes, where a minute is equal to 60 seconds, and a second has a
              rigorous scientific definition. There are also 24 hours in a day.
              Most people read time using either a 12-hour clock or a 24-hour
              clock.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            12-Hour vs 24-Hour Clock
          </h3>
          <div className="text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                12-Hour Clock:
              </h4>
              <p>
                A 12-hour clock uses the numbers 1-12. Depending on the clock
                being used, most analog clocks or watches may not include an
                indication of whether the time is in the morning or evening. On
                digital clocks and watches, "AM" stands for ante meridiem,
                meaning "before midday," while "PM" stands for post meridiem, or
                "after noon." By convention, 12 AM denotes midnight, while 12 PM
                denotes noon. Using the terms "12 midnight" and "12 noon" can
                remove ambiguity in cases where a person may not be accustomed
                to conventions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                24-Hour Clock:
              </h4>
              <p>
                A 24-hour clock typically uses the numbers 0-23, where 00:00
                indicates midnight, and a day runs from midnight to midnight
                over the course of 24 hours. This time format is an
                international standard, and is often used to avoid the ambiguity
                resulting from the use of a 12-hour clock. The hours from 0-11
                denote what would be the AM hours on a 12-hour clock, while
                hours 12-23 denote the PM hours of a 12-hour clock. In certain
                countries, 24-hour time is referred to as military time, since
                this is the time format used by militaries (and other entities)
                around the world, where unambiguous time measurement is
                particularly important.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hours in Different Time Periods
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a day
                    </td>
                    <td className="border border-gray-300 px-4 py-2">24</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a week
                    </td>
                    <td className="border border-gray-300 px-4 py-2">168</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a month
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      672 for a 28-day month
                      <br />
                      696 for a 29-day month
                      <br />
                      720 for a 30-day month
                      <br />
                      744 for a 31-day month
                      <br />
                      730.5 on average
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a year
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      8,760 for a 365-day year
                      <br />
                      8,784 for a 366-day year
                      <br />
                      8,766 on average
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a decade
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      87,648 for a 2-leap-year decade
                      <br />
                      87,672 for a 3-leap-year decade
                      <br />
                      87,660 on average
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Hours in a century
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      876,600
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Work Time Standards
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Understanding work time calculations is essential for payroll,
              project management, and productivity tracking:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Standard Work Day:</strong> 8 hours (480 minutes)
              </li>
              <li>
                <strong>Standard Work Week:</strong> 40 hours (5 days × 8 hours)
              </li>
              <li>
                <strong>Part-time Work:</strong> Typically less than 35 hours
                per week
              </li>
              <li>
                <strong>Full-time Work:</strong> Usually 35-40+ hours per week
              </li>
              <li>
                <strong>Overtime:</strong> Hours worked beyond standard work
                week (varies by jurisdiction)
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Practical Applications
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>Hours calculations are used in many real-world scenarios:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Payroll Management:</strong> Calculating employee wages
                based on hours worked
              </li>
              <li>
                <strong>Project Planning:</strong> Estimating time requirements
                and deadlines
              </li>
              <li>
                <strong>Time Tracking:</strong> Monitoring productivity and
                billable hours
              </li>
              <li>
                <strong>Scheduling:</strong> Planning meetings, appointments,
                and events
              </li>
              <li>
                <strong>Travel Planning:</strong> Calculating journey times and
                arrival schedules
              </li>
              <li>
                <strong>Healthcare:</strong> Medication schedules and treatment
                durations
              </li>
              <li>
                <strong>Education:</strong> Class schedules and study time
                planning
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Time Zone Considerations
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              When calculating hours across different time zones, it's important
              to consider:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>UTC (Coordinated Universal Time):</strong> The primary
                time standard by which the world regulates clocks and time
              </li>
              <li>
                <strong>Local Time Zones:</strong> Regional time differences
                based on geographical location
              </li>
              <li>
                <strong>Daylight Saving Time:</strong> Seasonal time changes
                that can affect calculations
              </li>
              <li>
                <strong>International Business:</strong> Coordinating meetings
                and deadlines across multiple time zones
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Decimal Hours vs. Hours and Minutes
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Time can be expressed in different formats depending on the
              context:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Hours and Minutes Format:
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>8 hours and 30 minutes</li>
                  <li>2 hours and 15 minutes</li>
                  <li>1 hour and 45 minutes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Decimal Hours Format:
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>8.5 hours</li>
                  <li>2.25 hours</li>
                  <li>1.75 hours</li>
                </ul>
              </div>
            </div>
            <p>
              Decimal hours are often used in payroll systems and project
              management software for easier calculations and data processing.
            </p>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Calculators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <a
              href="/time"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Time Calculator
            </a>
            <a
              href="/date"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Date Calculator
            </a>
            <a
              href="/age"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Age Calculator
            </a>
            <a
              href="/timecard"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Time Card Calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
