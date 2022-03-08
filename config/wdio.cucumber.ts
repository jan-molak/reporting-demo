import { config } from './wdio.common';
import { ArtifactArchiver } from '@serenity-js/core';

config.specs = [
    './features/**/*.feature'
];

config.cucumberOpts = {
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
};

config.serenity.runner = 'cucumber';
config.serenity.crew.push(ArtifactArchiver.storingArtifactsAt('target-cucumber/site/serenity'));

exports.config = config;
