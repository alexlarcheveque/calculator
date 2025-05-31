import RetirementPage from "@/components/retirement/RetirementPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator | Free Retirement Planning Tools | Calcy.net",
  description:
    "Free retirement calculators to help plan your financial future. Calculate retirement savings needed, withdrawal amounts, and how long your money will last with inflation and investment returns.",
  keywords: [
    "retirement calculator",
    "retirement planning",
    "401k calculator",
    "pension calculator",
    "retirement savings",
    "financial planning",
    "compound interest",
    "withdrawal rate",
    "retirement income",
    "investment returns",
    "inflation calculator",
    "social security",
    "IRA calculator",
    "retirement age calculator",
  ],
  openGraph: {
    title: "Retirement Calculator | Free Retirement Planning Tools",
    description:
      "Calculate how much you need to save for retirement, monthly withdrawal amounts, and make your money last with our comprehensive retirement planning calculators.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator | Free Retirement Planning Tools",
    description:
      "Calculate how much you need to save for retirement, monthly withdrawal amounts, and make your money last with our comprehensive retirement planning calculators.",
  },
};

export default function RetirementCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Retirement Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Plan your retirement with comprehensive calculators that factor in
          inflation, social security, life expectancy, and investment returns.
          Calculate savings needed and withdrawal strategies for financial
          security.
        </p>
      </header>
      <RetirementPage />
    </div>
  );
}
