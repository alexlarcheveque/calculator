"use client";

import { useState } from "react";
import { IPv4SubnetValues, NetworkClass } from "@/types/subnet";
import {
  calculateIPv4Subnet,
  getSubnetMasksForClass,
  SUBNET_MASKS,
} from "@/utils/subnetCalculations";
import IPv4Results from "./IPv4Results";

export default function IPv4Calculator() {
  const [formValues, setFormValues] = useState<IPv4SubnetValues>({
    ipAddress: "104.172.240.252",
    subnetMask: "255.255.255.252",
    cidrNotation: 30,
    networkClass: NetworkClass.ANY,
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (
    field: keyof IPv4SubnetValues,
    value: string | number | NetworkClass
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNetworkClassChange = (networkClass: NetworkClass) => {
    setFormValues((prev) => ({
      ...prev,
      networkClass,
    }));
  };

  const handleSubnetChange = (cidr: number) => {
    const subnetMask = SUBNET_MASKS.find((mask) => mask.cidr === cidr);
    setFormValues((prev) => ({
      ...prev,
      cidrNotation: cidr,
      subnetMask: subnetMask?.mask || "",
    }));
  };

  const calculate = () => {
    const calculationResult = calculateIPv4Subnet(formValues);
    setResult(calculationResult);
  };

  const clear = () => {
    setFormValues({
      ipAddress: "",
      subnetMask: "",
      cidrNotation: 24,
      networkClass: NetworkClass.ANY,
    });
    setResult(null);
  };

  const availableSubnets =
    formValues.networkClass === NetworkClass.ANY
      ? SUBNET_MASKS
      : getSubnetMasksForClass(formValues.networkClass);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        IPv4 Subnet Calculator
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">
          {/* Network Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Network Class
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                NetworkClass.ANY,
                NetworkClass.A,
                NetworkClass.B,
                NetworkClass.C,
              ].map((classType) => (
                <label key={classType} className="flex items-center">
                  <input
                    type="radio"
                    name="networkClass"
                    value={classType}
                    checked={formValues.networkClass === classType}
                    onChange={(e) =>
                      handleNetworkClassChange(e.target.value as NetworkClass)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">{classType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subnet Mask Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subnet
            </label>
            <select
              value={formValues.cidrNotation}
              onChange={(e) => handleSubnetChange(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableSubnets.map((subnet) => (
                <option key={subnet.cidr} value={subnet.cidr}>
                  {subnet.mask} /{subnet.cidr}
                </option>
              ))}
            </select>
          </div>

          {/* IP Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Address
            </label>
            <input
              type="text"
              value={formValues.ipAddress}
              onChange={(e) => handleInputChange("ipAddress", e.target.value)}
              placeholder="e.g., 192.168.1.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={calculate}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

      {result && <IPv4Results result={result} />}
    </div>
  );
}
