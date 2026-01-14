import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostCategory = "ai" | "wine";

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: PostCategory;
  coverImage?: string;
  draft?: boolean;
};

export type WorkFrontmatter = {
  title: string;
  slug: string;
  year: string;
  category: string;
  summary: string;
  outcome: string;
  roles: string[];
  stack: string[];
  coverImage: string;
  gallery: string[];
  aiInvolvement: string;
  results: string;
  publishedAt: string;
};

export type Post = PostFrontmatter & {
  content: string;
  readingMinutes: string;
};

export type Work = WorkFrontmatter & {
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");
const worksDir = path.join(process.cwd(), "content", "works");

function readMdxFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): Post[] {
  const files = readMdxFiles(postsDir);
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    const stats = readingTime(content);

    return {
      ...frontmatter,
      content,
      readingMinutes: stats.text
    };
  });

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const files = readMdxFiles(postsDir);
  const file = files.find((f) => f.includes(slug));
  if (!file) return null;

  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    content,
    readingMinutes: stats.text
  };
}

export function getAllWorks(): Work[] {
  const files = readMdxFiles(worksDir);
  const works = files.map((file) => {
    const raw = fs.readFileSync(path.join(worksDir, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as WorkFrontmatter;

    return {
      ...frontmatter,
      content
    };
  });

  return works.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getWorkBySlug(slug: string): Work | null {
  const files = readMdxFiles(worksDir);
  const file = files.find((f) => f.includes(slug));
  if (!file) return null;

  const raw = fs.readFileSync(path.join(worksDir, file), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as WorkFrontmatter;

  return {
    ...frontmatter,
    content
  };
}

export function getPostSlugs() {
  return readMdxFiles(postsDir).map((file) => file.replace(/\.mdx$/, ""));
}

export function getWorkSlugs() {
  return readMdxFiles(worksDir).map((file) => file.replace(/\.mdx$/, ""));
}
