"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface CenterTextConfig {
  label: string;
  value: string | number;
  formatter?: (value: number) => string;
}

export interface PaymentDistributionChartProps {
  data: ChartDataPoint[];
  centerText?: CenterTextConfig;
  formatCurrency: (value: number) => string;
  totalForPercentage?: number;
  emptyStateMessage?: string;
}

export default function PaymentDistributionChart({
  data,
  centerText,
  formatCurrency,
  totalForPercentage,
  emptyStateMessage = "Chart data not available.",
}: PaymentDistributionChartProps) {
  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.label),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
          borderColor: data.map((item) => item.color),
          borderWidth: 1,
        },
      ],
    }),
    [data]
  );

  const totalValue = useMemo(() => {
    return (
      totalForPercentage || data.reduce((sum, item) => sum + item.value, 0)
    );
  }, [data, totalForPercentage]);

  const centerTextPlugin = useMemo(() => {
    if (!centerText) return null;

    return {
      id: "centerText",
      beforeDraw: (chart: any) => {
        const { ctx, width, height } = chart;
        ctx.restore();

        const centerX = width / 2;
        const centerY = height / 2;

        // Responsive font sizes
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        const labelFontSize = isMobile ? 12 : 18;
        const amountFontSize = isMobile ? 18 : 28;
        const labelOffset = isMobile ? 40 : 50;
        const amountOffset = isMobile ? 20 : 15;

        // Draw label
        ctx.font = `500 ${labelFontSize}px system-ui`;
        ctx.fillStyle = "#4B5563"; // text-gray-600
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(centerText.label, centerX, centerY - labelOffset);

        // Draw value
        ctx.font = `600 ${amountFontSize}px system-ui`;
        ctx.fillStyle = "#111827"; // text-gray-900
        const displayValue =
          typeof centerText.value === "number"
            ? centerText.formatter
              ? centerText.formatter(centerText.value)
              : formatCurrency(centerText.value)
            : centerText.value;
        ctx.fillText(displayValue, centerX, centerY - amountOffset);
        ctx.save();
      },
    };
  }, [centerText, formatCurrency]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 16,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 12,
            font: {
              size:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 12
                  : 14,
              family: "system-ui",
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const label = context.label || "";
              const value = context.raw;
              if (totalValue === 0) {
                return `${label}: ${formatCurrency(value)}`;
              }
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return `${label}: ${formatCurrency(value)} (${percentage}%)`;
            },
          },
        },
      },
      cutout: "65%",
    }),
    [totalValue, formatCurrency]
  );

  // Check if data is empty or invalid
  if (
    !data ||
    data.length === 0 ||
    data.every((item) => item.value === 0 || item.value === undefined)
  ) {
    return (
      <div className="text-center py-10 text-gray-500">{emptyStateMessage}</div>
    );
  }

  const plugins = centerTextPlugin ? [centerTextPlugin] : [];

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative w-full max-w-sm mx-auto">
        <Doughnut data={chartData} options={options} plugins={plugins} />
      </div>
    </div>
  );
}
