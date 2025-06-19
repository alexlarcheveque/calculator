import { IPv4SubnetResult } from "@/types/subnet";
import { formatNumber } from "@/utils/subnetCalculations";

interface IPv4ResultsProps {
  result: IPv4SubnetResult;
}

export default function IPv4Results({ result }: IPv4ResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Invalid Input
        </h3>
        <p className="text-red-700">{result.error}</p>
      </div>
    );
  }

  const getIPTypeColor = (ipType: string) => {
    switch (ipType) {
      case "Private":
        return "text-green-600 bg-green-50";
      case "Public":
        return "text-blue-600 bg-blue-50";
      case "Loopback":
        return "text-purple-600 bg-purple-50";
      case "Multicast":
        return "text-orange-600 bg-orange-50";
      case "Reserved":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Essential Network Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Network Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Network:</span>
                <span className="font-mono font-medium">
                  {result.networkAddress}/{result.cidrNotation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Subnet Mask:</span>
                <span className="font-mono font-medium">
                  {result.subnetMask}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Usable Range:</span>
                <span className="font-mono font-medium text-sm">
                  {result.firstUsableHost} - {result.lastUsableHost}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Host Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Usable Hosts:</span>
                <span className="font-medium text-lg text-blue-600">
                  {formatNumber(result.numberOfUsableHosts)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Broadcast:</span>
                <span className="font-mono font-medium">
                  {result.broadcastAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Type:</span>
                <div
                  className={`px-2 py-1 rounded text-sm font-medium ${getIPTypeColor(
                    result.ipType
                  )}`}
                >
                  {result.ipType} (Class {result.networkClass})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
