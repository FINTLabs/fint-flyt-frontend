import {
    mockGenericAuthorizationRepository,
} from '../utils/interceptions.js';

describe('Testing version page', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
    });

    function prep() {
        cy.visit('/changelog');
    }

    it('should show version page', () => {
        prep()
        cy.get('#version-content').should("be.visible")
    })
    it('should show header and 1 section', () => {
        prep()
        cy.get('#version-information').should("be.visible")

    })

});
