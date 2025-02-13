import csv from 'csvtojson';
import { writeFileSync } from 'fs';
import crypto from 'crypto';

//csv file name
const djibouti_2023_3d = "dji_3d_mapping_all_results";

let dji3d = [];

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile(`./src/assets/data/${djibouti_2023_3d}.csv`)
  .then((jsonObj) => {
    const path = `./src/assets/data/${djibouti_2023_3d}.json`;
    dji3d = [];

    jsonObj.forEach((obj) => {
      dji3d.push({
        "id": obj.ID,
        "expe_name": obj.expe_name,
        "region_name": obj.region_name,
        "reef_area": obj.reef_area,
        "sampling_site_name": obj.sampling_site_name,
        "event_id": obj.event_id,
        "experiment": obj.experiment,
        year: obj.date_iso.split('-')[0],
        date_iso: obj.date_iso,
        time: obj.time,
        country: obj.country,
        country_abbr: obj.country_abbr,
        latitude_start: obj.latitude_start,
        longitude_start: obj.longitude_start,
        latitude_end: obj.latitude_end,
        longitude_end: obj.longitude_end,
        length: obj.length,
        Substrate_1: obj.Substrate_1,
        Substrate_2: obj.Substrate_2,
        Substrate_3: obj.Substrate_3,
        mean: obj.mean,
        median: obj.median,
        stdev: obj.stdev
      });
    });
    writeFileSync(path, JSON.stringify(dji3d));
    console.log(`data.csv converted successfully to JSON in ${path}`)
  });

const expeditions = "Expeditions";

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile(`./src/assets/data/${expeditions}.csv`)
  .then((jsonObj) => {
    const path = `./src/assets/data/${expeditions}.json`;
    const result = {
      "type": "FeatureCollection",
      "features": []
    };

    jsonObj.forEach((obj) => {
      const featureGeometry = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [obj.longitude_start, obj.latitude_start],   // Starting point: [longitude, latitude]
            [obj.longitude_end, obj.latitude_end]    // Ending point: [longitude, latitude]
          ]
        },
      };

      if (obj.longitude_end == null || obj.latitude_end == null) {
        featureGeometry.geometry.type = "Point";
        featureGeometry.geometry.coordinates = [obj.longitude_start, obj.latitude_start];
      }

      // Create a unique ID based on the SHA256 hash of the object
      const objectString = JSON.stringify(obj);
      const hash = crypto.createHash('sha256').update(objectString).digest('hex');

      // generate hard coral cover from dji3d
      // const dji3dId = dji3d.find(d => d.Site_name === obj.sampling_site_name);
      // const hardCoralCover = dji3d.find(d => d.Site_name === obj.sampling_site_name);

      result.features.push({
        "id": hash,
        "event_id": obj.event_id,
        ...featureGeometry,
        "properties": {
          "type": "Expedition",
          "country": obj.country,
          "country_abbr": obj.country_abbr,
          "date_iso": obj.date_iso,
          "year": obj.date_iso.split('-')[0],
          "experiment": obj.experiment,
          "hard coral cover": "0-10%",
          "time": obj.time,
          "expe_name": obj.expe_name,
          "region_name": obj.region_name,
          "reef_area": obj.reef_area,
          "sampling_site_name": obj.sampling_site_name,
          "event_id": obj.event_id,
          "latitude_start": obj.latitude_start,
          "longitude_start": obj.longitude_start,
          "latitude_end": obj.latitude_end,
          "longitude_end": obj.longitude_end,
          "team_members": obj.team_members,
          "comments": obj.comments
        }
      })
    });
    writeFileSync(path, JSON.stringify(result));
    console.log(`${expeditions}.csv converted successfully to JSON in ${path}`)
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
      console.log(`internationalization.csv converted successfully to JSON in ${path}`)
    });
  });

