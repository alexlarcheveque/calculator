export default function TimeEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About Time Calculations
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            How Time Calculations Work
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Time calculations involve adding, subtracting, or converting
              between different units of time. Unlike decimal numbers, time
              follows specific conversion rules based on the sexagesimal
              (base-60) system for seconds and minutes, and a base-24 system for
              hours.
            </p>
            <p>
              When performing time arithmetic, it's important to handle overflow
              correctly:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>60 seconds = 1 minute</li>
              <li>60 minutes = 1 hour</li>
              <li>24 hours = 1 day</li>
              <li>7 days = 1 week</li>
              <li>365.25 days = 1 year (average, accounting for leap years)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Time Units and Conversions
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The following table shows common units of time and their
              relationships:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Definition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      millennium
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      1,000 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      century
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      100 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">decade</td>
                    <td className="border border-gray-300 px-4 py-2">
                      10 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      year (average)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      365.242 days or 12 months
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      common year
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      365 days or 12 months
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      leap year
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      366 days or 12 months
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      quarter
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      3 months
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">month</td>
                    <td className="border border-gray-300 px-4 py-2">
                      28-31 days (varies by month and year)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">week</td>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">day</td>
                    <td className="border border-gray-300 px-4 py-2">
                      24 hours or 1,440 minutes or 86,400 seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">hour</td>
                    <td className="border border-gray-300 px-4 py-2">
                      60 minutes or 3,600 seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">minute</td>
                    <td className="border border-gray-300 px-4 py-2">
                      60 seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">second</td>
                    <td className="border border-gray-300 px-4 py-2">
                      base unit
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      millisecond
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      10⁻³ second
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      microsecond
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      10⁻⁶ second
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      nanosecond
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      10⁻⁹ second
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Concepts of Time
          </h3>
          <div className="text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Ancient Greece
              </h4>
              <p>
                Aristotle (384-322 BC) defined time as "a number of movement in
                respect of the before and after." He viewed time as a
                measurement of change requiring motion, believing it to be
                infinite and continuous. Aristotle questioned whether time could
                exist without change, laying groundwork for philosophical
                discussions about the nature of time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Newton & Leibniz
              </h4>
              <p>
                Newton argued for absolute time that flows without regard to
                external factors, calling this "duration." He believed absolute
                time could only be understood mathematically. Leibniz countered
                that time only makes sense in the presence of objects, viewing
                it as a concept similar to space and numbers that allows humans
                to compare and sequence events.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Einstein's Relativity
              </h4>
              <p>
                Einstein introduced the concept of spacetime, where time and
                space are connected rather than separate. He showed that time
                moves differently for observers in different reference frames,
                with time slowing down as objects approach the speed of light.
                This revolutionary view replaced Newton's absolute time with
                relative time.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            How We Measure Time
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Modern timekeeping is based on the sexagesimal numeral system
              (base 60), inherited from ancient Sumer and Babylon. This system
              is used because 60 has many factors (1, 2, 3, 4, 5, 6, 10, 12, 15,
              20, 30, 60), making it easy to divide time into convenient
              portions.
            </p>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Development of Time Units
              </h4>
              <p>
                The Egyptians first divided the day into smaller parts using
                sundials, creating 12 divisions between sunrise and sunset. They
                used 12 stars to divide the night, leading to our 24-hour day.
                The Greeks later standardized this into equal-length hours.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Early Timekeeping Devices
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>Sundials:</strong> Used shadows to track time during
                  daylight
                </li>
                <li>
                  <strong>Water clocks (Clepsydra):</strong> Measured time by
                  water flow
                </li>
                <li>
                  <strong>Candle clocks:</strong> Burned at known rates to
                  measure time
                </li>
                <li>
                  <strong>Hourglasses:</strong> Used sand flow for specific time
                  periods
                </li>
                <li>
                  <strong>Pendulum clocks:</strong> First mechanical clocks with
                  natural oscillation
                </li>
                <li>
                  <strong>Atomic clocks:</strong> Modern precision timekeeping
                  using atomic resonance
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Practical Applications
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>Time calculations are essential in many fields:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Project Management:</strong> Calculating task durations
                and deadlines
              </li>
              <li>
                <strong>Transportation:</strong> Travel times, schedules, and
                logistics
              </li>
              <li>
                <strong>Manufacturing:</strong> Production cycles and efficiency
                measurements
              </li>
              <li>
                <strong>Sports:</strong> Performance timing and record keeping
              </li>
              <li>
                <strong>Science:</strong> Experimental timing and data
                collection intervals
              </li>
              <li>
                <strong>Finance:</strong> Interest calculations and time-based
                investments
              </li>
              <li>
                <strong>Healthcare:</strong> Medication schedules and treatment
                durations
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Time Zones and Standards
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The world is divided into time zones to standardize time across
              different geographical locations. Coordinated Universal Time (UTC)
              serves as the primary time standard, with local times calculated
              as offsets from UTC.
            </p>
            <p>Key time standards include:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>UTC:</strong> Coordinated Universal Time, the global
                time standard
              </li>
              <li>
                <strong>GMT:</strong> Greenwich Mean Time, historically
                significant reference
              </li>
              <li>
                <strong>Local Time:</strong> Time adjusted for specific
                geographical locations
              </li>
              <li>
                <strong>Daylight Saving Time:</strong> Seasonal time adjustments
                in many regions
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
              href="/hours"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Hours Calculator
            </a>
            <a
              href="/duration"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Duration Calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
