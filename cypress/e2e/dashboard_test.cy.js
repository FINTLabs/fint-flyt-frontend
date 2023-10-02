describe('Testing dashboard', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/integrasjoner', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/')
        cy.wait('@getConfig')
    }

    it('should show 4 dashboard cards', () => {
        prep()
        cy.get('#dashboard-card-container').children().should("have.length", 4)
    })

    it('should show datagrid', () => {
        prep()
        cy.get('.MuiDataGrid-root').should("be.visible")
    })

    it('should open new integration component on link click', () => {
        prep()
        cy.get('#dashboard-card-0-btn-0').click()
    })
    it('should open instance list component on link click', () => {
        prep()
        cy.get('#dashboard-card-1-btn-0').click()
    })
});