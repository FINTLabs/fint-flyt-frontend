describe('Testing version page', () => {
    function prep() {
        cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
        cy.intercept('GET', '**/authorization/me/is-authorized', {
            fixture: 'auth.json',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).as('getAuth');        cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
        cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
        cy.visit('/version');
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
