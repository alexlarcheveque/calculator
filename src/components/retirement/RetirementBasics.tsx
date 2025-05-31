import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const retirementBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Retirement is the withdrawal from active working life, typically lasting for the rest of a person's life. Understanding the fundamentals of retirement planning helps ensure you can maintain your desired lifestyle without working income.",
  },
  {
    type: "subheader",
    heading: "Why Do People Retire?",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Health Considerations",
        description:
          "Physical or mental health changes can affect job performance. Some workers retire due to disability, chronic illness, or declining capacity to perform their duties safely and effectively.",
      },
      {
        title: "Work-Life Balance",
        description:
          "Job stress, long hours, or desire for more personal time can motivate retirement. Many want to spend more time with family, pursue hobbies, or travel while they're still healthy.",
      },
      {
        title: "Financial Readiness",
        description:
          "Having sufficient savings and income sources (pensions, Social Security, investments) makes retirement financially feasible. This is often the determining factor in retirement timing.",
      },
      {
        title: "Age Factors",
        description:
          "While retirement can theoretically happen at any age, it typically occurs between 55-70. Some choose to semi-retire by gradually reducing work hours before full retirement.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Financial Reality of Retirement",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Social Security Limitations",
        description:
          "Social Security only replaces about 40% of pre-retirement income for average workers - insufficient for most people's needs",
      },
      {
        label: "Healthcare Costs",
        description:
          "Medical expenses often increase in retirement, and Medicare doesn't cover everything. Long-term care can be especially expensive",
      },
      {
        label: "Inflation Impact",
        description:
          "Rising costs reduce purchasing power over time. What costs $100 today could cost $180+ in 20 years with 3% inflation",
      },
      {
        label: "Longevity Risk",
        description:
          "Many retirees live 20-30+ years in retirement. Your savings must last decades, not just a few years",
      },
    ],
  },
  {
    type: "callout",
    callout: {
      type: "warning",
      title: "Planning is Essential",
      content:
        "Retiring without adequate savings and relying solely on Social Security is financially risky. The income gap between working wages and Social Security benefits is typically too large to maintain your current lifestyle.",
    },
  },
];

export default function RetirementBasics() {
  return (
    <InfoCard
      title="Understanding Retirement"
      sections={retirementBasicsSections}
    />
  );
}
