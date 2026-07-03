import {
    mockGenericAuthorizationRepository,
    mockGenericConfigurationRepository,
    mockGenericInstanceFlowTrackingRepository,
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

describe('Testing create new configuration from new integration', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericValueConvertingRepository();
        mockGenericResourceRepository();
    });

    function prep() {
        cy.visit('/integration/new');
        fillAll();
        cy.get('#form-settings-confirm-btn').click();
        cy.wait('@postIntegration').its('request.body').should('deep.equal', {
            sourceApplicationId: '2',
            sourceApplicationIntegrationId: 'sak',
            destination: 'fylkesrad',
            state: 'DEACTIVATED',
        });
    }

    it('should navigate to configuration form and show outgoing and incoming data', () => {
        prep();
        cy.url().should('contain', '/configuration/new');
        cy.get('#incoming-form-panel').should('be.visible');
        cy.get('#metadata-content-panel').should('be.visible');
        cy.get('#value-converting-panel').should('be.visible');
        cy.get('#outgoing-form-panel').should('be.visible');

        cy.get('#metadata-content-panel #metadata-content').children().should('have.length', 16);
    });

    it('should open panels in outgoing data', () => {
        prep();
        cy.get('#column-0').should('be.visible');
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click();
        cy.get(
            '#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
        ).type('{enter}');
        cy.get('#toggle-panel-button').click();
        cy.get('#column-1').should('be.visible');
        cy.get('#column-1').should('contain', 'Sak');
    });
});

describe('Testing creating new and editing configurations from integration overview', () => {
    function prep() {
        cy.visit('/integration/list');
    }

    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericValueConvertingRepository();
        mockGenericResourceRepository();
        mockGenericInstanceFlowTrackingRepository();
        mockGenericConfigurationRepository();
    });

    it('should navigate to create new blank configuration form', () => {
        prep();
        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.get('#panel-1-new-configuration-button').click();
    });

    it('should navigate to create new configuration based on existing completed version', () => {
        prep();

        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();

        cy.get('#completed-config-table #panel-1-action-toggle > button').click();
        cy.get('[data-testid="action-menu-content"]')
            .find('[data-testid="create-new-based-on-configuration"]')
            .click();

        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click();
        cy.get(
            '#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
        ).type('{enter}');
        cy.get('#toggle-panel-button').click();
        cy.get(
            '#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root'
        ).should('contain.text', 'test basert på');
    });

    it('should navigate to edit existing configuration draft', () => {
        prep();
        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.get('#draft-config-table #panel-1-action-toggle > button').first().click();
        cy.get('[data-testid="action-menu-content"]').find('[data-testid="edit-draft"]').click();
        cy.get('#comment').should('contain.text', 'rediger denne konfig');
    });
});
