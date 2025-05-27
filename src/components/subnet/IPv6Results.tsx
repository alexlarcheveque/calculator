import { IPv6SubnetResult } from "@/types/subnet";

interface IPv6ResultsProps {
  result: IPv6SubnetResult;
}

export default function IPv6Results({ result }: IPv6ResultsProps) {
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

  const getAddressTypeColor = (addressType: string) => {
    switch (addressType) {
      case "Global Unicast":
        return "text-blue-600 bg-blue-50";
      case "Link Local":
        return "text-green-600 bg-green-50";
      case "Unique Local":
        return "text-purple-600 bg-purple-50";
      case "Multicast":
        return "text-orange-600 bg-orange-50";
      case "Loopback":
        return "text-red-600 bg-red-50";
      case "Unspecified":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Main Results */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          IPv6 Subnet Calculation Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Network Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Network Address:</span>
                <span className="font-mono font-medium break-all">
                  {result.networkAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Prefix Length:</span>
                <span className="font-mono font-medium">
                  /{result.prefixLength}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Number of Addresses:</span>
                <span className="font-medium">{result.numberOfAddresses}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Address Formats
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-gray-700 block">Compressed:</span>
                <span className="font-mono font-medium break-all">
                  {result.compressedAddress}
                </span>
              </div>
              <div>
                <span className="text-gray-700 block">Expanded:</span>
                <span className="font-mono font-medium break-all">
                  {result.expandedAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Type */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Address Classification
        </h4>
        <div className="flex flex-wrap gap-4">
          <div
            className={`px-3 py-2 rounded-lg border ${getAddressTypeColor(
              result.addressType
            )}`}
          >
            <span className="text-sm font-medium">{result.addressType}</span>
          </div>
        </div>
      </div>

      {/* Binary Breakdown */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-purple-800 mb-4">
          Binary Breakdown
        </h4>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-purple-700 mb-1">
              Network Prefix:
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border break-all">
              {result.networkPrefix}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-purple-700 mb-1">
              Host Identifier:
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border break-all">
              {result.hostIdentifier}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-yellow-800 mb-4">
          IPv6 Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">Network</h5>
            <p className="text-yellow-700 font-mono break-all">
              {result.networkAddress}/{result.prefixLength}
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">Address Type</h5>
            <p className="text-yellow-700">{result.addressType}</p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">
              Total Addresses
            </h5>
            <p className="text-yellow-700">{result.numberOfAddresses}</p>
          </div>
          <div>
            <h5 className="font-semibold text-yellow-700 mb-2">
              Prefix Length
            </h5>
            <p className="text-yellow-700">
              /{result.prefixLength} ({result.prefixLength} network bits,{" "}
              {128 - result.prefixLength} host bits)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
