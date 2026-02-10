import {
    mockGenericApplicationRepository,
    mockGenericAuthorizationRepository,
    mockGenericConfigurationRepository,
    mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
} from '../utils/interceptions.js';

describe('Testing integration list', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericApplicationRepository();
        mockGenericInstanceFlowTrackingRepository();
        mockGenericConfigurationRepository();


        // cy.intercept(
        //     'GET',
        //     '**/konfigurasjoner?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=1&ekskluderMapping=true',
        //     { fixture: 'configDrafts.json' }
        // ).as('getConfigDrafts');

        // cy.intercept(
        //     'GET',
        //     '**/konfigurasjoner?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=1&ekskluderMapping=true',
        //     { fixture: 'configCompleted.json' }
        // ).as('getConfigCompleted');

        // cy.intercept('GET', '**/konfigurasjoner/4?ekskluderMapping=true', {
        //     fixture: 'config.json',
        // }).as('getConfig');
    });

    function prep() {
        cy.visit('/integration/list');
    }

    it('should open and show table with correct columns', () => {
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
        cy.get('#integration-table').should('be.visible');

        cy.get('#integration-table').within(() => {
            cy.get('thead tr th')
                .should('have.length', tableHeaderTitles.length)
                .each(($th, index) => {
                    expect($th.text().replace(/\s+/g, ' ').trim()).to.eq(tableHeaderTitles[index]);
                });
        });

        cy.wait('@getIntegrations');
        cy.get('#integration-table tbody tr').should('have.length', 4);
    });

    it('should load and show stats', () => {
        prep();
        cy.get('#integration-table').should('be.visible');
        cy.wait('@getStatisticsForIntegrations');
        cy.get('#integration-table').within(() => {
            cy.get('tbody tr td');
        });
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
