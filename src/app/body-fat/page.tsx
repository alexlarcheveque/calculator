import BodyFatPage from "@/components/body-fat/BodyFatPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator | Calcy.net",
  description:
    "Calculate body fat percentage using the U.S. Navy Method and BMI method. Get detailed analysis of body composition, ideal body fat ranges, and health recommendations.",
};

export default function BodyFatCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Body Fat Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your body fat percentage using the U.S. Navy Method and BMI
          method with detailed body composition analysis. Get ideal body fat
          ranges and personalized health recommendations.
        </p>
      </header>
      <BodyFatPage />
    </div>
  );
}
