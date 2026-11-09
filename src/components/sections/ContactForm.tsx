"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { site } from "@/content/site";
import { type ContactErrors as Errors, type ContactField as Field, validateContact as validate } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string } | { kind: "unconfigured" };

export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: Field, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) return;

    // The site is static (GitHub Pages), so the message is handed to the visitor's own email app.
    if (new FormData(e.currentTarget).get("company")) return; // honeypot
    const body = `${values.message}

— ${values.name} (${values.email})`;
    window.location.href = `mailto:${site.links.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "unconfigured" });
  }

  const input = (k: Field) =>
    cn(
      "w-full rounded-xl border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40",
      touched[k] && errors[k] ? "border-[#e5484d]/70" : "border-line focus:border-accent/60",
    );

  const field = (k: Field, label: string, el: ReactNode) => (
    <div>
      <label htmlFor={`cf-${k}`} className="mb-1.5 block text-xs font-medium text-fg-soft">{label}</label>
      {el}
      {touched[k] && errors[k] && <p id={`cf-${k}-err`} className="mt-1.5 text-xs text-[#e5484d]">{errors[k]}</p>}
    </div>
  );

  const aria = (k: Field) => ({
    "aria-invalid": !!(touched[k] && errors[k]),
    "aria-describedby": touched[k] && errors[k] ? `cf-${k}-err` : undefined,
    onBlur: () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(values)); },
  });

  return (
    <form onSubmit={onSubmit} noValidate className="panel relative space-y-4 rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Name", <input id="cf-name" name="name" autoComplete="name" className={input("name")} value={values.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />)}
        {field("email", "Email", <input id="cf-email" name="email" type="email" autoComplete="email" className={input("email")} value={values.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />)}
      </div>
      {field("subject", "Subject", <input id="cf-subject" name="subject" className={input("subject")} value={values.subject} onChange={(e) => set("subject", e.target.value)} {...aria("subject")} />)}
      {field("message", "Message", <textarea id="cf-message" name="message" rows={5} className={cn(input("message"), "resize-y")} value={values.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />)}

      {/* Honeypot — hidden from people, tempting for bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="text-sm">
          {status.kind === "sent" && <p className="flex items-center gap-2 text-[var(--signal)]"><CheckCircle2 className="h-4 w-4" /> Message sent — thank you. I&apos;ll reply by email.</p>}
          {status.kind === "error" && <p className="flex items-center gap-2 text-[#e5484d]"><AlertCircle className="h-4 w-4" /> {status.message}</p>}
          {status.kind === "unconfigured" && (
            <p className="flex items-start gap-2 text-fg-soft">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {site.links.email ? (
                  <>Your email app should open with the message ready to send. If it didn&apos;t, write to{" "}
                    <a href={`mailto:${site.links.email}`} className="text-accent underline">{site.links.email}</a>.</>
                ) : (
                  <>The contact form isn&apos;t connected yet. Please reach me on{" "}
                    <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent underline">LinkedIn</a>.</>
                )}
              </span>
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg disabled:opacity-60"
        >
          {status.kind === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send message</>}
        </button>
      </div>
    </form>
  );
}
