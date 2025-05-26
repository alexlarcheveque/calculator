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
        <p className="text-lg text-gray-700 mb-4">
          Below are multiple fraction calculators capable of addition,
          subtraction, multiplication, division, simplification, and conversion
          between fractions and decimals.
        </p>
        <p className="text-sm text-gray-600">
          Fields above the solid black line represent the numerator, while
          fields below represent the denominator.
        </p>
      </header>
      <FractionPage />
    </div>
  );
}
