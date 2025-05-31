import GPAPage from "@/components/gpa/GPAPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator | Calcy.net",
  description:
    "This GPA calculator computes GPA and generates a report based on course credits and the achieved grade. It accepts both numerical and letter grades.",
};

export default function GPACalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">GPA Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your grade point average (GPA) and generate detailed reports
          based on course credits and grades. Supports both numerical and letter
          grades with flexible settings for different grading systems.
        </p>
      </header>
      <GPAPage />
    </div>
  );
}
