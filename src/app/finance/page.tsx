import FinancePage from "@/components/finance/FinancePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Calculator | Calcy.net",
  description:
    "Calculate the time value of money including Future Value (FV), Present Value (PV), Periodic Payment (PMT), Number of Periods (N), and Interest Rate (I/Y).",
};

export default function FinanceCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Finance Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate the time value of money including Future Value (FV), Present
          Value (PV), Periodic Payment (PMT), Number of Periods (N), and
          Interest Rate (I/Y) for comprehensive financial planning.
        </p>
      </header>
      <FinancePage />
    </div>
  );
}
