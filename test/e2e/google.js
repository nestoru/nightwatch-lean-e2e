var config = require('../../nightwatch.conf.js');

module.exports = {
  'Google should render': function(browser) {
    browser
      .url('https://google.com')
      .waitForElementVisible('body')
      .assert.title('Google')
      .end();
  }
};
