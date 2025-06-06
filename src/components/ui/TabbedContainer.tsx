"use client";

import { useState, ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  ariaLabel?: string;
  content: ReactNode;
}

export interface TabbedContainerProps {
  title?: string;
  tabs: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  contentClassName?: string;
}

export default function TabbedContainer({
  title,
  tabs,
  defaultActiveTab,
  className = "",
  contentClassName = "",
}: TabbedContainerProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-6 text-gray-800">{title}</h2>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 font-medium text-sm ${
              index > 0 ? "mr-4" : ""
            } ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label={tab.ariaLabel || `Switch to ${tab.label} tab`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={contentClassName}>{activeTabContent}</div>
    </div>
  );
}
