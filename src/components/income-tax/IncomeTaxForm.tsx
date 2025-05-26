"use client";

import { IncomeTaxFormValues, FilingStatus, TaxYear } from "@/types/incomeTax";
import { formatNumber } from "@/utils/incomeTaxCalculations";
import { useState, useEffect } from "react";

interface IncomeTaxFormProps {
  values: IncomeTaxFormValues;
  onChange: (name: string, value: number | string | boolean) => void;
}

export default function IncomeTaxForm({
  values,
  onChange,
}: IncomeTaxFormProps) {
  const [showPerson2, setShowPerson2] = useState(false);

  useEffect(() => {
    setShowPerson2(values.filingStatus === FilingStatus.MARRIED_JOINT);
  }, [values.filingStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      onChange(name, (e.target as HTMLInputElement).checked);
    } else if (type === "radio") {
      onChange(name, value);
    } else if (type === "number") {
      onChange(name, parseFloat(value) || 0);
    } else {
      onChange(name, value);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Remove commas and parse as number
    const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
    onChange(name, numericValue);
  };

  const formatCurrencyInput = (value: number): string => {
    return value > 0 ? formatNumber(value) : "";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Income Tax Details
      </h2>

      <div className="space-y-6">
        {/* Filing Status */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filing Status
          </label>
          <select
            name="filingStatus"
            value={values.filingStatus}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={FilingStatus.SINGLE}>Single</option>
            <option value={FilingStatus.MARRIED_JOINT}>
              Married Filing Jointly
            </option>
            <option value={FilingStatus.MARRIED_SEPARATELY}>
              Married Filing Separately
            </option>
            <option value={FilingStatus.HEAD_OF_HOUSEHOLD}>
              Head of Household
            </option>
            <option value={FilingStatus.QUALIFIED_WIDOW}>
              Qualified Widow
            </option>
          </select>
        </div>

        {/* Dependents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Young Dependents (Age 0-16)
            </label>
            <input
              type="number"
              name="youngDependents"
              value={values.youngDependents}
              onChange={handleChange}
              min="0"
              max="10"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Dependents (Age 17+)
            </label>
            <input
              type="number"
              name="otherDependents"
              value={values.otherDependents}
              onChange={handleChange}
              min="0"
              max="10"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tax Year */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Year
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="taxYear"
                value={TaxYear.YEAR_2024}
                checked={values.taxYear === TaxYear.YEAR_2024}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">
                2024 (return filed in 2025)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="taxYear"
                value={TaxYear.YEAR_2025}
                checked={values.taxYear === TaxYear.YEAR_2025}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">
                2025 (return filed in 2026)
              </span>
            </label>
          </div>
        </div>

        {/* Income Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Income</h3>

          {/* Person 1 Income */}
          <div className="space-y-4">
            {showPerson2 && (
              <h4 className="text-md font-medium text-gray-700 bg-gray-200 p-2 rounded">
                Person 1 (Husband) Earned Income
              </h4>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wages, Tips, Other Compensation
                  <span className="text-xs text-gray-500 block">
                    (W-2 box 1)
                  </span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="salaryIncome"
                    value={formatCurrencyInput(values.salaryIncome)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Federal Income Tax Withheld
                  <span className="text-xs text-gray-500 block">
                    (W-2 box 2)
                  </span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="federalTaxWithheld"
                    value={formatCurrencyInput(values.federalTaxWithheld)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State Income Tax Withheld
                  <span className="text-xs text-gray-500 block">
                    (W-2 box 17)
                  </span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="stateTaxWithheld"
                    value={formatCurrencyInput(values.stateTaxWithheld)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Income Tax Withheld
                  <span className="text-xs text-gray-500 block">
                    (W-2 box 19)
                  </span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="localTaxWithheld"
                    value={formatCurrencyInput(values.localTaxWithheld)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Business Income Toggle */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Has Business or Self Employment Income?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasBusiness"
                    value="true"
                    checked={values.hasBusiness === true}
                    onChange={(e) =>
                      onChange("hasBusiness", e.target.value === "true")
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasBusiness"
                    value="false"
                    checked={values.hasBusiness === false}
                    onChange={(e) =>
                      onChange("hasBusiness", e.target.value === "true")
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Business Income Fields */}
            {values.hasBusiness && (
              <div className="ml-4 space-y-4 border-l-2 border-gray-200 pl-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Income
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="text"
                        name="businessIncome"
                        value={formatCurrencyInput(values.businessIncome)}
                        onChange={handleCurrencyChange}
                        className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Tax Paid
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="text"
                        name="estimatedTaxPaid"
                        value={formatCurrencyInput(values.estimatedTaxPaid)}
                        onChange={handleCurrencyChange}
                        className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medicare Wages
                      <span className="text-xs text-gray-500 block">
                        (W-2 box 5, use 0 if no W-2)
                      </span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="text"
                        name="medicareWages"
                        value={formatCurrencyInput(values.medicareWages)}
                        onChange={handleCurrencyChange}
                        className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Person 2 Income (for married filing jointly) */}
          {showPerson2 && (
            <div className="mt-6 space-y-4">
              <h4 className="text-md font-medium text-gray-700 bg-gray-200 p-2 rounded">
                Person 2 (Wife) Earned Income
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wages, Tips, Other Compensation
                    <span className="text-xs text-gray-500 block">
                      (W-2 box 1)
                    </span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      name="salaryIncome2"
                      value={formatCurrencyInput(values.salaryIncome2)}
                      onChange={handleCurrencyChange}
                      className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Federal Income Tax Withheld
                    <span className="text-xs text-gray-500 block">
                      (W-2 box 2)
                    </span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      name="federalTaxWithheld2"
                      value={formatCurrencyInput(values.federalTaxWithheld2)}
                      onChange={handleCurrencyChange}
                      className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State Income Tax Withheld
                    <span className="text-xs text-gray-500 block">
                      (W-2 box 17)
                    </span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      name="stateTaxWithheld2"
                      value={formatCurrencyInput(values.stateTaxWithheld2)}
                      onChange={handleCurrencyChange}
                      className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local Income Tax Withheld
                    <span className="text-xs text-gray-500 block">
                      (W-2 box 19)
                    </span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      name="localTaxWithheld2"
                      value={formatCurrencyInput(values.localTaxWithheld2)}
                      onChange={handleCurrencyChange}
                      className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Business Income Toggle for Person 2 */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has Business or Self Employment Income?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBusiness2"
                      value="true"
                      checked={values.hasBusiness2 === true}
                      onChange={(e) =>
                        onChange("hasBusiness2", e.target.value === "true")
                      }
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBusiness2"
                      value="false"
                      checked={values.hasBusiness2 === false}
                      onChange={(e) =>
                        onChange("hasBusiness2", e.target.value === "true")
                      }
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Business Income Fields for Person 2 */}
              {values.hasBusiness2 && (
                <div className="ml-4 space-y-4 border-l-2 border-gray-200 pl-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Income
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          name="businessIncome2"
                          value={formatCurrencyInput(values.businessIncome2)}
                          onChange={handleCurrencyChange}
                          className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Tax Paid
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          name="estimatedTaxPaid2"
                          value={formatCurrencyInput(values.estimatedTaxPaid2)}
                          onChange={handleCurrencyChange}
                          className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicare Wages
                        <span className="text-xs text-gray-500 block">
                          (W-2 box 5, use 0 if no W-2)
                        </span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="text"
                          name="medicareWages2"
                          value={formatCurrencyInput(values.medicareWages2)}
                          onChange={handleCurrencyChange}
                          className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Family Income */}
          {showPerson2 && (
            <h4 className="text-md font-medium text-gray-700 bg-gray-200 p-2 rounded mt-6">
              Other Family Incomes
            </h4>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Income
                <span className="text-xs text-gray-500 block">1099-INT</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="interestIncome"
                  value={formatCurrencyInput(values.interestIncome)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordinary Dividends
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="ordinaryDividends"
                  value={formatCurrencyInput(values.ordinaryDividends)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualified Dividends
                <span className="text-xs text-gray-500 block">1099-DIV</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="qualifiedDividends"
                  value={formatCurrencyInput(values.qualifiedDividends)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passive Income
                <span className="text-xs text-gray-500 block">
                  e.g. rentals and real estate, royalties
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="passiveIncome"
                  value={formatCurrencyInput(values.passiveIncome)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short-term Capital Gain
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="shortTermCapitalGain"
                  value={formatCurrencyInput(values.shortTermCapitalGain)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-term Capital Gain
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="longTermCapitalGain"
                  value={formatCurrencyInput(values.longTermCapitalGain)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Income
                <span className="text-xs text-gray-500 block">
                  e.g. unemployment pay(1099-G), retirement pay (1099-R)
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="otherIncome"
                  value={formatCurrencyInput(values.otherIncome)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State+Local Tax Rate (%)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="stateLocalTaxRate"
                  value={values.stateLocalTaxRate}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="20"
                  className="block w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions & Credits Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Deductions & Credits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IRA Contributions
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="iraContributions"
                  value={formatCurrencyInput(values.iraContributions)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Real Estate Tax
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="realEstateTax"
                  value={formatCurrencyInput(values.realEstateTax)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mortgage Interest
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="mortgageInterest"
                  value={formatCurrencyInput(values.mortgageInterest)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Charitable Donations
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="charitableDonations"
                  value={formatCurrencyInput(values.charitableDonations)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Loan Interest
                <span className="text-xs text-gray-500 block">
                  Max $2,500/Person
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="studentLoanInterest"
                  value={formatCurrencyInput(values.studentLoanInterest)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Child & Dependent Care Expense
                <span className="text-xs text-gray-500 block">
                  Max $3,000/Person, $6,000 total, up to age 13
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="childCareExpense"
                  value={formatCurrencyInput(values.childCareExpense)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* College Education Expenses */}
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              College Education Expenses
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student 1
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="tuition1"
                    value={formatCurrencyInput(values.tuition1)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student 2
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="tuition2"
                    value={formatCurrencyInput(values.tuition2)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student 3
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="tuition3"
                    value={formatCurrencyInput(values.tuition3)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student 4
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    name="tuition4"
                    value={formatCurrencyInput(values.tuition4)}
                    onChange={handleCurrencyChange}
                    className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other Deductibles */}
          <div className="mt-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Deductibles
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="text"
                  name="otherDeductibles"
                  value={formatCurrencyInput(values.otherDeductibles)}
                  onChange={handleCurrencyChange}
                  className="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
