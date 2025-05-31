"use client";

import SimpleRandomGenerator from "@/components/random/SimpleRandomGenerator";
import ComprehensiveRandomGenerator from "@/components/random/ComprehensiveRandomGenerator";
import FAQSection from "./FAQSection";

export default function RandomPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Random Number Generator (Integer & Decimal, Pseudo-Random &
          Cryptographic)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Professional random number generator with support for integers and
          decimals, large number ranges, and multiple generation modes. Features
          pseudo-random algorithms suitable for simulations, games, statistical
          sampling, and educational purposes. Includes comprehensive controls
          for range selection, precision settings, and batch generation with up
          to 999 digits of precision.
        </p>
      </div>

      <div className="space-y-8">
        {/* Simple Random Generator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <p className="text-gray-700">
              This version of the generator creates a random integer. It can
              deal with very large integers up to a few thousand digits.
            </p>
          </div>
          <SimpleRandomGenerator />
        </div>

        {/* Comprehensive Random Generator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Comprehensive Version
          </h2>
          <div className="mb-4">
            <p className="text-gray-700">
              This version of the generator can create one or many random
              integers or decimals. It can deal with very large numbers with up
              to 999 digits of precision.
            </p>
          </div>
          <ComprehensiveRandomGenerator />
        </div>

        {/* Educational Content */}
        <FAQSection />
      </div>
    </div>
  );
}
