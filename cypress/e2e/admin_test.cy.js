describe("Testing useraccess page", () => {
	const columns = [
        'Navn',
        'Epost',
        'ACOS',
        'eGrunnerverv',
        'Digisak',
        'VIGO',
        'Altinn',
        'HMSReg',
        'ISY Graving',
    ];
	beforeEach(() => {
        cy.intercept('GET', '**/authorization/me/is-authorized', {
            fixture: 'auth.json',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).as('getAuth');		cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
		cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
		cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
		cy.intercept("POST", "**/authorization/users/actions/userPermissionBatchPut", {fixture: "usersPost.json"}).as("postUsersPermissions")
	});

	function prep() {
		cy.visit("/useraccess");
	}

	it("should open user access page and show tables with correct table", () => {
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

