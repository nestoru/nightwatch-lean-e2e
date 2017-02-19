const getenv = require('getenv');
global.APP_VERSION = getenv('APP_VERSION');

module.exports = {
  "src_folders": [
    "test/e2e"
  ],
  "test_workers": {
    "enabled": true,
    "workers": "auto"
  },
  "globals_path" : "globals.js",
  "output_folder": "reports/" + APP_VERSION, 
  "selenium": { 
    "start_process": false,
  },
  "test_settings": {
    "default": {
      "selenium_port"  : 9515,
      "selenium_host"  : "localhost",
      "screenshots" : {
        "enabled" : true,
        "path" : "./error-screenshots/" + APP_VERSION,
        "on_failure": true
      },
      "default_path_prefix" : "",
      "globals": {
        "waitForConditionTimeout": 5000
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions" : {
          "args" : ["--no-sandbox"]
        },
        "acceptSslCerts": true
      }
    }
  }
}
