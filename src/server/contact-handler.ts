import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  /* Server-side validation mirrors the client so the endpoint is safe on its own. */
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Name is required.";
  if (!EMAIL.test(email)) errors.email = "A valid email address is required.";
  if (message.length < 20) errors.message = "Please include a little more detail.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  /*
   * The enquiry is validated and ready to deliver. Wire up a transactional
   * provider here — Resend, Postmark, SendGrid — or forward it into a CRM.
   *
   *   await resend.emails.send({
   *     from: "site@onyxeratech.com",
   *     to: process.env.CONTACT_INBOX!,
   *     subject: `New enquiry — ${body.service ?? "General"}`,
   *     text: `${name} <${email}>\n${body.company ?? ""}\n${body.budget ?? ""}\n\n${message}`,
   *   });
   *
   * Until a provider is configured we log the enquiry so nothing is lost in
   * development, and acknowledge the submission.
   */
  console.info("[contact] new enquiry", {
    name,
    email,
    company: body.company || null,
    service: body.service || null,
    budget: body.budget || null,
    length: message.length,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks for reaching out. One of the team will reply within four business hours, usually sooner.",
  });
}
