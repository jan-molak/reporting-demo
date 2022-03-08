import { config } from './wdio.common';
import { ArtifactArchiver } from '@serenity-js/core';

config.specs = [
    './spec/**/*.spec.ts',
];

config.mochaOpts = {
    ui: 'bdd',
    timeout: 60_000,
};

config.serenity.runner = 'mocha';
config.serenity.crew.push(ArtifactArchiver.storingArtifactsAt('target-mocha/site/serenity'));

exports.config = config;
