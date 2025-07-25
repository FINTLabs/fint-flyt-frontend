// noinspection DuplicatedCode
function fillAll() {
    cy.get('#sourceApplicationId').select('2')
    cy.get('#sourceApplicationIntegrationId').select('sak')
    cy.get('#destination').select('fylkesrad')
}


describe('Testing create new configuration from new integration', () => {
    beforeEach(() => {

        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations', {
            fixture: 'historikk.json',
        }).as('getHistory');

        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration')
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&antall=10&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/integrasjoner?sourceApplicationId=*', {fixture: 'integrationForSource2.json'}).as('getAllIntegrationBySourceApplicationId')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk')
    })

    function prep() {
        cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
        cy.intercept("GET", "**/authorization/me/is-authorized", {fixture: "auth.json"}).as("getAuth")
        cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
        cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json'
        }).as('getConfig')
        cy.visit('/integration/new')
        cy.wait('@getConfig')
        fillAll()
        cy.get('#form-settings-confirm-btn').click()
        cy.wait('@postIntegration').its('request.body').should('deep.equal', {
                "sourceApplicationId": "2",
                "sourceApplicationIntegrationId": "sak",
                "destination": "fylkesrad",
                "state": "DEACTIVATED"
            }
        )
    }

    it('should navigate to configuration form and show outgoing and incoming data', () => {
        prep()
        cy.url().should('contain', '/configuration/new');
        cy.get('#incoming-form-panel').should("be.visible")
        cy.get('#metadata-content-panel').should("be.visible")
        cy.get('#value-converting-panel').should("be.visible")
        cy.get('#outgoing-form-panel').should("be.visible")

        cy.get('#metadata-content-panel > .navds-vstack').children().should('have.length', 16);
    })

    it('should open panels in outgoing data', () => {
        prep()
        cy.get('#column-0').should("be.visible")
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#column-1').should("be.visible")
        cy.get('#column-1').should('contain', 'Sak');
    })
});

describe('Testing creating new and editing configurations from integration overview', () => {
    function prep() {
        cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
        cy.intercept("GET", "**/authorization/me/is-authorized", {fixture: "auth.json"}).as("getAuth")
        cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
        cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json'
        }).as('getConfig')
        cy.visit('/integration/list')
        cy.wait('@getConfig')
    }

    beforeEach(() => {

        cy.intercept('GET', '**/instance-flow-tracking/statistics/integrations', {
            fixture: 'historikk.json',
        }).as('getHistory');

        cy.intercept('POST', '**/integrasjoner', {fixture: 'postFixture.json'}).as('postIntegration');
        cy.intercept('GET', '**/integrasjoner?side=0&antall=10&sorteringFelt=state&sorteringRetning=ASC', {fixture: 'integrationsInList.json'}).as('getIntegrations');
        cy.intercept('GET', '**/integrasjoner', {fixture: 'allIntegrations.json'}).as('getAllIntegrations');
        // cy.intercept('GET', '**/historikk/statistikk/integrasjoner', {fixture: 'historikk.json'}).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=1&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=3&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=4&bareSisteVersjoner=false', {fixture: 'metadata.json'}).as('getMetadata')
        cy.intercept('GET', '**/metadata/11/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata');
        cy.intercept('GET', '**/metadata/1/instans-metadata', {fixture: 'instansMetadata.json'}).as('getInstansMetadata');
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings');
        cy.intercept('GET', '**/arkiv/kodeverk/**', {fixture: 'kodeverk/mock.json'}).as('getKodeverk');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=1&ekskluderMapping=true', {fixture: 'configDrafts.json'}).as('getConfigDrafts');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=id&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=2&ekskluderMapping=true', {fixture: 'configDrafts2.json'}).as('getConfigDrafts2');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=1&ekskluderMapping=true', {fixture: 'configCompleted.json'}).as('getConfigCompleted');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=30&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=true&integrasjonId=2&ekskluderMapping=true', {fixture: 'configCompleted2.json'}).as('getConfigCompleted2');
        cy.intercept('GET', '**/konfigurasjoner/5?ekskluderMapping=false', {fixture: 'config.json'}).as('getConfig');
        cy.intercept('GET', '**/konfigurasjoner/4?ekskluderMapping=true', {fixture: 'config.json'}).as('getConfig');
        cy.intercept('GET', '**/konfigurasjoner/7?ekskluderMapping=false', {fixture: 'editConfig.json'}).as('getEditConfig');
    });

    it('should navigate to create new blank configuration form', () => {
        prep()
        cy.get(':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get('#panel-1-new-configuration-button').click()
    })

    it('should navigate to create new configuration based on existing completed version', () => {
        prep()
        cy.get(':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get('#panel-1-action-toggle > .navds-dropdown__toggle').click()
        cy.get('#panel-1-action-toggle > .navds-popover > dl.navds-dropdown__list > :nth-child(2) > .navds-dropdown__item').click()

        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root').should("contain.text", "test basert på")
    })

    it('should navigate to edit existing configuration draft', () => {
        prep()
        cy.get(':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get(':nth-child(1) > :nth-child(3) > #panel-1-action-toggle > .navds-button').click()
        cy.get('#comment').should("contain.text", "rediger denne konfig")
    })
});