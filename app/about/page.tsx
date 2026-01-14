import type { Metadata } from "next";
import Container from "../../components/Container";
import ContactForm from "../../components/ContactForm";

const capabilities = [
  "UI/UX Design",
  "React / Next.js",
  "Design Systems",
  "Frontend Architecture",
  "AI Integration",
  "Brand Identity"
];

export default function AboutPage() {
  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="upper-label">ABOUT</p>
          <h1 className="section-title mt-4 text-5xl">About.</h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm leading-[1.9] text-muted">
                EITOは、AIで既存の仕事を代替・補助し、爆速かつ高品質な成果物を作るための
                実装スタジオ。情報密度を削ぎ落とし、ユーザーとシステムの摩擦を最小化する。
              </p>
              <p className="mt-6 text-sm leading-[1.9] text-muted">
                技術は手段であり、目的は明快な体験の創出。AIと人間の判断を組み合わせ、
                速度と美意識を両立したプロダクトを設計する。
              </p>
              <div className="mt-12 border-t border-border pt-8">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Capabilities</div>
                <div className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
                  {capabilities.map((capability) => (
                    <div key={capability}>{capability}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-border/50 p-8">
              <h2 className="text-2xl font-semibold">Get in touch</h2>
              <p className="mt-4 text-sm leading-[1.8] text-muted">
                プロジェクトのご相談、コラボレーション、または単なる挨拶まで。お気軽にご連絡ください。
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "About",
  description: "AIで仕事を進化させるデザインエンジニアリングスタジオ。"
};
