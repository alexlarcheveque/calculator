import {
  InvestmentFormValues,
  CalculatorType,
  CompoundFrequency,
  ContributionTiming,
  ContributionFrequency,
} from "@/types/investment";
import {
  formatCurrency,
  formatNumberWithCommas,
  parseNumberFromCommas,
} from "@/utils/investmentCalculations";
import { useState, useEffect } from "react";

interface InvestmentFormProps {
  values: InvestmentFormValues;
  onChange: (name: string, value: number | string) => void;
}

export default function InvestmentForm({
  values,
  onChange,
}: InvestmentFormProps) {
  const [displayValues, setDisplayValues] = useState({
    targetAmount: formatNumberWithCommas(values.targetAmount),
    startingAmount: formatNumberWithCommas(values.startingAmount),
    additionalContribution: formatNumberWithCommas(
      values.additionalContribution
    ),
  });

  // Sync display values when form values change externally
  useEffect(() => {
    setDisplayValues({
      targetAmount: formatNumberWithCommas(values.targetAmount),
      startingAmount: formatNumberWithCommas(values.startingAmount),
      additionalContribution: formatNumberWithCommas(
        values.additionalContribution
      ),
    });
  }, [
    values.targetAmount,
    values.startingAmount,
    values.additionalContribution,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === "calculatorType" ||
      name === "compoundFrequency" ||
      name === "contributionTiming" ||
      name === "contributionFrequency"
    ) {
      onChange(name, value);
    } else if (
      name === "targetAmount" ||
      name === "startingAmount" ||
      name === "additionalContribution"
    ) {
      // Handle currency inputs with comma formatting
      const numericValue = parseNumberFromCommas(value);
      const formattedValue =
        value === "" ? "" : formatNumberWithCommas(numericValue);

      setDisplayValues((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      onChange(name, numericValue);
    } else {
      onChange(name, parseFloat(value) || 0);
    }
  };

  const handleCalculatorTypeChange = (type: CalculatorType) => {
    onChange("calculatorType", type);
  };

  const isFieldVisible = (fieldName: string): boolean => {
    switch (values.calculatorType) {
      case CalculatorType.END_AMOUNT:
        return fieldName !== "targetAmount";
      case CalculatorType.STARTING_AMOUNT:
        return fieldName !== "startingAmount";
      case CalculatorType.RETURN_RATE:
        return fieldName !== "returnRate";
      case CalculatorType.INVESTMENT_LENGTH:
        return fieldName !== "investmentLength";
      case CalculatorType.ADDITIONAL_CONTRIBUTION:
        return fieldName !== "additionalContribution";
      default:
        return true;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Investment Calculator
      </h2>

      {/* Calculator Type Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {Object.values(CalculatorType).map((type) => (
              <button
                key={type}
                onClick={() => handleCalculatorTypeChange(type)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  values.calculatorType === type
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="space-y-4">
        {/* Target Amount - only show when calculating end amount */}
        {values.calculatorType !== CalculatorType.END_AMOUNT && (
          <div className="form-group">
            <label
              htmlFor="targetAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Target
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="targetAmount"
                name="targetAmount"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.targetAmount}
                onChange={handleChange}
                placeholder="1,000,000"
              />
            </div>
          </div>
        )}

        {/* Starting Amount */}
        {isFieldVisible("startingAmount") && (
          <div className="form-group">
            <label
              htmlFor="startingAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Starting Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="startingAmount"
                name="startingAmount"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.startingAmount}
                onChange={handleChange}
                placeholder="20,000"
              />
            </div>
          </div>
        )}

        {/* Investment Length */}
        {isFieldVisible("investmentLength") && (
          <div className="form-group">
            <label
              htmlFor="investmentLength"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              After
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="investmentLength"
                name="investmentLength"
                className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.investmentLength}
                onChange={handleChange}
                min="1"
                max="100"
                step="1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">years</span>
              </div>
            </div>
          </div>
        )}

        {/* Return Rate */}
        {isFieldVisible("returnRate") && (
          <div className="form-group">
            <label
              htmlFor="returnRate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Return Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="returnRate"
                name="returnRate"
                className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.returnRate}
                onChange={handleChange}
                min="0"
                max="50"
                step="0.1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
        )}

        {/* Compound Frequency */}
        {isFieldVisible("returnRate") && (
          <div className="form-group">
            <label
              htmlFor="compoundFrequency"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Compound
            </label>
            <select
              id="compoundFrequency"
              name="compoundFrequency"
              value={values.compoundFrequency}
              onChange={handleChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(CompoundFrequency).map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Additional Contribution */}
        {isFieldVisible("additionalContribution") && (
          <div className="form-group">
            <label
              htmlFor="additionalContribution"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Contribution
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="additionalContribution"
                name="additionalContribution"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={displayValues.additionalContribution}
                onChange={handleChange}
                placeholder="1,000"
              />
            </div>
          </div>
        )}

        {/* Contribution Timing and Frequency */}
        {isFieldVisible("additionalContribution") &&
          values.additionalContribution > 0 && (
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Settings
              </label>

              {/* Contribution Timing */}
              <div className="mb-3">
                <span className="text-sm text-gray-600">Contribute at the</span>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contributionTiming"
                      value={ContributionTiming.BEGINNING}
                      checked={
                        values.contributionTiming ===
                        ContributionTiming.BEGINNING
                      }
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      beginning
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contributionTiming"
                      value={ContributionTiming.END}
                      checked={
                        values.contributionTiming === ContributionTiming.END
                      }
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">end</span>
                  </label>
                </div>
              </div>

              {/* Contribution Frequency */}
              <div>
                <span className="text-sm text-gray-600">of each</span>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contributionFrequency"
                      value={ContributionFrequency.MONTHLY}
                      checked={
                        values.contributionFrequency ===
                        ContributionFrequency.MONTHLY
                      }
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">month</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contributionFrequency"
                      value={ContributionFrequency.ANNUALLY}
                      checked={
                        values.contributionFrequency ===
                        ContributionFrequency.ANNUALLY
                      }
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">year</span>
                  </label>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
