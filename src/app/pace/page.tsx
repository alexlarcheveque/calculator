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
        <p className="text-lg text-gray-700">
          Use the following calculator to estimate the pace for a variety of
          activities, including running, walking, and biking. The calculator can
          also be used to estimate the time taken or distance traveled with a
          given pace and time or distance.
        </p>
      </header>
      <PacePage />
    </div>
  );
}
