import DueDatePage from "@/components/duedate/DueDatePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator | Calcy.net",
  description:
    "Calculate your pregnancy due date based on last menstrual period, ultrasound, conception date, or IVF transfer date. Track pregnancy milestones and important dates throughout your pregnancy journey.",
};

export default function DueDateCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Pregnancy Due Date Calculator
        </h1>
        <p className="text-lg text-gray-700">
          Estimate your baby's due date and track important pregnancy milestones
          based on your last menstrual period, ultrasound, conception date, or
          IVF transfer.
        </p>
      </header>
      <DueDatePage />
    </div>
  );
}
