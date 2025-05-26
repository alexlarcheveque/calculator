"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ConceptionResults, FertilityPeriod } from "@/types/conception";
import { formatShortDate } from "@/utils/conceptionCalculations";
import { Chart as ChartJS } from "chart.js/auto";

// Dynamically import Chart.js components to avoid SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      Loading chart...
    </div>
  ),
});

interface ConceptionChartProps {
  results: ConceptionResults;
  multipleCycles: FertilityPeriod[];
}

export default function ConceptionChart({
  results,
  multipleCycles,
}: ConceptionChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Dynamically import and register Chart.js components
    const initChart = async () => {
      const {
        Chart,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
      } = await import("chart.js");

      ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      setChartReady(true);
    };

    initChart();
  }, []);

  const generateTimelineData = () => {
    const startDate = new Date(results.fertilityWindowStart);
    startDate.setDate(startDate.getDate() - 2);

    const endDate = new Date(results.fertilityWindowEnd);
    endDate.setDate(endDate.getDate() + 2);

    const labels: string[] = [];
    const fertilityData: number[] = [];
    const ovulationData: number[] = [];
    const conceptionData: number[] = [];

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = formatShortDate(currentDate);
      labels.push(dateStr);

      const isFertile =
        currentDate >= results.fertilityWindowStart &&
        currentDate <= results.fertilityWindowEnd;
      fertilityData.push(isFertile ? 1 : 0);

      const isOvulation =
        currentDate.toDateString() === results.ovulationDate.toDateString();
      ovulationData.push(isOvulation ? 1.2 : 0);

      const isConception =
        currentDate >= results.conceptionDateRange.earliest &&
        currentDate <= results.conceptionDateRange.latest;
      conceptionData.push(isConception ? 0.8 : 0);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      labels,
      datasets: [
        {
          label: "Fertility Window",
          data: fertilityData,
          backgroundColor: "rgba(34, 197, 94, 0.6)",
          borderColor: "rgba(34, 197, 94, 1)",
          borderWidth: 1,
        },
        {
          label: "Most Likely Conception",
          data: conceptionData,
          backgroundColor: "rgba(251, 191, 36, 0.6)",
          borderColor: "rgba(251, 191, 36, 1)",
          borderWidth: 1,
        },
        {
          label: "Ovulation Day",
          data: ovulationData,
          backgroundColor: "rgba(236, 72, 153, 0.8)",
          borderColor: "rgba(236, 72, 153, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const generateCycleData = () => {
    const labels = multipleCycles.map((cycle) => `Cycle ${cycle.cycleNumber}`);
    const ovulationDates = multipleCycles.map((cycle) =>
      cycle.ovulationDate.getDate()
    );

    return {
      labels,
      datasets: [
        {
          label: "Ovulation Day of Month",
          data: ovulationDates,
          backgroundColor: "rgba(147, 51, 234, 0.6)",
          borderColor: "rgba(147, 51, 234, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const timelineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Fertility Timeline - Current Cycle",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            if (context.parsed.y > 0) {
              return `${label}: Active`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1.5,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  const cycleOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ovulation Dates - Next 6 Cycles",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 31,
        title: {
          display: true,
          text: "Day of Month",
        },
      },
    },
  };

  if (!isClient || !chartReady) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Fertility Charts
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading charts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Fertility Charts
      </h2>

      <div className="space-y-8">
        {/* Current Cycle Timeline */}
        <div>
          <Bar data={generateTimelineData()} options={timelineOptions} />
        </div>

        {/* Multiple Cycles Overview */}
        <div>
          <Bar data={generateCycleData()} options={cycleOptions} />
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-800 mb-3">Chart Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Fertility Window (6 days)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span>Most Likely Conception (3 days)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-500 rounded mr-2"></div>
            <span>Ovulation Day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
