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
        <p className="text-lg text-gray-700 mb-4">
          The Concrete Calculator estimates the volume and weight of concrete
          necessary to cover a given area. Purchasing slightly more concrete
          than the estimated result can reduce the probability of having
          insufficient concrete.
        </p>
        <p className="text-sm text-gray-600">
          Calculate concrete requirements for slabs, footings, columns, curbs,
          stairs, and more with support for multiple units and bag calculations.
        </p>
      </header>
      <ConcretePage />
    </div>
  );
}
