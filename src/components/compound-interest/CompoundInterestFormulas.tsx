import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const compoundInterestFormulasSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding the mathematical formulas behind compound interest helps you better grasp how your money grows and make more informed financial decisions. Our calculator handles the complex math, but knowing the formulas provides valuable insight.",
  },
  {
    type: "subheader",
    heading: "Basic Compound Interest Formula",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Standard Compound Interest",
      content: (
        <div>
          <div className="bg-white p-3 rounded border text-center font-mono text-lg mb-3">
            A<sub>t</sub> = A<sub>0</sub>(1 + r)<sup>n</sup>
          </div>
          <p className="mb-2">
            <strong>Where:</strong>
          </p>
          <ul className="text-sm space-y-1">
            <li>
              • A<sub>t</sub> = Final amount after time t
            </li>
            <li>
              • A<sub>0</sub> = Principal (initial investment)
            </li>
            <li>• r = Annual interest rate (as decimal)</li>
            <li>• n = Number of compounding periods (usually years)</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Different Compounding Frequencies",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Multiple Compounding Periods Per Year",
      content: (
        <div>
          <div className="bg-white p-3 rounded border text-center font-mono text-lg mb-3">
            A<sub>t</sub> = A<sub>0</sub> × (1 + r/n)<sup>nt</sup>
          </div>
          <p className="mb-2">
            <strong>Where:</strong>
          </p>
          <ul className="text-sm space-y-1">
            <li>
              • A<sub>t</sub> = Final amount after time t
            </li>
            <li>
              • A<sub>0</sub> = Principal (initial investment)
            </li>
            <li>• r = Annual interest rate (as decimal)</li>
            <li>• n = Number of compounding periods per year</li>
            <li>• t = Number of years</li>
          </ul>
          <p className="mt-2 text-sm">
            <strong>Examples:</strong>
          </p>
          <ul className="text-sm space-y-1">
            <li>• Monthly: n = 12</li>
            <li>• Quarterly: n = 4</li>
            <li>• Daily: n = 365</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Continuous Compounding",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Mathematical Limit of Compounding",
      content: (
        <div>
          <div className="bg-white p-3 rounded border text-center font-mono text-lg mb-3">
            A<sub>t</sub> = A<sub>0</sub>e<sup>rt</sup>
          </div>
          <p className="mb-2">
            <strong>Where:</strong>
          </p>
          <ul className="text-sm space-y-1">
            <li>
              • A<sub>t</sub> = Final amount after time t
            </li>
            <li>
              • A<sub>0</sub> = Principal (initial investment)
            </li>
            <li>• e = Mathematical constant (~2.718)</li>
            <li>• r = Annual interest rate (as decimal)</li>
            <li>• t = Number of years</li>
          </ul>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Effective Annual Rate (APY)",
    headingLevel: "h4",
  },
  {
    type: "list",
    listItems: [
      {
        label: "APY Formula",
        description:
          "APY = (1 + r/n)ⁿ - 1, where r is nominal rate and n is compounding frequency per year",
      },
      {
        label: "Why APY Matters",
        description:
          "APY accounts for compounding effects, giving you the true annual return for comparison shopping",
      },
      {
        label: "APR vs APY",
        description:
          "APR is the simple annual rate. APY includes compounding effects and is always higher than or equal to APR",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Practical Application",
      content:
        "While these formulas are mathematically precise, our calculator above handles all the complex computations for you. Use these formulas to understand the underlying principles and verify calculator results for your specific scenarios.",
    },
  },
];

export default function CompoundInterestFormulas() {
  return (
    <InfoCard
      title="Compound Interest Formulas & Mathematics"
      sections={compoundInterestFormulasSections}
    />
  );
}
