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
        <p className="text-lg text-gray-700">
          The Conception Calculator estimates a range of days during which a
          woman is most likely to conceive, as well as a corresponding due date
          based on a woman's average menstrual cycle.
        </p>
      </header>
      <ConceptionPage />
    </div>
  );
}
