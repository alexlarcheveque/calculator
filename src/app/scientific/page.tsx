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
        <p className="text-lg text-gray-700 mb-4">
          This is an online javascript scientific calculator. You can click the
          buttons or type to perform calculations as you would on a physical
          calculator.
        </p>
        <p className="text-sm text-gray-600">
          Features trigonometric functions, logarithms, exponentials, memory
          operations, and full keyboard support.
        </p>
      </header>
      <CalculatorPage />
    </div>
  );
}
