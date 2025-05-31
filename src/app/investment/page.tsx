import InvestmentPage from "@/components/investment/InvestmentPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Calculator | Calcy.net",
  description:
    "Calculate investment returns, compound interest, and accumulation schedules. Find required starting amounts, return rates, or investment lengths to reach your financial goals.",
};

export default function InvestmentCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Investment Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate investment returns, compound interest, and accumulation
          schedules to reach your financial goals. Determine required starting
          amounts, return rates, or investment timelines for strategic planning.
        </p>
      </header>
      <InvestmentPage />
    </div>
  );
}
