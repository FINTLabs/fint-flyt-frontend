describe('Testing Routes', () => {
        const links = ['/', '/integration/configuration/new', '/integration/configuration/list', '/log', '/support']
        const pages = ['Ny integrasjon', 'Integrasjonsoversikt', 'Logg', 'Support']

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