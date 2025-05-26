import {
  DateValidation,
  DateDifferenceResult,
  DateArithmeticResult,
  DateBreakdown,
  Holiday,
  CustomHoliday,
  BusinessDayOptions,
} from "@/types/date";

// Date validation
export function validateDate(
  dateString: string,
  fieldName: string
): DateValidation {
  if (!dateString) {
    return {
      isValid: false,
      errors: [`${fieldName} is required`],
    };
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      errors: [`${fieldName} is not a valid date`],
    };
  }

  // Check for reasonable date range (1900-2100)
  const year = date.getFullYear();
  if (year < 1900 || year > 2100) {
    return {
      isValid: false,
      errors: [`${fieldName} must be between 1900 and 2100`],
    };
  }

  return {
    isValid: true,
    errors: [],
    parsedDate: date,
  };
}

// Calculate date breakdown (years, months, days)
export function calculateDateBreakdown(
  startDate: Date,
  endDate: Date
): DateBreakdown {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastDayOfPrevMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    ).getDate();
    days += lastDayOfPrevMonth;
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Calculate total units
export function calculateTotalUnits(startDate: Date, endDate: Date) {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  // Calculate total months more accurately
  const totalMonths = calculateTotalMonths(startDate, endDate);
  const totalYears = totalMonths / 12;

  return {
    totalDays,
    totalWeeks,
    totalMonths,
    totalYears,
  };
}

function calculateTotalMonths(startDate: Date, endDate: Date): number {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const dayDiff = endDate.getDate() - startDate.getDate();

  let totalMonths = yearDiff * 12 + monthDiff;

  // Adjust for partial months
  if (dayDiff < 0) {
    totalMonths -= 1;
  }

  return totalMonths;
}

// US Federal Holidays
export const US_FEDERAL_HOLIDAYS: Holiday[] = [
  {
    id: "new-years",
    name: "New Year's Day",
    isFixed: true,
    month: 1,
    day: 1,
  },
  {
    id: "mlk-day",
    name: "Martin Luther King Jr. Day",
    isFixed: false,
    getDate: (year: number) => getNthWeekdayOfMonth(year, 1, 1, 3), // 3rd Monday of January
  },
  {
    id: "presidents-day",
    name: "President's Day",
    isFixed: false,
    getDate: (year: number) => getNthWeekdayOfMonth(year, 2, 1, 3), // 3rd Monday of February
  },
  {
    id: "memorial-day",
    name: "Memorial Day",
    isFixed: false,
    getDate: (year: number) => getLastWeekdayOfMonth(year, 5, 1), // Last Monday of May
  },
  {
    id: "juneteenth",
    name: "Juneteenth",
    isFixed: true,
    month: 6,
    day: 19,
  },
  {
    id: "independence-day",
    name: "Independence Day",
    isFixed: true,
    month: 7,
    day: 4,
  },
  {
    id: "labor-day",
    name: "Labor Day",
    isFixed: false,
    getDate: (year: number) => getNthWeekdayOfMonth(year, 9, 1, 1), // 1st Monday of September
  },
  {
    id: "columbus-day",
    name: "Columbus Day",
    isFixed: false,
    getDate: (year: number) => getNthWeekdayOfMonth(year, 10, 1, 2), // 2nd Monday of October
  },
  {
    id: "veterans-day",
    name: "Veterans Day",
    isFixed: true,
    month: 11,
    day: 11,
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    isFixed: false,
    getDate: (year: number) => getNthWeekdayOfMonth(year, 11, 4, 4), // 4th Thursday of November
  },
  {
    id: "christmas",
    name: "Christmas",
    isFixed: true,
    month: 12,
    day: 25,
  },
];

// Additional common holidays
export const ADDITIONAL_HOLIDAYS: Holiday[] = [
  {
    id: "black-friday",
    name: "Black Friday",
    isFixed: false,
    getDate: (year: number) => {
      const thanksgiving = getNthWeekdayOfMonth(year, 11, 4, 4);
      return new Date(thanksgiving.getTime() + 24 * 60 * 60 * 1000);
    },
  },
  {
    id: "christmas-eve",
    name: "Christmas Eve",
    isFixed: true,
    month: 12,
    day: 24,
  },
  {
    id: "new-years-eve",
    name: "New Year's Eve",
    isFixed: true,
    month: 12,
    day: 31,
  },
];

// Helper functions for calculating floating holidays
function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  n: number
): Date {
  const firstDay = new Date(year, month - 1, 1);
  const firstWeekday = firstDay.getDay();
  const daysToAdd = ((weekday - firstWeekday + 7) % 7) + (n - 1) * 7;
  return new Date(year, month - 1, 1 + daysToAdd);
}

function getLastWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number
): Date {
  const lastDay = new Date(year, month, 0);
  const lastWeekday = lastDay.getDay();
  const daysToSubtract = (lastWeekday - weekday + 7) % 7;
  return new Date(year, month - 1, lastDay.getDate() - daysToSubtract);
}

// Get holiday dates for a given year
export function getHolidayDates(
  year: number,
  selectedHolidays: string[],
  customHolidays: CustomHoliday[]
): Date[] {
  const dates: Date[] = [];

  // Add selected federal holidays
  const allHolidays = [...US_FEDERAL_HOLIDAYS, ...ADDITIONAL_HOLIDAYS];
  for (const holiday of allHolidays) {
    if (selectedHolidays.includes(holiday.id)) {
      if (holiday.isFixed && holiday.month && holiday.day) {
        dates.push(new Date(year, holiday.month - 1, holiday.day));
      } else if (holiday.getDate) {
        dates.push(holiday.getDate(year));
      }
    }
  }

  // Add custom holidays
  for (const holiday of customHolidays) {
    if (holiday.name && holiday.month && holiday.day) {
      dates.push(new Date(year, holiday.month - 1, holiday.day));
    }
  }

  return dates;
}

// Check if a date is a weekend
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

// Check if a date is a holiday
export function isHoliday(date: Date, holidayDates: Date[]): boolean {
  return holidayDates.some(
    (holiday) =>
      holiday.getFullYear() === date.getFullYear() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getDate() === date.getDate()
  );
}

// Calculate business days between two dates
export function calculateBusinessDays(
  startDate: Date,
  endDate: Date,
  options: BusinessDayOptions
): number {
  let businessDays = 0;
  const current = new Date(startDate);

  // Get holiday dates for the relevant years
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const holidayDates: Date[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const yearHolidays = getHolidayDates(
      year,
      options.holidays.map((h) => h.id),
      options.customHolidays
    );
    holidayDates.push(...yearHolidays);
  }

  while (current <= endDate) {
    const isWeekendDay = options.excludeWeekends && isWeekend(current);
    const isHolidayDay =
      options.excludeHolidays && isHoliday(current, holidayDates);

    if (!isWeekendDay && !isHolidayDay) {
      businessDays++;
    }

    current.setDate(current.getDate() + 1);
  }

  return businessDays;
}

// Calculate weekend days between two dates
export function calculateWeekendDays(startDate: Date, endDate: Date): number {
  let weekendDays = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    if (isWeekend(current)) {
      weekendDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return weekendDays;
}

// Calculate holiday days between two dates
export function calculateHolidayDays(
  startDate: Date,
  endDate: Date,
  selectedHolidays: string[],
  customHolidays: CustomHoliday[]
): number {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  let holidayDays = 0;

  for (let year = startYear; year <= endYear; year++) {
    const holidayDates = getHolidayDates(
      year,
      selectedHolidays,
      customHolidays
    );

    for (const holiday of holidayDates) {
      if (holiday >= startDate && holiday <= endDate) {
        holidayDays++;
      }
    }
  }

  return holidayDays;
}

// Main date difference calculation
export function calculateDateDifference(
  startDateString: string,
  endDateString: string,
  includeEndDay: boolean = false,
  excludeWeekends: boolean = false,
  excludeHolidays: boolean = false,
  selectedHolidays: string[] = [],
  customHolidays: CustomHoliday[] = []
): DateDifferenceResult {
  // Validate dates
  const startValidation = validateDate(startDateString, "Start date");
  const endValidation = validateDate(endDateString, "End date");

  if (!startValidation.isValid || !endValidation.isValid) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalYears: 0,
      businessDays: 0,
      weekendDays: 0,
      holidayDays: 0,
      isValid: false,
      startDate: new Date(),
      endDate: new Date(),
      breakdown: { years: 0, months: 0, days: 0 },
    };
  }

  const startDate = startValidation.parsedDate!;
  let endDate = endValidation.parsedDate!;

  // Include end day if specified
  if (includeEndDay) {
    endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
  }

  // Ensure start date is before end date
  if (startDate > endDate) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalYears: 0,
      businessDays: 0,
      weekendDays: 0,
      holidayDays: 0,
      isValid: false,
      startDate,
      endDate,
      breakdown: { years: 0, months: 0, days: 0 },
    };
  }

  // Calculate breakdown
  const breakdown = calculateDateBreakdown(startDate, endDate);
  const totals = calculateTotalUnits(startDate, endDate);

  // Calculate business days, weekend days, and holiday days
  const businessDayOptions: BusinessDayOptions = {
    excludeWeekends,
    excludeHolidays,
    holidays: excludeHolidays
      ? US_FEDERAL_HOLIDAYS.filter((h) => selectedHolidays.includes(h.id))
      : [],
    customHolidays: excludeHolidays ? customHolidays : [],
  };

  const businessDays = calculateBusinessDays(
    startDate,
    endDate,
    businessDayOptions
  );
  const weekendDays = calculateWeekendDays(startDate, endDate);
  const holidayDays = calculateHolidayDays(
    startDate,
    endDate,
    selectedHolidays,
    customHolidays
  );

  return {
    years: breakdown.years,
    months: breakdown.months,
    weeks: Math.floor(breakdown.days / 7),
    days: breakdown.days,
    totalDays: totals.totalDays,
    totalWeeks: totals.totalWeeks,
    totalMonths: totals.totalMonths,
    totalYears: totals.totalYears,
    businessDays,
    weekendDays,
    holidayDays,
    isValid: true,
    startDate,
    endDate,
    breakdown,
  };
}

