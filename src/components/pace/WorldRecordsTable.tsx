import React from "react";
import { getWorldRecords } from "@/utils/paceCalculations";

export default function WorldRecordsTable() {
  const worldRecords = getWorldRecords();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Typical Races and World Record Paces
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Men's World Record Pace
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Women's World Record Pace
              </th>
            </tr>
          </thead>
          <tbody>
            {worldRecords.map((record, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b border-gray-200`}
              >
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                  {record.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                  {record.mensPace}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                  {record.womensPace}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
