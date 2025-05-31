"use client";

import { RefinanceResults, AmortizationDataPoint } from "@/types/refinance";
import { formatCurrency } from "@/utils/refinanceCalculations";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

// Helper function to calculate amortization schedule
function calculateAmortization(
  principal: number,
  annualRate: number,
  termYears: number,
  monthlyPayment?: number // Optional: if not provided, it's calculated
): AmortizationDataPoint[] {
  const schedule: AmortizationDataPoint[] = [];
  let balance = principal;
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;

  let calculatedMonthlyPayment = monthlyPayment;
  if (!calculatedMonthlyPayment) {
    if (monthlyRate > 0) {
      calculatedMonthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      calculatedMonthlyPayment = principal / totalPayments;
    }
  }

  if (!calculatedMonthlyPayment || calculatedMonthlyPayment <= 0) return []; // Cannot amortize

  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  for (let i = 0; i < totalPayments; i++) {
    if (balance <= 0) break;
    const interestPayment = balance * monthlyRate;
    const principalPayment = calculatedMonthlyPayment - interestPayment;

    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;
    balance -= principalPayment;

    // Ensure balance doesn't go negative if payment is slightly off or last payment
    if (balance < 0) balance = 0;

    schedule.push({
      paymentNumber: i + 1,
      payment: calculatedMonthlyPayment,
      principalPayment: principalPayment,
      interestPayment: interestPayment,
      remainingBalance: balance,
      totalPrincipalPaid: totalPrincipalPaid,
      totalInterestPaid: totalInterestPaid,
    });
  }
  return schedule;
}

interface LoanBalanceChartProps {
  results: RefinanceResults;
  currentInterestRate: number; // Need this to amortize current loan
  newInterestRate: number; // Need this to amortize new loan
}

