import {
  FinanceFormValues,
  CalculationType,
  PaymentTiming,
} from "@/types/finance";
import { formatCurrencyInput } from "@/utils/financeCalculations";

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

  const formatDisplayValue = (value: number): string => {
    return value.toLocaleString("en-US");
  };

  const getCalculationTitle = (): string => {
    switch (values.calculationType) {
      case CalculationType.FV:
        return "Future Value Calculator";
      case CalculationType.PV:
        return "Present Value Calculator";
      case CalculationType.PMT:
        return "Payment Calculator";
      case CalculationType.N:
        return "Periods Calculator";
      case CalculationType.IY:
        return "Interest Rate Calculator";
      default:
        return "Finance Calculator";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {getCalculationTitle()}
      </h2>

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
      </div>
    </div>
  );
}
