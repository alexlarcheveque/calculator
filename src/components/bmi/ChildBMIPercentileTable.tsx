"use client";

export default function ChildBMIPercentileTable() {
  const percentileCategories = [
    {
      category: "Underweight",
      percentileRange: "Less than 5th percentile",
      color: "#dc2626",
      description: "Below normal weight for age and gender",
    },
    {
      category: "Healthy Weight",
      percentileRange: "5th to 85th percentile",
      color: "#059669",
      description: "Normal weight for age and gender",
    },
    {
      category: "At Risk of Overweight",
      percentileRange: "85th to 95th percentile",
      color: "#d97706",
      description: "Above normal weight for age and gender",
    },
    {
      category: "Overweight",
      percentileRange: "95th percentile or higher",
      color: "#dc2626",
      description: "Well above normal weight for age and gender",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        CDC BMI-for-Age Percentile Categories (Children & Teens)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        The Centers for Disease Control and Prevention (CDC) uses BMI-for-age
        percentiles to assess weight status in children and teens ages 2-19.
        These percentiles compare a child's BMI to others of the same age and
        gender.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Weight Status Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-700">
                Percentile Range
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {percentileCategories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="font-medium">{category.category}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                  {category.percentileRange}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {category.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Understanding Percentiles
          </h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>What percentiles mean:</strong> If your child is in the
              75th percentile, it means their BMI is equal to or higher than 75%
              of children of the same age and gender.
            </p>
            <p>
              <strong>Example:</strong> A 10-year-old boy with a BMI at the 60th
              percentile has a higher BMI than 60% of other 10-year-old boys in
              the reference population.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Important Notes for Parents and Teens
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>
              • BMI is just one indicator of health - overall lifestyle and
              fitness matter more
            </li>
            <li>• Children's BMI naturally changes as they grow and develop</li>
            <li>
              • Growth spurts and puberty can temporarily affect BMI percentiles
            </li>
            <li>
              • Some children may be healthy at higher or lower percentiles
            </li>
            <li>
              • Always discuss BMI results with your pediatrician or healthcare
              provider
            </li>
            <li>
              • Focus on healthy eating habits and regular physical activity
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            🏥 When to Consult Healthcare Providers
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• BMI below 5th percentile or above 85th percentile</li>
            <li>• Significant changes in percentile over time</li>
            <li>• Concerns about eating habits or physical activity levels</li>
            <li>• Questions about healthy growth and development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
