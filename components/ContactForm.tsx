"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    const subject = encodeURIComponent("Project Inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-muted">Name</label>
        <input
          name="name"
          required
          placeholder="Your name"
          className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm focus:border-fg focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-muted">Email address</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm focus:border-fg focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-muted">Message</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="How can we help?"
          className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm focus:border-fg focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex w-full items-center justify-between rounded-full bg-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-bg disabled:opacity-60"
      >
        <span>{status === "sent" ? "Sent" : "Send message"}</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </button>
      <p className="text-xs text-muted">
        メールクライアントが開かない場合は hello@example.com へ直接ご連絡ください。
      </p>
    </form>
  );
}
