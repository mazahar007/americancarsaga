// ============================================================
//  American Car Saga — main site settings
//  Change these values; everything else on the site updates.
// ============================================================

export const SITE = {
  name: 'American Car Saga',
  shortName: 'Car Saga',
  tagline: 'Stories, reviews & honest buying advice for classic American car lovers',
  description:
    'American Car Saga brings you classic and muscle car reviews, real stories from automotive history, pros and cons, values, and trusted buying guides.',
  // Your domain. Change this when you connect a domain (no trailing slash).
  url: 'https://www.americancarsaga.com',
  author: 'American Car Saga Team',
  email: 'hello@americancarsaga.com',
  locale: 'en_US',

  // ---------- Google AdSense ----------
  // Paste your publisher ID, e.g. 'ca-pub-1234567890123456'.
  // While empty, light "Advertisement" placeholders show where ads will appear.
  adsenseClient: '',
  // Optional ad unit slot IDs from AdSense (leave empty for Auto ads).
  adSlots: {
    header: '',
    inArticle: '',
    sidebar: '',
    footer: '',
  },
  showAdPlaceholders: true,

  // ---------- Newsletter ----------
  // Form action URL from Mailchimp / ConvertKit / Beehiiv etc. Empty = hidden form.
  newsletterAction: '',

  // ---------- Social links (empty = hidden) ----------
  social: {
    youtube: '',
    facebook: '',
    instagram: '',
    x: '',
    pinterest: '',
  },
};

export type CategorySlug =
  | 'reviews'
  | 'stories'
  | 'pros-cons'
  | 'buying-guides'
  | 'guides'
  | 'market';

export const CATEGORIES: { slug: CategorySlug; name: string; short: string; description: string; icon: string }[] = [
  { slug: 'reviews', name: 'Car Reviews', short: 'Reviews', description: 'In-depth reviews of classic and modern American cars — how they drive, what they cost, and whether they are worth it.', icon: '★' },
  { slug: 'stories', name: 'Stories & History', short: 'Stories', description: 'The people, the factories and the legends behind America’s greatest automobiles.', icon: '❖' },
  { slug: 'pros-cons', name: 'Pros & Cons', short: 'Pros & Cons', description: 'Straight talk on the good and the bad before you buy, restore or drive.', icon: '⇄' },
  { slug: 'buying-guides', name: 'Buying Guides', short: 'Buying Guides', description: 'Tested advice and product picks for owners — covers, tools, care products, insurance and more.', icon: '✓' },
  { slug: 'guides', name: 'Tips & Know-How', short: 'Tips', description: 'Useful, informative guides on ownership, maintenance, storage and driving.', icon: 'ℹ' },
  { slug: 'market', name: 'Values & Market', short: 'Values', description: 'What classic cars are worth today and where the market is heading.', icon: '$' },
];

export const NAV = [
  { href: '/category/reviews', label: 'Reviews' },
  { href: '/category/stories', label: 'Stories' },
  { href: '/category/pros-cons', label: 'Pros & Cons' },
  { href: '/category/buying-guides', label: 'Buying Guides' },
  { href: '/category/guides', label: 'Tips' },
  { href: '/category/market', label: 'Values' },
  { href: '/videos', label: 'Videos' },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
