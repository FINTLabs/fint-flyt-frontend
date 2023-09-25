import cy from 'cypress';

function fillAllIntegrationFormFields() {
    cy.get('#sourceApplicationId').click()
    cy.get('.MuiList-root > [tabindex="-1"]').click()
    cy.get('#sourceApplicationIntegrationId').click()
    cy.get('#sourceApplicationIntegrationId-option-1').click()
    cy.get('#destination').click()
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > .MuiButtonBase-root').click()
}

// eslint-disable-next-line no-undef
module.exports = {
    fillAllIntegrationFormFields,
};