"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-random-number-definition",
    question: "What is a random number and how is randomness defined?",
    answer: (
      <>
        <p className="mb-2">
          A random number is a value chosen from a pool of numbers with no
          discernible pattern for prediction. Each number in the pool should
          have an equal probability of being selected, making outcomes
          unpredictable and statistically independent.
        </p>
        <p className="mb-2">
          <strong>Key characteristics of random numbers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unpredictability:</strong> Cannot determine the next number
            from previous results
          </li>
          <li>
            <strong>Independence:</strong> Each number selection is unaffected
            by previous selections
          </li>
          <li>
            <strong>Uniform distribution:</strong> All numbers in range have
            equal probability (unless specified otherwise)
          </li>
          <li>
            <strong>No patterns:</strong> Results show no discernible sequences
            or trends
          </li>
        </ul>
        <p className="mb-2">
          <strong>Distribution examples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Uniform distribution:</strong> Rolling a fair dice (1-6
            equally likely)
          </li>
          <li>
            <strong>Normal distribution:</strong> Heights in a population
            (cluster around average)
          </li>
          <li>
            <strong>Weighted distribution:</strong> Random selection with
            different probabilities
          </li>
        </ul>
        <p className="text-sm">
          <strong>Important note:</strong> While we use "random" colloquially,
          most computer-generated numbers are actually pseudo-random, using
          mathematical algorithms to simulate randomness.
        </p>
      </>
    ),
  },
  {
    id: "types-random-number-generators",
    question: "What are the different types of random number generators?",
    answer: (
      <>
        <p className="mb-2">
          Random number generators fall into several categories based on their
          underlying mechanisms and intended applications. Understanding these
          differences helps choose the right generator for specific needs.
        </p>
        <p className="mb-2">
          <strong>Hardware-based random number generators:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Physical devices:</strong> Dice, coins, cards, spinning
            wheels
          </li>
          <li>
            <strong>Electronic noise:</strong> Thermal noise in resistors, shot
            noise in diodes
          </li>
          <li>
            <strong>Quantum phenomena:</strong> Photon emission, radioactive
            decay timing
          </li>
          <li>
            <strong>Advantages:</strong> True randomness, unpredictable,
            cryptographically secure
          </li>
          <li>
            <strong>Disadvantages:</strong> Slow, expensive, potentially biased,
            hardware dependent
          </li>
        </ul>
        <p className="mb-2">
          <strong>Pseudo-random number generators (PRNGs):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Mathematical algorithms:</strong> Linear congruential,
            Mersenne Twister, Xorshift
          </li>
          <li>
            <strong>Deterministic:</strong> Same seed produces identical
            sequence
          </li>
          <li>
            <strong>Advantages:</strong> Fast, reproducible, controllable,
            software-based
          </li>
          <li>
            <strong>Disadvantages:</strong> Predictable with known seed,
            eventual repetition
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cryptographically secure PRNGs:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Enhanced algorithms designed to resist prediction attacks</li>
          <li>
            Meet additional security requirements for cryptographic applications
          </li>
          <li>Examples: Fortuna, HMAC_DRBG, Hash_DRBG</li>
        </ul>
      </>
    ),
  },
  {
    id: "pseudo-random-vs-true-random",
    question:
      "What's the difference between pseudo-random and true random numbers?",
    answer: (
      <>
        <p className="mb-2">
          The distinction between pseudo-random and true random numbers is
          crucial for understanding their appropriate applications and
          limitations in various scenarios.
        </p>
        <p className="mb-2">
          <strong>Pseudo-random numbers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Generated by:</strong> Mathematical algorithms and seed
            values
          </li>
          <li>
            <strong>Deterministic:</strong> Same seed always produces identical
            sequence
          </li>
          <li>
            <strong>Period:</strong> Eventually repeat after very long sequences
            (billions/trillions)
          </li>
          <li>
            <strong>Speed:</strong> Very fast generation (millions per second)
          </li>
          <li>
            <strong>Reproducibility:</strong> Can recreate exact sequences for
            testing/debugging
          </li>
          <li>
            <strong>Predictability:</strong> Theoretically predictable if
            algorithm and seed known
          </li>
        </ul>
        <p className="mb-2">
          <strong>True random numbers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Generated by:</strong> Physical phenomena (atmospheric
            noise, quantum events)
          </li>
          <li>
            <strong>Non-deterministic:</strong> Cannot be reproduced or
            predicted
          </li>
          <li>
            <strong>No period:</strong> Never repeat in predictable patterns
          </li>
          <li>
            <strong>Speed:</strong> Slower generation due to physical
            measurement requirements
          </li>
          <li>
            <strong>Reproducibility:</strong> Cannot recreate sequences
            (advantage for security)
          </li>
          <li>
            <strong>Unpredictability:</strong> Impossible to predict even with
            complete knowledge
          </li>
        </ul>
        <p className="mb-2">
          <strong>Quality assessment:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Statistical tests: Chi-square, Kolmogorov-Smirnov, runs tests</li>
          <li>Entropy measurement: Information content and unpredictability</li>
          <li>
            Bias detection: Frequency analysis and distribution uniformity
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "random-number-applications",
    question:
      "What are the main applications and use cases for random numbers?",
    answer: (
      <>
        <p className="mb-2">
          Random numbers have widespread applications across numerous fields,
          with requirements varying from simple simulations to high-security
          cryptographic systems.
        </p>
        <p className="mb-2">
          <strong>Suitable for pseudo-random generators:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Games and entertainment:</strong> Dice rolls, card
            shuffling, procedural generation
          </li>
          <li>
            <strong>Simulations:</strong> Monte Carlo methods, weather modeling,
            traffic simulation
          </li>
          <li>
            <strong>Statistical sampling:</strong> Survey selection, A/B
            testing, market research
          </li>
          <li>
            <strong>Programming and testing:</strong> Random data generation,
            stress testing, fuzzing
          </li>
          <li>
            <strong>Machine learning:</strong> Data augmentation, random
            initialization, dropout
          </li>
          <li>
            <strong>Educational purposes:</strong> Probability demonstrations,
            statistics teaching
          </li>
        </ul>
        <p className="mb-2">
          <strong>
            Requires true random or cryptographically secure generators:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Cryptography:</strong> Encryption keys, digital signatures,
            key derivation
          </li>
          <li>
            <strong>Security systems:</strong> Session tokens, passwords,
            authentication codes
          </li>
          <li>
            <strong>Financial systems:</strong> Trading algorithms, risk
            assessment, lottery systems
          </li>
          <li>
            <strong>Scientific research:</strong> Randomized controlled trials,
            quantum experiments
          </li>
          <li>
            <strong>Gambling and gaming:</strong> Casino games, official
            lotteries, prize drawings
          </li>
          <li>
            <strong>Legal applications:</strong> Jury selection, audit sampling,
            compliance testing
          </li>
        </ul>
        <p className="text-sm">
          <strong>Selection criteria:</strong> Consider security requirements,
          speed needs, reproducibility requirements, and regulatory compliance
          when choosing generator type.
        </p>
      </>
    ),
  },
  {
    id: "random-number-quality-testing",
    question: "How do you test and evaluate random number quality?",
    answer: (
      <>
        <p className="mb-2">
          Random number quality assessment involves statistical tests and
          analysis to ensure generated numbers meet randomness criteria and
          perform adequately for intended applications.
        </p>
        <p className="mb-2">
          <strong>Statistical tests for randomness:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Frequency tests:</strong> Chi-square goodness-of-fit to
            check uniform distribution
          </li>
          <li>
            <strong>Runs tests:</strong> Analyze sequences of consecutive
            identical values
          </li>
          <li>
            <strong>Serial correlation:</strong> Test independence between
            consecutive numbers
          </li>
          <li>
            <strong>Gap tests:</strong> Measure intervals between occurrences of
            specific values
          </li>
          <li>
            <strong>Poker tests:</strong> Analyze patterns in groups of digits
          </li>
          <li>
            <strong>Kolmogorov-Smirnov:</strong> Compare distribution to
            expected uniform distribution
          </li>
        </ul>
        <p className="mb-2">
          <strong>Advanced test suites:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>NIST Statistical Test Suite:</strong> 15 tests for
            cryptographic applications
          </li>
          <li>
            <strong>Diehard tests:</strong> Battery of stringent statistical
            tests
          </li>
          <li>
            <strong>TestU01:</strong> Comprehensive library with hundreds of
            tests
          </li>
          <li>
            <strong>ENT:</strong> Simple entropy and randomness tests
          </li>
        </ul>
        <p className="mb-2">
          <strong>Quality indicators:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Period length:</strong> How long before sequence repeats
          </li>
          <li>
            <strong>Entropy:</strong> Information content per bit or number
          </li>
          <li>
            <strong>Bias:</strong> Deviation from expected uniform distribution
          </li>
          <li>
            <strong>Correlation:</strong> Dependencies between generated values
          </li>
        </ul>
        <p className="text-sm">
          <strong>Practical approach:</strong> Use established generators
          (Mersenne Twister, PCG) for most applications, reserve extensive
          testing for custom implementations or critical security applications.
        </p>
      </>
    ),
  },
  {
    id: "random-seeds-and-reproducibility",
    question: "What are random seeds and how do they affect reproducibility?",
    answer: (
      <>
        <p className="mb-2">
          Random seeds are initial values that determine the starting point of
          pseudo-random number sequences. Understanding seeds is crucial for
          balancing randomness with reproducibility requirements.
        </p>
        <p className="mb-2">
          <strong>How seeds work:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Initialization:</strong> Seed sets the internal state of the
            random number generator
          </li>
          <li>
            <strong>Deterministic sequences:</strong> Same seed always produces
            identical number sequence
          </li>
          <li>
            <strong>Different seeds:</strong> Produce completely different
            sequences
          </li>
          <li>
            <strong>No seed specified:</strong> Often uses system time or other
            variable as default seed
          </li>
        </ul>
        <p className="mb-2">
          <strong>Reproducibility benefits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Scientific research:</strong> Allows experiment replication
            and validation
          </li>
          <li>
            <strong>Software testing:</strong> Consistent test conditions for
            debugging
          </li>
          <li>
            <strong>Simulations:</strong> Compare different scenarios with
            identical random inputs
          </li>
          <li>
            <strong>Machine learning:</strong> Reproducible model training and
            evaluation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices for seed selection:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fixed seeds:</strong> Use when reproducibility is required
          </li>
          <li>
            <strong>Time-based seeds:</strong> System time for general
            unpredictability
          </li>
          <li>
            <strong>Entropy sources:</strong> Hardware random, user input,
            system state for security
          </li>
          <li>
            <strong>Avoid patterns:</strong> Don't use sequential or predictable
            seed values
          </li>
        </ul>
        <p className="mb-2">
          <strong>Security considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Never use predictable seeds for cryptographic applications</li>
          <li>
            Attackers can reproduce sequences if they know or guess the seed
          </li>
          <li>
            Use cryptographically secure seed sources for security-critical
            applications
          </li>
          <li>Consider seed size (larger seeds provide better security)</li>
        </ul>
      </>
    ),
  },
  {
    id: "random-distributions-types",
    question:
      "What are different types of random distributions and when to use them?",
    answer: (
      <>
        <p className="mb-2">
          Random distributions determine how generated numbers are spread across
          possible values. Different distributions model various real-world
          phenomena and serve specific analytical purposes.
        </p>
        <p className="mb-2">
          <strong>Uniform distribution:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Characteristics:</strong> All values in range have equal
            probability
          </li>
          <li>
            <strong>Use cases:</strong> Fair dice, random selection, basic
            simulations
          </li>
          <li>
            <strong>Example:</strong> Rolling a six-sided die (1-6 equally
            likely)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Normal (Gaussian) distribution:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Characteristics:</strong> Bell curve, values cluster around
            mean
          </li>
          <li>
            <strong>Use cases:</strong> Heights, test scores, measurement
            errors, natural phenomena
          </li>
          <li>
            <strong>Parameters:</strong> Mean (center) and standard deviation
            (spread)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Exponential distribution:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Characteristics:</strong> Models time between independent
            events
          </li>
          <li>
            <strong>Use cases:</strong> Waiting times, equipment failure,
            radioactive decay
          </li>
          <li>
            <strong>Properties:</strong> Memoryless property, always positive
            values
          </li>
        </ul>
        <p className="mb-2">
          <strong>Other important distributions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Poisson:</strong> Count of events in fixed time/space
            intervals
          </li>
          <li>
            <strong>Binomial:</strong> Number of successes in fixed number of
            trials
          </li>
          <li>
            <strong>Beta:</strong> Probability distributions, proportion
            modeling
          </li>
          <li>
            <strong>Gamma:</strong> Waiting times for multiple events
          </li>
        </ul>
        <p className="text-sm">
          <strong>Selection guidance:</strong> Choose distribution based on the
          real-world phenomenon being modeled or statistical properties required
          for analysis.
        </p>
      </>
    ),
  },
  {
    id: "random-number-security-considerations",
    question: "What security considerations apply to random number generation?",
    answer: (
      <>
        <p className="mb-2">
          Security applications have strict requirements for random number
          generation. Understanding these requirements prevents vulnerabilities
          and ensures appropriate generator selection.
        </p>
        <p className="mb-2">
          <strong>Security requirements:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unpredictability:</strong> Impossible to predict future
            values from past observations
          </li>
          <li>
            <strong>Non-reproducibility:</strong> Cannot recreate the same
            sequence
          </li>
          <li>
            <strong>Unbiased:</strong> No statistical patterns that attackers
            can exploit
          </li>
          <li>
            <strong>Sufficient entropy:</strong> Adequate randomness for key
            strength
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common security vulnerabilities:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Weak seeds:</strong> Predictable or low-entropy
            initialization values
          </li>
          <li>
            <strong>Inadequate generators:</strong> Using basic PRNGs for
            cryptographic purposes
          </li>
          <li>
            <strong>State exposure:</strong> Internal generator state becomes
            known to attackers
          </li>
          <li>
            <strong>Insufficient entropy:</strong> Not enough randomness in the
            system
          </li>
        </ul>
        <p className="mb-2">
          <strong>Recommended security practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Use OS-provided CSPRNGs:</strong> /dev/urandom,
            CryptGenRandom, getentropy()
          </li>
          <li>
            <strong>Hardware entropy sources:</strong> TPM, RDRAND instruction,
            hardware security modules
          </li>
          <li>
            <strong>Entropy pooling:</strong> Combine multiple entropy sources
          </li>
          <li>
            <strong>Regular reseeding:</strong> Periodically refresh generator
            state
          </li>
        </ul>
        <p className="mb-2">
          <strong>Compliance standards:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>NIST SP 800-90A: Approved random number generators</li>
          <li>FIPS 140-2: Federal cryptographic module standards</li>
          <li>Common Criteria: International security evaluation standards</li>
          <li>Industry-specific regulations (PCI DSS, HIPAA, etc.)</li>
        </ul>
      </>
    ),
  },
  {
    id: "random-number-performance-considerations",
    question:
      "What performance factors should I consider when choosing random number generators?",
    answer: (
      <>
        <p className="mb-2">
          Performance requirements vary significantly across applications.
          Understanding speed, memory, and computational trade-offs helps select
          optimal generators for specific use cases.
        </p>
        <p className="mb-2">
          <strong>Speed considerations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fast PRNGs:</strong> Linear congruential (fastest),
            Xorshift, PCG
          </li>
          <li>
            <strong>Medium speed:</strong> Mersenne Twister, WELL
          </li>
          <li>
            <strong>Slower but secure:</strong> ChaCha20, AES-CTR mode
          </li>
          <li>
            <strong>Hardware generators:</strong> Typically slowest due to
            physical measurement
          </li>
        </ul>
        <p className="mb-2">
          <strong>Memory requirements:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Small state:</strong> LCG (few bytes), Xorshift (8-32 bytes)
          </li>
          <li>
            <strong>Large state:</strong> Mersenne Twister (2.5KB), WELL
            (varies)
          </li>
          <li>
            <strong>Considerations:</strong> Memory-constrained embedded systems
            vs. server applications
          </li>
        </ul>
        <p className="mb-2">
          <strong>Quality vs. performance trade-offs:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Fast but lower quality:</strong> Simple LCG, basic Xorshift
          </li>
          <li>
            <strong>Balanced:</strong> PCG, Xorshift*, modern LCG variants
          </li>
          <li>
            <strong>High quality:</strong> Mersenne Twister, WELL, cryptographic
            generators
          </li>
        </ul>
        <p className="mb-2">
          <strong>Application-specific optimization:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Games:</strong> Fast generation, moderate quality sufficient
          </li>
          <li>
            <strong>Scientific simulation:</strong> High quality,
            reproducibility important
          </li>
          <li>
            <strong>Real-time systems:</strong> Predictable timing, low latency
          </li>
          <li>
            <strong>Parallel processing:</strong> Thread-safe generators,
            multiple streams
          </li>
        </ul>
        <p className="text-sm">
          <strong>Recommendation:</strong> Profile your specific use case;
          modern computers can generate millions of pseudo-random numbers per
          second, so choose based on quality needs rather than speed unless in
          extremely performance-critical scenarios.
        </p>
      </>
    ),
  },
  {
    id: "random-number-calculator-usage",
    question:
      "How do I effectively use random number generators and calculators?",
    answer: (
      <>
        <p className="mb-2">
          Effective use of random number generators requires understanding your
          specific needs, choosing appropriate settings, and interpreting
          results correctly for your application.
        </p>
        <p className="mb-2">
          <strong>Setting up generation parameters:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Range selection:</strong> Choose minimum and maximum values
            appropriate for your use case
          </li>
          <li>
            <strong>Number type:</strong> Integers for discrete values, decimals
            for continuous measurements
          </li>
          <li>
            <strong>Quantity:</strong> Generate sufficient numbers for
            statistical validity
          </li>
          <li>
            <strong>Precision:</strong> Decimal places needed based on
            application requirements
          </li>
        </ul>
        <p className="mb-2">
          <strong>Best practices for different applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Statistical sampling:</strong> Use sufficient sample size,
            consider bias prevention
          </li>
          <li>
            <strong>Simulations:</strong> Document seed values for
            reproducibility
          </li>
          <li>
            <strong>Gaming:</strong> Balance predictability and fairness
          </li>
          <li>
            <strong>Testing:</strong> Use fixed seeds for consistent test
            environments
          </li>
        </ul>
        <p className="mb-2">
          <strong>Verification and validation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Distribution check:</strong> Verify numbers spread evenly
            across range
          </li>
          <li>
            <strong>Pattern detection:</strong> Look for unexpected sequences or
            clusters
          </li>
          <li>
            <strong>Statistical tests:</strong> Apply appropriate randomness
            tests for critical applications
          </li>
          <li>
            <strong>Documentation:</strong> Record generation parameters and
            methods used
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common mistakes to avoid:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Using insufficient sample sizes for statistical analysis</li>
          <li>Applying basic generators for security-critical applications</li>
          <li>Not testing randomness quality for important applications</li>
          <li>Ignoring reproducibility requirements in research</li>
          <li>Using predictable seeds when true randomness is needed</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Random numbers generated by this tool are pseudo-random and suitable for
      general purposes, simulations, games, and educational use. They should NOT
      be used for cryptographic applications, security purposes, financial
      transactions, or any application where true randomness is critical for
      safety or security. For such applications, use cryptographically secure
      random number generators provided by your operating system or specialized
      security libraries.
    </p>
  </>
);

export default function RandomFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Random Number Generation"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="random-number-generator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/calculator", label: "Basic Calculator" },
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/triangle", label: "Triangle Calculator" },
        { href: "/standard-deviation", label: "Standard Deviation Calculator" },
      ]}
    />
  );
}
