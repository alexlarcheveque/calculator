"use client";

import {
  AmortizationResults,
  AmortizationScheduleItem,
} from "@/types/amortization";
import PrincipalInterestChart from "./PrincipalInterestChart";

interface AmortizationChartsProps {
  results: AmortizationResults;
  scheduleData: AmortizationScheduleItem[];
}

export default function AmortizationCharts({
  results,
  scheduleData,
}: AmortizationChartsProps) {
  return (
    <PrincipalInterestChart results={results} scheduleData={scheduleData} />
  );
}
