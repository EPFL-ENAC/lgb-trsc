import GeoTIFF from 'ol/source/GeoTIFF.js';
import { attributions } from '@/maps/utils/attributions';
// ok source should be wrapped in a function
// documentation here: https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF.html#~SourceInfo

export const createSourceCHL_monthly_mean_1997_2024_Mean = () => {
  const url =
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/ENV_RASTERS_CUT/CHL_monthly_mean_1997_2024_Mean_cog.tif';
  const source = new GeoTIFF({
    sources: [
      {
        url: url,
      },
    ],
    wrapX: false,
    normalize: false,
  });

  source.setAttributions(attributions.noaa);
  return source;
};

export const createSourceCHL_monthly_mean_1997_2024_SD = () => {
  const url =
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/CHL_monthly_mean_1997_2024_SD.tif';
  const source = new GeoTIFF({
    sources: [
      {
        url: url,
      },
    ],
    wrapX: false,
    normalize: false,
  });
  source.setAttributions(attributions.noaa);
  return source;
};
export const DHW_annual_max_1985_2024_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_Mean.tif',
    },
  ],
});
export const DHW_annual_max_1985_2024_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_SD.tif',
    },
  ],
});
export const SCV_monthly_mean_1993_2021_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_Mean.tif',
    },
  ],
});
export const SCV_monthly_mean_1993_2021_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_SD.tif',
    },
  ],
});
export const SPM_monthly_mean_1997_2024_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_Mean.tif',
    },
  ],
});
export const SPM_monthly_mean_1997_2024_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_SD.tif',
    },
  ],
});
export const SST_monthly_max_1985_2024_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_max_1985_2024_Mean.tif',
    },
  ],
});
export const SST_monthly_max_1985_2024_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_max_1985_2024_SD.tif',
    },
  ],
});
export const SST_monthly_mean_1985_2024_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_mean_1985_2024_Mean.tif',
    },
  ],
});
export const SST_monthly_mean_1985_2024_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_mean_1985_2024_SD.tif',
    },
  ],
});
export const SST_monthly_min_1985_2024_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_min_1985_2024_Mean.tif',
    },
  ],
});
export const SST_monthly_min_1985_2024_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SST_monthly_min_1985_2024_SD.tif',
    },
  ],
});
export const SWS_monthly_mean_1993_2021_Mean = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_Mean.tif',
    },
  ],
});
export const SWS_monthly_mean_1993_2021_SD = new GeoTIFF({
  sources: [
    {
      url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_SD.tif',
    },
  ],
});
