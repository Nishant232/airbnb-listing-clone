/**
 * Free-license stock photography (Unsplash) standing in for real listing
 * photos — no licensed photos of the actual reference listing exist for
 * this clone. Unsplash's license permits free use with no attribution
 * required (unlike an arbitrary image pulled from a general web search,
 * which would carry unknown/no usage rights). Every URL below was
 * downloaded and visually inspected before being added here — not guessed
 * from an ID or filename alone.
 *
 * Each room type maps to a SET of distinct photos, not a single URL.
 * Earlier version mapped one photo per label, which meant every image slot
 * for a given room (the Photo Tour's overview thumbnail, its large hero,
 * and its 2 supporting thumbnails) all rendered the literal same photo —
 * visibly repetitive. Then a seeded-hash version fixed WITHIN-room
 * repetition but not ACROSS-room repetition: "Living room 1" and "Living
 * room 2" both drew from the same 3-photo pool, so a live QA pass found
 * they ended up showing the identical 3 photos, just permuted into
 * different slots — still read as "the same room shown twice."
 *
 * Fix: `"Living room"`'s pool is now 6 photos, and numbered room instances
 * ("Living room 1" vs "Living room 2") are partitioned into non-overlapping
 * BLOCKS of the pool (instance 1 -> photos[0..2], instance 2 -> photos[3..5])
 * rather than both drawing from the full pool — so two numbered instances
 * of the same room type never show any of the same photos, not just a
 * different permutation of them. Rooms without a number (Bedroom, Full
 * kitchen, etc.) are unaffected by this and still just use the whole pool.
 *
 * "Terrace" and "Additional photos" have their own distinct,
 * topically-matched photo, not a duplicate of Exterior/Living room.
 */
export const STOCK_PHOTO_SETS: Record<string, string[]> = {
  "Living room": [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace", // sectional sofa, gallery wall
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb", // blue sofa, herringbone floor
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", // bright room, plants, gallery wall
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", // blue sofa, dog, staircase
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6", // gray sofa, arched brass lamp
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab", // gray sofas, TV, symmetric
  ],
  Bedroom: [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af", // white bed, nightstand lamp
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", // tufted headboard, king bed
    "https://images.unsplash.com/photo-1540518614846-7eded433c457", // dark headboard, art above bed
  ],
  "Full kitchen": [
    "https://images.unsplash.com/photo-1556911220-bff31c812dba", // white island kitchen
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d", // white kitchen, open shelving
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a", // gold fixtures, farmhouse style
  ],
  "Full bathroom": [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14", // white pedestal sink, plants
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a", // freestanding tub, dark tile
    "https://images.unsplash.com/photo-1620626011761-996317b8d101", // minimalist, freestanding tub, window
  ],
  Exterior: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994", // modern house, dusk
    "https://images.unsplash.com/photo-1613977257363-707ba9348227", // modern house + pool, daylight
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", // modern villa + pool, angled view
  ],
  // Distinct from Exterior — an actual outdoor patio/deck area, not a
  // duplicate of the house exterior shot.
  Terrace: ["https://images.unsplash.com/photo-1613977257363-707ba9348227"],
  Gym: ["https://images.unsplash.com/photo-1540497077202-7c8a3999166f"],
  Pool: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d"],
  "Pool deck": ["https://images.unsplash.com/photo-1571896349842-33c89424de2d"],
  // Distinct from Living room — a shared/common open-plan area (staircase
  // + dining), not a duplicate of the living-room photo.
  "Additional photos": ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"],
};

/** How many photos each numbered room instance's partition block gets. */
const BLOCK_SIZE = 3;

interface ResolvedRoom {
  /** The photo pool this label's base room type draws from. */
  pool: string[];
  /** 1-based instance number parsed from the label (e.g. 2 for "Living room 2"), or null. */
  instance: number | null;
}

function resolveRoom(label: string): ResolvedRoom | undefined {
  if (STOCK_PHOTO_SETS[label]) return { pool: STOCK_PHOTO_SETS[label], instance: null };
  const match = label.match(/^(.*?)\s+(\d+)$/); // "Living room 2" -> ["Living room", "2"]
  if (!match) return undefined;
  const [, base, num] = match;
  const pool = STOCK_PHOTO_SETS[base];
  if (!pool) return undefined;
  return { pool, instance: Number(num) };
}

/** Small deterministic string hash — same (label, seed) always picks the same photo. */
function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Resolves a room label to one photo URL (with Unsplash's own resize/
 * quality params appended). Pass a `seed` (e.g. "a"/"b"/"c"/"d", a card id)
 * to deterministically pick a different photo than other slots using the
 * same label — otherwise always returns the block's first photo.
 *
 * Numbered instances of the same base room ("Living room 1" vs "Living
 * room 2") are partitioned into separate, non-overlapping blocks of the
 * pool (see BLOCK_SIZE) rather than both drawing from the whole pool, so
 * they never show any of the same photos as each other.
 */
export function stockPhotoUrl(
  label: string,
  seed?: string,
  width = 1200,
  quality = 80,
) {
  const resolved = resolveRoom(label);
  if (!resolved || resolved.pool.length === 0) return undefined;
  const { pool, instance } = resolved;

  const blockSize = Math.min(BLOCK_SIZE, pool.length);
  const blockStart =
    instance !== null ? ((instance - 1) * BLOCK_SIZE) % pool.length : 0;
  const offset = seed ? hash(`${label}:${seed}`) % blockSize : 0;
  const index = (blockStart + offset) % pool.length;

  return `${pool[index]}?w=${width}&q=${quality}&auto=format&fit=crop`;
}
