import React from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from './shared';
import { experience } from '../data/projects';
import { RevealWords } from '../sections/RevealWords';
import { Skills } from '../sections/Skills';
import { HowIWork } from '../sections/HowIWork';
import { BorderBeam } from '../components/ui/border-beam';

export const AboutPage: React.FC = () => (
  <div>
    <PageHead title="About" />
    <div className="gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start" style={{ marginTop: 'clamp(40px, 7vh, 80px)' }}>
      <figure className="m-0" data-reveal>
        <div className="portrait-card relative">
          <div className="portrait-card__frame">
            <img src="/shoaib-portrait.jpg" alt="Muhammad Shoaib Asghar, WordPress developer" className="w-full block object-cover" style={{ aspectRatio: '3 / 4' }} />
            <div className="portrait-card__shade" />
          </div>
          <div className="absolute inset-0 pointer-events-none"><BorderBeam color="var(--color-accent)" thickness={1.5} speed={7} length={14} className="h-full w-full rounded-[24px]" /></div>
        </div>
        <figcaption className="eyebrow mt-3">Muhammad Shoaib Asghar</figcaption>
      </figure>
      <div>
        <RevealWords
          className="m-0 font-medium"
          style={{ fontSize: 'clamp(23px, 2.6vw, 37px)', lineHeight: 1.28 }}
          text="I’m Shoaib — a senior WordPress developer. I help businesses and agencies win more clients with websites that load fast, rank well and convert."
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

    <div className="gutter mt-24" data-reveal>
      <div className="magic-panel relative">
        <div className="magic-panel__inner grid-cols-1 sm:grid-cols-3">
          {[
            { big: '400+', small: 'Websites delivered' },
            { big: '4+', small: 'Years of experience' },
            { big: '12+', small: 'Industries — real estate to AI' },
          ].map((s) => (
            <div key={s.small} className="magic-cell">
              <div className="fvs-display leading-none" style={{ fontSize: 'clamp(40px, 4.6vw, 68px)' }}>{s.big}</div>
              <div className="eyebrow mt-3">{s.small}</div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none"><BorderBeam color="var(--color-accent)" thickness={1.5} speed={7} length={14} className="h-full w-full rounded-[24px]" /></div>
      </div>
    </div>

    <div className="gutter mt-28">
      <h2 className="eyebrow m-0 mb-4" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Career )</h2>
      <div>
        {experience.map((e) => (
          <div key={e.company} className="index-row" data-reveal>
            <span className="index-row__name fvs-row" style={{ fontSize: 'clamp(22px, 2.6vw, 38px)' }}>{e.role}</span>
            <span className="eyebrow">{e.company}{e.place ? ` — ${e.place}` : ''}</span>
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
