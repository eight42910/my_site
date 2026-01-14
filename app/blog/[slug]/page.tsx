import { notFound } from "next/navigation";
import Container from "../../../components/Container";
import { getPostBySlug, getPostSlugs } from "../../../lib/content";
import { jsonLdBlogPosting } from "../../../lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined
    }
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className={`upper-label ${post.category === "ai" ? "text-accentTech" : "text-accentWine"}`}>
            {post.category === "ai" ? "LOGIC" : "SENSIBILITY"}
          </p>
          <h1 className="section-title mt-4 text-4xl sm:text-5xl">{post.title}.</h1>
          <div className="mt-4 text-sm text-muted2">
            {post.date} · {post.readingMinutes}
          </div>
          <div className={`mt-10 space-y-6 text-sm leading-[1.9] text-muted ${
            post.category === "ai" ? "font-mono" : "font-serif"
          }`}>
            <MDXRemote source={post.content} />
          </div>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              jsonLdBlogPosting({
                title: post.title,
                description: post.excerpt,
                date: post.date,
                slug: post.slug
              })
            )
          }}
        />
      </section>
    </main>
  );
}
