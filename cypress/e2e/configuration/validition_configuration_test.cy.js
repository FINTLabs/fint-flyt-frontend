// noinspection DuplicatedCode

function fillAll() {
    cy.get('#sourceApplicationId').select('2')
    cy.get('#sourceApplicationIntegrationId').select('sak')
    cy.get('#destination').select('fylkesrad')
}

const newCaseFields = '#mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey';

function prep() {
    cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
    cy.intercept('GET', '**/authorization/me/is-authorized', {
        fixture: 'auth.json',
        headers: {
            'Content-Type': 'text/plain',
        },
    }).as('getAuth');    cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
    cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")

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
        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration')
        cy.intercept('POST', '**/konfigurasjoner', {fixture: 'postFixture.json'}).as('postConfiguration')
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', {fixture: 'historikk.json'}).as('getHistory')
        cy.intercept('GET', '**/integrasjoner?sourceApplicationId=*', {fixture: 'integrationForSource2.json'}).as('getAllIntegrationBySourceApplicationId')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonIds=*&bareSisteVersjoner=*', {
            fixture: 'metadataBySourceApplication.json',
        }).as('getMetadata');
        cy.intercept('GET', '**/metadata/4/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', {fixture: 'hendelser.json'}).as('getHendelser')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk')
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