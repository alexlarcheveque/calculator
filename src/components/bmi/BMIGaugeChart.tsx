"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BMIResults, BMI_CATEGORIES } from "@/types/bmi";
import { formatNumber } from "@/utils/bmiCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BMIGaugeChartProps {
  results: BMIResults;
}

export default function BMIGaugeChart({ results }: BMIGaugeChartProps) {
  // Define BMI ranges for the gauge (simplified for better visualization)
  const gaugeRanges = [
    { name: "Underweight", min: 0, max: 18.5, color: "#bc2020" },
    { name: "Normal", min: 18.5, max: 25, color: "#008137" },
    { name: "Overweight", min: 25, max: 30, color: "#ffe400" },
    { name: "Obese", min: 30, max: 40, color: "#bc2020" },
  ];

  // Calculate proportional values for each range
  const totalRange = 40; // BMI 0-40 for the gauge
  const gaugeData = gaugeRanges.map((range) => ({
    ...range,
    value: range.max - range.min,
  }));

  // Add empty space for the bottom half of the circle
  const totalValue = gaugeData.reduce((sum, item) => sum + item.value, 0);

  const data = {
    labels: [...gaugeData.map((item) => item.name), ""],
    datasets: [
      {
        data: [...gaugeData.map((item) => item.value), totalValue],
        backgroundColor: [
          ...gaugeData.map((item) => item.color),
          "transparent",
        ],
        borderColor: [...gaugeData.map((item) => "#ffffff"), "transparent"],
        borderWidth: 2,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: function (tooltipItem: any) {
          return tooltipItem.label !== "";
        },
        callbacks: {
          label: function (context: any) {
            const rangeIndex = context.dataIndex;
            if (rangeIndex < gaugeRanges.length) {
              const range = gaugeRanges[rangeIndex];
              return `${range.name}: ${range.min} - ${range.max} kg/m²`;
            }
            return "";
          },
        },
      },
    },
    cutout: "60%",
  };

  // Calculate needle position based on BMI value
  const calculateNeedleAngle = (bmi: number) => {
    // Clamp BMI between 0 and 40 for the gauge
    const clampedBMI = Math.max(0, Math.min(40, bmi));
    // Convert to angle (0-180 degrees for semicircle)
    return (clampedBMI / 40) * 180;
  };

  const needleAngle = calculateNeedleAngle(results.bmi);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        BMI Gauge
      </h3>

      <div className="relative" style={{ height: "300px" }}>
        <Doughnut data={data} options={options} />

        {/* BMI Value Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <div className="text-2xl font-bold text-gray-900">
              BMI = {formatNumber(results.bmi, 1)}
            </div>
            <div
              className="text-lg font-semibold mt-1"
              style={{ color: results.categoryColor }}
            >
              {results.category}
            </div>
          </div>
        </div>

        {/* Needle */}
        <div
          className="absolute top-1/2 left-1/2 origin-bottom z-10"
          style={{
            width: "2px",
            height: "80px",
            backgroundColor: "#374151",
            transform: `translate(-50%, -100%) rotate(${needleAngle}deg)`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-700 rounded-full z-20"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* BMI Scale Markers */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {/* 18.5 marker */}
          <div
            className="absolute w-0.5 h-6 bg-gray-600"
            style={{
              transform: `translate(-50%, -90px) rotate(${
                (18.5 / 40) * 180
              }deg)`,
              transformOrigin: "bottom center",
            }}
          />
          {/* 25 marker */}
          <div
            className="absolute w-0.5 h-6 bg-gray-600"
            style={{
              transform: `translate(-50%, -90px) rotate(${(25 / 40) * 180}deg)`,
              transformOrigin: "bottom center",
            }}
          />
          {/* 30 marker */}
          <div
            className="absolute w-0.5 h-6 bg-gray-600"
            style={{
              transform: `translate(-50%, -90px) rotate(${(30 / 40) * 180}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        </div>
      </div>

      {/* BMI Scale Labels */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-center">
        <div>
          <div
            className="w-3 h-3 mx-auto mb-1 rounded"
            style={{ backgroundColor: "#bc2020" }}
          ></div>
          <div className="font-medium">Underweight</div>
          <div className="text-gray-500">&lt; 18.5</div>
        </div>
        <div>
          <div
            className="w-3 h-3 mx-auto mb-1 rounded"
            style={{ backgroundColor: "#008137" }}
          ></div>
          <div className="font-medium">Normal</div>
          <div className="text-gray-500">18.5 - 25</div>
        </div>
        <div>
          <div
            className="w-3 h-3 mx-auto mb-1 rounded"
            style={{ backgroundColor: "#ffe400" }}
          ></div>
          <div className="font-medium">Overweight</div>
          <div className="text-gray-500">25 - 30</div>
        </div>
        <div>
          <div
            className="w-3 h-3 mx-auto mb-1 rounded"
            style={{ backgroundColor: "#bc2020" }}
          ></div>
          <div className="font-medium">Obese</div>
          <div className="text-gray-500">&gt; 30</div>
        </div>
      </div>

      {/* BMI Scale Numbers */}
      <div className="mt-2 flex justify-between text-xs text-gray-500 px-8">
        <span>0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
      </div>
    </div>
  );
}
