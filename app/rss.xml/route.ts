import { NextResponse } from "next/server";
import { getAllPosts } from "../../lib/content";
import { siteConfig } from "../../lib/seo";

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteConfig.url}/blog/${post.slug}</guid>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.title}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
}
