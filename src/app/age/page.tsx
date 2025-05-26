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
        <p className="text-lg text-gray-700 mb-4">
          Calculate your exact age or the time interval between two dates.
        </p>
        <p className="text-sm text-gray-600">
          The calculated age will be displayed in years, months, weeks, days,
          hours, minutes, and seconds.
        </p>
      </header>
      <AgePage />
    </div>
  );
}
