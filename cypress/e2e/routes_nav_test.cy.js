describe("Testing Routes", () => {
	const links = [
		"/integration/configuration/list",
		"/integration/instance/list",
		"/valueconverting",
		"/version",
	];
	const pages = ["Integrasjoner", "Instanser", "Verdikonvertering", "Versjon"];

        beforeEach(() => {
            cy.intercept("GET", "**/integrasjoner?side=0&antall=1000&sorteringFelt=state&sorteringRetning=ASC", {fixture: "integrations.json"}).as("getIntegrations")
            cy.intercept("GET", "**/historikk/statistikk/integrasjoner", {fixture: "historikk.json"}).as("getHistory")
            cy.intercept("GET", "**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true", {fixture: "metadataLatest.json"}).as("getLatestMetadata")
            cy.intercept("GET", "**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true", {fixture: "hendelser.json"}).as("getHendelser")
            cy.intercept("GET", "**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true", {fixture: "valueconverting/valueconvertings.json"}).as("getValueconvertings")
        })

	function prep() {
		cy.intercept("GET", "**/api/application/configuration", {
			forceNetworkError: true,
			fixture: "basepathConfig.json",
		}).as("getConfig");
		cy.visit("/");
		cy.wait("@getConfig");
	}

	it("should open all links", () => {
		prep();
		links.forEach((link) => {
			cy.visit(link);
			cy.wait("@getConfig");
		});
	});

	it("should open all pages in navigation drawer on click", () => {
		prep();
		pages.forEach((page) => {
			cy.contains(page).click();
		});
	});
});
