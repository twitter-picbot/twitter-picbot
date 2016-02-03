'use strict';

const plugins = require('../plugins');
const utils = require('../utils');

/**
 * Downloads an image and resolves its source.
 * @param {string} pluginsPath - path to plugins directory.
 * @param {string} mediaPath - path to media directory.
 * @param {string} query - topic to look for images.
 * @return {Promise} promise handler.
 */
module.exports = function(pluginsPath, mediaPath, query) {
  return new Promise((resolve, reject) => {
    let pluginList = plugins.load(pluginsPath),
      plugin;

    plugin = utils.getRandom(pluginList);

    plugin.getSource(query).then((data) => {
      utils.download(data.source, mediaPath, () => {
        resolve({
          url: data.url
        });
      });
    }).catch(reject);
  });
};
