import { mockGenericAuthorizationRepository } from '../utils/interceptions.js';

describe("Testing useraccess page", () => {
	const columns = [
        'Navn',
        'Epost',
        'Acos Interact',
        'Altinn',
        'Digisak',
        'eGrunnerverv',
        'HMSReg',
        'VIGO',
    ];
    beforeEach(mockGenericAuthorizationRepository);

	function prep() {
		cy.visit("/useraccess");
	}

	it("should show tables with correct table headers", () => {
		prep();
		cy.get('#useraccess-table').should("be.visible")
		columns.map(column => {
				cy.get('#table-row-header').should("contain.text", column)
			}
		)
	});

	it('should have the correct columns checked and disabled on open', () => {
		prep();
		cy.get('#check-row-0-cell-1').should("be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-2').should("be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-3').should("be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-4').should("be.disabled").should("be.checked")
		cy.get('#check-row-1-cell-1').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-1-cell-2').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-1-cell-3').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-1-cell-4').should("be.disabled").should("be.checked")
	})

	it('should allow edit on edit button click', () => {
		prep();
		cy.get('#edit-toggle-btn').click()
		cy.get('#check-row-0-cell-1').should("not.be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-2').should("not.be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-3').should("not.be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-4').should("not.be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-1').click()
		cy.get('#check-row-0-cell-2').click()
		cy.get('#check-row-0-cell-3').click()
		cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "usersUpdated.json"}).as("getPermissionUpdated")
		cy.get('#form-save-btn').click()
		cy.wait('@getPermissionUpdated')
		cy.get('#check-row-0-cell-1').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-0-cell-2').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-0-cell-3').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-0-cell-4').should("be.disabled").should("be.checked")
	})

})

