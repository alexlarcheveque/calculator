import CaloriePage from "@/components/calorie/CaloriePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Calculator | Calcy.net",
  description:
    "Calculate daily calorie needs, BMR, and macronutrient requirements for weight loss, maintenance, or gain. Supports multiple BMR formulas and unit systems.",
};

export default function CalorieCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Calorie Calculator</h1>
        <p className="text-lg text-gray-700">
          Calculate your daily calorie needs and macronutrient requirements for
          your health and fitness goals.
        </p>
      </header>
      <CaloriePage />
    </div>
  );
}
