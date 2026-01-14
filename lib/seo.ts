export const siteConfig = {
  name: "EITO.",
  title: "EITO.",
  description: "AIで既存の仕事を代替・補助し、爆速で高品質な成果物を実現するクリエイティブエンジニア。",
  url: "https://example.com",
  locale: "ja_JP",
  twitter: "@example"
};

export const defaultOpenGraph = {
  title: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  siteName: siteConfig.title,
  locale: siteConfig.locale,
  type: "website",
  images: [
    {
      url: `${siteConfig.url}/og/default.svg`,
      width: 1200,
      height: 630,
      alt: siteConfig.title
    }
  ]
};

export function jsonLdWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description
  };
}

export function jsonLdPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eito",
    url: siteConfig.url,
    jobTitle: "AI Product Designer / Engineer",
    knowsAbout: ["AI", "UX Design", "Web Development", "Automation"],
    sameAs: [
      "https://twitter.com/",
      "https://github.com/",
      "https://www.linkedin.com/"
    ]
  };
}

export function jsonLdBlogPosting(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Eito"
    }
  };
}

export function jsonLdCreativeWork(work: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    datePublished: work.date,
    url: `${siteConfig.url}/works/${work.slug}`
  };
}
