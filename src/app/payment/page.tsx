import PaymentPage from "@/components/payment/PaymentPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Calculator | Calcy.net",
  description:
    "Calculate monthly payment amounts or time to pay off loans using fixed term or fixed payment methods. Free payment calculator with amortization schedules.",
};

export default function PaymentCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Payment Calculator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate monthly payment amounts or determine payoff time for any
          fixed-rate loan. Features amortization schedules and flexible payment
          scenarios for comprehensive loan planning.
        </p>
      </header>
      <PaymentPage />
    </div>
  );
}
