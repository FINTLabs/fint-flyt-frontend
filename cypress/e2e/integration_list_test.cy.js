// noinspection DuplicatedCode

describe('Testing integration list', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            '**/integrasjoner?side=0&antall=10&sorteringFelt=state&sorteringRetning=ASC',
            { fixture: 'integrationsInList.json' }
        ).as('getIntegrations');
        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations', {
            fixture: 'historikk.json',
        }).as('getHistory');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=*', {
            fixture: 'metadata.json',
        }).as('getMetadata');
        cy.intercept(
            'GET',
            '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=1&ekskluderMapping=true',
            { fixture: 'configDrafts.json' }
        ).as('getConfigDrafts');
        cy.intercept(
            'GET',
            '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=2&ekskluderMapping=true',
            { fixture: 'configDrafts2.json' }
        ).as('getConfigDrafts2');
        cy.intercept(
            'GET',
            '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=1&ekskluderMapping=true',
            { fixture: 'configCompleted.json' }
        ).as('getConfigCompleted');
        cy.intercept(
            'GET',
            '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=2&ekskluderMapping=true',
            { fixture: 'configCompleted2.json' }
        ).as('getConfigCompleted2');
        cy.intercept('GET', '**/konfigurasjoner/4?ekskluderMapping=true', {
            fixture: 'config.json',
        }).as('getConfig');
    });

    function prep() {
        cy.intercept('GET', '**/authorization/me', { fixture: 'me.json' }).as('getMe');
        cy.intercept('GET', '**/authorization/me/is-authorized', { fixture: 'auth.json' }).as(
            'getAuth'
        );
        cy.intercept('GET', '**/authorization/me/restricted-page-authorization', {
            userPermissionPage: true,
        }).as('getUserPermissionsPage');
        cy.intercept('GET', '**/authorization/users?page=0&size=10', { fixture: 'users.json' }).as(
            'getUsersPermissions'
        );
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json',
        }).as('getConfig');
        cy.visit('/integration/list');
        cy.wait('@getConfig');
    }

    it('should open and show table', () => {
        prep();
        cy.get('#integration-table-container').should('be.visible');
    });

    it('should contain correct columns', () => {
        prep();
        let columns = [
            'Id',
            'Kildeapplikasjon',
            'Kildeapplikasjons integrasjon-id',
            'Integrasjonsnavn',
            'Destinasjon/base',
            'Tilstand',
            'Totalt',
            'Under behandling',
            'Overført',
            'Avbrutt',
            'Feilet',
        ];
        columns.forEach((column) => {
            cy.get('#integration-table-container').should('contain.text', column);
        });
        cy.get('#integration-table-container').should('not.contain.text', 'not_a_column');
    });

    it('should open panel', () => {
        prep();
        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
    });
});
