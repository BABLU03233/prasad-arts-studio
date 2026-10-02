export const PHONE = '+919059716009';
export const PHONE_DISPLAY = '+91 90597 16009';
export const EMAIL = 'prasadbabu19800@gmail.com';
export const GOOGLE_PROFILE = 'https://share.google/pisOnEZ5HPKDrzKxL';

// key -> [path, intrinsicWidth, intrinsicHeight, availableVariantWidths]
const imagePaths = {
  // hero + studio-styled
  'eagle-hero': ['hero/eagle-studio-square', 1254, 1254, [480, 960]],
  'floral-wall-relief': ['hero/floral-wall-relief', 960, 1280, [480, 960]],
  // sculptures
  'peacock': ['portfolio/peacock-studio-edited', 1448, 1086, [480, 960]],
  'peacock-original': ['portfolio/peacock-sculpture', 1024, 768, [480, 960]],
  'eagle': ['services/thermocol-eagle', 960, 576, [480, 960]],
  'zebra': ['portfolio/zebra-sculpture', 1600, 1195, [480, 960]],
  'nandi-sculpture': ['portfolio/nandi-sculpture', 735, 602, [480, 735]],
  'metal-skull': ['portfolio/metal-skull', 706, 981, [480, 706]],
  'column': ['portfolio/ornamental-set-piece', 720, 540, [480, 720]],
  // reliefs
  'buddha-relief': ['portfolio/buddha-relief', 736, 981, [480, 736]],
  'feather-relief': ['portfolio/feather-relief', 736, 1308, [480, 736]],
  'rose-relief': ['portfolio/rose-relief', 450, 450, [450]],
  'peacock-om-relief': ['portfolio/peacock-om-relief', 552, 920, [480, 552]],
  'rose-mural-relief': ['portfolio/rose-mural-relief', 640, 640, [480, 640]],
  'birds-wood-relief': ['portfolio/birds-wood-relief', 479, 353, [479]],
  // devotional
  'devotional': ['portfolio/devotional-sculpture', 1200, 1600, [480, 960]],
  'nandi-painted': ['portfolio/nandi-painted', 480, 288, [480]],
  'krishna-radha-mural': ['portfolio/krishna-radha-mural', 500, 375, [480, 500]],
  'krishna-flute-relief': ['portfolio/krishna-flute-relief', 720, 728, [480, 720]],
  // murals & paint
  'lotus-mural': ['portfolio/lotus-mural', 506, 928, [480, 506]],
  'bamboo-mural': ['portfolio/bamboo-mural', 735, 1053, [480, 735]],
  'landscape-arch-mural': ['portfolio/landscape-arch-mural', 538, 700, [480, 538]],
  'colosseum-wood-art': ['portfolio/colosseum-wood-art', 736, 619, [480, 736]],
  // events & sets
  'fairytale': ['portfolio/fairytale-event-stage', 1600, 1195, [480, 960]],
  'floral-event': ['portfolio/floral-event-installation', 1600, 1195, [480, 960]],
  'birthday-castle': ['portfolio/birthday-castle-stage', 735, 476, [480, 735]],
  'first-birthday': ['portfolio/first-birthday-stage', 360, 640, [360]],
  // process (making-of)
  'process-model': ['process/model-making', 1280, 960, [480, 960]],
  'wall-texturing': ['process/wall-texturing', 1280, 720, [480, 960, 1280]],
  'landscape-model': ['process/landscape-model', 1280, 960, [480, 960, 1280]],
};

export function artworkProps(key, sizes = '(max-width: 640px) 92vw, 42vw') {
  const entry = imagePaths[key];
  if (!entry) {
    if (typeof console !== 'undefined') console.warn(`artworkProps: unknown image key "${key}"`);
    return { src: '', srcSet: '', sizes, width: 1, height: 1 };
  }
  const [path, width, height, variants] = entry;
  const srcSet = variants.map((w) => `images/${path}-${w}w.webp ${w}w`).join(', ');
  return { src: `images/${path}.webp`, srcSet, sizes, width, height };
}

const DEFAULT_WA = 'Hi Prasad Arts, I found you through your website. I would like to enquire about a custom 3D art / thermocol project.\n\nName:\nProject:\nEvent date:\nLocation:\nRequirement:';
export const whatsappUrl = (message = DEFAULT_WA) => `https://wa.me/919059716009?text=${encodeURIComponent(message)}`;

