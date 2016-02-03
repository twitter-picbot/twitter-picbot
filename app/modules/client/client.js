'use strict';

const Twitter = require('twitter');

class Client {
  constructor(keys) {
    this.twitter = new Twitter(keys);
  }

  /**
   * Uploads an image to twitter.
   * @param {Object} image contents as buffer.
   * @return {Promise} promise handler.
   */
  upload(image) {
    return new Promise((resolve, reject) => {
      this.twitter.post('media/upload', {
        media: image
      }, (error, media, response) => {
        if (error) {
          reject({
            error,
            response
          });
        } else {
          resolve({
            media,
            response
          });
        }
      });
    });
  }

  /**
   * Posts a new status in twitter with given media and source.
   * @param {Object} media - media object.
   * @param {string} source - url of source from which image was obtained.
   * @return {Promise} promise handler.
   */
  post(media, source) {
    return new Promise((resolve, reject) => {
      this.twitter.post('statuses/update', {
        status: `Source: ${source}`,
        media_ids: media.media_id_string
      }, (error, tweet, response) => {
        if (error) {
          reject({
            error,
            response
          });
        } else {
          resolve({
            tweet,
            response
          });
        }
      });
    });
  }
}

module.exports = Client;
