import { Metadata } from "next";
import ConversionPage from "@/components/conversion/ConversionPage";

export const metadata: Metadata = {
  title: "Conversion Calculator | Unit Converter",
  description:
    "Convert between common units of length, temperature, area, volume, and weight. Free online unit conversion calculator with instant results.",
  keywords:
    "conversion calculator, unit converter, length converter, temperature converter, area converter, volume converter, weight converter, metric imperial",
};

export default function Conversion() {
  return <ConversionPage />;
}
