End to end (e2e) testing is crucial to achieve true continuous delivery, the kind of delivery that happens as soon as a new minimal marketable feature (MMF) becomes available.

Tests succeed or fail for a specific deployed version. I believe most web applications are missing an important component that should be clearly visible, the application version.

## User Story
*As a continuous delivery engineer
I want an automated end to end (e2e) runner to be triggered in the testing environment, as long as it hasn’t run for the current deployed in that environment application version
So that I can determine if such released version is ready for production deployment*

This is a proposal for lean e2e with Nightwatch. In a nutshell Nightwatch should:
* Run as many tests as the machine is able to run in parallel (there are three tests being run in this example). CPUs should be increased only when the whole suite goes beyond the acceptable runtime.
* Handle as many test files as needed. They should be kept as small as possible, completely separated and independent. This scales well.
* Produce a single success or failure report to easily identify if the app is ready for production deployment (ansi and html versions are produced in this example). Unfortunately the consolidated report.html generated by nightwatch-html-reporter does not work as expected (see https://github.com/jls/nightwatch-html-reporter/issues/21) but there is a workaround that produces ansi and html as shown in the package.json#scripts.
* Keep the history per tested $APP_VERSION (This example creates a reporting directory per each $APP_VERSION environment variable used)
* Use the $APP_VERSION to assert the current test is still hitting the intended app version (the wikipedia example shows an assertion using the environment variable). If the application is already notifying the user when a new version of the app becomes available, then the assertion could be minimized to “assert no warning is shown in the current view”.
* Produce a screenshot in the case an error happens (in this example I force an assertion error for the yahoo test case)
* Run fast and with minimal configuration. Most of the code in globals.js is related to the nightwatch-html-reporter which can be removed completely since there is a workaround that I consider is good enough. The code in nightwatch.conf.js is the minimum required to run chrome web driver directly with no Selenium nor Java overhead. Granted this will not test all browsers out there but it will be good enough for authorizing a push to production in 99% of the cases according to my experience.
* Provide detailed information to be used as needed. Nightwatch generated JUnit XML files are kept for further inspection as needed.


## Quick start
```
npm install
rm -fr reports/
npm test
tree -I 'node_modules'
```

## Output
```
.
├── error-screenshots
│   └── version\ 1.29.0-wmf.12\ (0a0edb0)
│       └── yahoo
│           └── Yahoo-should-render_FAILED_Feb-19-2017-111526-GMT-0500.png
├── globals.js
├── nightwatch.conf.js
├── package.json
├── reports
│   └── version\ 1.29.0-wmf.12\ (0a0edb0)
│       ├── CHROME_56.0.2924.87_Mac\ OS\ X_google.xml
│       ├── CHROME_56.0.2924.87_Mac\ OS\ X_wikipedia.xml
│       ├── CHROME_56.0.2924.87_Mac\ OS\ X_yahoo.xml
│       ├── console-report.ansi
│       ├── console-report.html
│       └── report.html
└── test
    └── e2e
        ├── google.js
        ├── wikipedia.js
        └── yahoo.js

```

## Automation
Use cron at the beginning. At some point increasing the number of processors might not be an option. When that time comes make modifications in your runner or shell wrapper(s). However in general:

* Find the latestRelease
* If reports/$latestRelease exists do nothing
* Otherwise run ‘npm test’