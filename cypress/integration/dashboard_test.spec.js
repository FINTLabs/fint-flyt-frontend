describe('Testing dashboard', () => {
    before(() => {
        cy.intercept(
            'GET', '**/integration/configuration', { fixture: 'configuration.json' })
            .as('getConfigurations')
    })

    it('should open', () => {
        cy.visit('/')
    })
});