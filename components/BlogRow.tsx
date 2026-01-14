import Link from "next/link";

type BlogRowProps = {
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: string;
  slug: string;
};

export default function BlogRow({ title, excerpt, date, readingMinutes, slug }: BlogRowProps) {
  return (
    <Link href={`/blog/${slug}`} className="group grid gap-6 border-b border-border py-10 md:grid-cols-[1fr_auto]">
      <div>
        <h3 className="text-xl font-semibold group-hover:opacity-80">{title}</h3>
        <p className="mt-3 text-sm leading-[1.8] text-muted">{excerpt}</p>
      </div>
      <div className="text-sm text-muted2">
        {date} · {readingMinutes}
      </div>
    </Link>
  );
}
