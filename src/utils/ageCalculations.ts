import {
  AgeResult,
  DateValidation,
  AgeBreakdown,
  LifeStatistics,
  Milestones,
  ZodiacSign,
  BirthDayInfo,
} from "@/types/age";

// Validate date input
export function validateDate(
  dateString: string,
  fieldName: string
): DateValidation {
  const errors: string[] = [];

  if (!dateString.trim()) {
    return {
      isValid: false,
      errors: [`${fieldName} is required`],
    };
  }

  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return {
      isValid: false,
      errors: [`${fieldName} is not a valid date`],
    };
  }

  const now = new Date();
  const maxDate = new Date(now.getFullYear() + 100, 11, 31);
  const minDate = new Date(1900, 0, 1);

  if (parsedDate > maxDate) {
    return {
      isValid: false,
      errors: [`${fieldName} cannot be more than 100 years in the future`],
    };
  }

  if (parsedDate < minDate) {
    return {
      isValid: false,
      errors: [`${fieldName} cannot be before year 1900`],
    };
  }

  return {
    isValid: true,
    errors: [],
    parsedDate,
  };
}

// Calculate precise age breakdown
export function calculateAgeBreakdown(
  birthDate: Date,
  targetDate: Date
): AgeBreakdown {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Calculate total time units
export function calculateTotalUnits(birthDate: Date, targetDate: Date) {
  const diffMs = targetDate.getTime() - birthDate.getTime();

  return {
    totalSeconds: Math.floor(diffMs / 1000),
    totalMinutes: Math.floor(diffMs / (1000 * 60)),
    totalHours: Math.floor(diffMs / (1000 * 60 * 60)),
    totalDays: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
    totalWeeks: Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)),
    totalMonths: calculateTotalMonths(birthDate, targetDate),
  };
}

// Calculate total months more precisely
function calculateTotalMonths(birthDate: Date, targetDate: Date): number {
  let months = (targetDate.getFullYear() - birthDate.getFullYear()) * 12;
  months += targetDate.getMonth() - birthDate.getMonth();

  // Adjust for partial month
  if (targetDate.getDate() < birthDate.getDate()) {
    months--;
  }

  return months;
}

