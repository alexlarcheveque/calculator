import TrianglePage from "@/components/triangle/TrianglePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Triangle Calculator | Calcy.net",
  description:
    "This free triangle calculator computes the edges, angles, area, height, perimeter, median, as well as other values and a diagram of the resulting triangle.",
};

export default function TriangleCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Triangle Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate triangle properties including sides, angles, area,
          perimeter, height, and median with detailed diagrams. Provide any 3
          values including at least one side for complete analysis.
        </p>
      </header>
      <TrianglePage />
    </div>
  );
}
