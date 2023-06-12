// noinspection DuplicatedCode

describe('Testing integration list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadata.json' }).as('getMetadata')
    })

    it('should open and show table', () => {
        cy.visit('/integration/list')
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should contain correct colunms', () => {
        cy.visit('/integration/list')
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
