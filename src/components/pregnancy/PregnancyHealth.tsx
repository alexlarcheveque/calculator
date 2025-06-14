import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function PregnancyHealth() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Proper prenatal care and healthy lifestyle choices during pregnancy
          are essential for both maternal and fetal health. Regular medical
          checkups, proper nutrition, and avoiding harmful substances help
          ensure the best possible outcomes.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "Prenatal Care Schedule",
      headingLevel: "h3",
      content: (
        <>
          Regular prenatal visits allow healthcare providers to monitor your
          health and your baby's development, catch potential issues early, and
          provide guidance throughout your pregnancy.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 3,
      gridItems: [
        {
          title: "First Trimester",
          description:
            "Initial visit: 8-10 weeks\nMonthly visits\nBlood tests and screenings\nFirst ultrasound\nGenetic counseling if needed",
        },
        {
          title: "Second Trimester",
          description:
            "Visits every 4 weeks\nAnatomy scan (18-22 weeks)\nGlucose screening (24-28 weeks)\nBlood pressure monitoring\nWeight gain assessment",
        },
        {
          title: "Third Trimester",
          description:
            "Every 2 weeks until 36 weeks\nWeekly visits after 36 weeks\nGroup B strep test\nFetal monitoring\nBirth plan discussion",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Important Tests and Screenings",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "First Trimester Screening (10-13 weeks)",
          description:
            "Blood test and ultrasound to assess risk for chromosomal abnormalities",
        },
        {
          label: "Anatomy Scan (18-22 weeks)",
          description:
            "Detailed ultrasound to check fetal development and detect abnormalities",
        },
        {
          label: "Glucose Screening (24-28 weeks)",
          description:
            "Test for gestational diabetes, may require follow-up glucose tolerance test",
        },
        {
          label: "Group B Strep Test (35-37 weeks)",
          description:
            "Screening for bacteria that could affect baby during delivery",
        },
        {
          label: "Non-Stress Test (if needed)",
          description:
            "Monitors fetal heart rate and movement, typically in high-risk pregnancies",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Nutrition and Lifestyle",
      headingLevel: "h3",
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Essential Nutrients",
          description:
            "Folic acid: 400-800 mcg daily\nIron: 27 mg daily\nCalcium: 1000 mg daily\nDHA: 200-300 mg daily\nVitamin D: 600 IU daily",
        },
        {
          title: "Foods to Avoid",
          description:
            "Raw or undercooked meats\nHigh-mercury fish\nUnpasteurized products\nExcessive caffeine\nAlcohol and tobacco",
        },
        {
          title: "Healthy Weight Gain",
          description:
            "Underweight: 28-40 lbs\nNormal weight: 25-35 lbs\nOverweight: 15-25 lbs\nObese: 11-20 lbs",
        },
        {
          title: "Safe Exercise",
          description:
            "Walking and swimming\nPrenatal yoga\nLow-impact aerobics\nAvoid contact sports\n30 minutes most days",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Warning Signs to Watch For",
      headingLevel: "h3",
    },
    {
      type: "list",
      listItems: [
        {
          label: "Severe abdominal pain",
          description:
            "Could indicate ectopic pregnancy, placental abruption, or other complications",
        },
        {
          label: "Heavy bleeding",
          description: "More than light spotting, especially with cramping",
        },
        {
          label: "Severe headaches",
          description:
            "Persistent headaches, especially with vision changes or swelling",
        },
        {
          label: "Decreased fetal movement",
          description:
            "Significant reduction in baby's movements after 28 weeks",
        },
        {
          label: "Signs of preterm labor",
          description:
            "Regular contractions, pelvic pressure, or fluid leakage before 37 weeks",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "warning",
        title: "Emergency Situations",
        content:
          "Contact your healthcare provider immediately if you experience severe bleeding, intense abdominal pain, signs of preeclampsia (severe headache, vision changes, upper abdominal pain), or any concerns about your baby's movements.",
      },
    },
  ];

  return (
    <InfoCard title="Pregnancy Health & Prenatal Care" sections={sections} />
  );
}
