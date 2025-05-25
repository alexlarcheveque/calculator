import AmortizationPage from "@/components/amortization/AmortizationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amortization Calculator | Calcy.net",
  description:
    "Calculate loan amortization schedules with monthly payments, interest breakdown, and extra payment options. Supports any fixed-rate loan including mortgages, auto loans, and personal loans.",
};

export default function AmortizationCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Amortization Calculator
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Calculate monthly payments, amortization schedules, and see the impact
          of extra payments on any loan.
        </p>
      </header>
      <AmortizationPage />
    </div>
  );
}
