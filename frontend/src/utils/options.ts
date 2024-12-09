import Gradient from 'javascript-color-gradient';

export const DateRangeOptions = computed(() => {
  return [
    { value: '1d', label: 'past_1d' },
    { value: '3d', label: 'past_3d' },
    { value: '7d', label: 'past_7d' },
    { value: '30d', label: 'past_30d' },
    { value: 'custom', label: 'custom_time_range' },
  ]
});

export const MeasureOptions = [
  {
    key: 'water_level',
    label: 'Water level',
    unit: 'mm',
    precision: 0,
  },
  {
    key: 'depth',
    label: 'Depth',
    unit: 'm',
    precision: 3,
  },
  {
    key: 'water_temperature',
    label: 'Water Temperature',
    unit: '°C',
    precision: 2,
  },
  // {
  //   key: 'water_samples',
  //   label: 'Water Samples',
  //   unit: '',
  //   precision: 2,
  // },
  {
    key: 'electro_conductivity',
    label: 'Electrical conductivity',
    unit: 'µs/cm',
    precision: 2,
  },
  {
    key: 'dissolved_oxygen',
    label: 'Dissolved oxygen',
    unit: 'mg/L',
    precision: 2,
  },
  { key: 'ph', label: 'pH', unit: 'pH', precision: 2 },
  { key: 'turbidity', label: 'Turbidity', unit: 'NTU', precision: 2 },
  {
    key: 'oxidation_reduction_potential',
    label: 'Oxidation-reduction potential',
    unit: 'V',
    precision: 2,
  },
];

export const SensorSpecs = [
  {
    color: '#9400D3',
    label: 'A',
    layer: 'sensors-a',
    title: 'Multiparameter sensor',
    device: 'In-Situ',
    icon: 'opacity',
    locations: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    colors: getSensorFamilyColor('A', 6),
    measures: [
      'water_temperature',
      'depth',
      'electro_conductivity',
      'turbidity',
      'dissolved_oxygen',
      'ph',
      'oxidation_reduction_potential',
    ],
  },
  {
    color: '#3FD400',
    label: 'B',
    layer: 'sensors-b',
    title: 'Temperature sensor',
    device: 'Ruskin',
    icon: 'thermostat',
    locations: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15'],
    colors: getSensorFamilyColor('B', 15),
    measures: ['water_temperature'],
  },
  {
    color: '#51bbd6',
    label: 'C',
    layer: 'sensors-c',
    title: 'Water level/discharge sensor',
    device: 'Ijinus',
    icon: 'podcasts',
    locations: ['C1', 'C2','C3'],
    colors: getSensorFamilyColor('C', 3),
    measures: ['water_level'],
  },
];

export function getSensorFamilyColor(name: string, midpoints: number) {
  let colors = [];
  switch (name) {
    case 'A':
      // colors = ['#440154','#414487','#2a788e','#22a884','#7ad151','#fde725']; // viridis
      // colors = ['#000004','#420a68','#932667','#dd513a','#fca50a','#fcffa4']; // inferno
      colors = ['#0d0887','#6a00a8','#b12a90','#e16462','#fca636','#f0f921'].reverse(); // plasma
      break;
    case 'B':
      colors = ['#92ffc0', '#002661'];
      break;
    default:
      colors = ['#62cff4', '#2c67f2'];
  }
  const gradient = new Gradient();

  if (colors.length === 2) gradient.setColorGradient(colors[0], colors[1]);
  else
    gradient.setColorGradient(
      colors[0],
      colors[1],
      colors[2],
      colors[3],
      colors[4],
      colors[5],
    );

  gradient.setMidpoint(Math.max(colors.length, midpoints));
  return gradient.getColors().reverse();
}
