import {
  ConcreteCalculationResult,
  VolumeUnit,
  WeightUnit,
} from "@/types/concrete";
import {
  formatVolume,
  formatWeight,
  formatNumber,
  convertVolume,
  convertWeight,
} from "@/utils/concreteCalculations";

interface ConcreteResultsProps {
  result: ConcreteCalculationResult;
}

export default function ConcreteResults({ result }: ConcreteResultsProps) {
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

  const volumeInYards = convertVolume(result.volume, VolumeUnit.CUBIC_YARDS);
  const volumeInMeters = convertVolume(result.volume, VolumeUnit.CUBIC_METERS);
  const weightInKg = convertWeight(result.weight, WeightUnit.KILOGRAMS);
  const weightInTons = convertWeight(result.weight, WeightUnit.TONS);

  return (
    <div className="mt-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          Concrete Calculation Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Volume Required
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Cubic Feet:</span>
                <span className="font-medium">
                  {formatNumber(result.volume)} ft³
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cubic Yards:</span>
                <span className="font-medium">
                  {formatNumber(volumeInYards)} yd³
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cubic Meters:</span>
                <span className="font-medium">
                  {formatNumber(volumeInMeters)} m³
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700 mb-3">
              Weight Estimate
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Pounds:</span>
                <span className="font-medium">
                  {formatNumber(result.weight, 0)} lbs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Kilograms:</span>
                <span className="font-medium">
                  {formatNumber(weightInKg, 0)} kg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tons:</span>
                <span className="font-medium">
                  {formatNumber(weightInTons)} tons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bag Requirements */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
          Concrete Bag Requirements
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {result.bags.bags60lb}
            </div>
            <div className="text-sm text-gray-600">60 lb bags</div>
            <div className="text-xs text-gray-500 mt-1">(0.45 ft³ per bag)</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {result.bags.bags80lb}
            </div>
            <div className="text-sm text-gray-600">80 lb bags</div>
            <div className="text-xs text-gray-500 mt-1">(0.6 ft³ per bag)</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {result.bags.bags40kg}
            </div>
            <div className="text-sm text-gray-600">40 kg bags</div>
            <div className="text-xs text-gray-500 mt-1">(0.53 ft³ per bag)</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {result.bags.bags20kg}
            </div>
            <div className="text-sm text-gray-600">20 kg bags</div>
            <div className="text-xs text-gray-500 mt-1">(0.27 ft³ per bag)</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> It's recommended to purchase 5-10% extra
            concrete to account for waste and ensure you have enough material
            for your project.
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Additional Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">
              Concrete Density
            </h5>
            <p className="text-gray-600">
              Standard concrete weighs approximately 150 lbs per cubic foot
              (2,400 kg/m³).
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Curing Time</h5>
            <p className="text-gray-600">
              Concrete typically reaches 90% of its strength in 28 days under
              normal conditions.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Mix Ratio</h5>
            <p className="text-gray-600">
              A typical concrete mix ratio is 1:2:3 (cement:sand:gravel) by
              volume.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Water Content</h5>
            <p className="text-gray-600">
              Water-to-cement ratio should typically be between 0.4 to 0.6 for
              optimal strength.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
