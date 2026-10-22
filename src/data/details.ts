export interface FullProject {
  slug: string;
  name: string;
  yearLabel: string;
  service: string;
  place: string;
  description: string;
  overview: string;
  features: { title: string; text: string }[];
  url: string;
  image: string;
  detailImage?: string;
  detailCaption?: string;
}

const main: FullProject[] = [
  {
    slug: 'bastide-de-basson',
    name: 'Bastide de Basson',
    yearLabel: '2026',
    service: 'Hospitality website — design & build',
    place: 'Provence, France',
    description:
      'A luxury villa in Correns, in the vineyards of Provence — private stays, a pool, gardens and private events, presented in a slow, editorial layout that lets the place sell itself.',
    overview:
      'Bastide de Basson is a private Provençal estate: a luxury villa for stays and private events, surrounded by vines and gardens. The website had to feel like the place itself — calm, spacious and unhurried — while quietly doing the commercial work of presenting the rooms, the grounds and the events offer, and moving visitors toward an enquiry.',
    features: [
      { title: 'A destination, not a listing', text: 'The homepage opens like a private estate brochure — full-bleed photography of the villa, pool and vineyards, with short, confident French copy and room to breathe.' },
      { title: 'Stays & private events', text: 'Two clear journeys run through the site: holidays at the bastide, and private events in the gardens — each with its own pages, galleries and enquiry route.' },
      { title: 'Editorial, French-first layout', text: 'Designed and built in WordPress with an editorial grid, generous white space and image-led sections the owners can update themselves.' },
    ],
    url: 'https://bastidedebasson.fr/',
    image: '/projects/bastide-main.jpg',
    detailImage: '/projects/bastide-detail.jpg',
    detailCaption: 'The villa & gardens',
  },
  {
    slug: 'phaselink',
    name: 'PhaseLink',
    yearLabel: '2026',
    service: 'Corporate website — design & build',
    place: 'California, USA',
    description:
      'Principal-led power-system engineering for California projects — studies, protection, interconnection and system assessment, explained clearly for utilities, developers and data centres.',
    overview:
      'PhaseLink is a power-system engineering consultancy in California, led by its principal engineer. The site needed to make a deep, technical practice legible to the people who hire it — utilities and public agencies, developers and contractors, MEP and A&E firms, renewable and storage projects, data centres and industrial clients — without dumbing any of it down.',
    features: [
      { title: 'Grounded in real-world conditions', text: 'The positioning leads with field reality: power-system studies, protection and interconnection work presented the way engineers actually scope it.' },
      { title: 'Focused expertise, clearly organised', text: 'Services are structured around distribution and customer power systems, with dedicated sections for each specialism and the standards and tools behind them.' },
      { title: 'Built for six audiences', text: 'Separate pathways speak to utilities, developers, engineering firms, renewables, data centres and industrial clients — each landing on the expertise that matters to them.' },
    ],
    url: 'https://phaselinkeng.com/',
    image: '/projects/phaselink-main.jpg',
    detailImage: '/projects/phaselink-detail.jpg',
    detailCaption: 'Transmission lines, up close',
  },
  {
    slug: 'sole-survivors',
    name: 'Sole Survivors',
    yearLabel: '2026',
    service: 'Community website — design & build',
    place: 'Health Hero League',
    description:
      'Health is the superpower. A kids’ wellness world built on heroic storytelling — six missions, characters and community that make a stronger, healthier you feel like an adventure.',
    overview:
      'The Sole Survivors are the Health Hero League: a kids’ wellness programme that turns healthy habits into heroic missions. The website had to carry a whole story-world — original hero characters, six missions and a rewards platform — and make it instantly make sense to parents, kids and partners alike.',
    features: [
      { title: 'Health is the superpower', text: 'The whole experience is framed as a hero’s journey: wellness habits become missions, and kids become the heroes of their own health story.' },
      { title: 'Six missions. A stronger you', text: 'The mission structure runs through the site — six themed challenges with their own characters and artwork, building toward a stronger, healthier you.' },
      { title: 'Characters & rewards', text: 'Original character art leads every section, backed by a cosmic trophy rewards platform that keeps kids coming back to complete the next mission.' },
    ],
    url: 'https://thesolesurvivors.com/',
    image: '/projects/solesurvivors-main.jpg',
    detailImage: '/projects/solesurvivors-detail.jpg',
    detailCaption: 'Hero character art',
  },
  {
    slug: 'goldstar-learning',
    name: 'GoldStar Learning',
    yearLabel: '2026',
    service: 'Education website — design & build',
    place: 'Learning is human',
    description:
      'Personal learning, for students by students — one-to-one tutoring, test prep and writing support, with a warm storefront for the books and resources behind it.',
    overview:
      'GoldStar’s belief is right in its name: learning is human. The tutoring is personal — for students, by students — so the website pairs a friendly, human front door for tutoring, test prep and writing support with a proper shop for the books and study resources the team publishes.',
    features: [
      { title: 'Personal learning, front and centre', text: 'Tutoring is presented the way it is delivered: one-to-one and human, with clear routes for students and parents to find the right support.' },
      { title: 'Test prep & writing support', text: 'Dedicated sections cover test preparation and writing rules, each with its own imagery and a simple path to getting started.' },
      { title: 'A shop for the resources', text: 'The published books and materials sit in a clean WooCommerce storefront alongside the tutoring offer, so the learning continues at home.' },
    ],
    url: 'https://goldstar-learning.com/',
    image: '/projects/goldstar-main.jpg',
    detailImage: '/projects/goldstar-detail.jpg',
    detailCaption: 'Test prep, up close',
  },
];

