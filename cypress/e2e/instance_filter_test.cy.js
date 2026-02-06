import {
    mockGenericApplicationRepository,
    mockGenericAuthorizationRepository,
    mockGenericIntegrationRepository,
    mockSelectablesFromInstanceFlowTrackingRepository,
} from '../utils/interceptions.js';

describe('Testing instance list', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockSelectablesFromInstanceFlowTrackingRepository();
        mockGenericIntegrationRepository();
        mockGenericApplicationRepository();
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

    it('should show the filters form in modal when the Filters button is clicked', () => {
        prep();

        // Assert that the filters form is initially hidden and the button exists
        cy.get('[data-testid="filters-form"]').should('not.exist'); // Adjust selector as needed
        cy.get('[data-testid="filters-form-button"]').should('have.text', 'Filtrer tabellen');

        // Click the Filters button
        cy.get('[data-testid="filters-form-button"]').click();
        // Assert that the filters form is now visible
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
            'GET',
            '**/api/intern/instance-flow-tracking/summaries?size=10&statuses=TRANSFERRED',
            {
                fixture: 'filter/instanser.json',
            }
        ).as('newSummariesWithFilter');

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="status"]').click();
        cy.get('[data-testid="status-option-1"]').click();
        cy.contains('button', 'Søk').click();

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
