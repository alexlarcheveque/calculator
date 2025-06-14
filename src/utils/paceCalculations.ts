import {
  CalculatorType,
  DistanceUnit,
  PaceUnit,
  PaceFormValues,
  PaceResults,
  SplitTime,
  MultipointSegment,
  MultipointResults,
  MultipointSegmentResult,
  PaceConverterFormValues,
  PaceConverterResults,
  FinishTimeFormValues,
  FinishTimeResults,
  WorldRecord,
} from "@/types/pace";

// Time conversion utilities
export function timeStringToSeconds(timeStr: string): number {
  const parts = timeStr.split(":").map((part) => parseFloat(part) || 0);

  if (parts.length === 1) {
    // Just seconds
    return parts[0];
  } else if (parts.length === 2) {
    // mm:ss
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // hh:mm:ss
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
}

// Distance conversion utilities
export function convertDistance(
  distance: number,
  fromUnit: DistanceUnit,
  toUnit: DistanceUnit
): number {
  // Convert to meters first
  let meters: number;

  switch (fromUnit) {
    case DistanceUnit.MILES:
      meters = distance * 1609.344;
      break;
    case DistanceUnit.KILOMETERS:
      meters = distance * 1000;
      break;
    case DistanceUnit.METERS:
      meters = distance;
      break;
    case DistanceUnit.YARDS:
      meters = distance * 0.9144;
      break;
    default:
      meters = distance;
  }

  // Convert from meters to target unit
  switch (toUnit) {
    case DistanceUnit.MILES:
      return meters / 1609.344;
    case DistanceUnit.KILOMETERS:
      return meters / 1000;
    case DistanceUnit.METERS:
      return meters;
    case DistanceUnit.YARDS:
      return meters / 0.9144;
    default:
      return meters;
  }
}

// Main pace calculation function
export function calculatePace(formValues: PaceFormValues): PaceResults {
  const { calculatorType, time, distance, distanceUnit, pace, paceUnit } =
    formValues;

  let calculatedValue = "";
  let paceFormatted = "";
  let speedFormatted = "";
  let timeFormatted = "";
  let distanceFormatted = "";

  if (calculatorType === CalculatorType.PACE) {
    // Calculate pace from time and distance
    const timeInSeconds = timeStringToSeconds(time);
    const distanceInMiles = convertDistance(
      distance,
      distanceUnit,
      DistanceUnit.MILES
    );
    const distanceInKm = convertDistance(
      distance,
      distanceUnit,
      DistanceUnit.KILOMETERS
    );

    if (timeInSeconds > 0 && distance > 0) {
      const pacePerMileSeconds = timeInSeconds / distanceInMiles;
      const pacePerKmSeconds = timeInSeconds / distanceInKm;
      const speedMph = distanceInMiles / (timeInSeconds / 3600);
      const speedKph = distanceInKm / (timeInSeconds / 3600);

      // Use the selected pace unit to determine output format
      if (paceUnit === PaceUnit.TIME_PER_MILE) {
        calculatedValue = secondsToTimeString(pacePerMileSeconds);
        paceFormatted = `${secondsToTimeString(pacePerMileSeconds)} per mile`;
        speedFormatted = `${speedMph.toFixed(2)} mph`;
      } else if (paceUnit === PaceUnit.TIME_PER_KILOMETER) {
        calculatedValue = secondsToTimeString(pacePerKmSeconds);
        paceFormatted = `${secondsToTimeString(pacePerKmSeconds)} per km`;
        speedFormatted = `${speedKph.toFixed(2)} kph`;
      } else if (paceUnit === PaceUnit.MILES_PER_HOUR) {
        calculatedValue = speedMph.toFixed(2);
        paceFormatted = `${secondsToTimeString(pacePerMileSeconds)} per mile`;
        speedFormatted = `${speedMph.toFixed(2)} mph`;
      } else if (paceUnit === PaceUnit.KILOMETERS_PER_HOUR) {
        calculatedValue = speedKph.toFixed(2);
        paceFormatted = `${secondsToTimeString(pacePerKmSeconds)} per km`;
        speedFormatted = `${speedKph.toFixed(2)} kph`;
      } else {
        // Default to mile-based for other units
        calculatedValue = secondsToTimeString(pacePerMileSeconds);
        paceFormatted = `${secondsToTimeString(pacePerMileSeconds)} per mile`;
        speedFormatted = `${speedMph.toFixed(2)} mph`;
      }
    }
  } else if (calculatorType === CalculatorType.TIME) {
    // Calculate time from pace and distance
    const paceInSeconds = timeStringToSeconds(pace);
    let timeInSeconds = 0;

    if (paceInSeconds > 0 && distance > 0) {
      if (paceUnit === PaceUnit.TIME_PER_MILE) {
        const distanceInMiles = convertDistance(
          distance,
          distanceUnit,
          DistanceUnit.MILES
        );
        timeInSeconds = paceInSeconds * distanceInMiles;
      } else if (paceUnit === PaceUnit.TIME_PER_KILOMETER) {
        const distanceInKm = convertDistance(
          distance,
          distanceUnit,
          DistanceUnit.KILOMETERS
        );
        timeInSeconds = paceInSeconds * distanceInKm;
      } else if (paceUnit === PaceUnit.MILES_PER_HOUR) {
        const distanceInMiles = convertDistance(
          distance,
          distanceUnit,
          DistanceUnit.MILES
        );
        const speed = parseFloat(pace);
        timeInSeconds = (distanceInMiles / speed) * 3600;
      } else if (paceUnit === PaceUnit.KILOMETERS_PER_HOUR) {
        const distanceInKm = convertDistance(
          distance,
          distanceUnit,
          DistanceUnit.KILOMETERS
        );
        const speed = parseFloat(pace);
        timeInSeconds = (distanceInKm / speed) * 3600;
      }

      calculatedValue = secondsToTimeString(timeInSeconds);
      timeFormatted = calculatedValue;
    }
  } else if (calculatorType === CalculatorType.DISTANCE) {
    // Calculate distance from time and pace
    const timeInSeconds = timeStringToSeconds(time);
    const paceInSeconds = timeStringToSeconds(pace);
    let calculatedDistance = 0;

    if (timeInSeconds > 0 && paceInSeconds > 0) {
      if (paceUnit === PaceUnit.TIME_PER_MILE) {
        calculatedDistance = timeInSeconds / paceInSeconds;
        calculatedValue = `${calculatedDistance.toFixed(2)} miles`;
      } else if (paceUnit === PaceUnit.TIME_PER_KILOMETER) {
        calculatedDistance = timeInSeconds / paceInSeconds;
        calculatedValue = `${calculatedDistance.toFixed(2)} kilometers`;
      } else if (paceUnit === PaceUnit.MILES_PER_HOUR) {
        const speed = parseFloat(pace);
        calculatedDistance = speed * (timeInSeconds / 3600);
        calculatedValue = `${calculatedDistance.toFixed(2)} miles`;
      } else if (paceUnit === PaceUnit.KILOMETERS_PER_HOUR) {
        const speed = parseFloat(pace);
        calculatedDistance = speed * (timeInSeconds / 3600);
        calculatedValue = `${calculatedDistance.toFixed(2)} kilometers`;
      }

      distanceFormatted = calculatedValue;
    }
  }

  // Generate split times
  const splits = generateSplitTimes(formValues);

  return {
    calculatedValue,
    pace: paceFormatted,
    speed: speedFormatted,
    timeFormatted,
    distanceFormatted,
    splits,
  };
}

function generateSplitTimes(formValues: PaceFormValues): SplitTime[] {
  const splits: SplitTime[] = [];
  const { time, distance, distanceUnit } = formValues;

  if (!time || !distance) return splits;

  const timeInSeconds = timeStringToSeconds(time);
  const distanceInMiles = convertDistance(
    distance,
    distanceUnit,
    DistanceUnit.MILES
  );
  const distanceInKm = convertDistance(
    distance,
    distanceUnit,
    DistanceUnit.KILOMETERS
  );

  if (timeInSeconds > 0 && distance > 0) {
    const pacePerMileSeconds = timeInSeconds / distanceInMiles;
    const pacePerKmSeconds = timeInSeconds / distanceInKm;

    // Common split distances
    const commonSplits = [
      { distance: 1, unit: "mile" },
      { distance: 5, unit: "km" },
      { distance: 10, unit: "km" },
      { distance: 13.1, unit: "miles" }, // Half marathon
      { distance: 26.2, unit: "miles" }, // Marathon
    ];

    commonSplits.forEach((split) => {
      let splitTime = 0;
      if (split.unit === "mile") {
        splitTime = pacePerMileSeconds * split.distance;
      } else {
        splitTime = pacePerKmSeconds * split.distance;
      }

      splits.push({
        distance: `${split.distance} ${split.unit}${
          split.distance !== 1 ? "s" : ""
        }`,
        time: secondsToTimeString(splitTime),
        unit: split.unit,
      });
    });
  }

  return splits;
}

export function calculateMultipoint(
  segments: MultipointSegment[],
  preferredPaceUnit: PaceUnit
): MultipointResults {
  const results: MultipointSegmentResult[] = [];
  let totalTimeSeconds = 0;
  let totalDistanceMeters = 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment.distance || !segment.time) continue;

    const segmentTimeSeconds = timeStringToSeconds(segment.time);
    const segmentDistanceMeters = convertDistance(
      segment.distance,
      segment.distanceUnit,
      DistanceUnit.METERS
    );

    // Calculate segment time (difference from previous cumulative time)
    const actualSegmentTime =
      i === 0 ? segmentTimeSeconds : segmentTimeSeconds - totalTimeSeconds;

    if (actualSegmentTime > 0 && segmentDistanceMeters > 0) {
      const segmentDistanceMiles = convertDistance(
        segment.distance,
        segment.distanceUnit,
        DistanceUnit.MILES
      );
      const segmentDistanceKm = convertDistance(
        segment.distance,
        segment.distanceUnit,
        DistanceUnit.KILOMETERS
      );

      const pacePerMileSeconds = actualSegmentTime / segmentDistanceMiles;
      const speedMph = segmentDistanceMiles / (actualSegmentTime / 3600);

      results.push({
        segmentNumber: i + 1,
        distance: `${segment.distance} ${segment.distanceUnit.toLowerCase()}`,
        segmentTime: secondsToTimeString(actualSegmentTime),
        pace: secondsToTimeString(pacePerMileSeconds) + " per mile",
        speed: `${speedMph.toFixed(2)} mph`,
      });
    }

    totalTimeSeconds = segmentTimeSeconds;
    totalDistanceMeters = convertDistance(
      segment.distance,
      segment.distanceUnit,
      DistanceUnit.METERS
    );
  }

  const totalDistanceMiles = convertDistance(
    totalDistanceMeters,
    DistanceUnit.METERS,
    DistanceUnit.MILES
  );
  const averagePaceSeconds = totalTimeSeconds / totalDistanceMiles;

  return {
    segments: results,
    totalDistance: totalDistanceMiles,
    totalTime: secondsToTimeString(totalTimeSeconds),
    averagePace: secondsToTimeString(averagePaceSeconds) + " per mile",
  };
}

