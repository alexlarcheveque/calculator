import {
  CalculationMethod,
  EmbryoAge,
  PregnancyCalculationParams,
  PregnancyResults,
  PregnancyMilestone,
} from "@/types/pregnancy";

export function calculatePregnancy({
  method,
  date,
  cycleLength = 28,
  ultrasoundWeeks = 0,
  ultrasoundDays = 0,
  embryoAge = EmbryoAge.DAY_5,
}: PregnancyCalculationParams): PregnancyResults {
  let dueDate: Date;
  let conceptionDate: Date;
  let lastPeriodDate: Date;

  const today = new Date();

  switch (method) {
    case CalculationMethod.DUE_DATE:
      dueDate = new Date(date);
      // Conception is typically 14 days after LMP, and pregnancy is 280 days from LMP
      conceptionDate = new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000);
      lastPeriodDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
      break;

    case CalculationMethod.LAST_PERIOD:
      lastPeriodDate = new Date(date);
      // Conception typically occurs 14 days after LMP (ovulation)
      conceptionDate = new Date(
        lastPeriodDate.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      // Due date is 280 days (40 weeks) from LMP
      dueDate = new Date(lastPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      break;

    case CalculationMethod.CONCEPTION_DATE:
      conceptionDate = new Date(date);
      // LMP is typically 14 days before conception
      lastPeriodDate = new Date(
        conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000
      );
      // Due date is 266 days from conception
      dueDate = new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000);
      break;

    case CalculationMethod.ULTRASOUND:
      const ultrasoundDate = new Date(date);
      const totalUltrasoundDays = ultrasoundWeeks * 7 + ultrasoundDays;
      // Calculate LMP based on ultrasound gestational age
      lastPeriodDate = new Date(
        ultrasoundDate.getTime() - totalUltrasoundDays * 24 * 60 * 60 * 1000
      );
      conceptionDate = new Date(
        lastPeriodDate.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      dueDate = new Date(lastPeriodDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      break;

    case CalculationMethod.IVF_TRANSFER:
      const transferDate = new Date(date);
      // For IVF, conception date is transfer date minus embryo age
      conceptionDate = new Date(
        transferDate.getTime() - embryoAge * 24 * 60 * 60 * 1000
      );
      // LMP is 14 days before conception
      lastPeriodDate = new Date(
        conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000
      );
      // Due date is 266 days from conception
      dueDate = new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000);
      break;

    default:
      throw new Error("Invalid calculation method");
  }

  // Calculate current gestational age
  const daysSinceLMP = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  const currentWeek = Math.floor(daysSinceLMP / 7);
  const currentDay = daysSinceLMP % 7;

  // Calculate days until due date
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
  );

  // Determine trimester
  let trimester: number;
  if (currentWeek < 13) {
    trimester = 1;
  } else if (currentWeek < 27) {
    trimester = 2;
  } else {
    trimester = 3;
  }

  // Format gestational and fetal age
  const gestationalAge = `${currentWeek} weeks, ${currentDay} days`;
  const fetalWeeks = Math.max(0, currentWeek - 2);
  const fetalDays = currentDay;
  const fetalAge = `${fetalWeeks} weeks, ${fetalDays} days`;

  // Generate milestones
  const milestones = generatePregnancyMilestones(lastPeriodDate);

  return {
    dueDate,
    conceptionDate,
    lastPeriodDate,
    currentWeek,
    currentDay,
    daysUntilDue,
    trimester,
    gestationalAge,
    fetalAge,
    milestones,
  };
}

export function generatePregnancyMilestones(
  lmpDate: Date
): PregnancyMilestone[] {
  const milestones: PregnancyMilestone[] = [];

  const addMilestone = (
    week: number,
    title: string,
    description: string,
    type: "development" | "appointment" | "test" | "preparation"
  ) => {
    const date = new Date(lmpDate.getTime() + week * 7 * 24 * 60 * 60 * 1000);
    milestones.push({ week, date, title, description, type });
  };

  // First Trimester
  addMilestone(
    4,
    "Missed Period",
    "First sign of pregnancy - missed menstrual period",
    "development"
  );
  addMilestone(
    6,
    "Heartbeat Begins",
    "Baby's heart starts beating",
    "development"
  );
  addMilestone(
    8,
    "First Prenatal Visit",
    "Initial prenatal appointment and blood tests",
    "appointment"
  );
  addMilestone(
    10,
    "Major Organs Form",
    "All major organs are developing",
    "development"
  );
  addMilestone(
    12,
    "End of First Trimester",
    "Risk of miscarriage significantly decreases",
    "development"
  );

  // Second Trimester
  addMilestone(
    16,
    "Gender Determination",
    "Baby's gender can often be determined via ultrasound",
    "development"
  );
  addMilestone(
    18,
    "Anatomy Scan",
    "Detailed ultrasound to check baby's development",
    "appointment"
  );
  addMilestone(
    20,
    "Halfway Point",
    "You're halfway through your pregnancy!",
    "development"
  );
  addMilestone(
    24,
    "Viability Milestone",
    "Baby has a chance of survival if born prematurely",
    "development"
  );
  addMilestone(
    26,
    "Glucose Screening",
    "Test for gestational diabetes",
    "test"
  );

  // Third Trimester
  addMilestone(
    28,
    "Third Trimester Begins",
    "Final stretch of pregnancy begins",
    "development"
  );
  addMilestone(
    32,
    "Baby's Bones Harden",
    "Baby's bones are hardening, except for the skull",
    "development"
  );
  addMilestone(
    36,
    "Baby is Full-Term Soon",
    "Baby is almost ready for birth",
    "development"
  );
  addMilestone(37, "Full-Term", "Baby is considered full-term", "development");
  addMilestone(
    39,
    "Optimal Birth Time",
    "Best time for delivery if no complications",
    "preparation"
  );

  return milestones.sort((a, b) => a.week - b.week);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateWeeksAndDays(
  startDate: Date,
  endDate: Date
): { weeks: number; days: number } {
  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

export function addWeeksAndDays(date: Date, weeks: number, days: number): Date {
  const totalDays = weeks * 7 + days;
  return new Date(date.getTime() + totalDays * 24 * 60 * 60 * 1000);
}
