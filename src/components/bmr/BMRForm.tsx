import { BMRFormValues } from "@/types/bmr";
import { useState } from "react";
import { feetToFeetInches, feetInchesToFeet } from "@/utils/bmrCalculations";

interface BMRFormProps {
  values: BMRFormValues;
  onChange: (name: string, value: number | string) => void;
  onBatchChange: (updates: Record<string, number | string>) => void;
}

export default function BMRForm({
  values,
  onChange,
  onBatchChange,
}: BMRFormProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [heightInputMode, setHeightInputMode] = useState<
    "combined" | "separate"
  >("separate");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      onChange(name, value);
    } else {
      // Allow empty values for number inputs so users can clear them
      if (value === "") {
        onChange(name, "");
        return;
      }

      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty values for height inputs so users can clear them
    if (value === "") {
      onChange(name === "height" ? "height" : name, "");
      return;
    }

    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) return;

    if (values.heightUnit === "feet") {
      if (name === "heightFeet" || name === "heightInches") {
        const currentHeight = feetToFeetInches(values.height);
        const feet = name === "heightFeet" ? numericValue : currentHeight.feet;
        const inches =
          name === "heightInches" ? numericValue : currentHeight.inches;
        const totalFeet = feetInchesToFeet(feet, inches);
        onChange("height", totalFeet);
      } else {
        onChange("height", numericValue);
      }
    } else {
      onChange("height", numericValue);
    }
  };

  const currentHeightFeetInches =
    values.heightUnit === "feet"
      ? feetToFeetInches(values.height)
      : { feet: 0, inches: 0 };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        BMR Calculator
      </h2>

      {/* Unit Toggle */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => {
              console.log(
                "Before US click:",
                values.heightUnit,
                values.weightUnit
              );
              console.log("Calling onBatchChange for US units");
              onBatchChange({
                heightUnit: "feet",
                weightUnit: "lbs",
              });
              console.log("After US batch change call made");
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              values.heightUnit === "feet" && values.weightUnit === "lbs"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            US Units
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(
                "Before metric click:",
                values.heightUnit,
                values.weightUnit
              );
              console.log("Calling onBatchChange for metric units");
              onBatchChange({
                heightUnit: "cm",
                weightUnit: "kg",
              });
              console.log("After metric batch change call made");

              // Check values after a small delay to see if state updated
              setTimeout(() => {
                console.log(
                  "Values after delay:",
                  values.heightUnit,
                  values.weightUnit
                );
              }, 100);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              values.heightUnit === "cm" && values.weightUnit === "kg"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Metric Units
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Age */}
        <div className="form-group">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={values.age}
            onChange={handleChange}
            min="15"
            max="80"
            step="1"
          />
          <p className="mt-1 text-xs text-gray-500">ages 15 - 80</p>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={values.gender === "male"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={values.gender === "female"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Female</span>
            </label>
          </div>
        </div>

        {/* Height */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height
          </label>
          {values.heightUnit === "feet" ? (
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="heightFeet"
                    className="block w-full pr-12 py-3 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={currentHeightFeetInches.feet}
                    onChange={handleHeightChange}
                    min="3"
                    max="8"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">feet</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="heightInches"
                    className="block w-full pr-16 py-3 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={currentHeightFeetInches.inches}
                    onChange={handleHeightChange}
                    min="0"
                    max="11"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">inches</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                name="height"
                className="block w-full pr-12 py-3 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={values.height}
                onChange={handleHeightChange}
                min="100"
                max="250"
                step="1"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">cm</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Weight
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="weight"
              name="weight"
              className="block w-full pr-20 py-3 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={values.weight}
              onChange={handleChange}
              min={values.weightUnit === "lbs" ? "50" : "20"}
              max={values.weightUnit === "lbs" ? "500" : "200"}
              step={values.weightUnit === "lbs" ? "1" : "0.1"}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">
                {values.weightUnit === "lbs" ? "pounds" : "kg"}
              </span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="form-group">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            {showSettings ? "- Settings" : "+ Settings"}
          </button>

          {showSettings && (
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-md">
              {/* Result Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results unit:
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resultUnit"
                      value="calories"
                      checked={values.resultUnit === "calories"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Calories</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="resultUnit"
                      value="kilojoules"
                      checked={values.resultUnit === "kilojoules"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Kilojoules
                    </span>
                  </label>
                </div>
              </div>

              {/* BMR Formula */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BMR estimation formula:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="formula"
                      value="mifflin"
                      checked={values.formula === "mifflin"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Mifflin St Jeor
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="formula"
                      value="harris"
                      checked={values.formula === "harris"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Revised Harris-Benedict
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="formula"
                      value="katch"
                      checked={values.formula === "katch"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600 mt-0.5"
                    />
                    <div className="ml-2 flex-1">
                      <span className="text-sm text-gray-700">
                        Katch-McArdle
                      </span>
                      {values.formula === "katch" && (
                        <div className="mt-2">
                          <label className="block text-xs text-gray-600 mb-1">
                            Body Fat Percentage:
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <input
                              type="number"
                              name="bodyFatPercentage"
                              className="block w-full pr-8 py-3 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              value={values.bodyFatPercentage}
                              onChange={handleChange}
                              min="5"
                              max="50"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 text-sm">%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
