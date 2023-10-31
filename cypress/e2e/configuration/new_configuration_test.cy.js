// noinspection DuplicatedCode
function fillAll() {
    cy.get('#sourceApplicationId').click()
    cy.get('.MuiList-root > [tabindex="-1"]').click()
    cy.get('#sourceApplicationIntegrationId').click()
    cy.get('#sourceApplicationIntegrationId-option-1').click()
    cy.get('#destination').click()
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root').click()
}


describe('Testing create new configuration from new integration', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/integrasjoner', { fixture: 'postFixture.json' }).as('postIntegration')
        cy.intercept('GET', '**/integrasjoner', { fixture: 'allIntegrations.json' }).as('getAllIntegrations')
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', { fixture: 'metadata.json' }).as('getMetadata')
        cy.intercept('GET', '**/metadata/4/instans-metadata', { fixture: 'instansMetadata.json' }).as('getInstansMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/arkiv/kodeverk/**', { fixture: 'kodeverk/mock.json' }).as('getKodeverk')
    })
    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/integration/new')
        cy.wait('@getConfig')
        fillAll()
        cy.get('#form-settings-confirm-btn').click()
        cy.wait('@postIntegration').its('request.body').should('deep.equal', {
                "sourceApplicationId":"2",
                "sourceApplicationIntegrationId":"sak",
                "destination":"fylkesrad",
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

        cy.get('[id^="tag-"]').should('have.length', 16);
        cy.get('[id^="vc-tag-"]').should('have.length', 2);
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
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
        cy.visit('/integration/list')
        cy.wait('@getConfig')
    }
    beforeEach(() => {
        cy.intercept('POST', '**/integrasjoner', { fixture: 'postFixture.json' }).as('postIntegration');
        cy.intercept('GET', '**/integrasjoner?side=0&sorteringFelt=state&sorteringRetning=ASC', { fixture: 'integrations.json' }).as('getIntegrations');
        cy.intercept('GET', '**/integrasjoner', { fixture: 'allIntegrations.json' }).as('getAllIntegrations');
        cy.intercept('GET', '**/historikk/statistikk/integrasjoner', { fixture: 'historikk.json' }).as('getHistory');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata');
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=false', { fixture: 'metadata.json' }).as('getMetadata');
        cy.intercept('GET', '**/metadata/11/instans-metadata', { fixture: 'instansMetadata.json' }).as('getInstansMetadata');
        cy.intercept('GET', '**/metadata/1/instans-metadata', { fixture: 'instansMetadata.json' }).as('getInstansMetadata');
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings');
        cy.intercept('GET', '**/arkiv/kodeverk/**', { fixture: 'kodeverk/mock.json' }).as('getKodeverk');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=10000&sorteringFelt=version&sorteringRetning=DESC&ferdigstilt=false&integrasjonId=2&ekskluderMapping=true', { fixture: 'configDrafts.json' }).as('getConfigDrafts');
        cy.intercept('GET', '**/konfigurasjoner/?side=0&antall=10000&sorteringFelt=id&sorteringRetning=ASC&ferdigstilt=true&integrasjonId=2&ekskluderMapping=true', { fixture: 'configCompleted.json' }).as('getConfigCompleted');
        cy.intercept('GET', '**/konfigurasjoner/5?ekskluderMapping=false', { fixture: 'config.json' }).as('getConfig');
        cy.intercept('GET', '**/konfigurasjoner/6?ekskluderMapping=false', { fixture: 'editConfig.json' }).as('getEditConfig');
    });

    it('should navigate to create new blank configuration form', () => {
        prep()
        cy.get('[data-id="journalpost"] > [data-field="details"] > .MuiButtonBase-root').click()
        cy.get('#positioned-button').click()
        cy.get('#new-configuration-button').click()
    })

    it('should navigate to create new configuration based on existing completed version', () => {
        prep()
        cy.get('[data-id="journalpost"] > [data-field="details"] > .MuiButtonBase-root').click()
        cy.get('#positioned-button').click()
        cy.get('li.MuiButtonBase-root > #positioned-button').click()
        cy.get('#version-button').click()
        cy.get('#mapping\\.valueMappingPerKey\\.type\\.mappingString').click()
        cy.get('#menu-mapping\\.valueMappingPerKey\\.type\\.mappingString > .MuiPaper-root > .MuiList-root > [tabindex="0"]').type('{enter}')
        cy.get('.MuiToggleButton-root').click()
        cy.get('#dnd-value-component-mapping\\.objectMappingPerKey\\.newCase\\.valueMappingPerKey\\.tittel\\.mappingString > .MuiFormControl-root > .MuiInputBase-root')
    })

    it('should navigate to edit existing configuration draft', () => {
        prep()
        cy.get('[data-id="journalpost"] > [data-field="details"] > .MuiButtonBase-root').click()
        cy.get('[data-id="6"] > .MuiDataGrid-cell--withRenderer > .MuiButtonBase-root').click()
        cy.get('#comment').should("contain.text", "rediger denne konfig")
    })
});