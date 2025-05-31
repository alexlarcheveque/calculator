import CalculatorPage from "@/components/calculator/CalculatorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scientific Calculator | Calcy.net",
  description:
    "A comprehensive online scientific calculator with trigonometric functions, logarithms, memory operations, and keyboard support.",
};

export default function ScientificCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Scientific Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Comprehensive online scientific calculator with trigonometric
          functions, logarithms, exponentials, and memory operations. Features
          full keyboard support for efficient calculations.
        </p>
      </header>
      <CalculatorPage />
    </div>
  );
}
