'use strict';

// sample-powertrack-config.js - sample configuration file for cognicity-reports-powertrack module

/**
 * Configuration for cognicity-reports-powertrack
 * @namespace {object} config
 * @property {object} pg Postgres configuration object
 * @property {string} pg.table_invitees Postgres table name for invited user records
 * @property {object} gnip Configuration object for Gnip PowerTrack interface
 * @property {boolean} gnip.stream If true, connect to the Gnip stream and process tweets
 * @property {number} gnip.streamTimeout Network timeout for Gnip stream connection, in milliseconds. Must be >30s as a keep-alive is sent at least every 30s. {@link http://support.gnip.com/apis/consuming_streaming_data.html#keepalive_signals}
 * @property {string} gnip.username Username for Gnip PowerTrack
 * @property {string} gnip.password Password for Gnip PowerTrack
 * @property {string} gnip.streamUrl URL for Gnip PowerTrack stream, take from the PowerTrack admin interface. http://support.gnip.com/apis/consuming_streaming_data.html#Backfill}
 * @property {string} gnip.rulesUrl URL for the Gnip PowerTrack rules interface, take from the PowerTrack admin interface.
 * @property {object} gnip.rules Object of Gnip rules mapping rule names to rule text
 * @property {string} gnip.rules.(name) Rule name
 * @property {string} gnip.rules.(value) Rule text
 * @property {number} gnip.maxReconnectTimeout Maximum reconnection delay in milliseconds. Exponential backoff strategy is used starting at 1000 and will stop growing at this value.
 * @property {object} twitter Configuration object for Twitter interface
 * @property {object} twitter.usernameVerify Twitter username (without @) authorised to verify reports via retweet functionality
 * @property {string} twitter.usernameReplyBlacklist Twitter usernames (without @, comma separated for multiples) which will never be responded to as part of tweet processing
 * @property {string} twitter.consumer_key Take from the twitter dev admin interface
 * @property {string} twitter.consumer_secret Take from the twitter dev admin interface
 * @property {string} twitter.access_token_key Take from the twitter dev admin interface
 * @property {string} twitter.access_token_secret Take from the twitter dev admin interface
 * @property {boolen} twitter.send_enabled If true, send tweets to users asking them to verify their reports
 * @property {number} twitter.url_length Length that URLs in tweets are shortened to
 * @property {string} twitter.defaultLanguage The default language code to use if we can't resolve one from the tweet
 * @property {boolean} twitter.addTimestamp If true, append a timestamp to each sent tweet
 */
var config = {};

//Database tables
config.pg = {};
config.pg.table_invitees = 'twitter.invitees';

// Gnip Powertrack API
config.gnip = {};
config.gnip.stream = true; // Connect to stream and log reports
config.gnip.streamTimeout = 1000 * 60; // In milliseconds. Must be >30s as a keep-alive is sent at least every 30s
config.gnip.username = 'USERNAME'; // Gnip username
config.gnip.password = 'PASSWORD'; // Gnip password
config.gnip.streamUrl = 'https://gnip-stream.twitter.com/stream/powertrack/accounts/ACCOUNT_NAME/publishers/twitter/STREAM_LABEL.json'; // Gnip stream URL, take from the Gnip admin interface.
config.gnip.rulesUrl = 'https://gnip-api.twitter.com/rules/powertrack/accounts/ACCOUNT_NAME/publishers/twitter/STREAM_LABEL.json'; // Gnip rules URL, take from the Gnip admin interface.
// Gnip rules, enter as an object where the key is the rule name and the value is the rule as a string
config.gnip.rules = {
    "jbd":"( contains:flood OR contains:banjir OR contains:jakartabanjir ) ( bounding_box:[106.5894 -6.4354 106.799999999 -6.2] OR bounding_box:[106.8 -6.4354 107.0782 -6.2] OR bounding_box:[106.5894 -6.199999999 106.799999999 -5.9029] OR bounding_box:[106.8 -6.199999999 107.0782 -5.9029] OR bio_location:jakarta OR place:jakarta OR profile_bounding_box:[106.5894 -6.4354 106.799999999 -6.2] OR profile_bounding_box:[106.8 -6.4354 107.0782 -6.2] OR profile_bounding_box:[106.5894 -6.199999999 106.799999999 -5.9029] OR profile_bounding_box:[106.8 -6.199999999 107.0782 -5.9029] )",

    "addressed":"( contains:flood OR contains:banjir OR contains:jakartabanjir OR contains:report OR contains:card ) @petabencana",
  };

config.gnip.maxReconnectTimeout = 1000 * 60 * 5; // In milliseconds; 5 minutes for max reconnection timeout - will mean ~10 minutes from first disconnection
config.gnip.backfillMinutes = 5; // backfill in minutes on reconnect to the stream

// Twitter app authentication details
config.twitter = {};
//TODO grasp & re-tweet verification see #3
config.twitter.usernameVerify = ''; // Twitter username (without @) authorised to verify reports via retweet functionality
config.twitter.usernameReplyBlacklist = ''; // Twitter usernames (without @, comma separated for multiples) which will never be sent to in response to tweet processing
config.twitter.consumer_key = ''; // Take from the twitter dev admin interface
config.twitter.consumer_secret = ''; // Take from the twitter dev admin interface
config.twitter.access_token_key = ''; // Take from the twitter dev admin interface
config.twitter.access_token_secret = ''; // Take from the twitter dev admin interface

// Twitter parameters
config.twitter.send_enabled = false; // Enable sending of tweets?
config.twitter.url_length = 0; // URLs no longer count as part of tweet limits so this should be 0

// Twitter message texts
// Note we use IN and ID because twitter and Gnip return different language codes for Indonesian
// The messages should be no longer than 109 characters if timestamps are enabled, or 123 characters if timestamps are disabled
config.twitter.defaultLanguage = 'en'; // The default language code to use if we can't resolve one from the tweet

// Append a timestamp to each sent tweet except response to confirmed reports with unique urls
config.twitter.addTimestamp = true;

// Export config object
module.exports = config;
