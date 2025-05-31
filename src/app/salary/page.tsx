import SalaryPage from "@/components/salary/SalaryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator | Calcy.net",
  description:
    "Convert salary amounts between hourly, daily, weekly, bi-weekly, semi-monthly, monthly, quarterly, and annual amounts. Adjustments for holidays and vacation days included.",
};

export default function SalaryCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Salary Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Convert salary amounts between hourly, daily, weekly, and annual pay
          frequencies with adjustments for holidays and vacation days. Compare
          different payment schedules and understand your true compensation.
        </p>
      </header>
      <SalaryPage />
    </div>
  );
}
