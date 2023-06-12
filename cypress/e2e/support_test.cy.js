describe('Testing support page', () => {
    beforeEach(() => {})

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.visit('/support');
        cy.wait('@getConfig')
    }

    it('should show support page', () => {
        prep()
    })
});