// Calculate next birthday
export function calculateNextBirthday(birthDate: Date, targetDate: Date) {
  const currentYear = targetDate.getFullYear();
  let nextBirthday = new Date(
    currentYear,
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // If birthday has passed this year, move to next year
  if (nextBirthday <= targetDate) {
    nextBirthday = new Date(
      currentYear + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntil = Math.ceil(
    (nextBirthday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const age = nextBirthday.getFullYear() - birthDate.getFullYear();

  return {
    date: nextBirthday,
    daysUntil,
    age,
  };
}

// Main age calculation function
export function calculateAge(
  birthDateString: string,
  targetDateString: string
): AgeResult {
  // Validate dates
  const birthValidation = validateDate(birthDateString, "Birth date");
  const targetValidation = validateDate(targetDateString, "Target date");

  if (!birthValidation.isValid || !targetValidation.isValid) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      isValid: false,
      birthDate: new Date(),
      targetDate: new Date(),
    };
  }

  const birthDate = birthValidation.parsedDate!;
  const targetDate = targetValidation.parsedDate!;

  // Check if birth date is after target date
  if (birthDate > targetDate) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      isValid: false,
      birthDate,
      targetDate,
    };
  }

  // Calculate age breakdown
  const ageBreakdown = calculateAgeBreakdown(birthDate, targetDate);
  const totalUnits = calculateTotalUnits(birthDate, targetDate);

  // Calculate remaining time units
  const remainingMs =
    (targetDate.getTime() - birthDate.getTime()) % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

  // Calculate weeks from remaining days
  const weeks = Math.floor(ageBreakdown.days / 7);
  const remainingDays = ageBreakdown.days % 7;

  // Calculate next birthday
  const nextBirthday = calculateNextBirthday(birthDate, targetDate);

  return {
    years: ageBreakdown.years,
    months: ageBreakdown.months,
    weeks,
    days: remainingDays,
    hours,
    minutes,
    seconds,
    totalDays: totalUnits.totalDays,
    totalWeeks: totalUnits.totalWeeks,
    totalMonths: totalUnits.totalMonths,
    totalHours: totalUnits.totalHours,
    totalMinutes: totalUnits.totalMinutes,
    totalSeconds: totalUnits.totalSeconds,
    isValid: true,
    birthDate,
    targetDate,
    nextBirthday,
  };
}

// Calculate life statistics
export function calculateLifeStatistics(ageResult: AgeResult): LifeStatistics {
  const totalDays = ageResult.totalDays;
  const totalHours = ageResult.totalHours;
  const totalMinutes = ageResult.totalMinutes;
  const totalSeconds = ageResult.totalSeconds;

  // Average heart rate: 70 beats per minute
  const heartbeats = totalMinutes * 70;

  // Average breathing rate: 15 breaths per minute
  const breathsTaken = totalMinutes * 15;

  // Average sleep: 8 hours per day
  const sleepHours = totalDays * 8;

  return {
    totalDaysLived: totalDays,
    totalWeeksLived: ageResult.totalWeeks,
    totalMonthsLived: ageResult.totalMonths,
    totalHoursLived: totalHours,
    totalMinutesLived: totalMinutes,
    totalSecondsLived: totalSeconds,
    heartbeats,
    breathsTaken,
    sleepHours,
  };
}

// Get life milestones
export function getLifeMilestones(
  birthDate: Date,
  targetDate: Date
): Milestones[] {
  const milestones: Omit<Milestones, "date" | "isPassed" | "daysUntil">[] = [
    { name: "First Birthday", age: 1 },
    { name: "Start School", age: 5 },
    { name: "Become a Teenager", age: 13 },
    { name: "Get Driver's License", age: 16 },
    { name: "Become an Adult", age: 18 },
    { name: "Legal Drinking Age", age: 21 },
    { name: "Quarter Century", age: 25 },
    { name: "Thirty", age: 30 },
    { name: "Forty", age: 40 },
    { name: "Half Century", age: 50 },
    { name: "Retirement Age", age: 65 },
    { name: "Three Quarters Century", age: 75 },
    { name: "Century", age: 100 },
  ];

  return milestones.map((milestone) => {
    const milestoneDate = new Date(
      birthDate.getFullYear() + milestone.age,
      birthDate.getMonth(),
      birthDate.getDate()
    );

    const isPassed = milestoneDate <= targetDate;
    const daysUntil = isPassed
      ? undefined
      : Math.ceil(
          (milestoneDate.getTime() - targetDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

    return {
      ...milestone,
      date: milestoneDate,
      isPassed,
      daysUntil,
    };
  });
}

// Get zodiac sign
export function getZodiacSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const zodiacSigns: ZodiacSign[] = [
    {
      sign: "Capricorn",
      symbol: "♑",
      element: "Earth",
      dates: "Dec 22 - Jan 19",
      traits: ["Ambitious", "Disciplined", "Practical", "Responsible"],
    },
    {
      sign: "Aquarius",
      symbol: "♒",
      element: "Air",
      dates: "Jan 20 - Feb 18",
      traits: ["Independent", "Innovative", "Humanitarian", "Eccentric"],
    },
    {
      sign: "Pisces",
      symbol: "♓",
      element: "Water",
      dates: "Feb 19 - Mar 20",
      traits: ["Compassionate", "Intuitive", "Artistic", "Dreamy"],
    },
    {
      sign: "Aries",
      symbol: "♈",
      element: "Fire",
      dates: "Mar 21 - Apr 19",
      traits: ["Energetic", "Courageous", "Confident", "Impulsive"],
    },
    {
      sign: "Taurus",
      symbol: "♉",
      element: "Earth",
      dates: "Apr 20 - May 20",
      traits: ["Reliable", "Patient", "Practical", "Stubborn"],
    },
    {
      sign: "Gemini",
      symbol: "♊",
      element: "Air",
      dates: "May 21 - Jun 20",
      traits: ["Curious", "Adaptable", "Communicative", "Restless"],
    },
    {
      sign: "Cancer",
      symbol: "♋",
      element: "Water",
      dates: "Jun 21 - Jul 22",
      traits: ["Nurturing", "Emotional", "Protective", "Moody"],
    },
    {
      sign: "Leo",
      symbol: "♌",
      element: "Fire",
      dates: "Jul 23 - Aug 22",
      traits: ["Confident", "Generous", "Creative", "Dramatic"],
    },
    {
      sign: "Virgo",
      symbol: "♍",
      element: "Earth",
      dates: "Aug 23 - Sep 22",
      traits: ["Analytical", "Perfectionist", "Helpful", "Critical"],
    },
    {
      sign: "Libra",
      symbol: "♎",
      element: "Air",
      dates: "Sep 23 - Oct 22",
      traits: ["Diplomatic", "Balanced", "Social", "Indecisive"],
    },
    {
      sign: "Scorpio",
      symbol: "♏",
      element: "Water",
      dates: "Oct 23 - Nov 21",
      traits: ["Intense", "Passionate", "Mysterious", "Jealous"],
    },
    {
      sign: "Sagittarius",
      symbol: "♐",
      element: "Fire",
      dates: "Nov 22 - Dec 21",
      traits: ["Adventurous", "Optimistic", "Philosophical", "Blunt"],
    },
  ];

  // Determine zodiac sign based on birth date
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return zodiacSigns[0]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return zodiacSigns[1]; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return zodiacSigns[2]; // Pisces
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return zodiacSigns[3]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return zodiacSigns[4]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return zodiacSigns[5]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return zodiacSigns[6]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return zodiacSigns[7]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return zodiacSigns[8]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return zodiacSigns[9]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return zodiacSigns[10]; // Scorpio
  return zodiacSigns[11]; // Sagittarius
}

// Get Chinese zodiac
export function getChineseZodiac(birthYear: number): string {
  const animals = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  // Chinese zodiac starts from 1900 as year of Rat
  const index = (birthYear - 1900) % 12;
  return animals[index];
}

// Get birthstone
export function getBirthstone(month: number): string {
  const birthstones = [
    "Garnet",
    "Amethyst",
    "Aquamarine",
    "Diamond",
    "Emerald",
    "Pearl",
    "Ruby",
    "Peridot",
    "Sapphire",
    "Opal",
    "Topaz",
    "Turquoise",
  ];
  return birthstones[month - 1];
}

// Get birth flower
export function getBirthFlower(month: number): string {
  const birthFlowers = [
    "Carnation",
    "Violet",
    "Daffodil",
    "Daisy",
    "Lily of the Valley",
    "Rose",
    "Larkspur",
    "Gladiolus",
    "Aster",
    "Marigold",
    "Chrysanthemum",
    "Narcissus",
  ];
  return birthFlowers[month - 1];
}

// Get day of year
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Get week of year
export function getWeekOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.ceil((days + start.getDay() + 1) / 7);
}

// Get birth day information
export function getBirthDayInfo(birthDate: Date): BirthDayInfo {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return {
    dayOfWeek: dayNames[birthDate.getDay()],
    dayOfYear: getDayOfYear(birthDate),
    weekOfYear: getWeekOfYear(birthDate),
    zodiacSign: getZodiacSign(birthDate),
    chineseZodiac: getChineseZodiac(birthDate.getFullYear()),
    birthstone: getBirthstone(birthDate.getMonth() + 1),
    birthFlower: getBirthFlower(birthDate.getMonth() + 1),
  };
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