export default function LoanBalanceChart({
  results,
  currentInterestRate,
  newInterestRate,
}: LoanBalanceChartProps) {
  const {
    currentLoanRemainingBalance,
    currentMonthlyPayment,
    currentRemainingPayments, // This is in months
    newLoanAmount,
    timeToPayOffNew, // Contains newLoanTerm in years and months
    newMonthlyPayment,
    cashOutAmount, // Added for summary text
  } = results;

  const currentLoanTermYears = currentRemainingPayments / 12;
  const newLoanTermYears = timeToPayOffNew.years + timeToPayOffNew.months / 12;

  const currentLoanAmortization = calculateAmortization(
    currentLoanRemainingBalance,
    currentInterestRate,
    currentLoanTermYears,
    currentMonthlyPayment
  );

  const newLoanAmortization = calculateAmortization(
    newLoanAmount,
    newInterestRate,
    newLoanTermYears, // Use calculated newLoanTermYears
    newMonthlyPayment
  );

  const maxChartMonths = Math.max(
    currentLoanAmortization.length,
    newLoanAmortization.length,
    120
  ); // Show at least 10 years
  const labels: number[] = Array.from(
    { length: maxChartMonths + 1 },
    (_, i) => i
  ); // Month 0 to maxChartMonths

  const getCurrentBalanceAtMonth = (month: number) => {
    if (month === 0) return currentLoanRemainingBalance;
    if (month > currentLoanAmortization.length) return 0; // Paid off
    return currentLoanAmortization[month - 1]?.remainingBalance ?? 0;
  };

  const getNewBalanceAtMonth = (month: number) => {
    if (month === 0) return newLoanAmount;
    if (month > newLoanAmortization.length) return 0; // Paid off
    return newLoanAmortization[month - 1]?.remainingBalance ?? 0;
  };

  const currentLoanBalanceData = labels.map((month) =>
    getCurrentBalanceAtMonth(month)
  );
  const newLoanBalanceData = labels.map((month) => getNewBalanceAtMonth(month));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Current Loan Balance",
        data: currentLoanBalanceData,
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "New Loan Balance",
        data: newLoanBalanceData,
        borderColor: "#f97316", // Orange
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          font: { size: 12, family: "system-ui" },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          title: function (context) {
            const month = context[0].parsed.x;
            if (month === 0) return "Start (Month 0)";
            const years = Math.floor(month / 12);
            const remainingMonths = month % 12;
            let titleStr = `Month ${month}`;
            if (years > 0) {
              titleStr += ` (${years}y`;
              if (remainingMonths > 0) titleStr += ` ${remainingMonths}m`;
              titleStr += `)`;
            }
            return titleStr;
          },
          label: function (context) {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            return `${datasetLabel}: ${formatCurrency(value)}`;
          },
        },
      },
      annotation: {
        annotations: {
          currentLoanPayoff:
            currentLoanAmortization.length > 0 &&
            currentLoanAmortization.length <= maxChartMonths
              ? {
                  type: "line",
                  xMin: currentLoanAmortization.length,
                  xMax: currentLoanAmortization.length,
                  borderColor: "#3b82f6",
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    display: true,
                    content: `Current Loan Paid Off: ${Math.ceil(
                      currentLoanAmortization.length / 12
                    )} yrs`,
                    position: "start",
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    font: { size: 10, weight: "bold" },
                    padding: 4,
                    yAdjust: -15,
                  },
                }
              : {},
          newLoanPayoff:
            newLoanAmortization.length > 0 &&
            newLoanAmortization.length <= maxChartMonths
              ? {
                  type: "line",
                  xMin: newLoanAmortization.length,
                  xMax: newLoanAmortization.length,
                  borderColor: "#f97316",
                  borderWidth: 2,
                  borderDash: [6, 6],
                  label: {
                    display: true,
                    content: `New Loan Paid Off: ${newLoanTermYears} yrs`,
                    position: "end",
                    backgroundColor: "rgba(249, 115, 22, 0.8)",
                    font: { size: 10, weight: "bold" },
                    padding: 4,
                    yAdjust: 15,
                  },
                }
              : {},
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Months)",
          color: "#4b5563",
          font: { size: 12, weight: "normal" },
        },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          color: "#4b5563",
          font: { size: 11 },
          callback: function (value) {
            const month = Number(labels[value as number]);
            if (month === 0) return "Start";
            if (month % 12 === 0) return `${month / 12}yr`;
            if (maxChartMonths <= 60 && month % 6 === 0) return `${month}mo`;
            if (
              maxChartMonths > 60 &&
              maxChartMonths <= 240 &&
              month % 24 === 0
            )
              return `${month / 12}yr`;
            if (maxChartMonths > 240 && month % 60 === 0)
              return `${month / 12}yr`;
            return "";
          },
          maxRotation: 0,
          autoSkipPadding: 20,
        },
      },
      y: {
        min: 0, // Ensure y-axis starts at 0
        title: {
          display: true,
          text: "Remaining Loan Balance ($)",
          color: "#4b5563",
          font: { size: 12, weight: "normal" },
        },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          color: "#4b5563",
          font: { size: 11 },
          callback: function (value) {
            return formatCurrency(value as number);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  let chartTitle = "Loan Balance Over Time";
  let summaryText =
    "This chart shows how the balance of your current and new loan would decrease over time.";
  if (newLoanAmortization.length < currentLoanAmortization.length) {
    summaryText += " The new loan is paid off faster.";
  } else if (newLoanAmortization.length > currentLoanAmortization.length) {
    summaryText += " The new loan takes longer to pay off.";
  }
  if (cashOutAmount > 0) {
    chartTitle = "Loan Balance Over Time (with Cash Out)";
    summaryText += ` The new loan starts with a higher balance due to the ${formatCurrency(
      cashOutAmount
    )} cash out.`;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-1 text-gray-800 text-center">
        {chartTitle}
      </h3>
      <p className="text-xs text-gray-500 text-center mb-4 px-4">
        {summaryText}
      </p>
      <div className="h-72 sm:h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
