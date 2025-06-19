"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";

type CalculatorCategory = {
  title: string;
  description: string;
  items: {
    name: string;
    path: string;
    icon: string;
  }[];
};

const calculatorCategories: CalculatorCategory[] = [
  {
    title: "Financial Calculators",
    description: "Calculate loans, investments, mortgage payments and more",
    items: [
      { name: "Mortgage Calculator", path: "/mortgage", icon: "🏠" },
      { name: "Refinance Calculator", path: "/refinance", icon: "🔄" },
      { name: "Loan Calculator", path: "/loan", icon: "💰" },
      { name: "Investment Calculator", path: "/investment", icon: "📈" },
      { name: "Retirement Calculator", path: "/retirement", icon: "🏖️" },
      {
        name: "Compound Interest Calculator",
        path: "/compound-interest",
        icon: "💸",
      },
      { name: "Amortization Calculator", path: "/amortization", icon: "📊" },
      { name: "Auto Loan Calculator", path: "/auto-loan", icon: "🚗" },
      { name: "Interest Rate Calculator", path: "/interest-rate", icon: "📊" },
      { name: "Interest Calculator", path: "/interest", icon: "💹" },
      { name: "Payment Calculator", path: "/payment", icon: "💳" },
      { name: "Sales Tax Calculator", path: "/sales-tax", icon: "🏪" },
      { name: "Income Tax Calculator", path: "/income-tax", icon: "📋" },
      { name: "Salary Calculator", path: "/salary", icon: "💼" },
      { name: "Inflation Calculator", path: "/inflation", icon: "📈" },
    ],
  },
  {
    title: "Fitness & Health Calculators",
    description: "Monitor your health metrics and fitness goals",
    items: [
      { name: "BMI Calculator", path: "/bmi", icon: "⚖️" },
      { name: "Calorie Calculator", path: "/calorie", icon: "🍎" },
      { name: "Body Fat Calculator", path: "/body-fat", icon: "💪" },
      { name: "BMR Calculator", path: "/bmr", icon: "🔥" },
      { name: "Ideal Weight Calculator", path: "/ideal-weight", icon: "📏" },
      { name: "Pregnancy Calculator", path: "/pregnancy", icon: "👶" },
      { name: "Due Date Calculator", path: "/due-date", icon: "📅" },
      { name: "Conception Calculator", path: "/conception", icon: "💕" },
    ],
  },
  {
    title: "Math Calculators",
    description: "Solve mathematical problems quickly and easily",
    items: [
      // { name: "Scientific Calculator", path: "/scientific", icon: "🔬" }, // Hidden for now - can be re-enabled later
      { name: "Fraction Calculator", path: "/fraction", icon: "½" },
      { name: "Percentage Calculator", path: "/percentage", icon: "%" },
      { name: "Random Number Generator", path: "/random", icon: "🎲" },
      { name: "Triangle Calculator", path: "/triangle", icon: "📐" },
      {
        name: "Standard Deviation Calculator",
        path: "/standard-deviation",
        icon: "📉",
      },
      { name: "GPA Calculator", path: "/gpa", icon: "🎓" },
      { name: "Grade Calculator", path: "/grade", icon: "📝" },
    ],
  },
  {
    title: "Other Calculators",
    description: "Useful tools for everyday calculations",
    items: [
      { name: "Age Calculator", path: "/age", icon: "🎂" },
      { name: "Date Calculator", path: "/date", icon: "📅" },
      { name: "Time Calculator", path: "/time", icon: "⏱️" },
      { name: "Hours Calculator", path: "/hours", icon: "🕐" },
      { name: "Pace Calculator", path: "/pace", icon: "🏃" },
      { name: "Subnet Calculator", path: "/subnet", icon: "🌐" },
      { name: "Concrete Calculator", path: "/concrete", icon: "🏗️" },
    ],
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Flatten all calculators for searching
  const allCalculators = useMemo(() => {
    return calculatorCategories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.title,
      }))
    );
  }, []);

  // Handle clicking outside search to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter calculators based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return allCalculators.filter(
      (calculator) =>
        calculator.name.toLowerCase().includes(term) ||
        calculator.category.toLowerCase().includes(term)
    );
  }, [searchTerm, allCalculators]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchResults(value.length > 0);
    setSelectedResultIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchResults || searchResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedResultIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (
          selectedResultIndex >= 0 &&
          selectedResultIndex < searchResults.length
        ) {
          window.location.href = searchResults[selectedResultIndex].path;
        } else if (searchResults.length > 0) {
          window.location.href = searchResults[0].path;
        }
        break;
      case "Escape":
        clearSearch();
        break;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to the first result
      window.location.href = searchResults[0].path;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSearchResults(false);
    setSelectedResultIndex(-1);
  };

  const handleResultClick = () => {
    clearSearch();
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mb-12 rounded-lg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Calcy.net</h1>
          <p className="text-xl mb-8">
            Your go-to resource for all types of calculations
          </p>
          <div className="max-w-md mx-auto relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative text-gray-800">
                <input
                  type="text"
                  placeholder="Search for a calculator..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="w-full py-3 px-5 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="absolute right-3 top-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((calculator, index) => (
                      <Link
                        key={calculator.path}
                        href={calculator.path}
                        onClick={handleResultClick}
                        className={`flex items-center px-4 py-3 text-gray-800 border-b border-gray-100 last:border-b-0 transition-colors ${
                          index === selectedResultIndex
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-2xl mr-3">{calculator.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{calculator.name}</div>
                          <div className="text-sm text-gray-500">
                            {calculator.category}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No calculators found for "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Calculators */}
      <h2 className="text-3xl font-bold text-center mb-12">
        Popular Calculators
      </h2>

      {/* Calculator Categories */}
      <div className="space-y-16">
        {calculatorCategories.map((category) => (
          <section key={category.title}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {category.title}
              </h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((calculator) => (
                <Link
                  key={calculator.name}
                  href={calculator.path}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{calculator.icon}</span>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {calculator.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center border-t pt-12">
        <p className="text-gray-600 mb-4">
          Choose from our wide range of calculators to help with your financial
          planning, health tracking, and more.
        </p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Calcy.net. All calculations are for
          informational purposes only.
        </p>
      </footer>
    </div>
  );
}
