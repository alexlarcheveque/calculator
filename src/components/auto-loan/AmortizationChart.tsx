import { AutoLoanMonthlyAmortizationDataPoint } from "@/types/autoLoan";

interface AutoLoanAmortizationChartProps {
  data: AutoLoanMonthlyAmortizationDataPoint[];
  loanTermMonths: number;
}

export default function AutoLoanAmortizationChart({
  data,
  loanTermMonths,
}: AutoLoanAmortizationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Amortization chart will appear here.</p>
      </div>
    );
  }

  // Basic SVG Placeholder - Replace with actual chart implementation
  // This is a very simplified representation and not a functional chart
  const svgHeight = 300;
  const svgWidth = 500;
  const padding = 40;
  const chartHeight = svgHeight - 2 * padding;
  const chartWidth = svgWidth - 2 * padding;

  // Find max balance for scaling (simplified)
  const maxBalance = Math.max(...data.map((d) => d.endingBalance), 0);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Loan Balance Over Time
      </h3>
      <svg
        width={svgWidth}
        height={svgHeight}
        className="border rounded-md bg-gray-50"
      >
        {/* Y Axis Placeholder */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={svgHeight - padding}
          stroke="#ccc"
        />
        <text
          x={padding - 10}
          y={padding}
          dy=".3em"
          textAnchor="end"
          fontSize="10px"
          fill="#666"
        >
          {maxBalance > 0 ? maxBalance.toLocaleString() : ""}
        </text>
        <text
          x={padding - 10}
          y={svgHeight - padding}
          textAnchor="end"
          fontSize="10px"
          fill="#666"
        >
          0
        </text>

        {/* X Axis Placeholder */}
        <line
          x1={padding}
          y1={svgHeight - padding}
          x2={svgWidth - padding}
          y2={svgHeight - padding}
          stroke="#ccc"
        />
        <text
          x={padding}
          y={svgHeight - padding + 15}
          textAnchor="start"
          fontSize="10px"
          fill="#666"
        >
          0
        </text>
        <text
          x={svgWidth - padding}
          y={svgHeight - padding + 15}
          textAnchor="end"
          fontSize="10px"
          fill="#666"
        >
          {loanTermMonths}m
        </text>

        {/* Data Line Placeholder (Balance) */}
        {maxBalance > 0 && data.length > 1 && (
          <polyline
            fill="none"
            stroke="#2b7ddb"
            strokeWidth="2"
            points={data
              .map(
                (d, i) =>
                  `${padding + (i / (data.length - 1)) * chartWidth},${
                    svgHeight -
                    padding -
                    (d.endingBalance / maxBalance) * chartHeight
                  }`
              )
              .join(" ")}
          />
        )}
        {/* Legends Placeholder */}
        <g transform={`translate(${padding + 20}, ${padding + 20})`}>
          <rect x="0" y="0" width="10" height="10" fill="#2b7ddb" />
          <text x="15" y="8" fontSize="10px" fill="#333">
            Balance
          </text>
        </g>

        <text
          x={svgWidth / 2}
          y={svgHeight - 5}
          textAnchor="middle"
          fontSize="12px"
          fill="#666"
        >
          Month
        </text>
        <text
          x={10}
          y={svgHeight / 2}
          transform={`rotate(-90 ${10},${svgHeight / 2})`}
          textAnchor="middle"
          fontSize="12px"
          fill="#666"
        >
          Amount ($)
        </text>
      </svg>
      <p className="text-xs text-gray-400 mt-1">
        Simplified chart placeholder. Integrate a library for a full version.
      </p>
    </div>
  );
}
