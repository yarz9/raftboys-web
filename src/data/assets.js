// Authentic imagery from raftboys.ba — the client's real photography
// + the official Raft Boys site icon used as the brand mark.
//
// All URLs verified live on https://raftboys.ba

const HOST = 'https://raftboys.ba/wp-content/uploads'

export const IMG = {
  // ── BRAND ──
  // The official Raft Boys mark (the same image they use as their
  // site icon / favicon / apple-touch-icon). Round portrait, works on
  // both light and dark backgrounds because it's already trimmed.
  logo:        `${HOST}/2025/04/cropped-kerim-bijeli-crni-debeli-scaled-1.png`,
  logoSmall:   `${HOST}/2025/04/cropped-kerim-bijeli-crni-debeli-scaled-1-192x192.png`,

  // ── HERO ──
  heroVideo: null,
  // Wide Neretva river / canyon shot — emerald water, mountains in
  // frame. Replaces the previous group portrait per client direction.
  heroPoster:  `${HOST}/2025/02/IMG-20250417-WA0027-scaled.jpg`,

  // ── EXPERIENCES (4) ──
  expRafting:  `${HOST}/2025/07/7-1-scaled-e1752834146679.jpg`,
  expCanoeing: `${HOST}/2025/07/2-1-e1752835094410.jpg`,
  expHiking:   `${HOST}/2025/02/Prenj-Mountain-Planina-Prenj-Bosnia-Herzegovina-lll.ba-@bivakland-2-1024x1024-1.jpg`,
  expPackages: `${HOST}/2025/08/viber_image_2025-08-13_18-17-49-065-1-e1755103210888.jpg`,
  // The earlier hero shot (group of guests on the river) — now used
  // as a friendly mid-page "people" composition where it belongs.
  expPeople:   `${HOST}/2025/07/5-1-scaled-e1752833490811.jpg`,

  // ── GALLERY (8) — real Raft Boys field photos ──
  gallery: [
    `${HOST}/2025/04/IMG-20250417-WA0004-scaled.jpg`,
    `${HOST}/2025/04/IMG-20250417-WA0009-1-scaled.jpg`,
    `${HOST}/2025/02/IMG-20250417-WA0027-scaled.jpg`,
    `${HOST}/2025/02/IMG-20250417-WA0025.jpg`,
    `${HOST}/2025/02/IMG-20250417-WA0026-scaled.jpg`,
    `${HOST}/2025/02/Prenj-7.jpg`,
    `${HOST}/2025/02/gal-prenj-100.jpg`,
    `${HOST}/2025/04/IMG-20250418-WA0011.jpg`,
  ],

  // ── GUIDES (Kerim + team) ──
  guides: [
    `${HOST}/2024/06/kerim-bijeli-debeli.png`,
    `${HOST}/2025/04/kerim-crni-debeli-939x1024.png`,
    `${HOST}/2025/04/kerim-crni-debeli.png`,
  ],
}
