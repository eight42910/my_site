import type { Metadata } from "next";
import Container from "../../components/Container";
import BlogTabs from "../../components/BlogTabs";
import { getAllPosts } from "../../lib/content";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="upper-label">BLOG</p>
          <h1 className="section-title mt-4 text-5xl">Blog.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] text-muted">
            思考の断片と技術的な覚書。LogicはAI/Tech、SensibilityはWineの学習ログを。
          </p>
          <div className="mt-12">
            <BlogTabs posts={posts} />
          </div>
        </Container>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "AI/TechとWineの学習ログをまとめた記事一覧。"
};
