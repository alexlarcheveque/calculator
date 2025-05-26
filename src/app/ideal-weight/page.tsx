import IdealWeightPage from "@/components/ideal-weight/IdealWeightPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator | Calcy.net",
  description:
    "Calculate your ideal body weight using popular formulas including Robinson, Miller, Devine, and Hamwi. Compare results with healthy BMI ranges.",
};

export default function IdealWeightCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Ideal Weight Calculator
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          The Ideal Weight Calculator computes ideal body weight (IBW) ranges
          based on height, gender, and age. The idea of finding the IBW using a
          formula has been sought after by many experts for a long time.
          Currently, there persist several popular formulas, and our Ideal
          Weight Calculator provides their results for side-to-side comparisons.
        </p>
      </header>
      <IdealWeightPage />
    </div>
  );
}
