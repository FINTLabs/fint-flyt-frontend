// noinspection DuplicatedCode

describe('Testing integration list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/integrasjoner', { fixture: 'allIntegrations.json' }).as('getAllIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadata.json' }).as('getMetadata')
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/integration/list')
        cy.wait('@getConfig')
    }

    it('should open and show table', () => {
        prep()
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should contain correct colunms', () => {
        prep()
        let columns = [
            'Vis',
            'Kildeapplikasjon',
            'Kildeapplikasjons integrasjons-ID',
            'Integrasjonsnavn',
            'Destinasjon/base',
            'Tilstand',
            'Antall arkiverte instanser',
            'Antall gjeldende feil'
        ]
        columns.forEach(column => {
            cy.get('.MuiDataGrid-root').should("contain.text", column)
        })
        cy.get('.MuiDataGrid-root').should("not.contain.text", 'not_a_column')

    })
});
