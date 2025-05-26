"use client";

import { TriangleResult } from "@/types/triangle";
import { formatNumber, formatAngle } from "@/utils/triangleCalculations";

interface TriangleResultsProps {
  result: TriangleResult;
  angleUnit: "degrees" | "radians";
}

export default function TriangleResults({
  result,
  angleUnit,
}: TriangleResultsProps) {
  if (!result.isValid) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-red-800">
          Invalid Triangle
        </h3>
        <div className="text-red-700">
          {result.steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Triangle Properties Summary */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-blue-800">
          Triangle Properties
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Sides */}
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-blue-600">Sides</h4>
            <div className="space-y-1 text-sm">
              <p>a = {formatNumber(result.sides.a)}</p>
              <p>b = {formatNumber(result.sides.b)}</p>
              <p>c = {formatNumber(result.sides.c)}</p>
            </div>
          </div>

          {/* Angles */}
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-red-600">Angles</h4>
            <div className="space-y-1 text-sm">
              <p>A = {formatAngle(result.angles.A, angleUnit)}</p>
              <p>B = {formatAngle(result.angles.B, angleUnit)}</p>
              <p>C = {formatAngle(result.angles.C, angleUnit)}</p>
            </div>
          </div>

          {/* Basic Properties */}
          <div className="bg-white p-3 rounded border">
            <h4 className="font-medium mb-2 text-green-600">
              Basic Properties
            </h4>
            <div className="space-y-1 text-sm">
              <p>Area = {formatNumber(result.properties.area)}</p>
              <p>Perimeter = {formatNumber(result.properties.perimeter)}</p>
              <p>Type = {result.type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Properties */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Detailed Properties</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heights */}
          <div>
            <h4 className="font-medium mb-2 text-purple-600">Heights</h4>
            <div className="space-y-1 text-sm">
              <p>
                Height to side a (h<sub>a</sub>) ={" "}
                {formatNumber(result.properties.height.ha)}
              </p>
              <p>
                Height to side b (h<sub>b</sub>) ={" "}
                {formatNumber(result.properties.height.hb)}
              </p>
              <p>
                Height to side c (h<sub>c</sub>) ={" "}
                {formatNumber(result.properties.height.hc)}
              </p>
            </div>
          </div>

          {/* Medians */}
          <div>
            <h4 className="font-medium mb-2 text-orange-600">Medians</h4>
            <div className="space-y-1 text-sm">
              <p>
                Median to side a (m<sub>a</sub>) ={" "}
                {formatNumber(result.properties.median.ma)}
              </p>
              <p>
                Median to side b (m<sub>b</sub>) ={" "}
                {formatNumber(result.properties.median.mb)}
              </p>
              <p>
                Median to side c (m<sub>c</sub>) ={" "}
                {formatNumber(result.properties.median.mc)}
              </p>
            </div>
          </div>

          {/* Radii */}
          <div>
            <h4 className="font-medium mb-2 text-teal-600">Radii</h4>
            <div className="space-y-1 text-sm">
              <p>Inradius (r) = {formatNumber(result.properties.inradius)}</p>
              <p>
                Circumradius (R) ={" "}
                {formatNumber(result.properties.circumradius)}
              </p>
              <p>
                Semiperimeter (s) ={" "}
                {formatNumber(result.properties.semiperimeter)}
              </p>
            </div>
          </div>

          {/* Area Formulas */}
          <div>
            <h4 className="font-medium mb-2 text-indigo-600">
              Area Calculations
            </h4>
            <div className="space-y-1 text-sm">
              <p>Using Heron's formula:</p>
              <p className="ml-2">Area = √[s(s-a)(s-b)(s-c)]</p>
              <p className="ml-2">
                Area = {formatNumber(result.properties.area)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Steps */}
      <div className="p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-green-800">
          Solution Steps
        </h3>
        <div className="space-y-2">
          {result.steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-sm text-green-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Triangle Type Information */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-lg mb-3 text-yellow-800">
          Triangle Classification
        </h3>
        <div className="text-sm text-yellow-700">
          <p className="mb-2">
            <strong>Type:</strong>{" "}
            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}{" "}
            triangle
          </p>

          {result.type === "equilateral" && (
            <p>All three sides are equal, and all three angles are 60°.</p>
          )}

          {result.type === "isosceles" && (
            <p>
              Two sides are equal, and the angles opposite the equal sides are
              also equal.
            </p>
          )}

          {result.type === "scalene" && (
            <p>
              All three sides have different lengths, and all three angles are
              different.
            </p>
          )}

          {result.type === "right" && (
            <p>
              One angle is exactly 90°. The side opposite the right angle is the
              hypotenuse.
            </p>
          )}

          {result.type === "obtuse" && <p>One angle is greater than 90°.</p>}

          {result.type === "acute" && (
            <p>All three angles are less than 90°.</p>
          )}
        </div>
      </div>

      {/* Formulas Used */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-semibold text-lg mb-3">Formulas Used</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Law of Cosines:</h4>
            <p>c² = a² + b² - 2ab·cos(C)</p>
            <p>cos(A) = (b² + c² - a²) / (2bc)</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Law of Sines:</h4>
            <p>a/sin(A) = b/sin(B) = c/sin(C)</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Heron's Formula:</h4>
            <p>Area = √[s(s-a)(s-b)(s-c)]</p>
            <p>where s = (a+b+c)/2</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Other Formulas:</h4>
            <p>Height: h = 2·Area / base</p>
            <p>Inradius: r = Area / s</p>
            <p>Circumradius: R = abc / (4·Area)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
