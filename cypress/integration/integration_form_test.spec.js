describe('Testing Integration Form', () => {
        it('should open', () => {
            cy.visit('/integration/configuration/new')
        });

        it('should have header', () => {
            cy.get('.MuiTypography-h5').should('contain', 'Integrasjon til arkiv')
        });

    it('should have accordion header', () => {
        cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Integrasjonslogikk')
        cy.get(':nth-child(2) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .MuiTypography-root').should('contain', 'Sak')
    });
    }
)