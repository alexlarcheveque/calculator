import MortgagePage from "@/components/mortgage/MortgagePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Calcy.net",
  description:
    "Calculate monthly mortgage payments, amortization schedules, and total costs including property tax and insurance.",
};

export default function MortgageCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Mortgage Calculator
        </h1>
        <p className="text-lg text-gray-700">
          A comprehensive tool for calculating mortgage payments, amortization
          schedules, and total costs.
        </p>
      </header>
      <MortgagePage />
    </div>
  );
}
