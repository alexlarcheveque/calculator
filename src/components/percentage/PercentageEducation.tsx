export default function PercentageEducation() {
  return (
    <div className="space-y-8">
      {/* What is a percentage? */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          What is a percentage?
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            In mathematics, a percentage is a number or ratio that represents a
            fraction of 100. It is one of the ways to represent a dimensionless
            relationship between two numbers; other methods include ratios,
            fractions, and decimals. Percentages are often denoted by the symbol
            "%" written after the number. They can also be denoted by writing
            "percent" or "pct" after the number.
          </p>

          <p className="text-gray-700 mb-4">
            For example, 35% is equivalent to the decimal 0.35, or the fraction
            35/100 = 7/20.
          </p>

          <p className="text-gray-700 mb-4">
            Percentages are computed by multiplying the value of a ratio by 100.
            For example, if 25 out of 50 students in a classroom are male, the
            ratio is 25/50. The value of the ratio is therefore 0.5, and
            multiplying this by 100 yields:
          </p>

          <div className="text-center text-lg font-mono bg-gray-100 p-3 rounded mb-4">
            0.5 × 100 = 50%
          </div>

          <p className="text-gray-700">
            In other words, the ratio of 25 males to students in the classroom
            is equivalent to 50% of students in the classroom being male.
          </p>
        </div>
      </div>

      {/* Percentage formula */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Percentage Formula
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Although the percentage formula can be written in different forms,
            it is essentially an algebraic equation involving three values:
          </p>

          <div className="text-center text-xl font-mono bg-gray-100 p-4 rounded mb-4">
            P × V₁ = V₂
          </div>

          <p className="text-gray-700 mb-4">
            Where P is the percentage, V₁ is the first value that the percentage
            will modify, and V₂ is the result of the percentage operating on V₁.
            The calculator provided automatically converts the input percentage
            into a decimal to compute the solution. However, if solving for the
            percentage, the value returned will be the actual percentage, not
            its decimal representation.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <p className="font-semibold mb-2">Example:</p>
            <div className="font-mono">
              <p>P × 30 = 1.5</p>
              <p>P = 1.5 ÷ 30 = 0.05 × 100 = 5%</p>
            </div>
          </div>

          <p className="text-gray-700">
            If solving manually, the formula requires the percentage in decimal
            form, so the solution for P needs to be multiplied by 100 in order
            to convert it to a percent. This is essentially what the calculator
            above does, except that it accepts inputs in percent rather than
            decimal form.
          </p>
        </div>
      </div>

      {/* Percentage difference formula */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Percentage Difference Formula
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            The percentage difference between two values is calculated by
            dividing the absolute value of the difference between two numbers by
            the average of those two numbers. Multiplying the result by 100 will
            yield the solution in percent, rather than decimal form.
          </p>

          <div className="text-center text-lg bg-gray-100 p-4 rounded mb-4">
            <div className="font-mono">
              <div className="mb-2">
                Percentage Difference = |V₁ - V₂| ÷ ((V₁ + V₂) ÷ 2) × 100
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="font-semibold mb-2">Example:</p>
            <div className="font-mono">
              <p>|10 - 6| ÷ ((10 + 6) ÷ 2) × 100</p>
              <p>= 4 ÷ 8 × 100</p>
              <p>= 0.5 × 100 = 50%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Percentage change formula */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Percentage Change Formula
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Percentage increase and decrease are calculated by computing the
            difference between two values and comparing that difference to the
            initial value. Mathematically, this involves using the absolute
            value of the difference between two values then dividing the result
            by the initial value, essentially calculating how much the initial
            value has changed.
          </p>

          <p className="text-gray-700 mb-4">
            The percentage increase calculator above computes an increase or
            decrease of a specific percentage of the input number. It basically
            involves converting a percent into its decimal equivalent, and
            either subtracting (decrease) or adding (increase) the decimal
            equivalent from and to 1, respectively. Multiplying the original
            number by this value will result in either an increase or decrease
            of the number by the given percent.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="font-semibold mb-2">Examples:</p>
            <div className="font-mono space-y-2">
              <div>
                <p>500 increased by 10% (0.1)</p>
                <p>500 × (1 + 0.1) = 550</p>
              </div>
              <div className="mt-3">
                <p>500 decreased by 10%</p>
                <p>500 × (1 - 0.1) = 450</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
