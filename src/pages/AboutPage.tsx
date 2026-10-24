import React from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from './shared';
import { experience } from '../data/projects';
import { RevealWords } from '../sections/RevealWords';
import { Skills } from '../sections/Skills';
import { HowIWork } from '../sections/HowIWork';

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
        <RevealWords
          className="m-0 font-medium"
          style={{ fontSize: 'clamp(23px, 2.6vw, 37px)', lineHeight: 1.28 }}
          text="I’m Shoaib — a senior WordPress developer based in Okara, Pakistan. I help businesses and agencies win more clients with websites that load fast, rank well and convert."
        />
        <RevealWords
          className="mt-7 mb-0"
          style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch', color: 'var(--color-muted)' }}
          litColor="var(--color-text)"
          text="WordPress is my home ground: custom themes in PHP, WooCommerce stores, Elementor Pro and ACF Pro builds, and Figma designs turned into pixel-perfect pages. In 4+ years I’ve delivered 400+ websites for clients in France, the USA, Canada, Dubai, New Zealand and beyond."
        />
        <RevealWords
          className="mt-5 mb-0"
          style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch', color: 'var(--color-muted)' }}
          litColor="var(--color-text)"
          text="My expertise goes beyond WordPress, too. I build stores on Shopify, design-led sites on Webflow, and funnels, pipelines and automations on GoHighLevel — backed by solid HTML, CSS, JavaScript and Next.js when a project needs custom front-end work. One developer for everything your project needs."
        />
        <RevealWords
          className="mt-5 mb-0"
          style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch', color: 'var(--color-muted)' }}
          litColor="var(--color-text)"
          text="Most of my work is with startups, small businesses and fellow agencies. Sometimes I take a project from the first call through to launch; sometimes I’m the developer who brings someone else’s designs to life — or the one called in when a site needs to be fast again."
        />
        <RevealWords
          className="mt-5 mb-0"
          style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '56ch', color: 'var(--color-muted)' }}
          litColor="var(--color-text)"
          text="I’m happiest where design and code overlap: working out how something should look, move and feel — then building it properly, with clean code the next person (often you) can actually edit."
        />
      </div>
    </div>

    <div className="gutter grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 mt-24" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
      {[
        { big: '400+', small: 'Websites delivered' },
        { big: '4+', small: 'Years of experience' },
        { big: '12+', small: 'Industries — real estate to AI' },
      ].map((s) => (
        <div key={s.small}>
          <div className="fvs-display leading-none" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>{s.big}</div>
          <div className="eyebrow mt-3">{s.small}</div>
        </div>
      ))}
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

    <Skills />

    <HowIWork />

  </div>
);
