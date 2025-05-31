import SubnetPage from "@/components/subnet/SubnetPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Subnet Calculator | Calcy.net",
  description:
    "This IP subnet calculator covers both IPv4 and IPv6 protocols, providing information such as IP address, network address, subnet mask, IP range, and more.",
};

export default function SubnetCalculatorRoute() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          IP Subnet Calculator
        </h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Calculate subnet information for IPv4 and IPv6 networks including
          network addresses, usable host ranges, subnet masks, and IP classes.
          Supports CIDR notation and comprehensive network analysis.
        </p>
      </header>
      <SubnetPage />
    </div>
  );
}
