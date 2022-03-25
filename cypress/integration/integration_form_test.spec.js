describe('Testing Integration Form', () => {
        it('should open', () => {
            cy.visit('/integration/configuration/new')
        });

        it('should have header', () => {
            cy.get('.MuiTypography-h5').should('contain', 'Integrasjon til arkiv')
        });

        it('should have accordion headers', () => {
            cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Integrasjonslogikk')
            cy.get(':nth-child(2) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Sak')
            cy.get(':nth-child(3) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Journalpost')
            cy.get(':nth-child(4) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Dokument- og objektbeskrivelse')
            cy.get(':nth-child(5) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Avsender')
        });

        it('should have show case number field on collection strategy', () => {
            cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiRadio-root > .PrivateSwitchBase-input').click()
            cy.get('#mui-41').should('be.visible')
            cy.get('#mui-41').type('2021/06')
            cy.get('.css-0 > .MuiButton-root').click()
            cy.get('.css-16u1nra-MuiTypography-root').should('be.visible')
        });
    }
)