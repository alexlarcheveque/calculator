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
        <p className="text-lg text-gray-700 mb-4">
          This hours calculator computes the number of hours and minutes between
          two times. A full version can calculate the hours between two times on
          different dates.
        </p>
        <p className="text-sm text-gray-600">
          Calculate time differences for work schedules, project planning, and
          time tracking with support for both 12-hour and 24-hour formats.
        </p>
      </header>
      <HoursPage />
    </div>
  );
}
