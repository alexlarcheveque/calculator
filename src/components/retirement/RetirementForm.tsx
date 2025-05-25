import {
  RetirementFormValues,
  IncomeAfterRetirementUnit,
  FutureSavingsUnit,
} from "@/types/retirement";

interface RetirementFormProps {
  values: RetirementFormValues;
  onChange: (
    name: string,
    value: number | IncomeAfterRetirementUnit | FutureSavingsUnit
  ) => void;
}

export default function RetirementForm({
  values,
  onChange,
}: RetirementFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "incomeAfterRetirementUnit") {
      onChange(name, value as IncomeAfterRetirementUnit);
    } else if (name === "futureSavingsUnit") {
      onChange(name, value as FutureSavingsUnit);
    } else {
      onChange(name, parseFloat(value) || 0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Retirement Planning Details
      </h2>

      <div className="space-y-4">
        {/* Current Age */}
        <div className="form-group">
          <label
            htmlFor="currentAge"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current age
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

        {/* Life Expectancy */}
        <div className="form-group">
          <label
            htmlFor="lifeExpectancy"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your life expectancy
          </label>
          <input
            type="number"
            id="lifeExpectancy"
            name="lifeExpectancy"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.lifeExpectancy}
            onChange={handleChange}
            min="65"
            max="110"
          />
          <p className="mt-1 text-xs text-gray-500">
            The average life expectancy in the U.S. is between 76 and 80 years.
          </p>
        </div>

        {/* Current Income */}
        <div className="form-group">
          <label
            htmlFor="currentIncome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current pre-tax income
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="currentIncome"
              name="currentIncome"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.currentIncome}
              onChange={handleChange}
              min="0"
              step="1000"
            />
          </div>
          <span className="text-xs text-gray-500">/year</span>
        </div>

        {/* Section Title */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">
            Assumptions
          </h3>
        </div>

        {/* Income Increase */}
        <div className="form-group">
          <label
            htmlFor="incomeIncrease"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current income increase
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="incomeIncrease"
              name="incomeIncrease"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.incomeIncrease}
              onChange={handleChange}
              min="0"
              max="20"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">/year</span>
        </div>

        {/* Income After Retirement */}
        <div className="form-group">
          <label
            htmlFor="incomeAfterRetirement"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Income needed after retirement
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 relative rounded-md shadow-sm">
              {values.incomeAfterRetirementUnit ===
                IncomeAfterRetirementUnit.DOLLAR && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              )}
              <input
                type="number"
                id="incomeAfterRetirement"
                name="incomeAfterRetirement"
                className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  values.incomeAfterRetirementUnit ===
                  IncomeAfterRetirementUnit.DOLLAR
                    ? "pl-6"
                    : ""
                }`}
                value={values.incomeAfterRetirement}
                onChange={handleChange}
                min="0"
                step={
                  values.incomeAfterRetirementUnit ===
                  IncomeAfterRetirementUnit.PERCENTAGE
                    ? "1"
                    : "1000"
                }
              />
              {values.incomeAfterRetirementUnit ===
                IncomeAfterRetirementUnit.PERCENTAGE && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              )}
            </div>
            <select
              name="incomeAfterRetirementUnit"
              value={values.incomeAfterRetirementUnit}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={IncomeAfterRetirementUnit.PERCENTAGE}>%</option>
              <option value={IncomeAfterRetirementUnit.DOLLAR}>$</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {values.incomeAfterRetirementUnit ===
            IncomeAfterRetirementUnit.PERCENTAGE
              ? "of current income"
              : "/year (today's money)"}
          </p>
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
          <span className="text-xs text-gray-500">/year</span>
        </div>

        {/* Inflation Rate */}
        <div className="form-group">
          <label
            htmlFor="inflationRate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Inflation rate
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="inflationRate"
              name="inflationRate"
              className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.inflationRate}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">/year</span>
          <p className="mt-1 text-xs text-gray-500">
            The average inflation rate is around 3.5% in the past 100 years.
          </p>
        </div>

        {/* Section Title */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">Optional</h3>
        </div>

        {/* Other Income After Retirement */}
        <div className="form-group">
          <label
            htmlFor="otherIncomeAfterRetirement"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Other income after retirement
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="otherIncomeAfterRetirement"
              name="otherIncomeAfterRetirement"
              className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.otherIncomeAfterRetirement}
              onChange={handleChange}
              min="0"
              step="100"
            />
          </div>
          <span className="text-xs text-gray-500">/month</span>
          <p className="mt-1 text-xs text-gray-500">
            Social security, pension, etc.
          </p>
        </div>

        {/* Current Retirement Savings */}
        <div className="form-group">
          <label
            htmlFor="currentRetirementSavings"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your current retirement savings
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

        {/* Future Savings */}
        <div className="form-group">
          <label
            htmlFor="futureSavings"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Future retirement savings
          </label>
          <div className="flex space-x-2">
            <div className="flex-1 relative rounded-md shadow-sm">
              {values.futureSavingsUnit === FutureSavingsUnit.DOLLAR && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              )}
              <input
                type="number"
                id="futureSavings"
                name="futureSavings"
                className={`block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  values.futureSavingsUnit === FutureSavingsUnit.DOLLAR
                    ? "pl-6"
                    : ""
                }`}
                value={values.futureSavings}
                onChange={handleChange}
                min="0"
                step={
                  values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE
                    ? "1"
                    : "100"
                }
              />
              {values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              )}
            </div>
            <select
              name="futureSavingsUnit"
              value={values.futureSavingsUnit}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={FutureSavingsUnit.PERCENTAGE}>%</option>
              <option value={FutureSavingsUnit.DOLLAR}>$</option>
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {values.futureSavingsUnit === FutureSavingsUnit.PERCENTAGE
              ? "of income"
              : "per year"}
          </p>
        </div>
      </div>
    </div>
  );
}
