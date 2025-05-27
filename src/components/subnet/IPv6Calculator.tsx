"use client";

import { useState } from "react";
import { IPv6SubnetValues } from "@/types/subnet";
import { calculateIPv6Subnet } from "@/utils/subnetCalculations";
import IPv6Results from "./IPv6Results";

export default function IPv6Calculator() {
  const [formValues, setFormValues] = useState<IPv6SubnetValues>({
    ipAddress: "2001:db8:85a3::8a2e:370:7334",
    prefixLength: 64,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof IPv6SubnetValues,
    value: string | number
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculate = () => {
    const calculationResult = calculateIPv6Subnet(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      ipAddress: "",
      prefixLength: 64,
    });
    setResult(null);
  };

  // Generate prefix length options
  const prefixOptions = [];
  for (let i = 1; i <= 128; i++) {
    prefixOptions.push(i);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        IPv6 Subnet Calculator
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          {/* Prefix Length Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prefix Length:
            </label>
            <select
              value={formValues.prefixLength}
              onChange={(e) =>
                handleInputChange("prefixLength", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {prefixOptions.map((prefix) => (
                <option key={prefix} value={prefix}>
                  /{prefix}
                </option>
              ))}
            </select>
          </div>

          {/* IPv6 Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Address:
            </label>
            <input
              type="text"
              value={formValues.ipAddress}
              onChange={(e) => handleInputChange("ipAddress", e.target.value)}
              placeholder="e.g., 2001:db8:85a3::8a2e:370:7334"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ width: "100%", minWidth: "300px" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={calculate}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {result && <IPv6Results result={result} />}
    </div>
  );
}
