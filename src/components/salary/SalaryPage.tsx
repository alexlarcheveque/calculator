"use client";

import { useState, useEffect } from "react";
import SalaryForm from "@/components/salary/SalaryForm";
import SalarySummary from "@/components/salary/SalarySummary";
import SalaryCharts from "@/components/salary/SalaryCharts";
import SalaryBasics from "@/components/salary/SalaryBasics";
import SalaryFactors from "@/components/salary/SalaryFactors";
import SalaryNegotiation from "@/components/salary/SalaryNegotiation";
import SalaryFAQSection from "@/components/salary/SalaryFAQSection";
import { calculateSalary } from "@/utils/salaryCalculations";
import { SalaryFormValues, SalaryResults, PayFrequency } from "@/types/salary";

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Salary Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Convert between hourly wages and annual salaries with precision.
          Calculate adjusted pay accounting for holidays and vacation time.
          Compare different pay frequencies and understand the impact of work
          schedules on your total compensation. Perfect for salary negotiations,
          job comparisons, and career planning.
        </p>
      </div>

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

          {!results && (
            <p className="text-center text-gray-500 lg:mt-20">
              Enter salary details to see calculations and comparisons.
            </p>
          )}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <SalaryBasics />
        <SalaryFactors />
        <SalaryNegotiation />
      </div>

      {/* FAQ Section */}
      <SalaryFAQSection />
    </div>
  );
}
