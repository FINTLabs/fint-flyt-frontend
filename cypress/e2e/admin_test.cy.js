describe("Testing admin page", () => {
	const columns = [
		'Navn', 'Epost', 'ACOS', 'eGrunnerverv', 'Digisak', 'VIGO OT'
	]
	beforeEach(() => {
		cy.intercept("GET", "**/authorization/me/is-authorized", {fixture: "auth.json"}).as("getAuth")
		cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {admin: true}).as("getUser")
		cy.intercept("GET", "**/authorization/users", {fixture: "permission.json"}).as("getPermission")
		cy.intercept("POST", "**/authorization/users/actions/userPermissionBatchPut", {fixture: "postPermission.json"}).as("postPermission")
	});

	function prep() {
		cy.intercept("GET", "**/api/application/configuration", {
			forceNetworkError: true,
			fixture: "basepathConfig.json",
		}).as("getConfig");
		cy.visit("/admin");
		cy.wait("@getConfig");
	}

	it("should open admin page and show tables with correct table", () => {
		prep();
		cy.get('#admin-table').should("be.visible")
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
		cy.get('#check-row-1-cell-3').should("be.disabled").should("not.be.checked")
	})

	it('should allow edit on edit button click', () => {
		prep();
		cy.get('#edit-toggle-btn').click()
		cy.get('#check-row-0-cell-1').should("not.be.disabled").should("be.checked")
		cy.get('#check-row-0-cell-1').click()
		cy.get('#check-row-0-cell-2').click()
		cy.get('#check-row-0-cell-3').click()
		cy.get('#form-save-btn').click()
		cy.get('#check-row-0-cell-1').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-0-cell-2').should("be.disabled").should("not.be.checked")
		cy.get('#check-row-0-cell-3').should("be.disabled").should("not.be.checked")
	})

})

