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
        coordinates: [43.1, 11.55],
      },
      properties: {
        type: 'country',
        name: 'Djibouti',
        country_code: 'DJ',
        description: 'Djibouti is a country located in the Horn of Africa.',
        visited: 'September 2022, November 2023',
        projects: '3D, SG, MP, eDNA, Sym, echi',
        sites: '22 sites visited',
        monitoring: '4',
        training: '4',
        collaboration:
          "University of Djibouti, Centre d'étude et de recherche de Djibouti, Ministère de l'Environnement et du Développement Durable de Djibouti",
        contact: 'Dr. Guilhem Banc-Prandi, Dr. Ibrahim Souleiman Abdallah',
        enabled: true,
        extent: [],
        coastline: {
          type: 'Polygon',
          coordinates: [
          [
            [
              42.25397054176619,
              12.795389687202572
            ],
            [
              42.25397054176619,
              11.322770696310116
            ],
            [
              43.965617134220906,
              11.322770696310116
            ],
            [
              43.965617134220906,
              12.795389687202572
            ],
            [
              42.25397054176619,
              12.795389687202572
            ]
          ]
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
        country_code: 'ER',
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
        country_code: 'SD',
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
        coordinates: [34.978348156353604, 29.395590752501832],
      },
      properties: {
        type: 'country',
        name: 'Jordan',
        country_code: 'JO',
        description:
          'Jordan is a country in Western Asia, located on the east bank of the Jordan River.',
        visited: 'Visited in 2023, 2024',
        projects: 'Coral reef restoration, Marine pollution',
        lead: 'Lead by Michael Cohen',
        collaboration: 'In collaboration with Aqaba Marine Science Station',
        sites: '12 sites visited',
        samples: '350 samples collected',
        divers: '7 local divers trained',
        monitoring: '90 permanent monitoring sites in service',
        coastline: {
          type: 'Polygon',
          coordinates: [
            [
              [34.97472381591797, 29.387104034423828],
              [34.97583770751953, 29.394018173217773],
              [34.976566314697266, 29.397470474243164],
              [34.97875213623047, 29.401582717895508],
              [34.98111343383789, 29.405420303344727],
              [34.98319625854492, 29.408590316772461],
              [34.985599517822266, 29.411760330200195],
              [34.987701416015625, 29.414930343627926],
              [34.989532470703125, 29.417808532714844],
              [34.99153900146484, 29.42040252685547],
              [34.993324279785156, 29.422716140747067],
              [34.99510955810547, 29.425029754638672],
              [34.99717712402344, 29.427343368530273],
              [34.97472381591797, 29.387104034423828],
            ],
          ],
        },
        enabled: true,
      },
    },
  ],
};

export default countries;
