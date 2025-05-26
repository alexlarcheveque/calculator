export default function GPAEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About GPA and Academic Performance
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Understanding GPA
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Grade Point Average (GPA) is a commonly used indicator of an
              individual's academic achievement in school. It is the average of
              the grades attained in each course, taking course credit into
              consideration. Grading systems vary in different countries, or
              even schools. This calculator accepts letter grades as well as
              numerical inputs.
            </p>
            <p>
              The GPA is calculated by dividing the total number of grade points
              earned by the total number of credit hours attempted. Grade points
              are calculated by multiplying the grade point value by the number
              of credit hours for each course.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Letter Grade and Numerical Equivalents
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Most schools, colleges, and universities in the United States use
              a grading system based on the letters below, though E is sometimes
              used instead of F. Grading systems do differ however based on what
              constitutes an A or B, and some do not include grades such as an
              A+ or a B-.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Standard Grade Scale
                </h4>
                <div className="space-y-1 text-sm">
                  <div>A+ = 4.3 grade points</div>
                  <div>A = 4.0 grade points</div>
                  <div>A- = 3.7 grade points</div>
                  <div>B+ = 3.3 grade points</div>
                  <div>B = 3.0 grade points</div>
                  <div>B- = 2.7 grade points</div>
                  <div>C+ = 2.3 grade points</div>
                  <div>C = 2.0 grade points</div>
                  <div>C- = 1.7 grade points</div>
                  <div>D+ = 1.3 grade points</div>
                  <div>D = 1.0 grade point</div>
                  <div>D- = 0.7 grade points</div>
                  <div>F = 0.0 grade points</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Special Grades
                </h4>
                <div className="space-y-1 text-sm">
                  <div>P (Pass) - Not counted in GPA</div>
                  <div>NP (No Pass) - Not counted in GPA</div>
                  <div>I (Incomplete) - Not counted in GPA</div>
                  <div>W (Withdrawal) - Not counted in GPA</div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  These grades are typically excluded from GPA calculations as
                  they don't represent academic performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            GPA Calculation Examples
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The calculator can account for course weighting based on the
              number of credits attributed to a course, where credit is the
              "weighting" of the course, as shown in the examples below.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Example 1</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Course
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Credit
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Score
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Grade Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Math
                        </td>
                        <td className="border border-gray-300 px-4 py-2">4</td>
                        <td className="border border-gray-300 px-4 py-2">A+</td>
                        <td className="border border-gray-300 px-4 py-2">
                          4 × 4.3 = 17.2
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Physics
                        </td>
                        <td className="border border-gray-300 px-4 py-2">2</td>
                        <td className="border border-gray-300 px-4 py-2">B</td>
                        <td className="border border-gray-300 px-4 py-2">
                          2 × 3.0 = 6.0
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          English
                        </td>
                        <td className="border border-gray-300 px-4 py-2">3</td>
                        <td className="border border-gray-300 px-4 py-2">A</td>
                        <td className="border border-gray-300 px-4 py-2">
                          3 × 4.0 = 12.0
                        </td>
                      </tr>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-4 py-2">
                          Total
                        </td>
                        <td className="border border-gray-300 px-4 py-2">9</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">
                          35.2
                        </td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="border border-gray-300 px-4 py-2">
                          GPA
                        </td>
                        <td
                          className="border border-gray-300 px-4 py-2"
                          colSpan={3}
                        >
                          35.2 ÷ 9 = 3.91
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Example 2</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Course
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Credit
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Score
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Grade Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Biology
                        </td>
                        <td className="border border-gray-300 px-4 py-2">4</td>
                        <td className="border border-gray-300 px-4 py-2">
                          3.0
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          4 × 3.0 = 12.0
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Chemistry
                        </td>
                        <td className="border border-gray-300 px-4 py-2">3</td>
                        <td className="border border-gray-300 px-4 py-2">
                          2.0
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          3 × 2.0 = 6.0
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Chemistry Lab
                        </td>
                        <td className="border border-gray-300 px-4 py-2">2</td>
                        <td className="border border-gray-300 px-4 py-2">
                          4.0
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          2 × 4.0 = 8.0
                        </td>
                      </tr>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-4 py-2">
                          Total
                        </td>
                        <td className="border border-gray-300 px-4 py-2">9</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">
                          26.0
                        </td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="border border-gray-300 px-4 py-2">
                          GPA
                        </td>
                        <td
                          className="border border-gray-300 px-4 py-2"
                          colSpan={3}
                        >
                          26.0 ÷ 9 = 2.89
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            GPA Classifications and Academic Standing
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Academic Honors
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Summa Cum Laude:</span>
                    <span className="font-medium text-purple-600">
                      3.9 - 4.3
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Magna Cum Laude:</span>
                    <span className="font-medium text-blue-600">
                      3.7 - 3.89
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cum Laude:</span>
                    <span className="font-medium text-green-600">
                      3.5 - 3.69
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Academic Standing
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Good Standing:</span>
                    <span className="font-medium text-yellow-600">
                      3.0 - 3.49
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfactory:</span>
                    <span className="font-medium text-orange-600">
                      2.0 - 2.99
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Below Satisfactory:</span>
                    <span className="font-medium text-red-600">Below 2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Guidelines for Raising GPA
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              There is no sure formula for raising a person's GPA, and
              strategies that work for one person may not work for another.
              However, there are some common guidelines and study habits that
              can be helpful when trying to raise GPA.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Actively Attending Classes
                </h4>
                <p>
                  Classes are being paid for likely either by a student or their
                  parent, and not attending classes is both a financial loss, as
                  well as a loss in potential education. While a student may
                  decide that attending a particular class is not beneficial to
                  their learning, there is usually valuable information that can
                  be obtained simply by attending class.
                </p>
                <p>
                  Furthermore, while it may be true that professors largely
                  repeat notes in class that are often later posted to a
                  website, skipping classes can result in missed opportunities.
                  Questions from students in class, as well as the explanations
                  that may follow can provide seemingly inconsequential bits of
                  information that can in fact make a large difference on tests.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Planning</h4>
                <p>
                  Every student has his or her own learning style. Some like to
                  work for hours at a time to complete an assignment, while
                  others may take many breaks. There is no ideal strategy, and
                  how a person approaches learning is highly dependent on
                  learning style, as well as adhering to a study strategy that
                  complements their schedule and desires.
                </p>
                <p>
                  Organization of work that needs to be done, as well as notes
                  taken is also important. It is as important to be able to find
                  relevant information as it is to take notes in class. Time
                  management is also an important aspect of planning.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Study Strategies
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Create a consistent study schedule</li>
                  <li>
                    Use active learning techniques (flashcards, practice
                    problems)
                  </li>
                  <li>Form study groups with classmates</li>
                  <li>Seek help from professors during office hours</li>
                  <li>Utilize campus tutoring resources</li>
                  <li>Review material regularly, not just before exams</li>
                  <li>Take practice tests when available</li>
                  <li>Maintain a healthy work-life balance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Different Grading Systems
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              While the 4.0 scale is most common in the United States, different
              institutions and countries may use various grading systems:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Percentage Scale
                </h4>
                <p className="text-sm">
                  Some schools use percentage grades (0-100%) which can be
                  converted to GPA using standard conversion tables.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Weighted GPA
                </h4>
                <p className="text-sm">
                  Advanced Placement (AP) and International Baccalaureate (IB)
                  courses may be weighted differently, sometimes on a 5.0 scale.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  International Systems
                </h4>
                <p className="text-sm">
                  Different countries use various scales (e.g., 10-point scale
                  in some European countries, or letter grades without
                  plus/minus).
                </p>
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
              href="/grade"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Grade Calculator
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