export function convertPace(
  formValues: PaceConverterFormValues
): PaceConverterResults {
  const { fromPace, fromPaceUnit, toPaceUnit } = formValues;

  if (!fromPace) {
    return {
      convertedPace: "",
      fromFormatted: "",
      toFormatted: "",
    };
  }

  // Convert to a standard format (seconds per mile)
  let secondsPerMile = 0;

  if (fromPaceUnit === PaceUnit.TIME_PER_MILE) {
    secondsPerMile = timeStringToSeconds(fromPace);
  } else if (fromPaceUnit === PaceUnit.TIME_PER_KILOMETER) {
    const secondsPerKm = timeStringToSeconds(fromPace);
    secondsPerMile = secondsPerKm * 1.609344; // Convert km pace to mile pace
  } else if (fromPaceUnit === PaceUnit.MILES_PER_HOUR) {
    const mph = parseFloat(fromPace);
    secondsPerMile = 3600 / mph; // Convert mph to seconds per mile
  } else if (fromPaceUnit === PaceUnit.KILOMETERS_PER_HOUR) {
    const kph = parseFloat(fromPace);
    const mph = kph / 1.609344;
    secondsPerMile = 3600 / mph;
  }

  // Convert to target unit
  let convertedValue = "";

  if (toPaceUnit === PaceUnit.TIME_PER_MILE) {
    convertedValue = secondsToTimeString(secondsPerMile);
  } else if (toPaceUnit === PaceUnit.TIME_PER_KILOMETER) {
    const secondsPerKm = secondsPerMile / 1.609344;
    convertedValue = secondsToTimeString(secondsPerKm);
  } else if (toPaceUnit === PaceUnit.MILES_PER_HOUR) {
    const mph = 3600 / secondsPerMile;
    convertedValue = mph.toFixed(2);
  } else if (toPaceUnit === PaceUnit.KILOMETERS_PER_HOUR) {
    const mph = 3600 / secondsPerMile;
    const kph = mph * 1.609344;
    convertedValue = kph.toFixed(2);
  }

  return {
    convertedPace: convertedValue,
    fromFormatted: `${fromPace} ${getPaceUnitLabel(fromPaceUnit)}`,
    toFormatted: `${convertedValue} ${getPaceUnitLabel(toPaceUnit)}`,
  };
}

