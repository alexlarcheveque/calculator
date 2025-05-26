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
        <p className="text-lg text-gray-700">
          Calculate the equivalent value of the U.S. dollar in any month from
          1925 to 2025. Calculations are based on the average Consumer Price
          Index (CPI) data for all urban consumers in the U.S.
        </p>
      </header>
      <InflationPage />
    </div>
  );
}