export const CATEGORIES = ['All work', 'Sculptures', 'Reliefs', 'Devotional', 'Murals', 'Events & sets'];

// shape: visual weight in the gallery wall — 'feature' (lead), 'wide', 'tall', 'reg'
export const projects = [
  { id: 'rose-mural', image: 'rose-mural-relief', shape: 'feature', title: 'Roses, raised from the wall.', category: 'Reliefs', medium: 'Sculptural wall relief', alt: 'Large pink rose wall relief with butterflies and leaves, finished in soft tones over a textured grey wall', description: 'Oversized roses, leaves and butterflies hand-sculpted into a living-room feature wall, then finished in soft blush tones. A single relief that turns a plain wall into the centre of the room.' },
  { id: 'eagle', image: 'eagle', shape: 'wide', title: 'A form takes flight.', category: 'Sculptures', medium: 'Thermocol 3D sculpture', alt: 'Oversized white thermocol eagle head being carved in the workshop', description: 'An eagle head in the making. The surface reveals every carved feather and the sheer scale of the thermocol form before finishing.' },
  { id: 'buddha', image: 'buddha-relief', shape: 'tall', title: 'Stillness, in relief.', category: 'Reliefs', medium: 'Wall relief', alt: 'Sculpted Buddha face wall relief with pink lotus flowers on a dark textured panel', description: 'A serene Buddha face raised in relief, framed by sculpted lotus blooms against a deep textured panel.' },
  { id: 'peacock', image: 'peacock', originalImage: 'peacock-original', shape: 'reg', title: 'Colour, in full bloom.', category: 'Sculptures', medium: 'Decorative sculpture', alt: 'Large blue and green peacock sculpture with a fan of individually detailed feathers', description: 'A sculpted peacock with layered feathers, a vivid blue body and hand-painted green and gold detail. The studio view has a digitally edited background; open the original to see it on location.' },
  { id: 'nandi', image: 'nandi-sculpture', shape: 'reg', title: 'Guardians in white.', category: 'Sculptures', medium: 'Devotional sculpture', alt: 'Three white sculpted Nandi bulls with fine ornamental detailing', description: 'A set of Nandi bulls sculpted in white, with ornamental jewellery and drapery worked into the surface.' },
  { id: 'krishna-mural', image: 'krishna-radha-mural', shape: 'reg', title: 'A story on the wall.', category: 'Devotional', medium: 'Painted wall mural', alt: 'Colourful painted mural of Radha and Krishna on a swing beneath a tree, with a temple to the side', description: 'A hand-painted devotional mural bringing a scene of Radha and Krishna to life across an interior wall.' },
  { id: 'feather', image: 'feather-relief', shape: 'tall', title: 'Lightness, made solid.', category: 'Reliefs', medium: 'Wall relief', alt: 'Large single white feather sculpted in relief', description: 'A single oversized feather sculpted in relief — a study in how a simple form can carry an entire wall.' },
  { id: 'zebra', image: 'zebra', shape: 'wide', title: 'A playful perspective.', category: 'Sculptures', medium: 'Character sculpture', alt: 'Black and white stylised zebra sculpture with a smiling expression in the workshop', description: 'A larger-than-life zebra character with an expressive silhouette and boldly painted stripes.' },
  { id: 'lotus-mural', image: 'lotus-mural', shape: 'tall', title: 'Nature, reimagined.', category: 'Murals', medium: 'Decorative mural', alt: 'Elegant lotus mural with white flowers and teal leaves touched with gold', description: 'A calm lotus composition in white, teal and gold — delicate work for a feature wall or headboard.' },
  { id: 'devotional', image: 'devotional', shape: 'reg', title: 'Tradition, given form.', category: 'Devotional', medium: 'Religious sculpture', alt: 'Painted Shiva and Parvati sculptures beside a white Nandi figure', description: 'A painted religious composition with detailed garments, ornaments and sculptural figures.' },
  { id: 'birds-relief', image: 'birds-wood-relief', shape: 'wide', title: 'A forest on the wall.', category: 'Reliefs', medium: 'Interior wall relief', alt: 'Warm wood-toned relief of cranes and foliage behind a living-room sofa', description: 'Cranes among branches, sculpted in relief and finished in warm wood tones as the backdrop to a living room.' },
  { id: 'fairytale', image: 'fairytale', shape: 'wide', title: 'Step into a story.', category: 'Events & sets', medium: 'Themed event setting', alt: 'Colourful fairy-themed stage with sculpted trees, oversized flowers and characters', description: 'An immersive fairytale setting combining sculptural trees, oversized flowers and colourful character props.' },
  { id: 'rose-relief', image: 'rose-relief', shape: 'reg', title: 'Soft, by hand.', category: 'Reliefs', medium: 'Wall relief', alt: 'White roses sculpted in soft relief', description: 'Roses worked in gentle white relief — a quieter take on the sculpted feature wall.' },
  { id: 'nandi-painted', image: 'nandi-painted', shape: 'wide', title: 'Colour meets devotion.', category: 'Devotional', medium: 'Painted sculpture', alt: 'Large painted Nandi bull sculpture with decorated base in the workshop', description: 'A Nandi sculpture brought to colour, with a decorated base — photographed in the workshop before delivery.' },
  { id: 'bamboo-mural', image: 'bamboo-mural', shape: 'tall', title: 'A quiet grove.', category: 'Murals', medium: 'Decorative mural', alt: 'Soft green bamboo mural with a small bird and distant hills', description: 'A soft bamboo mural with a single bird — understated greenery for a calm interior.' },
  { id: 'krishna-flute', image: 'krishna-flute-relief', shape: 'reg', title: 'A note held in stone-white.', category: 'Devotional', medium: 'Wall relief', alt: 'Relief of Krishna playing the flute with a seated figure among flowers', description: 'A devotional scene of Krishna with his flute, sculpted in fine white relief among flowering vines.' },
  { id: 'peacock-om', image: 'peacock-om-relief', shape: 'tall', title: 'Symbols, sculpted.', category: 'Reliefs', medium: 'Wall relief', alt: 'Ornate relief panel combining a peacock, an Om symbol and a decorative sun', description: 'An ornate panel weaving together a peacock, an Om and a radiant sun in layered relief.' },
  { id: 'floral-event', image: 'floral-event', shape: 'wide', title: 'Make room for wonder.', category: 'Events & sets', medium: 'Outdoor installation', alt: 'Outdoor floral arch with oversized purple flowers and a fairy character', description: 'Oversized flowers and character elements turn an outdoor entrance into a playful storybook scene.' },
  { id: 'colosseum', image: 'colosseum-wood-art', shape: 'reg', title: 'Detail, line by line.', category: 'Murals', medium: 'Wood art panel', alt: 'Framed wood panel with a finely detailed rendering of the Colosseum', description: 'A finely detailed Colosseum rendered on a framed wood panel — precise, patient linework.' },
  { id: 'lotus-wall', image: 'floral-wall-relief', shape: 'tall', title: 'Light through the leaves.', category: 'Reliefs', medium: 'Sculptural wall installation', alt: 'Tall sculpted lotus stems and flowers with integrated lighting along an interior wall', description: 'Slender stems and layered florals with integrated light bring dimension and rhythm to an interior wall.' },
  { id: 'castle', image: 'birthday-castle', shape: 'wide', title: 'Where the party begins.', category: 'Events & sets', medium: 'Birthday event set', alt: 'Blue and white castle-themed birthday stage with clouds, bears and balloons', description: 'A castle-themed birthday set in blue and white, built around a first-birthday celebration.' },
  { id: 'landscape-mural', image: 'landscape-arch-mural', shape: 'reg', title: 'A window that isn’t.', category: 'Murals', medium: 'Painted alcove mural', alt: 'Arched alcove painted with a sunlit countryside landscape above a draped table', description: 'A painted countryside opens up inside an arched alcove — depth and daylight added to a solid wall.' },
  { id: 'first-birthday', image: 'first-birthday', shape: 'tall', title: 'One to remember.', category: 'Events & sets', medium: 'Event decoration', alt: 'Purple-lit first-birthday stage with a large number one and floral arch', description: 'A softly-lit first-birthday setting with a sculpted number one and a floral arch.' },
  { id: 'column', image: 'column', shape: 'reg', title: 'Props with presence.', category: 'Sculptures', medium: 'Decorative set piece', alt: 'Ornate gold and brown sculpted pedestal in a fabrication workshop', description: 'An architectural decorative piece with curling relief detail and a warm metallic finish.' },
  { id: 'skull', image: 'metal-skull', shape: 'tall', title: 'Made from the overlooked.', category: 'Sculptures', medium: 'Fabrication art', alt: 'Human skull sculpture assembled from metal washers and nuts on a stand', description: 'A skull assembled entirely from metal washers and nuts — fabrication work that finds a form in hardware.' },
];

