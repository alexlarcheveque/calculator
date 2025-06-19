"use client";

import { useState } from "react";
import { TriangleResult } from "@/types/triangle";
import { formatNumber, formatAngle } from "@/utils/triangleCalculations";

interface TriangleResultsProps {
  result: TriangleResult;
  angleUnit: "degrees" | "radians";
}

// Helper function to calculate triangle coordinates based on solved values
const calculateTriangleCoordinates = (result: TriangleResult) => {
  const { a, b, c } = result.sides;
  const { A, B, C } = result.angles;

  // Scale factor to fit the triangle nicely in the SVG
  const maxSide = Math.max(a, b, c);
  const scale = 300 / maxSide;

  // Place side c on the bottom (horizontal)
  const scaledC = c * scale;
  const x1 = (400 - scaledC) / 2;
  const y1 = 250;
  const x2 = x1 + scaledC;
  const y2 = y1;

  // Calculate the third vertex using angle A
  const angleARadians = (A * Math.PI) / 180;
  const scaledB = b * scale;

  const x3 = x1 + scaledB * Math.cos(angleARadians);
  const y3 = y1 - scaledB * Math.sin(angleARadians);

  return {
    vertices: [
      { x: x1, y: y1, label: "A" },
      { x: x2, y: y2, label: "B" },
      { x: x3, y: y3, label: "C" },
    ],
    sides: [
      {
        x1,
        y1,
        x2,
        y2,
        length: c,
        label: "c",
        midX: (x1 + x2) / 2,
        midY: (y1 + y2) / 2 + 20,
      },
      {
        x1: x2,
        y1: y2,
        x2: x3,
        y2: y3,
        length: a,
        label: "a",
        midX: (x2 + x3) / 2 + 15,
        midY: (y2 + y3) / 2,
      },
      {
        x1: x3,
        y1: y3,
        x2: x1,
        y2: y1,
        length: b,
        label: "b",
        midX: (x3 + x1) / 2 - 15,
        midY: (y3 + y1) / 2,
      },
    ],
  };
};

