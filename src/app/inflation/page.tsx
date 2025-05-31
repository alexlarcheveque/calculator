import InflationPage from "@/components/inflation/InflationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inflation Calculator | Calcy.net",
  description:
    "Free inflation calculator that runs on U.S. CPI data or a custom inflation rate. Calculate the equivalent purchasing power of money over time.",
};

export default function InflationCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Inflation Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate the equivalent purchasing power of money over time using
          U.S. CPI data or custom inflation rates. Track how inflation affects
          dollar values from 1925 to 2025.
        </p>
      </header>
      <InflationPage />
    </div>
  );
}
