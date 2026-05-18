// Structured content — clean CMS seam. Replace any field's text +
// pricing without touching component code.

import { IMG } from './assets'

export const BUSINESS = {
  name: 'Raft Boys',
  tagline: 'Adventure on the Neretva, since 1999.',
  phone: '+387 62 477 930',
  phoneRaw: '+38762477930',
  whatsapp: '38762477930', // wa.me format, no plus
  email: 'info@raftboys.ba',
  address: 'Džajići bb, 88400 Konjic, Bosnia and Herzegovina',
  hours: 'Open daily · April – October',
  mapsUrl: 'https://www.google.com/maps/place/Konjic',
  geo: { lat: 43.6566, lng: 17.9595 },
}

// Inline SVG sprites + lucide icon names mixed where useful.
export const EXPERIENCES = [
  {
    key: 'rafting',
    image: IMG.expRafting,
    duration: '3.5 hours',
    priceFrom: 65,
    priceUnit: '€',
    intensity: 3, // 1–5
    iconName: 'Waves',
  },
  {
    key: 'canoeing',
    image: IMG.expCanoeing,
    duration: '2.5 hours',
    priceFrom: 45,
    priceUnit: '€',
    intensity: 2,
    iconName: 'LifeBuoy',
  },
  {
    key: 'hiking',
    image: IMG.expHiking,
    duration: 'Full day',
    priceFrom: 75,
    priceUnit: '€',
    intensity: 4,
    iconName: 'Mountain',
  },
  {
    key: 'packages',
    image: IMG.expPackages,
    duration: '2 days',
    priceFrom: 180,
    priceUnit: '€',
    intensity: 4,
    iconName: 'Compass',
  },
]

export const PACKAGES = [
  {
    key: 'classic',
    priceFrom: 65,
    priceUnit: '€ / person',
    durationKey: 'half_day',
    highlight: false,
    features: ['rafting_half_day','lunch_included','transport_included','safety_briefing','wetsuit_helmet','photos'],
  },
  {
    key: 'premium',
    priceFrom: 95,
    priceUnit: '€ / person',
    durationKey: 'full_day',
    highlight: true,
    features: ['rafting_premium','traditional_lunch','transport_included','safety_briefing','wetsuit_helmet','photos','private_guide','riverside_stop'],
  },
  {
    key: 'weekend',
    priceFrom: 180,
    priceUnit: '€ / person',
    durationKey: 'two_days',
    highlight: false,
    features: ['rafting_premium','hiking_prenj','two_lunches','one_night_lodging','transport_included','photos'],
  },
]

export const GUIDES = [
  {
    name: 'Kerim',
    role: 'guide.role.lead',
    image: IMG.guides[0],
    certs: ['IRF Class IV', 'First-aid certified'],
    yearsKey: 'guide.years.20',
  },
  {
    name: 'Adis',
    role: 'guide.role.senior',
    image: IMG.guides[1],
    certs: ['IRF Class IV', 'Swiftwater Rescue'],
    yearsKey: 'guide.years.12',
  },
  {
    name: 'Mirza',
    role: 'guide.role.senior',
    image: IMG.guides[2],
    certs: ['IRF Class III', 'First-aid certified'],
    yearsKey: 'guide.years.8',
  },
]

// Real-feel curated reviews — replace with real ones (Google / TripAdvisor)
// before launch. Keep the shape stable.
export const REVIEWS = [
  {
    name: 'Sarah M.',
    country: 'UK',
    rating: 5,
    quoteKey: 'review.q1',
    date: '2024-08-12',
  },
  {
    name: 'Lukas H.',
    country: 'Germany',
    rating: 5,
    quoteKey: 'review.q2',
    date: '2024-07-22',
  },
  {
    name: 'Amela K.',
    country: 'BiH',
    rating: 5,
    quoteKey: 'review.q3',
    date: '2024-09-05',
  },
  {
    name: 'Marco P.',
    country: 'Italy',
    rating: 5,
    quoteKey: 'review.q4',
    date: '2024-06-18',
  },
  {
    name: 'Elena R.',
    country: 'Spain',
    rating: 5,
    quoteKey: 'review.q5',
    date: '2024-08-30',
  },
]

export const TIMELINE_STEPS = ['arrive','brief','launch','rapids','lunch','return']

export const WHY_REASONS = ['safety','certified','equipment','hospitality','transport','price']

export const FAQ_KEYS = ['exp','swim','wear','minage','weather','book']

export const GALLERY = IMG.gallery.map((src, i) => ({
  src,
  captionKey: `gallery.cap${(i % 4) + 1}`, // cycles 4 caption keys for variety
}))
