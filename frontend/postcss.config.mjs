/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

import rtlcss from 'postcss-rtlcss';
import autoprefixer from 'autoprefixer';


// https://github.com/elchininet/postcss-rtlcss
// If you want to support RTL css, then
// 1. yarn/npm install postcss-rtlcss
// 2. optionally set quasar.config.js > framework > lang to an RTL language
// 3. uncomment the following line:
// require('postcss-rtlcss')
export default {
  plugins: [
    rtlcss({}),
    autoprefixer({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    }),
  ]
}
