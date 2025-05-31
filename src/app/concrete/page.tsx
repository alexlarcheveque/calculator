import ConcretePage from "@/components/concrete/ConcretePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Calculator | Calcy.net",
  description:
    "This free concrete calculator estimates the amount of concrete necessary for a project and can account for different shapes and quantities.",
};

export default function ConcreteCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Concrete Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate concrete volume and weight requirements for construction
          projects including slabs, footings, columns, and stairs. Supports
          multiple shapes, units, and bag calculations.
        </p>
      </header>
      <ConcretePage />
    </div>
  );
}
