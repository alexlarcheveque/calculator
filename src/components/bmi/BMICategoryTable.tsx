"use client";

import { BMI_CATEGORIES } from "@/types/bmi";

export default function BMICategoryTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        BMI Categories for Adults
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        This is the World Health Organization's (WHO) recommended body weight
        based on BMI values for adults. It is used for both men and women, age
        20 or older.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Classification
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-700">
                BMI Range - kg/m²
              </th>
            </tr>
          </thead>
          <tbody>
            {BMI_CATEGORIES.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {category.range}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Risks Associated with Being Overweight
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Being overweight increases the risk of a number of serious diseases
            and health conditions:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• High blood pressure</li>
            <li>
              • Higher levels of LDL cholesterol and lower levels of HDL
              cholesterol
            </li>
            <li>• Type II diabetes</li>
            <li>• Coronary heart disease</li>
            <li>• Stroke</li>
            <li>• Gallbladder disease</li>
            <li>• Osteoarthritis</li>
            <li>• Sleep apnea and breathing problems</li>
            <li>
              • Certain cancers (endometrial, breast, colon, kidney,
              gallbladder, liver)
            </li>
            <li>• Low quality of life and mental health issues</li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Risks Associated with Being Underweight
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Being underweight also has its own associated risks:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• Malnutrition, vitamin deficiencies, anemia</li>
            <li>• Osteoporosis (bone weakness)</li>
            <li>• Decreased immune function</li>
            <li>• Growth and development issues</li>
            <li>• Reproductive issues for women</li>
            <li>• Potential complications from surgery</li>
            <li>• Increased risk of mortality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
