"use client";

import { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IncomeTaxResults } from "@/types/incomeTax";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaxRateGaugesProps {
  results: IncomeTaxResults;
}

export default function TaxRateGauges({ results }: TaxRateGaugesProps) {
  const effectiveRef = useRef<ChartJS<"doughnut">>(null);
  const marginalRef = useRef<ChartJS<"doughnut">>(null);

  // Create gauge data for effective rate
  const createGaugeData = (rate: number, maxRate: number = 40) => {
    const normalizedRate = Math.min(rate, maxRate);
    const remainingRate = maxRate - normalizedRate;

    return {
      labels: ["Tax Rate", "Remaining"],
      datasets: [
        {
          data: [normalizedRate, remainingRate],
          backgroundColor: [
            rate <= 15 ? "#10B981" : rate <= 25 ? "#F59E0B" : "#EF4444", // Green, Yellow, Red
            "#E5E7EB", // Light gray for remaining
          ],
          borderColor: [
            rate <= 15 ? "#059669" : rate <= 25 ? "#D97706" : "#DC2626",
            "#D1D5DB",
          ],
          borderWidth: 2,
          cutout: "75%",
          circumference: 180,
          rotation: 270,
        },
      ],
    };
  };

  const gaugeOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const effectiveData = createGaugeData(results.effectiveTaxRate);
  const marginalData = createGaugeData(results.marginalTaxRate);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800">Tax Rate Analysis</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Effective Tax Rate Gauge */}
        <div className="text-center">
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Effective Tax Rate
          </h4>
          <div className="relative h-32 w-32 mx-auto">
            <Doughnut
              ref={effectiveRef}
              data={effectiveData}
              options={gaugeOptions}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {results.effectiveTaxRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">of total income</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Percentage of your total income paid in taxes
          </p>
        </div>

        {/* Marginal Tax Rate Gauge */}
        <div className="text-center">
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Marginal Tax Rate
          </h4>
          <div className="relative h-32 w-32 mx-auto">
            <Doughnut
              ref={marginalRef}
              data={marginalData}
              options={gaugeOptions}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {results.marginalTaxRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">on next dollar</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Tax rate on your next dollar of income
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">
          Understanding the Difference
        </h5>
        <div className="text-sm text-blue-700 space-y-1">
          <p>
            <strong>Effective Rate:</strong> Your actual tax burden as a
            percentage of total income
          </p>
          <p>
            <strong>Marginal Rate:</strong> The tax rate on additional income
            (like a bonus or raise)
          </p>
        </div>
      </div>
    </div>
  );
}
