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
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your ideal body weight using popular formulas including
          Robinson, Miller, Devine, and Hamwi. Compare results with healthy BMI
          ranges for comprehensive weight assessment.
        </p>
      </header>
      <IdealWeightPage />
    </div>
  );
}
