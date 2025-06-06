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
      if (value === "") {
        // Handle empty input
        setDisplayValues((prev) => ({
          ...prev,
          [name]: "",
        }));
        onChange(name, 0);
      } else {
        const numericValue = parseNumberFromCommas(value);
        // Only format if we have a valid number greater than 0
        const formattedValue =
          numericValue > 0 ? formatNumberWithCommas(numericValue) : value;

        setDisplayValues((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));

        onChange(name, numericValue);
      }
    } else {
      onChange(name, parseFloat(value) || 0);
    }
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

      <div className="space-y-6">
        {/* Basic Investment Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Investment Details
          </h3>
          <div className="space-y-4">
            {/* Target Amount - only show when calculating end amount */}
            {values.calculatorType !== CalculatorType.END_AMOUNT && (
              <div className="form-group">
                <label
                  htmlFor="targetAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Target Amount
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
                  Investment Length
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
                  Compound Frequency
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
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Additional Contributions Section */}
        {isFieldVisible("additionalContribution") && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Additional Contributions
            </h3>

            {/* Contribution Amount */}
            <div className="mb-4">
              <label
                htmlFor="additionalContribution"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contribution Amount
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

            {/* Contribution Settings - only show when amount > 0 */}
            {values.additionalContribution > 0 && (
              <div className="space-y-4">
                {/* Contribution Frequency */}
                <div>
                  <span className="text-sm font-medium text-gray-700 mb-2 block">
                    Frequency
                  </span>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          "contributionFrequency",
                          ContributionFrequency.MONTHLY
                        )
                      }
                      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        values.contributionFrequency ===
                        ContributionFrequency.MONTHLY
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          "contributionFrequency",
                          ContributionFrequency.ANNUALLY
                        )
                      }
                      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        values.contributionFrequency ===
                        ContributionFrequency.ANNUALLY
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Annually
                    </button>
                  </div>
                </div>

                {/* Contribution Timing */}
                <div>
                  <span className="text-sm font-medium text-gray-700 mb-2 block">
                    Timing
                  </span>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          "contributionTiming",
                          ContributionTiming.BEGINNING
                        )
                      }
                      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        values.contributionTiming ===
                        ContributionTiming.BEGINNING
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Beginning
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChange("contributionTiming", ContributionTiming.END)
                      }
                      className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        values.contributionTiming === ContributionTiming.END
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      End
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
