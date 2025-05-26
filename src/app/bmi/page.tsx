import BMIPage from "@/components/bmi/BMIPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator | Calcy.net",
  description:
    "Free Body Mass Index calculator gives out the BMI value and categorizes BMI based on provided information from WHO and CDC for both adults and children.",
};

export default function BMICalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">BMI Calculator</h1>
        <p className="text-lg text-gray-700">
          Calculate your Body Mass Index (BMI) and understand your weight
          category with our comprehensive BMI calculator tool.
        </p>
      </header>
      <BMIPage />
    </div>
  );
}
