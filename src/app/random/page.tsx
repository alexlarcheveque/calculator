import RandomPage from "@/components/random/RandomPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator | Calcy.net",
  description:
    "Two free random number generators that work in user-defined min and max range. Both random integers and decimal numbers can be generated with high precision.",
};

export default function RandomNumberGeneratorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Random Number Generator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Generate random integers and decimal numbers within user-defined ranges with high precision. Features both simple and comprehensive generation modes for various applications.
        </p>
      </header>
      <RandomPage />
    </div>
  );
}
