import InterestPage from "@/components/interest/InterestPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Calculator | Calcy.net",
  description:
    "Calculate compound interest, final balance, and accumulation schedule with various contribution options.",
};

export default function InterestCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Interest Calculator
        </h1>
        <p className="text-lg text-gray-700">
          Calculate compound interest, final balance, and accumulation schedule
          with various contribution options.
        </p>
      </header>
      <InterestPage />
    </div>
  );
}
