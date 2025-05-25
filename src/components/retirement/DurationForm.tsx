import { DurationFormValues } from "@/types/retirement";

interface DurationFormProps {
  values: DurationFormValues;
  onChange: (name: string, value: number) => void;
}

export default function DurationForm({ values, onChange }: DurationFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, parseFloat(value) || 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Money Duration Calculator
      </h2>

      <div className="space-y-4">
        {/* Current Amount */}
        <div className="form-group">
          <label
            htmlFor="currentAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            The amount you have
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="currentAmount"
              name="currentAmount"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.currentAmount}
              onChange={handleChange}
              min="0"
              step="10000"
            />
          </div>
        </div>

        {/* Monthly Withdrawal */}
        <div className="form-group">
          <label
            htmlFor="monthlyWithdrawal"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            You plan to withdraw
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="monthlyWithdrawal"
              name="monthlyWithdrawal"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.monthlyWithdrawal}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
          <span className="text-xs text-gray-500">/month</span>
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
