import React from "react";

export interface GridItem {
  title: string;
  description: string;
  titleColor?: string;
}

export interface ListItem {
  label: string;
  description: string;
}

export interface CalloutBox {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  content: string;
}

export interface ContentSection {
  type: "text" | "subheader" | "grid" | "list" | "callout";
  content?: string;
  heading?: string;
  headingLevel?: "h3" | "h4";
  gridItems?: GridItem[];
  gridCols?: 1 | 2 | 3 | 4;
  listItems?: ListItem[];
  callout?: CalloutBox;
}

export interface InfoCardProps {
  title: string;
  sections: ContentSection[];
  className?: string;
}

const getCalloutStyles = (type: CalloutBox["type"]) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };
  return styles[type];
};

export default function InfoCard({
  title,
  sections,
  className = "",
}: InfoCardProps) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      <div className="prose prose-gray max-w-none">
        {sections.map((section, index) => (
          <div key={index} className="mb-6 last:mb-0">
            {section.type === "text" && (
              <p className="mb-4 text-gray-700">{section.content}</p>
            )}

            {section.type === "subheader" && (
              <>
                {section.headingLevel === "h4" ? (
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">
                    {section.heading}
                  </h4>
                ) : (
                  <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                    {section.heading}
                  </h3>
                )}
                {section.content && (
                  <p className="mb-4 text-gray-700">{section.content}</p>
                )}
              </>
            )}

            {section.type === "grid" && section.gridItems && (
              <div
                className={`grid grid-cols-1 ${
                  section.gridCols === 2
                    ? "md:grid-cols-2"
                    : section.gridCols === 3
                    ? "md:grid-cols-3"
                    : section.gridCols === 4
                    ? "md:grid-cols-4"
                    : "md:grid-cols-2"
                } gap-6`}
              >
                {section.gridItems.map((item, gridIndex) => (
                  <div key={gridIndex}>
                    <h4
                      className={`font-semibold text-lg mb-2 ${
                        item.titleColor || "text-gray-800"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {section.type === "list" && section.listItems && (
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {section.listItems.map((item, listIndex) => (
                  <li key={listIndex}>
                    <strong>{item.label}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            )}

            {section.type === "callout" && section.callout && (
              <div
                className={`mt-6 p-4 border rounded-lg ${getCalloutStyles(
                  section.callout.type
                )}`}
              >
                <p className="text-sm">
                  {section.callout.title && (
                    <strong>{section.callout.title}: </strong>
                  )}
                  {section.callout.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
