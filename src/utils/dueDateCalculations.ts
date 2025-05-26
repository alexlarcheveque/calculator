import {
  DueDateCalculationParams,
  DueDateResults,
  EstimationMethod,
  EmbryoAge,
  PregnancyMilestone,
} from "@/types/dueDate";

export function calculateDueDate(
  params: DueDateCalculationParams
): DueDateResults {
  let lmpDate: Date;

  // Calculate LMP date based on estimation method
  switch (params.estimationMethod) {
    case EstimationMethod.LAST_PERIOD:
      lmpDate = params.lastPeriodDate!;
      break;

    case EstimationMethod.CONCEPTION_DATE:
      // Conception typically occurs 14 days after LMP
      lmpDate = new Date(params.conceptionDate!);
      lmpDate.setDate(lmpDate.getDate() - 14);
      break;

    case EstimationMethod.ULTRASOUND:
      // Calculate LMP from ultrasound data
      const totalUltrasoundDays =
        params.ultrasoundWeeks! * 7 + params.ultrasoundDays!;
      lmpDate = new Date(params.ultrasoundDate!);
      lmpDate.setDate(lmpDate.getDate() - totalUltrasoundDays);
      break;

    case EstimationMethod.IVF_TRANSFER:
      // For IVF, calculate based on embryo age
      lmpDate = new Date(params.ivfTransferDate!);
      if (params.embryoAge === EmbryoAge.DAY_3) {
        lmpDate.setDate(lmpDate.getDate() - 17); // 14 + 3
      } else if (params.embryoAge === EmbryoAge.DAY_5) {
        lmpDate.setDate(lmpDate.getDate() - 19); // 14 + 5
      } else if (params.embryoAge === EmbryoAge.DAY_6) {
        lmpDate.setDate(lmpDate.getDate() - 20); // 14 + 6
      }
      break;

    default:
      lmpDate = params.lastPeriodDate!;
  }

  // Calculate due date (280 days from LMP)
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280);

  // Calculate conception date (14 days after LMP)
  const conceptionDate = new Date(lmpDate);
  conceptionDate.setDate(conceptionDate.getDate() + 14);

  // Calculate implantation date (6-12 days after conception, using 10 as average)
  const implantationDate = new Date(conceptionDate);
  implantationDate.setDate(implantationDate.getDate() + 10);

  // Calculate current gestational age
  const today = new Date();
  const daysSinceLMP = Math.floor(
    (today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const currentWeek = Math.floor(daysSinceLMP / 7);
  const gestationalAge = {
    weeks: Math.floor(daysSinceLMP / 7),
    days: daysSinceLMP % 7,
  };

  // Calculate trimester
  let trimester = 1;
  if (currentWeek >= 13) trimester = 2;
  if (currentWeek >= 27) trimester = 3;

  // Calculate important dates
  const firstTrimesterEnd = new Date(lmpDate);
  firstTrimesterEnd.setDate(firstTrimesterEnd.getDate() + 13 * 7);

  const secondTrimesterEnd = new Date(lmpDate);
  secondTrimesterEnd.setDate(secondTrimesterEnd.getDate() + 27 * 7);

  const thirdTrimesterEnd = dueDate;

  const viabilityDate = new Date(lmpDate);
  viabilityDate.setDate(viabilityDate.getDate() + 24 * 7); // 24 weeks

  const fullTermStart = new Date(lmpDate);
  fullTermStart.setDate(fullTermStart.getDate() + 37 * 7); // 37 weeks

  const fullTermEnd = new Date(lmpDate);
  fullTermEnd.setDate(fullTermEnd.getDate() + 42 * 7); // 42 weeks

  // Calculate days until due and percentage complete
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const percentageComplete = Math.min(
    100,
    Math.max(0, (daysSinceLMP / 280) * 100)
  );

  return {
    dueDate,
    gestationalAge,
    currentWeek,
    trimester,
    conceptionDate,
    implantationDate,
    firstTrimesterEnd,
    secondTrimesterEnd,
    thirdTrimesterEnd,
    viabilityDate,
    fullTermStart,
    fullTermEnd,
    daysUntilDue,
    percentageComplete,
  };
}

export function getPregnancyMilestones(lmpDate: Date): PregnancyMilestone[] {
  const milestones: PregnancyMilestone[] = [];

  const addMilestone = (
    weeks: number,
    description: string,
    category: "trimester" | "development" | "medical"
  ) => {
    const date = new Date(lmpDate);
    date.setDate(date.getDate() + weeks * 7);
    milestones.push({ date, week: weeks, description, category });
  };

  // Trimester milestones
  addMilestone(13, "End of First Trimester", "trimester");
  addMilestone(27, "End of Second Trimester", "trimester");

  // Development milestones
  addMilestone(4, "Missed Period", "development");
  addMilestone(6, "Heart begins to beat", "development");
  addMilestone(8, "Major organs form", "development");
  addMilestone(12, "Sex can be determined", "development");
  addMilestone(16, "You may feel first movements", "development");
  addMilestone(20, "Anatomy scan", "medical");
  addMilestone(24, "Viability milestone", "medical");
  addMilestone(28, "Third trimester begins", "trimester");
  addMilestone(32, "Rapid brain development", "development");
  addMilestone(36, "Baby is considered full-term soon", "development");
  addMilestone(37, "Full-term begins", "medical");
  addMilestone(40, "Due date", "medical");
  addMilestone(42, "Post-term begins", "medical");

  return milestones.sort((a, b) => a.date.getTime() - b.date.getTime());
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

export function getWeeksAndDaysText(weeks: number, days: number): string {
  let text = "";
  if (weeks > 0) {
    text += `${weeks} week${weeks !== 1 ? "s" : ""}`;
  }
  if (days > 0) {
    if (text) text += " and ";
    text += `${days} day${days !== 1 ? "s" : ""}`;
  }
  return text || "0 days";
}
