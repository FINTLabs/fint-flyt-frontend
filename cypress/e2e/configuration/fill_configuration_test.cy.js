// noinspection DuplicatedCode
import {EXPECTED_MAPPING} from "../../fixtures/exectedMapping";

function fillAll() {
    cy.get('#sourceApplicationId').select('2')
    cy.get('#sourceApplicationIntegrationId').select('sak')
    cy.get('#destination').select('fylkesrad')
}

const newCaseFields = '#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey';
const newCaseClassificationFields = '#mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.klasse\\.elementMappings\\.0\\.valueMappingPerKey'
const recordFields = '#mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.valueMappingPerKey'
const correspondentFields = '#mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0\\.elementMapping\\.valueMappingPerKey'
const correspondentDndFields = '#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0\\.elementMapping\\.valueMappingPerKey'

function prep() {
    cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
    cy.intercept("GET", "**/authorization/me/is-authorized", {fixture: "auth.json"}).as("getAuth")
    cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
    cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
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

describe('Testing fill new configuration', () => {
    beforeEach(() => {

        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations', {
            fixture: 'historikk.json',
        }).as('getHistory');


        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration')
        cy.intercept('POST', '**/konfigurasjoner', {fixture: 'postFixture.json'}).as('postConfiguration')
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk')
        cy.intercept('GET', '**/arkiv/kodeverk/klasse?klassifikasjonssystemLink=https:%2F%2Fkodeverk.no%2Farkiv%2Fnoark%2Fsystemid%2FFJELL', {fixture: 'kodeverk/klasse.json'}).as('getKodeverkKlasse')
    })

    it('should fill configuration, text and dropdown', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('#column-0').should("be.visible")
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('test')
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString-option-2`).click()
        cy.get(`${newCaseFields}\\.administrativEnhet\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.administrativEnhet\\.mappingString-option-3`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.arkivdel\\.mappingString-option-4`).click()
        cy.get(`${newCaseFields}\\.saksansvarlig\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksansvarlig\\.mappingString-option-10`).click()
        cy.get(`${newCaseFields}\\.saksstatus\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksstatus\\.mappingString-option-5`).click()
        cy.get(`${newCaseFields}\\.tilgangsgruppe\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.tilgangsgruppe\\.mappingString-option-1`).click()
        cy.contains('button', 'Klassering').click();
        cy.get('#list-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.klasse\\.elementMappings > #add-icon').click()
        cy.get(`${newCaseClassificationFields}\\.rekkefolge\\.mappingString`).type('0')
        cy.get(`${newCaseClassificationFields}\\.klassifikasjonssystem\\.mappingString`).click()
        cy.get(`${newCaseClassificationFields}\\.klassifikasjonssystem\\.mappingString-option-2`).click()
        cy.get(`${newCaseClassificationFields}\\.klasseId\\.mappingString`).click()
        cy.get(`${newCaseClassificationFields}\\.klasseId\\.mappingString-option-3`).click()
        cy.contains('button', 'Journalposter').click();
        cy.get('#list-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings > #add-icon').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('journalpost tittel')
        cy.get(`${recordFields}\\.journalposttype\\.mappingString`).click()
        cy.get(`${recordFields}\\.journalposttype\\.mappingString-option-6`).click()
        cy.get(`${recordFields}\\.administrativEnhet\\.mappingString`).click()
        cy.get(`${recordFields}\\.administrativEnhet\\.mappingString-option-7`).click()
        cy.get(`${recordFields}\\.saksbehandler\\.mappingString`).click()
        cy.get(`${recordFields}\\.saksbehandler\\.mappingString-option-10`).click()
        cy.get(`${recordFields}\\.journalstatus\\.mappingString`).click()
        cy.get(`${recordFields}\\.journalstatus\\.mappingString-option-9`).click()
        cy.get(`${recordFields}\\.tilgangsgruppe\\.mappingString`).click()
        cy.get(`${recordFields}\\.tilgangsgruppe\\.mappingString-option-1`).click()

        cy.contains('button', 'Korrespondanseparter').click();
        cy.get('#list-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings > #add-icon').click()
        cy.get('#selectable-value-mapping-wrapper-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0 > .MuiButtonBase-root').click()
        cy.get('#list-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0\\.instanceCollectionReferencesOrdered > #add-icon').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0\\.instanceCollectionReferencesOrdered\\.0 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type("$if{saksparter}", {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');
        cy.get(`${correspondentFields}\\.korrespondanseparttype\\.mappingString`).click()
        cy.get(`${correspondentFields}\\.korrespondanseparttype\\.mappingString-option-4`).click()
        cy.get(`${correspondentDndFields}\\.organisasjonsnummer\\.mappingString > .MuiFormControl-root > .MuiInputBase-root`).type('$icf{0}{organisasjonsnummer}', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get(`${correspondentDndFields}\\.korrespondansepartNavn\\.mappingString > .MuiFormControl-root > .MuiInputBase-root`).type('$icf{0}{navn}', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get(`${correspondentDndFields}\\.kontaktperson\\.mappingString > .MuiFormControl-root > .MuiInputBase-root`).type('$icf{0}{navn}', {
            parseSpecialCharSequences: false,
            delay: 0
        })
        cy.get('#selectable-value-mapping-wrapper-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.korrespondansepart\\.fromCollectionMappings\\.0 > .MuiButtonBase-root').click()

        cy.contains('button', 'Dokumentbeskrivelser').click();
        cy.get('#list-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.dokumentbeskrivelse\\.elementMappings > #add-icon').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.dokumentbeskrivelse\\.elementMappings\\.0\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type("tittel");
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.dokumentbeskrivelse\\.elementMappings\\.0\\.valueMappingPerKey\\.dokumentstatus\\.mappingString').click()
        cy.get('#mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.dokumentbeskrivelse\\.elementMappings\\.0\\.valueMappingPerKey\\.dokumentstatus\\.mappingString-option-1').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.objectCollectionMappingPerKey\\.journalpost\\.elementMappings\\.0\\.objectCollectionMappingPerKey\\.dokumentbeskrivelse\\.elementMappings\\.0\\.valueMappingPerKey\\.dokumentstatus\\.mappingString > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type("$vc{1}$if{bnr}", {
            parseSpecialCharSequences: false,
            delay: 0
        }).type('{enter}');
        cy.get('#form-submit-btn').click()

        cy.wait('@postConfiguration').its('request.body').should('deep.equal', {
                completed: false,
                integrationId: null,
                integrationMetadataId: 4,
                mapping: EXPECTED_MAPPING
            }
        )
    });
})

describe('Testing fill, save and complete new configuration', () => {
    beforeEach(() => {

        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations', {
            fixture: 'historikk.json',
        }).as('getHistory');

        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration')
        cy.intercept('POST', '**/konfigurasjoner', {fixture: 'postFixture.json'}).as('postConfiguration')
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk')
    })

    it('should fill configuration and save draft', () => {
        prep()
        cy.get('#column-0').should("be.visible")
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('test')
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString-option-2`).click()
        cy.get('#form-submit-btn').click()
        cy.wait('@postConfiguration').its('request.body').should('deep.equal', {
                completed: false,
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
                                    "mappingString": "https://kodeverk.no/arkiv/noark/systemid/FJELL",
                                    "type": "STRING"
                                },
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
    });

    it('should show error on missing required fields on saving completed configuration', () => {
        prep()
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').type('test ferdigstilling', {delay: 0})
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString`).click()
        cy.get(`${newCaseFields}\\.saksmappetype\\.mappingString-option-2`).click()
        cy.get('#form-complete').click()
        cy.get('#form-submit-btn').click()
        cy.get('#string-value-component-comment > .MuiTypography-root').should("contain.text", "Kommentar er påkrevd ved ferdigstilling")
        cy.get('#comment').type('kommentar', {delay: 0})
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
                                    "mappingString": "https://kodeverk.no/arkiv/noark/systemid/FJELL",
                                    "type": "STRING"
                                },
                                "tittel": {"mappingString": "test ferdigstilling", "type": "DYNAMIC_STRING"}
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