// Add/subtract time from a date
export function calculateDateArithmetic(
  startDateString: string,
  operation: "add" | "subtract",
  years: number = 0,
  months: number = 0,
  weeks: number = 0,
  days: number = 0,
  businessDaysOnly: boolean = false,
  excludeWeekends: boolean = false,
  excludeHolidays: boolean = false,
  selectedHolidays: string[] = [],
  customHolidays: CustomHoliday[] = []
): DateArithmeticResult {
  // Validate start date
  const startValidation = validateDate(startDateString, "Start date");

  if (!startValidation.isValid) {
    return {
      resultDate: new Date(),
      isValid: false,
      startDate: new Date(),
      operation,
      yearsAdded: 0,
      monthsAdded: 0,
      weeksAdded: 0,
      daysAdded: 0,
      businessDaysCalculated: businessDaysOnly,
    };
  }

  const startDate = startValidation.parsedDate!;
  let resultDate = new Date(startDate);

  // Apply operation multiplier
  const multiplier = operation === "add" ? 1 : -1;

  // Add/subtract years and months first
  if (years !== 0) {
    resultDate.setFullYear(resultDate.getFullYear() + years * multiplier);
  }

  if (months !== 0) {
    resultDate.setMonth(resultDate.getMonth() + months * multiplier);
  }

  // Add/subtract weeks and days
  const totalDaysToAdd = (weeks * 7 + days) * multiplier;

  if (businessDaysOnly && totalDaysToAdd !== 0) {
    // Add/subtract business days only
    resultDate = addBusinessDays(resultDate, totalDaysToAdd, {
      excludeWeekends,
      excludeHolidays,
      holidays: excludeHolidays
        ? US_FEDERAL_HOLIDAYS.filter((h) => selectedHolidays.includes(h.id))
        : [],
      customHolidays: excludeHolidays ? customHolidays : [],
    });
  } else if (totalDaysToAdd !== 0) {
    // Add/subtract calendar days
    resultDate.setDate(resultDate.getDate() + totalDaysToAdd);
  }

  return {
    resultDate,
    isValid: true,
    startDate,
    operation,
    yearsAdded: years * multiplier,
    monthsAdded: months * multiplier,
    weeksAdded: weeks * multiplier,
    daysAdded: days * multiplier,
    businessDaysCalculated: businessDaysOnly,
  };
}

// Add business days to a date
function addBusinessDays(
  startDate: Date,
  businessDays: number,
  options: BusinessDayOptions
): Date {
  const result = new Date(startDate);
  let daysAdded = 0;
  const direction = businessDays > 0 ? 1 : -1;
  const targetDays = Math.abs(businessDays);

  // Get holiday dates for relevant years
  const startYear = startDate.getFullYear();
  const endYear = startYear + Math.ceil(targetDays / 250); // Estimate end year
  const holidayDates: Date[] = [];

  for (let year = startYear - 1; year <= endYear + 1; year++) {
    const yearHolidays = getHolidayDates(
      year,
      options.holidays.map((h) => h.id),
      options.customHolidays
    );
    holidayDates.push(...yearHolidays);
  }

  while (daysAdded < targetDays) {
    result.setDate(result.getDate() + direction);

    const isWeekendDay = options.excludeWeekends && isWeekend(result);
    const isHolidayDay =
      options.excludeHolidays && isHoliday(result, holidayDates);

    if (!isWeekendDay && !isHolidayDay) {
      daysAdded++;
    }
  }

  return result;
}

// Utility functions for formatting
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US");
}
