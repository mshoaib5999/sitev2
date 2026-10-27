import React, { useState } from 'react';
import { PageHead } from './shared';
import { contact } from '../data/projects';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [company, setCompany] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry — ${name || 'from the website'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nWhat I'm making:\n${about}\n`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldLabel = 'eyebrow block mb-1';

  return (
    <div>
      <PageHead
        title="Say hi"
        intro="Tell me a bit about what you’re making. I’ll get back to you with a few questions and a rough idea of cost — usually within a day."
      />

      <div className="gutter grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start" style={{ marginTop: 'clamp(30px, 6vh, 60px)' }}>
        <form onSubmit={onSubmit} data-reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
            <div>
              <label className={fieldLabel} htmlFor="cf-name">Your name *</label>
              <input id="cf-name" className="input-line" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" autoComplete="name" />
            </div>
            <div>
              <label className={fieldLabel} htmlFor="cf-email">Email address *</label>
              <input id="cf-email" className="input-line" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" autoComplete="email" />
            </div>
            <div className="sm:col-span-2">
              <label className={fieldLabel} htmlFor="cf-company">Company / project (optional)</label>
              <input id="cf-company" className="input-line" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company or project name" autoComplete="organization" />
            </div>
            <div className="sm:col-span-2">
              <label className={fieldLabel} htmlFor="cf-about">What are you making? *</label>
              <textarea id="cf-about" className="input-line" rows={4} required value={about} onChange={(e) => setAbout(e.target.value)} placeholder="A website for… I need it by… The budget is roughly…" style={{ resize: 'vertical' }} />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 rounded-full bg-accent px-8 py-4 font-mono text-[12px] uppercase tracking-[0.06em] font-medium text-[#111010] border-0 cursor-pointer transition-transform hover:scale-[1.03]"
            data-hover
            data-cursor="Send"
          >
            Send enquiry →
          </button>
          {sent && (
            <p className="text-muted mt-5 mb-0" style={{ maxWidth: '46ch', lineHeight: 1.6 }}>
              Your email app should have opened with everything filled in — just press send there. If nothing opened, write to me directly at{' '}
              <a href={`mailto:${contact.email}`} className="text-accent no-underline" data-hover>{contact.email}</a>.
            </p>
          )}
        </form>

        <aside data-reveal>
          <div className="eyebrow eyebrow--accent mb-4">Direct</div>
          <ul className="list-none m-0 p-0 flex flex-col gap-4">
            <li>
              <div className="eyebrow mb-1">Email</div>
              <a href={`mailto:${contact.email}`} className="text-ink no-underline hover:text-accent transition-colors break-all" data-hover>{contact.email}</a>
            </li>
            <li>
              <div className="eyebrow mb-1">Phone / WhatsApp</div>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-ink no-underline hover:text-accent transition-colors" data-hover>{contact.phone}</a>
            </li>
            <li>
              <div className="eyebrow mb-1">LinkedIn</div>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink no-underline hover:text-accent transition-colors" data-hover>Muhammad Shoaib Asghar ↗</a>
            </li>
            <li>
              <div className="eyebrow mb-1">Based in</div>
              <span>Working worldwide</span>
            </li>
          </ul>
          <div className="mt-10 p-6 bg-surface" style={{ borderRadius: 'var(--radius-image)' }}>
            <div className="eyebrow eyebrow--accent mb-3">Prefer email?</div>
            <p className="m-0 text-muted leading-relaxed text-[15px]">
              The form just drafts an email for you — nothing is stored on this site. Straight email works exactly the same.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
