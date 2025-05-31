"use client";

import { useState, useEffect } from "react";
import SalesTaxForm from "@/components/sales-tax/SalesTaxForm";
import SalesTaxSummary from "@/components/sales-tax/SalesTaxSummary";
import SalesTaxChart from "@/components/sales-tax/SalesTaxChart";
import StateTaxTable from "@/components/sales-tax/StateTaxTable";
import SalesTaxBasics from "@/components/sales-tax/SalesTaxBasics";
import StateLocalVariations from "@/components/sales-tax/StateLocalVariations";
import BusinessPlanning from "@/components/sales-tax/BusinessPlanning";
import SalesTaxFAQSection from "@/components/sales-tax/FAQSection";
import { calculateSalesTax } from "@/utils/salesTaxCalculations";
import {
  SalesTaxFormValues,
  SalesTaxResults,
  CalculationMode,
} from "@/types/salesTax";

export default function SalesTaxPage() {
  const [formValues, setFormValues] = useState<SalesTaxFormValues>({
    beforeTaxPrice: 100,
    salesTaxRate: 6.5,
    afterTaxPrice: 0,
    calculationMode: CalculationMode.CALCULATE_AFTER_TAX,
  });

  const [results, setResults] = useState<SalesTaxResults | null>(null);

  useEffect(() => {
    const calculationResults = calculateSalesTax({
      beforeTaxPrice: formValues.beforeTaxPrice,
      salesTaxRate: formValues.salesTaxRate,
      afterTaxPrice: formValues.afterTaxPrice,
      calculationMode: formValues.calculationMode,
    });

    setResults(calculationResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | CalculationMode) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sales Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate sales tax on purchases with precision using current rates
          for any state or local jurisdiction. Determine total costs including
          tax, find pre-tax prices, or calculate tax amounts. Perfect for
          budgeting large purchases, business planning, or understanding your
          local tax burden. Compare rates across different states and learn how
          sales tax varies by location, exemptions, and business requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <SalesTaxForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <SalesTaxSummary results={results} />
              <SalesTaxChart results={results} />
            </>
          )}
        </div>
      </div>

      {/* State Tax Table */}
      <div className="mb-16">
        <StateTaxTable />
      </div>

      {/* Info Cards Section */}
      <div className="space-y-8 mb-16">
        <SalesTaxBasics />
        <StateLocalVariations />
        <BusinessPlanning />
      </div>

      {/* FAQ Section */}
      <SalesTaxFAQSection />
    </div>
  );
}
