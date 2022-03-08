import 'mocha';
import { actorCalled } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';
import { PickExample } from '../test/examples';
import { Authenticate, VerifyAuthentication } from '../test/authentication';

describe('Form-Based Authentication with Mocha', () => {

    describe('When using username and password to log in', () => {

        beforeEach(() =>
            actorCalled('Alice').attemptsTo(
                Navigate.to('/'),
                PickExample.called('Form Authentication'),
            ));

        it('lets the actor with valid credentials in', () =>
            actorCalled('Alice').attemptsTo(
                Authenticate.using('tomsmith', 'SuperSecretPassword!'),
                VerifyAuthentication.succeeded(),
            ));

        it(`doesn't let the actor with invalid credentials in`, () =>
            actorCalled('Alice').attemptsTo(
                Authenticate.using('foobar', 'barfoo'),
                VerifyAuthentication.failed(),
            ));
    });
});
