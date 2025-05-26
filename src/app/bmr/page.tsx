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
        <p className="text-lg text-gray-700">
          Calculate your Basal Metabolic Rate using proven formulas. Get
          detailed analysis of your daily calorie needs based on activity level
          and comprehensive health recommendations.
        </p>
      </header>
      <BMRPage />
    </div>
  );
}
