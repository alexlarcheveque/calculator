"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import IdealWeightForm from "@/components/ideal-weight/IdealWeightForm";
import IdealWeightSummary from "@/components/ideal-weight/IdealWeightSummary";
import IdealWeightCharts from "@/components/ideal-weight/IdealWeightCharts";
import HealthyWeightGuide from "@/components/ideal-weight/HealthyWeightGuide";
import WeightFormulaGuide from "@/components/ideal-weight/WeightFormulaGuide";
import FAQSection from "@/components/ideal-weight/FAQSection";
import {
  calculateIdealWeight,
  feetInchesToCm,
} from "@/utils/idealWeightCalculations";
import {
  IdealWeightFormValues,
  IdealWeightResults,
  UnitSystem,
  Gender,
} from "@/types/idealWeight";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function IdealWeightPage() {
  const [formValues, setFormValues] = useLocalStorage<IdealWeightFormValues>(
    "idealWeightFormValues",
    {
      age: 25,
      gender: Gender.MALE,
      unitSystem: UnitSystem.IMPERIAL,
      heightFeet: 5,
      heightInches: 10,
      heightCm: 180,
    }
  );

  const [results, setResults] = useState<IdealWeightResults | null>(null);

  useEffect(() => {
    const { age, gender, unitSystem, heightFeet, heightInches, heightCm } =
      formValues;

    // Validate inputs
    if (age < 2 || age > 80) return;

    let heightInCm: number;

    if (unitSystem === UnitSystem.IMPERIAL) {
      if (
        heightFeet < 3 ||
        heightFeet > 8 ||
        heightInches < 0 ||
        heightInches > 11
      )
        return;
      heightInCm = feetInchesToCm(heightFeet, heightInches);
    } else {
      if (heightCm < 100 || heightCm > 250) return;
      heightInCm = heightCm;
    }

    const idealWeightResults = calculateIdealWeight({
      heightInCm,
      gender,
      unitSystem,
    });

    setResults(idealWeightResults);
  }, [formValues]);

  const handleInputChange = (name: string, value: number | string) => {
    const newValues = { ...formValues, [name]: value };

    // When switching unit systems, convert height values
    if (name === "unitSystem") {
      if (
        value === UnitSystem.METRIC &&
        formValues.unitSystem === UnitSystem.IMPERIAL
      ) {
        // Convert from imperial to metric
        const heightInCm = feetInchesToCm(
          formValues.heightFeet,
          formValues.heightInches
        );
        newValues.heightCm = Math.round(heightInCm * 10) / 10; // Round to 1 decimal
      } else if (
        value === UnitSystem.IMPERIAL &&
        formValues.unitSystem === UnitSystem.METRIC
      ) {
        // Convert from metric to imperial
        const totalInches = formValues.heightCm / 2.54;
        newValues.heightFeet = Math.floor(totalInches / 12);
        newValues.heightInches = Math.round((totalInches % 12) * 10) / 10; // Round to 1 decimal
      }
    }

    setFormValues(newValues);
  };

  return (
    <>
      <Head>
        <title>
          Ideal Weight Calculator – Robinson, Miller, Devine & Hamwi Formulas
        </title>
        <meta
          name="description"
          content="Free ideal weight calculator using Robinson, Miller, Devine and Hamwi formulas plus healthy BMI range."
        />
        <link rel="canonical" href="https://your-site.com/ideal-weight" />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Ideal Weight Calculator – Robinson, Miller, Devine & Hamwi"
        />
        <meta
          property="og:description"
          content="Calculate your ideal body weight with four medical formulas and BMI."
        />
        <meta property="og:url" content="https://your-site.com/ideal-weight" />
      </Head>

      <Script id="ideal-weight-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Ideal Weight Calculator",
          operatingSystem: "Web",
          applicationCategory: "HealthApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        })}
      </Script>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Input form */}
          <div className="lg:col-span-4">
            <IdealWeightForm values={formValues} onChange={handleInputChange} />
          </div>

          {/* Results */}
          <div className="lg:col-span-8 space-y-8">
            {results && (
              <>
                <IdealWeightSummary results={results} />
                <IdealWeightCharts results={results} />
              </>
            )}

            {!results && (
              <p className="text-center text-gray-500 lg:mt-20">
                Enter your height to calculate ideal weight ranges.
              </p>
            )}
          </div>
        </div>

        {/* Info Sections */}
        <div className="space-y-8 mb-16">
          <HealthyWeightGuide />
          <WeightFormulaGuide />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </>
  );
}
