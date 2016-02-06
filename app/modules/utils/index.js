'use strict';

const fs = require('fs');
const request = require('request');

module.exports = {
  /**
   * Gets a random item from given array.
   * @param {Array} list - an array.
   * @returns {*} random item fron the array.
   */
  getRandom(list) {
    return list[Math.round(Math.random() * (list.length - 1))];
  },

  /**
   * Downloads a resource into given path.
   * @param {string} url - url of resource to download.
   * @param {string} path - path where resource should be saved.
   * @param {Function} callback - handler for end of download.
   */
  download(url, path, callback) {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  }
};
