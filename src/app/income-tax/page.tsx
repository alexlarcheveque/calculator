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
        <p className="text-lg text-gray-700 mt-2">
          Free online income tax calculator to estimate U.S federal tax refund
          or owed amount for both salary earners and independent contractors.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          The Income Tax Calculator estimates the refund or potential owed
          amount on a federal tax return. It is mainly intended for residents of
          the U.S. and is based on the tax brackets of 2024 and 2025.
        </p>
      </header>
      <IncomeTaxPage />
    </div>
  );
}
