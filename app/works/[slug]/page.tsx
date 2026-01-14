import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "../../../components/Container";
import { getWorkBySlug, getWorkSlugs } from "../../../lib/content";
import { jsonLdCreativeWork } from "../../../lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = getWorkBySlug(params.slug);
  if (!work) return {};

  return {
    title: work.title,
    description: work.summary,
    openGraph: {
      title: work.title,
      description: work.summary,
      images: work.coverImage ? [work.coverImage] : undefined
    }
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) return notFound();

  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="upper-label">WORK</p>
          <h1 className="section-title mt-4 text-4xl sm:text-5xl">{work.title}.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-muted">{work.summary}</p>
          <div className="mt-10 overflow-hidden bg-border">
            <Image
              src={work.coverImage}
              alt={work.title}
              width={1200}
              height={760}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6 text-sm leading-[1.8] text-muted">
              <MDXRemote source={work.content} />
            </div>
            <div className="space-y-6 text-sm">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Year</div>
                <div className="mt-2 font-semibold">{work.year}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Category</div>
                <div className="mt-2 font-semibold">{work.category}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Roles</div>
                <div className="mt-2 text-muted">{work.roles.join(", ")}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Stack</div>
                <div className="mt-2 text-muted">{work.stack.join(", ")}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">AI Involvement</div>
                <div className="mt-2 text-muted">{work.aiInvolvement}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Outcome</div>
                <div className="mt-2 text-muted">{work.outcome}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Results</div>
                <div className="mt-2 text-muted">{work.results}</div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {work.gallery.map((image) => (
              <div key={image} className="overflow-hidden bg-border">
                <Image
                  src={image}
                  alt={work.title}
                  width={900}
                  height={620}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              jsonLdCreativeWork({
                title: work.title,
                description: work.summary,
                slug: work.slug,
                date: work.publishedAt
              })
            )
          }}
        />
      </section>
    </main>
  );
}
