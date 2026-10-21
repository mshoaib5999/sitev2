# Muhammad Shoaib Asghar — Portfolio (v2)

A dark, editorial one-page portfolio for **Muhammad Shoaib Asghar** (Senior WordPress
Developer, Okara, Pakistan), rebuilt in the design language of a creative-developer
reference site: charcoal `#111010` background, warm cream `#edeae4` type, periwinkle
`#7fa8ff` accent, Archivo variable typography with Geist Mono eyebrow labels.

Built with **React 18 + Vite + TypeScript + Tailwind CSS**. No heavy animation
libraries — motion is CSS transitions, a small IntersectionObserver reveal hook,
and requestAnimationFrame where it counts.

## Sections (top to bottom)

1. **Intro loader** — 000 → 100 counter with the Shoaib©Asghar lockup, slides away
2. **Hero** — giant two-line uppercase name (second line right-aligned), intro
   paragraph, "Scroll, gently", pill CTA
3. **Marquee** — Design ◆ Build ◆ Motion ◆ WordPress ◆ WooCommerce ◆ Elementor ◆ Speed
4. **Selected work (04)** — Bastide de Basson, PhaseLink, Sole Survivors, GoldStar
   Learning. Hover/auto-cycle list with a sticky image stage and pause control
5. **Up close** — drag/scroll gallery of detail shots from the four projects
6. **(Hello)** — statement with inline portrait, plus 400+ / 3.5+ / 12+ stats
7. **What I do** — four service tiles (Websites, WooCommerce, Elementor & ACF,
   Speed & SEO) with an accent fill on hover
8. **More work (08) + Career** — earlier projects from the CV and the experience timeline
9. **Footer** — huge "LET'S TALK" mailto, email / LinkedIn / phone row

Plus a full-screen numbered menu and a small custom cursor on desktop pointers.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Project images live in `public/projects/` and the portrait in
`public/shoaib_profile.jpg`. To change projects, edit `src/data/projects.ts` —
everything on the page is driven from that one file.

## Contact

Muhammad Shoaib Asghar — shoaibasghar5999@gmail.com — +92-310-6077900 —
[LinkedIn](https://www.linkedin.com/in/muhammad-shoaib-asghar-444b7120a)
