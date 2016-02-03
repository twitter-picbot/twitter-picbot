'use strict';

const fs = require('fs');

/**
 * Reads contents of file in given path.
 * @return {Promise} promise handler.
 */
module.exports = function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, image) => {
      if (error) {
        reject({
          error
        });
      } else {
        resolve({
          image
        });
      }
    });
  });
};
