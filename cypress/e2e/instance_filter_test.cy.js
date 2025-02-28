describe('Testing instance list', () => {
    beforeEach(() => {
        const intercepts = [
            {
                method: 'GET',
                url: '/api/intern/instance-flow-tracking/summaries?size=10',
                fixture: 'filter/instanser.json',
                alias: 'newSummaries',
            },
            {
                method: 'GET',
                url: '/api/intern/instance-flow-tracking/summaries?size=10',
                fixture: 'filter/instanser.json',
                alias: 'newSummaries',
            },
            {
                method: 'GET',
                url: '/api/intern/instance-flow-tracking/value-space/instance-status/selectables',
                fixture: 'filter/instance-status.json',
                alias: 'newSummaries',
            },
        ];

        intercepts.forEach(({ method, url, fixture, response, alias }) => {
            if (fixture) {
                cy.intercept(method, url, { fixture }).as(alias);
            } else {
                cy.intercept(method, url, response).as(alias);
            }
        });
    });

    function prep() {
        cy.intercept('GET', '**/authorization/me', { fixture: 'me.json' }).as('getMe');
        cy.intercept('GET', '**/authorization/me/is-authorized', { fixture: 'auth.json' }).as(
            'getAuth'
        );
        cy.intercept('GET', '**/authorization/me/restricted-page-authorization', {
            userPermissionPage: true,
        }).as('getUserPermissionsPage');
        cy.intercept('GET', '**/authorization/users?page=0&size=10', { fixture: 'users.json' }).as(
            'getUsersPermissions'
        );
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json',
        }).as('getConfig');
        cy.visit('/integration/instance/list');
        cy.wait('@getConfig');
    }

    it('should open and show table', () => {
        prep();
        cy.get('#instances-content-stack > :nth-child(2)').should('be.visible');
    });

    it('should show the filters form when the Filters button is clicked', () => {
        prep();

        // Assert that the filters form is initially hidden
        cy.get('[data-testid="filters-form"]').should('not.exist'); // Adjust selector as needed

        // Click the Filters button
        cy.contains('button', 'Filters').click();

        // Assert that the filters form is now visible
        cy.get('[data-testid="filters-form"]').should('be.visible');
    });

    it('should load all filter options', () => {
        prep();
        cy.contains('button', 'Filters').click();

        //Sorting options
        cy.get('[data-testid="sortSelect"]').should('exist');
        // TimeCard options
        cy.get('[data-testid="timeCard"]').should('exist').click();
        // cy.get('[data-testid="timeCard-options"]').children().should('have.length.at.least', 1);

        // IntegrationCard options
        cy.get('[data-testid="integration"]').should('exist').click();
        // cy.get('[data-testid="integration-options"]').children().should('have.length', 6); // sourceApplicationIdsOptions has 6 options

        // InstanceCard
        cy.get('[data-testid="instance"]').should('exist').click();

        // StatusCard options
        cy.get('[data-testid="status"]').should('exist').click();
        // cy.get('[data-testid="status-options"]').children().should('have.length.at.least', 1);

        // AdvancedCard options
        cy.get('[data-testid="advanced"]').should('exist').click();
        // cy.get('[data-testid="advanced-options"]').children().should('have.length.at.least', 1);

        // Buttons
        cy.contains('button', 'Søk').should('be.visible');
        // cy.contains('button', 'Tilbakestill').should('be.visible');
    });
});
