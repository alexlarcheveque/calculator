import {
  FinanceCalculationParams,
  FinanceResults,
  FinanceScheduleDataPoint,
  CalculationType,
  PaymentTiming,
} from "@/types/finance";

export function calculateFinance(
  params: FinanceCalculationParams
): FinanceResults {
  const {
    numberOfPeriods,
    interestPerYear,
    presentValue,
    periodicPayment,
    futureValue,
    periodsPerYear,
    compoundingPerYear,
    paymentTiming,
    calculationType,
  } = params;

  // Convert annual interest rate to effective rate per period
  const effectiveRate = interestPerYear
    ? interestPerYear / 100 / periodsPerYear
    : 0;

  let calculatedValue = 0;
  let finalPV = presentValue || 0;
  let finalFV = futureValue || 0;
  let finalPMT = periodicPayment || 0;
  let finalN = numberOfPeriods || 0;
  let finalIY = interestPerYear || 0;

  // Payment timing adjustment factor
  const pmtFactor =
    paymentTiming === PaymentTiming.BEGINNING ? 1 + effectiveRate : 1;

  switch (calculationType) {
    case CalculationType.FV:
      // Calculate Future Value
      if (effectiveRate === 0) {
        calculatedValue = -(finalPV + finalPMT * finalN);
      } else {
        const pvComponent = finalPV * Math.pow(1 + effectiveRate, finalN);
        const pmtComponent =
          finalPMT *
          pmtFactor *
          ((Math.pow(1 + effectiveRate, finalN) - 1) / effectiveRate);
        calculatedValue = -(pvComponent + pmtComponent);
      }
      finalFV = calculatedValue;
      break;

    case CalculationType.PV:
      // Calculate Present Value
      if (effectiveRate === 0) {
        calculatedValue = -(finalFV + finalPMT * finalN);
      } else {
        const fvComponent = finalFV / Math.pow(1 + effectiveRate, finalN);
        const pmtComponent =
          finalPMT *
          pmtFactor *
          ((1 - Math.pow(1 + effectiveRate, -finalN)) / effectiveRate);
        calculatedValue = -(fvComponent + pmtComponent);
      }
      finalPV = calculatedValue;
      break;

    case CalculationType.PMT:
      // Calculate Periodic Payment
      if (effectiveRate === 0) {
        calculatedValue = -(finalPV + finalFV) / finalN;
      } else {
        const numerator = -(
          finalPV * Math.pow(1 + effectiveRate, finalN) +
          finalFV
        );
        const denominator =
          pmtFactor *
          ((Math.pow(1 + effectiveRate, finalN) - 1) / effectiveRate);
        calculatedValue = numerator / denominator;
      }
      finalPMT = calculatedValue;
      break;

    case CalculationType.N:
      // Calculate Number of Periods
      if (effectiveRate === 0) {
        calculatedValue = -(finalPV + finalFV) / finalPMT;
      } else {
        const numerator = Math.log(
          1 +
            (finalFV * effectiveRate) /
              (finalPMT * pmtFactor + finalPV * effectiveRate)
        );
        const denominator = Math.log(1 + effectiveRate);
        calculatedValue = numerator / denominator;
      }
      finalN = calculatedValue;
      break;

    case CalculationType.IY:
      // Calculate Interest Rate (using Newton-Raphson method)
      calculatedValue = solveForInterestRate(
        finalPV,
        finalPMT,
        finalFV,
        finalN,
        pmtFactor,
        periodsPerYear
      );
      finalIY = calculatedValue;
      break;
  }

  // Calculate summary values
  const totalPayments = Math.abs(finalPMT * finalN);
  const totalInterest = Math.abs(finalFV - finalPV - totalPayments);

  return {
    calculatedValue,
    sumOfPayments: totalPayments,
    totalInterest,
    presentValue: finalPV,
    futureValue: finalFV,
    periodicPayment: finalPMT,
    numberOfPeriods: finalN,
    interestPerYear: finalIY,
  };
}

function solveForInterestRate(
  pv: number,
  pmt: number,
  fv: number,
  n: number,
  pmtFactor: number,
  periodsPerYear: number
): number {
  // Newton-Raphson method to solve for interest rate
  let rate = 0.1; // Initial guess (10%)
  const tolerance = 1e-10;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const effectiveRate = rate / periodsPerYear;

    if (effectiveRate === 0) {
      const f = pv + pmt * n + fv;
      if (Math.abs(f) < tolerance) break;
      rate = 0.01; // Small positive rate if zero doesn't work
      continue;
    }

    const factor = Math.pow(1 + effectiveRate, n);
    const f =
      pv * factor + pmt * pmtFactor * ((factor - 1) / effectiveRate) + fv;

    if (Math.abs(f) < tolerance) break;

    // Calculate derivative
    const dfdr =
      (pv * n * factor) / (1 + effectiveRate) +
      (pmt * pmtFactor * (n * effectiveRate * factor - factor + 1)) /
        (effectiveRate * effectiveRate * (1 + effectiveRate));

    const newRate = rate - (f / dfdr) * periodsPerYear;

    if (Math.abs(newRate - rate) < tolerance) break;

    rate = newRate;
  }

  return rate * 100; // Convert to percentage
}

export function calculateFinanceSchedule(
  params: FinanceCalculationParams
): FinanceScheduleDataPoint[] {
  const {
    numberOfPeriods,
    interestPerYear,
    presentValue,
    periodicPayment,
    periodsPerYear,
    paymentTiming,
  } = params;

  if (
    !numberOfPeriods ||
    !interestPerYear ||
    presentValue === undefined ||
    periodicPayment === undefined
  ) {
    return [];
  }

  const effectiveRate = interestPerYear / 100 / periodsPerYear;
  const pmtFactor =
    paymentTiming === PaymentTiming.BEGINNING ? 1 + effectiveRate : 1;

  const schedule: FinanceScheduleDataPoint[] = [];
  let currentPV = presentValue;
  let accumulatedInterest = 0;
  let sumOfPayments = 0;

  for (let period = 1; period <= numberOfPeriods; period++) {
    // Calculate interest for this period
    const interestPayment = currentPV * effectiveRate;
    accumulatedInterest += interestPayment;

    // Add payment to sum
    sumOfPayments += Math.abs(periodicPayment);

    // Calculate new present value after payment and interest
    let newPV: number;
    if (paymentTiming === PaymentTiming.BEGINNING) {
      newPV = (currentPV + periodicPayment) * (1 + effectiveRate);
    } else {
      newPV = currentPV * (1 + effectiveRate) + periodicPayment;
    }

    // Calculate future value (negative of present value in this context)
    const futureValue = -newPV;

    schedule.push({
      period,
      presentValue: currentPV,
      payment: periodicPayment,
      interest: interestPayment,
      futureValue,
      accumulatedInterest,
      sumOfPayments,
    });

    currentPV = newPV;
  }

  return schedule;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatCurrencyDetailed(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value: number): string {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Helper function to format currency inputs with commas
export function formatCurrencyInput(value: string): string {
  // Remove all non-digit and non-decimal characters
  const numericValue = value.replace(/[^\d.-]/g, "");

  // Split by decimal point
  const parts = numericValue.split(".");

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Rejoin with decimal if it exists
  return parts.join(".");
}
