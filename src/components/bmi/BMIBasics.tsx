import InfoCard, { ContentSection } from "@/components/ui/InfoCard";

const bmiBasicsSections: ContentSection[] = [
  {
    type: "text",
    content:
      "Body Mass Index (BMI) is a widely used measurement tool that helps assess whether an individual has a healthy weight for their height. Understanding BMI calculations, categories, and limitations provides valuable insights for health monitoring, though it should be considered alongside other health indicators for a complete wellness picture.",
  },
  {
    type: "subheader",
    heading: "How BMI Works and Calculation Methods",
    headingLevel: "h3",
  },
  {
    type: "grid",
    gridCols: 2,
    gridItems: [
      {
        title: "BMI Formula",
        description:
          "BMI = weight (kg) ÷ height (m)². For pounds and inches: BMI = (weight × 703) ÷ height². This simple calculation provides a standardized way to assess weight relative to height across different populations.",
      },
      {
        title: "Unit Conversions",
        description:
          "Imperial: weight in pounds, height in inches. Metric: weight in kilograms, height in meters. The formula automatically adjusts using conversion factor 703 for imperial measurements to maintain consistency.",
      },
      {
        title: "Interpretation Range",
        description:
          "BMI values typically range from 15-50, with most healthy adults falling between 18.5-24.9. Values outside normal ranges may indicate health risks that warrant medical consultation and lifestyle evaluation.",
      },
      {
        title: "Population Standards",
        description:
          "BMI categories are based on extensive population studies linking weight ranges to health outcomes. These standards help healthcare providers identify potential health risks and guide treatment recommendations.",
      },
    ],
  },
  {
    type: "subheader",
    heading: "BMI Categories and Health Implications",
    headingLevel: "h3",
  },
  {
    type: "callout",
    callout: {
      type: "neutral",
      title: "Official BMI Classification System",
      content: (
        <div>
          <div className="space-y-3 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Underweight Categories:</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    • <strong>Severe Thinness:</strong> BMI &lt; 16
                  </li>
                  <li>
                    • <strong>Moderate Thinness:</strong> BMI 16-17
                  </li>
                  <li>
                    • <strong>Mild Thinness:</strong> BMI 17-18.5
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Normal and Overweight:</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    • <strong>Normal Weight:</strong> BMI 18.5-24.9
                  </li>
                  <li>
                    • <strong>Overweight:</strong> BMI 25-29.9
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Obesity Classifications:</p>
              <ul className="space-y-1 text-sm">
                <li>
                  • <strong>Class I Obesity:</strong> BMI 30-34.9 (Low risk)
                </li>
                <li>
                  • <strong>Class II Obesity:</strong> BMI 35-39.9 (Moderate
                  risk)
                </li>
                <li>
                  • <strong>Class III Obesity:</strong> BMI ≥ 40 (High risk)
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    type: "subheader",
    heading: "Understanding BMI Limitations in Modern Health Assessment",
    headingLevel: "h3",
  },
  {
    type: "list",
    listItems: [
      {
        label: "Muscle vs. Fat Composition",
        description:
          "BMI doesn't distinguish between muscle and fat mass. Athletes and bodybuilders may have high BMI due to muscle mass while having low body fat percentages, leading to potentially misleading classifications",
      },
      {
        label: "Age and Gender Variations",
        description:
          "BMI standards were developed primarily from young to middle-aged adult populations. Older adults may have different healthy weight ranges, and gender differences in body composition aren't fully captured",
      },
      {
        label: "Ethnic and Genetic Factors",
        description:
          "Different ethnic groups may have varying body compositions and health risks at the same BMI levels. Asian populations, for example, may have higher health risks at lower BMI thresholds",
      },
      {
        label: "Overall Health Context",
        description:
          "BMI is one metric among many. Blood pressure, cholesterol levels, fitness level, waist circumference, and family history provide a more complete health picture than BMI alone",
      },
    ],
  },
  {
    type: "subheader",
    heading: "Alternative and Complementary Measurements",
    headingLevel: "h4",
  },
  {
    type: "callout",
    callout: {
      type: "info",
      title: "Modern Body Composition Assessment Tools",
      content: (
        <div>
          <ul className="space-y-2 text-sm mt-4">
            <li>
              • <strong>Waist-to-Hip Ratio:</strong> Measures fat distribution,
              particularly useful for identifying abdominal obesity risks
            </li>
            <li>
              • <strong>Body Fat Percentage:</strong> DEXA scans, bioelectrical
              impedance provide more detailed composition analysis
            </li>
            <li>
              • <strong>Waist Circumference:</strong> Simple measurement that
              correlates well with abdominal fat and health risks
            </li>
            <li>
              • <strong>BMI Prime:</strong> BMI divided by upper limit of normal
              BMI (25), showing how far above or below optimal weight
            </li>
            <li>
              • <strong>Ponderal Index:</strong> Weight divided by height cubed,
              may be more accurate for very tall or short individuals
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            <strong>Recommendation:</strong> Use BMI as a starting point, but
            combine with other measurements and professional medical assessment
            for comprehensive health evaluation
          </p>
        </div>
      ),
    },
  },
];

export default function BMIBasics() {
  return (
    <InfoCard
      title="Understanding Body Mass Index (BMI) Fundamentals"
      sections={bmiBasicsSections}
    />
  );
}
