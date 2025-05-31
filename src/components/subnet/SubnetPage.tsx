"use client";

import IPv4Calculator from "./IPv4Calculator";
import IPv6Calculator from "./IPv6Calculator";
import FAQSection from "./FAQSection";

export default function SubnetPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          IP Subnet Calculator (IPv4 & IPv6 CIDR, VLSM, Network Planning)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Advanced IP subnet calculator with comprehensive IPv4 and IPv6
          support. Calculate network addresses, broadcast addresses, host
          ranges, and subnet masks using CIDR notation. Features VLSM planning
          for efficient address allocation, supernetting capabilities, and
          detailed binary/hexadecimal analysis. Perfect for network engineers,
          IT professionals, and students learning subnetting. Supports all
          network classes (A, B, C), private addressing (RFC 1918), and modern
          IPv6 prefix calculations for enterprise network design and
          troubleshooting.
        </p>
      </div>

      <div className="space-y-8">
        <IPv4Calculator />
        <IPv6Calculator />
        <FAQSection />
      </div>
    </div>
  );
}
