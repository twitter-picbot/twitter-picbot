# twitter-picbot

A simple twitter bot in nodejs to daily post pics from various sources.

# Requirements

- NodeJS >= 4.X.X

## Twitter Keys

In the root of the application include a file `keys.json` with following format:

```
{
  "consumer_key": "your-consumer-key",
  "consumer_secret": "your-consumer-secret",
  "access_token_key": "your-access-token-key",
  "access_token_secret": "your-access-token-secret"
}
```

## Source Plugins

Multiple plugins are supported to get sources from. Every time the main process
runs it will choose one random plugin and get source from it.

### DeviantArt

In order to be able to use DeviantArt API you will need to register an account and
an application in it, once you have both, you will get a **clientId** and **clientSecret**,
place them in the root folder of the DeviantArt plugin into **keys.json** file like:

```
{
  "client_id": "client-id",
  "client_secret": "client-secret"
}
```

# Deployment

## Install

Run `npm install`

## Start

Run `npm start -- [--query=<query>] [--interval=<interval>] [--keys=<keys-path>]`

Or `node app/index.js [--query=<query>] [--interval=<interval>] [--keys=<keys-path>]`

## Parameters

You can pass following arguments to the bot:

- **query**: the topic that the bot should post about. By default **cats**
- **interval**: cron statement **"{seconds: 0-59} {minutes: 0-59} {hours: 0-23} {day-of-month: 1-31} {months: 0-11} {day-of-week: 0-6}"**.
 Based on [node-cron](https://github.com/merencia/node-cron). By default every hour: **"0 0 \* \* \* \*"**.
- **keys**: relative or absolute path from which to require **keys.json** file.

# Plugins

If you want to create your own plugin for this bot, we encourage you to do so!

You just need to create a folder under [plugins](plugins)
which at least contains and `index.js` file exporting an object with a property
**getSource** as a function:

```
module.exports = {
  /**
   * Gets source of an image related to the query.
   * @param {string} query - topic of the image.
   * @return {Promise} promise handler.
   */
  getSource: function(query) { ... }
}
```

Which resolves an object:

```
{
  url: 'image-url',
  source: 'image-source' // deviantart post, tumblr post, zerochan post, google...
}
```
