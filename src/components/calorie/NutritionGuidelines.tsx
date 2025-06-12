import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const nutritionGuidelinesSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Evidence-based nutrition guidelines provide a framework for optimal health, weight management, and athletic performance. Understanding macronutrient distribution, meal timing, and individual needs helps create sustainable eating patterns that support metabolic health and long-term wellness goals.",
  },
  {
    type: "subheader",
    heading: "Macronutrient Distribution and Requirements",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Protein Requirements",
        description:
          "General population: 0.8-1.2g per kg body weight. Athletes: 1.6-2.2g per kg. Older adults: 1.2-1.6g per kg. Protein supports muscle maintenance, immune function, and satiety. Distribute intake throughout the day for optimal muscle protein synthesis.",
      },
      {
        title: "Carbohydrate Guidelines",
        description:
          "45-65% of total calories for most people. Athletes may need 5-10g per kg body weight. Focus on complex carbohydrates from whole grains, fruits, and vegetables. Simple carbs are best around exercise for energy and recovery.",
      },
      {
        title: "Fat Intake Recommendations",
        description:
          "20-35% of total calories. Emphasize unsaturated fats from nuts, seeds, avocados, and fish. Limit saturated fat to <10% of calories. Essential fatty acids (omega-3, omega-6) support hormone production and inflammation control.",
      },
      {
        title: "Fiber and Micronutrients",
        description:
          "25-35g fiber daily from varied plant sources. Micronutrient needs are best met through diverse, nutrient-dense foods. Consider supplementation for vitamin D, B12 (vegans), and omega-3s if fish intake is low.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Weight Management Strategies",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Sustainable Calorie Deficit for Weight Loss",
        description:
          "Create a modest deficit of 300-500 calories daily for 0.5-1 lb weekly loss. Avoid extreme deficits that can slow metabolism and promote muscle loss. Focus on nutrient density to maintain health during calorie restriction.",
      },
      {
        label: "Controlled Weight Gain Approaches",
        description:
          "Add 300-500 calories above maintenance for gradual weight gain. Emphasize protein and strength training to promote muscle over fat gain. Monitor body composition changes rather than just scale weight.",
      },
      {
        label: "Plateau Prevention and Management",
        description:
          "Metabolic adaptation occurs after 4-8 weeks of calorie restriction. Implement refeed days, diet breaks, or reverse dieting to restore metabolic rate. Vary exercise routines and reassess calorie needs periodically.",
      },
      {
        label: "Maintenance Phase Strategies",
        description:
          "Gradually increase calories to maintenance level after weight loss. Focus on habits and lifestyle changes rather than strict calorie counting. Allow for flexible eating patterns while maintaining overall balance.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Meal Timing and Frequency",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Pre-Workout Nutrition",
        description:
          "Consume carbohydrates 1-3 hours before exercise for energy. Include moderate protein if more than 2 hours before. Avoid high fat or fiber immediately before training to prevent digestive issues.",
      },
      {
        title: "Post-Workout Recovery",
        description:
          "Consume protein (20-40g) and carbohydrates within 2 hours after exercise for optimal recovery. The anabolic window is longer than previously thought, but timely nutrition supports muscle adaptation.",
      },
      {
        title: "Intermittent Fasting Considerations",
        description:
          "Various protocols (16:8, 5:2) can be effective for some individuals. Benefits may come from calorie restriction rather than timing itself. Ensure adequate nutrition during eating windows.",
      },
      {
        title: "Meal Frequency Flexibility",
        description:
          "3-6 meals daily can work depending on lifestyle and preferences. Total daily intake matters more than frequency for weight management. Choose patterns that support adherence and energy levels.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Special Populations and Considerations",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Athletes and High Activity Levels",
        description:
          "Increase total calories and carbohydrates to support training demands. Protein needs rise to 1.6-2.2g per kg. Time nutrition around training for performance and recovery. Consider sports nutrition products for convenience during intense periods.",
      },
      {
        label: "Older Adults (65+ years)",
        description:
          "Higher protein needs (1.2-1.6g per kg) to prevent muscle loss. Focus on nutrient-dense foods to meet needs with potentially lower calorie intake. Consider supplementation for vitamin D, B12, and calcium.",
      },
      {
        label: "Medical Conditions",
        description:
          "Diabetes: Focus on carbohydrate consistency and glycemic control. Heart disease: Emphasize plant foods and healthy fats. Always consult healthcare providers for medical nutrition therapy when managing chronic conditions.",
      },
      {
        label: "Vegetarian and Vegan Diets",
        description:
          "Plan for complete proteins through complementary foods or quinoa, soy. Monitor B12, iron, zinc, and omega-3 status. Increase protein intake slightly (10-15%) to account for lower digestibility of plant proteins.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Practical Implementation Tips",
    headingLevel: "h4",
  },
  {
    type: "text",
    content:
      "Start with small, sustainable changes rather than drastic overhauls. Focus on adding nutrient-dense foods before restricting others. Plan and prepare meals when possible to maintain consistency. Track progress through energy levels, performance, and how you feel rather than just weight changes. Remember that optimal nutrition is individualized and may require experimentation to find what works best for your lifestyle and goals.",
  },
];

export default function NutritionGuidelines() {
  return (
    <InfoCard
      title="Evidence-Based Nutrition Guidelines"
      sections={nutritionGuidelinesSections}
    />
  );
}
