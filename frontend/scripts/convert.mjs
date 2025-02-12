import csv from 'csvtojson';
import { writeFileSync } from 'fs';
import crypto from 'crypto';

//csv file name
const djibouti_2023_3d = "dji_3d_mapping_all_results";


csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile(`./src/assets/data/${djibouti_2023_3d}.csv`)
  .then((jsonObj) => {
    const path = `./src/assets/data/${djibouti_2023_3d}.json`;
    const result = [];


    jsonObj.forEach((obj) => {

      result.push({
        "id": obj.ID,
        "Site": obj.Site,
        "Site_name": obj.Site_name,
        ID_site: obj.ID_site,
        year: obj.year,
        Date: obj.Date,
        date_iso: ((inputDate) => {
          const parts = inputDate.split("-"); // Split the string into parts

          // Reorder correctly: year, day, month -> year, month, day
          const correctedDate = `${parts[0]}-${parts[2]}-${parts[1]}`
          return new Date(correctedDate).toISOString().split('T')[0];
        })(obj.Date.split('/').reverse().map((v, i) => {
          if (i === 0) return '20' + v.padStart(2, '0');
          if (i === 1) return v.padStart(2, '0');
          // Get the original day value
          return obj.Date.split('/')[0].padStart(2, '0');
        }).join('-')),
        country: obj.country,
        latitude_begin: obj.latitude_begin,
        longitude_begin: obj.longitude_begin,
        latitude_end: obj.latitude_end,
        longitude_end: obj.longitude_end,
        length: obj.Length,
        Substrate_1: obj.Substrate_1,
        Substrate_2: obj.Substrate_2,
        Substrate_3: obj.Substrate_3,
        mean: obj.mean,
      })
    });
    writeFileSync(path, JSON.stringify(result));
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
          "time": obj.time,
          "experiment": obj.experiment,
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

