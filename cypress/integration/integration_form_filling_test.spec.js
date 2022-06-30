describe('Testing filling Integration Form', () => {
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
        cy.intercept('GET', '**/api/intern/kodeverk/klasse/**', {fixture: 'klasse1.json'}).as('getKlasse')
    })

    it('should fill form settings', () => {
        cy.visit('/integration/configuration/new')
        cy.get("#sourceApplication").click()
        cy.get('[data-value="acos"]').click()
        cy.get("#destination").click()
        cy.get('[data-value="fylkesrad"]').click()
        cy.get("#form-settings-confirm-btn").click()
    })

    it('should fill case information form', () => {
        cy.get("#name").type("test name")
        cy.get("#description").type("test description")
        cy.get("#sourceApplicationIntegrationId").click()
        cy.get('[data-value="VIK036"]').click()
    })
})
describe('Testing filling Case Form', () => {
    it('should fill case form', () => {
        cy.get('#case-form > .MuiAccordionSummary-root').click()
        cy.get('#caseData\\.title').type("test title")
        cy.get('#caseData\\.publicTitle').type("test public title")
        cy.get('#caseData\\.administrativeUnit').type('INFRA Drift').type('{downarrow}').type('{enter}');
        cy.get('#caseData\\.archiveUnit').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/noark/arkivdel/systemid/FJELL"]').click()
        cy.get('#caseData\\.recordUnit').type('VGHON').type('{downarrow}').type('{enter}');
        cy.get('#caseData\\.status').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/P"]').click()
        cy.get('#caseData\\.accessCode').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/tilgangsrestriksjon/systemid/PS"]').click()
        cy.get('#caseData\\.paragraph').type('22').type('{downarrow}').type('{enter}');
        cy.get('#caseData\\.caseWorker').type('Mrsic').type('{downarrow}').type('{enter}');
        cy.get('#caseData\\.primaryClassification').click();
        cy.intercept('GET', '**/api/intern/klasse/**', {fixture: 'klasse1.json'}).as('getClasses')
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNR"]').click()
        cy.wait(2000)
        cy.get('#caseData\\.primaryClass').type('{fodselsnummer}', { parseSpecialCharSequences: false })
        cy.get('#caseData\\.primaryClassification').click();
        cy.intercept('GET', '**/api/intern/kodeverk/klasse/**', {fixture: 'klasse1.json'}).as('getClasses')
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/EMNE"]').click()
        cy.wait(2000)
        cy.get('#caseData\\.primaryClass').type('Sentrale').type('{downarrow}').type('{enter}');
        cy.get('#caseData\\.secondaryClassification').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/EMNE"]').click()
        cy.intercept('GET', '**/api/intern/kodeverk/klasse/**', {fixture: 'klasse1.json'}).as('getClasses')
        cy.wait(2000)
        cy.get('#caseData\\.secondaryClass').type('Lokale').type('{downarrow}').type('{enter}');
    })
})

describe('Testing filling Record Form', () => {
    it('should fill record form fields', () => {
        cy.get('#record-form > .MuiAccordionSummary-root').click()
        cy.get('#recordData\\.title').type("test title")
        cy.get('#recordData\\.publicTitle').type("test public title")
        cy.get('#recordData\\.type').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/dokumenttype/systemid/TSS"]').click()
        cy.get('#recordData\\.administrativeUnit').type('KARBUS').type('{downarrow}').type('{enter}');
        cy.get('#recordData\\.recordStatus').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/journalstatus/systemid/S"]').click()
        cy.get('#recordData\\.caseWorker').type('Maria').type('{downarrow}').type('{enter}');// cy.get('#recordData\\.recordStatus').click()
        cy.get('#recordData\\.accessCode').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/tilgangsrestriksjon/systemid/PS"]').click()
        cy.get('#recordData\\.paragraph').type('22').type('{downarrow}').type('{enter}');
    })
})

describe('Testing filling Document and Object Form', () => {
    it('should fill document and object form fields', () => {
        cy.get('#document-object-form > .MuiAccordionSummary-root').click()
        cy.get('#documentData\\.title').type("test title")
        cy.get('#documentData\\.documentStatus').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/dokumentstatus/systemid/F"]').click()
        cy.get('#documentData\\.accessCode').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/tilgangsrestriksjon/systemid/PS"]').click()
        cy.get('#documentData\\.paragraph').type('22').type('{downarrow}').type('{enter}');
        cy.get('#documentData\\.variant').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/A"]').click()
    })
})

describe('Testing filling Applicant Form', () => {
    it('should fill applicant form', () => {
        cy.get('#applicant-form > .MuiAccordionSummary-root').click()
        cy.get('.MuiOutlinedInput-root > #applicantData\\.nationalIdentityNumber').type('12345612345')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.name').type('test name')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.address').type('adresse')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.postalCode').type('postnummer')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.city').type('{poststed}', { parseSpecialCharSequences: false })
        cy.get('.MuiOutlinedInput-root > #applicantData\\.contactPerson').type('{fornavn} {etternavn}', { parseSpecialCharSequences: false })
        cy.get('.MuiOutlinedInput-root > #applicantData\\.phoneNumber').type('81549300')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.email').type('hello@its.me')
        cy.get('.MuiOutlinedInput-root > #applicantData\\.accessCode').click()
        cy.get('[data-value="https://beta.felleskomponent.no/arkiv/kodeverk/tilgangsrestriksjon/systemid/PS"]').click()
        cy.get('.MuiOutlinedInput-root > #applicantData\\.paragraph').type('22').type('{downarrow}').type('{enter}');
    })
})

describe('Testing Completing Form', () => {
    it('should check complete form', () => {
        cy.get('#form-complete').check()
        cy.get('#form-complete').should('be.checked')
    })
})
