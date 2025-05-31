"use client";

import { useState } from "react";
import BasicFractionCalculator from "@/components/fraction/BasicFractionCalculator";
import MixedNumberCalculator from "@/components/fraction/MixedNumberCalculator";
import SimplifyFractionCalculator from "@/components/fraction/SimplifyFractionCalculator";
import DecimalToFractionCalculator from "@/components/fraction/DecimalToFractionCalculator";
import FractionToDecimalCalculator from "@/components/fraction/FractionToDecimalCalculator";
import BigNumberFractionCalculator from "@/components/fraction/BigNumberFractionCalculator";
import FAQSection from "./FAQSection";
import { CalculatorType } from "@/types/fraction";

export default function FractionPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(
    CalculatorType.BASIC
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Fraction Calculator (Add, Subtract, Multiply, Divide & Simplify
          Fractions)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Comprehensive fraction calculator with multiple calculation modes for
          basic operations, mixed numbers, simplification, and decimal
          conversions. Features automatic simplification, step-by-step
          solutions, and support for large numbers. Perfect for students,
          teachers, cooks, builders, and anyone working with fractional
          measurements and calculations.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Fraction Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <BasicFractionCalculator />
        </div>

        {/* Mixed Numbers Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mixed Numbers Calculator
          </h2>
          <MixedNumberCalculator />
        </div>

        {/* Simplify Fractions Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Simplify Fractions Calculator
          </h2>
          <SimplifyFractionCalculator />
        </div>

        {/* Decimal to Fraction Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Decimal to Fraction Calculator
          </h2>
          <DecimalToFractionCalculator />
        </div>

        {/* Fraction to Decimal Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Fraction to Decimal Calculator
          </h2>
          <FractionToDecimalCalculator />
        </div>

        {/* Big Number Fraction Calculator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Big Number Fraction Calculator
          </h2>
          <p className="text-gray-600 mb-4">
            Use this calculator if the numerators or denominators are very big
            integers.
          </p>
          <BigNumberFractionCalculator />
        </div>

        {/* Educational Content */}
        <FAQSection />
      </div>
    </div>
  );
}
