"use client";

import InfoCard, { ContentSection } from "@/components/ui/InfoCard";
import {
  getBodyFatCategories,
  getJacksonPollockData,
} from "@/utils/bodyFatCalculations";

export default function ReferenceTables() {
  const categories = getBodyFatCategories();
  const jacksonPollockData = getJacksonPollockData();

  const referenceTablesSections: ContentSection[] = [
    {
      type: "text",
      content:
        "Body fat percentage standards and reference values help interpret your calculated results within the context of established health and fitness guidelines. These tables provide evidence-based classifications from leading health organizations and research studies.",
    },
    {
      type: "subheader",
      heading: "American Council on Exercise Body Fat Categories",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Women
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Men
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {category.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.womenRange}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.menRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      type: "subheader",
      heading: "Jackson & Pollock Ideal Body Fat Percentages",
      headingLevel: "h3",
    },
    {
      type: "text",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Age
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Women
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Men
                </th>
              </tr>
            </thead>
            <tbody>
              {jacksonPollockData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {data.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.female}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.male}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <InfoCard
      title="Body Fat Reference Standards"
      sections={referenceTablesSections}
    />
  );
}
