import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-standard-deviation",
    question: "What is standard deviation and what does it measure?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation (σ) is a statistical measure that quantifies the
          amount of variation or dispersion in a dataset. It tells us how spread
          out data points are from the mean (average) value.
        </p>
        <p className="mb-2">
          <strong>Key characteristics:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Low standard deviation:</strong> Data points are clustered
            close to the mean (more consistent)
          </li>
          <li>
            <strong>High standard deviation:</strong> Data points are spread out
            over a wider range (more variable)
          </li>
          <li>
            <strong>Units:</strong> Same as the original data (e.g., if
            measuring height in inches, σ is in inches)
          </li>
          <li>
            <strong>Always non-negative:</strong> σ ≥ 0 (zero means all values
            are identical)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example interpretation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Test scores: Mean = 80, σ = 5 → Most scores between 75-85
            (consistent performance)
          </li>
          <li>
            Test scores: Mean = 80, σ = 15 → Scores range from 50-95 (high
            variability)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Statistical importance:</strong> Standard deviation is
          fundamental for understanding data distribution, comparing datasets,
          and making statistical inferences.
        </p>
      </>
    ),
  },
  {
    id: "population-vs-sample-standard-deviation",
    question:
      "What's the difference between population and sample standard deviation?",
    answer: (
      <>
        <p className="mb-2">
          The choice between population and sample standard deviation depends on
          whether you're analyzing an entire population or just a subset
          (sample) of that population.
        </p>
        <p className="mb-2">
          <strong>Population standard deviation (σ):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> σ = √[Σ(xi - μ)² / N]
          </li>
          <li>
            <strong>Use when:</strong> You have data for the entire population
          </li>
          <li>
            <strong>Divisor:</strong> N (total number of values)
          </li>
          <li>
            <strong>Example:</strong> All employees in a small company, all
            students in a class
          </li>
        </ul>
        <p className="mb-2">
          <strong>Sample standard deviation (s):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> s = √[Σ(xi - x̄)² / (N-1)]
          </li>
          <li>
            <strong>Use when:</strong> You have a sample representing a larger
            population
          </li>
          <li>
            <strong>Divisor:</strong> N-1 (degrees of freedom, Bessel's
            correction)
          </li>
          <li>
            <strong>Example:</strong> 100 people surveyed to represent a city's
            population
          </li>
        </ul>
        <p className="mb-2">
          <strong>Why N-1 for samples?</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Bessel's correction compensates for using sample mean instead of
            true population mean
          </li>
          <li>Using N would underestimate population variance</li>
          <li>
            N-1 provides unbiased estimate of population standard deviation
          </li>
          <li>
            The larger the sample, the smaller the difference between N and N-1
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "calculating-standard-deviation-steps",
    question: "How do you calculate standard deviation step-by-step?",
    answer: (
      <>
        <p className="mb-2">
          Calculating standard deviation involves five systematic steps, whether
          for population or sample data.
        </p>
        <p className="mb-2">
          <strong>Step-by-step process:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Calculate the mean (μ or x̄):</strong> Add all values and
            divide by count
          </li>
          <li>
            <strong>Find deviations:</strong> Subtract mean from each data point
            (xi - μ)
          </li>
          <li>
            <strong>Square the deviations:</strong> Square each deviation (xi -
            μ)²
          </li>
          <li>
            <strong>Calculate variance:</strong> Sum squared deviations and
            divide by N (population) or N-1 (sample)
          </li>
          <li>
            <strong>Take square root:</strong> Standard deviation = √variance
          </li>
        </ol>
        <p className="mb-2">
          <strong>Worked example with data set: [2, 4, 6, 8, 10]</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Step 1: Mean = (2+4+6+8+10) ÷ 5 = 6</li>
          <li>Step 2: Deviations = [-4, -2, 0, 2, 4]</li>
          <li>Step 3: Squared deviations = [16, 4, 0, 4, 16]</li>
          <li>Step 4: Variance = (16+4+0+4+16) ÷ 5 = 8 (population)</li>
          <li>Step 5: Standard deviation = √8 = 2.83</li>
        </ul>
        <p className="text-sm">
          <strong>For sample calculation:</strong> In step 4, divide by 4
          instead of 5 to get variance = 10, so s = √10 = 3.16
        </p>
      </>
    ),
  },
  {
    id: "normal-distribution-empirical-rule",
    question: "How does standard deviation relate to the normal distribution?",
    answer: (
      <>
        <p className="mb-2">
          In a normal distribution (bell curve), standard deviation has special
          significance through the empirical rule (68-95-99.7 rule), which
          describes how data is distributed around the mean.
        </p>
        <p className="mb-2">
          <strong>The empirical rule states:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>68%</strong> of data falls within 1 standard deviation (μ ±
            1σ)
          </li>
          <li>
            <strong>95%</strong> of data falls within 2 standard deviations (μ ±
            2σ)
          </li>
          <li>
            <strong>99.7%</strong> of data falls within 3 standard deviations (μ
            ± 3σ)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Practical example - IQ scores (μ = 100, σ = 15):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>68% of people have IQ between 85-115 (100 ± 15)</li>
          <li>95% of people have IQ between 70-130 (100 ± 30)</li>
          <li>99.7% of people have IQ between 55-145 (100 ± 45)</li>
          <li>Only 0.3% have IQ below 55 or above 145</li>
        </ul>
        <p className="mb-2">
          <strong>Applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Quality control: Define acceptable product tolerance ranges</li>
          <li>Finance: Assess investment risk and volatility</li>
          <li>
            Education: Understand test score distributions and grading curves
          </li>
          <li>Healthcare: Establish normal ranges for medical measurements</li>
        </ul>
      </>
    ),
  },
  {
    id: "standard-deviation-applications",
    question:
      "What are the main applications of standard deviation in different fields?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation is widely used across numerous fields to measure
          variability, assess risk, ensure quality, and make informed decisions
          based on data spread.
        </p>
        <p className="mb-2">
          <strong>Quality control and manufacturing:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Process monitoring:</strong> Track consistency in production
            (σ = 0.1cm for 10cm bolts means 68% within ±0.1cm)
          </li>
          <li>
            <strong>Six Sigma methodology:</strong> Reduce defects to 3.4 per
            million opportunities
          </li>
          <li>
            <strong>Control charts:</strong> Identify when processes exceed
            normal variation limits
          </li>
          <li>
            <strong>Tolerance specifications:</strong> Define acceptable product
            variation ranges
          </li>
        </ul>
        <p className="mb-2">
          <strong>Finance and investment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Risk assessment:</strong> Higher σ indicates more volatile
            investments
          </li>
          <li>
            <strong>Portfolio optimization:</strong> Balance risk vs. return
            using variance
          </li>
          <li>
            <strong>Value at Risk (VaR):</strong> Calculate potential losses at
            confidence levels
          </li>
          <li>
            <strong>Sharpe ratio:</strong> Risk-adjusted return = (return -
            risk-free rate) / σ
          </li>
        </ul>
        <p className="mb-2">
          <strong>Education and psychology:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Test analysis:</strong> σ = 5 indicates consistent class
            performance, σ = 15 shows diverse abilities
          </li>
          <li>
            <strong>Standardized testing:</strong> Convert raw scores to
            standard scores (z-scores)
          </li>
          <li>
            <strong>Research validity:</strong> Assess measurement reliability
            and consistency
          </li>
        </ul>
        <p className="mb-2">
          <strong>Weather and climate:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Coastal city: Mean temp 75°F, σ = 7°F (moderate variation)</li>
          <li>
            Inland city: Mean temp 75°F, σ = 23°F (extreme seasonal variation)
          </li>
          <li>Climate change detection through variance analysis</li>
        </ul>
      </>
    ),
  },
  {
    id: "interpreting-standard-deviation-values",
    question: "How do I interpret different standard deviation values?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation interpretation depends on context, data type, and
          comparison with other datasets. Understanding what constitutes "high"
          or "low" variation requires domain knowledge.
        </p>
        <p className="mb-2">
          <strong>General interpretation guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>σ = 0:</strong> All values identical (no variation)
          </li>
          <li>
            <strong>Small σ:</strong> Data clustered near mean (consistent,
            predictable)
          </li>
          <li>
            <strong>Large σ:</strong> Data widely spread (variable,
            unpredictable)
          </li>
          <li>
            <strong>Relative size matters:</strong> σ = 5 is small for income
            data ($50K ± $5) but large for test scores (80 ± 5)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Context-specific examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Manufacturing:</strong> σ = 0.001" excellent, σ = 0.1" poor
            for precision parts
          </li>
          <li>
            <strong>Stock returns:</strong> σ = 10% moderate risk, σ = 50% high
            risk
          </li>
          <li>
            <strong>Test scores:</strong> σ = 3 very consistent class, σ = 20
            highly diverse performance
          </li>
          <li>
            <strong>Response times:</strong> σ = 0.1 sec excellent, σ = 5 sec
            poor for web applications
          </li>
        </ul>
        <p className="mb-2">
          <strong>Coefficient of variation (CV = σ/μ):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Purpose:</strong> Compare variability between datasets with
            different means
          </li>
          <li>
            <strong>CV &lt; 0.1:</strong> Low variability (10% or less)
          </li>
          <li>
            <strong>CV 0.1-0.3:</strong> Moderate variability (10-30%)
          </li>
          <li>
            <strong>CV &gt; 0.3:</strong> High variability (over 30%)
          </li>
        </ul>
        <p className="text-sm">
          <strong>Key insight:</strong> Always interpret standard deviation
          relative to the mean, the measurement scale, and the specific context
          of your data.
        </p>
      </>
    ),
  },
  {
    id: "outliers-effect-standard-deviation",
    question: "How do outliers affect standard deviation calculations?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation is sensitive to outliers because it uses squared
          deviations from the mean. Extreme values can significantly inflate the
          standard deviation, potentially misrepresenting the overall data
          variability.
        </p>
        <p className="mb-2">
          <strong>Why outliers have large impact:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Squaring amplifies differences:</strong> Large deviations
            become much larger when squared
          </li>
          <li>
            <strong>Mean shifts:</strong> Outliers pull the mean toward them,
            affecting all deviation calculations
          </li>
          <li>
            <strong>Cumulative effect:</strong> Single extreme value affects
            entire dataset measurement
          </li>
        </ul>
        <p className="mb-2">
          <strong>Example demonstration:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Data without outlier: [10, 12, 11, 13, 14] → Mean = 12, σ = 1.58
          </li>
          <li>
            Data with outlier: [10, 12, 11, 13, 50] → Mean = 19.2, σ = 17.89
          </li>
          <li>Single outlier increased standard deviation by over 1000%</li>
        </ul>
        <p className="mb-2">
          <strong>Strategies for handling outliers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Investigate first:</strong> Determine if outliers are errors
            or legitimate extreme values
          </li>
          <li>
            <strong>Robust statistics:</strong> Use median and interquartile
            range (less sensitive to outliers)
          </li>
          <li>
            <strong>Winsorization:</strong> Replace extreme values with less
            extreme values
          </li>
          <li>
            <strong>Trimmed mean:</strong> Remove top and bottom percentiles
            before calculating
          </li>
        </ul>
        <p className="mb-2">
          <strong>When to keep outliers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            They represent genuine variability in the process or population
          </li>
          <li>
            They're important for risk assessment (e.g., extreme market
            conditions)
          </li>
          <li>They provide valuable insights about unusual circumstances</li>
          <li>You're specifically studying extreme events or tail behavior</li>
        </ul>
      </>
    ),
  },
  {
    id: "standard-deviation-vs-other-measures",
    question:
      "How does standard deviation compare to other measures of variability?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation is one of several ways to measure data spread. Each
          measure has specific advantages and use cases depending on data
          characteristics and analysis goals.
        </p>
        <p className="mb-2">
          <strong>Range (Max - Min):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Simple to calculate and understand
          </li>
          <li>
            <strong>Cons:</strong> Only considers extreme values, ignores
            distribution shape
          </li>
          <li>
            <strong>Use when:</strong> Quick assessment needed, outliers are
            meaningful
          </li>
        </ul>
        <p className="mb-2">
          <strong>Interquartile Range (IQR = Q3 - Q1):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Robust to outliers, describes middle 50% of
            data
          </li>
          <li>
            <strong>Cons:</strong> Ignores 50% of data, less sensitive to
            changes
          </li>
          <li>
            <strong>Use when:</strong> Data has outliers, non-normal
            distributions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Variance (σ²):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Mathematical foundation for many statistical
            tests
          </li>
          <li>
            <strong>Cons:</strong> Units are squared, harder to interpret
            practically
          </li>
          <li>
            <strong>Use when:</strong> Statistical calculations, comparing
            multiple groups
          </li>
        </ul>
        <p className="mb-2">
          <strong>Mean Absolute Deviation (MAD):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Pros:</strong> Less sensitive to outliers than standard
            deviation
          </li>
          <li>
            <strong>Cons:</strong> Less common, fewer statistical applications
          </li>
          <li>
            <strong>Use when:</strong> Outliers present but should have less
            influence
          </li>
        </ul>
        <p className="mb-2">
          <strong>Standard deviation advantages:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Uses all data points (more informative than range or IQR)</li>
          <li>Has known relationships with normal distribution</li>
          <li>Widely accepted in scientific and business applications</li>
          <li>Foundation for confidence intervals and hypothesis testing</li>
          <li>Enables z-score calculations and standardization</li>
        </ul>
      </>
    ),
  },
  {
    id: "using-standard-deviation-calculator",
    question: "How do I effectively use a standard deviation calculator?",
    answer: (
      <>
        <p className="mb-2">
          Standard deviation calculators streamline calculations and reduce
          errors, but understanding the input requirements and output
          interpretation ensures accurate analysis.
        </p>
        <p className="mb-2">
          <strong>Input preparation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Data format:</strong> Enter numbers separated by commas,
            spaces, or new lines
          </li>
          <li>
            <strong>Check for errors:</strong> Verify all values are entered
            correctly
          </li>
          <li>
            <strong>Remove non-numeric data:</strong> Exclude text, symbols, or
            missing values
          </li>
          <li>
            <strong>Consider outliers:</strong> Decide whether to include
            extreme values
          </li>
        </ul>
        <p className="mb-2">
          <strong>Population vs. sample selection:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Choose population:</strong> When analyzing complete data set
            (all employees, entire class)
          </li>
          <li>
            <strong>Choose sample:</strong> When data represents larger
            population (survey respondents, sample testing)
          </li>
          <li>
            <strong>When unsure:</strong> Sample calculation is more
            conservative and commonly used
          </li>
        </ul>
        <p className="mb-2">
          <strong>Interpreting results:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard deviation:</strong> Primary measure of spread (same
            units as data)
          </li>
          <li>
            <strong>Variance:</strong> Standard deviation squared (useful for
            statistical calculations)
          </li>
          <li>
            <strong>Mean:</strong> Central tendency to compare with individual
            values
          </li>
          <li>
            <strong>Count:</strong> Verify correct number of data points
            included
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Document your data source and any exclusions made</li>
          <li>Compare results with expected ranges for your field</li>
          <li>Use coefficient of variation for comparing different scales</li>
          <li>
            Consider calculating both population and sample versions for
            comparison
          </li>
          <li>Round results appropriately based on original data precision</li>
        </ul>
      </>
    ),
  },
  {
    id: "common-standard-deviation-mistakes",
    question:
      "What are common mistakes when calculating or interpreting standard deviation?",
    answer: (
      <>
        <p className="mb-2">
          Understanding common pitfalls helps ensure accurate calculations and
          meaningful interpretations of standard deviation in statistical
          analysis.
        </p>
        <p className="mb-2">
          <strong>Calculation errors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Population vs. sample confusion:</strong> Using N instead of
            N-1 for sample data
          </li>
          <li>
            <strong>Arithmetic mistakes:</strong> Errors in squaring, summing,
            or taking square root
          </li>
          <li>
            <strong>Mean calculation errors:</strong> Incorrect mean affects all
            subsequent calculations
          </li>
          <li>
            <strong>Data entry errors:</strong> Typos, missing values, or
            duplicate entries
          </li>
        </ul>
        <p className="mb-2">
          <strong>Interpretation mistakes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Ignoring context:</strong> Not considering what's "normal"
            variation for your field
          </li>
          <li>
            <strong>Comparing different scales:</strong> Not using coefficient
            of variation for different units
          </li>
          <li>
            <strong>Assuming normality:</strong> Applying empirical rule to
            non-normal distributions
          </li>
          <li>
            <strong>Outlier negligence:</strong> Not investigating whether
            extreme values are valid
          </li>
        </ul>
        <p className="mb-2">
          <strong>Conceptual misunderstandings:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Units confusion:</strong> Forgetting that σ has same units
            as original data
          </li>
          <li>
            <strong>Negative values:</strong> Standard deviation cannot be
            negative
          </li>
          <li>
            <strong>Zero interpretation:</strong> σ = 0 means all values are
            identical, not that there's no data
          </li>
          <li>
            <strong>Sample size effects:</strong> Not recognizing that small
            samples are less reliable
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices to avoid errors:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Double-check calculations using different methods or software</li>
          <li>Verify results seem reasonable compared to data range</li>
          <li>Use appropriate formulas for population vs. sample data</li>
          <li>Consider whether outliers should be included or investigated</li>
          <li>Document assumptions and methods used</li>
          <li>Compare results with similar datasets when possible</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Standard deviation calculations are based on established statistical
      formulas. Results should be interpreted within appropriate context and
      domain knowledge. For critical applications, verify calculations and
      consider consulting with statistical professionals. The choice between
      population and sample formulas depends on your specific data and analysis
      goals.
    </p>
  </>
);

export default function StandardDeviationFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Standard Deviation"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="standard-deviation-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/fraction", label: "Fraction Calculator" },
        { href: "/calculator", label: "Basic Calculator" },
        { href: "/triangle", label: "Triangle Calculator" },
      ]}
    />
  );
}
