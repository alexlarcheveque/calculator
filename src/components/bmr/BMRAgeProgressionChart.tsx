"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BMRResults, BMRFormValues } from "@/types/bmr";
import { calculateBMR } from "@/utils/bmrCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BMRAgeProgressionChartProps {
  results: BMRResults;
  formValues: BMRFormValues;
}

export default function BMRAgeProgressionChart({
  results,
  formValues,
}: BMRAgeProgressionChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Generate BMR data for different ages
  const generateAgeData = () => {
    const ages = [];
    const bmrValues = [];

    for (let age = 20; age <= 80; age += 5) {
      ages.push(age.toString());

      const testFormValues = {
        ...formValues,
        age: age,
      };

      const bmrResult = calculateBMR(testFormValues);
      bmrValues.push(bmrResult.bmr);
    }

    return { ages, bmrValues };
  };

  const { ages, bmrValues } = generateAgeData();

  // Find current age index for highlighting
  const currentAgeIndex = ages.findIndex(
    (age) => parseInt(age) >= formValues.age
  );

  const data = {
    labels: ages,
    datasets: [
      {
        label: "BMR by Age",
        data: bmrValues,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: bmrValues.map((_, index) =>
          index === currentAgeIndex ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)"
        ),
        pointBorderColor: bmrValues.map((_, index) =>
          index === currentAgeIndex ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)"
        ),
        pointRadius: bmrValues.map((_, index) =>
          index === currentAgeIndex ? 8 : 4
        ),
        tension: 0.4,
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
      title: {
        display: true,
        text: `BMR Changes with Age (${
          formValues.gender === "male" ? "Male" : "Female"
        })`,
        font: {
          size: 16,
          weight: "bold" as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const unit =
              formValues.resultUnit === "calories" ? "cal/day" : "kJ/day";
            return `BMR: ${context.parsed.y.toLocaleString()} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years)",
          font: {
            weight: "bold" as const,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: `BMR (${
            formValues.resultUnit === "calories" ? "calories/day" : "kJ/day"
          })`,
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="h-96">
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          Red dot shows your current age ({formValues.age} years). BMR naturally
          decreases with age due to slower metabolism.
        </p>
      </div>
    </div>
  );
}
