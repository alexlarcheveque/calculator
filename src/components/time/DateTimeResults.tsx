import { DateTimeResult } from "@/types/time";

interface DateTimeResultsProps {
  result: DateTimeResult;
}

export default function DateTimeResults({ result }: DateTimeResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">{result.formatted}</p>
      </div>
    );
  }

  const formatResultTime = () => {
    if (result.timeFormat === "12") {
      let hours = result.resultTime.hours;
      const ampm = hours >= 12 ? "PM" : "AM";
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;

      return `${hours}:${result.resultTime.minutes
        .toString()
        .padStart(2, "0")}:${result.resultTime.seconds
        .toString()
        .padStart(2, "0")} ${ampm}`;
    } else {
      return `${result.resultTime.hours
        .toString()
        .padStart(2, "0")}:${result.resultTime.minutes
        .toString()
        .padStart(2, "0")}:${result.resultTime.seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const formatResultDate = () => {
    return result.resultDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          Date-Time Calculation Result
        </h3>

        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {formatResultDate()}
          </div>
          <div className="text-xl font-semibold text-green-700">
            {formatResultTime()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">Result Date</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Date:</span>
                <span className="font-medium">
                  {result.resultDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Day of Week:</span>
                <span className="font-medium">
                  {result.resultDate.toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Month:</span>
                <span className="font-medium">
                  {result.resultDate.toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Year:</span>
                <span className="font-medium">
                  {result.resultDate.getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-3">Result Time</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Time:</span>
                <span className="font-medium">{formatResultTime()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Hour:</span>
                <span className="font-medium">{result.resultTime.hours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Minute:</span>
                <span className="font-medium">{result.resultTime.minutes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Second:</span>
                <span className="font-medium">{result.resultTime.seconds}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-700 mb-2">Summary</h4>
        <p className="text-blue-800">
          The calculation resulted in{" "}
          <span className="font-bold">{result.formatted}</span>.
        </p>
      </div>
    </div>
  );
}
