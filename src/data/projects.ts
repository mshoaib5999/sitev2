export interface SelectedProject {
  id: string;
  name: string;
  year: string;
  service: string;
  place: string;
  description: string;
  url: string;
  image: string;
  detailImage: string;
  detailCaption: string;
}

export const selectedProjects: SelectedProject[] = [
  {
    id: 'bastide-de-basson',
    name: 'Bastide de Basson',
    year: '2026',
    service: 'Hospitality website — design & build',
    place: 'Provence, France',
    description:
      'A luxury villa in Correns, in the vineyards of Provence — private stays, a pool, gardens and private events, presented in a slow, editorial layout that lets the place sell itself.',
    url: 'https://bastidedebasson.fr/',
    image: '/projects/bastide-main.jpg',
    detailImage: '/projects/bastide-detail.jpg',
    detailCaption: 'The villa & gardens',
  },
  {
    id: 'phaselink',
    name: 'PhaseLink',
    year: '2026',
    service: 'Corporate website — design & build',
    place: 'California, USA',
    description:
      'Principal-led power-system engineering for California projects — studies, protection, interconnection and system assessment, explained clearly for utilities, developers and data centres.',
    url: 'https://phaselinkeng.com/',
    image: '/projects/phaselink-main.jpg',
    detailImage: '/projects/phaselink-detail.jpg',
    detailCaption: 'Renewable energy & storage',
  },
  {
    id: 'sole-survivors',
    name: 'Sole Survivors',
    year: '2026',
    service: 'Community website — design & build',
    place: 'Health Hero League',
    description:
      'Health is the superpower. A kids’ wellness world built on heroic storytelling — six missions, characters and community that make a stronger, healthier you feel like an adventure.',
    url: 'https://thesolesurvivors.com/',
    image: '/projects/solesurvivors-main.jpg',
    detailImage: '/projects/solesurvivors-detail.jpg',
    detailCaption: 'Hero character art',
  },
  {
    id: 'goldstar-learning',
    name: 'GoldStar Learning',
    year: '2026',
    service: 'Education website — design & build',
    place: 'Learning is human',
    description:
      'Personal learning, for students by students — one-to-one tutoring, test prep and writing support, with a warm storefront for the books and resources behind it.',
    url: 'https://goldstar-learning.com/',
    image: '/projects/goldstar-main.jpg',
    detailImage: '/projects/goldstar-detail.jpg',
    detailCaption: 'Test prep, up close',
  },
];

export interface IndexProject {
  name: string;
  category: string;
  place: string;
  url: string;
}

export const moreProjects: IndexProject[] = [
  { name: 'RossAi', category: 'AI & sensor technology', place: 'New Zealand', url: 'https://rossai.co.nz' },
  { name: 'Lumora Nutrition', category: 'WooCommerce — health & wellness', place: 'USA / Global', url: 'https://trylumoradaily.com' },
  { name: 'AION Dubai', category: 'Real estate investment, bilingual', place: 'UAE / Netherlands', url: 'https://aiondubai.com' },
  { name: 'Flip My Life', category: 'Financial & wealth advisory', place: 'Canada', url: 'https://flipmylife.com' },
  { name: 'Creative Contracting', category: 'Engineering & construction', place: 'USA', url: 'https://tampaccs.com' },
  { name: 'Vice Pharmaceuticals', category: 'WooCommerce — research store', place: 'USA', url: 'https://vice-pharma.com' },
  { name: 'Build A Shed', category: 'Construction services', place: 'UAE', url: 'https://buildashed.ae' },
  { name: 'MyTeam Support', category: 'Community & donations', place: 'Non-profit', url: 'https://myteamsupport.com' },
];

export interface ExperienceItem {
  role: string;
  company: string;
  place: string;
  period: string;
}

export const experience: ExperienceItem[] = [
  {
    role: 'Senior WordPress Developer',
    company: 'Upastra Digital Agency',
    place: 'Okara, Pakistan',
    period: 'Jan 2024 — Present',
  },
  {
    role: 'WordPress Developer',
    company: 'M Tech Solutions',
    place: 'Lahore, Pakistan',
    period: 'Apr 2023 — Dec 2023',
  },
  {
    role: 'Associate WordPress Developer',
    company: 'DeDezigners Software House',
    place: 'Lahore, Pakistan',
    period: 'Nov 2022 — Apr 2023',
  },
];

export const contact = {
  email: 'shoaibasghar5999@gmail.com',
  phone: '+92 310 6077900',
  phoneHref: 'tel:+923106077900',
  linkedin: 'https://www.linkedin.com/in/muhammad-shoaib-asghar-444b7120a',
  site: 'shoaibasghar.website',
};
