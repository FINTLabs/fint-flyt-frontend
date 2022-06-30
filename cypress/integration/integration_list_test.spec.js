describe('Testing integration list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/integration/configuration', { fixture: 'configuration.json' }).as('getConfigurations')
        cy.intercept('GET', '**/api/intern/kodeverk/administrativenhet', {fixture: 'administrativenhet.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/intern/kodeverk/arkivdel', {fixture: 'arkivdel.json'}).as('getArchiveSection')
        cy.intercept('GET', '**/api/intern/kodeverk/arkivressurs', {fixture: 'arkivressurs.json'}).as('getArchiveResources')
        cy.intercept('GET', '**/api/intern/kodeverk/dokumentstatus', {fixture: 'dokumentstatus.json'}).as('getDocumentStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/dokumenttype', {fixture: 'dokumenttype.json'}).as('getDocumentTypes')
        cy.intercept('GET', '**/api/intern/kodeverk/journalstatus', {fixture: 'journalstatus.json'}).as('getJournalStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/klassifikasjonssystem', {fixture: 'klassifikasjonssystem.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/intern/kodeverk/sakstatus', {fixture: 'sakstatus.json'}).as('getStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/skjermingshjemmel', {fixture: 'skjermingshjemmel.json'}).as('getParagraphs')
        cy.intercept('GET', '**/api/intern/kodeverk/tilgangsrestriksjon', {fixture: 'tilgangrestriksjon.json'}).as('getAccessCodes')
        cy.intercept('GET', '**/api/intern/kodeverk/variantformat', {fixture: 'variantformat.json'}).as('getVariants')
    })

    it('should open and show table', () => {
        cy.visit('/integration/configuration/list')
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should contain correct colunms', () => {
        let columns = ['Skjemaleverandør', 'Skjema', 'Navn', 'Beskrivelse', 'Ferdigstilt', 'Revisjon']
        columns.forEach(column => {
            cy.get('.MuiDataGrid-root').should("contain.text", column)
        })
        cy.get('.MuiDataGrid-root').should("not.contain.text", 'not_a_column')

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
