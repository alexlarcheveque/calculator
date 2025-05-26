"use client";

import { useState } from "react";
import { CompoundingFrequency } from "@/types/compoundInterest";
import {
  calculateCompoundInterestGrowth,
  calculateSimpleInterest,
  calculateRuleOf72,
  formatCurrency,
  formatPercentage,
  getCompoundingFrequencyDisplayName,
} from "@/utils/compoundInterestCalculations";
import CompoundInterestChart from "./CompoundInterestChart";

export default function CompoundInterestExample() {
  const [principal, setPrincipal] = useState(1000);
  const [interestRate, setInterestRate] = useState(10);
  const [timeYears, setTimeYears] = useState(45);
  const [compoundingFrequency, setCompoundingFrequency] = useState(
    CompoundingFrequency.ANNUALLY
  );

  // Calculate compound interest growth
  const compoundData = calculateCompoundInterestGrowth({
    principal,
    interestRate,
    compoundingFrequency,
    timeYears,
  });

  // Calculate simple interest for comparison
  const simpleInterestData = [];
  for (let year = 0; year <= timeYears; year++) {
    const simpleInterest = calculateSimpleInterest(
      principal,
      interestRate,
      year
    );
    simpleInterestData.push({
      year,
      principal,
      interest: simpleInterest,
      totalValue: principal + simpleInterest,
    });
  }

  const finalCompoundValue = compoundData[compoundData.length - 1];
  const finalSimpleValue = simpleInterestData[simpleInterestData.length - 1];
  const ruleOf72Years = calculateRuleOf72(interestRate);

  const handleInputChange =
    (setter: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setter(value);
    };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Compound Interest Growth Example
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Principal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                value={principal}
                onChange={handleInputChange(setPrincipal)}
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="100"
                max="1000000"
                step="100"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={interestRate}
                onChange={handleInputChange(setInterestRate)}
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="0.1"
                max="50"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>

          {/* Time Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={timeYears}
                onChange={handleInputChange(setTimeYears)}
                className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="100"
                step="1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">years</span>
              </div>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) =>
                setCompoundingFrequency(e.target.value as CompoundingFrequency)
              }
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(CompoundingFrequency).map((frequency) => (
                <option key={frequency} value={frequency}>
                  {getCompoundingFrequencyDisplayName(frequency)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Compound Interest Result */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Compound Interest
          </h3>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {formatCurrency(finalCompoundValue.totalValue)}
          </div>
          <div className="text-sm text-green-700">
            Interest earned: {formatCurrency(finalCompoundValue.interest)}
          </div>
          <div className="text-xs text-green-600 mt-1">
            {((finalCompoundValue.totalValue / principal - 1) * 100).toFixed(1)}
            × growth
          </div>
        </div>

        {/* Simple Interest Comparison */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            Simple Interest
          </h3>
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {formatCurrency(finalSimpleValue.totalValue)}
          </div>
          <div className="text-sm text-orange-700">
            Interest earned: {formatCurrency(finalSimpleValue.interest)}
          </div>
          <div className="text-xs text-orange-600 mt-1">
            {((finalSimpleValue.totalValue / principal - 1) * 100).toFixed(1)}×
            growth
          </div>
        </div>

        {/* Compound vs Simple Difference */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Compound Advantage
          </h3>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {formatCurrency(
              finalCompoundValue.totalValue - finalSimpleValue.totalValue
            )}
          </div>
          <div className="text-sm text-blue-700">
            Extra earnings from compounding
          </div>
          <div className="text-xs text-blue-600 mt-1">
            Rule of 72: ~{ruleOf72Years.toFixed(1)} years to double
          </div>
        </div>
      </div>

      {/* Chart */}
      <CompoundInterestChart
        data={compoundData}
        title={`Investment Growth: ${formatCurrency(
          principal
        )} at ${formatPercentage(interestRate)} for ${timeYears} years`}
        showComparison={true}
        comparisonData={simpleInterestData}
        comparisonLabel="Simple Interest"
      />

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-800 mb-1">
              Time is Your Friend
            </div>
            <div className="text-gray-600">
              After {timeYears} years, your {formatCurrency(principal)}{" "}
              investment grows to{" "}
              {formatCurrency(finalCompoundValue.totalValue)} - that's{" "}
              {((finalCompoundValue.totalValue / principal - 1) * 100).toFixed(
                0
              )}
              % growth!
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-800 mb-1">
              Compounding Power
            </div>
            <div className="text-gray-600">
              Compound interest earns you{" "}
              {formatCurrency(
                finalCompoundValue.totalValue - finalSimpleValue.totalValue
              )}{" "}
              more than simple interest over the same period.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
