import GeoTIFF from 'ol/source/GeoTIFF.js';
import { attributions } from 'maps/utils/attributions';
import { Style } from 'ol/style';
import {
  CHL_monthly_mean_Mean,
  CHL_monthly_mean_SD,
  SST_monthly_max_Mean,
  SST_monthly_max_SD,
  SST_monthly_mean_Mean,
  SPM_monthly_mean_Mean,
  DHW_annual_max_Mean,
  SWV_monthly_mean_Mean,
  SWS_monthly_mean_Mean,
  SST_monthly_mean_SD,
  SPM_monthly_mean_SD,
  DHW_annual_max_SD,
  SWV_monthly_mean_SD,
  SWS_monthly_mean_SD,
  SST_monthly_min_Mean,
  SST_monthly_min_SD,
  ColorMap,
} from 'maps/config/layerColors';

/**
 * Enum for source types
 */
export enum SourceType {
  MEAN = 'Mean',
  SD = 'SD',
}

/**
 * Interface for components within metadata that describe specific aspects of a dataset
 */
interface MetadataComponent {
  shortTitle: string;
  description: string;
}

/**
 * Variable information for legend display
 */
export interface VariableInfo {
  unit: string;
  variableTitle: string;
  variable: string;
}

/**
 * Configuration for an individual GeoTIFF source layer
 * Can include properties from both metadata and variable information
 */
export interface SourceInfo {
  type: SourceType;
  name: string;
  url: string;
  colorScale: ColorMap;
  attribution: string;
  unit?: string;
  variableTitle?: string;
  variable?: string;
  description?: string;
  shortTitle?: string;
  identifier?: string;
  datasetDescription?: string;
  dataset?: string | string[];
  date?: string | string[];
  resolution?: string;
  version?: string;
  components?: Record<string, MetadataComponent>;
  style?: Style;
  bands?: number[];
}

const legendVariables = {
  CHL: {
    unit: 'mg/m³', // Updated unit format
    variableTitle: 'Mass concentration of chlorophyll a in sea water CHL',
    variable: 'CHL',
  },
  SST: {
    unit: '°C',
    variableTitle: 'Sea surface temperature',
    variable: 'SST',
  },
  SPM: {
    unit: 'g/m³', // Updated unit format
    variableTitle: 'Mass concentration of suspended matter in sea water',
    variable: 'SPM',
  },
  DHW: {
    unit: '°C-weeks',
    variableTitle: 'Degree Heating Week',
    variable: 'DHW',
  },
  SWV: {
    unit: 'm/s',
    variableTitle: 'Sea Water Velocity', // Updated title
    variable: 'SWV', // Updated variable
  },
  SWS: {
    unit: '10⁻³', // Updated unit to match spec (‰ is equivalent)
    unitDescription: 'grams of dissolved salts in 1 kilogram of seawater',
    variableTitle: 'Sea water salinity',
    variable: 'SWS',
  },
};

export type TiffsUrls = {
  CHL_monthly_mean_Mean: string;
  CHL_monthly_mean_SD: string;
  DHW_annual_max_Mean: string;
  DHW_annual_max_SD: string;
  SWV_monthly_mean_Mean: string;
  SWV_monthly_mean_SD: string;
  SPM_monthly_mean_Mean: string;
  SPM_monthly_mean_SD: string;
  SST_monthly_max_Mean: string;
  SST_monthly_max_SD: string;
  SST_monthly_mean_Mean: string;
  SST_monthly_mean_SD: string;
  SST_monthly_min_Mean: string;
  SST_monthly_min_SD: string;
  SWS_monthly_mean_Mean: string;
  SWS_monthly_mean_SD: string;
};

export const tiffsUrls: TiffsUrls = {
  CHL_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_Mean.tif',
  CHL_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_SD.tif',
  DHW_annual_max_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_Mean.tif',
  DHW_annual_max_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_SD.tif',
  SWV_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_Mean.tif',
  SWV_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_SD.tif',
  SPM_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_Mean.tif',
  SPM_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_SD.tif',
  SST_monthly_max_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_Mean.tif',
  SST_monthly_max_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_SD.tif',
  SST_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_Mean.tif',
  SST_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_SD.tif',
  SST_monthly_min_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_Mean.tif',
  SST_monthly_min_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_SD.tif',
  SWS_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_Mean.tif',
  SWS_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_SD.tif',
};

