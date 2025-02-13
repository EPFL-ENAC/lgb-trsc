// There should not be negative values in rawData

const rawData2 = [
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.066848622
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.062610385
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.117193177
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.627728052
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.002423
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.00632837
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.011400629
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.01809037
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.002108955
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.003998311
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000140101
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.004114503
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.072843956
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001217813
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.002953756
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 1,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.059926951
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.028370961
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.148962914
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.435138064
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.002443759
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.013476142
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.028280131
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.005132908
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.00384967
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.010366425
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.055815495
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.185636426
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.007360092
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.015103582
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000136481
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2,
    Site: 'djibouti_city',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.044123419
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.236499995
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.058339311
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.10641195
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000276911
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.037676672
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.007861853
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.008160579
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.007606138
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.05524549
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.316469023
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.054895398
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.000107424
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000501557
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.003853576
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.057031637
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.002487381
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.00179516
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000656524
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 3,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.030204347
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.174796391
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.032171263
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.20737983
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.002307758
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.031768123
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.008447455
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.011664095
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.011607192
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.147703288
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.238584801
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.052062376
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.0001022
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000617609
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.005328014
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.042632702
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.00150609
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.001017476
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0.0000989894
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 4,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.04406344
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.268161343
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.124371756
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.110063001
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.010605784
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.014572161
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.003022406
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.029021814
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.035957218
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.208087829
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.007966023
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000538796
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.010029207
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.113746081
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001995136
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.017464288
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000119826
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.00021389
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 5,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.084781127
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.058654767
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.241532081
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.059020933
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.005170291
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.016892611
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.01222091
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.004752563
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.013927597
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.006940966
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.080040236
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.086686299
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.06514063
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.233670106
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.002673628
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.023486818
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000459134
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.003949302
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 6,
    Site: 'djibouti_arta',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.087375073
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.054394211
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.255448969
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.003685015
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.001985837
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.004539257
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.00226359
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.006232202
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.004678721
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.001614379
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.002183901
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.02876756
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.52597427
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.010695812
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.009426862
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000734342
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 7,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.144288371
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.073487738
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.21107671
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.002447861
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.003505459
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.009773397
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.001854557
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.011145273
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.008509024
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.023914802
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.047719605
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.447097873
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004917385
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.009449739
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000614158
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000198049
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 8,
    Site: 'djibouti_ghoubet',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.056611345
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.012721039
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.501889043
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.097494496
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.001557667
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.002455605
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.001737866
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.0000791087
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.015963099
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000143959
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000074945
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.019485923
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.279788386
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.006036929
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.00038054
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.003486678
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.0000933714
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 9,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.013874873
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.037620134
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.363205219
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.098405038
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.0000906245
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.005107644
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.006187128
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000608825
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.006418809
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.010204954
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.164833222
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.003675324
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000070028
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.086610454
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.186992857
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004512227
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.009181185
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.00042579
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.001975662
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 10,
    Site: 'djibouti_tadjoura',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.127660311
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.010452098
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.204992985
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.187385553
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.015165351
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.005639258
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000146954
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.029198012
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.003236995
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.003283256
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000261675
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.0000839736
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.070649152
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.294069683
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.014687774
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.02726831
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.005499473
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000120212
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.000198975
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 11,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.009878298
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.002652614
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.364475532
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.191500759
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.017785814
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.004325494
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.048102138
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000482427
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.000645622
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.00115858
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.017884421
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.044628554
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.227846692
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.044418229
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.000165545
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.023228912
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000688856
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000131514
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 12,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.004730464
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.012057567
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.089592159
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.733245303
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.003612249
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.001490278
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.023564977
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000877899
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.010435467
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.097893604
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.003032376
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.00029531
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.015330757
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0.001302392
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000637084
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.001902114
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 13,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.052781263
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.007435106
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.185346911
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.063938716
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000850462
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.005144858
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.01097914
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000944873
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.012962965
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.014955504
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.072491223
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.006525286
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.050062868
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.487865948
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.008755349
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.017996319
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000963209
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 14,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.033805967
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.055132713
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.106278012
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.054835752
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000510986
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.077909762
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.016946625
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.008485287
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.088053948
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.27624048
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.054345897
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.021226442
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000724885
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.099268138
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.063396529
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001724595
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.040504119
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000187958
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000421905
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 15,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.001767224
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.003143338
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.117299056
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.787631926
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.002433834
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.009371464
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000572581
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.003730065
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000849135
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.000219524
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.018904101
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.034498148
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.008543094
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.002232981
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0.005367872
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.003435657
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 16,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.008125266
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.042077285
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.188503182
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.041792915
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000830774
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.025916269
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.012483739
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.005783754
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.037630332
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.093857923
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.416965361
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.034917947
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.000544857
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.008968629
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.075438764
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004481428
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.001530224
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 17,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0.000151351
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.057382462
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.289818891
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.102229366
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.094854283
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.015768076
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.018360965
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.006300136
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.001009898
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.001349688
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.024050472
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.249330611
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.093149896
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.000360012
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000137678
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.001702461
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.035419818
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.003842438
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.004858173
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.0000746764
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2000,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.055121446
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.037089665
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.164441364
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.000913168
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.00955648
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.046077753
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.005382323
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.0000880094
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.284340496
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.003046311
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.001258328
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.001401131
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.077322755
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.289237178
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.013653582
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.00383404
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.001006233
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.005108078
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000791346
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000161688
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.000168628
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2001,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.173656155
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.223460782
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.328326744
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.000834062
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.036465162
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.021468315
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.001648746
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.001534984
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.007840973
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000171741
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.007041368
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.169754728
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.024942316
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.0000896318
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.000539941
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.000485758
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.0000756004
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.001591054
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.0000719375
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2002,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.016372182
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.28588685
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.60992886
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.012323352
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.001997432
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.004782346
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.000697023
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.004636713
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.002290792
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000102741
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.017370558
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.001915978
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.012630324
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001632431
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.02224586
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.002305115
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000151024
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.002663767
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.0000666524
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2003,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.017807047
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.138844282
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.362005025
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.425621034
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.003466895
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.005118162
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.000545051
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.0000862753
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.003800909
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000931351
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.001596399
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.001396305
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000200685
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.004874361
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.009860348
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004157277
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.001349165
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.011367708
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.004586793
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.001980692
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.000404234
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2004,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.025972869
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.095743538
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.320570534
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.014975272
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.1040631
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.023353464
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.002928469
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.005099415
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.141768013
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.003287797
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.000306341
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.008820296
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.014247969
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.010848992
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.0000766656
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.184014631
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.035070649
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004106953
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.00206995
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.002404843
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.0000669649
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0.000203273
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2005,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.056661488
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.108574129
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.218503548
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.034665544
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000558491
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.032903985
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.007361742
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.010318875
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.135208508
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.003612252
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000320165
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.000223851
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.004250595
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000207328
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.336949701
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.032063357
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.01140801
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.000493787
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.005609644
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000105001
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2006,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.047690322
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.472810981
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.402570904
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.023758327
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.003496849
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.024658968
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000233384
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.009305517
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.000144951
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.002717206
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.000758638
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.003628253
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.002625746
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.002046162
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.000154866
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.000301012
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.001502621
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.001373407
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.000221888
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2007,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.177817824
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.414610614
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.201124124
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.00109217
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.001115757
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.007907477
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.00130273
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.007464532
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.002741952
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.001374824
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000795883
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.020290333
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.105501629
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.028741786
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001806423
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.00026373
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.016193929
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.001644046
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.005742311
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.002467927
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2008,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.456175249
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.150749087
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.288480423
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.010172479
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.004356037
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.000705023
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.000629485
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.019010449
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.001208611
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.001334508
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.002719376
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.054513408
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.002920811
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.001485585
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.00211507
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.001158253
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.002266146
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2009,
    Site: 'djibouti_seven_brothers',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.142239903
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.002655675
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.101604505
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.660883554
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.004640829
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.003972676
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.003221139
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.001497375
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.005082661
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.000473013
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.00018952
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.000100563
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0.000103566
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.00095885
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.012212805
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.028376486
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.001226409
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.002169444
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.027773489
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0.000503259
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0.000114279
  },
  {
    id: 2011,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.044212905
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.328801057
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.109684228
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.373775937
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.00417471
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.020044701
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.001196909
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000394842
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.002100526
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.002836471
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.00160194
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.00170479
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.026949555
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.051807615
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.009035596
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.014099985
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.007308309
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000192081
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.0000778438
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2012,
    Site: 'djibouti_obock',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.051674912
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.147270856
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.165349549
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.033820054
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.005139273
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.078219677
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.0214546
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.004378332
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.048739195
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.201630732
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.06877414
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.033707707
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.000428849
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0.001518855
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.058080255
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.056829903
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.004126281
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.0000875912
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.018489832
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0.00016545
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0.000113958
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2013,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'sand',
    Substrate_2: 'sand',
    Substrate_3: 'sand',
    mean: 0.051943714
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'rubble',
    Substrate_2: 'rubble',
    Substrate_3: 'rubble',
    mean: 0.031098141
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'unknown_hard_substrate',
    Substrate_2: 'unknown_hard_substrate',
    Substrate_3: 'unknown_hard_substrate',
    mean: 0.230917615
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'algae_covered_substrate',
    Substrate_2: 'algae_covered_substrate',
    Substrate_3: 'algae_covered_substrate',
    mean: 0.073919497
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'branching_bleached',
    Substrate_3: 'branching_bleached',
    mean: 0.000997223
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'branching_dead',
    mean: 0.021581943
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'branching_alive',
    mean: 0.006769889
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'stylophora_alive',
    mean: 0.000312887
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'pocillopora_alive',
    mean: 0.013500065
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'acropora_alive',
    mean: 0.030421274
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'table_acropora_alive',
    mean: 0.017002813
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'branching_dead',
    Substrate_3: 'table_acropora_dead',
    mean: 0.026473569
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'branching_alive',
    Substrate_3: 'millepora_alive',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'turbinaria_alive',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'other_coral_bleached',
    Substrate_3: 'other_coral_bleached',
    mean: 0.000164895
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'other_coral_dead',
    Substrate_3: 'other_coral_dead',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'other_coral_alive',
    Substrate_3: 'other_coral_alive',
    mean: 0.051949424
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'massive/meandering_alive',
    Substrate_3: 'massive/meandering_alive',
    mean: 0.378211729
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'massive/meandering_dead',
    Substrate_3: 'massive/meandering_dead',
    mean: 0.042492162
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'massive/meandering_bleached',
    Substrate_3: 'massive/meandering_bleached',
    mean: 0.003748229
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_alive',
    Substrate_2: 'meandering_alive',
    Substrate_3: 'meandering_alive',
    mean: 0.015424846
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_dead',
    Substrate_2: 'meandering_dead',
    Substrate_3: 'meandering_dead',
    mean: 0.000104011
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'coral_bleached',
    Substrate_2: 'meandering_bleached',
    Substrate_3: 'meandering_bleached',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_urchin',
    Substrate_3: 'sea_urchin',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sea_cucumber',
    Substrate_3: 'sea_cucumber',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'anemone',
    Substrate_2: 'anemone',
    Substrate_3: 'anemone',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'sponge',
    Substrate_3: 'sponge',
    mean: 0.002966071
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'clam',
    Substrate_3: 'clam',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_animal',
    Substrate_2: 'other_animal',
    Substrate_3: 'other_animal',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'trash',
    Substrate_2: 'trash',
    Substrate_3: 'trash',
    mean: 0
  },
  {
    id: 2015,
    Site: 'djibouti_maskali',
    Substrate_1: 'other_invertebrates',
    Substrate_2: 'seagrass',
    Substrate_3: 'seagrass',
    mean: 0
  }
];

