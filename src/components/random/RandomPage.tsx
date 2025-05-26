"use client";

import SimpleRandomGenerator from "@/components/random/SimpleRandomGenerator";
import ComprehensiveRandomGenerator from "@/components/random/ComprehensiveRandomGenerator";
import RandomEducation from "@/components/random/RandomEducation";

export default function RandomPage() {
  return (
    <div className="space-y-8">
      {/* Simple Random Generator */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <p className="text-gray-700">
            This version of the generator creates a random integer. It can deal
            with very large integers up to a few thousand digits.
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
            This version of the generator can create one or many random integers
            or decimals. It can deal with very large numbers with up to 999
            digits of precision.
          </p>
        </div>
        <ComprehensiveRandomGenerator />
      </div>

      {/* Educational Content */}
      <RandomEducation />
    </div>
  );
}
