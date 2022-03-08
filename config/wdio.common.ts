import isCI = require('is-ci');

import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { Photographer, TakePhotosOfInteractions } from '@serenity-js/web';
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

import { Actors } from '../test';

export const config: WebdriverIOConfig = {

    // =========================
    // Serenity/JS Configuration
    // =========================

    // Enable Serenity/JS framework adapter
    // see: https://serenity-js.org/modules/webdriverio/
    framework: '@serenity-js/webdriverio',
    specs: [
        './features/**/*.feature'
    ],
    // Cucumber.js configuration
    // see: https://serenity-js.org/modules/cucumber/class/src/cli/CucumberConfig.ts~CucumberConfig.html
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: [
            './features/support/*.ts',
            './features/step-definitions/*.ts'
        ],
        // <string[]> (type[:path]) specify native Cucumber.js output format, if needed. Optionally supply PATH to redirect formatter output (repeatable)
        format: [ ],
        // <string> (name) specify the profile to use
        profile: '',
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string[] | string> (expression) only execute the features or scenarios with tags matching the expression
        tags: [],
        // <number> timeout for step definitions
        timeout: 60_000,
    },

    serenity: {
        // Use custom Actors class
        // see: https://serenity-js.org/modules/core/class/src/stage/Cast.ts~Cast.html
        actors: new Actors(),

        // Configure reporting services
        // see: https://serenity-js.org/handbook/reporting/
        crew: [
            Photographer.whoWill(TakePhotosOfInteractions),     // slower execution, more comprehensive reports
            // Photographer.whoWill(TakePhotosOfFailures),      // fast execution, screenshots only when tests fail
            ConsoleReporter.forDarkTerminals(),
            new SerenityBDDReporter(),
        ]
    },

    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true,
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],

        'goog:chromeOptions': {
            args: [
                // '--headless',
                '--disable-infobars',
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=1024,768',
            ].concat(isCI ? ['--headless'] : [])    // run in headless mode on the CI server,
        }
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://the-internet.herokuapp.com/',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],

    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Native WebdriverIO reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec'],

}
