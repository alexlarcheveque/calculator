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
        <p className="text-lg text-gray-700 mb-4">
          Calculate triangle properties including sides, angles, area,
          perimeter, and more.
        </p>
        <p className="text-sm text-gray-600">
          Please provide 3 values including at least one side to calculate all
          triangle properties.
        </p>
      </header>
      <TrianglePage />
    </div>
  );
}
