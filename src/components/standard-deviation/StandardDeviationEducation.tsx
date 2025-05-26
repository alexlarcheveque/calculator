export default function StandardDeviationEducation() {
  return (
    <div className="space-y-8">
      {/* What is Standard Deviation? */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          What is Standard Deviation?
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Standard deviation in statistics, typically denoted by{" "}
            <strong>σ</strong>, is a measure of variation or dispersion (refers
            to a distribution's extent of stretching or squeezing) between
            values in a set of data. The lower the standard deviation, the
            closer the data points tend to be to the mean (or expected value),{" "}
            <strong>μ</strong>. Conversely, a higher standard deviation
            indicates a wider range of values.
          </p>

          <p className="text-gray-700 mb-4">
            Similar to other mathematical and statistical concepts, there are
            many different situations in which standard deviation can be used,
            and thus many different equations. In addition to expressing
            population variability, the standard deviation is also often used to
            measure statistical results such as the margin of error. When used
            in this manner, standard deviation is often called the standard
            error of the mean, or standard error of the estimate with regard to
            a mean.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h4 className="font-semibold mb-2">Key Points:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Low Standard Deviation:</strong> Data points are close
                to the mean
              </li>
              <li>
                <strong>High Standard Deviation:</strong> Data points are spread
                out over a wider range
              </li>
              <li>
                <strong>Symbol:</strong> σ (sigma) for population, s for sample
              </li>
              <li>
                <strong>Units:</strong> Same as the original data
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Population Standard Deviation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Population Standard Deviation
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            The population standard deviation, the standard definition of{" "}
            <strong>σ</strong>, is used when an entire population can be
            measured, and is the square root of the variance of a given data
            set. In cases where every member of a population can be sampled, the
            following equation can be used to find the standard deviation of the
            entire population:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
            <div className="text-center text-xl font-mono mb-4">
              σ = √[Σ(xi - μ)² / N]
            </div>
            <div className="text-sm">
              <p>
                <strong>Where:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>xi</strong> is an individual value
                </li>
                <li>
                  <strong>μ</strong> is the mean/expected value
                </li>
                <li>
                  <strong>N</strong> is the total number of values
                </li>
                <li>
                  <strong>Σ</strong> represents summation
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            For those unfamiliar with summation notation, the equation above may
            seem daunting, but when addressed through its individual components,
            this summation is not particularly complicated. The{" "}
            <strong>i=1</strong> in the summation indicates the starting index,
            i.e. for the data set 1, 3, 4, 7, 8, <strong>i=1</strong> would be
            1, <strong>i=2</strong> would be 3, and so on.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h4 className="font-semibold mb-2">Example Calculation:</h4>
            <p className="mb-2">Data set: 1, 3, 4, 7, 8</p>
            <div className="space-y-1 text-sm font-mono">
              <p>μ = (1+3+4+7+8) / 5 = 4.6</p>
              <p>
                σ = √[(1-4.6)² + (3-4.6)² + (4-4.6)² + (7-4.6)² + (8-4.6)²] / 5
              </p>
              <p>σ = √[(12.96 + 2.56 + 0.36 + 5.76 + 11.56) / 5]</p>
              <p>σ = √[33.2 / 5] = √6.64 = 2.577</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Standard Deviation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Sample Standard Deviation
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            In many cases, it is not possible to sample every member within a
            population, requiring that the above equation be modified so that
            the standard deviation can be measured through a random sample of
            the population being studied. A common estimator for{" "}
            <strong>σ</strong> is the sample standard deviation, typically
            denoted by <strong>s</strong>.
          </p>

          <p className="text-gray-700 mb-4">
            It is worth noting that there exist many different equations for
            calculating sample standard deviation since, unlike sample mean,
            sample standard deviation does not have any single estimator that is
            unbiased, efficient, and has a maximum likelihood. The equation
            provided below is the "corrected sample standard deviation."
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
            <div className="text-center text-xl font-mono mb-4">
              s = √[Σ(xi - x̄)² / (N-1)]
            </div>
            <div className="text-sm">
              <p>
                <strong>Where:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>xi</strong> is one sample value
                </li>
                <li>
                  <strong>x̄</strong> is the sample mean
                </li>
                <li>
                  <strong>N</strong> is the sample size
                </li>
                <li>
                  <strong>N-1</strong> is called "degrees of freedom"
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <h4 className="font-semibold mb-2">Why N-1?</h4>
            <p className="text-sm">
              The use of N-1 instead of N in the sample standard deviation
              formula is called Bessel's correction. This correction compensates
              for the fact that we're using the sample mean instead of the true
              population mean, which tends to underestimate the population
              variance. Using N-1 provides a better (unbiased) estimate of the
              population standard deviation.
            </p>
          </div>
        </div>
      </div>

      {/* Applications of Standard Deviation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Applications of Standard Deviation
        </h3>
        <div className="prose max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-blue-600">
                Quality Control
              </h4>
              <p className="text-gray-700 mb-3">
                Standard deviation is widely used in experimental and industrial
                settings to test models against real-world data. In industrial
                applications, it's used for quality control. Standard deviation
                can be used to calculate a minimum and maximum value within
                which some aspect of the product should fall some high
                percentage of the time.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> If a manufacturing process produces
                  bolts with a mean length of 10cm and a standard deviation of
                  0.1cm, we can expect about 68% of bolts to be between 9.9cm
                  and 10.1cm (within 1 standard deviation).
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-green-600">
                Weather and Climate
              </h4>
              <p className="text-gray-700 mb-3">
                Standard deviation is used in weather to determine differences
                in regional climate. Imagine two cities, one on the coast and
                one deep inland, that have the same mean temperature of 75°F.
                While this may prompt the belief that the temperatures of these
                two cities are virtually the same, the reality could be masked
                if only the mean is addressed and the standard deviation
                ignored.
              </p>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> A coastal city might have
                  temperatures ranging from 60°F to 85°F (σ = 7.2°F), while an
                  inland city could range from 30°F to 110°F (σ = 23.1°F), both
                  with the same mean of 75°F.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-purple-600">
                Finance and Investment
              </h4>
              <p className="text-gray-700 mb-3">
                In finance, standard deviation is often used to measure the
                associated risk in price fluctuations of some asset or portfolio
                of assets. The use of standard deviation provides an estimate of
                the uncertainty of future returns on a given investment.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> Stock A has an average return of 7%
                  with σ = 10%, while Stock B has the same average return but σ
                  = 50%. Stock A would be considered safer due to lower
                  volatility.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-orange-600">
                Education and Testing
              </h4>
              <p className="text-gray-700 mb-3">
                Standard deviation is used to understand the distribution of
                test scores, helping educators identify whether students are
                performing consistently or if there's a wide range of abilities
                in the class.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded p-3">
                <p className="text-sm">
                  <strong>Example:</strong> Two classes with the same average
                  score of 80%. Class A has σ = 5 (scores mostly 75-85), while
                  Class B has σ = 15 (scores ranging from 50-95), indicating
                  different teaching effectiveness or student preparation
                  levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding the Normal Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Standard Deviation and the Normal Distribution
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            In a normal distribution (bell curve), standard deviation has
            special significance. The empirical rule, also known as the
            68-95-99.7 rule, states that:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
              <h4 className="font-semibold text-blue-600 mb-2">68%</h4>
              <p className="text-sm">
                of data falls within 1 standard deviation of the mean
              </p>
              <p className="text-xs text-gray-600 mt-2">(μ ± 1σ)</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
              <h4 className="font-semibold text-green-600 mb-2">95%</h4>
              <p className="text-sm">
                of data falls within 2 standard deviations of the mean
              </p>
              <p className="text-xs text-gray-600 mt-2">(μ ± 2σ)</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded p-4 text-center">
              <h4 className="font-semibold text-purple-600 mb-2">99.7%</h4>
              <p className="text-sm">
                of data falls within 3 standard deviations of the mean
              </p>
              <p className="text-xs text-gray-600 mt-2">(μ ± 3σ)</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-4">
            <h4 className="font-semibold mb-2">Practical Example:</h4>
            <p className="text-sm mb-2">
              If IQ scores have a mean of 100 and standard deviation of 15:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>68% of people have IQ between 85 and 115 (100 ± 15)</li>
              <li>95% of people have IQ between 70 and 130 (100 ± 30)</li>
              <li>99.7% of people have IQ between 55 and 145 (100 ± 45)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interpreting Standard Deviation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Interpreting Standard Deviation
        </h3>
        <div className="prose max-w-none">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-green-600">
                Low Standard Deviation
              </h4>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Data points are clustered close to the mean</li>
                  <li>Indicates consistency and predictability</li>
                  <li>Less variability in the dataset</li>
                  <li>More reliable for making predictions</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Example:</strong> A manufacturing process with tight
                  quality control
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2 text-red-600">
                High Standard Deviation
              </h4>
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Data points are spread out from the mean</li>
                  <li>Indicates high variability</li>
                  <li>Less predictable outcomes</li>
                  <li>May indicate diverse populations or processes</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Example:</strong> Stock prices or test scores in a
                  diverse classroom
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
            <h4 className="font-semibold mb-2">Important Notes:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Standard deviation is always non-negative (≥ 0)</li>
              <li>A standard deviation of 0 means all values are identical</li>
              <li>
                Standard deviation has the same units as the original data
              </li>
              <li>
                It's sensitive to outliers - extreme values can significantly
                affect it
              </li>
              <li>
                For comparing variability, use coefficient of variation (σ/μ)
                when means differ significantly
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
