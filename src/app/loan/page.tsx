import LoanPage from "@/components/loan/LoanPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator | Calcy.net",
  description:
    "Calculate payments, interest, and schedules for amortized loans, deferred payment loans, and bonds.",
};

export default function LoanCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Loan Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate payments, interest, and amortization schedules for amortized
          loans, deferred payment loans, and bonds. Versatile tool for all loan
          types and payment scenarios.
        </p>
      </header>
      <LoanPage />
    </div>
  );
}
