import FractionPage from "@/components/fraction/FractionPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraction Calculator | Calcy.net",
  description:
    "This free fraction calculator supports fraction addition, subtraction, multiplication, division, and conversion.",
};

export default function FractionCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Fraction Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Perform fraction addition, subtraction, multiplication, division, simplification, and conversion between fractions and decimals. Multiple calculators for comprehensive fraction operations.
        </p>
      </header>
      <FractionPage />
    </div>
  );
}
