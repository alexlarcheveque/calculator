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
        <p className="text-lg text-gray-700">
          This finance calculator can be used to calculate the future value
          (FV), periodic payment (PMT), interest rate (I/Y), number of
          compounding periods (N), and PV (Present Value). Each of the following
          tabs represents the parameters to be calculated.
        </p>
      </header>
      <FinancePage />
    </div>
  );
}
