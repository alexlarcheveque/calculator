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
      {/* Essential IPv6 Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Network Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Network:</span>
                <span className="font-mono font-medium text-sm break-all">
                  {result.networkAddress}/{result.prefixLength}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Compressed:</span>
                <span className="font-mono font-medium text-sm break-all">
                  {result.compressedAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Type:</span>
                <div
                  className={`px-2 py-1 rounded text-sm font-medium ${getAddressTypeColor(
                    result.addressType
                  )}`}
                >
                  {result.addressType}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-3">
              Address Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Total Addresses:</span>
                <span className="font-medium text-lg text-green-600">
                  {result.numberOfAddresses}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Network Bits:</span>
                <span className="font-medium">{result.prefixLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Host Bits:</span>
                <span className="font-medium">{128 - result.prefixLength}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
