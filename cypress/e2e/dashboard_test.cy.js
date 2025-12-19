describe("Testing dashboard", () => {
	beforeEach(() => {
		cy.intercept(
			"GET",
			"**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC",
			{ fixture: "integrations.json" }
		).as("getIntegrations");
		cy.intercept("GET", "**/historikk/statistikk/integrasjoner", {
			fixture: "historikk.json",
		}).as("getHistory");
		cy.intercept(
			"GET",
			"**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=true",
			{ fixture: "metadata.json" }
		).as("getMetadata");
		cy.intercept("GET", "**/integrasjoner", {
			fixture: "integrations.json",
		}).as("getIntegrations");
		cy.intercept(
			"GET",
			"**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true",
			{ fixture: "hendelser.json" }
		).as("getHendelser");
	});

	function prep() {
        cy.intercept('GET', '**/authorization/me/is-authorized', {
            fixture: 'auth.json',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).as('getAuth');		cy.intercept("GET", "**/authorization/me/restricted-page-authorization", {userPermissionPage: true}).as("getUserPermissionsPage")
		cy.intercept("GET", "**/authorization/me", {fixture: "me.json"}).as("getMe")
		cy.intercept("GET", "**/authorization/users?page=0&size=10", {fixture: "users.json"}).as("getUsersPermissions")
		cy.visit("/");
	}

	it("should open new integration component on link click", () => {
		prep();
		cy.get("#dashboard-card-0-btn").click();
	});
	it("should open instance list component on link click", () => {
		prep();
		cy.get("#dashboard-card-1-btn").click();
	});
});