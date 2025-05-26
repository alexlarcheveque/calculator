import { stateTaxData } from "@/utils/salesTaxCalculations";

export default function StateTaxTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        U.S. State Sales Tax Rates
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                General State Sales Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Tax Rate with Local/City Sales Tax
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stateTaxData.map((state, index) => (
              <tr
                key={state.state}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {state.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.generalStateSalesTax}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {state.maxTaxRateWithLocal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Note:</strong> Sales tax rates vary by state and locality. The
          rates shown are general state sales tax rates. Local jurisdictions may
          impose additional sales taxes.
        </p>
        <p>
          States with 0% state sales tax: Alaska, Delaware, Montana, New
          Hampshire, and Oregon. However, some local jurisdictions in these
          states may still impose sales taxes.
        </p>
      </div>
    </div>
  );
}
