import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const autoLoanFinancingSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Where you get your auto loan can significantly impact your interest rate, monthly payment, and overall loan experience. Understanding your financing options helps you secure the best deal and avoid costly mistakes.",
  },
  {
    type: "subheader",
    heading: "Financing Source Comparison",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Banks & Credit Unions",
        description:
          "Often offer competitive rates and pre-approval. Credit unions typically have lower rates for members. Getting pre-approved gives you negotiating power at the dealership.",
      },
      {
        title: "Dealership Financing",
        description:
          "Convenient one-stop shopping, but may have higher rates. Dealers sometimes offer manufacturer incentives like 0% APR promotions that can beat bank rates.",
      },
      {
        title: "Online Lenders",
        description:
          "Quick pre-approval process and competitive rates. Good for comparing multiple offers quickly, though you'll need to coordinate payment with the dealer.",
      },
      {
        title: "Manufacturer Financing",
        description:
          "Captive finance companies (like Ford Credit, Honda Financial) often offer promotional rates and incentives, especially on new vehicles.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Getting the Best Auto Loan Rate",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Check Your Credit Score",
        description:
          "Scores above 700 typically qualify for the best rates. Get a free credit report and fix any errors before applying",
      },
      {
        label: "Shop Multiple Lenders",
        description:
          "Compare rates from banks, credit unions, and online lenders. Rate shopping within 14-45 days counts as one credit inquiry",
      },
      {
        label: "Get Pre-Approved",
        description:
          "Know your budget and rate before shopping. Pre-approval gives you negotiating power and prevents dealer markup",
      },
      {
        label: "Consider New vs. Used",
        description:
          "New cars often qualify for lower rates and longer terms. Used cars may have higher rates but cost less overall",
      },
      {
        label: "Time Your Purchase",
        description:
          "End of model years, months, and quarters often have the best manufacturer incentives and dealer motivation",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Avoid These Financing Mistakes",
      content:
        "Don't focus only on monthly payments - longer loans cost more in total interest. Always read the fine print for hidden fees. Never sign paperwork without understanding all terms and conditions.",
    },
  },
];

export default function AutoLoanFinancing() {
  return (
    <InfoCard
      title="Auto Loan Financing Options"
      sections={autoLoanFinancingSections}
    />
  );
}
