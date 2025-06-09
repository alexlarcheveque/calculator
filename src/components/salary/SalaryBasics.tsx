import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salaryBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Understanding salary calculations is essential for career planning, budgeting, and financial decision-making. Whether you're converting between hourly wages and annual salary or planning for different pay frequencies, accurate calculations help you make informed choices.",
  },
  {
    type: "subheader",
    heading: "Salary vs. Wage Structures",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Salaried Employees",
        description:
          "Receive fixed annual compensation regardless of hours worked. Often exempt from overtime but may include benefits, job security, and career advancement opportunities.",
      },
      {
        title: "Hourly Wage Earners",
        description:
          "Paid based on actual hours worked with overtime eligibility. Provides direct correlation between time worked and compensation, offering flexibility and overtime earning potential.",
      },
      {
        title: "Contract Workers",
        description:
          "Often paid hourly or project-based rates without benefits. Typically command higher hourly rates to compensate for lack of job security and benefits.",
      },
      {
        title: "Commission-Based",
        description:
          "Earnings tied to performance or sales results. Can include base salary plus commission or be purely commission-based, offering unlimited earning potential.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Basic Salary Conversion Formulas",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Quick Conversion Reference",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="font-semibold mb-2 text-gray-800">
                Hourly to Annual:
              </p>
              <p className="mb-2 text-gray-700">
                Hourly Rate × 40 hours × 52 weeks
              </p>
              <p className="text-sm text-gray-600">
                Example: $25/hour = $52,000/year
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-800">
                Annual to Hourly:
              </p>
              <p className="mb-2 text-gray-700">Annual Salary ÷ 2,080 hours</p>
              <p className="text-sm text-gray-600">
                Example: $50,000/year = $24.04/hour
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 border-t border-gray-200 pt-3">
            * Based on standard 40-hour work week, 52 weeks per year
          </p>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Pay Frequency Impact",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Weekly (52 payments)",
        description:
          "Smallest individual payments but most frequent. Easiest for tight budgeting and matching weekly expenses like groceries",
      },
      {
        label: "Bi-weekly (26 payments)",
        description:
          "Most common frequency. Results in two 'extra' paychecks per year compared to semi-monthly, helpful for savings or debt payments",
      },
      {
        label: "Semi-monthly (24 payments)",
        description:
          "Fixed dates (typically 15th and last day). Larger payments than bi-weekly but two fewer payments per year",
      },
      {
        label: "Monthly (12 payments)",
        description:
          "Largest individual payments. Common for salaried professionals and requires careful monthly budgeting",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Adjusted vs. Unadjusted Calculations",
      content:
        "Unadjusted calculations assume you work every scheduled day. Adjusted calculations account for holidays, vacation, and sick days, providing a more realistic take-home estimate. Most employers offer 10-25 total PTO/holiday days per year.",
    },
  },
];

export default function SalaryBasics() {
  return (
    <InfoCard
      title="Understanding Salary Calculations"
      sections={salaryBasicsSections}
    />
  );
}
