import GeoTIFF from 'ol/source/GeoTIFF.js';
import { attributions } from '@/maps/utils/attributions';
import { Style } from 'ol/style';
// ok source should be wrapped in a function
// documentation here: https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF.html#~SourceInfo

export interface SourceInfo {
  type: 'Mean' | 'SD';
  name: string;
  url: string;
  unit?: string;
  variable_title?: string;
  variable?: string;
  attribution?: string;
  description?: string;
  fulleTitle?: string;
  style?: Style;
}

const legendVariableCHL = {
  unit: 'mg/m3',
  variable_title: 'Mass concentration of chlorophyll a in sea water CHL',
  variable: 'CHL',
}


export const sources: SourceInfo[] = [
  {
    type: 'Mean',
    name: 'CHL_monthly_mean',
    ...legendVariableCHL,
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_Mean.tif',
  },
  {
    type: 'SD',
    name: 'CHL_monthly_mean',
    ...legendVariableCHL,
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_max',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_max',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_min',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_min',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_SD.tif',
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_Mean.tif',
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_SD.tif',
  },

  {
    name: 'DHW_annual_max',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_Mean.tif',
  },
  {
    name: 'DHW_annual_max',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_SD.tif',
  },

  {
    name: 'SCV_monthly_mean',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_Mean.tif',
  },
  {
    name: 'SCV_monthly_mean',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_SD.tif',
  },

  {
    name: 'SWS_monthly_mean',
    attribution: attributions.noaa,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_Mean.tif',
  },
  {
    name: 'SWS_monthly_mean',
    attribution: attributions.noaa,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_SD.tif',
  },
];

export const sourcesTitle = sources.map((source) => source.name);

export const createGeoTIFFSource = (sourceInfo: SourceInfo) => {
  const source = new GeoTIFF({
    sources: [{ url: sourceInfo.url }],
    wrapX: false,
    normalize: false,
  });
  source.setAttributions(sourceInfo.attribution);
  return source;
};

export const metadata = {
  CHL_monthly_mean: {
    title:
      'CHL chlorophyll concentration : Mass concentration of chlorophyll a in sea water CHL [mg/m3]',
    short_title: 'Mass concentration of chlorophyll a in sea water CHL [mg/m3]',
    shorter_title: 'CHL [mg/m3]',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    name: 'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-plankton_my_l4-multi-4km_P1M',
    date: 'CHL_09-1997_05-2024',
    urls: [
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/CHL_monthly_mean_1997_2024_Mean.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/CHL_monthly_mean_1997_2024_SD.tif',
    ],
    attributions: 'copernicus',
  },
  SST_monthly: {
    title:
      'SST sea surface Temperature : Sea water temperature analysed_sst [K] 0.05°',
    short_title: 'Sea water temperature analysed_sst [K]',
    identifier: 'SST_GLO_SST_L4_REP_OBSERVATIONS_010_024',
    name: 'ESA SST CCI and C3S reprocessed sea surface temperature analyses',
    dataset: [
      'Dataset 1 ESACCI-GLO-SST-L4-REP-OBS-SST 02/09/1981→31/12/2016',
      'Dataset 2 C3S-GLO-SST-L4-REP-OBS-SST 02/01/2017→30/09/2022',
    ],
    date: ['02/09/1981→31/12/2016', '02/01/2017→30/09/2022'],
    url: [
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_max_1985_2024_Mean.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_max_1985_2024_SD.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_mean_1985_2024_Mean.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_mean_1985_2024_SD.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_min_1985_2024_Mean.tif',
      'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_min_1985_2024_SD.tif',
    ],
    attributions: 'copernicus',
  },
  GLOBAL_MULTIYEAR_PHY_001_030: {
    title: 'Sea Current Velocity, Water Salinity, and Water Velocity',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    name: 'Global Ocean Physics Reanalysis',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    resolution: '0.083°',
    date: '01-1993_06-2021',
    attributions: 'copernicus',
    // sources: [
    //   createSourceSCV_monthly_mean_1993_2021_Mean,
    //   createSourceSCV_monthly_mean_1993_2021_SD,
    //   createSourceSWS_monthly_mean_1993_2021_Mean,
    //   createSourceSWS_monthly_mean_1993_2021_SD,
    // ],
    components: {
      SCV: {
        short_title: 'Sea Current Velocity [m/s]',
        description:
          'Calculated from NWV (Northward) and EWV (Eastern) velocities',
      },
      NWV: {
        short_title: 'Northward sea water velocity [m/s]',
        description: 'Northward component of sea water velocity (vo)',
      },
      EWV: {
        short_title: 'Eastern sea water velocity [m/s]',
        description: 'Eastern component of sea water velocity (uo)',
      },
      SWS: {
        short_title: 'Sea water salinity [10-3]',
        description: 'Sea water salinity measurement',
      },
    },
  },

  SPM_monthly_mean: {
    title: 'SPM suspended particulate matter',
    short_title:
      'Mass concentration of suspended matter in sea water SPM [g/m3]',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    name: 'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-transp_my_l4-multi-4km_P1M',
    resolution: '4km',
    date: 'SPM_09-1997_05-2024',
    attributions: 'copernicus',
    // sources: [
    //   createSourceSPM_monthly_mean_1997_2024_Mean,
    //   createSourceSPM_monthly_mean_1997_2024_SD,
    // ],
  },

  DHW_annual_max: {
    title: 'Degree Heating Week (DHW)',
    short_title: 'Degree Heating Week [°C-weeks]',
    identifier: 'DWH_ct5km_dhw-max_v3.1',
    name: 'Year-to-date Annual Composites of 5km Satellite Coral Bleaching Heat Stress Products',
    version: '3.1',
    resolution: '5km',
    date: '1985-2023',
    description:
      'DHW is calculated as the accumulation of thermal stress (temperature >1°C above the monthly maximal mean temperature) over the previous 12 weeks',
    attributions: 'noaa',
    // sources: [
    //   createSourceDHW_annual_max_1985_2024_Mean,
    //   createSourceDHW_annual_max_1985_2024_SD,
    // ],
  },
};
