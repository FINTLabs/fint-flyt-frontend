describe('Testing Routes', () => {
        const links = ['/', '/integration/configuration/new', '/integration/configuration/list', '/log', '/support']
        const pages = ['Ny integrasjon', 'Integrasjonsoversikt', 'Logg', 'Support']

    beforeEach(() => {
        cy.intercept(
            'GET', '**/integration/configuration', { fixture: 'configuration.json' })
            .as('getConfigurations')
        cy.intercept('GET', '**/api/kodeverk/administrativenhet', {fixture: 'administrativenhet.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/kodeverk/arkivdel', {fixture: 'arkivdel.json'}).as('getArchiveSection')
        cy.intercept('GET', '**/api/kodeverk/arkivressurs', {fixture: 'arkivressurs.json'}).as('getArchiveResources')
        cy.intercept('GET', '**/api/kodeverk/dokumentstatus', {fixture: 'dokumentstatus.json'}).as('getDocumentStatuses')
        cy.intercept('GET', '**/api/kodeverk/dokumenttype', {fixture: 'dokumenttype.json'}).as('getDocumentTypes')
        cy.intercept('GET', '**/api/kodeverk/journalstatus', {fixture: 'journalstatus.json'}).as('getJournalStatuses')
        cy.intercept('GET', '**/api/kodeverk/klassifikasjonssystem', {fixture: 'klassifikasjonssystem.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/kodeverk/sakstatus', {fixture: 'sakstatus.json'}).as('getStatuses')
        cy.intercept('GET', '**/api/kodeverk/skjermingshjemmel', {fixture: 'skjermingshjemmel.json'}).as('getParagraphs')
        cy.intercept('GET', '**/api/kodeverk/tilgangsrestriksjon', {fixture: 'tilgangrestriksjon.json'}).as('getAccessCodes')
        cy.intercept('GET', '**/api/kodeverk/variantformat', {fixture: 'variantformat.json'}).as('getVariants')
    })


    it('should open all links', () => {
            links.forEach(link => {
                cy.visit(link)
            })
        });

        it('should open all pages in navigation drawer on click', () => {
            cy.intercept('GET', '/configuration', {fixture: 'configuration.json'})
            cy.visit('/');
            pages.forEach(page => {
                cy.contains(page).click()
            })
            cy.visit('/')
        });
    }
)
