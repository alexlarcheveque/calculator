import SalesTaxPage from "@/components/sales-tax/SalesTaxPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator | Calcy.net",
  description:
    "Free calculator to find the sales tax amount/rate, before tax price, and after-tax price. Also, check the sales tax rates in different states of the U.S.",
};

export default function SalesTaxCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Sales Tax Calculator
        </h1>
        <p className="text-lg text-gray-700">
          The Sales Tax Calculator can compute any one of the following, given
          inputs for the remaining two: before-tax price, sales tax rate, and
          final, or after-tax price.
        </p>
      </header>
      <SalesTaxPage />
    </div>
  );
}
