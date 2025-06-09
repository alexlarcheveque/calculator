import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const salaryNegotiationSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Effective salary negotiation can significantly impact your lifetime earnings. Research shows that those who negotiate their starting salary can earn hundreds of thousands more over their career. Understanding when and how to negotiate is crucial for career success.",
  },
  {
    type: "subheader",
    heading: "When to Negotiate Salary",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Job Offer Stage",
        description:
          "The best time to negotiate is after receiving an offer but before accepting. You have maximum leverage when the employer has decided they want you but before you've committed.",
      },
      {
        title: "Annual Reviews",
        description:
          "Performance review periods are ideal for salary discussions. Prepare documentation of achievements, contributions, and market research to support your request.",
      },
      {
        title: "Role Expansion",
        description:
          "When taking on additional responsibilities, managing new teams, or leading major projects, it's appropriate to discuss compensation adjustments.",
      },
      {
        title: "Market Changes",
        description:
          "If industry salaries have increased significantly or you've gained valuable certifications, schedule a meeting to discuss compensation alignment.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Negotiation Preparation",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Research Market Rates",
        description:
          "Use salary surveys, Glassdoor, PayScale, and industry reports to understand compensation ranges for your role, experience level, and location",
      },
      {
        label: "Document Your Value",
        description:
          "Compile specific examples of achievements, cost savings, revenue generation, or process improvements you've contributed to the organization",
      },
      {
        label: "Know Your Worth",
        description:
          "Calculate your total compensation including benefits, not just base salary. Consider health insurance, retirement matching, PTO, and other perks",
      },
      {
        label: "Practice Your Pitch",
        description:
          "Rehearse your negotiation conversation focusing on your value proposition rather than personal financial needs or demands",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Negotiation Strategies",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Effective Negotiation Tactics",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold my-2">✅ Do:</p>
              <ul className="space-y-1">
                <li>• Express enthusiasm for the role</li>
                <li>• Present data-driven arguments</li>
                <li>• Ask for time to consider offers</li>
                <li>• Negotiate total compensation package</li>
                <li>• Be professional and respectful</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold my-2">❌ Don't:</p>
              <ul className="space-y-1">
                <li>• Make ultimatums or threats</li>
                <li>• Focus on personal financial needs</li>
                <li>• Accept the first offer immediately</li>
                <li>• Negotiate via email only</li>
                <li>• Compare only to one data point</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Beyond Base Salary",
    headingLevel: "h4",
  },
  {
    type: "grid",
    gridCols: 3,
    gridItems: [
      {
        title: "Variable Compensation",
        description:
          "Bonuses, commissions, profit-sharing, and stock options can significantly increase total compensation. Understand vesting schedules and performance metrics.",
      },
      {
        title: "Benefits & Perks",
        description:
          "Health insurance, retirement matching, flexible work arrangements, professional development, and additional PTO can add substantial value.",
      },
      {
        title: "Career Development",
        description:
          "Negotiate for training budgets, conference attendance, mentoring programs, or clear promotion timelines that invest in your future earning potential.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Long-Term Salary Growth",
    headingLevel: "h4",
  },

  {
    type: "list",
    listItems: [
      {
        label: "Skill development",
        description:
          "Continuously learn in-demand skills and technologies relevant to your field",
      },
      {
        label: "Network building",
        description:
          "Maintain professional relationships that can lead to opportunities and referrals",
      },
      {
        label: "Performance tracking",
        description:
          "Document achievements quarterly to support regular salary discussions",
      },
      {
        label: "Strategic job changes",
        description:
          "Well-timed moves to new companies can accelerate salary growth",
      },
      {
        label: "Leadership development",
        description:
          "Seek management or mentoring opportunities to qualify for higher-level roles",
      },
    ],
  },
];

export default function SalaryNegotiation() {
  return (
    <InfoCard
      title="Salary Negotiation & Career Growth"
      sections={salaryNegotiationSections}
    />
  );
}
