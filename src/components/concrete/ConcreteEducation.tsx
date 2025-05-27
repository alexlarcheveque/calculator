export default function ConcreteEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About Concrete and Construction
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What is Concrete?
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Concrete is a material comprised of a number of coarse aggregates
              (particulate materials such as sand, gravel, crushed stone, and
              slag) bonded with cement. Cement is a substance that is used to
              bind materials, such as aggregate, by adhering to said materials,
              then hardening over time. While there are many types of cement,
              Portland cement is the most commonly used cement, and is an
              ingredient in concrete, mortar, and plasters.
            </p>
            <p>
              Concrete can be purchased in multiple forms, including in 60 or
              80-pound bags, or delivered in large amounts by specialized
              concrete mixer trucks. Proper mixing is essential for the
              production of strong, uniform concrete. It involves mixing water,
              aggregate, cement, and any desired additives.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Concrete Mixing and Placement
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Production of concrete is time-sensitive, and the concrete must be
              placed before it hardens since it is usually prepared as a viscous
              fluid. Some concretes are even designed to harden more quickly for
              applications that require rapid set time. Alternatively, in some
              factory settings, concrete is mixed into dryer forms to
              manufacture precast concrete products such as concrete walls.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                Basic Mix Ratios
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>General Purpose Mix:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>1 part cement</li>
                    <li>2 parts sand</li>
                    <li>3 parts gravel</li>
                    <li>0.5 parts water</li>
                  </ul>
                </div>
                <div>
                  <strong>High Strength Mix:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>1 part cement</li>
                    <li>1.5 parts sand</li>
                    <li>2.5 parts gravel</li>
                    <li>0.4 parts water</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Concrete Curing Process
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The process of concrete hardening once it has been placed is
              called curing, and is a slow process. It typically takes concrete
              around four weeks to reach over 90% of its final strength, and the
              strengthening can continue for up to three years. Ensuring that
              the concrete is damp can increase the strength of the concrete
              during the early stages of curing.
            </p>
            <p>
              This is achieved through techniques such as spraying concrete
              slabs with compounds that create a film over the concrete that
              retains water, as well as ponding, where concrete is submerged in
              water and wrapped in plastic.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Time Period
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Strength Achieved
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1 day</td>
                    <td className="border border-gray-300 px-4 py-2">16%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Initial set
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3 days</td>
                    <td className="border border-gray-300 px-4 py-2">40%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Forms can be removed
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                    <td className="border border-gray-300 px-4 py-2">65%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Light traffic possible
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      14 days
                    </td>
                    <td className="border border-gray-300 px-4 py-2">80%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Normal use begins
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      28 days
                    </td>
                    <td className="border border-gray-300 px-4 py-2">90%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Design strength reached
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1 year</td>
                    <td className="border border-gray-300 px-4 py-2">100%</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Full strength achieved
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Concrete Bag Coverage and Calculations
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              When purchasing bagged concrete, it's important to understand
              coverage rates to ensure you buy the right amount for your
              project. Different bag sizes have different coverage areas and
              volumes.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Bag Size
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Coverage (Cubic Feet)
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Typical Use
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Approximate Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      20 kg (44 lbs)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      0.27 ft³
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Small repairs, posts
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$3-5</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      40 kg (88 lbs)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      0.53 ft³
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Medium projects
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$5-8</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">60 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">
                      0.45 ft³
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      General purpose
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$4-6</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">80 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">
                      0.60 ft³
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Large projects
                    </td>
                    <td className="border border-gray-300 px-4 py-2">$5-7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Types of Concrete Projects
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Residential Projects
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Driveways and walkways</li>
                  <li>Patio slabs</li>
                  <li>Foundation footings</li>
                  <li>Fence post holes</li>
                  <li>Garage floors</li>
                  <li>Basement walls</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Commercial Projects
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Parking lots</li>
                  <li>Building foundations</li>
                  <li>Sidewalks and curbs</li>
                  <li>Retaining walls</li>
                  <li>Loading docks</li>
                  <li>Industrial floors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Planning and Safety Tips
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Before You Start
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Check local building codes and permits</li>
                  <li>Call utility companies to mark underground lines</li>
                  <li>Plan for proper drainage</li>
                  <li>Order 5-10% extra concrete for waste</li>
                  <li>Prepare all tools and equipment</li>
                  <li>Check weather conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Safety Considerations
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Wear protective clothing and eyewear</li>
                  <li>Use gloves when handling cement</li>
                  <li>Ensure proper ventilation when mixing</li>
                  <li>Have first aid supplies available</li>
                  <li>Work with a partner for large projects</li>
                  <li>Keep tools clean and organized</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Related Calculators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <a
              href="/volume"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Volume Calculator
            </a>
            <a
              href="/percentage"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Percentage Calculator
            </a>
            <a
              href="/time"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Time Calculator
            </a>
            <a
              href="/date"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Date Calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