export default function TriangleResults({
  result,
  angleUnit,
}: TriangleResultsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  if (!result.isValid) {
    return (
      <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-xl mb-4 text-red-800">
          Invalid Triangle
        </h3>
        <div className="text-red-700 space-y-2">
          {result.steps.map((step, index) => (
            <p key={index}>• {step}</p>
          ))}
        </div>
      </div>
    );
  }

  const triangleCoords = calculateTriangleCoordinates(result);

  return (
    <div className="mt-6 space-y-6">
      {/* Main Results - Triangle Visualization + Key Info */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Triangle Solution
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Triangle Visualization */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-center">
              <svg
                width="400"
                height="300"
                viewBox="0 0 400 300"
                className="border rounded"
              >
                {/* Triangle outline */}
                <polygon
                  points={`${triangleCoords.vertices[0].x},${triangleCoords.vertices[0].y} ${triangleCoords.vertices[1].x},${triangleCoords.vertices[1].y} ${triangleCoords.vertices[2].x},${triangleCoords.vertices[2].y}`}
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />

                {/* Side labels */}
                {triangleCoords.sides.map((side, index) => (
                  <g key={index}>
                    <text
                      x={side.midX}
                      y={side.midY}
                      textAnchor="middle"
                      className="text-sm font-semibold fill-blue-600"
                    >
                      {side.label} = {formatNumber(side.length)}
                    </text>
                  </g>
                ))}

                {/* Vertex labels with angles */}
                <text
                  x={triangleCoords.vertices[0].x}
                  y={triangleCoords.vertices[0].y + 20}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-red-600"
                >
                  {triangleCoords.vertices[0].label} ={" "}
                  {formatAngle(result.angles.A, angleUnit)}
                </text>
                <text
                  x={triangleCoords.vertices[1].x}
                  y={triangleCoords.vertices[1].y + 20}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-red-600"
                >
                  {triangleCoords.vertices[1].label} ={" "}
                  {formatAngle(result.angles.B, angleUnit)}
                </text>
                <text
                  x={triangleCoords.vertices[2].x}
                  y={triangleCoords.vertices[2].y - 10}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-red-600"
                >
                  {triangleCoords.vertices[2].label} ={" "}
                  {formatAngle(result.angles.C, angleUnit)}
                </text>

                {/* Vertex points */}
                {triangleCoords.vertices.map((vertex, index) => (
                  <circle
                    key={index}
                    cx={vertex.x}
                    cy={vertex.y}
                    r="4"
                    fill="#3B82F6"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
              <h4 className="text-xl font-semibold mb-4 text-blue-800">
                Key Results
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatNumber(result.properties.area)}
                  </div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatNumber(result.properties.perimeter)}
                  </div>
                  <div className="text-sm text-gray-600">Perimeter</div>
                </div>
              </div>

              <div className="text-center mb-4">
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold capitalize">
                  {result.type} Triangle
                </span>
              </div>

              <div className="text-sm text-gray-600 text-center">
                {result.type === "equilateral" &&
                  "All sides and angles are equal"}
                {result.type === "isosceles" &&
                  "Two sides and two angles are equal"}
                {result.type === "scalene" &&
                  "All sides and angles are different"}
                {result.type === "right" && "One angle is exactly 90°"}
                {result.type === "obtuse" && "One angle is greater than 90°"}
                {result.type === "acute" && "All angles are less than 90°"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {showSteps ? "Hide" : "Show"} Solution Steps
              </button>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {showAdvanced ? "Hide" : "Show"} Advanced Properties
              </button>
              <button
                onClick={() => setShowFormulas(!showFormulas)}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {showFormulas ? "Hide" : "Show"} Formulas Used
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Steps - Collapsible */}
      {showSteps && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-4 text-green-800">
            Solution Steps
          </h3>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white text-sm rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="text-green-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Properties - Collapsible */}
      {showAdvanced && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-6 text-blue-800">
            Advanced Properties
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Heights */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-purple-600">Heights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    h<sub>a</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.height.ha)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    h<sub>b</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.height.hb)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    h<sub>c</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.height.hc)}
                  </span>
                </div>
              </div>
            </div>

            {/* Medians */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-orange-600">Medians</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    m<sub>a</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.median.ma)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    m<sub>b</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.median.mb)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    m<sub>c</sub>:
                  </span>
                  <span className="font-medium">
                    {formatNumber(result.properties.median.mc)}
                  </span>
                </div>
              </div>
            </div>

            {/* Radii */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-teal-600">
                Special Radii
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Inradius (r):</span>
                  <span className="font-medium">
                    {formatNumber(result.properties.inradius)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Circumradius (R):</span>
                  <span className="font-medium">
                    {formatNumber(result.properties.circumradius)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Semiperimeter (s):</span>
                  <span className="font-medium">
                    {formatNumber(result.properties.semiperimeter)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulas Used - Collapsible */}
      {showFormulas && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-6 text-purple-800">
            Formulas Used
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-blue-600">
                Law of Cosines
              </h4>
              <div className="text-sm space-y-1 font-mono">
                <p>c² = a² + b² - 2ab·cos(C)</p>
                <p>cos(A) = (b² + c² - a²) / (2bc)</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-green-600">
                Law of Sines
              </h4>
              <div className="text-sm font-mono">
                <p>a/sin(A) = b/sin(B) = c/sin(C)</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-red-600">
                Heron's Formula
              </h4>
              <div className="text-sm space-y-1 font-mono">
                <p>Area = √[s(s-a)(s-b)(s-c)]</p>
                <p className="text-xs text-gray-600">where s = (a+b+c)/2</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-3 text-purple-600">
                Other Formulas
              </h4>
              <div className="text-sm space-y-1 font-mono">
                <p>Height: h = 2·Area / base</p>
                <p>Inradius: r = Area / s</p>
                <p>Circumradius: R = abc / (4·Area)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
