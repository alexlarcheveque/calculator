import CalculatorPage from "@/components/calculator/CalculatorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scientific Calculator | Calcy.net",
  description:
    "A comprehensive online scientific calculator with trigonometric functions, logarithms, memory operations, and keyboard support.",
};

export default function ScientificCalculatorRoute() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Minimalistic Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-light text-slate-800 tracking-wide">
            Scientific Calculator
          </h1>
          <div className="w-16 h-0.5 bg-blue-400 mx-auto mt-3"></div>
        </header>

        {/* Calculator Component */}
        <CalculatorPage />
      </div>
    </div>
  );
}
