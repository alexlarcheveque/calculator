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

  const getNetworkClassColor = (networkClass: string) => {
    switch (networkClass) {
      case "A":
        return "text-green-600 bg-green-50";
      case "B":
        return "text-blue-600 bg-blue-50";
      case "C":
        return "text-purple-600 bg-purple-50";
      case "D":
        return "text-orange-600 bg-orange-50";
      case "E":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Main Results */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          IPv4 Subnet Calculation Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Network Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Network Address:</span>
                <span className="font-mono font-medium">
                  {result.networkAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Broadcast Address:</span>
                <span className="font-mono font-medium">
                  {result.broadcastAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Subnet Mask:</span>
                <span className="font-mono font-medium">
                  {result.subnetMask}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Wildcard Mask:</span>
                <span className="font-mono font-medium">
                  {result.wildcardMask}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">CIDR Notation:</span>
                <span className="font-mono font-medium">
                  /{result.cidrNotation}
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
                <span className="text-gray-700">First Usable Host:</span>
                <span className="font-mono font-medium">
                  {result.firstUsableHost}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Last Usable Host:</span>
                <span className="font-mono font-medium">
                  {result.lastUsableHost}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Hosts:</span>
                <span className="font-medium">
                  {formatNumber(result.numberOfHosts)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Usable Hosts:</span>
                <span className="font-medium">
                  {formatNumber(result.numberOfUsableHosts)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classification */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          IP Classification
        </h4>
        <div className="flex flex-wrap gap-4">
          <div
            className={`px-3 py-2 rounded-lg border ${getNetworkClassColor(
              result.networkClass
            )}`}
          >
            <span className="text-sm font-medium">
              Class {result.networkClass}
            </span>
          </div>
          <div
            className={`px-3 py-2 rounded-lg border ${getIPTypeColor(
              result.ipType
            )}`}
          >
            <span className="text-sm font-medium">{result.ipType} IP</span>
          </div>
        </div>
      </div>

      {/* Binary Representation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
          Binary Representation
        </h4>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-green-700 mb-1">
              Network Address:
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border break-all">
              {result.binaryNetworkAddress}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-green-700 mb-1">
              Subnet Mask:
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border break-all">
              {result.binarySubnetMask}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-yellow-800 mb-4">
          Subnet Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">
              Network Range
            </h5>
            <p className="text-yellow-700">
              {result.networkAddress} - {result.broadcastAddress}
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">Usable Range</h5>
            <p className="text-yellow-700">
              {result.firstUsableHost} - {result.lastUsableHost}
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">Subnet Size</h5>
            <p className="text-yellow-700">
              /{result.cidrNotation} ({formatNumber(result.numberOfUsableHosts)}{" "}
              usable hosts)
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">IP Type</h5>
            <p className="text-yellow-700">
              {result.ipType}{" "}
              {result.networkClass && `(Class ${result.networkClass})`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
