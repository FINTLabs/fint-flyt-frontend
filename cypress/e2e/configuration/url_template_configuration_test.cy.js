import {
    mockGenericAuthorizationRepository,
    mockGenericConfigurationRepository,
    mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
    mockGenericResourceRepository,
    mockGenericSourceApplicationRepository,
    mockGenericValueConvertingRepository,
} from '../../utils/interceptions.js';

const newCaseFields = '#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey';
const saksmappetypeField = `${newCaseFields}\\.saksmappetype\\.mappingString`;
const saksmappetypeName =
    'mapping.objectMappingPerKey.newCase.valueMappingPerKey.saksmappetype.mappingString';
const saksansvarligField = `${newCaseFields}\\.saksansvarlig\\.mappingString`;
const saksansvarligName =
    'mapping.objectMappingPerKey.newCase.valueMappingPerKey.saksansvarlig.mappingString';

function navigateToNewConfiguration() {
    cy.intercept('POST', '**/integrasjoner', { fixture: 'postFixture.json' }).as('postIntegration');
    cy.visit('/integration/new');
    cy.get('#sourceApplicationId').select('2');
    cy.get('#sourceApplicationIntegrationId').select('sak');
    cy.get('#form-settings-confirm-btn').click();
    cy.wait('@postIntegration');
}

function openNewCasePanel() {
    cy.viewport(3000, 2000);
    cy.get('#column-0').should('be.visible');
    cy.get('#toggle-panel-button').click();
}

describe('URL template in configuration', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericInstanceFlowTrackingRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericValueConvertingRepository();
        mockGenericConfigurationRepository();
    });

    describe('without referenceTemplate', () => {
        beforeEach(() => {
            mockGenericResourceRepository();
        });

        it('should not show URL-mal option or UrlTemplateBuilder', () => {
            navigateToNewConfiguration();
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`).should('be.visible');
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'URL-mal')
                .should('not.exist');
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Egendefinert verdi')
                .should('be.visible');

            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Fjellnettverkett')
                .click();

            cy.get(`[id="url-template-builder-${saksmappetypeName}"]`).should('not.exist');
        });
    });

    describe('with referenceTemplate', () => {
        beforeEach(() => {
            mockGenericResourceRepository();
            cy.intercept(
                { method: 'GET', pathname: '**/api/intern/arkiv/template' },
                { fixture: 'arkiv/templateWithUrlTemplateReferences.json' }
            ).as('getArchiveTemplateWithReferences');
        });

        it('should show URL-mal and open editable UrlTemplateBuilder', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'URL-mal')
                .should('be.visible')
                .click();

            cy.get(`[id="url-template-builder-${saksmappetypeName}"]`).should('be.visible');
            cy.get(`[id="${saksmappetypeName}-identifier-value"]`)
                .should('be.enabled')
                .should('have.value', '');
            cy.get(`[data-testid="${saksmappetypeName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/kodeverk/saksmappetype/systemid/'
            );

            cy.get(`[id="${saksmappetypeName}-identifier-value"]`).type('FJELL');
            cy.get(`[data-testid="${saksmappetypeName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/kodeverk/saksmappetype/systemid/FJELL'
            );
        });

        it('should parse identifier type and value when selecting a fetched option', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Fjellnettverkett')
                .click();

            cy.get(`[id="url-template-builder-${saksmappetypeName}"]`).should('be.visible');
            cy.get(`[id="${saksmappetypeName}-identifier-value"]`)
                .should('be.disabled')
                .should('have.value', 'FJELL');
            cy.get(`[data-testid="${saksmappetypeName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/kodeverk/saksmappetype/systemid/FJELL'
            );
        });

        it('should offer multiple identifier types when template defines them', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksansvarligField).click();
            cy.get(`${saksansvarligField}-filtered-options`)
                .contains('[role="option"]', 'URL-mal')
                .click();

            cy.get(`[id="url-template-builder-${saksansvarligName}"]`).should('be.visible');
            cy.get(`[id="${saksansvarligName}-identifier-type"]`).click();
            cy.get(`[id="${saksansvarligName}-identifier-type-filtered-options"]`)
                .contains('[role="option"]', 'systemid')
                .should('be.visible');
            cy.get(`[id="${saksansvarligName}-identifier-type-filtered-options"]`)
                .contains('[role="option"]', 'kildesystemid')
                .should('be.visible')
                .click();

            cy.get(`[data-testid="${saksansvarligName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/noark/arkivressurs/kildesystemid/'
            );
        });
    });
});
