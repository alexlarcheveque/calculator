"use client";

import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  ScheduleEntry,
  formatCurrency as commonFormatCurrency,
} from "./LoanPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AmortizationOverTimeChartProps {
  data: ScheduleEntry[];
  formatCurrency: (value: number) => string;
}

export default function AmortizationOverTimeChart({
  data,
  formatCurrency,
}: AmortizationOverTimeChartProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Amortization data not available.
      </p>
    );
  }

  const labels = data.map((item) => `Pmt ${item.paymentNumber}`);
  const remainingBalanceData = data.map((item) => item.remainingBalance);
  const principalPaidData = data.map((item) => item.principalPaid);
  const interestPaidData = data.map((item) => item.interestPaid);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Remaining Balance",
        data: remainingBalanceData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        yAxisID: "yBalance",
        type: "line" as const,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Principal Paid",
        data: principalPaidData,
        backgroundColor: "rgb(75, 192, 192)",
        yAxisID: "yPayments",
        type: "bar" as const,
        stack: "payments",
      },
      {
        label: "Interest Paid",
        data: interestPaidData,
        backgroundColor: "rgb(255, 99, 132)",
        yAxisID: "yPayments",
        type: "bar" as const,
        stack: "payments",
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Payment Number",
        },
      },
      yBalance: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Remaining Balance",
        },
        ticks: {
          callback: function (value: string | number) {
            return formatCurrency(Number(value));
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      yPayments: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Payment Amount",
        },
        ticks: {
          callback: function (value: string | number) {
            return formatCurrency(Number(value));
          },
        },
        stacked: true,
      },
    },
  };

  return (
    <div className="h-96">
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
}
