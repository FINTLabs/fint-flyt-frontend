describe('Testing Routes', () => {
        const links = ['/integration/configuration/new', '/integration/configuration/list', '/integration/instance/list', '/valueconverting', '/support']
        const pages = ['Ny', 'Integrasjoner', 'Instanser', 'Verdikonvertering', 'Hjelp og support']

        beforeEach(() => {
            cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
            cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
            cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
            cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
            cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        })

        function prep() {
            cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
            cy.visit('/');
            cy.wait('@getConfig')
        }

        it('should open all links', () => {
            prep()
            links.forEach(link => {
                cy.visit(link)
                cy.wait('@getConfig')

            })
        });

        it('should open all pages in navigation drawer on click', () => {
            prep()
            pages.forEach(page => {
                cy.contains(page).click()
            })
        });
    }
)