export function calculateFinishTime(
  formValues: FinishTimeFormValues
): FinishTimeResults {
  const {
    currentDistance,
    currentDistanceUnit,
    elapsedTime,
    fullDistance,
    fullDistanceUnit,
  } = formValues;

  const elapsedTimeSeconds = timeStringToSeconds(elapsedTime);
  const currentDistanceMiles = convertDistance(
    currentDistance,
    currentDistanceUnit,
    DistanceUnit.MILES
  );
  const fullDistanceMiles = convertDistance(
    fullDistance,
    fullDistanceUnit,
    DistanceUnit.MILES
  );

  if (
    elapsedTimeSeconds <= 0 ||
    currentDistanceMiles <= 0 ||
    fullDistanceMiles <= 0 ||
    currentDistanceMiles >= fullDistanceMiles
  ) {
    return {
      estimatedFinishTime: "",
      remainingTime: "",
      remainingDistance: "",
      currentPace: "",
      projectedTotalTime: "",
    };
  }

  const currentPaceSeconds = elapsedTimeSeconds / currentDistanceMiles;
  const remainingDistanceMiles = fullDistanceMiles - currentDistanceMiles;
  const remainingTimeSeconds = remainingDistanceMiles * currentPaceSeconds;
  const totalProjectedTimeSeconds = elapsedTimeSeconds + remainingTimeSeconds;

  // Calculate estimated finish time (current time + remaining time)
  const now = new Date();
  const finishTime = new Date(now.getTime() + remainingTimeSeconds * 1000);

  return {
    estimatedFinishTime: finishTime.toLocaleTimeString(),
    remainingTime: secondsToTimeString(remainingTimeSeconds),
    remainingDistance: `${remainingDistanceMiles.toFixed(2)} miles`,
    currentPace: secondsToTimeString(currentPaceSeconds) + " per mile",
    projectedTotalTime: secondsToTimeString(totalProjectedTimeSeconds),
  };
}

