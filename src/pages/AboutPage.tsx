import React from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from './shared';
import { experience, skills } from '../data/projects';

const approach = [
  { title: 'Design & code, one pair of hands', text: 'What you approve in Figma is what ends up in the browser — because the same person designs it and builds it. Nothing gets lost in translation.' },
  { title: 'Motion with a job to do', text: 'Movement should help people find their way, not get in it. Every animation earns its place: it explains, guides or delights — briefly.' },
  { title: 'Fast is a feature', text: 'I test on real devices and real connections. Core Web Vitals in the green is not a bonus round, it is the baseline every build ships with.' },
];

export const AboutPage: React.FC = () => (
  <div>
    <PageHead title="About" />
    <div className="gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start" style={{ marginTop: 'clamp(40px, 7vh, 80px)' }}>
      <figure className="m-0" data-reveal>
        <div className="overflow-hidden" style={{ borderRadius: 'var(--radius-image)' }}>
          <img src="/shoaib_profile.jpg" alt="Muhammad Shoaib Asghar, WordPress developer in Okara, Pakistan" className="w-full block object-cover" style={{ aspectRatio: '4 / 5' }} />
        </div>
        <figcaption className="eyebrow mt-3">Muhammad Shoaib Asghar — Okara, Punjab, Pakistan</figcaption>
      </figure>
      <div>
        <p className="m-0 font-medium" style={{ fontSize: 'clamp(23px, 2.6vw, 37px)', lineHeight: 1.28 }} data-reveal>
          Assalam o Alaikum, I’m Shoaib. I’m a senior WordPress developer based in Okara, Pakistan.
        </p>
        <p className="text-muted mt-7 mb-0" style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch' }} data-reveal>
          I design and build WordPress websites and WooCommerce stores — custom themes in PHP, Elementor Pro and ACF Pro builds, Figma designs turned into pixel-perfect pages. In 3.5+ years I’ve delivered 400+ websites for clients in France, the USA, Canada, Dubai, New Zealand and beyond.
        </p>
        <p className="text-muted mt-5 mb-0" style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch' }} data-reveal>
          Most of my work is with startups, small businesses and fellow agencies. Sometimes I take a project from the first call through to launch; sometimes I’m the developer who brings someone else’s designs to life — or the one called in when a site needs to be fast again.
        </p>
        <p className="text-muted mt-5 mb-0" style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch' }} data-reveal>
          I’m happiest where design and code overlap: working out how something should look, move and feel — then building it properly, with clean code the next person (often you) can actually edit.
        </p>
        <ul className="flex flex-wrap gap-2 list-none m-0 mt-8 p-0" data-reveal>
          {skills.map((s) => (
            <li key={s} className="chip-link" style={{ cursor: 'default' }}>{s}</li>
          ))}
        </ul>
      </div>
    </div>

    <div className="gutter grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 mt-24" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
      {[
        { big: '400+', small: 'Websites delivered' },
        { big: '3.5+', small: 'Years of experience' },
        { big: '12+', small: 'Industries — real estate to AI' },
      ].map((s) => (
        <div key={s.small}>
          <div className="fvs-display leading-none" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>{s.big}</div>
          <div className="eyebrow mt-3">{s.small}</div>
        </div>
      ))}
    </div>

    <div className="gutter mt-28">
      <h2 className="eyebrow m-0 mb-8" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( How I work )</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {approach.map((a, i) => (
          <div key={a.title} className="pt-6" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
            <div className="eyebrow mb-4" style={{ color: 'var(--color-accent)' }}>{String(i + 1).padStart(2, '0')}</div>
            <h3 className="fvs-row m-0" style={{ fontSize: 'clamp(21px, 1.9vw, 27px)', lineHeight: 1.08 }}>{a.title}</h3>
            <p className="text-muted mt-3 mb-0 leading-relaxed text-[15px]">{a.text}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="gutter mt-28">
      <h2 className="eyebrow m-0 mb-4" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Career )</h2>
      <div>
        {experience.map((e) => (
          <div key={e.company} className="index-row" data-reveal>
            <span className="index-row__name fvs-row" style={{ fontSize: 'clamp(22px, 2.6vw, 38px)' }}>{e.role}</span>
            <span className="eyebrow">{e.company} — {e.place}</span>
            <span className="eyebrow">{e.period}</span>
            <span />
          </div>
        ))}
      </div>
      <p className="text-muted mt-8 mb-0" style={{ maxWidth: '52ch', lineHeight: 1.6 }} data-reveal>
        BS Computer Science, University of Central Punjab (2018–2022). These days: Senior WordPress Developer at Upastra Digital Agency — and taking on selected freelance projects.{' '}
        <Link to="/contact" className="text-accent no-underline" data-hover>Yours could be next →</Link>
      </p>
    </div>
  </div>
);
