// Local photography from the client's real field shots.
// vite.config.js sets publicDir: 'assets' so all files in /assets
// are served at the root — e.g. /IMG_1859.jpg resolves correctly.

const HOST = 'https://raftboys.ba/wp-content/uploads'

export const IMG = {
  // ── BRAND ──
  logo:        `${HOST}/2025/04/cropped-kerim-bijeli-crni-debeli-scaled-1.png`,
  logoSmall:   `${HOST}/2025/04/cropped-kerim-bijeli-crni-debeli-scaled-1-192x192.png`,

  // ── HERO ──
  // Raft powering through emerald rapids, canyon walls, Neretva logo.
  // Wide portrait orientation — fills the cinematic bleed perfectly.
  heroVideo:   null,
  heroPoster:  '/IMG_1859.jpg',

  // ── EXPERIENCES ──
  // Rafting: raft full of guests driving through dramatic whitewater.
  expRafting:  '/IMG_1908.JPG',
  // Canoeing: two paddlers in yellow kayak through the emerald limestone canyon.
  // Content matches the copy exactly — "glide through hidden coves."
  expCanoeing: '/79dc66bb-e068-49d5-8b73-d2e95c20c0a2.jpg',
  // Hiking: no local shots of Prenj — keep the real mountain photo.
  expHiking:   `${HOST}/2025/02/Prenj-Mountain-Planina-Prenj-Bosnia-Herzegovina-lll.ba-@bivakland-2-1024x1024-1.jpg`,
  // Packages: aerial of many rafts gathered at the limestone cliffs —
  // conveys scale, group adventure, the full Raft Boys experience.
  expPackages: '/IMG_1629.JPG',
  // People shot: smiling guest on the rocks by the emerald river.
  expPeople:   '/IMG_1628.JPG',

  // ── GALLERY (8) ──
  // Ordered for visual variety: action → group → landmark → personal
  // → food → calm → people → action. gallery[3] is the booking-section
  // photo — kept personal and inviting (smiling guest, Raft Boys card).
  gallery: [
    '/IMG_2612.JPG',       // Red AVANTI raft, crew celebrating mid-rapids
    '/IMG_1631.JPG',       // Orange raft, full group powering through a drop
    '/426cbde7-835d-4691-8cd9-cc23d7739c2d.JPG', // Group under the waterfall cave
    '/IMG_1628.JPG',       // Guest smiling by the river — used in Booking section
    '/IMG_1943.JPG',       // Riverside lunch spread on the wooden deck
    '/07189b51-7e8e-45c7-871f-2ae2fc0f1f18.JPG', // Calm clear water, sunny day
    '/98b1ab3d-f287-4d08-b04a-c6b6673b5d75.JPG', // Group laughing in raft, misty canyon
    '/IMG_2609.JPG',       // Raft through the rapids, Raft Boys logo visible
  ],

  // ── GUIDES — real team photos from raftboys.ba ──
  guides: [
    `${HOST}/2025/04/kerim-crni-debeli-939x1024.png`,    // Kerim  (Owner)
    `${HOST}/2025/04/bvbvbvc.png`,                        // Dino   (Skipper)
    `${HOST}/2025/07/5-1-scaled-e1752833490811.jpg`,      // Velid  (Skipper)
    '/98b1ab3d-f287-4d08-b04a-c6b6673b5d75.JPG',         // Faruk  (Skipper — no individual photo)
    `${HOST}/2025/04/4343.png`,                           // Demir  (Skipper)
    `${HOST}/2025/07/2-1-e1752835094410.jpg`,             // Amil   (Skipper)
    `${HOST}/2025/08/viber_image_2025-08-13_18-17-49-065-1-e1755103210888.jpg`, // Haris (Skipper)
  ],
}
