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
        <p className="text-lg text-gray-700 mb-4">
          Use this calculator to calculate grade point average (GPA) and
          generate a GPA report. If you use percentage grades, have grades on a
          different scale or in high school with AP/IB classes, please change
          the "Settings" to input specific values. Also use the settings to
          group courses into semesters or to include past GPA.
        </p>
        <p className="text-sm text-gray-600">
          Calculate your current GPA, plan future academic goals, and understand
          the impact of different grades on your overall academic performance.
        </p>
      </header>
      <GPAPage />
    </div>
  );
}