export const services = [
  { title: 'Thermocol, in a new dimension.', label: 'Thermocol 2D & 3D Work', detail: 'Custom shapes, sculpted characters and dimensional forms, cut and carved by hand. Tell us what you imagine and we’ll explore how to make it real.', image: 'eagle', tag: '01 / Sculpture', wa: 'Hi Prasad Arts, I am interested in custom thermocol 2D / 3D work.' },
  { title: 'Settings that tell a story.', label: 'Event & Movie Sets', detail: 'Birthday themes, event decoration and movie settings, built around your space, theme and scale.', image: 'fairytale', tag: '02 / Spaces & celebrations', wa: 'Hi Prasad Arts, I am interested in event decoration / a themed set.' },
  { title: 'Art beyond the canvas.', label: 'Wall Murals & Reliefs', detail: 'Sculpted reliefs, wall murals and textures that give an interior real character — from a single focal feature to a full composition.', image: 'birds-wood-relief', tag: '03 / Wall art', wa: 'Hi Prasad Arts, I am interested in a wall mural / sculpted relief.' },
  { title: 'An idea. Many possibilities.', label: 'Fiber, Fabrication & Canvas', detail: 'Fibre work, fabrication and portrait canvas art. Share a reference and we’ll discuss the right approach for your project.', image: 'column', tag: '04 / Custom creations', wa: 'Hi Prasad Arts, I am interested in custom fibre / fabrication / canvas work.' },
];

