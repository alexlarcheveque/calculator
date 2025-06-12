import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const calorieBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Calorie calculation and understanding metabolic rate are fundamental aspects of maintaining a healthy weight and optimizing energy balance. Daily calorie requirements vary significantly based on individual factors including age, gender, height, weight, and activity level. Understanding these calculations helps individuals make informed decisions about their nutrition and fitness goals.",
  },
  {
    type: "subheader",
    heading:
      "Understanding Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Basal Metabolic Rate (BMR)",
        description:
          "BMR represents the minimum calories your body needs to maintain basic physiological functions at rest, including breathing, circulation, cellular production, and brain function. It typically accounts for 60-75% of total daily calorie expenditure in sedentary individuals.",
      },
      {
        title: "Total Daily Energy Expenditure (TDEE)",
        description:
          "TDEE includes BMR plus calories burned through physical activity, exercise, and the thermic effect of food. This represents your total daily calorie needs to maintain current weight and energy balance.",
      },
      {
        title: "Activity Multipliers",
        description:
          "Activity levels are multiplied by BMR to estimate TDEE: sedentary (1.2), lightly active (1.375), moderately active (1.55), very active (1.725), and extremely active (1.9). These factors account for daily movement and exercise patterns.",
      },
      {
        title: "Individual Variation",
        description:
          "Metabolic rates can vary by 10-15% between individuals of similar size and activity level due to genetics, muscle mass, hormones, and metabolic adaptation. Calculations provide estimates that may require personalization based on results.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "BMR Calculation Methods and Formula Differences",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Mifflin-St Jeor Equation (Recommended)",
        description:
          "Most accurate for general population. Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5. Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161. Developed from more recent and diverse data.",
      },
      {
        label: "Harris-Benedict Original",
        description:
          "Older formula that tends to overestimate BMR by 5%. Men: BMR = 66 + 13.75 × weight(kg) + 5 × height(cm) - 6.75 × age. Women: BMR = 655 + 9.56 × weight(kg) + 1.85 × height(cm) - 4.68 × age.",
      },
      {
        label: "Harris-Benedict Revised",
        description:
          "Updated version of the original Harris-Benedict equation with improved accuracy. Men: BMR = 88.36 + 13.4 × weight(kg) + 4.8 × height(cm) - 5.68 × age. Women: BMR = 447.6 + 9.25 × weight(kg) + 3.1 × height(cm) - 4.33 × age.",
      },
      {
        label: "Katch-McArdle Formula",
        description:
          "Most accurate for lean individuals and athletes. Requires body fat percentage: BMR = 370 + 21.6 × lean body mass(kg). Accounts for muscle mass differences but requires accurate body composition measurement.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Factors Affecting Metabolic Rate",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "Body Composition",
        description:
          "Muscle tissue burns more calories at rest than fat tissue. Higher muscle mass increases BMR. This is why strength training can boost metabolism long-term and why athletes often have higher calorie needs.",
      },
      {
        title: "Age and Gender",
        description:
          "Metabolic rate typically decreases 1-2% per decade after age 30 due to muscle loss. Men generally have higher BMR than women due to larger muscle mass and higher testosterone levels affecting metabolism.",
      },
      {
        title: "Hormonal Factors",
        description:
          "Thyroid hormones, insulin sensitivity, cortisol levels, and sex hormones significantly impact metabolic rate. Medical conditions like hypothyroidism can reduce BMR by 10-40%.",
      },
      {
        title: "Environmental Factors",
        description:
          "Temperature extremes, altitude, caffeine, meal timing, sleep quality, and stress levels can temporarily affect metabolic rate. Consistent lifestyle patterns help maintain stable energy expenditure.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Practical Applications and Limitations",
    headingLevel: "h4",
  },
  {
    type: "text",
    content:
      "Calorie calculations provide valuable starting points for weight management goals, but individual responses vary. Metabolic adaptation, water retention, hormonal changes, and measurement errors can affect real-world results. Use calculated values as guidelines and adjust based on progress tracking over 2-4 weeks. Focus on sustainable lifestyle changes rather than precise calorie counting for long-term success.",
  },
];

export default function CalorieBasics() {
  return (
    <InfoCard
      title="Calorie Calculation Fundamentals"
      sections={calorieBasicsSections}
    />
  );
}
