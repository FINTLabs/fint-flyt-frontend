describe('Testing instance list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/intern/integrasjoner', { fixture: 'integrations.json' }).as(
            'getIntegrations'
        );
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=true', {
            fixture: 'metadataLatest.json',
        }).as('getLatestMetadata');
        cy.intercept(
            'GET',
            '**/instance-flow-tracking/events?size=10&sort=timestamp,desc&sourceApplicationId=2&sourceApplicationInstanceId=228e67c7c35621505d6418a4e40131fc&sourceApplicationIntegrationId=journalpost',
            { fixture: 'hendelser.json' }
        ).as('getHendelser');
        cy.intercept(
            'GET',
            '**/instance-flow-tracking/events?size=10&sort=timestamp,desc&sourceApplicationId=2&sourceApplicationInstanceId=3b59e1204759b910f9f8e7e8036d4378&sourceApplicationIntegrationId=journalpost',
            { fixture: 'hendelser.json' }
        ).as('getHendelser');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=false', {
            fixture: 'metadata1.json',
        }).as('getMetadata1');
        cy.intercept('POST', '**/handlinger/instanser/44/prov-igjen', { statusCode: 200 }).as(
            'postRetry'
        );
        cy.intercept('GET', '/api/intern/instance-flow-tracking/summaries?size=10', {
            fixture: 'filter/instanser.json',
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
        cy.visit('/integration/instance/list');
    }

    it('should open and show table', () => {
        prep();
        cy.get('#instances-content-stack > :nth-child(2)').should('be.visible');
    });

    it('instance table should contain correct columns', () => {
        prep();
        let columns = [
            'Kildeapplikasjon',
            'Integrasjonsnavn',
            'Kildeapplikasjon integrasjon-ID',
            'Kildeapplikasjons instans-ID',
            'Tidspunkt',
            'Status',
            'Mellomlagring',
            'Handlinger',
            'Destinasjons instans-ID',
        ];
        columns.forEach((column) => {
            cy.get('#instance-table > :nth-child(1)').should('contain.text', column);
        });
        cy.get('#instance-table > :nth-child(1)').should(
            'not.contain.text',
            'not_a_column'
        );
    });

    it('instance table and panel should have correct information', () => {
        prep();
        cy.viewport(3000, 2000);
        cy.get(
            ':nth-child(1) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.get(
            ':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.get('#instance-panel-1').should("exist");
    });

    it('it should post correct id for retry', () => {
        prep();
        cy.viewport(3000, 2000);
        cy.get('#\\33 -action-toggle > .navds-dropdown__toggle').click();
        cy.get('#retryButton').click();
    });

});
