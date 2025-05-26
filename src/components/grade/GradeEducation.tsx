export default function GradeEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        About Grade Calculation and Grading Systems
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Understanding Weighted Grades
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              A weighted grade is calculated by multiplying each assignment's
              grade by its weight (importance) and then dividing by the total
              weight. This system allows different assignments to have different
              levels of importance in determining your final grade.
            </p>
            <p>
              For example, if homework is worth 20% of your grade and you scored
              85%, while your final exam is worth 40% and you scored 92%, the
              final exam has twice the impact on your overall grade compared to
              homework.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Letter Grade and Percentage Equivalents
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The calculators above use the following letter grades and their
              typical corresponding numerical equivalents based on percentage
              points.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Letter Grade
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      GPA
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">A+</td>
                    <td className="border border-gray-300 px-4 py-2">4.3</td>
                    <td className="border border-gray-300 px-4 py-2">
                      97-100%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">A</td>
                    <td className="border border-gray-300 px-4 py-2">4.0</td>
                    <td className="border border-gray-300 px-4 py-2">93-96%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">A-</td>
                    <td className="border border-gray-300 px-4 py-2">3.7</td>
                    <td className="border border-gray-300 px-4 py-2">90-92%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">B+</td>
                    <td className="border border-gray-300 px-4 py-2">3.3</td>
                    <td className="border border-gray-300 px-4 py-2">87-89%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">B</td>
                    <td className="border border-gray-300 px-4 py-2">3.0</td>
                    <td className="border border-gray-300 px-4 py-2">83-86%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">B-</td>
                    <td className="border border-gray-300 px-4 py-2">2.7</td>
                    <td className="border border-gray-300 px-4 py-2">80-82%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">C+</td>
                    <td className="border border-gray-300 px-4 py-2">2.3</td>
                    <td className="border border-gray-300 px-4 py-2">77-79%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">C</td>
                    <td className="border border-gray-300 px-4 py-2">2.0</td>
                    <td className="border border-gray-300 px-4 py-2">73-76%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">C-</td>
                    <td className="border border-gray-300 px-4 py-2">1.7</td>
                    <td className="border border-gray-300 px-4 py-2">70-72%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">D+</td>
                    <td className="border border-gray-300 px-4 py-2">1.3</td>
                    <td className="border border-gray-300 px-4 py-2">67-69%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">D</td>
                    <td className="border border-gray-300 px-4 py-2">1.0</td>
                    <td className="border border-gray-300 px-4 py-2">63-66%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">D-</td>
                    <td className="border border-gray-300 px-4 py-2">0.7</td>
                    <td className="border border-gray-300 px-4 py-2">60-62%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">F</td>
                    <td className="border border-gray-300 px-4 py-2">0.0</td>
                    <td className="border border-gray-300 px-4 py-2">0-59%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Brief History of Different Grading Systems
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              In 1785, students at Yale were ranked based on "optimi" being the
              highest rank, followed by second optimi, inferiore (lower), and
              pejores (worse). At William and Mary, students were ranked as
              either No. 1, or No. 2, where No. 1 represented students that were
              first in their class, while No. 2 represented those who were
              "orderly, correct and attentive."
            </p>
            <p>
              Meanwhile at Harvard, students were graded based on a numerical
              system from 1-200 (except for math and philosophy where 1-100 was
              used). Later, shortly after 1883, Harvard used a system of
              "Classes" where students were either Class I, II, III, IV, or V,
              with V representing a failing grade.
            </p>
            <p>
              In 1887, Mount Holyoke College became the first college to use
              letter grades similar to those commonly used today. The college
              used a grading scale with the letters A, B, C, D, and E, where E
              represented a failing grade. This grading system however, was far
              stricter than those commonly used today, with a failing grade
              being defined as anything below 75%.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Weighted Grade Calculation Examples
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              The calculator can account for assignment weighting based on the
              importance or percentage each assignment contributes to your final
              grade.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Example 1: Percentage Weights
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Assignment
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Grade
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Weight
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Weighted Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Homework
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          85%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          20%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          85 × 20 = 1700
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Midterm
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          78%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          30%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          78 × 30 = 2340
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Final Exam
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          92%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          50%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          92 × 50 = 4600
                        </td>
                      </tr>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-4 py-2">
                          Total
                        </td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">
                          100%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          8640
                        </td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="border border-gray-300 px-4 py-2">
                          Final Grade
                        </td>
                        <td
                          className="border border-gray-300 px-4 py-2"
                          colSpan={3}
                        >
                          8640 ÷ 100 = 86.4%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Example 2: Point-Based Weights
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Assignment
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Grade
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Points Possible
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Points Earned
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Quiz 1
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          90%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">50</td>
                        <td className="border border-gray-300 px-4 py-2">
                          90 × 50 = 4500
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Project
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          88%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          100
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          88 × 100 = 8800
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Final
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          85%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          200
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          85 × 200 = 17000
                        </td>
                      </tr>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-4 py-2">
                          Total
                        </td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">
                          350
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          30300
                        </td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="border border-gray-300 px-4 py-2">
                          Final Grade
                        </td>
                        <td
                          className="border border-gray-300 px-4 py-2"
                          colSpan={3}
                        >
                          (30300 ÷ 350) × 100 = 86.6%
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
            An Alternative to the Letter Grading System
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              Letter grades provide an easy means to generalize a student's
              performance. They can be more effective than qualitative
              evaluations in situations where "right" or "wrong" answers can be
              easily quantified, such as an algebra exam, but alone may not
              provide a student with enough feedback in regards to an assessment
              like a written paper (which is much more subjective).
            </p>
            <p>
              Although a written analysis of each individual student's work may
              be a more effective form of feedback, there exists the argument
              that students and parents are unlikely to read the feedback, and
              that teachers do not have the time to write such an analysis.
            </p>
            <p>
              There is precedence for this type of evaluation system however, in
              Saint Ann's School in New York City, an arts-oriented private
              school that does not have a letter grading system. Instead,
              teachers write anecdotal reports for each student. This method of
              evaluation focuses on promoting learning and improvement, rather
              than the pursuit of a certain letter grade in a course.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Tips for Grade Improvement
          </h3>
          <div className="text-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Study Strategies
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Create a consistent study schedule</li>
                  <li>Use active learning techniques</li>
                  <li>Form study groups with classmates</li>
                  <li>Seek help during office hours</li>
                  <li>Take practice tests when available</li>
                  <li>Review material regularly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Assignment Management
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Prioritize high-weight assignments</li>
                  <li>Start projects early</li>
                  <li>Understand grading rubrics</li>
                  <li>Ask for feedback on drafts</li>
                  <li>Attend all classes and labs</li>
                  <li>Participate in class discussions</li>
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
              href="/gpa"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              GPA Calculator
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
