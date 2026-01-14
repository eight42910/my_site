import type { Metadata } from "next";
import Container from "../../components/Container";
import WorkCard from "../../components/WorkCard";
import { getAllWorks } from "../../lib/content";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="upper-label">WORK</p>
          <h1 className="section-title mt-4 text-5xl">Work.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] text-muted">
            制作物・実験・ケーススタディ。デジタル領域における「シンプル」の可能性を
            拡張するアーカイブ。
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
            {works.map((work, index) => {
              const isOffset = index % 2 === 1;
              const columnClass = isOffset ? "md:col-span-5" : "md:col-span-7";
              const offsetClass = isOffset ? "md:mt-12 lg:mt-24" : "";

              return (
              <WorkCard
                key={work.slug}
                title={work.title}
                category={work.category}
                year={work.year}
                slug={work.slug}
                coverImage={work.coverImage}
                outcome={work.outcome}
                tags={work.stack}
                className={`${columnClass} ${offsetClass}`}
                enableMotion
              />
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Work",
  description: "制作物・実験・ケーススタディのアーカイブ。"
};
