import AutoLoanPage from "@/components/auto-loan/AutoLoanPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator | Calcy.net",
  description:
    "Calculate car loan payments, total costs, and amortization schedules with adjustments for taxes, fees, and trade-ins.",
};

export default function AutoLoanCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Auto Loan Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate auto loan payments, total costs, and amortization schedules
          with adjustments for taxes, fees, and trade-ins. Essential for car
          buyers comparing financing options and loan terms.
        </p>
      </header>
      <AutoLoanPage />
    </div>
  );
}
