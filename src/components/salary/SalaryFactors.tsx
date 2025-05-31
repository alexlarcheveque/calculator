import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salaryFactorsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Multiple factors influence salary levels across different industries and career stages. Understanding these variables helps you make strategic decisions about education, career moves, and salary negotiations to maximize your earning potential.",
  },
  {
    type: "subheader",
    heading: "Education & Skill Impact",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Educational Attainment",
        description:
          "Bachelor's degree typically increases earning potential by 30-50% over high school. Master's degrees can add another 20-30%, while specialized certifications often provide immediate salary boosts.",
      },
      {
        title: "Technical Skills",
        description:
          "In-demand technical skills (programming, data analysis, digital marketing) can command premium salaries. Continuous learning and staying current with technology trends is essential.",
      },
      {
        title: "Professional Certifications",
        description:
          "Industry-specific certifications (PMP, CPA, AWS, etc.) demonstrate expertise and can increase salary by 10-25%. Many employers offer certification bonuses or reimbursement.",
      },
      {
        title: "Soft Skills",
        description:
          "Leadership, communication, and problem-solving skills become increasingly valuable at higher career levels. These skills often determine promotion potential and executive compensation.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Experience & Career Progression",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Years of Experience",
        description:
          "Each year of relevant experience typically adds 3-5% to salary. The steepest growth usually occurs in the first 5-10 years of career progression",
      },
      {
        label: "Career Level Impact",
        description:
          "Entry-level to mid-career transitions often see 20-40% salary increases. Senior-level and executive positions can multiply salaries by 2-5x or more",
      },
      {
        label: "Industry Expertise",
        description:
          "Deep knowledge in specific industries (healthcare, finance, technology) commands premium compensation due to specialized requirements and regulatory knowledge",
      },
      {
        label: "Management Experience",
        description:
          "People management responsibilities typically increase salary by 15-30%. Budget and P&L responsibility can add even more significant premiums",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Geographic & Market Factors",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Location Impact on Salary",
      content: (
        <div>
          <p className="mb-2">
            Geographic location significantly affects salary levels:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2">High-Cost Areas:</p>
              <ul className="space-y-1">
                <li>• San Francisco Bay Area: +40-60%</li>
                <li>• New York City: +30-50%</li>
                <li>• Washington DC: +25-40%</li>
                <li>• Seattle: +20-35%</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Considerations:</p>
              <ul className="space-y-1">
                <li>• Higher cost of living</li>
                <li>• More career opportunities</li>
                <li>• Remote work changing dynamics</li>
                <li>• State tax implications</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Industry & Company Factors",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "High-Paying Industries",
        description:
          "Technology, finance, pharmaceuticals, consulting, and energy typically offer above-average compensation with strong growth potential.",
      },
      {
        title: "Company Size Impact",
        description:
          "Large corporations often pay 20-40% more than small companies but may offer less equity. Startups may offer lower base salary but significant equity upside.",
      },
      {
        title: "Public vs. Private",
        description:
          "Public companies often have structured compensation bands. Private companies may offer more flexibility but variable benefits and job security.",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Salary Equity Considerations",
      content: (
        <div>
          <p className="mb-2">
            <strong>Important factors affecting pay equity:</strong>
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              • <strong>Gender pay gap:</strong> Women earn approximately 82% of
              men's wages for similar work
            </li>
            <li>
              • <strong>Racial disparities:</strong> Significant wage gaps exist
              across racial and ethnic groups
            </li>
            <li>
              • <strong>Negotiation skills:</strong> Those who negotiate often
              earn 10-20% more than non-negotiators
            </li>
            <li>
              • <strong>Transparency trends:</strong> Pay transparency laws are
              increasing salary equity
            </li>
          </ul>
        </div>
      ),
    },
  },
];

export default function SalaryFactors() {
  return (
    <InfoCard
      title="Factors Influencing Salary Levels"
      sections={salaryFactorsSections}
    />
  );
}
