"use client";

import { RefinanceResults } from "@/types/refinance";
import LoanBalanceChart from "./LoanBalanceChart";

interface RefinanceChartsProps {
  results: RefinanceResults;
  currentInterestRate: number;
  newInterestRate: number;
}

export default function RefinanceCharts({
  results,
  currentInterestRate,
  newInterestRate,
}: RefinanceChartsProps) {
  return (
    <LoanBalanceChart
      results={results}
      currentInterestRate={currentInterestRate}
      newInterestRate={newInterestRate}
    />
  );
}
