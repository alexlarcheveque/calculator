import RefinancePage from "@/components/refinance/RefinancePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refinance Calculator | Calcy.net",
  description:
    "Free calculator to plan the refinancing of loans by comparing existing and refinanced loans side by side, with options for cash out, mortgage points, and fees.",
};

export default function RefinanceCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Refinance Calculator
        </h1>
        <p className="text-lg text-gray-700">
          A comprehensive tool for comparing your current loan with refinancing
          options
        </p>
      </header>
      <RefinancePage />
    </div>
  );
}
