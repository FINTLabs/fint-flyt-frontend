describe('Testing support page', () => {
    beforeEach(() => {
        prep()
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/versjon');
        cy.wait('@getConfig')
    }

    it('should show version page', () => {
        cy.get('#support-content').should("be.visible")
    })
    it('should show header and 1 section', () => {
        cy.get('#support-information').should("be.visible")

    })

});