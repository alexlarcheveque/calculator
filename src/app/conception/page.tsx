import ConceptionPage from "@/components/conception/ConceptionPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conception Calculator | Calcy.net",
  description:
    "This free conception calculator estimates possible as well as most likely dates of conception, and their corresponding due dates over six menstrual cycles.",
};

export default function ConceptionCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Conception Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Estimate possible and most likely conception dates with corresponding
          due dates based on menstrual cycle patterns. Calculate fertility
          windows and ovulation periods for family planning.
        </p>
      </header>
      <ConceptionPage />
    </div>
  );
}
