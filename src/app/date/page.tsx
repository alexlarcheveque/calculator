import DatePage from "@/components/date/DatePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Calculator | Calcy.net",
  description:
    "This free date calculator computes the difference between two dates. It can also add to or subtract from a date. Both can deal with business days and holidays.",
};

export default function DateCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Date Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate the difference between two dates or add/subtract time from any date. Supports business day calculations and holiday exclusions for accurate planning.
        </p>
      </header>
      <DatePage />
    </div>
  );
}
