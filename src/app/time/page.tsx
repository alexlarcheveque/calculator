import TimePage from "@/components/time/TimePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Calculator | Calcy.net",
  description:
    "This free time calculator can add or subtract time values in terms of number of days, hours, minutes, or seconds. Also, learn the different concepts of time.",
};

export default function TimeCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Time Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Add or subtract time values in days, hours, minutes, and seconds with
          support for complex time expressions. Calculate new dates and times
          with precision for scheduling and planning.
        </p>
      </header>
      <TimePage />
    </div>
  );
}
