import { NextResponse } from "next/server";
import { getAllPosts, getAllWorks } from "../../lib/content";
import { siteConfig } from "../../lib/seo";

export async function GET() {
  const staticRoutes = ["/", "/product", "/works", "/blog", "/about"];
  const posts = getAllPosts().map((post) => `/blog/${post.slug}`);
  const works = getAllWorks().map((work) => `/works/${work.slug}`);

  const urls = [...staticRoutes, ...posts, ...works]
    .map(
      (route) => `
    <url>
      <loc>${siteConfig.url}${route}</loc>
    </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
