import {
  ConceptionResults,
  FertilityPeriod,
  ConceptionCalculationParams,
} from "@/types/conception";

export function calculateConception(
  params: ConceptionCalculationParams
): ConceptionResults {
  const { lastPeriodDate, cycleLength } = params;

  // Calculate ovulation date (typically 14 days before next period)
  const ovulationDate = new Date(lastPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);

  // Fertility window: 5 days before ovulation to 1 day after
  const fertilityWindowStart = new Date(ovulationDate);
  fertilityWindowStart.setDate(fertilityWindowStart.getDate() - 5);

  const fertilityWindowEnd = new Date(ovulationDate);
  fertilityWindowEnd.setDate(fertilityWindowEnd.getDate() + 1);

  // Most likely conception dates (3 days before ovulation to ovulation day)
  const conceptionEarliest = new Date(ovulationDate);
  conceptionEarliest.setDate(conceptionEarliest.getDate() - 3);

  const conceptionLatest = new Date(ovulationDate);

  const conceptionMostLikely = new Date(ovulationDate);
  conceptionMostLikely.setDate(conceptionMostLikely.getDate() - 1);

  // Due date: 280 days (40 weeks) from last menstrual period
  const dueDate = new Date(lastPeriodDate);
  dueDate.setDate(dueDate.getDate() + 280);

  // Calculate current pregnancy week if conception has occurred
  const today = new Date();
  const daysSinceLastPeriod = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let currentWeek: number | undefined;
  let currentDay: number | undefined;

  if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod <= 280) {
    currentWeek = Math.floor(daysSinceLastPeriod / 7);
    currentDay = daysSinceLastPeriod % 7;
  }

  return {
    ovulationDate,
    fertilityWindowStart,
    fertilityWindowEnd,
    conceptionDateRange: {
      earliest: conceptionEarliest,
      latest: conceptionLatest,
      mostLikely: conceptionMostLikely,
    },
    dueDate,
    currentWeek,
    currentDay,
  };
}

export function calculateMultipleCycles(
  params: ConceptionCalculationParams,
  numberOfCycles: number = 6
): FertilityPeriod[] {
  const { lastPeriodDate, cycleLength } = params;
  const cycles: FertilityPeriod[] = [];

  for (let i = 0; i < numberOfCycles; i++) {
    const cycleStartDate = new Date(lastPeriodDate);
    cycleStartDate.setDate(cycleStartDate.getDate() + i * cycleLength);

    const cycleResults = calculateConception({
      lastPeriodDate: cycleStartDate,
      cycleLength,
    });

    cycles.push({
      cycleNumber: i + 1,
      ovulationDate: cycleResults.ovulationDate,
      fertilityWindowStart: cycleResults.fertilityWindowStart,
      fertilityWindowEnd: cycleResults.fertilityWindowEnd,
      conceptionPossible: true,
      dueDate: cycleResults.dueDate,
    });
  }

  return cycles;
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

export function getDaysBetween(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
