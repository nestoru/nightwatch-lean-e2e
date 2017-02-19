var config = require('../../nightwatch.conf.js');

module.exports = {
  'Yahoo should render': function(browser) {
    browser
      .url('https://yahoo.com')
      .waitForElementVisible('body')
      .assert.title('AYahoo')
      .end();
  }
};
