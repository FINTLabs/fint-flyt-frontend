// noinspection DuplicatedCode

import { mockGenericAuthorizationRepository, mockGenericConfigurationRepository, mockGenericIntegrationRepository,
    mockGenericResourceRepository, mockGenericSourceApplicationRepository, mockGenericValueConvertingRepository
} from '../../utils/interceptions.js';

function fillAll() {
    cy.get('#sourceApplicationId').select('2')
    cy.get('#sourceApplicationIntegrationId').select('sak')
    cy.get('#destination').select('fylkesrad')
}

const newCaseFields = '#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey';

function prep() {
    cy.visit('/integration/new')
    fillAll()
    cy.get('#form-settings-confirm-btn').click()
    cy.wait('@postIntegration').its('request.body').should('deep.equal', {
            "sourceApplicationId": "2",
            "sourceApplicationIntegrationId": "sak",
            "destination": "fylkesrad",
            "state": "DEACTIVATED"
        }
    )
}

describe('Testing fill, validate and complete new configuration', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericResourceRepository();
        mockGenericValueConvertingRepository();
        mockGenericConfigurationRepository()
    })


    it('should show validation error on fields not meeting rules fields on saving completed configuration', () => {
        prep()
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('#toggle-panel-button').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('$if{test', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString-option-1`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString-option-0`).click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$if{feil}', {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$vc{1}$if{testy}', {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');
        cy.get('#comment').type('kommentar', {delay: 0})
        cy.get('#form-complete').click()
        cy.get('#form-submit-btn').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > #error-message').should("contain.text", "Feltet oppfyller ikke påkrevd format")
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('{backspace}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$vc{1}$if{ikke_feil}', {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');

        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').clear()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('$if{test}', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get('#form-submit-btn').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > #error-message').should("contain.text", "Feltet oppfyller ikke påkrevd format")
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('{backspace}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$if{testy}', {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');

        cy.get('#form-submit-btn').click()

        cy.wait('@postConfiguration').its('request.body').should('deep.equal', {
                comment: "kommentar",
                completed: true,
                integrationId: null,
                integrationMetadataId: 4,
                mapping: {
                    "objectCollectionMappingPerKey": {},
                    "objectMappingPerKey": {
                        "newCase": {
                            "objectCollectionMappingPerKey": {},
                            "objectMappingPerKey": {},
                            "valueCollectionMappingPerKey": {},
                            "valueMappingPerKey": {
                                "saksmappetype": {
                                    "mappingString": "$vc{1}$if{ikke_feil}",
                                    "type": "VALUE_CONVERTING"
                                },
                                "tittel": {"mappingString": "$if{test}", "type": "DYNAMIC_STRING"},
                                "arkivdel": {"mappingString": "$if{testy}", "type": "DYNAMIC_STRING"}
                            }
                        }
                    },
                    "valueCollectionMappingPerKey": {},
                    "valueMappingPerKey": {
                        "type": {
                            "mappingString": "NEW",
                            "type": "STRING"
                        }
                    }
                }
            }
        )
    })
});