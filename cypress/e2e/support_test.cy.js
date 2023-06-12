describe('Testing support page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.visit('/')
    })

    it('should show value converting page', () => {
        cy.visit('/support')
    })
});