export const metadata = {
  CHL_monthly_mean: {
    ...legendVariables.CHL,
    resolution: '4km',
    name: 'Chlorophyll Concentration', // Spec: Name
    shortTitle: 'Mass concentration of Chlorophyll A in sea water',
    description: 'Mass concentration of Chlorophyll A in sea water',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    datasetDescription:
      'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    productIdentifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104', // Spec: Product identifier
    doi: 'https://doi.org/10.48670/moi-00281', // Spec: DOI
    productName:
      'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)', // Spec: Product name
    dataset: 'cmems_obs-oc_glo_bgc-plankton_my_l4-multi-4km_P1M',
    date: '02/09/1997 → 01/05/2024', // Spec: Date range
    sourceProvider: 'Copernicus Marine Services', // Spec: Source
    attributions: attributions.copernicus, // Kept for existing structure, sourceProvider is preferred for spec string
    urls: {
      Mean: tiffsUrls.CHL_monthly_mean_Mean,
      SD: tiffsUrls.CHL_monthly_mean_SD,
    },
  },
  SST_monthly: {
    name: 'Sea Surface Temperature', // Spec: Name
    description: 'Nighttime ocean temperature measured at the surface', // Spec: Definition
    // Spec: Product Suite
    productSuite:
      'NOAA Coral Reef Watch Version 3.1 Daily Global 5km Satellite Coral Bleaching Heat Stress Monitoring Product Suite',
    productName: 'CoralTemp SST product Version 3.1', // Spec: Product name
    ...legendVariables.SST,
    resolution: '0.05°',
    shortTitle: 'Sea water temperature analysed_sst [K]',
    identifier: 'SST_GLO_SST_L4_REP_OBSERVATIONS_010_024',
    datasetDescription:
      'ESA SST CCI and C3S reprocessed sea surface temperature analyses',
    dataset: [
      'Dataset 1 ESACCI-GLO-SST-L4-REP-OBS-SST 02/09/1981→31/12/2016',
      'Dataset 2 C3S-GLO-SST-L4-REP-OBS-SST 02/01/2017→30/09/2022',
    ],
    date: '01/1985 – 05/2024', // Spec: Date range
    // DOI not specified for SST in the provided spec text
    sourceProvider: 'NOAA', // Spec: Source
    attributions: attributions.noaa, // Updated to NOAA

    urls: {
      max_Mean: tiffsUrls.SST_monthly_max_Mean,
      max_SD: tiffsUrls.SST_monthly_max_SD,
      mean_Mean: tiffsUrls.SST_monthly_mean_Mean,
      mean_SD: tiffsUrls.SST_monthly_mean_SD,
      min_Mean: tiffsUrls.SST_monthly_min_Mean,
      min_SD: tiffsUrls.SST_monthly_min_SD,
    },
  },
  SPM_monthly_mean: {
    ...legendVariables.SPM,
    name: 'Suspended Particulate Matter', // Spec: Name
    description: 'Mass concentration of suspended matter in sea water', // Spec: Definition
    resolution: '4km',
    productIdentifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    doi: 'https://doi.org/10.48670/moi-00281',
    productName:
      'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-transp_my_l4-multi-4km_P1M',
    date: '02/09/1997 → 01/05/2024',
    sourceProvider: 'Copernicus Marine Services',
    attributions: attributions.copernicus,
    urls: {
      Mean: tiffsUrls.SPM_monthly_mean_Mean,
      SD: tiffsUrls.SPM_monthly_mean_SD,
    },
  },
  DHW_annual_max: {
    // Key kept as is, though spec files suggest "monthly_max"
    ...legendVariables.DHW,
    name: 'Degree Heating Week', // Spec: Name
    description:
      'DHW is calculated as the accumulation of thermal stress (i.e., temperature >1°C above the monthly maximal mean temperature) over the previous 12 weeks', // Spec: Definition
    resolution: '0.05°', // Spec: Resolution (updated from 5km)
    // Spec: Product Suite
    productSuite:
      'NOAA Coral Reef Watch Version 3.1 Daily Global 5km Satellite Coral Bleaching Heat Stress Monitoring Product Suite',
    productName: 'DHW product Version 3.1', // Spec: Product name
    // DOI not specified for DHW in the provided spec text
    // Identifier 'DWH_ct5km_dhw-max_v3.1' from code could be kept if it's a more specific internal ID
    // version: '3.1' from code is covered by productName
    date: '01/1985 – 05/2024', // Spec: Date range
    sourceProvider: 'NOAA', // Spec: Source
    attributions: attributions.noaa,
    urls: {
      Mean: tiffsUrls.DHW_annual_max_Mean, // URL key kept, points to updated filename
      SD: tiffsUrls.DHW_annual_max_SD,
    },
  },
  SWV_monthly_mean: {
    // Renamed from SCV_monthly_mean
    ...legendVariables.SWV,
    name: 'Sea Water Velocity', // Spec: Name for SWV
    description:
      'The Overall Sea Water Velocity is the Euclidean norm of the NWV Northward Sea Water Velocity and EWV Eastern Sea Water Velocity, both considered as perpendicular vectors of Water Velocity. In practice, the overall water velocity is the square root of the sum of squares of northward and eastward velocity: SWV = sqrt(EWV² + NWV²)', // Spec: Definition for SWV
    resolution: '0.083°',
    // Metadata for components (NWV/EWV) used as basis for SWV product info
    productIdentifier: 'GLOBAL_MULTIYEAR_PHY_001_030', // From NWV/EWV
    doi: 'https://doi.org/10.48670/moi-00021', // From NWV/EWV
    productName: 'Global Ocean Physics Reanalysis', // From NWV/EWV
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m', // From NWV/EWV
    date: '17/01/1993 → 26/03/2024', // Spec: Date range for NWV/EWV, applied to SWV
    sourceProvider: 'Copernicus Marine Services', // From NWV/EWV
    attributions: attributions.copernicus,
    urls: {
      Mean: tiffsUrls.SWV_monthly_mean_Mean,
      SD: tiffsUrls.SWV_monthly_mean_SD,
    },
  },
  SWS_monthly_mean: {
    ...legendVariables.SWS,
    name: 'Sea water salinity', // Spec: Name
    description: 'Sea water salinity (so)', // Spec: Definition
    shortTitle: 'Sea water salinity (so)',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    datasetDescription: 'Global Ocean Physics Reanalysis',
    doi: 'https://doi.org/10.48670/moi-00021',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    resolution: '0.083°',
    date: '17/01/1993 → 26/03/2024', // Spec: Date range
    sourceProvider: 'Copernicus Marine Services', // Spec: Source (Corrected from NOAA)
    attributions: attributions.copernicus, // Corrected from noaa
    urls: {
      Mean: tiffsUrls.SWS_monthly_mean_Mean,
      SD: tiffsUrls.SWS_monthly_mean_SD,
    },
  },
};

