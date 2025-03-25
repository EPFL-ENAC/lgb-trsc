import csv from 'csvtojson';
import { writeFileSync } from 'fs';
import crypto from 'crypto';

//csv file name
const djibouti_2023_3d = 'dji_3d_mapping_all_results';

let dji3d = [];

await csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile(`./src/assets/data/${djibouti_2023_3d}.csv`)
  .then((jsonObj) => {
    const path = `./src/assets/data/${djibouti_2023_3d}.json`;
    dji3d = [];

    jsonObj.forEach((obj) => {
      dji3d.push({
        id: obj.ID,
        expe_name: obj.expe_name,
        region_name: obj.region_name,
        reef_area: obj.reef_area,
        sampling_site_name: obj.sampling_site_name,
        event_id: obj.event_id,
        experiments: obj.experiment,
        year: obj.date_iso.split('-')[0],
        date_iso: obj.date_iso,
        time: obj.time,
        country: obj.country,
        depth: obj.depth,
        country_abbr: obj.country_abbr,
        latitude_start: obj.latitude_start,
        longitude_start: obj.longitude_start,
        latitude_end: obj.latitude_end,
        longitude_end: obj.longitude_end,
        length: obj.length,
        Substrate_coarse: obj.Substrate_coarse,
        Substrate_intermediate: obj.Substrate_intermediate,
        Substrate_3: obj.Substrate_3,
        mean: obj.mean,
        median: obj.median,
        stdev: obj.stdev,
      });
    });
    writeFileSync(path, JSON.stringify(dji3d));
    console.log(`data.csv converted successfully to JSON in ${path}`);
  });

const expeditions = 'Expeditions';

// Function to get hard_coral_cover category based on mean value
const getHardCoralCoverCategory = (mean) => {
  if (!mean === null || mean === undefined) return undefined;
  const percentage = mean * 100;
  if (percentage <= 10) return '0-10%';
  if (percentage <= 30) return '10-30%';
  if (percentage <= 50) return '30-50%';
  if (percentage <= 75) return '50-75%';
  return '75-100%';
};

await csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile(`./src/assets/data/${expeditions}.csv`)
  .then((jsonObj) => {
    const path = `./src/assets/data/${expeditions}.json`;
    const result = {
      type: 'FeatureCollection',
      features: [],
    };

    jsonObj.forEach((obj) => {
      const featureGeometry = {
        type: 'Feature',
        geometry: {
          type: obj.longitude_end && obj.latitude_end ? 'LineString' : 'Point',
          coordinates:
            obj.longitude_end && obj.latitude_end
              ? [
                  [obj.longitude_start, obj.latitude_start],
                  [obj.longitude_end, obj.latitude_end],
                ]
              : [obj.longitude_start, obj.latitude_start],
        },
      };

      // Create a unique ID based on the SHA256 hash of the object
      const objectString = JSON.stringify(obj);
      const hash = crypto
        .createHash('sha256')
        .update(objectString)
        .digest('hex');
      const locationHash = crypto
        .createHash('sha256')
        .update(
          `${obj.latitude_start}${obj.longitude_start}${obj.latitude_end}${obj.longitude_end}`
        )
        .digest('hex');
      const locationNameHash = crypto
        .createHash('sha256')
        .update(`${obj.region_name}${obj.reef_area}${obj.sampling_site_name}`)
        .digest('hex');

      // Find all entries in dji3d with matching event_id and sum their mean values
      const matchingEntries = dji3d.filter((d) => d.event_id === obj.event_id);
      const coralMatchingEntries = matchingEntries.filter(
        (e) => e.Substrate_coarse === 'coral_alive'
      );
      const depth = matchingEntries[0]?.depth;
      const length = matchingEntries[0]?.length;
      const totalMean = coralMatchingEntries.length
        ? coralMatchingEntries.reduce(
            (sum, entry) => sum + (parseFloat(entry.mean) || 0),
            0
          )
        : undefined;
      const hardCoralCover = getHardCoralCoverCategory(totalMean);

      result.features.push({
        id: hash,
        event_id: obj.event_id,
        locationHash,
        locationNameHash,
        ...featureGeometry,
        properties: {
          type: obj.Exploration_or_Monitoring,
          country: obj.country,
          country_abbr: obj.country_abbr,
          date_iso: obj.date_iso,
          year: obj.date_iso.split('-')[0],
          experiment: obj.experiment,
          hard_coral_cover: hardCoralCover,
          depth,
          length,
          time: obj.time,
          expe_name: obj.expe_name,
          region_name: obj.region_name,
          reef_area: obj.reef_area,
          sampling_site_name: obj.sampling_site_name,
          event_id: obj.event_id,
          latitude_start: obj.latitude_start,
          longitude_start: obj.longitude_start,
          latitude_end: obj.latitude_end,
          longitude_end: obj.longitude_end,
          team_members: obj.team_members,
          comments: obj.comments,
        },
      });
    });
    writeFileSync(path, JSON.stringify(result));
    console.log(`${expeditions}.csv converted successfully to JSON in ${path}`);
  });

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/i18n/internationalization.csv')
  .then((jsonObj) => {
    const langs = ['en', 'fr', 'ar'];
    const result_lang = {
      en: {},
      fr: {},
      ar: {},
    };
    // fill the object with each value
    jsonObj.forEach((obj) => {
      // id,en,fr,de,it,desc_en,desc_fr,desc_de,desc_it
      result_lang['en'][obj.id] = obj.en;
      result_lang['en'][obj.id + '_desc'] = obj.desc_en;
      result_lang['fr'][obj.id] = obj.fr;
      result_lang['fr'][obj.id + '_desc'] = obj.desc_fr;
      result_lang['ar'][obj.id] = obj.ar;
      result_lang['ar'][obj.id + '_desc'] = obj.desc_ar;
    });

    langs.forEach((lang) => {
      const path = `./src/assets/i18n/internationalization_${lang}.json`;
      writeFileSync(path, JSON.stringify(result_lang[lang]));
      console.log(
        `internationalization.csv converted successfully to JSON in ${path}`
      );
    });
  });
