import {
    mockGenericAuthorizationRepository,
    mockGenericIntegrationRepository,
    mockGenericResourceRepository,
    mockGenericSourceApplicationRepository,
    mockGenericValueConvertingRepository,
} from '../../utils/interceptions.js';

function fillAll() {
    cy.get('#sourceApplicationId').select('2');
    cy.get('#sourceApplicationIntegrationId').select('sak');
    cy.get('#destination').select('fylkesrad');
}

function navigateToNewConfiguration() {
    cy.visit('/integration/new');
    fillAll();
    cy.get('#form-settings-confirm-btn').click();
    cy.wait('@postIntegration');
}

describe('Archive template endpoint', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericValueConvertingRepository();
        mockGenericResourceRepository();
    });

    it('should fetch archive template and render outgoing mapping form', () => {
        navigateToNewConfiguration();

        cy.wait('@getArchiveTemplate').its('response.statusCode').should('eq', 200);
        cy.get('#configuration-mapping-wrapper').should('be.visible');
        cy.get('#column-0').should('be.visible');
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').should('exist');
    });

    it('should show error when archive template request fails', () => {
        cy.intercept('GET', '**/api/intern/arkiv/template', {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('getArchiveTemplateError');

        navigateToNewConfiguration();

        cy.wait('@getArchiveTemplateError');
        cy.get('#outgoing-form-panel').should('contain.text', 'Det har oppstått en feil');
        cy.get('#configuration-mapping-wrapper').should('not.exist');
    });
});
