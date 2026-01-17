import Link from 'next/link';
import Container from '../components/Container';
import Button from '../components/Button';
import ServiceGrid from '../components/ServiceGrid';
import WorkCard from '../components/WorkCard';
import BlogRow from '../components/BlogRow';
import { getAllPosts, getAllWorks } from '../lib/content';

function EfficiencyBadge() {
  return (
    <div className="space-y-3 text-xs uppercase tracking-[0.3em] text-muted">
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-28">Traditional</span>
            <span className="h-1 w-24 rounded-full bg-muted2" />
            <span>10x</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-28">AI Time</span>
            <span className="h-1 w-10 rounded-full bg-fg" />
            <span>1x</span>
          </div>
        </div>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="text-[10px] leading-[1.6] text-muted2">
        従来の制作プロセスを10としたとき、AI前提の設計で1に圧縮
      </div>
    </div>
  );
}

import HeroSection from '../components/HeroSection';

export default function HomePage() {
  const works = getAllWorks();
  const posts = getAllPosts();

  return (
    <main>
      <HeroSection />

      <section className="py-32 sm:py-40">
        <Container>
          <ServiceGrid />
        </Container>
      </section>

      <section className="border-t border-border py-32 sm:py-40">
        <Container>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <h2 className="section-title text-4xl">Selected Works.</h2>
              <p className="mt-4 max-w-lg text-sm leading-[1.8] text-muted">
                AIを既存業務の補助から代替へ。設計から実装までを一気通貫で行い、
                一貫したUXと実運用での成果を届ける。
              </p>
            </div>
            <EfficiencyBadge />
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {works.slice(0, 2).map((work) => (
              <WorkCard
                key={work.slug}
                title={work.title}
                category={work.category}
                year={work.year}
                slug={work.slug}
                coverImage={work.coverImage}
                outcome={work.outcome}
                tags={work.stack}
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/works"
              className="text-sm uppercase tracking-[0.3em] hover-underline"
            >
              View all works
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-32 sm:py-40">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title text-4xl">Blog.</h2>
              <p className="mt-4 text-sm text-muted">
                思考の断片と技術的な覚書。
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm uppercase tracking-[0.3em] hover-underline"
            >
              Read all
            </Link>
          </div>
          <div className="mt-10">
            {posts.slice(0, 3).map((post) => (
              <BlogRow
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readingMinutes={post.readingMinutes}
                slug={post.slug}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
