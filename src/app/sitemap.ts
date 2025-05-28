import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calcy.net";

  const routes = [
    "",
    "/mortgage",
    "/auto-loan",
    "/amortization",
    "/investment",
    "/loan",
    "/refinance",
    "/retirement",
    "/compound-interest",
    "/interest-rate",
    "/payment",
    "/bmi",
    "/body-fat",
    "/pace",
    "/inflation",
    "/income-tax",
    "/sales-tax",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/mortgage" ? 0.9 : 0.8,
  }));

  return routes;
}
