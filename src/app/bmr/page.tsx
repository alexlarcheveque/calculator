import BMRPage from "@/components/bmr/BMRPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMR Calculator | Calcy.net",
  description:
    "Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Get detailed analysis of daily calorie needs based on activity level and comprehensive health recommendations.",
};

export default function BMRCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">BMR Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your Basal Metabolic Rate (BMR) using proven formulas like
          Mifflin-St Jeor and Harris-Benedict. Get detailed analysis of daily
          calorie needs based on your activity level and health goals.
        </p>
      </header>
      <BMRPage />
    </div>
  );
}
