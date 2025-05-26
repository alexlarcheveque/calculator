import {
  FinanceFormValues,
  CalculationType,
  PaymentTiming,
} from "@/types/finance";
import { formatCurrencyInput } from "@/utils/financeCalculations";
import { useState } from "react";

interface FinanceFormProps {
  values: FinanceFormValues;
  onChange: (name: string, value: number | string) => void;
  onCalculationTypeChange: (calculationType: CalculationType) => void;
}

export default function FinanceForm({
  values,
  onChange,
  onCalculationTypeChange,
}: FinanceFormProps) {
  const [showSettings, setShowSettings] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle currency inputs with comma formatting
    if (
      name === "presentValue" ||
      name === "periodicPayment" ||
      name === "futureValue"
    ) {
      const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
      onChange(name, numericValue);
    } else {
      onChange(name, parseFloat(value) || 0);
    }
  };

  const handleCurrencyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const formattedValue = formatCurrencyInput(value);
    e.target.value = formattedValue;

    const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
    onChange(name, numericValue);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleCalculate = () => {
    // Trigger recalculation by updating a dummy state
    // The actual calculation happens in the parent component via useEffect
  };

  const handleClear = () => {
    onChange("numberOfPeriods", 10);
    onChange("interestPerYear", 6);
    onChange("presentValue", 20000);
    onChange("periodicPayment", -2000);
    onChange("futureValue", -10000);
    onChange("periodsPerYear", 1);
    onChange("compoundingPerYear", 1);
    onChange("paymentTiming", PaymentTiming.END);
  };

  const formatDisplayValue = (value: number): string => {
    return value.toLocaleString("en-US");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Tab Menu */}
      <div className="mb-6">
        <div className="flex flex-wrap border-b border-gray-200">
          {Object.values(CalculationType).map((type) => (
            <button
              key={type}
              onClick={() => onCalculationTypeChange(type)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                values.calculationType === type
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Number of Periods */}
        {values.calculationType !== CalculationType.N && (
          <div className="form-group">
            <label
              htmlFor="numberOfPeriods"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              N (# of periods)
            </label>
            <input
              type="number"
              id="numberOfPeriods"
              name="numberOfPeriods"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.numberOfPeriods}
              onChange={handleChange}
              min="1"
              step="1"
            />
          </div>
        )}

        {/* Interest Per Year */}
        {values.calculationType !== CalculationType.IY && (
          <div className="form-group">
            <label
              htmlFor="interestPerYear"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              I/Y (Interest per year)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="interestPerYear"
                name="interestPerYear"
                className="block w-full pr-6 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.interestPerYear}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
            </div>
          </div>
        )}

        {/* Present Value */}
        {values.calculationType !== CalculationType.PV && (
          <div className="form-group">
            <label
              htmlFor="presentValue"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PV (Present Value)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="presentValue"
                name="presentValue"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue={formatDisplayValue(values.presentValue)}
                onChange={handleCurrencyInputChange}
              />
            </div>
          </div>
        )}

        {/* Periodic Payment */}
        {values.calculationType !== CalculationType.PMT && (
          <div className="form-group">
            <label
              htmlFor="periodicPayment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PMT (Periodic Payment)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="periodicPayment"
                name="periodicPayment"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue={formatDisplayValue(values.periodicPayment)}
                onChange={handleCurrencyInputChange}
              />
            </div>
          </div>
        )}

        {/* Future Value */}
        {values.calculationType !== CalculationType.FV && (
          <div className="form-group">
            <label
              htmlFor="futureValue"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              FV (Future Value)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="futureValue"
                name="futureValue"
                className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue={formatDisplayValue(values.futureValue)}
                onChange={handleCurrencyInputChange}
              />
            </div>
          </div>
        )}

        {/* Settings Toggle */}
        <div className="py-2">
          {!showSettings ? (
            <div className="text-center">
              <button
                onClick={() => setShowSettings(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                + Settings
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Periods Per Year */}
                <div className="form-group">
                  <label
                    htmlFor="periodsPerYear"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    P/Y (# of periods per year)
                  </label>
                  <input
                    type="number"
                    id="periodsPerYear"
                    name="periodsPerYear"
                    className="block w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.periodsPerYear}
                    onChange={handleChange}
                    min="1"
                    step="1"
                  />
                </div>

                {/* Compounding Per Year */}
                <div className="form-group">
                  <label
                    htmlFor="compoundingPerYear"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    C/Y (# of times interest compound per year)
                  </label>
                  <input
                    type="number"
                    id="compoundingPerYear"
                    name="compoundingPerYear"
                    className="block w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={values.compoundingPerYear}
                    onChange={handleChange}
                    min="1"
                    step="1"
                  />
                </div>

                {/* Payment Timing */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PMT made at the
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentTiming"
                        value={PaymentTiming.BEGINNING}
                        checked={
                          values.paymentTiming === PaymentTiming.BEGINNING
                        }
                        onChange={handleRadioChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        beginning
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentTiming"
                        value={PaymentTiming.END}
                        checked={values.paymentTiming === PaymentTiming.END}
                        onChange={handleRadioChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">end</span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">of each period</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
