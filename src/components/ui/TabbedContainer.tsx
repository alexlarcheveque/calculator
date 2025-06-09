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
  onActiveTabChange?: (tabId: string) => void;
  className?: string;
  contentClassName?: string;
}

export default function TabbedContainer({
  title,
  tabs,
  defaultActiveTab,
  onActiveTabChange,
  className = "",
  contentClassName = "",
}: TabbedContainerProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onActiveTabChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-6 text-gray-800">{title}</h2>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none whitespace-nowrap
                        ${
                          activeTab === tab.id
                            ? "border-b-2 border-blue-600 text-blue-600"
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
