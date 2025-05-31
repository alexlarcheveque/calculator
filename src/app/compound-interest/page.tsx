import CompoundInterestPage from "@/components/compound-interest/CompoundInterestPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Calcy.net",
  description:
    "Free compound interest calculator to convert and compare interest rates of different compounding periods, or to gain more knowledge on compound interest.",
};

export default function CompoundInterestCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Compound Interest Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate and compare compound interest across different compounding
          periods to maximize your investment growth. Explore the power of
          compound interest over time for financial planning.
        </p>
      </header>
      <CompoundInterestPage />
    </div>
  );
}
