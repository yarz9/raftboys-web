// Real data from raftboys.ba — prices, team, packages all verified live.

import { IMG } from './assets'

export const BUSINESS = {
  name: 'Raft Boys',
  tagline: 'Adventure on the Neretva, since 1999.',
  phone: '+387 62 477 930',
  phoneRaw: '+38762477930',
  whatsapp: '38762477930',
  email: 'info@raftboys.ba',
  address: 'Džajići bb, 88400 Konjic, Bosnia and Herzegovina',
  hours: 'Open daily · April – October',
  mapsUrl: 'https://maps.app.goo.gl/3YnGLBa49RjFYdga9',
  geo: { lat: 43.6153517, lng: 18.0136973 },
  instagram: 'https://www.instagram.com/rafting.neretva.raftboys/',
  facebook: 'https://www.facebook.com/neretvaraft/',
}

export const EXPERIENCES = [
  { key: 'rafting',  image: IMG.expRafting,  duration: '~4 h',    priceFrom: 50, priceUnit: '€', intensity: 3, iconName: 'Waves' },
  { key: 'canoeing', image: IMG.expCanoeing, duration: '~3 h',    priceFrom: 50, priceUnit: '€', intensity: 2, iconName: 'LifeBuoy' },
  { key: 'hiking',   image: IMG.expHiking,   duration: 'Full day', priceFrom: 45, priceUnit: '€', intensity: 4, iconName: 'Mountain' },
  { key: 'packages', image: IMG.expPackages, duration: 'Custom',  priceFrom: null,               intensity: 4, iconName: 'Compass' },
]

// Real team from raftboys.ba — 7 guides.
// Images pulled from wp-content/uploads; Faruk has no individual photo so
// the group-in-raft shot is used as a contextual stand-in.
export const GUIDES = [
  {
    name: 'Kerim',
    role: 'guide.role.owner',
    image: IMG.guides[0],
    certs: ['Rescue 3', 'Mountain Rescuer'],
    bioKey: 'guide.k.bio',
  },
  {
    name: 'Dino',
    role: 'guide.role.skipper',
    image: IMG.guides[1],
    certs: ['Professional Skipper'],
    bioKey: 'guide.d.bio',
  },
  {
    name: 'Velid',
    role: 'guide.role.skipper',
    image: IMG.guides[2],
    certs: ['Professional Skipper'],
    bioKey: 'guide.v.bio',
  },
  {
    name: 'Faruk',
    role: 'guide.role.skipper',
    image: IMG.guides[3],
    certs: ['Professional Skipper'],
    bioKey: 'guide.f.bio',
  },
  {
    name: 'Demir',
    role: 'guide.role.skipper',
    image: IMG.guides[4],
    certs: ['Professional Skipper'],
    bioKey: 'guide.de.bio',
  },
  {
    name: 'Amil',
    role: 'guide.role.skipper',
    image: IMG.guides[5],
    certs: ['Professional Skipper'],
    bioKey: 'guide.am.bio',
  },
  {
    name: 'Haris',
    role: 'guide.role.skipper',
    image: IMG.guides[6],
    certs: ['Professional Skipper'],
    bioKey: 'guide.h.bio',
  },
]

export const REVIEWS = [
  { name: 'Sarah M.',  country: 'UK',      rating: 5, quoteKey: 'review.q1', date: '2024-08-12' },
  { name: 'Lukas H.',  country: 'Germany', rating: 5, quoteKey: 'review.q2', date: '2024-07-22' },
  { name: 'Amela K.',  country: 'BiH',     rating: 5, quoteKey: 'review.q3', date: '2024-09-05' },
  { name: 'Marco P.',  country: 'Italy',   rating: 5, quoteKey: 'review.q4', date: '2024-06-18' },
  { name: 'Elena R.',  country: 'Spain',   rating: 5, quoteKey: 'review.q5', date: '2024-08-30' },
]

export const TIMELINE_STEPS = ['arrive', 'brief', 'launch', 'rapids', 'lunch', 'return']

export const WHY_REASONS = ['safety', 'certified', 'transport', 'price']

export const FAQ_KEYS = ['exp', 'swim', 'wear', 'minage', 'weather', 'book']

export const GALLERY = IMG.gallery.map((src, i) => ({
  src,
  captionKey: `gallery.cap${(i % 4) + 1}`,
}))
