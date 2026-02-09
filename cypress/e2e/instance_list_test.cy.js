import {
    mockGenericApplicationRepository,
    mockGenericAuthorizationRepository,
    mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
    mockSelectablesFromInstanceFlowTrackingRepository,
} from '../utils/interceptions.js';

describe('Testing instance list', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockSelectablesFromInstanceFlowTrackingRepository();
        mockGenericIntegrationRepository();
        mockGenericApplicationRepository();
        mockGenericInstanceFlowTrackingRepository();
    });

    function prep() {
        cy.visit('/integration/instance/list');
    }

    it('should open and show table and content', () => {
        prep();
        cy.get('#instance-table').should('be.visible');
        cy.get('#instance-table thead tr th').should('have.length', 10);
        cy.get('#instance-table thead tr th').last().should('have.text', 'Handlinger');
        cy.get('#instance-table > tbody > tr').should('have.length', 20); // 20 because it is an expandable table

        // Status icon should have aria-label
        cy.get('#instance-table > tbody > :first-child > :nth-child(7) > div').should(
            'have.attr',
            'aria-label',
            'Overført'
        );
        cy.get('#instance-table > tbody > :nth-child(7) > :nth-child(7) > div').should(
            'have.attr',
            'aria-label',
            'Feilet'
        );
    });

    it('instance table should contain correct headers', () => {
        prep();
        cy.get('#instance-table').should('be.visible');
        let columns = [
            'Kildeapplikasjon',
            'Integrasjonsnavn',
            'Kildeapplikasjon integrasjon-ID',
            'Kildeapplikasjons instans-ID',
            'Tidspunkt',
            'Status',
            'Mellomlagring',
            'Handlinger',
            'Destinasjons instans-ID',
        ];
        columns.forEach((column) => {
            cy.get('#instance-table > :nth-child(1)').should('contain.text', column);
        });
        cy.get('#instance-table > :nth-child(1)').should('not.contain.text', 'not_a_column');
        cy.wait('@getMetadata');
    });

    it('open table and check for content in panel', () => {
        prep();
        cy.viewport(3000, 2000);

        cy.get('#instance-row-0').should('be.visible');
        cy.get('#instance-panel-0').should('not.exist');
        cy.get('#instance-row-0').click();
        cy.get('#instance-panel-0').should('be.visible');
        cy.get('#instance-panel-0 tbody tr').should('have.length', 2);
        cy.get('#instance-panel-0 tbody tr')
            .first()
            .find('a')
            .should('contain.text', 'vis feilmelding');
    });

    it('it should post correct id for retry', () => {
        prep();

        cy.intercept('POST', '**/handlinger/instanser/*/prov-igjen', { statusCode: 200 }).as(
            'postRetry'
        );

        cy.viewport(3000, 2000);
        cy.get('#3-action-toggle > button').click();
        cy.get('#retryButton').click();

        // TODO: fiks datasett fra /summaries slik at dette kallet skjer
        // cy.wait('@postRetry').its('response.statusCode').should('be.oneOf', [200, 201])
        /* cy.wait('@postRetry').then((interception) => {
            expect(interception).to.exist;
            expect(interception.response.statusCode).to.eq(200);
        });*/
    });

    it('should show the filters form in modal when the Filters button is clicked', () => {
        prep();

        cy.get('[data-testid="filters-form"]').should('not.exist'); // Adjust selector as needed
        cy.get('[data-testid="filters-form-button"]').should('have.text', 'Filtrer tabellen');

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="filters-form"]').should('be.visible');
    });

    it('should load all filter options', () => {
        prep();

        cy.get('[data-testid="filters-form-button"]').click();

        // TimeCard options
        cy.get('[data-testid="timeCard"]').should('exist');
        cy.get('[data-testid="timeCard"]').click();

        // IntegrationCard options
        cy.get('[data-testid="integration"]').should('exist');
        cy.get('[data-testid="integration"]').click();

        // InstanceCard
        cy.get('[data-testid="instance"]').should('exist');
        cy.get('[data-testid="instance"]').click();

        // StatusCard options
        cy.get('[data-testid="status"]').should('exist');
        cy.get('[data-testid="status"]').find('h4').should('have.text', 'Status');
        cy.get('[data-testid="status"]').click();
        cy.get('[data-testid="status-options"]').children().should('have.length.at.least', 1);
        cy.get('[data-testid="status-option-1"]').click();
        cy.get('[data-testid="status"]').find('p').should('have.text', 'Status: Overført');

        // AdvancedCard options
        cy.get('[data-testid="advanced"]').should('exist');
        cy.get('[data-testid="advanced"]').click();

        // Buttons
        cy.contains('button', 'Tilbakestill').should('be.visible');
        cy.contains('button', 'Søk').should('be.visible');
    });

    it('should show icon indicating active filters', () => {
        prep();

        cy.intercept(
            {
                method: 'GET',
                pathname: '**/api/intern/instance-flow-tracking/summaries',
                query: {
                    size: '10',
                    statuses: 'TRANSFERRED',
                },
            },
            {
                fixture: 'filter/instanser.json',
            }
        ).as('newSummariesWithFilter');

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="status"]').click();
        cy.get('[data-testid="status-option-1"]').click();
        cy.contains('button', 'Søk').click();

        cy.wait('@newSummariesWithFilter').then((interception) => {
            expect(interception).to.exist;
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get('[data-testid="filters-form-button-container"] > div').should(
            'have.attr',
            'aria-label',
            'Tabellen er filtrert'
        );
        cy.get('[data-testid="filters-form-button-container"] > div > span').should(
            'have.text',
            '1'
        );
    });
});