export const sources: SourceInfo[] = [
  {
    type: SourceType.MEAN,
    ...metadata.CHL_monthly_mean,
    colorScale: CHL_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.CHL_monthly_mean.urls.Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.CHL_monthly_mean,
    colorScale: CHL_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.CHL_monthly_mean.urls.SD,
  },
  {
    type: SourceType.MEAN,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} max`,
    colorScale: SST_monthly_max_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.max_Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} max`,
    colorScale: SST_monthly_max_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.max_SD,
  },
  {
    type: SourceType.MEAN,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} mean`,
    colorScale: SST_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.mean_Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} mean`,
    colorScale: SST_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.mean_SD,
  },
  {
    type: SourceType.MEAN,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} min`,
    colorScale: SST_monthly_min_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.min_Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SST_monthly,
    name: `${metadata.SST_monthly.name} min`,
    colorScale: SST_monthly_min_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.min_SD,
  },
  {
    type: SourceType.MEAN,
    ...metadata.SPM_monthly_mean,
    colorScale: SPM_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SPM_monthly_mean.urls.Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SPM_monthly_mean,
    colorScale: SPM_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SPM_monthly_mean.urls.SD,
  },

  {
    type: SourceType.MEAN,
    ...metadata.DHW_annual_max,
    colorScale: DHW_annual_max_Mean,
    attribution: attributions.copernicus,
    url: metadata.DHW_annual_max.urls.Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.DHW_annual_max,
    colorScale: DHW_annual_max_SD,
    attribution: attributions.copernicus,
    url: metadata.DHW_annual_max.urls.SD,
  },

  {
    type: SourceType.MEAN,
    ...metadata.SWV_monthly_mean,
    colorScale: SWV_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SWV_monthly_mean.urls.Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SWV_monthly_mean,
    colorScale: SWV_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SWV_monthly_mean.urls.SD,
  },

  {
    type: SourceType.MEAN,
    ...metadata.SWS_monthly_mean,
    colorScale: SWS_monthly_mean_Mean,
    attribution: attributions.noaa,
    url: metadata.SWS_monthly_mean.urls.Mean,
  },
  {
    type: SourceType.SD,
    ...metadata.SWS_monthly_mean,
    colorScale: SWS_monthly_mean_SD,
    attribution: attributions.noaa,
    url: metadata.SWS_monthly_mean.urls.SD,
  },
];

export const sourcesTitle = sources.map((source) => source.name);

export const createGeoTIFFSource = (sourceInfo: SourceInfo) => {
  const source = new GeoTIFF({
    sources: [{ url: sourceInfo.url }],
    wrapX: false,
    interpolate: false,
    normalize: false,
  });
  source.setAttributions(sourceInfo.attribution);
  return source;
};
