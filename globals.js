const chromedriver = require('chromedriver');
const HtmlReporter = require('nightwatch-html-reporter');

const reporter = new HtmlReporter({
    openBrowser: false,
    hideSuccess: false,
    reportsDirectory: __dirname + '/reports/' + APP_VERSION
});

module.exports = {
  before : function(done) {
    chromedriver.start();

    done();
  },

  after : function(done) {
    chromedriver.stop();

    done();
  },

  reporter: reporter.fn
  
};
