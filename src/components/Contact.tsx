import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, FileDown, ArrowUp } from "lucide-react";
import Chapter from "./Chapter";
import Magnetic from "./Magnetic";
import { profile } from "../data";
import { scrollToId } from "../motion";
import Tilt from "./Tilt";

/** 08 — CONTACT + footer. Form composes a real email (no fake backend). */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Hi Syed,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || `Portfolio inquiry from ${name}`)}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-void/70 px-5 py-3.5 text-sm text-cream placeholder:text-dim outline-none backdrop-blur transition-colors focus:border-magenta/60";

  return (
    <section id="contact" className="relative z-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <Chapter
          num="08"
          label="CONTACT"
          title="Open a&#10;*channel.*"
          sub="Internships, security roles, collaborations — or just a good conversation about breaking and defending systems."
        />

        <div className="grid gap-8 lg:grid-cols-5" data-reveal-group>
          {/* info cards */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {[
              { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "PHONE", value: profile.phone, href: profile.phoneHref },
              { icon: MapPin, label: "BASE", value: profile.location, href: undefined },
            ].map((c) => (
              <Tilt key={c.label} data-reveal-child className="h-full">
              <div
                className="card-sheen h-full rounded-2xl border border-line/70 bg-panel/60 p-6 backdrop-blur transition-colors hover:border-magenta/40 glass-card"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-magenta/30 bg-magenta/5">
                    <c.icon className="h-5 w-5 text-magenta" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.3em] text-dim">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="block truncate font-display font-semibold text-cream transition-colors hover:text-magenta" data-hover>
                        {c.value}
                      </a>
                    ) : (
                      <div className="font-display font-semibold text-cream">{c.value}</div>
                    )}
                  </div>
                </div>
              </div>
              </Tilt>
            ))}

            <div data-reveal-child className="flex gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-line/70 bg-panel/60 font-mono text-xs tracking-widest text-mist backdrop-blur transition-all hover:border-magenta/60 hover:text-magenta"
                data-hover
              >
                <Github className="h-5 w-5" /> GITHUB
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-line/70 bg-panel/60 font-mono text-xs tracking-widest text-mist backdrop-blur transition-all hover:border-magenta/60 hover:text-magenta"
                data-hover
              >
                <Linkedin className="h-5 w-5" /> LINKEDIN
              </a>
              <a
                href={profile.resume}
                download="Syed_Subhan_Hussain_Resume.pdf"
                aria-label="Download resume"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-magenta/50 bg-magenta/10 font-mono text-xs tracking-widest text-magenta backdrop-blur transition-all hover:bg-magenta hover:text-void"
                data-hover
              >
                <FileDown className="h-5 w-5" /> RESUME
              </a>
            </div>
          </div>

          {/* form */}
          <form
            onSubmit={submit}
            data-reveal-child
            className="rounded-2xl border border-line/70 bg-panel/60 p-7 backdrop-blur sm:p-9 lg:col-span-3 glass-card"
          >
            <div className="mb-6 font-mono text-xs tracking-[0.3em] text-dim">
              TRANSMISSION FORM <span className="text-magenta">// OPENS YOUR MAIL APP</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className={inputCls} data-hover />
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Your email" className={inputCls} data-hover />
            </div>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className={`${inputCls} mt-4`} data-hover />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Your message…" className={`${inputCls} mt-4 resize-none`} data-hover />
            <Magnetic
              type="submit"
              className="bg-ig mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-mono text-sm font-bold tracking-[0.25em] text-white shadow-[0_0_36px_rgba(236,47,125,0.35)] transition-shadow hover:shadow-[0_0_54px_rgba(236,47,125,0.6)]"
            >
              TRANSMIT MESSAGE <Send className="h-4 w-4" />
            </Magnetic>
          </form>
        </div>

        {/* footer */}
        <footer className="mt-24 border-t border-line/60 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="font-mono text-xs tracking-[0.25em] text-dim">
              © 2026 <span className="text-cream">SYED SUBHAN HUSSAIN</span> — ALL RIGHTS RESERVED
            </div>
            <div className="font-mono text-[11px] tracking-[0.25em] text-dim">
              DESIGNED AS A <span className="text-magenta">JOURNEY</span> · BUILT TO BE <span className="text-magenta">REMEMBERED</span>
            </div>
            <button
              onClick={() => scrollToId("top")}
              aria-label="Back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-mist transition-all hover:border-magenta/60 hover:text-magenta hover:shadow-[0_0_20px_rgba(236,47,125,0.3)]"
              data-hover
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
