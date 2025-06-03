import {
  InterestCalculatorInput,
  InterestCalculatorResult,
  AccumulationData,
  CompoundFrequency,
} from "../components/interest/InterestPage";

export function calculateInterestResults(
  inputs: Partial<InterestCalculatorInput>
): InterestCalculatorResult | null {
  const P_initial = inputs.initialInvestment || 0;
  const annualRate = (inputs.interestRate || 0) / 100;
  const totalInvestmentYearsFloat =
    (inputs.investmentLengthYears || 0) +
    (inputs.investmentLengthMonths || 0) / 12;

  const regularContributionAmt = inputs.regularContributionAmount || 0;
  const contribPaymentFreq = inputs.contributionPaymentFrequency || "monthly";
  const contributionTiming = inputs.contributionTiming || "beginning";
  const compoundFrequency = inputs.compoundFrequency || "annually";

  if (P_initial < 0 || annualRate < 0 || totalInvestmentYearsFloat <= 0) {
    return null;
  }

  const compoundPeriodsPerYearMap: Record<CompoundFrequency, number> = {
    annually: 1,
    monthly: 12,
    daily: 365,
  };

  // Calculate future value of initial investment using selected compound frequency
  const N_compound = compoundPeriodsPerYearMap[compoundFrequency];
  const periodicRate = annualRate / N_compound;
  const totalPeriods = N_compound * totalInvestmentYearsFloat;

  // FV of initial investment: P × (1 + r/n)^(nt)
  const futureValueInitial =
    P_initial * Math.pow(1 + periodicRate, totalPeriods);
  const interestFromInitial = futureValueInitial - P_initial;

  // Calculate future value of contributions
  let futureValueContributions = 0;
  let totalContributions = 0;
  let interestFromContributions = 0;

  if (regularContributionAmt > 0) {
    if (contribPaymentFreq === "monthly") {
      // Monthly contributions: each contribution compounds from when it's made
      const totalMonths = Math.floor(totalInvestmentYearsFloat * 12);
      const monthlyRate = annualRate / 12;

      for (let month = 0; month < totalMonths; month++) {
        const contributionTime = month / 12; // Time when contribution is made
        let timeToGrow = totalInvestmentYearsFloat - contributionTime;

        // Adjust for contribution timing (beginning vs end of month)
        if (contributionTiming === "end") {
          timeToGrow -= 1 / 12; // Contribution made at end of month
        }

        if (timeToGrow > 0) {
          // Each contribution compounds monthly from when it's made
          const monthlyPeriodsToGrow = timeToGrow * 12;
          const contributionFV =
            regularContributionAmt *
            Math.pow(1 + monthlyRate, monthlyPeriodsToGrow);
          futureValueContributions += contributionFV;
        }

        totalContributions += regularContributionAmt;
      }
    } else if (contribPaymentFreq === "annually") {
      // Annual contributions: use annuity due formula adjusted for selected compound frequency
      const totalYears = Math.floor(totalInvestmentYearsFloat);

      for (let year = 0; year < totalYears; year++) {
        const contributionTime = year; // Time when contribution is made
        let timeToGrow = totalInvestmentYearsFloat - contributionTime;

        // Adjust for contribution timing (beginning vs end of year)
        if (contributionTiming === "end") {
          timeToGrow -= 1; // Contribution made at end of year
        }

        if (timeToGrow > 0) {
          // Each contribution compounds at selected frequency from when it's made
          const periodsToGrow = N_compound * timeToGrow;
          const contributionFV =
            regularContributionAmt * Math.pow(1 + periodicRate, periodsToGrow);
          futureValueContributions += contributionFV;
        }

        totalContributions += regularContributionAmt;
      }
    }

    interestFromContributions = futureValueContributions - totalContributions;
  }

  const endingBalance = futureValueInitial + futureValueContributions;
  const totalInterest = interestFromInitial + interestFromContributions;
  const totalPrincipal = P_initial + totalContributions;

  // Generate simplified schedules (we'll keep the basic structure for now)
  const monthlySchedule: AccumulationData[] = [];
  const yearlySchedule: AccumulationData[] = [];

  // Generate yearly schedule
  for (let year = 1; year <= Math.ceil(totalInvestmentYearsFloat); year++) {
    const timeElapsed = Math.min(year, totalInvestmentYearsFloat);

    // Calculate values at this point in time
    const initialAtTime =
      P_initial * Math.pow(1 + periodicRate, N_compound * timeElapsed);

    let contributionsAtTime = 0;
    let contributionsPrincipalAtTime = 0;

    if (contribPaymentFreq === "monthly") {
      const monthsElapsed = Math.min(
        timeElapsed * 12,
        Math.floor(totalInvestmentYearsFloat * 12)
      );
      for (let month = 0; month < monthsElapsed; month++) {
        const monthlyRate = annualRate / 12;
        const timeFromContribution = timeElapsed - month / 12;
        if (timeFromContribution > 0) {
          contributionsAtTime +=
            regularContributionAmt *
            Math.pow(1 + monthlyRate, timeFromContribution * 12);
        }
        contributionsPrincipalAtTime += regularContributionAmt;
      }
    } else if (contribPaymentFreq === "annually") {
      const yearsElapsed = Math.min(
        timeElapsed,
        Math.floor(totalInvestmentYearsFloat)
      );
      for (let y = 0; y < yearsElapsed; y++) {
        const timeFromContribution = timeElapsed - y;
        if (timeFromContribution > 0) {
          contributionsAtTime +=
            regularContributionAmt *
            Math.pow(1 + periodicRate, N_compound * timeFromContribution);
        }
        contributionsPrincipalAtTime += regularContributionAmt;
      }
    }

    const balanceAtTime = initialAtTime + contributionsAtTime;
    const interestAtTime =
      balanceAtTime - P_initial - contributionsPrincipalAtTime;

    yearlySchedule.push({
      period: year,
      year: year,
      deposit:
        year === 1
          ? P_initial +
            (contribPaymentFreq === "monthly"
              ? regularContributionAmt * 12
              : regularContributionAmt)
          : contribPaymentFreq === "monthly"
          ? regularContributionAmt * 12
          : regularContributionAmt,
      interest: interestAtTime,
      endingBalance: balanceAtTime,
      isYearEnd: true,
    });
  }

  return {
    endingBalance: endingBalance,
    totalPrincipal: totalPrincipal,
    totalContributions: totalContributions,
    totalInterest: totalInterest,
    interestOfInitialInvestment: interestFromInitial,
    interestOfContributions: interestFromContributions,
    monthlyAccumulationSchedule: monthlySchedule,
    yearlyAccumulationSchedule: yearlySchedule,
  };
}
