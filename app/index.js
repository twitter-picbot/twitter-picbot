'use strict';

const CronJob = require('cron').CronJob;
const argv = require('yargs').argv;
const path = require('path');

const Client = require('./modules/client');
const media = require('./modules/media');

const KEYS = require(argv.keys || '../keys.json');
const API_URL = 'https://upload.twitter.com/1.1/media/upload.json';
const MEDIA_PATH = 'media/image';
const PLUGINS_PATH = path.join(__dirname, '..', 'plugins');
const QUERY = argv.query || 'cats';
const INTERVAL = argv.interval || '0 0 * * * *';

const client = new Client(KEYS);

/**
 * Main process of application.
 */
function main() {
  let sourceUrl;

  media.download(PLUGINS_PATH, MEDIA_PATH, QUERY)
  .then((data) => {
    sourceUrl = data.url;

    return media.read(MEDIA_PATH);
  })
  .then((data) => {
    return client.upload(data.image);
  })
  .then((data) => {
    return client.post(data.media, sourceUrl);
  })
  .then((data) => {
    console.info('Tweeted @', new Date().toISOString());
  })
  .catch((data) => {
    console.error('Oops', data.response.statusCode);
  });
}

const job = new CronJob(INTERVAL, main);

job.start();
