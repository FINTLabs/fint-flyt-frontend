// noinspection DuplicatedCode
function fillAll() {
    cy.get('#sourceApplicationId').click()
    cy.get('.MuiList-root > [tabindex="-1"]').click()
    cy.get('#sourceApplicationIntegrationId').click()
    cy.get('#sourceApplicationIntegrationId-option-1').click()
    cy.get('#destination').click()
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root').click()
}

function prep() {
    cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
    cy.visit('/integration/new')
    cy.wait('@getConfig')
    fillAll()
    cy.get('#form-settings-confirm-btn').click()
    cy.wait('@postIntegration').its('request.body').should('deep.equal', {
            "sourceApplicationId":"2",
            "sourceApplicationIntegrationId":"sak",
            "destination":"fylkesrad",
            "state": "DEACTIVATED"
        }
    )
}

describe('Testing fill new configuration', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/integrasjoner', { fixture: 'postFixture.json' }).as('postIntegration')
        cy.intercept('POST', '**/konfigurasjoner', { fixture: 'postFixture.json' }).as('postConfiguration')
        cy.intercept('GET', '**/integrasjoner', { fixture: 'allIntegrations.json' }).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', { fixture: 'instansMetadata.json' }).as('getInstansMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', { fixture: 'kodeverk/mock.json' }).as('getKodeverk')
    })

    it('should fill configuration, text and dropdown', () => {
        prep()
        cy.get('#column-0').should("be.visible")
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('test')
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString').click()
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksmappetype\\.mappingString-option-2').click()
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString').click()
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.arkivdel\\.mappingString-option-4').click()
        cy.get('#form-submit-btn').click()
        cy.wait('@postConfiguration').its('request.body').should('deep.equal', {
                completed: false,
                integrationId: null,
                integrationMetadataId: 4,
                mapping: {
                    "objectCollectionMappingPerKey":{},
                    "objectMappingPerKey": {
                        "newCase": {
                            "objectCollectionMappingPerKey" : {},
                            "objectMappingPerKey": {},
                            "valueCollectionMappingPerKey": {},
                            "valueMappingPerKey": {
                                "arkivdel": {"mappingString": "https://beta.felleskomponent.no/arkiv/noark/systemid/OPPL", "type": "STRING" },
                                "saksmappetype": {"mappingString": "https://beta.felleskomponent.no/arkiv/noark/systemid/FJELL", "type": "STRING"},
                                "tittel": {"mappingString": "test", "type": "DYNAMIC_STRING"}
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
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksstatus\\.mappingString').click()
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.saksstatus\\.mappingString-option-6').click()
        cy.get('#form-complete').click()
        cy.get('#form-submit-btn').click()
        cy.get('#string-value-component-comment > .MuiTypography-root').should("contain.text", "Kommentar er påkrevd ved ferdigstilling")
        cy.get('#comment').type('kommentar')
        cy.get('#form-submit-btn').click()
        cy.wait('@postConfiguration').its('request.body').should('deep.equal', {
                comment: "kommentar",
                completed: true,
                integrationId: null,
                integrationMetadataId: 4,
                mapping: {
                    "objectCollectionMappingPerKey":{},
                    "objectMappingPerKey": {
                        "newCase": {
                            "objectCollectionMappingPerKey" : {},
                            "objectMappingPerKey": {},
                            "valueCollectionMappingPerKey": {},
                            "valueMappingPerKey": {
                                "arkivdel": {"mappingString": "https://beta.felleskomponent.no/arkiv/noark/systemid/OPPL", "type": "STRING" },
                                "saksmappetype": {"mappingString": "https://beta.felleskomponent.no/arkiv/noark/systemid/FJELL", "type": "STRING"},
                                "saksstatus": {"mappingString": "https://beta.felleskomponent.no/arkiv/noark/systemid/MU", "type": "STRING"},
                                "tittel": {"mappingString": "test", "type": "DYNAMIC_STRING"}
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