const grid = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 50
};

function processData(data) {
  // Create map to store series data
  const seriesData = {};
  const validSubstrates = [
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
    'trash'
  ];

  // Initialize series data structure
  validSubstrates.forEach((substrate) => {
    seriesData[substrate] = new Array(31).fill(0);
  });

  // Map ID to array index
  const idMapping = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2000, 2001, 2002,
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2011, 2012, 2013, 2015
  ].reduce((acc, id, index) => {
    acc[id] = index;
    return acc;
  }, {});

  // Populate data
  data.forEach((item) => {
    if (validSubstrates.includes(item.Substrate_1)) {
      const index = idMapping[item.id];
      if (index !== undefined) {
        seriesData[item.Substrate_1][index] += item.mean ; // Convert to percentage
      }
    }
  });

  return validSubstrates.map((substrate) => ({
    name: substrate,
    type: 'bar',
    stack: 'total',
    emphasis: { focus: 'series' },
    data: seriesData[substrate]
  }));
}

var colorPalette = [
    '#d4b483',
    '#a39081',
    '#828282',
    '#5b7065',
    '#fff1af',
    '#8b6b61',
    '#5c8374',
    '#9db2bf',
    '#526d82',
    '#27374d',
    '#000000'
  ];

option = {
  title: {
    text: 'Substrate Distribution by Location ID'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      let result = `ID: ${params[0].axisValue}<br/>`;
      let textStyle = '';
      params.forEach((param, index) => {
        textStyle = '';
        result += `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>${param.seriesName}: ${(param.value * 100).toFixed(
          2
        )}%<br/>`;
      });
      return result;
    }
  },
  legend: {
    data: [
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
      'trash'
    ],
    type: 'scroll',
    orient: 'horizontal',
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2000, 2001,
      2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2011, 2012, 2013, 2015
    ],
    name: 'Location ID'
  },
  yAxis: {
    type: 'value',
    name: 'Percentage',
    axisLabel: {
      formatter: '{value}%'
    },
    max: 1,
    min: 0
  },
  series: processData(rawData2),
  color: colorPalette
};
