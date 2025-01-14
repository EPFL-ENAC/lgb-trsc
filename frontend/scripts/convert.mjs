import csv from 'csvtojson';
import { writeFileSync } from 'fs';

// const djibouti_2023 = "TRSC_Djibouti_Nov_2023_All_projects_timeline";
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
        latitude_begin: obj.Latitude_Begin,
        longitude_begin: obj.Longitude_Begin,
        latitude_end: obj.Latitude_End,
        longitude_end: obj.Longitude_End,
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
    const path = `./src/assets/data/${expeditions}.geojson`;
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
            [obj.Longitude_Start, obj.Latitude_Start],   // Starting point: [longitude, latitude]
            [obj.Longitude_End, obj.Latitude_End]    // Ending point: [longitude, latitude]
          ]
        },
      };
      console.log(obj.Longitude_End, obj.Latitude_End);
      if (obj.Longitude_End == null || obj.Latitude_End == null) {
        featureGeometry.geometry.type = "Point";
        featureGeometry.geometry.coordinates = [obj.Longitude_Start, obj.Latitude_Start];
      }
      result.features.push({
        "id": obj.Event_ID,
        ...featureGeometry,
            "properties": {
              "type": "Expedition",
              "Event_ID": obj.Event_ID,
              "Date": obj.Date,
              "Time": obj.Time,
              "Site": obj.Site,
              "Site_Name": obj.Site_Name,
              "Project_Code": obj.Project_Code,
              "Project_Name": obj.Project_Name,
              "Team_Members": obj.Team_Members,
              "Latitude_Start": obj.Latitude_Start,
              "Longitude_Start": obj.Longitude_Start,
              "Latitude_End": obj.Latitude_End,
              "Longitude_End": obj.Longitude_End,
              "Comments": obj.Comments,
            }
      })
    });
    writeFileSync(path, JSON.stringify(result));
    console.log(`data.csv converted successfully to JSON in ${path}`)
  });


csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/internationalization.csv')
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
      const path = `./src/assets/data/internationalization_${lang}.json`;
      writeFileSync(path, JSON.stringify(result_lang[lang]));
      console.log(`internationalization.csv converted successfully to JSON in ${path}`)
    });
  });

