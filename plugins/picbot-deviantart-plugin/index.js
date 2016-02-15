'use strict';

const Oauth2 = require('client-oauth2');
const request = require('request');
const utils = require('../../app/modules/utils');

const AUTH_URL = 'https://www.deviantart.com/oauth2/token';
const KEYS = require('./keys.json');

/**
 * Authenticates and gets the token.
 * @return {Promise} promise handler.
 */
function auth() {
  return new Promise((resolve, reject) => {
    let auth = new Oauth2({
      clientId: KEYS.client_id,
      clientSecret: KEYS.client_secret,
      accessTokenUri: AUTH_URL,
      authorizationGrants: ['credentials']
    });

    auth.credentials.getToken()
    .then((data) => {
      resolve({
        token: data.accessToken
      });
    })
    .catch(reject);
  });
}

/**
 * Gets newest deviations related to query.
 * @param {string} token - auth token.
 * @param {string} query - topic of the image.
 * @return {Promise} promise handler.
 */
function getDeviations(token, query) {
  return new Promise((resolve, reject) => {
    let category = 'fanart/digital/painting/games';

    request({
      url: 'https://www.deviantart.com/api/v1/oauth2/browse/newest?' +
        'category_path=' + category + '&' +
        'q=' + query + '&' +
        'offset=0&limit=50&mature_content=false',
      headers: {
        'Accept': '*/*',
        'Authorization': 'Bearer ' + token,
        'Cache-Control': 'no-cache',
        'User-Agent': 'curl/7.44.0'
      }
    }, (error, response, body) => {
      if (error || response.statusCode >= 400) {
        reject({
          error,
          response
        });
      } else {
        const data = JSON.parse(body);

        const source = utils.getRandom(data.results);

        resolve({
          url: source.content.src
          source: source.url,
        });
      }
    });
  });
}

/**
 * Gets source of an image related to the query.
 * @param {string} query - topic of the image.
 * @return {Promise} promise handler.
 */
function getSource(query) {
  return new Promise((resolve, reject) => {
    auth()
    .then((data) => {
      return getDeviations(data.token, query);
    })
    .then(resolve)
    .catch(reject);
  });
}

module.exports = {
  getSource: getSource
};
