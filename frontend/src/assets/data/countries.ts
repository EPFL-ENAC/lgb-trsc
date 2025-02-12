const countries = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: {
      name: 'EPSG:4326',
    },
  },
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [42.590275, 11.825138],
      },
      properties: {
        type: 'country',
        name: 'Djibouti',
        description: 'Djibouti is a country located in the Horn of Africa.',
        visited: 'Visited in 2022, 2023',
        projects: '3D mapping, eDNA',
        lead: 'Lead by John Doe',
        collaboration: 'In collaboration with Djibouti Ministry of Environment',
        sites: '10 sites visited',
        samples: '300 samples collected',
        divers: '5 local divers trained',
        monitoring: '50 permanent monitoring sites in service',
        enabled: true,
        coastline: {
          type: 'Polygon',
          coordinates: [
            [
              [43.297809757328224, 12.819148226974363],
              [42.85409818885054, 12.585303984852018],
              [43.17020468681926, 12.132098482840973],
              [42.30338916037607, 11.623039937400463],
              [42.49729561907182, 11.218825355408327],
              [42.930537367447556, 11.448604683158422],
              [43.15492821123769, 11.303341394452048],
              [43.374307147095976, 11.667904499085893],
              [43.73639479199744, 12.077143352396206],
              [43.297809757328224, 12.819148226974363],
            ],
          ],
        },
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [39.782334, 15.179384],
      },
      properties: {
        type: 'country',
        name: 'Eritrea',
        description:
          'Eritrea is a country in the Horn of Africa, with a coastline along the Red Sea.',
        visited: 'Visited in 2024, 2025',
        projects: '3D mapping, eDNA and Seascape Genomics',
        lead: 'Lead by Guilhem',
        collaboration:
          'In collaboration with Ministry of Maritime Ressources of Massawa',
        sites: '15 sites visited',
        samples: '458 samples collected',
        divers: '6 local divers trained',
        monitoring: '112 permanent monitoring sites in service',
        coastline: {
          type: 'Polygon',
          coordinates: [
            [
              [38.87503620031765, 18.282969924720675],
              [38.38429925814464, 17.853408097773226],
              [39.00524575151363, 16.633276858029006],
              [39.11744808420622, 15.74155619442962],
              [39.61314861480179, 14.986912129256467],
              [40.798831676925005, 14.523574590221727],
              [42.00220643507575, 13.472354943754695],
              [42.44755074140352, 12.887104674209937],
              [42.81911300178672, 12.481280677828181],
              [43.292048730672946, 12.719185379699297],
              [41.071816897085284, 15.173817852649549],
              [40.75775083417892, 16.18374677784071],
              [39.45795713020411, 17.798419215199957],
              [38.87503620031765, 18.282969924720675],
            ],
          ],
        },
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [37.22568358573943, 19.624730425079463],
      },
      properties: {
        type: 'country',
        name: 'Sudan',
        description: 'Sudan is a country in Northeast Africa.',
        visited: 'Visited in 2021, 2022',
        projects: 'Marine biodiversity, Coastal erosion',
        lead: 'Lead by Jane Smith',
        collaboration: 'In collaboration with Sudan Marine Research Center',
        sites: '20 sites visited',
        samples: '500 samples collected',
        divers: '8 local divers trained',
        monitoring: '80 permanent monitoring sites in service',
        coastline: {
          type: 'Polygon',
          coordinates: [
            [
              [36.309413923295494, 23.405787431709356],
              [35.074843622071654, 22.73220871079495],
              [36.272503034992326, 21.690402054604277],
              [36.774357745974584, 18.87732403782441],
              [37.60507904764563, 17.739773396329667],
              [38.03104495133667, 17.470897113987007],
              [39.16458342987366, 18.30923604273096],
              [37.99473561546276, 19.166267445950226],
              [37.73826492473711, 21.621552421300805],
              [36.309413923295494, 23.405787431709356],
            ],
          ],
        },
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [34.947877939437745, 29.54957892767743],
      },
      properties: {
        type: 'country',
        name: 'Israel',
        description:
          'Israel is a country in the Middle East, on the southeastern shore of the Mediterranean Sea.',
        visited: 'Visited in 2023, 2024',
        projects: 'Coral reef restoration, Marine pollution',
        lead: 'Lead by Michael Cohen',
        collaboration:
          'In collaboration with Israel Oceanographic and Limnological Research',
        sites: '12 sites visited',
        samples: '350 samples collected',
        divers: '7 local divers trained',
        monitoring: '90 permanent monitoring sites in service',
        coastline: {
          type: 'Polygon',
          coordinates: [
            [
              [34.888417627215404, 29.537901750016033],
              [34.93103305972542, 29.4312206467269],
              [34.97934874272016, 29.497745070458663],
              [34.983830709178676, 29.602327031986405],
              [34.888417627215404, 29.537901750016033],
            ],
          ],
        },
      },
    },
  ],
};

export default countries;
