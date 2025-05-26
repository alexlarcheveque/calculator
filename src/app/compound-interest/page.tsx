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
        <p className="text-lg text-gray-700">
          Convert and compare interest rates of different compounding periods,
          and explore the power of compound interest over time.
        </p>
      </header>
      <CompoundInterestPage />
    </div>
  );
}
