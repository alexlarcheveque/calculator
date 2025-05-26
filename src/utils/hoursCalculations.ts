import {
  TimeInput,
  HoursCalculationResult,
  DateHoursCalculationResult,
  HoursBreakdown,
  DateHoursBreakdown,
  TimeValidation,
} from "@/types/hours";

// Time validation
export function validateTime(
  time: TimeInput,
  fieldName: string
): TimeValidation {
  if (time.hours < 1 || time.hours > 12) {
    return {
      isValid: false,
      error: `${fieldName} hours must be between 1 and 12`,
    };
  }

  if (time.minutes < 0 || time.minutes > 59) {
    return {
      isValid: false,
      error: `${fieldName} minutes must be between 0 and 59`,
    };
  }

  return {
    isValid: true,
    normalizedTime: time,
  };
}

// Convert 12-hour time to 24-hour format
export function convertTo24Hour(time: TimeInput): number {
  let hours = time.hours;

  if (time.ampm === "AM") {
    if (hours === 12) {
      hours = 0;
    }
  } else {
    // PM
    if (hours !== 12) {
      hours += 12;
    }
  }

  return hours * 60 + time.minutes; // Return total minutes
}

// Convert minutes to hours and minutes
export function minutesToHoursMinutes(totalMinutes: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

// Calculate hours between two times on the same day
export function calculateHoursBetweenTimes(
  startTime: TimeInput,
  endTime: TimeInput
): HoursCalculationResult {
  // Validate inputs
  const startValidation = validateTime(startTime, "Start time");
  const endValidation = validateTime(endTime, "End time");

  if (!startValidation.isValid) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      isValid: false,
      formatted: "Invalid start time",
      breakdown: {
        hours: 0,
        minutes: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: startValidation.error,
    };
  }

  if (!endValidation.isValid) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      isValid: false,
      formatted: "Invalid end time",
      breakdown: {
        hours: 0,
        minutes: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: endValidation.error,
    };
  }

  // Convert to minutes since midnight
  const startMinutes = convertTo24Hour(startTime);
  let endMinutes = convertTo24Hour(endTime);

  // If end time is before start time, assume it's the next day
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours
  }

  const totalMinutes = endMinutes - startMinutes;
  const { hours, minutes } = minutesToHoursMinutes(totalMinutes);
  const decimalHours = totalMinutes / 60;

  const breakdown: HoursBreakdown = {
    hours,
    minutes,
    totalMinutes,
    decimalHours,
  };

  const formatted = formatHoursMinutes(hours, minutes);

  return {
    totalHours: hours,
    totalMinutes,
    isValid: true,
    formatted,
    breakdown,
  };
}

// Calculate hours between two dates and times
export function calculateHoursBetweenDates(
  startDate: string,
  startTime: TimeInput,
  endDate: string,
  endTime: TimeInput
): DateHoursCalculationResult {
  // Validate dates
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (isNaN(startDateObj.getTime())) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      totalDays: 0,
      isValid: false,
      formatted: "Invalid start date",
      breakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        totalHours: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: "Invalid start date",
    };
  }

  if (isNaN(endDateObj.getTime())) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      totalDays: 0,
      isValid: false,
      formatted: "Invalid end date",
      breakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        totalHours: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: "Invalid end date",
    };
  }

  // Validate times
  const startTimeValidation = validateTime(startTime, "Start time");
  const endTimeValidation = validateTime(endTime, "End time");

  if (!startTimeValidation.isValid) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      totalDays: 0,
      isValid: false,
      formatted: "Invalid start time",
      breakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        totalHours: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: startTimeValidation.error,
    };
  }

  if (!endTimeValidation.isValid) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      totalDays: 0,
      isValid: false,
      formatted: "Invalid end time",
      breakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        totalHours: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: endTimeValidation.error,
    };
  }

  // Create full datetime objects
  const startDateTime = new Date(startDate);
  const startMinutes = convertTo24Hour(startTime);
  startDateTime.setHours(
    Math.floor(startMinutes / 60),
    startMinutes % 60,
    0,
    0
  );

  const endDateTime = new Date(endDate);
  const endMinutes = convertTo24Hour(endTime);
  endDateTime.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);

  // Check if end is before start
  if (endDateTime <= startDateTime) {
    return {
      totalHours: 0,
      totalMinutes: 0,
      totalDays: 0,
      isValid: false,
      formatted: "End date/time must be after start date/time",
      breakdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        totalHours: 0,
        totalMinutes: 0,
        decimalHours: 0,
      },
      error: "End date/time must be after start date/time",
    };
  }

  // Calculate difference in milliseconds
  const diffMs = endDateTime.getTime() - startDateTime.getTime();
  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutes = totalMinutes % (24 * 60);
  const { hours, minutes } = minutesToHoursMinutes(remainingMinutes);
  const totalHours = Math.floor(totalMinutes / 60);
  const decimalHours = totalMinutes / 60;

  const breakdown: DateHoursBreakdown = {
    days,
    hours,
    minutes,
    totalHours,
    totalMinutes,
    decimalHours,
  };

  const formatted = formatDateHours(days, hours, minutes);

  return {
    totalHours,
    totalMinutes,
    totalDays: days,
    isValid: true,
    formatted,
    breakdown,
  };
}

// Formatting functions
export function formatHoursMinutes(hours: number, minutes: number): string {
  if (hours === 0 && minutes === 0) {
    return "0 hours";
  }

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }

  return parts.join(" and ");
}

export function formatDateHours(
  days: number,
  hours: number,
  minutes: number
): string {
  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} day${days !== 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }

  if (parts.length === 0) {
    return "0 hours";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`;
  }

  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatDecimal(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

// Helper functions
export function createEmptyTimeInput(): TimeInput {
  return {
    hours: 8,
    minutes: 30,
    ampm: "AM",
  };
}

export function getCurrentTime(): TimeInput {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm: "AM" | "PM" = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return {
    hours,
    minutes,
    ampm,
  };
}

export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function swapTimes(
  startTime: TimeInput,
  endTime: TimeInput
): {
  newStartTime: TimeInput;
  newEndTime: TimeInput;
} {
  return {
    newStartTime: { ...endTime },
    newEndTime: { ...startTime },
  };
}
