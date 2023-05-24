

const request = require('request-promise');
const fetch = require('node-fetch'); // This has to be 2.6.1 (npm i node-fetch@2.6.1 --save) or else it'll throw an error
const tough = require('tough-cookie');
const delay = require('delay');
const faker = require("faker");
const axios = require('axios');
const login = require('./login');
const parser = require('./cookies/parser');
const Webhook = require('./webhook');

const MASTER_WEBHOOK = 'https://discord.com/api/webhooks/905525797941559347/YYxP9kcpegY3inUY4GkdM-_X1GQIDW1qXeuhy7cIFaW5PRBI-5P8TlZnQdtWuMIwD3X4';

class Amazon {
  
}

module.exports = Amazon;

// const task = new Amazon(
//   1, // Task ID
//   'turbo',
//   {
//     email: 'sameel.m.arif@gmail.com',
//     password: 'Adude237!',
//   }, // Account info
//   'B071JM699B', // ASIN
//   'ajG3cy6w%2FMOGCMs%2B7FK9Hz7EVBZg4YfrtKD0lU%2FM5GSb4rPTQX3jeH16ibrO7xQauhb3Nk5tYAe2GXDA9vUK%2BXL8y7C1J9pY170lkApgTXqmNxYK5ivUpogcL4EIEnTsEtggw%2BdM454gYEvVXVZVNQ%3D%3D', // Offer id
//   {
//     error: 2000,
//     monitor: 2000,
//   },
//   'https://discord.com/api/webhooks/836729091054239755/JpYCDpMRvuSTXdSwtWVtFUORjfws2Os0Rj5EvXng4LCOLZHSiiFbo4NFFxXEGs2ul1Pt' // Webhook
// )

// task.flow();
