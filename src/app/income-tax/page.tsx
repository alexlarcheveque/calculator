import IncomeTaxPage from "@/components/income-tax/IncomeTaxPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator | Calcy.net",
  description:
    "Free online income tax calculator to estimate U.S federal tax refund or owed amount for both salary earners and independent contractors. Calculate your 2024 and 2025 taxes with accurate tax brackets and deductions.",
};

export default function IncomeTaxCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Income Tax Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate U.S. federal tax refunds or owed amounts for 2024 and 2025
          tax years. Supports both salary earners and independent contractors
          with accurate tax brackets and deductions.
        </p>
      </header>
      <IncomeTaxPage />
    </div>
  );
}
