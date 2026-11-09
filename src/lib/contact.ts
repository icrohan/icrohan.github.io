export type ContactField = "name" | "email" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form and the API route. */
export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.name.length > 120) e.name = "That name is a little long.";
  if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 200) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "A short subject helps — at least 3 characters.";
  if (v.subject.length > 200) e.subject = "Please keep the subject under 200 characters.";
  if (v.message.trim().length < 20) e.message = "Tell me a little more — at least 20 characters.";
  if (v.message.length > 5000) e.message = "Please keep it under 5,000 characters.";
  return e;
}
