describe('Testing support page', () => {
    beforeEach(() => {
        prep()
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json'
        }).as('getConfig')
        cy.visit('/version');
        cy.wait('@getConfig')
    }

    it('should show version page', () => {
        cy.get('#version-content').should("be.visible")
    })
    it('should show header and 1 section', () => {
        cy.get('#version-information').should("be.visible")

    })

});