describe('Testing Routes', () => {
        const links = ['/', '/integration/configuration/new', '/integration/configuration/list', '/integration/instance/list', '/valueconverting', '/support']
        const pages = ['Dashbord', 'Ny', 'Integrasjoner', 'Instanser', 'Verdikonvertering', 'Hjelp og support']

    beforeEach(() => {
        cy.intercept('GET', '**/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
    })

    it('should open all links', () => {
        cy.visit('/');
        cy.wait('@getConfig')
        links.forEach(link => {
                cy.visit(link)
                cy.wait('@getConfig')

        })
        });

        it('should open all pages in navigation drawer on click', () => {
            cy.visit('/');
            cy.wait('@getConfig')
            pages.forEach(page => {
                cy.contains(page).click()
            })
        });
    }
)
