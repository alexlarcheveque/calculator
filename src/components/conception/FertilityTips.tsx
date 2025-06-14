import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

export default function FertilityTips() {
  const sections: ContentSection[] = [
    {
      type: "text",
      content: (
        <>
          Optimizing fertility involves understanding your body's signals,
          making healthy lifestyle choices, and timing intercourse
          strategically. Both partners play important roles in conception
          success, and simple changes can significantly improve your chances.
        </>
      ),
    },
    {
      type: "subheader",
      heading: "Tracking Your Fertile Window",
      headingLevel: "h3",
      content: (
        <>
          The most effective approach combines multiple tracking methods to
          identify your most fertile days. Focus on timing intercourse every
          other day during your fertile window.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Natural Signs",
          description:
            "Track cervical mucus changes (clear and stretchy during fertile days), basal body temperature, and ovulation pain. These free methods provide valuable fertility insights.",
        },
        {
          title: "Modern Tools",
          description:
            "Ovulation predictor kits detect hormone surges 24-36 hours before ovulation. Fertility apps and wearable devices can help automate tracking and identify patterns.",
        },
        {
          title: "Best Timing",
          description:
            "Have intercourse every other day during your fertile window, especially the 2 days before ovulation. This ensures fresh sperm without causing depletion.",
        },
        {
          title: "Cycle Tracking",
          description:
            "Monitor your cycles for 2-3 months to identify patterns. Note cycle length, ovulation timing, and factors that might affect your cycle like stress or illness.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "Lifestyle for Fertility",
      headingLevel: "h3",
      content: (
        <>
          Healthy lifestyle choices support optimal fertility for both partners.
          Focus on nutrition, exercise, and avoiding harmful substances.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Nutrition Essentials",
          description:
            "Take folic acid (400-800 mcg daily), eat antioxidant-rich foods, include omega-3 fatty acids, and maintain a healthy weight. Stay hydrated and limit processed foods.",
        },
        {
          title: "Exercise & Sleep",
          description:
            "Moderate exercise improves fertility, but avoid excessive training. Get 7-9 hours of quality sleep and manage stress through relaxation techniques.",
        },
        {
          title: "What to Avoid",
          description:
            "Quit smoking, limit alcohol to 1-2 drinks per week, keep caffeine under 200mg daily, and minimize exposure to environmental toxins.",
        },
        {
          title: "Male Fertility",
          description:
            "Men should focus on antioxidants, avoid excessive heat (hot tubs, tight clothing), maintain healthy weight, and limit alcohol and smoking.",
        },
      ],
    },
    {
      type: "subheader",
      heading: "When to Seek Help",
      headingLevel: "h3",
      content: (
        <>
          Most couples conceive naturally, but knowing when to seek professional
          guidance can save time and reduce stress.
        </>
      ),
    },
    {
      type: "grid",
      gridCols: 2,
      gridItems: [
        {
          title: "Timing Guidelines",
          description:
            "Under 35: Try for 12 months before seeking help. Over 35: Consult a specialist after 6 months. Earlier consultation if you have known fertility concerns.",
        },
        {
          title: "Red Flags",
          description:
            "Irregular cycles (shorter than 21 days or longer than 35 days), known conditions like PCOS or endometriosis, or previous fertility issues.",
        },
      ],
    },
    {
      type: "callout",
      callout: {
        type: "success",
        title: "Stay Positive",
        content:
          "Conception is a natural process that takes time. Most healthy couples conceive within 12 months. Focus on healthy habits, be patient with your body, and don't hesitate to seek support when needed.",
      },
    },
  ];

  return <InfoCard title="Fertility Optimization Tips" sections={sections} />;
}