const more: FullProject[] = [
  {
    slug: 'rossai', name: 'RossAi', yearLabel: 'Earlier work', service: 'AI & sensor technology website', place: 'New Zealand',
    description: 'A modern, brand-focused WordPress website for an AI & sensor technology company, showcasing flagship products and the company story with optimised page speed.',
    overview: 'RossAi builds AI and sensor technology in New Zealand. Their website presents flagship products and the company story in a clean, modern layout — with the page speed and on-page SEO structure a deep-tech brand needs to be taken seriously.',
    features: [
      { title: 'Brand-focused design', text: 'A modern layout built around the products and the story behind them.' },
      { title: 'Speed optimised', text: 'Built and tuned for fast loads, with clean on-page SEO structure throughout.' },
      { title: 'Custom WordPress theme', text: 'Bespoke theme development, no off-the-shelf template underneath.' },
    ],
    url: 'https://rossai.co.nz', image: '/projects/more/rossai.jpg',
  },
  {
    slug: 'lumora-nutrition', name: 'Lumora Nutrition', yearLabel: 'Earlier work', service: 'WooCommerce — health & wellness store', place: 'USA / Global',
    description: 'A WooCommerce store for a wellness supplement brand with custom product pages, subscription flows, integrated payments and a conversion-focused design.',
    overview: 'Lumora Nutrition sells wellness supplements online. The store pairs custom product pages and subscription flows with a conversion-focused landing experience — testimonials, guarantees and benefit-led sections that carry a visitor from curiosity to checkout.',
    features: [
      { title: 'Custom product pages', text: 'Benefit-driven product layouts with testimonials and guarantees built in.' },
      { title: 'Subscriptions & payments', text: 'Recurring orders and card payments integrated into a smooth checkout.' },
      { title: 'Conversion-focused', text: 'Every section designed to answer an objection and move the sale forward.' },
    ],
    url: 'https://trylumoradaily.com', image: '/projects/more/lumora.jpg',
  },
  {
    slug: 'aion-dubai', name: 'AION Dubai', yearLabel: 'Earlier work', service: 'Real estate investment website — bilingual', place: 'UAE / Netherlands',
    description: 'A bilingual (Dutch & English) real estate investment platform with dynamic property project listings, downloadable brochures and integrated lead consultation booking.',
    overview: 'AION Dubai connects Dutch-speaking investors with Dubai real estate. The bilingual site structures investment projects as dynamic listings — with downloadable brochures, FAQs and a consultation booking flow that turns interest into qualified leads.',
    features: [
      { title: 'Bilingual by design', text: 'Full Dutch and English content, structured so both languages stay easy to manage.' },
      { title: 'Dynamic project listings', text: 'ACF-powered project pages with brochures and lead-capture forms.' },
      { title: 'Consultation booking', text: 'A clear route from browsing projects to booking a call with the team.' },
    ],
    url: 'https://aiondubai.com', image: '/projects/more/aion.jpg',
  },
  {
    slug: 'flip-my-life', name: 'Flip My Life', yearLabel: 'Earlier work', service: 'Financial & wealth advisory website', place: 'Canada',
    description: 'A professional wealth advisory website with interactive service calculators, case study showcases, client portals and trust-building testimonial layouts.',
    overview: 'Flip My Life is a Canadian wealth advisory practice. In finance, trust is the product — so the site leads with credentials, awards, case studies and team profiles, backed by interactive service calculators and a client portal.',
    features: [
      { title: 'Trust-first layout', text: 'Awards, testimonials and team profiles placed where doubt usually strikes.' },
      { title: 'Interactive calculators', text: 'Service calculators that let visitors explore their options before they enquire.' },
      { title: 'Client portal', text: 'Integrated portal access for existing clients, straight from the main site.' },
    ],
    url: 'https://flipmylife.com', image: '/projects/more/flip-my-life.jpg',
  },
  {
    slug: 'creative-contracting', name: 'Creative Contracting', yearLabel: 'Earlier work', service: 'Engineering & construction website', place: 'USA',
    description: 'A multi-service contracting portal covering Engineering, Architecture, Build and Elite Home Solutions, with location-based service-area navigation.',
    overview: 'Creative Contracting Solutions runs four divisions — Engineering, Architecture, Build and Elite Home Solutions — under one brand. The website organises that complexity into clear service-area navigation, so homeowners across their Florida service areas find the right division fast.',
    features: [
      { title: 'Four divisions, one site', text: 'Each division gets its own presence without breaking the parent brand.' },
      { title: 'Service-area structure', text: 'Location-based pages built for local search and local trust.' },
      { title: 'Elementor Pro build', text: 'A flexible build the team can extend as services and areas grow.' },
    ],
    url: 'https://tampaccs.com', image: '/projects/more/creative-contracting.jpg',
  },
  {
    slug: 'vice-pharmaceuticals', name: 'Vice Pharmaceuticals', yearLabel: 'Earlier work', service: 'WooCommerce — research compounds store', place: 'USA',
    description: 'A high-security WooCommerce store with lab Certificate of Analysis (COA) document downloads, an affiliate programme section and automated shipping workflows.',
    overview: 'Vice Pharmaceuticals sells research compounds online, where documentation is everything. The store attaches a lab Certificate of Analysis to products for download, runs an affiliate programme, and automates the shipping and policy workflows behind a secure checkout.',
    features: [
      { title: 'COA document system', text: 'Lab certificates attached to products and available for download.' },
      { title: 'Secure checkout', text: 'Payments, shipping and policy pages set up for a regulated-feeling store.' },
      { title: 'Affiliate programme', text: 'A dedicated affiliate section with its own sign-up route.' },
    ],
    url: 'https://vice-pharma.com', image: '/projects/more/vice-pharma.jpg',
  },
  {
    slug: 'build-a-shed', name: 'Build A Shed', yearLabel: 'Earlier work', service: 'Construction services website', place: 'UAE',
    description: 'A construction and shed-building services website for the UAE market, with a secure client-access area.',
    overview: 'Build A Shed designs and builds sheds and outdoor structures in the UAE. The site presents the service range for the local market and includes a secure client-access area for project customers.',
    features: [
      { title: 'Built for the UAE market', text: 'Service pages and presentation tailored to local customers.' },
      { title: 'Secure client area', text: 'A protected access area for clients, separate from the public site.' },
      { title: 'WordPress build', text: 'A clean, manageable site the business can update itself.' },
    ],
    url: 'https://buildashed.ae', image: '/projects/more/build-a-shed.jpg',
  },
  {
    slug: 'myteam-support', name: 'MyTeam Support', yearLabel: 'Earlier work', service: 'Community & membership website', place: 'Non-profit',
    description: 'A community and membership website supporting an organisation’s engagement and outreach goals, with a secure online donation system.',
    overview: 'MyTeam Support is a community organisation. Their website supports engagement and outreach — and, most importantly, lets supporters donate securely online, so contributions flow straight through the site they already trust.',
    features: [
      { title: 'Community first', text: 'Content structured around engagement and outreach goals.' },
      { title: 'Online donations', text: 'A secure donation system integrated into the website.' },
      { title: 'Membership ready', text: 'Set up to support the organisation’s member community.' },
    ],
    url: 'https://myteamsupport.com', image: '/projects/more/myteam.jpg',
  },
];

export const allProjects: FullProject[] = [...main, ...more];

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  return allProjects[(i + 1) % allProjects.length];
}
