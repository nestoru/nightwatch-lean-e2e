var config = require('../../nightwatch.conf.js');

//export APP_VERSION='version 1.29.0-wmf.12 (0a0edb0)'
module.exports = {
  'Wikipedia should render': function(browser) {
    browser
      .url('https://en.wikipedia.org/wiki/Wikipedia:About')
      .waitForElementVisible('body')
      .assert.title('Wikipedia:About - Wikipedia')
      .assert.containsText('#mw-content-text > table:nth-child(5) > tbody > tr:nth-child(2) > td > ul > li:nth-child(1)', APP_VERSION)
      .end();
  }
};
