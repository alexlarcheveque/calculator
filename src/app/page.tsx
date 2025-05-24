"use client";

import Link from "next/link";

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
    ],
  },
  {
    title: "Math Calculators",
    description: "Solve mathematical problems quickly and easily",
    items: [
      { name: "Scientific Calculator", path: "/scientific", icon: "🔬" },
      { name: "Fraction Calculator", path: "/fraction", icon: "½" },
      { name: "Percentage Calculator", path: "/percentage", icon: "%" },
      { name: "Random Number Generator", path: "/random", icon: "🎲" },
      { name: "Triangle Calculator", path: "/triangle", icon: "📐" },
      {
        name: "Standard Deviation Calculator",
        path: "/standard-deviation",
        icon: "📉",
      },
    ],
  },
  {
    title: "Other Calculators",
    description: "Useful tools for everyday calculations",
    items: [
      { name: "Age Calculator", path: "/age", icon: "🗓️" },
      { name: "Date Calculator", path: "/date", icon: "📅" },
      { name: "Time Calculator", path: "/time", icon: "⏱️" },
      { name: "GPA Calculator", path: "/gpa", icon: "🎓" },
      { name: "Password Generator", path: "/password", icon: "🔒" },
      { name: "Conversion Calculator", path: "/conversion", icon: "🔄" },
    ],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mb-12 rounded-lg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Calcy.net</h1>
          <p className="text-xl mb-8">
            Your go-to resource for all types of calculations
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative text-gray-800">
              <input
                type="text"
                placeholder="Search for a calculator..."
                className="w-full py-3 px-5 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-3 top-3">
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
