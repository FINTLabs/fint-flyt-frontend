export const mockGenericAuthorizationRepository = () => {
    cy.intercept('GET', '**/authorization/me/is-authorized', {
        fixture: 'auth.json',
        headers: {
            'Content-Type': 'text/plain',
        },
    }).as('getAuth');
    cy.intercept('GET', '**/authorization/sourceapplications', {
        fixture: 'sourceApplications.json',
    }).as('sourceApplications');
    cy.intercept('GET', '**/authorization/me/restricted-page-authorization', {
        userPermissionPage: true,
    }).as('getUserPermissionsPage');
    cy.intercept('GET', '**/authorization/me', { fixture: 'me.json' }).as('getMe');
    cy.intercept('GET', '**/authorization/users?page=0&size=10', { fixture: 'users.json' }).as(
        'getUsersPermissions'
    );
    cy.intercept('POST', '**/authorization/users/actions/userPermissionBatchPut', {
        fixture: 'usersPost.json',
    }).as('postUsersPermissions');
};

export const mockGenericIntegrationRepository = () => {
    cy.intercept(
        'GET',
        '**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC',
        { fixture: 'integrations.json' }
    ).as('getIntegrations');
    cy.intercept('GET', '**/integrasjoner', {
        fixture: 'integrations.json',
    }).as('getIntegrations');
    cy.intercept(
        'GET',
        '**/integrasjoner?side=0&antall=10&sorteringFelt=state&sorteringRetning=ASC',
        { fixture: 'integrationsInList.json' }
    ).as('getIntegrations');
};

export const mockGenericApplicationRepository = () => {
    cy.intercept(
        {
            method: 'GET',
            pathname: '**/metadata',
            query: {
                kildeapplikasjonIds: /.*/,
                bareSisteVersjoner: /^(true|false)$/i,
            },
        },
        {
            fixture: 'metadataBySourceApplication.json',
        }
    ).as('getMetadata');

    // /metadata?kildeapplikasjonIds=1%2C2%2C3%2C4&bareSisteVersjoner=true
};

export const mockGenericInstanceFlowTrackingRepository = () => {
    cy.intercept('GET', '**/instance-flow-tracking/statistics/total', {
        fixture: 'total.json',
    }).as('getTotal');

    cy.intercept(
        'GET',
        '**/instance-flow-tracking/events?size=10&sort=timestamp%2Cdesc&sourceApplicationId=2&sourceApplicationInstanceId=*&sourceApplicationIntegrationId=journalpost',
        { fixture: 'hendelser.json' }
    ).as('getHendelser');
};

export const mockSelectablesFromInstanceFlowTrackingRepository = () => {
    const intercepts = [
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/summaries?size=10',
            fixture: 'filter/instanser.json',
            alias: 'newSummaries1',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/summaries?size=10',
            fixture: 'filter/instanser.json',
            alias: 'newSummaries2',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/value-space/instance-status/selectables',
            fixture: 'filter/instance-status.json',
            alias: 'instance-status',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/value-space/storage-status/selectables',
            fixture: 'filter/storage-status.json',
            alias: 'storage-status',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/value-space/event-category/selectables',
            fixture: 'filter/event-category.json',
            alias: 'event-category-1',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/value-space/instance-status-event-category/selectables',
            fixture: 'filter/instance-status-event-category.json',
            alias: 'event-category-2',
        },
        {
            method: 'GET',
            url: '**/api/intern/instance-flow-tracking/value-space/time/current-period/selectables',
            fixture: 'filter/current-period.json',
            alias: 'event-category-3',
        },
    ];

    intercepts.forEach(({ method, url, fixture, response, alias }) => {
        if (fixture) {
            cy.intercept(method, url, { fixture }).as(alias);
        } else {
            cy.intercept(method, url, response).as(alias);
        }
    });
};