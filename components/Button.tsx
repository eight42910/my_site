import Link from "next/link";

type ButtonProps = {
  href: string;
  label: string;
};

export default function Button({ href, label }: ButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-dark px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-90"
    >
      <span>{label}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
