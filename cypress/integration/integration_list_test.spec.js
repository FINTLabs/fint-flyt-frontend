describe('Testing dashboard', () => {
    beforeEach(() => {
        cy.intercept(
            'GET', '**/integration/configuration', { fixture: 'configuration.json' })
            .as('getConfigurations')
    })

    it('should open and show table', () => {
        cy.visit('/integration/configuration/list')
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should show details on row double click', () => {
        cy.intercept('GET', '**/integration/configuration/7ac4b75a-9e0a-463a-b12c-b44d71b749fe/2', { fixture: 'configuration1.json' }).as('getConfigurationDetails')
        cy.get('.MuiDataGrid-row > [data-field="sourceApplication"]').dblclick()
        cy.get('.MuiBreadcrumbs-ol').should('contain', 'Konfigurasjonsdetaljer')
    })

    it('should show correct details', () => {
        cy.get('#details-id').should('contain', '7ac4b75a-9e0a-463a-b12c-b44d71b749fe')
    })
});