// One poster per project (desktop + mobile mockup, portrait). Projects
// without a poster fall back to their own project image.
export const posterBySlug: Record<string, string> = {
  'bastide-de-basson': '/projects/posters/poster-bastide-de-basson.jpg',
  'phaselink': '/projects/posters/poster-phaselink.jpg',
  'sole-survivors': '/projects/posters/poster-sole-survivors.jpg',
  'goldstar-learning': '/projects/posters/poster-goldstar-learning.jpg',
  'rossai': '/projects/posters/poster-rossai.jpg',
  'lumora-nutrition': '/projects/posters/poster-lumora-nutrition.jpg',
  'aion-dubai': '/projects/posters/poster-aion-dubai.jpg',
  'flip-my-life': '/projects/posters/poster-flip-my-life.jpg',
  'creative-contracting': '/projects/posters/poster-creative-contracting.jpg',
};

export const posterFor = (slug: string, fallback: string) => posterBySlug[slug] ?? fallback;
