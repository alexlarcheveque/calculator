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
        <p className="text-lg text-gray-700 mb-4">
          This calculator returns a variety of information regarding Internet
          Protocol version 4 (IPv4) and IPv6 subnets including possible network
          addresses, usable host ranges, subnet mask, and IP class, among
          others.
        </p>
        <p className="text-sm text-gray-600">
          Calculate subnet information for both IPv4 and IPv6 networks with
          support for CIDR notation, network classes, and comprehensive network
          analysis.
        </p>
      </header>
      <SubnetPage />
    </div>
  );
}
