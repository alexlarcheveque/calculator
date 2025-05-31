import PacePage from "@/components/pace/PacePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pace Calculator | Calcy.net",
  description:
    "Calculate pace, time, and distance for running, walking, and biking. Includes multipoint pace calculator, pace converter, and finish time estimator with world record comparisons.",
};

export default function PaceCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Pace Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate pace, time, and distance for running, walking, and biking
          activities. Features multipoint pace calculator, pace converter, and
          finish time estimator with world record comparisons.
        </p>
      </header>
      <PacePage />
    </div>
  );
}
