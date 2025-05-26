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
    <div className="mt-6 space-y-6">
      {/* Main Age Display */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-blue-800">Your Age</h3>

        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {result.years} years, {result.months} months, {result.days} days
          </div>
          <div className="text-lg text-blue-500">
            {result.hours} hours, {result.minutes} minutes, {result.seconds}{" "}
            seconds
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Years</h4>
            <p className="text-2xl font-bold">{result.years}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">Months</h4>
            <p className="text-2xl font-bold">{result.months}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-purple-600">Weeks</h4>
            <p className="text-2xl font-bold">{result.weeks}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-orange-600">Days</h4>
            <p className="text-2xl font-bold">{result.days}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">Hours</h4>
            <p className="text-2xl font-bold">{result.hours}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-teal-600">Minutes</h4>
            <p className="text-2xl font-bold">{result.minutes}</p>
          </div>
        </div>
      </div>

      {/* Total Time Lived */}
      <div className="p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-green-800">
          Total Time Lived
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">Total Days</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalDays)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Total Weeks</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalWeeks)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-purple-600">Total Months</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalMonths)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-orange-600">Total Hours</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalHours)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">Total Minutes</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalMinutes)}
            </p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-teal-600">Total Seconds</h4>
            <p className="text-xl font-bold">
              {formatNumber(result.totalSeconds)}
            </p>
          </div>
        </div>
      </div>

      {/* Life Statistics */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-purple-800">
          Life Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">Heartbeats</h4>
            <p className="text-lg font-bold">
              {formatNumber(lifeStats.heartbeats)}
            </p>
            <p className="text-xs text-gray-500">~70 beats/min</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Breaths Taken</h4>
            <p className="text-lg font-bold">
              {formatNumber(lifeStats.breathsTaken)}
            </p>
            <p className="text-xs text-gray-500">~15 breaths/min</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-indigo-600">Hours Slept</h4>
            <p className="text-lg font-bold">
              {formatNumber(lifeStats.sleepHours)}
            </p>
            <p className="text-xs text-gray-500">~8 hours/day</p>
          </div>
        </div>
      </div>

      {/* Next Birthday */}
      {result.nextBirthday && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-lg mb-3 text-yellow-800">
            Next Birthday
          </h3>

          <div className="bg-white p-4 rounded border">
            <div className="text-center">
              <p className="text-lg mb-2">
                Your next birthday is on{" "}
                <strong>{formatDate(result.nextBirthday.date)}</strong>
              </p>
              <p className="text-2xl font-bold text-yellow-600 mb-2">
                {result.nextBirthday.daysUntil} days to go!
              </p>
              <p className="text-sm text-gray-600">
                You will turn <strong>{result.nextBirthday.age}</strong> years
                old
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Birth Day Information */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-indigo-800">
          Birth Day Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2">Birth Date Details</h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Day of Week:</strong> {birthInfo.dayOfWeek}
              </p>
              <p>
                <strong>Day of Year:</strong> {birthInfo.dayOfYear}
              </p>
              <p>
                <strong>Week of Year:</strong> {birthInfo.weekOfYear}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2">Zodiac & Symbols</h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Zodiac Sign:</strong> {birthInfo.zodiacSign.symbol}{" "}
                {birthInfo.zodiacSign.sign}
              </p>
              <p>
                <strong>Chinese Zodiac:</strong> {birthInfo.chineseZodiac}
              </p>
              <p>
                <strong>Birthstone:</strong> {birthInfo.birthstone}
              </p>
              <p>
                <strong>Birth Flower:</strong> {birthInfo.birthFlower}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white p-3 rounded border">
          <h4 className="font-medium mb-2">Zodiac Traits</h4>
          <div className="flex flex-wrap gap-2">
            {birthInfo.zodiacSign.traits.map((trait, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {birthInfo.zodiacSign.element} sign • {birthInfo.zodiacSign.dates}
          </p>
        </div>
      </div>

      {/* Life Milestones */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Life Milestones</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Passed Milestones */}
          <div>
            <h4 className="font-medium mb-3 text-green-600">
              Achieved Milestones
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {milestones
                .filter((m) => m.isPassed)
                .map((milestone, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 p-2 rounded"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">
                        {milestone.name}
                      </span>
                      <span className="text-sm text-green-600">
                        Age {milestone.age}
                      </span>
                    </div>
                    <p className="text-xs text-green-600">
                      {formatDate(milestone.date)}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div>
            <h4 className="font-medium mb-3 text-blue-600">
              Upcoming Milestones
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {milestones
                .filter((m) => !m.isPassed)
                .slice(0, 5)
                .map((milestone, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 p-2 rounded"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">
                        {milestone.name}
                      </span>
                      <span className="text-sm text-blue-600">
                        Age {milestone.age}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600">
                      {formatDate(milestone.date)} • {milestone.daysUntil} days
                      to go
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Date Summary */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Date Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Birth Date</h4>
            <p className="text-lg">{formatDate(result.birthDate)}</p>
          </div>

          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">Target Date</h4>
            <p className="text-lg">{formatDate(result.targetDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
