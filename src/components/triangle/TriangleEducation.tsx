export default function TriangleEducation() {
  return (
    <div className="space-y-8">
      {/* What is a Triangle? */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          What is a Triangle?
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            A triangle is a polygon that has three vertices. A vertex is a point
            where two or more curves, lines, or edges meet; in the case of a
            triangle, the three vertices are joined by three line segments
            called edges. A triangle is usually referred to by its vertices.
            Hence, a triangle with vertices a, b, and c is typically denoted as
            Δabc.
          </p>

          <p className="text-gray-700 mb-4">
            Furthermore, triangles tend to be described based on the length of
            their sides, as well as their internal angles. For example, a
            triangle in which all three sides have equal lengths is called an
            equilateral triangle while a triangle in which two sides have equal
            lengths is called isosceles. When none of the sides of a triangle
            have equal lengths, it is referred to as scalene.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h4 className="font-semibold mb-2">
              Triangle Classification by Sides:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Equilateral:</strong> All three sides are equal
              </li>
              <li>
                <strong>Isosceles:</strong> Two sides are equal
              </li>
              <li>
                <strong>Scalene:</strong> All three sides are different
              </li>
            </ul>
          </div>

          <p className="text-gray-700">
            Tick marks on the edge of a triangle are a common notation that
            reflects the length of the side, where the same number of ticks
            means equal length. Similar notation exists for the internal angles
            of a triangle, denoted by differing numbers of concentric arcs
            located at the triangle's vertices.
          </p>
        </div>
      </div>

      {/* Triangle Classification by Angles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Triangle Classification by Angles
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Triangles classified based on their internal angles fall into two
            categories: right or oblique. A right triangle is a triangle in
            which one of the angles is 90°, and is denoted by two line segments
            forming a square at the vertex constituting the right angle. The
            longest edge of a right triangle, which is the edge opposite the
            right angle, is called the hypotenuse.
          </p>

          <p className="text-gray-700 mb-4">
            Any triangle that is not a right triangle is classified as an
            oblique triangle and can either be obtuse or acute. In an obtuse
            triangle, one of the angles of the triangle is greater than 90°,
            while in an acute triangle, all of the angles are less than 90°.
          </p>

          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h4 className="font-semibold mb-2">
              Triangle Classification by Angles:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Right Triangle:</strong> One angle is exactly 90°
              </li>
              <li>
                <strong>Obtuse Triangle:</strong> One angle is greater than 90°
              </li>
              <li>
                <strong>Acute Triangle:</strong> All angles are less than 90°
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Triangle Facts and Theorems */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Triangle Facts, Theorems, and Laws
        </h3>
        <div className="prose max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Basic Triangle Facts:
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  It is not possible for a triangle to have more than one vertex
                  with internal angle greater than or equal to 90°, or it would
                  no longer be a triangle.
                </li>
                <li>
                  The interior angles of a triangle always add up to 180° while
                  the exterior angles of a triangle are equal to the sum of the
                  two interior angles that are not adjacent to it.
                </li>
                <li>
                  The sum of the lengths of any two sides of a triangle is
                  always larger than the length of the third side (Triangle
                  Inequality).
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h4 className="font-semibold mb-2">Pythagorean Theorem:</h4>
              <p className="mb-2">
                The Pythagorean theorem is a theorem specific to right
                triangles. For any right triangle, the square of the length of
                the hypotenuse equals the sum of the squares of the lengths of
                the two other sides.
              </p>
              <div className="text-center my-3">
                <strong>a² + b² = c²</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium">Example:</p>
                <p>Given a = 3, c = 5, find b:</p>
                <p>3² + b² = 5²</p>
                <p>9 + b² = 25</p>
                <p>b² = 16</p>
                <p>b = 4</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded p-4">
              <h4 className="font-semibold mb-2">Law of Sines:</h4>
              <p className="mb-2">
                The ratio of the length of a side of a triangle to the sine of
                its opposite angle is constant. Using the law of sines makes it
                possible to find unknown angles and sides of a triangle given
                enough information.
              </p>
              <div className="text-center my-3">
                <strong>a/sin(A) = b/sin(B) = c/sin(C)</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium">Example:</p>
                <p>Given b=2, B=90°, C=45°, find c:</p>
                <p>2/sin(90°) = c/sin(45°)</p>
                <p>c = 2 × (√2/2) × (1/1) = √2</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
              <h4 className="font-semibold mb-2">Law of Cosines:</h4>
              <p className="mb-2">
                Given the lengths of all three sides of any triangle, each angle
                can be calculated using the following equations:
              </p>
              <div className="space-y-1 text-center my-3">
                <p>
                  <strong>A = arccos((b² + c² - a²) / (2bc))</strong>
                </p>
                <p>
                  <strong>B = arccos((a² + c² - b²) / (2ac))</strong>
                </p>
                <p>
                  <strong>C = arccos((a² + b² - c²) / (2ab))</strong>
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium">Example:</p>
                <p>Given a=8, b=6, c=10, find B:</p>
                <p>B = arccos((8² + 10² - 6²) / (2 × 8 × 10))</p>
                <p>B = arccos(0.8) = 36.87°</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area of a Triangle */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Area of a Triangle
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            There are multiple different equations for calculating the area of a
            triangle, dependent on what information is known. Likely the most
            commonly known equation for calculating the area of a triangle
            involves its base, <strong>b</strong>, and height,{" "}
            <strong>h</strong>. The "base" refers to any side of the triangle
            where the height is represented by the length of the line segment
            drawn from the vertex opposite the base, to a point on the base that
            forms a perpendicular.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-semibold mb-2">Basic Area Formula:</h4>
              <div className="text-center my-3">
                <strong>Area = (1/2) × base × height</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium">Example:</p>
                <p>Base = 5, Height = 6</p>
                <p>Area = (1/2) × 5 × 6 = 15</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold mb-2">
                Using Two Sides and Included Angle:
              </h4>
              <div className="text-center my-3">
                <strong>Area = (1/2) × a × b × sin(C)</strong>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium">Example:</p>
                <p>Given a = 9, b = 7, and C = 30°:</p>
                <p>Area = (1/2) × 7 × 9 × sin(30°) = 15.75</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 border border-orange-200 rounded p-4">
            <h4 className="font-semibold mb-2">Heron's Formula:</h4>
            <p className="mb-2">
              Another method for calculating the area of a triangle uses Heron's
              formula. Unlike the previous equations, Heron's formula does not
              require an arbitrary choice of a side as a base, or a vertex as an
              origin. However, it does require that the lengths of the three
              sides are known.
            </p>
            <div className="text-center my-3">
              <strong>Area = √[s(s - a)(s - b)(s - c)]</strong>
              <br />
              <span className="text-sm">where s = (a + b + c) / 2</span>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="font-medium">Example:</p>
              <p>Given a = 3, b = 4, c = 5:</p>
              <p>s = (3 + 4 + 5) / 2 = 6</p>
              <p>Area = √[6(6-3)(6-4)(6-5)] = √[6×3×2×1] = 6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Median, Inradius, and Circumradius */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Median, Inradius, and Circumradius
        </h3>
        <div className="prose max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Median</h4>
              <p className="text-gray-700 mb-3">
                The median of a triangle is defined as the length of a line
                segment that extends from a vertex of the triangle to the
                midpoint of the opposing side. A triangle can have three
                medians, all of which will intersect at the centroid (the
                arithmetic mean position of all the points in the triangle) of
                the triangle.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="font-medium">Median Formulas:</p>
                <p>
                  m<sub>a</sub> = (1/2)√(2b² + 2c² - a²)
                </p>
                <p>
                  m<sub>b</sub> = (1/2)√(2a² + 2c² - b²)
                </p>
                <p>
                  m<sub>c</sub> = (1/2)√(2a² + 2b² - c²)
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Inradius</h4>
              <p className="text-gray-700 mb-3">
                The inradius is the radius of the largest circle that will fit
                inside the given polygon, in this case, a triangle. The inradius
                is perpendicular to each side of the polygon. In a triangle, the
                inradius can be determined by constructing two angle bisectors
                to determine the incenter of the triangle.
              </p>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="font-medium">Inradius Formula:</p>
                <p>r = Area / s</p>
                <p>where s = (a + b + c) / 2</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Circumradius</h4>
              <p className="text-gray-700 mb-3">
                The circumradius is defined as the radius of a circle that
                passes through all the vertices of a polygon, in this case, a
                triangle. The center of this circle, where all the perpendicular
                bisectors of each side of the triangle meet, is the circumcenter
                of the triangle, and is the point from which the circumradius is
                measured.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="font-medium">Circumradius Formula:</p>
                <p>R = a / (2sin(A)) = b / (2sin(B)) = c / (2sin(C))</p>
                <p>or R = (abc) / (4 × Area)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Triangles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Special Right Triangles
        </h3>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            There are special cases of right triangles that facilitate
            calculations due to their predictable side ratios.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-semibold mb-2">45°-45°-90° Triangle</h4>
              <p className="mb-2">
                In a 45°-45°-90° triangle, the sides are in the ratio:
              </p>
              <p className="text-center font-mono">1 : 1 : √2</p>
              <p className="text-sm mt-2">
                If the legs have length x, the hypotenuse has length x√2
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-semibold mb-2">30°-60°-90° Triangle</h4>
              <p className="mb-2">
                In a 30°-60°-90° triangle, the sides are in the ratio:
              </p>
              <p className="text-center font-mono">1 : √3 : 2</p>
              <p className="text-sm mt-2">
                If the shortest side has length x, the other sides are x√3 and
                2x
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold mb-2">3-4-5 Triangle</h4>
              <p className="mb-2">
                The 3-4-5 triangle is a Pythagorean triple:
              </p>
              <p className="text-center font-mono">3² + 4² = 5²</p>
              <p className="text-sm mt-2">
                Any multiple of these ratios (6-8-10, 9-12-15, etc.) also forms
                a right triangle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
