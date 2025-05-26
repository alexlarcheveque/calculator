import PercentagePage from "@/components/percentage/PercentagePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator | Calcy.net",
  description:
    "This free percentage calculator computes a number of values involving percentages, including the percentage difference between two given values.",
};

export default function PercentageCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Percentage Calculator
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Calculate percentages, percentage differences, percentage changes, and
          solve common percentage problems.
        </p>
        <p className="text-sm text-gray-600">
          Please provide any two values and click "Calculate" to get the third
          value.
        </p>
      </header>
      <PercentagePage />
    </div>
  );
}
