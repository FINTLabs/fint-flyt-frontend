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

        it('should not show reference with ID option or UrlTemplateBuilder', () => {
            navigateToNewConfiguration();
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`).should('be.visible');
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Sett sammen referanse med ID')
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
            // IDs must follow referenceTemplate path (.../saksmappetype/{type}/{value}),
            // unlike the generic kodeverk mock which uses /arkiv/noark/systemid/...
            cy.intercept(
                { method: 'GET', pathname: '**/arkiv/kodeverk/saksmappetype' },
                { fixture: 'kodeverk/saksmappetype.json' }
            ).as('getSaksmappetype');
        });

        it('should show reference with ID and open editable UrlTemplateBuilder', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Sett sammen referanse med ID')
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

        it('should not show UrlTemplateBuilder when selected option does not match referenceTemplate', () => {
            cy.intercept(
                { method: 'GET', pathname: '**/arkiv/kodeverk/saksmappetype' },
                { fixture: 'kodeverk/saksmappetypeNonMatching.json' }
            ).as('getSaksmappetypeNonMatching');

            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksmappetypeField).click();
            cy.get(`${saksmappetypeField}-filtered-options`)
                .contains('[role="option"]', 'Fjellnettverkett')
                .click();

            cy.get(`[id="url-template-builder-${saksmappetypeName}"]`).should('not.exist');
            cy.get(`[data-testid="${saksmappetypeName}-url-preview"]`).should('not.exist');
        });

        it('should offer multiple identifier types when template defines them', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksansvarligField).click();
            cy.get(`${saksansvarligField}-filtered-options`)
                .contains('[role="option"]', 'Sett sammen referanse med ID')
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

            cy.get(`[id="url-template-builder-${saksansvarligName}"]`)
                .find('[data-testid="error-message"]')
                .should('not.exist');
        });

        it('should submit the full referenceTemplate URL with selected identifiers', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksansvarligField).click();
            cy.get(`${saksansvarligField}-filtered-options`)
                .contains('[role="option"]', 'Sett sammen referanse med ID')
                .click();

            cy.get(`[id="url-template-builder-${saksansvarligName}"]`).should('be.visible');
            cy.get(`[id="${saksansvarligName}-identifier-value"]`).type('test123');
            cy.get(`[data-testid="${saksansvarligName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/noark/arkivressurs/systemid/test123'
            );

            cy.get('#form-submit-btn').click();

            cy.wait('@postConfiguration').then((interception) => {
                expect(interception.request.body).to.deep.include({
                    completed: false,
                    integrationId: null,
                    integrationMetadataId: 4,
                });
                expect(
                    interception.request.body.mapping.objectMappingPerKey.newCase.valueMappingPerKey
                        .saksansvarlig
                ).to.deep.equal({
                    mappingString:
                        'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/systemid/test123',
                    type: 'STRING',
                });
            });
        });

        it('should show error when identifier value is missing', () => {
            navigateToNewConfiguration();
            cy.wait('@getArchiveTemplateWithReferences');
            openNewCasePanel();

            cy.get(saksansvarligField).click();
            cy.get(`${saksansvarligField}-filtered-options`)
                .contains('[role="option"]', 'Sett sammen referanse med ID')
                .click();

            cy.get(`[id="url-template-builder-${saksansvarligName}"]`).should('be.visible');
            cy.get(`[data-testid="${saksansvarligName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/noark/arkivressurs/systemid/'
            );

            cy.get(`[id="${saksansvarligName}-identifier-value"]`).should('have.value', '');
            cy.get('#form-submit-btn').click();
            cy.get(`[id="url-template-builder-${saksansvarligName}"]`)
                .find('[data-testid="error-message"]')
                .should('contain.text', 'Feltet oppfyller ikke påkrevd format');
            cy.get('@postConfiguration.all').should('have.length', 0);

            cy.get(`[id="${saksansvarligName}-identifier-value"]`).type('test123');
            cy.get(`[data-testid="${saksansvarligName}-url-preview"]`).should(
                'contain.text',
                '/arkiv/noark/arkivressurs/systemid/test123'
            );

            cy.get(`[id="url-template-builder-${saksansvarligName}"]`)
                .find('[data-testid="error-message"]')
                .should('not.exist');
        });
    });
});
