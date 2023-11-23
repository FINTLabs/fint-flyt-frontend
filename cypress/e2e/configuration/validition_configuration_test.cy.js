// noinspection DuplicatedCode

function fillAll() {
    cy.get('#sourceApplicationId').click()
    cy.get('#sourceApplication-1').click()
    cy.get('#sourceApplicationIntegrationId').click()
    cy.get('#sourceApplicationIntegrationId-option-1').click()
    cy.get('#destination').click()
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root').click()
}

const newCaseFields = '#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey';

function prep() {
    cy.intercept('GET', '**/api/application/configuration', {
        forceNetworkError: true,
        fixture: 'basepathConfig.json'
    }).as('getConfig')
    cy.visit('/integration/new')
    cy.wait('@getConfig')
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
        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration')
        cy.intercept('POST', '**/konfigurasjoner', {fixture: 'postFixture.json'}).as('postConfiguration')
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', {fixture: 'historikk.json'}).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', {fixture: 'hendelser.json'}).as('getHendelser')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk')
    })


    it('should show validation error on fields not meeting rules fields on saving completed configuration', () => {
        prep()
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('$if{test', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString-option-1`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString-option-0`).click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$if{feil}', {parseSpecialCharSequences: false, delay: 0}).type('{enter}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$vc{1}$if{testy}', {parseSpecialCharSequences: false, delay: 0}).type('{enter}');
        cy.get('#comment').type('kommentar', {delay: 0})
        cy.get('#form-complete').click()
        cy.get('#form-submit-btn').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiTypography-root').should("contain.text", "Feltet oppfyller ikke påkrevd format")
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('{backspace}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$vc{1}$if{ikke_feil}', {parseSpecialCharSequences: false, delay: 0}).type('{enter}');

        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').clear()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('$if{test}', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get('#form-submit-btn').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiTypography-root').should("contain.text", "Feltet oppfyller ikke påkrevd format")
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('{backspace}');
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('$if{testy}', {parseSpecialCharSequences: false, delay: 0}).type('{enter}');

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