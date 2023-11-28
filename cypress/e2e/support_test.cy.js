describe('Testing support page', () => {
    beforeEach(() => {
        prep()
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/support');
        cy.wait('@getConfig')
    }

    it('should show support page', () => {
        cy.get('#support-content').should("be.visible")
    })
    it('should show header and 3 support sections', () => {
        cy.get('#support-header').should("be.visible")
        cy.get('#support-information').should("be.visible")
        cy.get('#support-faq').should("be.visible")
        cy.get('#support-contact').should("be.visible")
        cy.get('#support-content-stack').children().should("have.length", 4)

    })
    it('should open section on header click', () => {
            cy.get('#support-faq-header').click();
            cy.get(`#faq-list`).should('be.visible');
    })

    it('should navigate on user guide link click', () => {
        cy.get('#support-guide-link').click();
        cy.get('#user-guide-content').should("be.visible")
    })
});