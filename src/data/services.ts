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
    slug: 'website-development',
    num: '01',
    title: 'Website Development',
    tagline: 'Designed properly, then built properly.',
    short: 'Complete business websites, portfolios and landing pages — designed around your goals and built clean, fast and responsive.',
    intro:
      'A complete website designed around your business and built to win work: clear structure, confident design and clean code underneath. From the first layout to launch day, one pair of hands handles design, build and speed — so nothing gets lost between the idea and the finished site.',
    includes: [
      'Business websites, portfolios and landing pages',
      'Design in Figma, built pixel-perfect to the approved layout',
      'Clean, hand-written code — HTML5, CSS3, JavaScript',
      'Fully responsive on phones, tablets and desktops',
      'Motion and interaction design baked into the build',
      'On-page SEO foundations and a speed pass at launch',
    ],
    faqs: [
      { q: 'How long does a website take?', a: 'A typical business website takes two to four weeks from signed-off design to launch. Larger builds are scoped honestly up front — you get a timeline before we start, not apologies after.' },
      { q: 'Can I update the site myself?', a: 'Yes. Sites are handed over with a clean, simple editing setup and a walkthrough of how everything works — no code needed for day-to-day updates.' },
    ],
  },
  {
    slug: 'wordpress-development',
    num: '02',
    title: 'WordPress Development',
    tagline: 'WordPress, built the proper way.',
    short: 'Custom WordPress themes in PHP, Elementor Pro and ACF Pro builds your team can actually edit — no bloated, locked-in mess.',
    intro:
      'WordPress is my home ground: bespoke themes written in PHP, ACF Pro field architecture matched to your content, and Elementor Pro builds structured so cleanly that your team can edit everything without breaking the design. In 4+ years and 400+ websites, this is the work I am known for.',
    includes: [
      'Custom WordPress theme development (PHP, HTML5, CSS3, JavaScript)',
      'Figma / PSD to WordPress, pixel-perfect and fully responsive',
      'Elementor Pro theme builds and template kits, done cleanly',
      'ACF Pro fields and custom post types, so editing stays simple',
      'Cleanup of inherited WordPress sites that have become a mess',
      'Handover walkthrough for you or your team',
    ],
    faqs: [
      { q: 'Why not just use a template?', a: 'Templates carry other people’s compromises: bloated code, slow loads and a design your competitors also have. A bespoke build is faster, easier to rank and unmistakably yours.' },
      { q: 'My Elementor site is slow. Can you fix it?', a: 'Usually, yes. Most slow Elementor sites suffer from too many plugins, unoptimised images and builder bloat in the wrong places. I audit first, then fix what actually moves the numbers.' },
    ],
  },
  {
    slug: 'ecommerce-development',
    num: '03',
    title: 'E-commerce Development',
    tagline: 'Stores built around your products, not the other way round.',
    short: 'Online stores that make buying easy — WooCommerce and Shopify builds with custom product pages and checkout flows that convert.',
    intro:
      'An online store designed around your brand and your products, then built to make buying easy: product pages that sell, a checkout with the friction taken out, and payments configured properly and tested with real orders before launch. WooCommerce or Shopify — whichever fits how you sell.',
    includes: [
      'WooCommerce and Shopify store builds',
      'Custom product and category page design',
      'Stripe, PayPal and card payment gateway setup',
      'Subscriptions, memberships and donation flows',
      'Custom checkout fields and streamlined cart flows',
      'Shipping, tax and policy pages configured',
    ],
    faqs: [
      { q: 'WooCommerce or Shopify — which should I choose?', a: 'WooCommerce if you want full ownership and flexibility on WordPress; Shopify if you want a hosted setup with less maintenance. I build on both and will tell you honestly which fits your products and plans.' },
      { q: 'Do you set up payments?', a: 'Fully. Stripe, PayPal and card gateways are configured, secured and tested with live test orders before the store opens.' },
      { q: 'Can you migrate my existing store?', a: 'Yes — products, customers and order history can be moved to a new build, with redirects in place so you do not lose search traffic in the move.' },
    ],
  },
  {
    slug: 'website-redesign',
    num: '04',
    title: 'Website Redesign',
    tagline: 'Your business grew. Your website should show it.',
    short: 'A full redesign of your existing site — modern design, better structure and faster loads, without losing your search rankings.',
    intro:
      'Most redesigns fail in one of two ways: they only change the colours, or they tank the Google rankings the old site had earned. Mine do neither. Your site gets a modern design, a structure built around how customers actually decide, and the technical care — redirects, SEO, speed — to come out of the relaunch stronger than it went in.',
    includes: [
      'Design audit of your current site: what works, what leaks clients',
      'New design in Figma, approved by you before anything is built',
      'Rebuilt on WordPress, Shopify or your current platform',
      'Redirects and SEO preservation, so rankings survive the move',
      'Content structure tightened around enquiries and sales',
      'Speed pass included — the new site launches faster than the old one',
    ],
    faqs: [
      { q: 'Will a redesign hurt my Google rankings?', a: 'Not if it is done properly. I map every important URL, set up redirects and carry over your SEO structure — most clients keep or improve their positions after relaunch.' },
      { q: 'Can you redesign just part of the site?', a: 'Yes — a homepage, landing pages or the checkout flow can be redesigned on their own and rolled into the existing site.' },
    ],
  },
  {
    slug: 'performance-optimization',
    num: '05',
    title: 'Performance & Optimization',
    tagline: 'Fast sites rank. Slow sites get closed.',
    short: 'Core Web Vitals in the green — caching, clean databases, right-sized images, and on-page SEO that turns speed into rankings.',
    intro:
      'Speed is not a plugin, it is a discipline: lean code, a clean database, right-sized images and caching that is configured, not just installed. I optimise websites until the Core Web Vitals are green — then set up the on-page SEO structure so the speed actually turns into rankings and enquiries.',
    includes: [
      'Core Web Vitals audit and fixes (LCP, CLS, INP)',
      'Caching, minification and asset delivery setup',
      'Image optimisation and WebP conversion',
      'Database cleanup and plugin audit',
      'On-page SEO: schema, meta, internal structure (Yoast / RankMath)',
      'Before/after reporting you can actually read',
    ],
    faqs: [
      { q: 'What scores should I expect?', a: 'It depends on your hosting and how the site was built — but green Core Web Vitals and 90+ PageSpeed scores are the target on every optimisation job, and I show you the before and after.' },
      { q: 'Will optimisation break my site?', a: 'No — everything is staged and checked page by page. If a change risks the layout, we find another route to the same speed.' },
    ],
  },
  {
    slug: 'website-migration',
    num: '06',
    title: 'Website Migration',
    tagline: 'Move platforms without losing traffic, content or sleep.',
    short: 'Safe migrations between hosts and platforms — WordPress, Shopify, Wix, Webflow — with redirects in place and zero-drama handovers.',
    intro:
      'Moving a website is where rankings and revenue quietly die — unless it is planned properly. I migrate sites between hosts and platforms with every page, image and redirect accounted for, tested on a staging copy first, and switched over with minimal downtime. You keep your traffic; you just get a better home for it.',
    includes: [
      'Host-to-host and platform-to-platform migrations',
      'WordPress, Shopify, Wix and Webflow moves',
      'Full content, image and database transfer',
      'URL mapping and redirects to protect your SEO',
      'Staging build first — nothing goes live untested',
      'DNS, SSL and email checks after the switch',
    ],
    faqs: [
      { q: 'Will I lose my Google rankings?', a: 'That is exactly what the redirect map prevents. Every indexed URL is accounted for before the switch, and rankings are monitored after it.' },
      { q: 'How much downtime is there?', a: 'Usually none that visitors notice. The new site is built and tested on staging first; the switch itself is a short, planned window.' },
    ],
  },
  {
    slug: 'shopify-development',
    num: '07',
    title: 'Shopify Development',
    tagline: 'A Shopify store that looks like your brand, not a template.',
    short: 'Custom Shopify themes and store setups — branded product pages, smooth checkout and apps configured without the bloat.',
    intro:
      'Shopify is a brilliant platform with a recognisable look — most stores are clearly a template with a logo dropped in. Mine are not. I build custom Shopify themes around your brand, set up products, collections and payments properly, and configure only the apps your store genuinely needs.',
    includes: [
      'Custom Shopify theme development and setup',
      'Product, collection and cart page design',
      'Payment, shipping and tax configuration',
      'App selection and setup — no bloat, no conflicts',
      'Store migration from WooCommerce, Wix or Squarespace',
      'Speed and conversion polish before launch',
    ],
    faqs: [
      { q: 'Can you customise my existing Shopify theme?', a: 'Yes — from small tweaks to a full custom theme. I work with what you have where it makes sense, and rebuild where it does not.' },
      { q: 'Do you migrate stores to Shopify?', a: 'Yes — products, customers and content move across, with redirects set up so your search traffic comes with you.' },
    ],
  },
  {
    slug: 'wix-development',
    num: '08',
    title: 'Wix Development',
    tagline: 'Wix, designed like it was custom-built.',
    short: 'Wix and Wix Studio websites designed properly — clean layouts, mobile-first, and set up so you can run them yourself.',
    intro:
      'Wix is often the right call for a small business that needs to move fast — it just needs a designer’s eye and a developer’s discipline. I build Wix and Wix Studio sites with clean structure, proper mobile layouts and SEO basics in place, then hand over a site you can genuinely run yourself.',
    includes: [
      'Wix and Wix Studio website design and build',
      'Custom layouts beyond the standard templates',
      'Mobile optimisation on every page',
      'Bookings, forms and store setup',
      'SEO foundations: meta, structure, Google connection',
      'Handover walkthrough — edit everything yourself',
    ],
    faqs: [
      { q: 'Wix or WordPress — which is right for me?', a: 'Wix if you want simple, hosted and hands-off; WordPress if you need custom functionality or plan to grow. I build on both and will recommend honestly.' },
      { q: 'Can you fix my existing Wix site?', a: 'Yes — layout cleanups, mobile fixes and redesigns of existing Wix sites are regular work.' },
    ],
  },
  {
    slug: 'ghl',
    num: '09',
    title: 'GHL',
    tagline: 'GoHighLevel funnels, pipelines and automations that follow up for you.',
    short: 'GoHighLevel setup done properly — funnels, CRM pipelines, automations and websites that turn leads into booked calls.',
    intro:
      'GoHighLevel is powerful, but most accounts are a half-finished tangle of funnels and workflows. I set GHL up the way it is meant to run: funnels that convert, pipelines that match how you actually sell, and automations that follow up with every lead — so enquiries stop slipping through while you are busy doing the work.',
    includes: [
      'GoHighLevel account and sub-account setup',
      'Funnels and landing pages that convert',
      'CRM pipelines matched to your sales process',
      'Automations: follow-ups, reminders, review requests',
      'Websites and forms inside GHL',
      'Calendar, email and SMS campaign setup',
    ],
    faqs: [
      { q: 'Can you fix my existing GHL account?', a: 'Yes — cleaning up tangled funnels, broken automations and messy pipelines is often where I start. We audit first, then rebuild what matters.' },
      { q: 'Do you build the website in GHL too?', a: 'Yes — GHL websites and funnels, or a WordPress/Shopify site connected to your GHL pipelines and forms, whichever fits your setup.' },
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
