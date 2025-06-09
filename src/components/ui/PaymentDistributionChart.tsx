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
  const chartData = useMemo(() => {
    const totalValue =
      totalForPercentage || data.reduce((sum, item) => sum + item.value, 0);

    return {
      labels: data.map((item) => {
        if (totalValue === 0) {
          return item.label;
        }
        const percentage = ((item.value / totalValue) * 100).toFixed(1);
        return `${item.label} (${percentage}%)`;
      }),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
          borderColor: data.map((item) => item.color),
          borderWidth: 1,
        },
      ],
    };
  }, [data, totalForPercentage]);

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
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        ctx.save();

        // Calculate the actual center of the chart area (excluding legend)
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        // Responsive font sizes
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        const labelFontSize = isMobile ? 12 : 16;
        const amountFontSize = isMobile ? 16 : 24;

        // Set up text properties for measurements
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Prepare the display value
        const displayValue =
          typeof centerText.value === "number"
            ? centerText.formatter
              ? centerText.formatter(centerText.value)
              : formatCurrency(centerText.value)
            : centerText.value;

        // Measure text dimensions
        ctx.font = `500 ${labelFontSize}px system-ui`;
        const labelMetrics = ctx.measureText(centerText.label);
        const labelHeight = labelFontSize;

        ctx.font = `600 ${amountFontSize}px system-ui`;
        const valueMetrics = ctx.measureText(displayValue);
        const valueHeight = amountFontSize;

        // Calculate total text height and spacing
        const spacing = isMobile ? 4 : 6;
        const totalTextHeight = labelHeight + spacing + valueHeight;

        // Position text to center both label and value as a group
        const labelY = centerY - totalTextHeight / 2 + labelHeight / 2;
        const valueY = centerY + totalTextHeight / 2 - valueHeight / 2;

        // Draw label
        ctx.font = `500 ${labelFontSize}px system-ui`;
        ctx.fillStyle = "#4B5563"; // text-gray-600
        ctx.fillText(centerText.label, centerX, labelY);

        // Draw value
        ctx.font = `600 ${amountFontSize}px system-ui`;
        ctx.fillStyle = "#111827"; // text-gray-900
        ctx.fillText(displayValue, centerX, valueY);

        ctx.restore();
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
    <div className="w-full h-96 px-4 sm:px-0">
      <div className="relative w-full max-w-sm mx-auto">
        <Doughnut data={chartData} options={options} plugins={plugins} />
      </div>
    </div>
  );
}