export const positioning = [
  ['Custom made', 'Every piece is created around your requirement — your idea, your space, your scale. Nothing off a shelf.'],
  ['Detailed craft', 'The work lives in the detail: form, proportion and finishing, shaped and refined by hand.'],
  ['Event ready', 'Built with practical installation in mind, so the piece works on the day, in the real space.'],
  ['Visually distinctive', 'Designed to hold a room — to be the thing people notice, photograph and remember.'],
];

export const processSteps = [
  ['Imagine', 'Tell us the story.', 'Share your idea, a reference, or even a rough sketch. Include the size, the location and the date you have in mind.'],
  ['Explore', 'Find its form.', 'We talk through the design, the materials and the practical details, then agree the scope and the quote.'],
  ['Create', 'Bring it to life.', 'Shaping, sculpting and finishing give the idea dimension, with close attention to the details that define it.'],
  ['Complete', 'Make space for the art.', 'We confirm the final details and arrange collection, delivery or installation as agreed for your project.'],
];

export const faqs = [
  ['What kind of work can I enquire about?', 'Thermocol 2D and 3D work, sculpted wall reliefs and murals, fibre work, fabrication, portrait canvas art, birthday decoration, and event or movie settings. Share your idea even if you are not sure which category it fits.'],
  ['Can I share a reference picture or a custom idea?', 'Yes. Send a sketch, a reference picture or a description on WhatsApp. Include the approximate size and where the piece will be used so we can discuss the approach.'],
  ['How is a custom project quoted?', 'The quote depends on the design, dimensions, material, detailing and installation. Send those details with your location and preferred date to request a project-specific quote.'],
  ['How early should I get in touch?', 'As soon as you have a date or an idea. The time needed depends on the scale and detail of the work; we’ll discuss availability and timing before you proceed.'],
  ['Where is Prasad Arts located?', 'We are based in Hyderabad, Telangana. Please call ' + PHONE_DISPLAY + ' before visiting to confirm the current workshop address, directions and availability.'],
  ['Can you help with delivery or installation?', 'Share your project location and installation needs when you enquire. Delivery, setup, access and any related charges are confirmed for your specific project.'],
];
