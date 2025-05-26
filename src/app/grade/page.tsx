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
        <p className="text-lg text-gray-700 mb-4">
          Use this calculator to find out the grade of a course based on
          weighted averages. This calculator accepts both numerical as well as
          letter grades. It also can calculate the grade needed for the
          remaining assignments in order to get a desired grade for an ongoing
          course.
        </p>
        <p className="text-sm text-gray-600">
          Calculate weighted grades, plan for final exams, and understand how
          different assignments contribute to your overall course grade with
          flexible grading formats and weight systems.
        </p>
      </header>
      <GradePage />
    </div>
  );
}
