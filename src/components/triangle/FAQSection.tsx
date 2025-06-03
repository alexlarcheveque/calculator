"use client";

import { FAQItem } from "../ui/FAQSection";
import FAQSection from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-triangle-definition",
    question: "What is a triangle and how are triangles classified?",
    answer: (
      <>
        <p className="mb-2">
          A triangle is a polygon with three vertices connected by three line
          segments called edges. It's one of the fundamental shapes in geometry
          with vertices typically denoted as Δabc for a triangle with vertices
          a, b, and c.
        </p>
        <p className="mb-2">
          <strong>Classification by side lengths:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Equilateral triangle:</strong> All three sides have equal
            lengths (also equiangular with all 60° angles)
          </li>
          <li>
            <strong>Isosceles triangle:</strong> Two sides have equal lengths
            (base angles are also equal)
          </li>
          <li>
            <strong>Scalene triangle:</strong> All three sides have different
            lengths (all angles different)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Classification by angles:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Right triangle:</strong> One angle is exactly 90°
            (hypotenuse is the longest side)
          </li>
          <li>
            <strong>Obtuse triangle:</strong> One angle is greater than 90°
          </li>
          <li>
            <strong>Acute triangle:</strong> All angles are less than 90°
          </li>
        </ul>
        <p className="text-sm">
          <strong>Notation:</strong> Tick marks indicate equal side lengths,
          while concentric arcs mark equal angles at vertices.
        </p>
      </>
    ),
  },
  {
    id: "triangle-fundamental-properties",
    question: "What are the fundamental properties and rules of triangles?",
    answer: (
      <>
        <p className="mb-2">
          Triangles follow several fundamental mathematical properties that are
          essential for solving triangle problems and understanding geometric
          relationships.
        </p>
        <p className="mb-2">
          <strong>Angle sum property:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Interior angles:</strong> Always sum to 180° (A + B + C =
            180°)
          </li>
          <li>
            <strong>Exterior angles:</strong> Each exterior angle equals the sum
            of the two non-adjacent interior angles
          </li>
          <li>
            <strong>Impossibility:</strong> Cannot have more than one angle ≥
            90° (would exceed 180° total)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Triangle inequality theorem:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>The sum of any two sides must be greater than the third side</li>
          <li>a + b &gt; c, b + c &gt; a, and a + c &gt; b</li>
          <li>
            Essential for determining if three lengths can form a triangle
          </li>
        </ul>
        <p className="mb-2">
          <strong>Side-angle relationships:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Longer sides are opposite larger angles</li>
          <li>
            In any triangle, the largest angle is opposite the longest side
          </li>
          <li>Equal sides are opposite equal angles (isosceles property)</li>
        </ul>
      </>
    ),
  },
  {
    id: "pythagorean-theorem-applications",
    question: "How does the Pythagorean theorem work and when do you use it?",
    answer: (
      <>
        <p className="mb-2">
          The Pythagorean theorem is fundamental for right triangle
          calculations, stating that in any right triangle, the square of the
          hypotenuse equals the sum of squares of the other two sides.
        </p>
        <p className="mb-2">
          <strong>Pythagorean theorem formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Standard form:</strong> a² + b² = c² (where c is the
            hypotenuse)
          </li>
          <li>
            <strong>Solving for sides:</strong> a = √(c² - b²), b = √(c² - a²),
            c = √(a² + b²)
          </li>
          <li>
            <strong>Only applies to right triangles</strong> (one 90° angle)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Worked example:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Given: Right triangle with sides a = 3, c = 5, find b</li>
          <li>Formula: 3² + b² = 5²</li>
          <li>Calculation: 9 + b² = 25, so b² = 16, therefore b = 4</li>
          <li>Verification: 3² + 4² = 9 + 16 = 25 = 5² ✓</li>
        </ul>
        <p className="mb-2">
          <strong>Common Pythagorean triples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>3-4-5 and multiples (6-8-10, 9-12-15, 15-20-25)</li>
          <li>5-12-13 and multiples (10-24-26, 15-36-39)</li>
          <li>8-15-17, 7-24-25, 20-21-29</li>
          <li>These provide shortcuts for quick right triangle calculations</li>
        </ul>
      </>
    ),
  },
  {
    id: "law-of-sines-applications",
    question: "When and how do you use the Law of Sines?",
    answer: (
      <>
        <p className="mb-2">
          The Law of Sines relates the ratios of sides to the sines of their
          opposite angles, making it possible to solve triangles when you know
          certain combinations of sides and angles.
        </p>
        <p className="mb-2">
          <strong>Law of Sines formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Basic form:</strong> a/sin(A) = b/sin(B) = c/sin(C)
          </li>
          <li>
            <strong>Alternative form:</strong> sin(A)/a = sin(B)/b = sin(C)/c
          </li>
          <li>Works for any triangle (not just right triangles)</li>
        </ul>
        <p className="mb-2">
          <strong>When to use Law of Sines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>ASA case:</strong> Two angles and the side between them
          </li>
          <li>
            <strong>AAS case:</strong> Two angles and a side not between them
          </li>
          <li>
            <strong>SSA case:</strong> Two sides and an angle opposite one of
            them (ambiguous case)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Worked example (AAS case):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Given: A = 30°, B = 90°, b = 2, find side c</li>
          <li>First find C: C = 180° - 30° - 90° = 60°</li>
          <li>Apply Law of Sines: 2/sin(90°) = c/sin(60°)</li>
          <li>Solve: c = 2 × sin(60°)/sin(90°) = 2 × (√3/2)/1 = √3 ≈ 1.73</li>
        </ul>
        <p className="text-sm">
          <strong>Ambiguous case warning:</strong> SSA cases may have 0, 1, or 2
          valid triangle solutions.
        </p>
      </>
    ),
  },
  {
    id: "law-of-cosines-applications",
    question: "When and how do you use the Law of Cosines?",
    answer: (
      <>
        <p className="mb-2">
          The Law of Cosines generalizes the Pythagorean theorem for all
          triangles, allowing you to find unknown sides or angles when you have
          specific information about the triangle.
        </p>
        <p className="mb-2">
          <strong>Law of Cosines formulas:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>For finding sides:</strong> c² = a² + b² - 2ab cos(C)
          </li>
          <li>
            <strong>For finding angles:</strong> C = arccos((a² + b² - c²) /
            (2ab))
          </li>
          <li>Similar formulas apply for all three sides and angles</li>
        </ul>
        <p className="mb-2">
          <strong>When to use Law of Cosines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>SAS case:</strong> Two sides and the included angle (find
            third side)
          </li>
          <li>
            <strong>SSS case:</strong> All three sides known (find any angle)
          </li>
          <li>When Law of Sines creates ambiguous cases</li>
          <li>For any triangle where Pythagorean theorem doesn't apply</li>
        </ul>
        <p className="mb-2">
          <strong>Worked example (SSS case):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Given: a = 8, b = 6, c = 10, find angle B</li>
          <li>Formula: B = arccos((a² + c² - b²) / (2ac))</li>
          <li>Substitute: B = arccos((64 + 100 - 36) / (2 × 8 × 10))</li>
          <li>Calculate: B = arccos(128/160) = arccos(0.8) = 36.87°</li>
        </ul>
        <p className="text-sm">
          <strong>Note:</strong> Law of Cosines reduces to Pythagorean theorem
          when C = 90° (cos(90°) = 0).
        </p>
      </>
    ),
  },
  {
    id: "triangle-area-formulas",
    question: "What are the different ways to calculate triangle area?",
    answer: (
      <>
        <p className="mb-2">
          Triangle area can be calculated using various formulas depending on
          what information you have available. Each method is optimal for
          different scenarios.
        </p>
        <p className="mb-2">
          <strong>Base and height formula:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> Area = (1/2) × base × height
          </li>
          <li>
            <strong>Use when:</strong> You know any side (base) and
            perpendicular height to that side
          </li>
          <li>
            <strong>Example:</strong> Base = 8, height = 5 → Area = (1/2) × 8 ×
            5 = 20
          </li>
        </ul>
        <p className="mb-2">
          <strong>Two sides and included angle:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> Area = (1/2) × a × b × sin(C)
          </li>
          <li>
            <strong>Use when:</strong> You know two sides and the angle between
            them
          </li>
          <li>
            <strong>Example:</strong> a = 6, b = 8, C = 30° → Area = (1/2) × 6 ×
            8 × sin(30°) = 12
          </li>
        </ul>
        <p className="mb-2">
          <strong>Heron's formula (all three sides):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Formula:</strong> Area = √[s(s-a)(s-b)(s-c)] where s =
            (a+b+c)/2
          </li>
          <li>
            <strong>Use when:</strong> You know all three side lengths
          </li>
          <li>
            <strong>Example:</strong> Sides 3, 4, 5 → s = 6 → Area = √[6×3×2×1]
            = 6
          </li>
        </ul>
        <p className="mb-2">
          <strong>Using coordinates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Formula:</strong> Area = (1/2)|x₁(y₂-y₃) + x₂(y₃-y₁) +
            x₃(y₁-y₂)|
          </li>
          <li>
            <strong>Use when:</strong> You have vertex coordinates (x₁,y₁),
            (x₂,y₂), (x₃,y₃)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "special-right-triangles",
    question: "What are special right triangles and why are they important?",
    answer: (
      <>
        <p className="mb-2">
          Special right triangles have predictable side ratios that allow for
          quick calculations without complex trigonometry, making them essential
          for efficient problem-solving.
        </p>
        <p className="mb-2">
          <strong>45°-45°-90° triangle:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Angle configuration:</strong> Two 45° angles and one 90°
            angle (isosceles right triangle)
          </li>
          <li>
            <strong>Side ratio:</strong> 1 : 1 : √2 (legs : legs : hypotenuse)
          </li>
          <li>
            <strong>If legs = x:</strong> hypotenuse = x√2 ≈ 1.414x
          </li>
          <li>
            <strong>Example:</strong> Legs of 5 → hypotenuse = 5√2 ≈ 7.07
          </li>
        </ul>
        <p className="mb-2">
          <strong>30°-60°-90° triangle:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Angle configuration:</strong> 30°, 60°, and 90° angles
          </li>
          <li>
            <strong>Side ratio:</strong> 1 : √3 : 2 (short leg : long leg :
            hypotenuse)
          </li>
          <li>
            <strong>If short leg = x:</strong> long leg = x√3, hypotenuse = 2x
          </li>
          <li>
            <strong>Example:</strong> Short leg of 3 → long leg = 3√3 ≈ 5.20,
            hypotenuse = 6
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common Pythagorean triples:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>3-4-5 family:</strong> 3-4-5, 6-8-10, 9-12-15, 15-20-25
          </li>
          <li>
            <strong>5-12-13 family:</strong> 5-12-13, 10-24-26
          </li>
          <li>
            <strong>Other common:</strong> 8-15-17, 7-24-25, 20-21-29
          </li>
        </ul>
        <p className="text-sm">
          <strong>Applications:</strong> Quick construction calculations,
          architecture, navigation, and any field requiring precise right-angle
          measurements.
        </p>
      </>
    ),
  },
  {
    id: "triangle-centers-properties",
    question: "What are the different triangle centers and their properties?",
    answer: (
      <>
        <p className="mb-2">
          Triangles have several important centers that serve different
          geometric and practical purposes. Understanding these centers helps
          with advanced triangle calculations and geometric constructions.
        </p>
        <p className="mb-2">
          <strong>Centroid (medians intersection):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> Where all three medians intersect
            (median connects vertex to midpoint of opposite side)
          </li>
          <li>
            <strong>Properties:</strong> Balancing point of triangle, divides
            each median in 2:1 ratio
          </li>
          <li>
            <strong>Coordinates:</strong> ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3) for
            vertices (x₁,y₁), (x₂,y₂), (x₃,y₃)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Incenter (angle bisectors intersection):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> Center of inscribed circle (incircle),
            where angle bisectors meet
          </li>
          <li>
            <strong>Inradius formula:</strong> r = Area / s, where s = (a+b+c)/2
          </li>
          <li>
            <strong>Properties:</strong> Equidistant from all three sides,
            always inside triangle
          </li>
        </ul>
        <p className="mb-2">
          <strong>Circumcenter (perpendicular bisectors intersection):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Definition:</strong> Center of circumscribed circle
            (circumcircle), equidistant from all vertices
          </li>
          <li>
            <strong>Circumradius formula:</strong> R = a/(2sin(A)) =
            abc/(4×Area)
          </li>
          <li>
            <strong>Location:</strong> Inside acute triangles, outside obtuse
            triangles, on hypotenuse of right triangles
          </li>
        </ul>
        <p className="mb-2">
          <strong>Orthocenter (altitudes intersection):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Definition:</strong> Where all three altitudes intersect
            (altitude is perpendicular from vertex to opposite side)
          </li>
          <li>
            <strong>Location:</strong> Inside acute triangles, outside obtuse
            triangles, at right angle vertex in right triangles
          </li>
          <li>
            <strong>Applications:</strong> Advanced geometric constructions and
            proofs
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "triangle-solving-strategies",
    question:
      "What strategies should I use to solve different triangle problems?",
    answer: (
      <>
        <p className="mb-2">
          Effective triangle problem-solving requires identifying what
          information you have and choosing the appropriate method. Following a
          systematic approach ensures accurate results.
        </p>
        <p className="mb-2">
          <strong>Problem identification steps:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>List known information:</strong> Identify given sides (a, b,
            c) and angles (A, B, C)
          </li>
          <li>
            <strong>Determine triangle type:</strong> Right triangle, obtuse,
            acute, or special triangle
          </li>
          <li>
            <strong>Choose appropriate method:</strong> Based on known vs.
            unknown elements
          </li>
          <li>
            <strong>Apply triangle inequality:</strong> Verify that solutions
            are geometrically possible
          </li>
        </ol>
        <p className="mb-2">
          <strong>Method selection guide:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Right triangles:</strong> Use Pythagorean theorem or
            trigonometric ratios (sin, cos, tan)
          </li>
          <li>
            <strong>SAS (Side-Angle-Side):</strong> Use Law of Cosines to find
            third side
          </li>
          <li>
            <strong>ASA/AAS:</strong> Use Law of Sines after finding third angle
          </li>
          <li>
            <strong>SSS (three sides):</strong> Use Law of Cosines to find
            angles or Heron's formula for area
          </li>
          <li>
            <strong>SSA (ambiguous case):</strong> Use Law of Sines but check
            for multiple solutions
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common solving steps:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            Find missing angles using angle sum property (A + B + C = 180°)
          </li>
          <li>
            Use reciprocal relationships: if you find sin, cos, or tan, use
            inverse functions
          </li>
          <li>
            For area calculations, choose the method based on available
            information
          </li>
          <li>Double-check answers using alternative methods when possible</li>
        </ul>
        <p className="text-sm">
          <strong>Verification tips:</strong> Ensure all angles sum to 180°,
          longest side is opposite largest angle, and triangle inequality holds.
        </p>
      </>
    ),
  },
  {
    id: "triangle-calculator-usage",
    question: "How do I effectively use a triangle calculator?",
    answer: (
      <>
        <p className="mb-2">
          Triangle calculators automate complex computations, but understanding
          input requirements and result interpretation ensures accurate
          problem-solving and learning.
        </p>
        <p className="mb-2">
          <strong>Input preparation:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unit consistency:</strong> Ensure all length measurements
            use the same units (inches, cm, etc.)
          </li>
          <li>
            <strong>Angle format:</strong> Verify whether calculator expects
            degrees or radians
          </li>
          <li>
            <strong>Precision:</strong> Enter measurements with appropriate
            precision for your application
          </li>
          <li>
            <strong>Complete information:</strong> Provide minimum required data
            for unique triangle determination
          </li>
        </ul>
        <p className="mb-2">
          <strong>Understanding results:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Missing sides/angles:</strong> Calculator computes unknown
            values using geometric laws
          </li>
          <li>
            <strong>Area calculations:</strong> Usually provided using most
            appropriate formula for given data
          </li>
          <li>
            <strong>Perimeter:</strong> Sum of all three sides (a + b + c)
          </li>
          <li>
            <strong>Special properties:</strong> Some calculators indicate
            triangle type and special ratios
          </li>
        </ul>
        <p className="mb-2">
          <strong>Validation and verification:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Angle sum check:</strong> All angles should total 180°
          </li>
          <li>
            <strong>Triangle inequality:</strong> Sum of any two sides &gt;
            third side
          </li>
          <li>
            <strong>Reasonableness:</strong> Results should make geometric sense
          </li>
          <li>
            <strong>Alternative methods:</strong> Cross-check with manual
            calculations when learning
          </li>
        </ul>
        <p className="text-sm">
          <strong>Learning tip:</strong> Use calculators to verify manual work
          and explore "what-if" scenarios to deepen geometric understanding.
        </p>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Triangle calculations are based on established geometric principles and
      trigonometric laws. Results assume valid triangle configurations that
      satisfy the triangle inequality theorem. For precision applications,
      consider rounding limitations and measurement accuracy. Always verify that
      given information can form a valid triangle before performing
      calculations.
    </p>
  </>
);

export default function TriangleFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Triangle Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="triangle-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/calculator", label: "Basic Calculator" },
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/fraction", label: "Fraction Calculator" },
        { href: "/standard-deviation", label: "Standard Deviation Calculator" },
      ]}
    />
  );
}
