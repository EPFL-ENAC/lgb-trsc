import { attributions } from '@/maps/utils/attributions';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

const geoFeatures = {
  type: 'FeatureCollection',
  name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons',
  crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
  features: [
    {
      type: 'Feature',
      properties: {
        class: 'Protected Area',
        WDPAID: 555577571.0,
        WDPA_PID: '555577571',
        PA_DEF: '1',
        name: 'Arta Plage',
        ORIG_NAME: 'Arta Plage',
        DESIG: 'Paysage Protégé',
        DESIG_ENG: 'Marine protected landscape',
        DESIG_TYPE: 'National',
        IUCN_CAT: 'VI',
        INT_CRIT: 'Not Applicable',
        MARINE: '2',
        REP_M_AREA: 0.0,
        GIS_M_AREA: 14.009612200428499,
        REP_AREA: 0.0,
        GIS_AREA: 14.086510611627199,
        NO_TAKE: 'None',
        NO_TK_AREA: 0.0,
        STATUS: 'Proposed',
        STATUS_YR: 0,
        GOV_TYPE: 'Collaborative governance',
        OWN_TYPE: 'Not Reported',
        MANG_AUTH: 'MHUEAT/DATE',
        MANG_PLAN: 'In development',
        VERIF: 'State Verified',
        METADATAID: 1835,
        SUB_LOC: 'Not Reported',
        PARENT_ISO: 'DJI',
        ISO3: 'DJI',
        SUPP_INFO: 'Not Applicable',
        CONS_OBJ: 'Not Applicable',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [42.683, 11.544333333000054],
            [42.678333333000069, 11.556666667000059],
            [42.85, 11.603333333000023],
            [42.683, 11.544333333000054],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        class: 'Protected Area',
        WDPAID: 555577572.0,
        WDPA_PID: '555577572',
        PA_DEF: '1',
        name: 'Iles des Sept Freres ainsi que Ras Syan, Khor Angar et la foret de Godoria',
        ORIG_NAME:
          'Iles des Sept Freres ainsi que Ras Syan, Khor Angar et la foret de Godoria',
        DESIG: 'Paysage Protégé',
        DESIG_ENG: 'Marine protected landscape',
        DESIG_TYPE: 'National',
        IUCN_CAT: 'V',
        INT_CRIT: 'Not Applicable',
        MARINE: '1',
        REP_M_AREA: 0.0,
        GIS_M_AREA: 370.21809674866302,
        REP_AREA: 0.0,
        GIS_AREA: 459.71633243702098,
        NO_TAKE: 'None',
        NO_TK_AREA: 0.0,
        STATUS: 'Proposed',
        STATUS_YR: 2004,
        GOV_TYPE: 'Collaborative governance',
        OWN_TYPE: 'Not Reported',
        MANG_AUTH: 'MHUEAT/DATE',
        MANG_PLAN: 'In development',
        VERIF: 'State Verified',
        METADATAID: 1835,
        SUB_LOC: 'Not Reported',
        PARENT_ISO: 'DJI',
        ISO3: 'DJI',
        SUPP_INFO: 'Not Applicable',
        CONS_OBJ: 'Not Applicable',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [43.458333333000041, 12.133333333000053],
            [43.416666667000072, 12.133333333000053],
            [43.281666667000025, 12.483333333000076],
            [43.458333333000041, 12.483333333000076],
            [43.458333333000041, 12.133333333000053],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        class: 'Protected Area',
        WDPAID: 555577535.0,
        WDPA_PID: '555577535',
        PA_DEF: '1',
        name: 'Iles Musha et Maskhali',
        ORIG_NAME: 'Iles Musha et Maskhali',
        DESIG: 'Paysage Protégé',
        DESIG_ENG: 'Marine protected landscape',
        DESIG_TYPE: 'National',
        IUCN_CAT: 'V',
        INT_CRIT: 'Not Applicable',
        MARINE: '1',
        REP_M_AREA: 36.6,
        GIS_M_AREA: 35.432087342308002,
        REP_AREA: 36.6,
        GIS_AREA: 39.862457413916999,
        NO_TAKE: 'None',
        NO_TK_AREA: 0.0,
        STATUS: 'Proposed',
        STATUS_YR: 2004,
        GOV_TYPE: 'Collaborative governance',
        OWN_TYPE: 'Not Reported',
        MANG_AUTH: 'MHUEAT/DATE',
        MANG_PLAN: 'In development',
        VERIF: 'State Verified',
        METADATAID: 1835,
        SUB_LOC: 'Not Reported',
        PARENT_ISO: 'DJI',
        ISO3: 'DJI',
        SUPP_INFO: 'Not Applicable',
        CONS_OBJ: 'Not Applicable',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [43.233333333000076, 11.728333333000023],
            [43.213333333000037, 11.69166666700005],
            [43.138333333000048, 11.7],
            [43.17, 11.748333333000062],
            [43.233333333000076, 11.728333333000023],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        class: 'Protected Area',
        WDPAID: 555577570.0,
        WDPA_PID: '555577570',
        PA_DEF: '1',
        name: 'Haramous',
        ORIG_NAME: 'Haramous',
        DESIG: "Aire Gérée pour l'Habitat et les Espèces",
        DESIG_ENG: 'Area protected for habitat and species',
        DESIG_TYPE: 'National',
        IUCN_CAT: 'IV',
        INT_CRIT: 'Not Applicable',
        MARINE: '2',
        REP_M_AREA: 36.1,
        GIS_M_AREA: 24.518425309096401,
        REP_AREA: 36.1,
        GIS_AREA: 25.976906741537999,
        NO_TAKE: 'None',
        NO_TK_AREA: 0.0,
        STATUS: 'Proposed',
        STATUS_YR: 2004,
        GOV_TYPE: 'Federal or national ministry or agency',
        OWN_TYPE: 'Not Reported',
        MANG_AUTH: 'MHUEAT/DATE',
        MANG_PLAN: 'In development',
        VERIF: 'State Verified',
        METADATAID: 1835,
        SUB_LOC: 'Not Reported',
        PARENT_ISO: 'DJI',
        ISO3: 'DJI',
        SUPP_INFO: 'Not Applicable',
        CONS_OBJ: 'Not Applicable',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [43.233333333000076, 11.556666667000059],
            [43.22833333300008, 11.5],
            [43.168333333000078, 11.555],
            [43.245, 11.56666666700005],
            [43.233333333000076, 11.556666667000059],
          ],
        ],
      },
    },
  ],
};

export const createPMTilesSource = () =>
  new VectorSource({
    features: new GeoJSON().readFeatures(geoFeatures, {
      featureProjection: 'EPSG:3857',
    }),
    attributions: attributions.protectedArea,
  });

// import { PMTilesVectorSource } from 'ol-pmtiles';
// import { attributions } from '@/maps/utils/attributions';

// use the following pmtiles/
// url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/',

// const protectedUrls = [
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-points_1',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-points_1.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-points_3',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-points_3.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-points_5',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-points_5.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-points',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-points.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_2',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_2.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_4',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_4.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_6',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons_6.pmtiles',
//   },
//   {
//     name: 'WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons',
//     url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti_protected/WDPA_WDOECM_Feb2025_Public_DJI_shp-polygons.pmtiles',
//   },
// ];
// export const createPMTilesSources = () => {
//   return protectedUrls.reduce((acc, _protected) => {
//     // Convert the name to a valid JavaScript identifier
//     const safeName = _protected.name.replace(/[-\.]/g, '_');
//     acc[safeName] = new PMTilesVectorSource({
//       url: _protected.url,
//       attributions: attributions.protectedArea,
//     });
//     return acc;
//   }, {} as Record<string, PMTilesVectorSource>);
// };
