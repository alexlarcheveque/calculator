"use client";

import { useState } from "react";
import Script from "next/script";

export interface FAQItem {
  question: string;
  answer: React.ReactNode | string;
  id?: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  allowMultipleOpen?: boolean;
  includeSchema?: boolean;
  schemaId?: string;
  className?: string;
  disclaimer?: React.ReactNode;
  relatedLinks?: Array<{
    href: string;
    label: string;
  }>;
}

// Helper to extract text from ReactNode for JSON-LD
function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = (node as any).props;
    if (props && props.children) {
      return extractTextFromReactNode(props.children);
    }
  }
  return "";
}

export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
  allowMultipleOpen = true,
  includeSchema = false,
  schemaId = "faq-schema",
  className = "",
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (allowMultipleOpen) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const isOpen = (index: number) => {
    return allowMultipleOpen ? openItems.includes(index) : openIndex === index;
  };

  // Create the FAQ schema for SEO
  const faqSchema = includeSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: extractTextFromReactNode(item.answer),
          },
        })),
      }
    : null;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {faqSchema && (
        <Script id={schemaId} type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="border border-gray-200 rounded-lg"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg transition-colors"
              aria-expanded={isOpen(index)}
              aria-controls={item.id || `faq-${index}`}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 text-xl">
                {isOpen(index) ? "−" : "+"}
              </span>
            </button>

            {isOpen(index) && (
              <div
                id={item.id || `faq-${index}`}
                className="px-4 pb-3 border-t border-gray-200"
              >
                <div className="pt-3 text-gray-600 leading-relaxed">
                  {typeof item.answer === "string" ? (
                    <p>{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
