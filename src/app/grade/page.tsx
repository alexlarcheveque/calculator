import GradePage from "@/components/grade/GradePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grade Calculator | Calcy.net",
  description:
    "This free grade calculator can calculate a weighted average grade. It accepts both numerical as well as letter grades.",
};

export default function GradeCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Grade Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate weighted grades and determine what scores you need on
          remaining assignments to achieve your target grade. Supports both
          numerical and letter grades with flexible weighting systems.
        </p>
      </header>
      <GradePage />
    </div>
  );
}
