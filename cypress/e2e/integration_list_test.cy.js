// noinspection DuplicatedCode

describe('Testing integration list', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            '**/integrasjoner?side=0&antall=10&sorteringFelt=state&sorteringRetning=ASC',
            { fixture: 'integrationsInList.json' }
        ).as('getIntegrations');
        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations*', {
            fixture: 'historikk.json',
        }).as('getHistory');
        cy.intercept('GET', '**/metadata?kildeapplikasjonIds=*&bareSisteVersjoner=*', {
            fixture: 'metadataBySourceApplication.json',
        }).as('getMetadata');
        cy.intercept(
            'GET',
            '**/konfigurasjoner?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=1&ekskluderMapping=true',
            { fixture: 'configDrafts.json' }
        ).as('getConfigDrafts');
        cy.intercept(
            'GET',
            '**/konfigurasjoner?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=2&ekskluderMapping=true',
            { fixture: 'configDrafts2.json' }
        ).as('getConfigDrafts2');
        cy.intercept(
            'GET',
            '**/konfigurasjoner?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=1&ekskluderMapping=true',
            { fixture: 'configCompleted.json' }
        ).as('getConfigCompleted');
        cy.intercept(
            'GET',
            '**/konfigurasjoner?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=2&ekskluderMapping=true',
            { fixture: 'configCompleted2.json' }
        ).as('getConfigCompleted2');
        cy.intercept('GET', '**/konfigurasjoner/4?ekskluderMapping=true', {
            fixture: 'config.json',
        }).as('getConfig');
    });

    function prep() {
        cy.intercept('GET', '**/authorization/me', { fixture: 'me.json' }).as('getMe');
        cy.intercept('GET', '**/authorization/me/is-authorized', {
            fixture: 'auth.json',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).as('getAuth');
        cy.intercept('GET', '**/authorization/me/restricted-page-authorization', {
            userPermissionPage: true,
        }).as('getUserPermissionsPage');
        cy.intercept('GET', '**/authorization/users?page=0&size=10', { fixture: 'users.json' }).as(
            'getUsersPermissions'
        );
        cy.visit('/integration/list');
    }

    it('should open and show table', () => {
        prep();
        cy.get('#integration-table').should('be.visible');
    });

    it('should contain correct columns', () => {
        prep();
        let tableHeaderTitles = [
            '',
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

        cy.get('#integration-table').within(() => {
            cy.get('thead tr th')
                .should('have.length', tableHeaderTitles.length)
                .each(($th, index) => {
                    expect($th.text().replace(/\s+/g, ' ').trim()).to.eq(tableHeaderTitles[index]);
                });
        });

        cy.get('#integration-table').find('tbody tr').should('have.length', 3); // forventet antall
    });

    it('should contain correct displayName', () => {
        prep();
        cy.wait('@getIntegrations');

        cy.get('#integration-table')
            .find('tbody tr')
            .first()
            .find('td')
            .eq(4)
            .should('have.text', 'Arkivsak');

    });

    it('should open panel', () => {
        prep();
        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.wait('@getConfigDrafts2');
        cy.wait('@getConfigCompleted2');

        cy.get('#integration-panel-container').should('be.visible');
        cy.get('label').should('contain.text', 'Aktiv konfigurasjon: ');
        cy.get('#integration-panel-container table').should('have.length', 2);
        cy.get('#integration-panel-container table')
            .first()
            .find('tbody tr')
            .should('have.length', 1);
        cy.get('#integration-panel-container table')
            .last()
            .find('tbody tr')
            .should('have.length', 3);
    });
});
