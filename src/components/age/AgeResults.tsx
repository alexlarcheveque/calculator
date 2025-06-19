"use client";

import { AgeResult } from "@/types/age";
import {
  formatNumber,
  formatDate,
  calculateLifeStatistics,
  getLifeMilestones,
  getBirthDayInfo,
} from "@/utils/ageCalculations";

interface AgeResultsProps {
  result: AgeResult;
}

export default function AgeResults({ result }: AgeResultsProps) {
  const lifeStats = calculateLifeStatistics(result);
  const milestones = getLifeMilestones(result.birthDate, result.targetDate);
  const birthInfo = getBirthDayInfo(result.birthDate);

  return (
    <div className="bg-white border border-gray-200 rounded-lg my-12 p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Age Calculator</h2>
      <p className="text-gray-600 mb-6">
        Your exact age calculated from your birth date to the target date.
      </p>

      {/* Result Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
      </div>

      {/* Main Age Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {result.years} years old
          </div>
          <div className="text-lg text-gray-600 mb-3">
            Plus {result.months} months and {result.days} days
          </div>
          <div className="text-sm text-gray-500">
            You've lived {formatNumber(result.totalDays)} total days
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Additional Details */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-800">
          Additional Details
        </h4>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium mb-3 text-gray-700">📅 Birth Details</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Born on:</span>
                <span className="font-medium">
                  {birthInfo.dayOfWeek}, {formatDate(result.birthDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Zodiac Sign:</span>
                <span className="font-medium">
                  {birthInfo.zodiacSign.symbol} {birthInfo.zodiacSign.sign}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium mb-3 text-gray-700">❤️ Life Stats</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Heartbeats:</span>
                <span className="font-medium">
                  ~{Math.round(lifeStats.heartbeats / 1000000)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours Slept:</span>
                <span className="font-medium">
                  ~{formatNumber(lifeStats.sleepHours)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Birthday */}
        {result.nextBirthday && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-lg p-4">
            <div className="text-center">
              <h5 className="font-medium mb-2 text-orange-700">
                🎂 Next Birthday
              </h5>
              <p className="text-xl font-bold text-orange-600 mb-1">
                {result.nextBirthday.daysUntil} days to go
              </p>
              <p className="text-sm text-gray-600">
                You'll turn <strong>{result.nextBirthday.age}</strong> on{" "}
                {formatDate(result.nextBirthday.date)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
