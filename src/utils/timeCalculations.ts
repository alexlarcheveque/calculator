import {
  TimeValue,
  TimeArithmeticResult,
  DateTimeResult,
  TimeExpressionResult,
  TimeToken,
  TimeBreakdown,
  TimeValidation,
  TimeConversion,
} from "@/types/time";

// Time validation
export function validateTime(
  time: TimeValue,
  fieldName: string
): TimeValidation {
  const errors: string[] = [];

  if (time.days < 0) {
    errors.push(`${fieldName} days cannot be negative`);
  }
  if (time.hours < 0 || time.hours > 23) {
    errors.push(`${fieldName} hours must be between 0 and 23`);
  }
  if (time.minutes < 0 || time.minutes > 59) {
    errors.push(`${fieldName} minutes must be between 0 and 59`);
  }
  if (time.seconds < 0 || time.seconds > 59) {
    errors.push(`${fieldName} seconds must be between 0 and 59`);
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: [],
    normalizedTime: normalizeTime(time),
  };
}

// Normalize time values (handle overflow)
export function normalizeTime(time: TimeValue): TimeValue {
  let { days, hours, minutes, seconds } = time;

  // Handle overflow from seconds to minutes
  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
  }

  // Handle overflow from minutes to hours
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  // Handle overflow from hours to days
  if (hours >= 24) {
    days += Math.floor(hours / 24);
    hours = hours % 24;
  }

  return { days, hours, minutes, seconds };
}

// Convert time to total seconds
export function timeToSeconds(time: TimeValue): number {
  return (
    time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds
  );
}

