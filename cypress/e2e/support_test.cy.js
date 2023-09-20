describe('Testing support page', () => {
    beforeEach(() => {
        prep()
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.visit('/support');
        cy.wait('@getConfig')
    }

    it('should show support page', () => {
        cy.get('#support-page').should("be.visible")
    })
    it('should show 5 support sections', () => {
        cy.get('#support-content').should("be.visible")
        cy.get('#accordion-container').children().should("have.length", 5)

    })
    it('should open section on header click', () => {
        for (let index = 0; index < 5; index++) {
            cy.get(`#accordion-${index}-header`).click();
            cy.get(`#accordion-${index}-details`).should('be.visible');
        }
    })

    it('should close section on header click', () => {
        cy.get(`#accordion-0-header`).click();
        cy.get(`#accordion-0-details`).should("be.visible");
        cy.get(`#accordion-0-header`).click();
        cy.get(`#accordion-0-details`).should("not.be.visible");
    })
});