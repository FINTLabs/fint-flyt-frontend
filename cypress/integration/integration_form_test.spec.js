describe('Testing Integration Form', () => {
        it('should open', () => {
            cy.visit('/integration/configuration/new')
        });

        it('should have correct header', () => {
            cy.get('#integration-form-header').should('contain', 'Integrasjon til arkiv')
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
            cy.get('#caseData\\.caseCreationStrategy-COLLECTION > .MuiFormControlLabel-root > .MuiTypography-root').click()
            cy.get('#caseData\\.caseNumber').should('be.visible')
            cy.get('#caseData\\.caseNumber').type('2021/06')
            cy.get('#case-information-search-btn').click()
            cy.get('#case-information-case-search-result').should('be.visible')
        });

        it('should hide case form section field on collection strategy', () => {
            cy.get('#caseData\\.caseCreationStrategy-COLLECTION > .MuiFormControlLabel-root > .MuiTypography-root').click()
            cy.get('#caseData\\.caseNumber').should('be.visible')
        });
    }
)