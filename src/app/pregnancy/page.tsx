import PregnancyPage from "@/components/pregnancy/PregnancyPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Calculator | Calcy.net",
  description:
    "Calculate pregnancy due dates, gestational age, and track important milestones based on due date, last period, ultrasound, conception date, or IVF transfer date.",
};

export default function PregnancyCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Pregnancy Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate your due date, track pregnancy progress, and view important
          milestones based on various pregnancy dating methods. Supports
          multiple calculation methods for accurate pregnancy tracking.
        </p>
      </header>
      <PregnancyPage />
    </div>
  );
}
