import {
  InterestRateResults,
  AmortizationDataPoint,
} from "@/types/interestRate";
import AmortizationChart from "@/components/interest-rate/AmortizationChart";
import PaymentDistributionChart from "@/components/interest-rate/PaymentDistributionChart";

interface InterestRateChartsProps {
  results: InterestRateResults;
  amortizationData: AmortizationDataPoint[];
}

export default function InterestRateCharts({
  results,
  amortizationData,
}: InterestRateChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Loan Visualization
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Loan Amortization Graph */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
            Loan Amortization Graph
          </h3>
          <div className="h-64">
            <AmortizationChart data={amortizationData} />
          </div>
        </div>

        {/* Payment Breakdown */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
            Payment Breakdown
          </h3>
          <div className="h-64">
            <PaymentDistributionChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
