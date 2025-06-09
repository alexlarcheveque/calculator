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
        // Use iterative approach to solve the TVM equation for N
        // PV * (1 + r)^N + PMT * pmtFactor * ((1 + r)^N - 1) / r + FV = 0
        calculatedValue = solveForPeriods(
          finalPV,
          finalPMT,
          finalFV,
          effectiveRate,
          pmtFactor
        );

        // Check if the scenario is impossible
        if (!isFinite(calculatedValue) || isNaN(calculatedValue)) {
          // Return an error result indicating impossible scenario
          return {
            calculatedValue: NaN,
            sumOfPayments: NaN,
            totalInterest: NaN,
            presentValue: finalPV,
            futureValue: finalFV,
            periodicPayment: finalPMT,
            numberOfPeriods: NaN,
            interestPerYear: finalIY,
          };
        }
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
  const totalPayments = finalPMT * finalN;

  // Calculate total interest as the net cost of the financial arrangement
  // Total all cash outflows and subtract all cash inflows
  let totalOutflows = 0;
  let totalInflows = 0;

  // Present Value: positive = inflow, negative = outflow
  if (finalPV > 0) {
    totalInflows += finalPV;
  } else {
    totalOutflows += Math.abs(finalPV);
  }

  // Payments: negative = outflow, positive = inflow
  if (totalPayments < 0) {
    totalOutflows += Math.abs(totalPayments);
  } else {
    totalInflows += totalPayments;
  }

  // Future Value: positive = inflow, negative = outflow
  if (finalFV > 0) {
    totalInflows += finalFV;
  } else {
    totalOutflows += Math.abs(finalFV);
  }

  const totalInterest = totalOutflows - totalInflows;

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
  // Use bisection method followed by Newton-Raphson for more robust convergence
  // TVM equation: PV * (1 + r)^n + PMT * pmtFactor * ((1 + r)^n - 1) / r + FV = 0

  const tolerance = 1e-12;
  const maxIterations = 1000;

  // First, try to find bounds using bisection method
  let lowerBound = -0.99; // -99% interest rate
  let upperBound = 5.0; // 500% interest rate

  // Helper function to evaluate TVM equation
  const evaluateTVM = (annualRate: number): number => {
    if (annualRate <= -1) return Infinity; // Invalid rate

    const effectiveRate = annualRate / periodsPerYear;

    if (Math.abs(effectiveRate) < 1e-10) {
      // Handle zero interest rate case
      return pv + pmt * pmtFactor * n + fv;
    }

    const factor = Math.pow(1 + effectiveRate, n);
    return pv * factor + pmt * pmtFactor * ((factor - 1) / effectiveRate) + fv;
  };

  // Check if bounds contain a root
  let fLower = evaluateTVM(lowerBound);
  let fUpper = evaluateTVM(upperBound);

  // Adjust bounds if necessary
  while (fLower * fUpper > 0 && upperBound < 10) {
    upperBound *= 2;
    fUpper = evaluateTVM(upperBound);
  }

  // Use bisection method to narrow down the range
  let rate = (lowerBound + upperBound) / 2;

  for (let i = 0; i < 50; i++) {
    const fMid = evaluateTVM(rate);

    if (Math.abs(fMid) < tolerance) break;

    if (fLower * fMid < 0) {
      upperBound = rate;
      fUpper = fMid;
    } else {
      lowerBound = rate;
      fLower = fMid;
    }

    rate = (lowerBound + upperBound) / 2;
  }

  // Refine with Newton-Raphson method
  for (let i = 0; i < maxIterations; i++) {
    const effectiveRate = rate / periodsPerYear;

    if (effectiveRate <= -1) {
      rate = 0.01; // Reset to positive rate
      continue;
    }

    if (Math.abs(effectiveRate) < 1e-10) {
      const f = pv + pmt * pmtFactor * n + fv;
      if (Math.abs(f) < tolerance) break;
      rate = 0.01;
      continue;
    }

    const factor = Math.pow(1 + effectiveRate, n);
    const f =
      pv * factor + pmt * pmtFactor * ((factor - 1) / effectiveRate) + fv;

    if (Math.abs(f) < tolerance) break;

    // Calculate derivative df/dr (with respect to annual rate)
    const dfdr =
      (1 / periodsPerYear) *
      ((pv * n * factor) / (1 + effectiveRate) +
        pmt *
          pmtFactor *
          ((n * effectiveRate * factor - factor + 1) /
            (effectiveRate * effectiveRate * (1 + effectiveRate))));

    if (Math.abs(dfdr) < tolerance) break;

    const newRate = rate - f / dfdr;

    if (Math.abs(newRate - rate) < tolerance) break;

    // Keep rate within reasonable bounds
    rate = Math.max(-0.99, Math.min(10, newRate));
  }

  return rate * 100; // Convert to percentage
}

function solveForPeriods(
  pv: number,
  pmt: number,
  fv: number,
  effectiveRate: number,
  pmtFactor: number
): number {
  // First check if the scenario is mathematically possible
  if (effectiveRate > 0) {
    // For positive interest rates, check if payments can service the debt
    const interestOnPV = pv * effectiveRate;
    const netPayment = Math.abs(pmt * pmtFactor);

    // If we're borrowing money (PV > 0) and making payments (PMT < 0)
    // but the payments are smaller than the interest alone, it's impossible
    if (pv > 0 && pmt < 0 && netPayment < interestOnPV && fv < 0) {
      return NaN; // Impossible scenario
    }

    // If we're lending money (PV < 0) but receiving small payments (PMT > 0)
    // that can't cover the growth, it's also impossible
    if (
      pv < 0 &&
      pmt > 0 &&
      netPayment < Math.abs(pv * effectiveRate) &&
      fv > 0
    ) {
      return NaN; // Impossible scenario
    }
  }

  // Use Newton-Raphson method to solve for number of periods
  // Equation: PV * (1 + r)^N + PMT * pmtFactor * ((1 + r)^N - 1) / r + FV = 0

  let n = 5; // Initial guess - start with a reasonable value
  const tolerance = 1e-10;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const factor = Math.pow(1 + effectiveRate, n);

    // Calculate the TVM equation value
    const f =
      pv * factor + pmt * pmtFactor * ((factor - 1) / effectiveRate) + fv;

    if (Math.abs(f) < tolerance) break;

    // Calculate derivative df/dn
    const lnFactor = Math.log(1 + effectiveRate);
    const dfdn =
      pv * factor * lnFactor +
      (pmt * pmtFactor * factor * lnFactor) / effectiveRate;

    if (Math.abs(dfdn) < tolerance) break; // Avoid division by zero

    const newN = n - f / dfdn;

    if (Math.abs(newN - n) < tolerance) break;

    // Ensure N stays positive and reasonable
    n = Math.max(0.01, Math.min(1000, newN));

    // If we're not converging to a reasonable solution, it might be impossible
    if (i > 50 && (n < 0.1 || n > 500)) {
      return NaN; // Likely impossible scenario
    }
  }

  // Final sanity check
  if (n < 0.1 || n > 500 || !isFinite(n)) {
    return NaN;
  }

  return n;
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
