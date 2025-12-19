describe('Testing Routes', () => {
    const links = [
        '/integration/configuration/list',
        '/integration/instance/list',
        '/valueconverting',
        '/version',
    ];
    const pages = ['Integrasjoner', 'Instanser', 'Verdikonvertering', 'Versjon'];

    const allPages = [
        { linkName: 'dashboard', displayName: 'Dashbord' },
        { linkName: 'integrations', displayName: 'Integrasjoner' },
        { linkName: 'instances', displayName: 'Instanser' },
        { linkName: 'valueConverting', displayName: 'Verdikonvertering' },
        { linkName: 'version', displayName: 'Versjon' },
        { linkName: 'useraccess', displayName: 'Brukertilgang' },
    ];

    beforeEach(() => {
        cy.intercept(
            'GET',
            '**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC',
            { fixture: 'integrations.json' }
        ).as('getIntegrations');
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', {
            fixture: 'historikk.json',
        }).as('getHistory');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {
            fixture: 'metadataLatest.json',
        }).as('getLatestMetadata');
        cy.intercept(
            'GET',
            '**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true',
            { fixture: 'hendelser.json' }
        ).as('getHendelser');
        cy.intercept(
            'GET',
            '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true',
            { fixture: 'valueconverting/valueconvertings.json' }
        ).as('getValueconvertings');
    });

    function prep() {
        cy.intercept('GET', '**/authorization/me', { fixture: 'me.json' }).as('getMe');
        cy.intercept('GET', '**/authorization/me/is-authorized', {
            fixture: 'auth.json',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).as('getAuth');
        cy.intercept('GET', '**/authorization/me/restricted-page-authorization', {
            userPermissionPage: true,
        }).as('getUserPermissionsPage');
        cy.intercept('GET', '**/authorization/users?page=0&size=10', { fixture: 'users.json' }).as(
            'getUsersPermissions'
        );
        cy.visit('/');
    }

    /*	it("should open all links", () => {
		prep();
		links.forEach((link) => {
			cy.visit(link);
		});
	});*/

    it('should open all pages in navigation drawer on click', () => {
        prep();
        /*        pages.forEach((page) => {
            cy.contains(page).click();
        });*/
        /*        allPages.forEach((page) => {
            const testId = `appbar-link-${page.name}`;
            cy.get('[data-testid=testId]').should('have.text', page.displayName);
        });*/

        // appbar-link-dashboard

        cy.wrap(allPages).each((page) => {
            const testId = `appbar-link-${page.linkName}`;
            cy.get(`[data-testid="${testId}"]`)
                .should('exist') // sjekker at elementet finnes
                .and('have.text', page.displayName); // sjekker at teksten stemmer
        });
    });
});
