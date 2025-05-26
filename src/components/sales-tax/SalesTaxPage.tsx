"use client";

import { useState, useEffect } from "react";
import SalesTaxForm from "@/components/sales-tax/SalesTaxForm";
import SalesTaxSummary from "@/components/sales-tax/SalesTaxSummary";
import SalesTaxChart from "@/components/sales-tax/SalesTaxChart";
import StateTaxTable from "@/components/sales-tax/StateTaxTable";
import FAQSection from "@/components/sales-tax/FAQSection";
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

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
