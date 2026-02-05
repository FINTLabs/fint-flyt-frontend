

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
    cy.intercept('GET', '**/metadata?kildeapplikasjonIds=*&bareSisteVersjoner=*', {
        fixture: 'metadataBySourceApplication.json',
    }).as('getMetadata');
};

export const mockGenericInstanceFlowTrackingRepository = () => {
    cy.intercept('GET', '**/instance-flow-tracking/statistics/total', {
        fixture: 'total.json',
    }).as('getTotal');
};