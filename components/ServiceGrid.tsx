const services = [
  {
    title: "01 STRATEGY",
    description:
      "ノイズを取り除き、コアとなる価値を明確化する。機能の足し算ではなく、引き算による課題解決。"
  },
  {
    title: "02 DESIGN",
    description:
      "タイポグラフィと余白による強力な視覚的階層。流行に左右されない、タイムレスなインターフェース。"
  },
  {
    title: "03 ENGINEERING",
    description:
      "React/TypeScriptを中核に、AIと自動化を統合。高速なプロトタイプと堅牢な実装を両立。"
  }
];

export default function ServiceGrid() {
  return (
    <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-3">
      {services.map((service) => (
        <div key={service.title} className="space-y-4">
          <div className="text-sm font-semibold tracking-[0.3em]">{service.title}</div>
          <div className="h-px w-12 bg-fg" />
          <p className="text-sm leading-[1.8] text-muted">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
