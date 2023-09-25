// noinspection DuplicatedCode

describe('Testing create new integration', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/integrasjoner', { fixture: 'integration.json' }).as('postIntegration')
        cy.intercept('GET', '**/integrasjoner', { fixture: 'allIntegrations.json' }).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', { fixture: 'instansMetadata.json' }).as('getInstansMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.visit('/integration/new')
        cy.wait('@getConfig')
    }

    function fillAll() {
        cy.get('#sourceApplicationId').click()
        cy.get('.MuiList-root > [tabindex="-1"]').click()
        cy.get('#sourceApplicationIntegrationId').click()
        cy.get('#sourceApplicationIntegrationId-option-1').click()
        cy.get('#destination').click()
        cy.get('#menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root').click()
    }

    it('should open and show form', () => {
        prep()
        cy.get('#integration-form').should('be.visible')
    })

    it('should fill form', () => {
        prep()
        fillAll();
    })

    it('should not allow submit on incomplete form', () => {
        prep()
        cy.get('#sourceApplicationId').click()
        cy.get('.MuiList-root > [tabindex="-1"]').click()
        cy.get('#sourceApplicationIntegrationId').click()
        cy.get('#sourceApplicationIntegrationId-option-1').click()
        cy.get('#form-settings-confirm-btn').click()
        cy.get('#form-error-msg').should("be.visible")
    })

    it('should submit complete form and navigate to configuration form', () => {
        prep()
        fillAll()
        cy.get('#form-settings-confirm-btn').click()
        cy.wait('@postIntegration').its('request.body').should('deep.equal', {
            "sourceApplicationId":"2",
            "sourceApplicationIntegrationId":"sak",
            "destination":"fylkesrad",
            "state": "DEACTIVATED"
            }
        )
        cy.url().should('contain', '/configuration/new');
    })
});