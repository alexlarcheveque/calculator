import { SavingsFormValues } from "@/types/retirement";

interface SavingsFormProps {
  values: SavingsFormValues;
  onChange: (name: string, value: number) => void;
}

export default function SavingsForm({ values, onChange }: SavingsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value) || 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Savings Calculator
      </h2>

      <div className="space-y-4">
        {/* Current Age */}
        <div className="form-group">
          <label
            htmlFor="currentAge"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your age now
          </label>
          <input
            type="number"
            id="currentAge"
            name="currentAge"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.currentAge}
            onChange={handleChange}
            min="18"
            max="100"
          />
        </div>

        {/* Retirement Age */}
        <div className="form-group">
          <label
            htmlFor="retirementAge"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your planned retirement age
          </label>
          <input
            type="number"
            id="retirementAge"
            name="retirementAge"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.retirementAge}
            onChange={handleChange}
            min="50"
            max="85"
          />
        </div>

        {/* Amount Needed */}
        <div className="form-group">
          <label
            htmlFor="amountNeededAtRetirement"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount needed at the retirement age
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amountNeededAtRetirement"
              name="amountNeededAtRetirement"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.amountNeededAtRetirement}
              onChange={handleChange}
              min="0"
              step="10000"
            />
          </div>
        </div>

        {/* Current Savings */}
        <div className="form-group">
          <label
            htmlFor="currentRetirementSavings"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your retirement savings now
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="currentRetirementSavings"
              name="currentRetirementSavings"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.currentRetirementSavings}
              onChange={handleChange}
              min="0"
              step="1000"
            />
          </div>
        </div>

        {/* Investment Return */}
        <div className="form-group">
          <label
            htmlFor="averageInvestmentReturn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Average investment return
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="averageInvestmentReturn"
              name="averageInvestmentReturn"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.averageInvestmentReturn}
              onChange={handleChange}
              min="0"
              max="20"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
