import InterestRatePage from "@/components/interest-rate/InterestRatePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interest Rate Calculator | Calcy.net",
  description:
    "Calculate the interest rate on loans with fixed terms and monthly payments. Find real interest rates when only payment information is available.",
};

export default function InterestRateCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Interest Rate Calculator
        </h1>
        <p className="text-lg text-gray-700">
          Determine real interest rates on loans with fixed terms and monthly
          payments.
        </p>
      </header>
      <InterestRatePage />
    </div>
  );
}
