export interface Service {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  short: string;
  intro: string;
  includes: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'websites',
    num: '01',
    title: 'Websites',
    tagline: 'Websites designed properly, then built properly.',
    short: 'Custom WordPress sites and portfolios, built from scratch in PHP — no bloat, pixel-perfect from Figma, with motion baked in.',
    intro:
      'A custom website designed around your business and built from scratch in WordPress — bespoke PHP theme, no page-builder bloat unless it earns its place, and nothing between the design you signed off and the site your visitors get. Figma to WordPress is the usual route: you approve the design, I build it exactly, then we tune how it moves.',
    includes: [
      'Custom WordPress theme development (PHP, HTML5, CSS3, JavaScript)',
      'Figma / PSD to WordPress, pixel-perfect and fully responsive',
      'ACF Pro fields and custom post types, so editing stays simple',
      'Motion and interaction design baked into the build',
      'On-page SEO foundations: structure, schema, meta, sitemaps',
      'Speed pass included — Core Web Vitals in the green at launch',
    ],
    faqs: [
      { q: 'How long does a website take?', a: 'A typical business website takes two to four weeks from signed-off design to launch. Larger builds with custom functionality are scoped honestly up front — you get a timeline before we start, not apologies after.' },
      { q: 'Can I update the site myself?', a: 'Yes — that is the point of building with ACF Pro and a clean admin. Pages, projects and content are editable without touching code, and I hand over with a walkthrough of how everything works.' },
      { q: 'Why not just use a template?', a: 'Templates carry other people’s compromises: bloated code, slow loads and a design your competitors also have. A bespoke build is faster, easier to rank and unmistakably yours.' },
      { q: 'Will my website show up on Google?', a: 'It launches with the technical foundations Google needs — clean structure, schema, meta and sitemap, plus fast Core Web Vitals. Rankings then grow with content; the site will never be the thing holding you back.' },
    ],
  },
  {
    slug: 'woocommerce',
    num: '02',
    title: 'WooCommerce',
    tagline: 'Stores built around your products, not the other way round.',
    short: 'Stores built around your products — custom product pages, Stripe & PayPal checkout, subscriptions and flows that convert.',
    intro:
      'A WooCommerce store designed around your brand and your products, then built to make buying easy: custom product pages that sell, a checkout with the friction taken out, and payments — Stripe, PayPal, cards — configured properly and tested with real orders before launch.',
    includes: [
      'Custom product and category page design',
      'Stripe, PayPal and card payment gateway setup',
      'Subscriptions, memberships and donation flows',
      'Custom checkout fields and streamlined cart flows',
      'Shipping, tax and policy pages configured',
      'Product documents and downloads (COAs, brochures, guides)',
    ],
    faqs: [
      { q: 'Can you migrate my existing store?', a: 'Yes — products, customers and order history can be moved to a new WooCommerce build, with redirects in place so you do not lose search traffic in the move.' },
      { q: 'Do you set up payments?', a: 'Fully. Stripe, PayPal and card gateways are configured, secured and tested with live test orders before the store opens.' },
      { q: 'Can the store handle subscriptions?', a: 'Yes — subscription products, memberships and recurring billing are a regular part of my WooCommerce work.' },
    ],
  },
  {
    slug: 'elementor-acf',
    num: '03',
    title: 'Elementor & ACF',
    tagline: 'Builds your team can actually edit.',
    short: 'Elementor Pro and ACF Pro builds your team can actually edit — clean fields, custom post types, no locked-in mess.',
    intro:
      'Plenty of sites are “editable” in theory and terrifying in practice. My Elementor Pro and ACF Pro builds are structured the way your content actually works — clean field groups, sensible custom post types and templates that stay consistent no matter who edits them.',
    includes: [
      'Elementor Pro theme builds and template kits, done cleanly',
      'ACF Pro field architecture matched to your content',
      'Custom post types for projects, properties, products and more',
      'Reusable sections and templates that cannot be broken by an edit',
      'Cleanup of inherited Elementor sites that have become a mess',
      'Handover walkthrough for your team',
    ],
    faqs: [
      { q: 'My Elementor site is slow. Can you fix it?', a: 'Usually, yes. Most slow Elementor sites suffer from too many plugins, unoptimised images and builder bloat in the wrong places. I audit first, then fix what actually moves the numbers.' },
      { q: 'Can you rebuild our pages in Elementor from Figma?', a: 'Yes — Figma to Elementor is a standard route, with the design matched closely and the build kept editable afterwards.' },
    ],
  },
  {
    slug: 'speed-seo',
    num: '04',
    title: 'Speed & SEO',
    tagline: 'Fast sites rank. Slow sites get closed.',
    short: 'Core Web Vitals in the green — caching, clean databases, WebP images, schema and on-page SEO with Yoast & RankMath.',
    intro:
      'Speed is not a plugin, it is a discipline: lean code, a clean database, right-sized images and caching that is configured, not just installed. I optimise WordPress sites until the Core Web Vitals are green — then set up the on-page SEO structure so the speed actually turns into rankings.',
    includes: [
      'Core Web Vitals audit and fixes (LCP, CLS, INP)',
      'Caching, minification and asset delivery setup',
      'Image optimisation and WebP conversion',
      'Database cleanup and plugin audit',
      'On-page SEO: schema, meta, internal structure (Yoast / RankMath)',
      'Before/after reporting you can actually read',
    ],
    faqs: [
      { q: 'What scores should I expect?', a: 'The honest answer: it depends on your hosting and how the site was built — but green Core Web Vitals and 90+ PageSpeed scores are the target on every optimisation job, and I show you the before and after.' },
      { q: 'Will optimisation break my site?', a: 'No — everything is staged and checked page by page. If a change risks the layout, we find another route to the same speed.' },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function nextService(slug: string) {
  const i = services.findIndex((s) => s.slug === slug);
  return services[(i + 1) % services.length];
}

export const processSteps = [
  { title: 'A call', text: 'A call to talk through what you need, who it is for and when you need it.' },
  { title: 'Scope & quote', text: 'A clear scope, timeline and fixed quote, so nothing is a surprise later.' },
  { title: 'Design', text: 'Layouts and motion in Figma, shared early and often — you always know where it is heading.' },
  { title: 'Build & launch', text: 'Built, tested on real devices, launched, and handed over with everything explained.' },
];
