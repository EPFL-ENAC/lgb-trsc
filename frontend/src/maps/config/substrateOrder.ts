export const validSubstrates = [
  'sand',
  'rubble',
  'unknown_hard_substrate',
  'algae_covered_substrate',
  'coral_bleached',
  'coral_dead',
  'coral_alive',
  'other_invertebrates',
  'anemone',
  'other_animal',
  'trash',
];

export const validSubtrateMapKeyText: Record<string, string> = {
  sand: 'sand',
  rubble: 'rubble',
  unknown_hard_substrate: 'unknown hard substrate',
  algae_covered_substrate: 'algae covered substrate',
  coral_bleached: 'bleached coral',
  coral_dead: 'dead coral',
  coral_alive: 'alive coral',
  other_invertebrates: 'other invertebrates',
  anemone: 'anemone',
  other_animal: 'other animal',
  trash: 'trash',
  seagrass: 'seagrass',
  clam: 'clam',
  sea_cucumber: 'sea cucumber',
  sea_urchin: 'sea urchin',
  sponge: 'sponge',
  other_coral_dead: 'other coral dead',
  branching_dead: 'branching dead',
  meandering_dead: 'meandering dead',
  'massive/meandering_alive': 'massive meandering alive',
  branching_bleached: 'branching bleached',
  meandering_bleached: 'meandering bleached',
  'massive/meandering_bleached': 'massive meandering bleached',
  other_coral_bleached: 'other coral bleached',
  other_coral_alive: 'other coral alive',
  branching_alive: 'branching alive',
  meandering_alive: 'meandering alive',
  'massive/meandering_dead': 'massive/meandering_dead',
};

export const validSubstrates2 = [
  'sand',
  'unknown_hard_substrate',
  'rubble',
  'trash',
  'algae_covered_substrate',
  'other_animal',
  'seagrass',
  'clam',
  'sea_cucumber',
  'sea_urchin',
  'sponge',
  'anemone',
  'other_coral_dead',
  'branching_dead',
  'meandering_dead',
  'massive/meandering_alive',
  'branching_bleached',
  'meandering_bleached',
  'massive/meandering_bleached',
  'other_coral_bleached',
  'other_coral_alive',
  'branching_alive',
  'meandering_alive',
  'massive/meandering_dead',
];

export const validSubstratesMap: Record<string, string[]> = {
  Substrate_coarse: validSubstrates,
  Substrate_intermediate: validSubstrates2,
};

// Methods
export const preselectedLegendCoarse = [
  'coral_bleached',
  'coral_dead',
  'coral_alive',
].map((legend) => validSubtrateMapKeyText[legend]);

export const preselectedLegendIntermediate = [
  'other_coral_dead',
  'branching_dead',
  'meandering_dead',
  'massive/meandering_alive',
  'branching_bleached',
  'meandering_bleached',
  'massive/meandering_bleached',
  'other_coral_bleached',
  'other_coral_alive',
  'branching_alive',
  'meandering_alive',
  'massive/meandering_dead',
].map((legend) => validSubtrateMapKeyText[legend]);

export const substrateLevelPresetMap: Record<string, string[]> = {
  Substrate_coarse: preselectedLegendCoarse,
  Substrate_intermediate: preselectedLegendIntermediate,
};
