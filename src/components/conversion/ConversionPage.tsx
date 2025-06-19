"use client";

import React from "react";
import ConversionCalculator from "./ConversionCalculator";
import FAQSection from "@/components/ui/FAQSection";

const ConversionPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-600">
          Conversion Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert between common units of length, temperature, area, volume, and
          weight. Simply select the conversion type, enter a value, and choose
          your units.
        </p>
      </div>

      {/* Main Calculator */}
      <ConversionCalculator />

      {/* FAQ Section */}
      <FAQSection
        items={[
          {
            id: "what-is-conversion",
            question: "What is unit conversion?",
            answer:
              "Unit conversion is the process of changing a measurement from one unit to another equivalent unit of the same quantity. For example, converting meters to feet or Celsius to Fahrenheit.",
          },
          {
            id: "why-convert-units",
            question: "Why do I need to convert units?",
            answer:
              "Unit conversion is essential for international communication, scientific calculations, cooking, construction, travel, and many daily activities where different measurement systems are used.",
          },
          {
            id: "accuracy",
            question: "How accurate are these conversions?",
            answer:
              "Our conversions use standard conversion factors and are accurate to many decimal places. For scientific or engineering purposes, always verify the precision requirements for your specific application.",
          },
          {
            id: "temperature-special",
            question: "Why are temperature conversions different?",
            answer:
              "Temperature conversions require special formulas because temperature scales have different zero points and intervals. Celsius and Fahrenheit, for example, don't just differ by a multiplication factor.",
          },
          {
            id: "metric-vs-imperial",
            question:
              "What's the difference between metric and imperial units?",
            answer:
              "The metric system (SI) is based on powers of 10 and is used worldwide. The imperial system is used primarily in the US and includes units like feet, pounds, and Fahrenheit. Metric units are generally easier to convert between.",
          },
        ]}
        title="Frequently Asked Questions"
        includeSchema={true}
        schemaId="conversion-faq-schema"
      />
    </div>
  );
};

export default ConversionPage;
