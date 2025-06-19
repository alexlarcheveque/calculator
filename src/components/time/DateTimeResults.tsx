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
    <div className="space-y-6">
      {/* Main Result */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Result</h3>
        <p className="text-gray-600 mb-4">
          The new date and time after adding or subtracting the specified time
          period.
        </p>

        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {formatResultDate()}
          </div>
          <div className="text-2xl font-semibold text-blue-700">
            {formatResultTime()}
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Date Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-blue-600">
                  {result.resultDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day of Week:</span>
                <span className="font-medium text-blue-600">
                  {result.resultDate.toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Month:</span>
                <span className="font-medium text-blue-600">
                  {result.resultDate.toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="font-medium text-blue-600">
                  {result.resultDate.getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Time Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium text-green-600">
                  {formatResultTime()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hour:</span>
                <span className="font-medium text-green-600">
                  {result.resultTime.hours}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minute:</span>
                <span className="font-medium text-green-600">
                  {result.resultTime.minutes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Second:</span>
                <span className="font-medium text-green-600">
                  {result.resultTime.seconds}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
