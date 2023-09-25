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
    cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
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
describe('Testing create new configuration', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/integrasjoner', { fixture: 'integration.json' }).as('postIntegration')
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

    it.skip('should navigate to configuration form and show outgoing and incoming data', () => {
        prep()
        cy.url().should('contain', '/configuration/new');
        cy.get('#incoming-form-panel').should("be.visible")
        cy.get('#metadata-content-panel').should("be.visible")
        cy.get('#value-converting-panel').should("be.visible")
        cy.get('#outgoing-form-panel').should("be.visible")

        cy.get('[id^="tag-"]').should('have.length', 16);
        cy.get('[id^="vc-tag-"]').should('have.length', 2);
    })

    it('should open panels in outgoing data', () => {
        prep()
        cy.get('#column-0').should("be.visible")
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#column-1').should("be.visible")
        cy.get('#column-1').should('contain', 'Sak');
    })
});