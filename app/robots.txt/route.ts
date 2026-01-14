import { NextResponse } from "next/server";
import { siteConfig } from "../../lib/seo";

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteConfig.url}/sitemap.xml\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
