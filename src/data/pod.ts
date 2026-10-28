// Garage Gear (print-on-demand) — designs, products and colours.
// Add a design: add an entry here AND a matching <symbol id="d-YOUR-ID"> in
// src/components/PodSymbols.astro. Everything else updates automatically.

export interface PodDesign { id: string; name: string; tagline: string; url?: string }
export interface PodProduct { id: string; name: string; note: string }
export interface PodColor { id: string; name: string; hex: string }

export const POD_DESIGNS: PodDesign[] = [
  { id: 'route66', name: 'Mother Road Badge', tagline: 'A shield for everyone who has driven Route 66.' },
  { id: 'stripes', name: 'Muscle Stripes', tagline: 'Classic coupe, racing stripes, zero apologies.' },
  { id: 'gauge', name: 'V8 Tachometer', tagline: 'The needle that sounds like a heartbeat.' },
  { id: 'detroit', name: 'Built in Detroit', tagline: 'Bold type for the Motor City faithful.' },
  { id: 'sunset', name: 'Drive-In Nights', tagline: 'Retro sunset, long road, one good car.' },
  { id: 'blueprint', name: 'Blueprint ’69', tagline: 'The drafting-table look for true gearheads.' },
];

export const POD_PRODUCTS: PodProduct[] = [
  { id: 'tee', name: 'T-Shirt', note: 'Soft everyday tee' },
  { id: 'hoodie', name: 'Hoodie', note: 'Warm for cool garage nights' },
  { id: 'mug', name: 'Coffee Mug', note: 'For the morning car show' },
  { id: 'poster', name: 'Poster', note: 'Frame it in the garage' },
];

export const POD_COLORS: PodColor[] = [
  { id: 'ivory', name: 'Ivory', hex: '#f4efe3' },
  { id: 'sand', name: 'Sand', hex: '#cdbb91' },
  { id: 'red', name: 'Muscle Red', hex: '#9b2c2c' },
  { id: 'forest', name: 'Forest', hex: '#2f4f3e' },
  { id: 'navy', name: 'Navy', hex: '#1d3557' },
  { id: 'black', name: 'Black', hex: '#1d1d20' },
];
