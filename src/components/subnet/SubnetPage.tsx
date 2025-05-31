"use client";

import IPv4Calculator from "./IPv4Calculator";
import IPv6Calculator from "./IPv6Calculator";
import FAQSection from "./FAQSection";

export default function SubnetPage() {
  return (
    <div className="space-y-8">
      <IPv4Calculator />
      <IPv6Calculator />
      <FAQSection />
    </div>
  );
}
