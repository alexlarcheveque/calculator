"use client";

import { useState } from "react";
import Link from "next/link";

type CalculatorCategory = {
  title: string;
  items: {
    name: string;
    path: string;
  }[];
};

const calculatorCategories: CalculatorCategory[] = [
  {
    title: "Financial Calculators",
    items: [
      { name: "Mortgage Calculator", path: "/mortgage" },
      { name: "Loan Calculator", path: "/loan" },
      { name: "Auto Loan Calculator", path: "/auto-loan" },
      { name: "Interest Calculator", path: "/interest" },
      { name: "Payment Calculator", path: "/payment" },
      { name: "Retirement Calculator", path: "/retirement" },
      { name: "Amortization Calculator", path: "/amortization" },
      { name: "Investment Calculator", path: "/investment" },
      { name: "Inflation Calculator", path: "/inflation" },
      { name: "Finance Calculator", path: "/finance" },
      { name: "Income Tax Calculator", path: "/income-tax" },
      { name: "Compound Interest Calculator", path: "/compound-interest" },
      { name: "Salary Calculator", path: "/salary" },
      { name: "Interest Rate Calculator", path: "/interest-rate" },
      { name: "Sales Tax Calculator", path: "/sales-tax" },
    ],
  },
  {
    title: "Fitness & Health Calculators",
    items: [
      { name: "BMI Calculator", path: "/bmi" },
      { name: "Calorie Calculator", path: "/calorie" },
      { name: "Body Fat Calculator", path: "/body-fat" },
      { name: "BMR Calculator", path: "/bmr" },
      { name: "Ideal Weight Calculator", path: "/ideal-weight" },
      { name: "Pace Calculator", path: "/pace" },
      { name: "Pregnancy Calculator", path: "/pregnancy" },
      { name: "Pregnancy Conception Calculator", path: "/conception" },
      { name: "Due Date Calculator", path: "/due-date" },
    ],
  },
  {
    title: "Math Calculators",
    items: [
      { name: "Scientific Calculator", path: "/scientific" },
      { name: "Fraction Calculator", path: "/fraction" },
      { name: "Percentage Calculator", path: "/percentage" },
      { name: "Random Number Generator", path: "/random" },
      { name: "Triangle Calculator", path: "/triangle" },
      { name: "Standard Deviation Calculator", path: "/standard-deviation" },
    ],
  },
  {
    title: "Other Calculators",
    items: [
      { name: "Age Calculator", path: "/age" },
      { name: "Date Calculator", path: "/date" },
      { name: "Time Calculator", path: "/time" },
      { name: "Hours Calculator", path: "/hours" },
      { name: "GPA Calculator", path: "/gpa" },
      { name: "Grade Calculator", path: "/grade" },
      { name: "Concrete Calculator", path: "/concrete" },
      { name: "Subnet Calculator", path: "/subnet" },
      { name: "Password Generator", path: "/password" },
      { name: "Conversion Calculator", path: "/conversion" },
    ],
  },
];

export default function Navbar() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(
    null
  );

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const toggleMobileCategory = (title: string) => {
    setMobileOpenCategory(mobileOpenCategory === title ? null : title);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Calcy.net
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {calculatorCategories.map((category) => (
              <div key={category.title} className="relative group">
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {category.title}
                  <svg
                    className={`ml-1 inline-block w-4 h-4 transition-transform ${
                      openCategory === category.title ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openCategory === category.title && (
                  <div className="absolute z-10 left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        onClick={() => setOpenCategory(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {calculatorCategories.map((category) => (
              <div key={category.title} className="px-4">
                <button
                  onClick={() => toggleMobileCategory(category.title)}
                  className="w-full flex justify-between items-center py-2 text-base font-medium text-gray-700"
                >
                  <span>{category.title}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      mobileOpenCategory === category.title ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {mobileOpenCategory === category.title && (
                  <div className="pl-4 mt-2 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="block py-2 text-base text-gray-600 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-2 border-t border-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
