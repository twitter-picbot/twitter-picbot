'use strict';

const fs = require('fs'),
  path = require('path');

/**
 * Loads available plugins.
 * @return {Array<{download: Function}>} list of plugins.
 */
module.exports = function(dir) {
  let plugins = [];

  fs.readdirSync(dir).forEach((file) => {
    let plugin = path.join(dir, file);

    if (fs.statSync(plugin).isDirectory()) {
      plugins.push(require(plugin));
    }
  });

  return plugins;
};
