import {
    mockGenericApplicationRepository,
    mockGenericAuthorizationRepository, mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
} from '../utils/interceptions.js';

describe("Testing dashboard", () => {
	beforeEach(() => {
        mockGenericIntegrationRepository();
        mockGenericAuthorizationRepository();
        mockGenericApplicationRepository();
        mockGenericInstanceFlowTrackingRepository();
	});

	function prep() {
		cy.visit("/");
	}

    it('should show boxes with stats and text', () => {
        prep()
        cy.wait(1000)
        cy.get('#dashboard-grid > div').should('have.length', 7)
        cy.get('#dashboard-card-0-description').should('have.text', 'Under behandling');
        cy.get('#dashboard-card-0-btn').should('have.text', 'Se instansoversikt');
        cy.get('#dashboard-card-1-value').should('have.text', '4');
    });

    it('should show 0 if all stats is empty', () => {
        prep();
        cy.intercept('GET', '**/instance-flow-tracking/statistics/total', {
            fixture: 'totalEmpty.json',
        }).as('getTotalEmpty');
        cy.get('#dashboard-grid > div').each((element, index) => {
            cy.get(`#dashboard-card-${index}-value`).should('have.text', '0');
        });
    })

});