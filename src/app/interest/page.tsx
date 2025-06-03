import InterestPage from "@/components/interest/InterestPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Calculator | Calcy.net",
  description:
    "Calculate compound interest and projected investment growth. Features options for initial investment and regular contributions (monthly or annually).",
};

export default function InterestCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Interest Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate compound interest and projected investment growth. Features
          options for initial investment and regular contributions (monthly or
          annually).
        </p>
      </header>
      <InterestPage />
    </div>
  );
}
