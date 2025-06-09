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
      type: "neutral",
      title: "Standard Compound Interest",
      content: (
        <div>
          <div className="font-mono text-xl text-center mb-4">
            A<sub>t</sub> = A<sub>0</sub>(1 + r)<sup>n</sup>
          </div>

          <p className="font-medium mb-3">Where:</p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>
              <strong>
                A<sub>t</sub>:
              </strong>{" "}
              Final amount after time t
            </li>
            <li>
              <strong>
                A<sub>0</sub>:
              </strong>{" "}
              Principal (initial investment)
            </li>
            <li>
              <strong>r:</strong> Annual interest rate (as decimal)
            </li>
            <li>
              <strong>n:</strong> Number of compounding periods (usually years)
            </li>
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
      type: "neutral",
      title: "Multiple Compounding Periods Per Year",
      content: (
        <div>
          <div className="font-mono text-xl text-center mb-4">
            A<sub>t</sub> = A<sub>0</sub> × (1 + r/n)<sup>nt</sup>
          </div>

          <p className="font-medium mb-3">Where:</p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4 mb-3">
            <li>
              <strong>
                A<sub>t</sub>:
              </strong>{" "}
              Final amount after time t
            </li>
            <li>
              <strong>
                A<sub>0</sub>:
              </strong>{" "}
              Principal (initial investment)
            </li>
            <li>
              <strong>r:</strong> Annual interest rate (as decimal)
            </li>
            <li>
              <strong>n:</strong> Number of compounding periods per year
            </li>
            <li>
              <strong>t:</strong> Number of years
            </li>
          </ul>

          <p className="text-sm font-medium">
            Common frequencies: Monthly (n=12), Quarterly (n=4), Daily (n=365)
          </p>
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
      type: "neutral",
      title: "Mathematical Limit of Compounding",
      content: (
        <div>
          <div className="font-mono text-xl text-center mb-4">
            A<sub>t</sub> = A<sub>0</sub>e<sup>rt</sup>
          </div>

          <p className="font-medium mb-3">Where:</p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>
              <strong>
                A<sub>t</sub>:
              </strong>{" "}
              Final amount after time t
            </li>
            <li>
              <strong>
                A<sub>0</sub>:
              </strong>{" "}
              Principal (initial investment)
            </li>
            <li>
              <strong>e:</strong> Mathematical constant (~2.718)
            </li>
            <li>
              <strong>r:</strong> Annual interest rate (as decimal)
            </li>
            <li>
              <strong>t:</strong> Number of years
            </li>
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
    type: "text",
    content:
      "Our calculator above handles all the complex computations for you. Use these formulas to understand the underlying principles and verify calculator results for your specific scenarios.",
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
