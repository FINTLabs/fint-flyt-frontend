describe('Testing instance list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.visit('/integration/instance/list')
    })

    it('should open and show table', () => {
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should contain correct colunms', () => {
        let columns = ['Kildeapplikasjon', 'Kildeapplikasjons integrasjons-ID', 'Integrasjonsnavn', 'Kildeapplikasjons instans-ID', 'Konfigurasjon ID', 'Arkivsak ID', 'Tidspunkt', 'Status', 'Detaljer', 'Handlinger']
        columns.forEach(column => {
            cy.get('.MuiDataGrid-root').should("contain.text", column)
        })
        cy.get('.MuiDataGrid-root').should("not.contain.text", 'not_a_column')
    })
});
