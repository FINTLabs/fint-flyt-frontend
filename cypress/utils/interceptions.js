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
        {
            method: 'GET',
            pathname: '**/integrasjoner',
            query: {
                side: '0',
                antall: '1000',
                sorteringFelt: 'state',
                sorteringRetning: 'ASC',
            },
        },
        { fixture: 'integrations.json' }
    ).as('getIntegrations');

    cy.intercept('GET', '**/integrasjoner', {
        fixture: 'integrations.json',
    }).as('getIntegrations');
    cy.intercept(
        {
            method: 'GET',
            pathname: '**/integrasjoner',
            query: {
                side: '0',
                antall: '10',
                sorteringFelt: 'state',
                sorteringRetning: 'ASC',
            },
        },
        { fixture: 'integrationsInList.json' }
    ).as('getIntegrations');

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/integrasjoner',
            query: {
                sourceApplicationId: '2',
            },
        },
        { fixture: 'integrationForSource2.json' }
    ).as('getAllIntegrationBySourceApplicationId');

    cy.intercept('POST', '**/integrasjoner', { fixture: 'postFixture.json' }).as('postIntegration');
};

export const mockGenericSourceApplicationRepository = () => {
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

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/metadata',
            query: {
                kildeapplikasjonId: '2',
                bareSisteVersjoner: 'true',
            },
        },
        {
            fixture: 'metadataLatest.json',
        }
    ).as('getLatestMetadata');

    cy.intercept('GET', '**/metadata/*/instans-metadata', { fixture: 'instansMetadata.json' }).as(
        'getInstansMetadata'
    );
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

    cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations*', {
        fixture: 'historikk.json',
    }).as('getHistory');

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/instance-flow-tracking/statistics/integrations',
            query: {
                integrationIds: /.*/,
                size: /.*/,
            },
        },
        {
            fixture: 'historikkByIntegrationId.json',
        }
    ).as('getStatisticsForIntegrations');
};

export const mockGenericConfigurationRepository = () => {
    cy.intercept(
        {
            method: 'GET',
            pathname: '**/konfigurasjoner',
            query: {
                side: '0',
                antall: '30',
                sorteringFelt: 'id',
                sorteringRetning: 'DESC',
                ferdigstilt: 'false',
                integrasjonId: '2',
                ekskluderMapping: 'true',
            },
        },
        { fixture: 'configDrafts2.json' }
    ).as('getConfigDrafts2');

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/konfigurasjoner',
            query: {
                side: '0',
                antall: '30',
                sorteringFelt: 'version',
                sorteringRetning: 'DESC',
                ferdigstilt: 'true',
                integrasjonId: '2',
                ekskluderMapping: 'true',
            },
        },
        { fixture: 'configCompleted2.json' }
    ).as('getConfigCompleted2');

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/konfigurasjoner/5',
            query: {
                ekskluderMapping: 'false',
            },
        },
        { fixture: 'config.json' }
    ).as('getConfig');

    cy.intercept(
        {
            method: 'GET',
            pathname: '**/konfigurasjoner/7',
            query: {
                ekskluderMapping: 'false',
            },
        },
        { fixture: 'editConfig.json' }
    ).as('getEditConfig');

    cy.intercept('POST', '**/konfigurasjoner', { fixture: 'postFixture.json' }).as(
        'postConfiguration'
    );
};

export const mockGenericValueConvertingRepository = () => {
    cy.intercept(
        {
            method: 'GET',
            pathname: '**/value-convertings',
            query: {
                page: '0',
                size: /^(100|1000)$/i,
                sortProperty: /^(fromApplicationId|id)$/i,
                sortDirection: /^(ASC|DESC)$/i,
                excludeConvertingMap: /^(true|false)$/i,
            },
        },
        {
            fixture: 'valueconverting/valueconvertingsWithMaps.json',
        }
    ).as('getValueconvertings');

    cy.intercept('GET', '**/value-convertings/1', {
        fixture: 'valueconverting/valueconverting1.json',
    }).as('getValueconverting');

    cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as(
        'postValueconverting'
    );
};

export const mockGenericResourceRepository = () => {
    cy.intercept('GET', '**/arkiv/kodeverk/**', { fixture: 'kodeverk/mock.json' }).as(
        'getKodeverk'
    );
    cy.intercept(
        {
            method: 'GET',
            pathname: '**/arkiv/kodeverk/klasse',
        },
        { fixture: 'kodeverk/klasse.json' }
    ).as('getKodeverkKlasse');

    cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as(
        'getFormat'
    );
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
