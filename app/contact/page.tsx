import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Drop Coupon team — questions, code submissions, and partnership enquiries.",
};

const EMAIL = "info@dropcoupon.com";

export default function ContactPage() {
  return (
    <div className="container-page">
      {/* Hero */}
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Contact
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[58px]">
          Get in touch.
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          Found a working code, want to partner with us, or just have a question?
          One inbox, real people, and a reply within two business days.
        </p>
      </section>

      {/* Body */}
      <section className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Email + details */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
              Email us
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 block text-[24px] font-bold tracking-[-0.01em] text-ink underline-offset-4 hover:text-primary hover:underline md:text-[30px]"
            >
              {EMAIL}
            </a>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Use the same address for support, code submissions, partnerships,
              and press. Tell us what you need and we&rsquo;ll route it to the
              right person.
            </p>

            <dl className="mt-10 border-t border-line">
              <div className="flex items-center justify-between border-b border-line py-4">
                <dt className="text-[14px] text-muted">Response time</dt>
                <dd className="text-[15px] font-semibold text-ink">
                  Within 2 business days
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-line py-4">
                <dt className="text-[14px] text-muted">Hours</dt>
                <dd className="text-[15px] font-semibold text-ink">
                  Mon–Fri, 9am–6pm
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-line py-4">
                <dt className="text-[14px] text-muted">Submit a code</dt>
                <dd className="text-[15px] font-semibold text-ink">
                  Subject line &ldquo;New code&rdquo;
                </dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <form
            action={`mailto:${EMAIL}`}
            method="post"
            encType="text/plain"
            className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 md:p-8"
          >
            <h2 className="text-[20px] font-bold text-ink">Send a message</h2>
            <p className="mt-1 text-[14px] text-muted">
              We&rsquo;ll reply to the email address you provide.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" type="text" />
                <Field id="email" label="Email" type="email" />
              </div>
              <Field id="subject" label="Subject" type="text" />
              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="text-[14px] font-medium text-ink"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="rounded-[var(--radius)] border border-line bg-background px-3.5 py-2.5 text-[14px] text-ink placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-1 h-12 rounded-[var(--radius)] bg-primary px-6 text-[15px] font-medium text-ink transition-colors hover:bg-primary-hover"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ id, label, type }: { id: string; label: string; type: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="h-11 rounded-[var(--radius)] border border-line bg-background px-3.5 text-[14px] text-ink placeholder:text-muted focus:border-primary focus:outline-none"
      />
    </div>
  );
}
