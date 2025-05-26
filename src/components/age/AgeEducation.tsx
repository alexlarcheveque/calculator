export default function AgeEducation() {
  return (
    <div className="space-y-8">
      {/* How Age is Calculated */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          How Age is Calculated
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            The age of a person can be counted differently in different
            cultures. This calculator is based on the most common age system. In
            this system, age increases on a person's birthday. For example, the
            age of a person who has lived for 3 years and 11 months is 3, and
            their age will increase to 4 on their next birthday one month later.
            Most western countries use this age system.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h4 className="font-semibold mb-2">Standard Age Calculation:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Age increases only on your birthday</li>
              <li>Partial years are not counted in the main age</li>
              <li>Time is calculated precisely down to seconds</li>
              <li>Leap years are properly accounted for</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            Our calculator provides both the traditional age (years only) and a
            detailed breakdown including months, weeks, days, hours, minutes,
            and seconds. This gives you a complete picture of exactly how much
            time has passed since your birth.
          </p>
        </div>
      </div>

      {/* Cultural Differences in Age Calculation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Cultural Differences in Age Calculation
        </h3>
        <div className="prose max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-blue-600">
                Western Age System (Most Common)
              </h4>
              <p className="text-gray-700 mb-3">
                In most Western countries, age increases on the person's
                birthday. A person born on January 1st will be 0 years old until
                the next January 1st, when they turn 1. This is the system used
                by this calculator.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> Someone born on March 15, 2000, will
                  be 23 years old from March 15, 2023, until March 14, 2024.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-green-600">
                Traditional Chinese Age System
              </h4>
              <p className="text-gray-700 mb-3">
                In one of the traditional Chinese age systems, people are born
                at age 1 and their age increases at the Traditional Chinese New
                Year rather than their birthday. This means everyone in the same
                year becomes one year older on the same day.
              </p>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> If a baby is born just one day
                  before the Traditional Chinese New Year, 2 days later, the
                  baby will be 2 even though they are only 2 days old.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-purple-600">
                Korean Age System
              </h4>
              <p className="text-gray-700 mb-3">
                In the traditional Korean age system, everyone is born at age 1,
                and everyone gets one year older on New Year's Day (January
                1st), regardless of when their birthday is. This means Korean
                age can be 1-2 years higher than international age.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> A baby born on December 31st would
                  be 1 year old, and the next day (January 1st) would be 2 years
                  old, despite being only 1 day old.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-orange-600">
                Counting vs. Ordinal Age
              </h4>
              <p className="text-gray-700 mb-3">
                In some cultures, age is expressed by counting years with or
                without including the current year. For example, a person who is
                twenty years old is the same age as another person who is in
                their twenty-first year of life.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> Someone might say "I'm in my 25th
                  year" when they are 24 years old in the Western system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Month and Day Calculations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Understanding Month and Day Calculations
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            In some situations, the months and day result of age calculations
            may be confusing, especially when the starting date is the end of a
            month. This is due to the uneven number of days in different months.
          </p>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h4 className="font-semibold mb-2">Example Scenario:</h4>
              <p className="text-sm mb-2">
                Calculating age from February 28, 2022 to March 31, 2022:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>
                  <strong>Method 1:</strong> Feb 28 to Mar 28 = 1 month, then
                  Mar 28 to Mar 31 = 3 days. Result: 1 month and 3 days.
                </li>
                <li>
                  <strong>Method 2:</strong> Both Feb 28 and Mar 31 are
                  end-of-month dates. Result: 1 month.
                </li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Our calculator uses Method 1 for consistency and precision.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-semibold mb-2">Similar Situations:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>April 30 to May 31</li>
                <li>May 30 to June 30</li>
                <li>Any month-end to month-end calculation</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                The confusion comes from the uneven number of days in different
                months.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-4">
            Our calculator handles these edge cases by using a consistent
            algorithm that accounts for the varying lengths of months and
            properly handles leap years.
          </p>
        </div>
      </div>

      {/* Life Statistics and Fun Facts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Life Statistics and Fun Facts
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Beyond just calculating your age, our calculator provides
            interesting statistics about your life. These numbers are based on
            average human physiological data and can vary significantly between
            individuals.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-red-600">
                Heartbeats
              </h4>
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-sm mb-2">
                  <strong>Average:</strong> 70 beats per minute
                </p>
                <p className="text-sm mb-2">
                  <strong>Daily:</strong> ~100,800 beats
                </p>
                <p className="text-sm">
                  <strong>Yearly:</strong> ~36.8 million beats
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Note: Heart rate varies with age, fitness, and activity level.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-blue-600">
                Breathing
              </h4>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-sm mb-2">
                  <strong>Average:</strong> 15 breaths per minute
                </p>
                <p className="text-sm mb-2">
                  <strong>Daily:</strong> ~21,600 breaths
                </p>
                <p className="text-sm">
                  <strong>Yearly:</strong> ~7.9 million breaths
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Note: Breathing rate varies with activity and health.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-indigo-600">
                Sleep
              </h4>
              <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
                <p className="text-sm mb-2">
                  <strong>Average:</strong> 8 hours per day
                </p>
                <p className="text-sm mb-2">
                  <strong>Percentage:</strong> ~33% of life
                </p>
                <p className="text-sm">
                  <strong>By age 75:</strong> ~25 years sleeping
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Note: Sleep needs vary by age and individual.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-green-600">
                Interesting Facts
              </h4>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>You blink about 17,000 times per day</li>
                  <li>Your hair grows about 6 inches per year</li>
                  <li>You produce about 1.5 liters of saliva daily</li>
                  <li>Your heart pumps about 2,000 gallons of blood daily</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zodiac and Birth Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Zodiac Signs and Birth Information
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Your birth date determines various cultural and traditional
            associations, from zodiac signs to birthstones. While these have no
            scientific basis, they are part of many cultural traditions
            worldwide.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-purple-600">
                Western Zodiac
              </h4>
              <p className="text-gray-700 mb-3">
                Based on the position of the sun at the time of birth, the
                Western zodiac divides the year into 12 signs, each associated
                with specific personality traits and elements (Fire, Earth, Air,
                Water).
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="text-sm">
                  The zodiac signs are: Aries, Taurus, Gemini, Cancer, Leo,
                  Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and
                  Pisces.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-red-600">
                Chinese Zodiac
              </h4>
              <p className="text-gray-700 mb-3">
                The Chinese zodiac follows a 12-year cycle, with each year
                represented by an animal. Your birth year determines your
                Chinese zodiac animal, which is believed to influence
                personality and fortune.
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm">
                  The 12 animals are: Rat, Ox, Tiger, Rabbit, Dragon, Snake,
                  Horse, Goat, Monkey, Rooster, Dog, and Pig.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-blue-600">
                Birthstones and Birth Flowers
              </h4>
              <p className="text-gray-700 mb-3">
                Each month is associated with specific gemstones (birthstones)
                and flowers (birth flowers). These traditions vary by culture
                but are popular in jewelry and gift-giving.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> January's birthstone is Garnet and
                  birth flower is Carnation, while July's are Ruby and Larkspur
                  respectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Calculators */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Related Calculators
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Explore other time and date-related calculators to help with various
            calculations:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <h4 className="font-semibold mb-2">Date Calculator</h4>
              <p className="text-sm text-gray-600">
                Calculate the difference between two dates or add/subtract days
                from a date.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <h4 className="font-semibold mb-2">Time Calculator</h4>
              <p className="text-sm text-gray-600">
                Add, subtract, or calculate differences between times and
                durations.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <h4 className="font-semibold mb-2">Business Days Calculator</h4>
              <p className="text-sm text-gray-600">
                Calculate working days between dates, excluding weekends and
                holidays.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <h4 className="font-semibold mb-2">Retirement Calculator</h4>
              <p className="text-sm text-gray-600">
                Plan for retirement by calculating how much time you have until
                retirement age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
