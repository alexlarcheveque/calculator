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
        <p className="text-lg text-gray-700">
          A versatile tool for various loan types including amortized, deferred
          payment, and bonds.
        </p>
      </header>
      <LoanPage />
    </div>
  );
}
