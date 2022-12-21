// noinspection DuplicatedCode

describe('Testing Integration Form', () => {
    before(() => {
        cy.intercept('GET', '**/api/intern/kodeverk/administrativenhet', {fixture: 'administrativenhet.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/intern/kodeverk/arkivdel', {fixture: 'arkivdel.json'}).as('getArchiveSection')
        cy.intercept('GET', '**/api/intern/kodeverk/arkivressurs', {fixture: 'arkivressurs.json'}).as('getArchiveResources')
        cy.intercept('GET', '**/api/intern/kodeverk/dokumentstatus', {fixture: 'dokumentstatus.json'}).as('getDocumentStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/dokumenttype', {fixture: 'dokumenttype.json'}).as('getDocumentTypes')
        cy.intercept('GET', '**/api/intern/kodeverk/journalstatus', {fixture: 'journalstatus.json'}).as('getJournalStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/klassifikasjonssystem', {fixture: 'klassifikasjonssystem.json'}).as('getAdminstrativeUnits')
        cy.intercept('GET', '**/api/intern/kodeverk/sakstatus', {fixture: 'sakstatus.json'}).as('getStatuses')
        cy.intercept('GET', '**/api/intern/kodeverk/skjermingshjemmel', {fixture: 'skjermingshjemmel.json'}).as('getParagraphs')
        cy.intercept('GET', '**/api/intern/kodeverk/tilgangsrestriksjon', {fixture: 'tilgangrestriksjon.json'}).as('getAccessCodes')
        cy.intercept('GET', '**/api/intern/kodeverk/variantformat', {fixture: 'variantformat.json'}).as('getVariants')
        cy.intercept('GET', '**/api/intern/integrasjon/konfigurasjon/**', {fixture: 'configuration.json'}).as('get')
    })

        it('should open', () => {
            cy.visit('/integration/configuration/new')
        });

        it('should have correct header', () => {
            cy.get('#integration-form-settings-header').should('contain', 'Velg skjemaleverandør, skjema og destinasjon')
            cy.get("#sourceApplicationId").click()
            cy.get('[data-value="acos"]').click()
            cy.get("#sourceApplicationIntegrationId").type('17').type('{downarrow}').type('{enter}');
            cy.get("#destination").click()
            cy.get('[data-value="fylkesrad"]').click()
            cy.get("#form-settings-confirm-btn").click()
        });

        it('should have accordion headers', () => {
            cy.get('#case-information > .MuiAccordionSummary-root').should('contain', 'Integrasjonslogikk')
            cy.get('#case-form > .MuiAccordionSummary-root').should('contain', 'Sak')
            cy.get('#record-form > .MuiAccordionSummary-root').should('contain', 'Journalpost')
            cy.get('#document-object-form > .MuiAccordionSummary-root').should('contain', 'Dokument- og objektbeskrivelse')
            cy.get('#applicant-form > .MuiAccordionSummary-root').should('contain', 'Avsender')
        });

        it('should open and close accordions by click', () => {
            cy.get('#case-information > .MuiAccordionSummary-root').click()
            cy.get('#case-information-details').should('not.be.visible')

            cy.get('#case-information > .MuiAccordionSummary-root').click()
            cy.get('#case-form > .MuiAccordionSummary-root').click()
            cy.get('#record-form > .MuiAccordionSummary-root').click()
            cy.get('#document-object-form > .MuiAccordionSummary-root').click()
            cy.get('#applicant-form > .MuiAccordionSummary-root').click()
            cy.get('#case-information-details').should('be.visible')
            cy.get('#case-form-details').should('be.visible')
            cy.get('#record-form-details').should('be.visible')
            cy.get('#document-object-form-details').should('be.visible')
            cy.get('#applicant-form-details').should('be.visible')
        })

        it('should have case number field on collection strategy', () => {
            cy.get('#caseData\\.caseCreationStrategy-BY_ID > .MuiFormControlLabel-root > .MuiTypography-root').click()
            cy.get('#caseData\\.caseNumber').should('be.visible')
            cy.get('#caseData\\.caseNumber').type('2021/06')
            cy.intercept('GET', '**/api/intern/sakstittel/mappeid/**', {fixture: 'tittel.json'}).as('getTittel')
            cy.get('#case-information-search-btn').click()
            cy.get('#case-information-case-search-result').should('be.visible')
        });

        it('should hide case form section field on collection strategy', () => {
            cy.get('#caseData\\.caseCreationStrategy-BY_ID > .MuiFormControlLabel-root > .MuiTypography-root').click()
            cy.get('#caseData\\.caseNumber').should('be.visible')
        });
    }
)
