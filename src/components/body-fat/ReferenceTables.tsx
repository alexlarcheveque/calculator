"use client";

import {
  getBodyFatCategories,
  getJacksonPollockData,
} from "@/utils/bodyFatCalculations";

export default function ReferenceTables() {
  const categories = getBodyFatCategories();
  const jacksonPollockData = getJacksonPollockData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Reference</h2>

      {/* American Council on Exercise Body Fat Categorization */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          The American Council on Exercise Body Fat Categorization
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Women
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Men
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.womenRange}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.menRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jackson & Pollock Ideal Body Fat Percentages */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          Jackson & Pollock Ideal Body Fat Percentages
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Age
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Women
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Men
                </th>
              </tr>
            </thead>
            <tbody>
              {jacksonPollockData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {data.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.female}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.male}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
