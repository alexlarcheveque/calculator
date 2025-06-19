"use client";

import { useState } from "react";
import { PasswordResult } from "@/types/password";

interface PasswordResultsProps {
  result: PasswordResult;
}

export default function PasswordResults({ result }: PasswordResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (password: string, index: number) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-blue-600 bg-blue-50";
    if (score >= 40) return "text-yellow-600 bg-yellow-50";
    if (score >= 20) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getStrengthBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    if (score >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Result</h3>
      <p className="text-gray-600 mb-6">
        Your generated password{result.passwords.length > 1 ? "s" : ""} with
        security analysis.
      </p>

      <div className="space-y-6">
        {/* Generated Passwords */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Generated Password{result.passwords.length > 1 ? "s" : ""}
          </h4>

          <div className="space-y-3">
            {result.passwords.map((password, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border"
              >
                <div className="flex-1 mr-4">
                  <div className="font-mono text-lg break-all select-all">
                    {password}
                  </div>
                  {index === 0 && result.passwords.length === 1 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Click to select, then copy (Ctrl+C / Cmd+C)
                    </div>
                  )}
                </div>
                <button
                  onClick={() => copyToClipboard(password, index)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    copiedIndex === index
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Password Strength (for single password only) */}
        {result.passwords.length === 1 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Password Strength
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">
                  Strength Level:
                </span>
                <div className="flex items-center space-x-3">
                  <div
                    className={`px-3 py-1 rounded-lg font-medium ${getStrengthColor(
                      result.strength.score
                    )}`}
                  >
                    {result.strength.label}
                  </div>
                  <span className="text-sm text-gray-600">
                    {result.strength.score}/100
                  </span>
                </div>
              </div>

              {/* Strength Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getStrengthBarColor(
                    result.strength.score
                  )}`}
                  style={{ width: `${result.strength.score}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
