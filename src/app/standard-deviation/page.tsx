import StandardDeviationPage from "@/components/standard-deviation/StandardDeviationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Deviation Calculator | Calcy.net",
  description:
    "This free standard deviation calculator computes the standard deviation, variance, mean, sum, and error margin of a given data set.",
};

export default function StandardDeviationCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Standard Deviation Calculator
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Calculate standard deviation, variance, mean, sum, and margin of error
          for your data set.
        </p>
        <p className="text-sm text-gray-600">
          Please provide numbers separated by commas to calculate statistical
          measures.
        </p>
      </header>
      <StandardDeviationPage />
    </div>
  );
}
