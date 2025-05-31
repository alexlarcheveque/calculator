import HoursPage from "@/components/hours/HoursPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hours Calculator | Calcy.net",
  description:
    "This hours calculator computes the number of hours and minutes between two times. A full version can calculate the hours between two times on different dates.",
};

export default function HoursCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Hours Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate hours and minutes between two times, including support for
          different dates and time formats. Perfect for work schedules, project
          planning, and time tracking applications.
        </p>
      </header>
      <HoursPage />
    </div>
  );
}
