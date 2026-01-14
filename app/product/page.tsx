import type { Metadata } from "next";
import Container from "../../components/Container";

const products = [
  {
    title: "SignalSynth",
    description: "既存の議事録・ログから洞察を抽出し、行動に変換するAIコンダクター。",
    outcome: "会議後の意思決定を即日化するワークフロー。",
    tags: ["AI", "Insight", "Workflow"],
    cta: "View demo",
    href: "https://example.com",
    span: "col-span-6 lg:col-span-4"
  },
  {
    title: "BriefWeaver",
    description: "要件とペルソナを統合し、設計ブリーフを10分で生成。",
    outcome: "設計初動を最短化し、意思決定を速く。",
    tags: ["Prompt", "Product", "UX"],
    cta: "Read summary",
    href: "https://example.com",
    span: "col-span-6 md:col-span-3 lg:col-span-2"
  },
  {
    title: "PitchFrame",
    description: "プレゼン資料を構造化し、ストーリーとビジュアルを同期する。",
    outcome: "提案の説得力を強化するテンプレート。",
    tags: ["Deck", "Strategy"],
    cta: "View story",
    href: "https://example.com",
    span: "col-span-6 md:col-span-3 lg:col-span-2"
  },
  {
    title: "WineAtlas",
    description: "テイスティングログを知識に変換する学習メディア。",
    outcome: "感覚の記録を学習資産として再利用。",
    tags: ["Wine", "Media"],
    cta: "Open journal",
    href: "/blog",
    span: "col-span-6 lg:col-span-4"
  },
  {
    title: "OpsPulse",
    description: "運用改善のためのAIモニタリングダッシュボード。",
    outcome: "ボトルネックの兆候を早期検知。",
    tags: ["AI", "Ops"],
    cta: "View dashboard",
    href: "https://example.com",
    span: "col-span-6 md:col-span-3 lg:col-span-3"
  },
  {
    title: "Prototype Lane",
    description: "UIプロトタイプを48時間で検証可能な状態へ。",
    outcome: "検証サイクルを1/3に短縮。",
    tags: ["Design", "Sprint"],
    cta: "Start sprint",
    href: "/about",
    span: "col-span-6 md:col-span-3 lg:col-span-3"
  }
];

const cardVariant: "border" | "soft" = "soft";

export default function ProductPage() {
  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="upper-label">PRODUCT</p>
          <h1 className="section-title mt-4 text-5xl">Product.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] text-muted">
            AIを核とした自作プロダクト/ツール群。速さと再現性を武器に、
            実務へ直接インストールできる形で提供する。
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-6">
            {products.map((product, index) => (
              <a
                key={product.title}
                href={product.href}
                className={`group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border p-6 transition-transform duration-200 ${product.span} ${
                  cardVariant === "soft"
                    ? "bg-border/50 hover:bg-border/70"
                    : "bg-transparent hover:border-fg"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30`}
              >
                <div className="transition-transform duration-200 group-hover:-translate-y-1">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-muted2">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{product.title}</h3>
                  <p className="mt-3 text-sm leading-[1.8] text-muted">{product.description}</p>
                  <p className="mt-3 text-sm leading-[1.7] text-muted2">{product.outcome}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-muted">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-muted2 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted hover:text-fg">
                    {product.cta} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Product",
  description: "AIを核とした自作プロダクト/ツールのアーカイブ。"
};
