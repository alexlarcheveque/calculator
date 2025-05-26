"use client";

import { useState, useEffect } from "react";
import SalaryForm from "@/components/salary/SalaryForm";
import SalarySummary from "@/components/salary/SalarySummary";
import SalaryCharts from "@/components/salary/SalaryCharts";
import { calculateSalary } from "@/utils/salaryCalculations";
import { SalaryFormValues, SalaryResults, PayFrequency } from "@/types/salary";
import SalaryFAQSection from "@/components/salary/SalaryFAQSection";

export default function SalaryPage() {
  const [formValues, setFormValues] = useState<SalaryFormValues>({
    salaryAmount: 50,
    payFrequency: PayFrequency.HOURLY,
    hoursPerWeek: 40,
    daysPerWeek: 5,
    holidaysPerYear: 10,
    vacationDaysPerYear: 15,
  });

  const [results, setResults] = useState<SalaryResults | null>(null);

  useEffect(() => {
    const {
      salaryAmount,
      payFrequency,
      hoursPerWeek,
      daysPerWeek,
      holidaysPerYear,
      vacationDaysPerYear,
    } = formValues;

    if (salaryAmount <= 0 || hoursPerWeek <= 0 || daysPerWeek <= 0) {
      return;
    }

    const salaryResults = calculateSalary({
      salaryAmount,
      payFrequency,
      hoursPerWeek,
      daysPerWeek,
      holidaysPerYear,
      vacationDaysPerYear,
    });

    setResults(salaryResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | PayFrequency) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <SalaryForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <SalarySummary results={results} />
              <SalaryCharts results={results} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <SalaryFAQSection />
    </div>
  );
}
