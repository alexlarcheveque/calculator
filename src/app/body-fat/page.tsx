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
        <p className="text-lg text-gray-700">
          Estimate your body fat percentage using the U.S. Navy Method and BMI
          method. Get detailed analysis of your body composition and health
          recommendations.
        </p>
      </header>
      <BodyFatPage />
    </div>
  );
}