// Convert seconds to time
export function secondsToTime(totalSeconds: number): TimeValue {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

// Calculate time breakdown
export function calculateTimeBreakdown(time: TimeValue): TimeBreakdown {
  const totalSeconds = timeToSeconds(time);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalDays = Math.floor(totalSeconds / 86400);

  const remainingHours = time.hours;
  const remainingMinutes = time.minutes;
  const remainingSeconds = time.seconds;

  return {
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  };
}

// Time arithmetic (add/subtract)
export function calculateTimeArithmetic(
  time1: TimeValue,
  time2: TimeValue,
  operation: "add" | "subtract"
): TimeArithmeticResult {
  // Validate inputs
  const validation1 = validateTime(time1, "First time");
  const validation2 = validateTime(time2, "Second time");

  if (!validation1.isValid || !validation2.isValid) {
    return {
      result: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isValid: false,
      totalSeconds: 0,
      formatted: "Invalid input",
      breakdown: {
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0,
      },
    };
  }

  const seconds1 = timeToSeconds(validation1.normalizedTime!);
  const seconds2 = timeToSeconds(validation2.normalizedTime!);

  let resultSeconds: number;
  if (operation === "add") {
    resultSeconds = seconds1 + seconds2;
  } else {
    resultSeconds = seconds1 - seconds2;
  }

  // Handle negative results
  if (resultSeconds < 0) {
    return {
      result: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isValid: false,
      totalSeconds: 0,
      formatted: "Result cannot be negative",
      breakdown: {
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0,
      },
    };
  }

  const result = secondsToTime(resultSeconds);
  const breakdown = calculateTimeBreakdown(result);
  const formatted = formatTime(result);

  return {
    result,
    isValid: true,
    totalSeconds: resultSeconds,
    formatted,
    breakdown,
  };
}

// Date-time arithmetic
export function calculateDateTimeArithmetic(
  startDate: string,
  startTime: TimeValue,
  timeFormat: "12" | "24",
  ampm: "AM" | "PM",
  operation: "add" | "subtract",
  timeToAdd: TimeValue
): DateTimeResult {
  // Validate start date
  const date = new Date(startDate);
  if (isNaN(date.getTime())) {
    return {
      resultDate: new Date(),
      resultTime: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isValid: false,
      formatted: "Invalid date",
      timeFormat,
    };
  }

  // Validate times
  const startTimeValidation = validateTime(startTime, "Start time");
  const addTimeValidation = validateTime(timeToAdd, "Time to add");

  if (!startTimeValidation.isValid || !addTimeValidation.isValid) {
    return {
      resultDate: new Date(),
      resultTime: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isValid: false,
      formatted: "Invalid time",
      timeFormat,
    };
  }

  // Convert 12-hour to 24-hour format if needed
  let adjustedStartTime = { ...startTime };
  if (timeFormat === "12") {
    if (ampm === "PM" && startTime.hours !== 12) {
      adjustedStartTime.hours += 12;
    } else if (ampm === "AM" && startTime.hours === 12) {
      adjustedStartTime.hours = 0;
    }
  }

  // Create start datetime
  const startDateTime = new Date(date);
  startDateTime.setHours(
    adjustedStartTime.hours,
    adjustedStartTime.minutes,
    adjustedStartTime.seconds
  );

  // Calculate time to add in milliseconds
  const millisecondsToAdd = timeToSeconds(timeToAdd) * 1000;
  const multiplier = operation === "add" ? 1 : -1;

  // Calculate result datetime
  const resultDateTime = new Date(
    startDateTime.getTime() + millisecondsToAdd * multiplier
  );

  // Extract result date and time
  const resultDate = new Date(
    resultDateTime.getFullYear(),
    resultDateTime.getMonth(),
    resultDateTime.getDate()
  );
  const resultTime: TimeValue = {
    days: 0,
    hours: resultDateTime.getHours(),
    minutes: resultDateTime.getMinutes(),
    seconds: resultDateTime.getSeconds(),
  };

  // Format result
  const formatted = formatDateTime(resultDateTime, timeFormat);

  return {
    resultDate,
    resultTime,
    isValid: true,
    formatted,
    timeFormat,
  };
}

// Parse time expression
export function parseTimeExpression(expression: string): TimeExpressionResult {
  try {
    // Clean and normalize the expression
    const cleanExpression = expression
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    // Parse tokens
    const tokens = parseTokens(cleanExpression);

    if (tokens.length === 0) {
      return {
        result: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        isValid: false,
        totalSeconds: 0,
        formatted: "Empty expression",
        parsedTokens: [],
        error: "Expression cannot be empty",
      };
    }

    // Calculate result
    let totalSeconds = 0;
    let currentOperator: "+" | "-" = "+";

    for (const token of tokens) {
      let unitSeconds = 0;
      switch (token.unit) {
        case "d":
          unitSeconds = token.value * 86400;
          break;
        case "h":
          unitSeconds = token.value * 3600;
          break;
        case "m":
          unitSeconds = token.value * 60;
          break;
        case "s":
          unitSeconds = token.value;
          break;
      }

      if (currentOperator === "+") {
        totalSeconds += unitSeconds;
      } else {
        totalSeconds -= unitSeconds;
      }

      // Update operator for next iteration
      if (token.operator) {
        currentOperator = token.operator;
      }
    }

    if (totalSeconds < 0) {
      return {
        result: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        isValid: false,
        totalSeconds: 0,
        formatted: "Result cannot be negative",
        parsedTokens: tokens,
        error: "Expression result is negative",
      };
    }

    const result = secondsToTime(totalSeconds);
    const formatted = formatTime(result);

    return {
      result,
      isValid: true,
      totalSeconds,
      formatted,
      parsedTokens: tokens,
    };
  } catch (error) {
    return {
      result: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isValid: false,
      totalSeconds: 0,
      formatted: "Invalid expression",
      parsedTokens: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Parse expression tokens
function parseTokens(expression: string): TimeToken[] {
  const tokens: TimeToken[] = [];
  const regex = /([+-]?)\s*(\d+(?:\.\d+)?)\s*([dhms])/g;
  let match;

  while ((match = regex.exec(expression)) !== null) {
    const [, operatorStr, valueStr, unit] = match;
    const value = parseFloat(valueStr);
    const operator = operatorStr === "-" ? "-" : "+";

    if (isNaN(value) || value < 0) {
      throw new Error(`Invalid value: ${valueStr}`);
    }

    tokens.push({
      value,
      unit: unit as "d" | "h" | "m" | "s",
      operator: tokens.length === 0 ? undefined : operator,
    });
  }

  // Validate that we parsed the entire expression
  const reconstructed = tokens
    .map((token, index) => {
      const op = index === 0 ? "" : token.operator || "+";
      return `${op}${token.value}${token.unit}`;
    })
    .join(" ")
    .trim();

  const originalNormalized = expression.replace(/\s+/g, "").replace(/\+/g, "");
  const reconstructedNormalized = reconstructed
    .replace(/\s+/g, "")
    .replace(/\+/g, "");

  if (originalNormalized !== reconstructedNormalized) {
    throw new Error("Invalid expression format");
  }

  return tokens;
}

// Time conversions
export function convertTime(time: TimeValue): TimeConversion {
  const totalSeconds = timeToSeconds(time);

  return {
    milliseconds: totalSeconds * 1000,
    seconds: totalSeconds,
    minutes: totalSeconds / 60,
    hours: totalSeconds / 3600,
    days: totalSeconds / 86400,
    weeks: totalSeconds / (86400 * 7),
    months: totalSeconds / (86400 * 30.44), // Average month
    years: totalSeconds / (86400 * 365.25), // Average year
  };
}

// Formatting functions
export function formatTime(time: TimeValue): string {
  const parts: string[] = [];

  if (time.days > 0) {
    parts.push(`${time.days} day${time.days !== 1 ? "s" : ""}`);
  }
  if (time.hours > 0) {
    parts.push(`${time.hours} hour${time.hours !== 1 ? "s" : ""}`);
  }
  if (time.minutes > 0) {
    parts.push(`${time.minutes} minute${time.minutes !== 1 ? "s" : ""}`);
  }
  if (time.seconds > 0) {
    parts.push(`${time.seconds} second${time.seconds !== 1 ? "s" : ""}`);
  }

  if (parts.length === 0) {
    return "0 seconds";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`;
  }

  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

export function formatTimeShort(time: TimeValue): string {
  const parts: string[] = [];

  if (time.days > 0) parts.push(`${time.days}d`);
  if (time.hours > 0) parts.push(`${time.hours}h`);
  if (time.minutes > 0) parts.push(`${time.minutes}m`);
  if (time.seconds > 0) parts.push(`${time.seconds}s`);

  return parts.length > 0 ? parts.join(" ") : "0s";
}

export function formatDateTime(
  dateTime: Date,
  timeFormat: "12" | "24"
): string {
  const date = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let time: string;
  if (timeFormat === "12") {
    time = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } else {
    time = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return `${date} at ${time}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Helper functions
export function createEmptyTime(): TimeValue {
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export function getCurrentTime(): TimeValue {
  const now = new Date();
  return {
    days: 0,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export function getCurrentDateTime(): {
  date: string;
  time: TimeValue;
  ampm: "AM" | "PM";
} {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  let hours = now.getHours();
  const ampm: "AM" | "PM" = hours >= 12 ? "PM" : "AM";

  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  const time: TimeValue = {
    days: 0,
    hours,
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };

  return { date, time, ampm };
}