function getPaceUnitLabel(unit: PaceUnit): string {
  switch (unit) {
    case PaceUnit.TIME_PER_MILE:
      return "per mile";
    case PaceUnit.TIME_PER_KILOMETER:
      return "per kilometer";
    case PaceUnit.MILES_PER_HOUR:
      return "mph";
    case PaceUnit.KILOMETERS_PER_HOUR:
      return "kph";
    case PaceUnit.METERS_PER_MINUTE:
      return "m/min";
    case PaceUnit.METERS_PER_SECOND:
      return "m/s";
    case PaceUnit.YARDS_PER_MINUTE:
      return "yd/min";
    case PaceUnit.YARDS_PER_SECOND:
      return "yd/s";
    default:
      return "";
  }
}

export function getPresetDistances(): {
  label: string;
  distance: number;
  unit: DistanceUnit;
}[] {
  return [
    { label: "1 Mile", distance: 1, unit: DistanceUnit.MILES },
    { label: "5 Miles", distance: 5, unit: DistanceUnit.MILES },
    { label: "10 Miles", distance: 10, unit: DistanceUnit.MILES },
    { label: "Half-Marathon", distance: 13.1, unit: DistanceUnit.MILES },
    { label: "Marathon", distance: 26.2, unit: DistanceUnit.MILES },
    { label: "5K", distance: 5, unit: DistanceUnit.KILOMETERS },
    { label: "10K", distance: 10, unit: DistanceUnit.KILOMETERS },
  ];
}

export function getWorldRecords(): WorldRecord[] {
  return [
    {
      category: "100 meters",
      mensPace: "2:35/mile or 1:36/km",
      womensPace: "2:49/mile or 1:45/km",
    },
    {
      category: "200 meters",
      mensPace: "2:35/mile or 1:36/km",
      womensPace: "2:52/mile or 1:47/km",
    },
    {
      category: "400 meters",
      mensPace: "2:54/mile or 1:48/km",
      womensPace: "3:12/mile or 1:59/km",
    },
    {
      category: "800 meters",
      mensPace: "3:23/mile or 2:06/km",
      womensPace: "3:48/mile or 2:21/km",
    },
    {
      category: "1,500 meters",
      mensPace: "3:41/mile or 2:17/km",
      womensPace: "4:07/mile or 2:34/km",
    },
    {
      category: "1 mile",
      mensPace: "3:43/mile or 2:19/km",
      womensPace: "4:13/mile or 2:37/km",
    },
    {
      category: "5K",
      mensPace: "4:04/mile or 2:31/km",
      womensPace: "4:34/mile or 2:50/km",
    },
    {
      category: "10K",
      mensPace: "4:14/mile or 2:38/km",
      womensPace: "4:45/mile or 2:57/km",
    },
    {
      category: "Half Marathon",
      mensPace: "4:27/mile or 2:46/km",
      womensPace: "4:58/mile or 3:05/km",
    },
    {
      category: "Marathon",
      mensPace: "4:41/mile or 2:55/km",
      womensPace: "5:10/mile or 3:13/km",
    },
  ];
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
