import AgePage from "@/components/age/AgePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator | Calcy.net",
  description:
    "This free age calculator computes age in terms of years, months, weeks, days, hours, minutes, and seconds, given a date of birth.",
};

export default function AgeCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Age Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your exact age or time intervals between dates in years,
          months, weeks, days, hours, minutes, and seconds. Perfect for precise
          age calculations and date planning.
        </p>
      </header>
      <AgePage />
    </div>
  );
}
