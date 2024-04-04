describe('Testing instance list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/intern/integrasjoner', {fixture: 'integrations.json'}).as('getIntegrations')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=true', {fixture: 'metadataLatest.json'}).as('getLatestMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=*', {fixture: 'hendelser.json'}).as('getHendelser')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10&sorteringFelt=timestamp&sorteringRetning=ASC&bareSistePerInstans=*', {fixture: 'hendelserASC.json'}).as('getHendelserASC')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=false', {fixture: 'metadata1.json'}).as('getMetadata1')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10&sorteringFelt=timestamp&sorteringRetning=DESC&kildeapplikasjonId=2&kildeapplikasjonInstansId=1515557', {fixture: 'instansHendelser.json'}).as('getInstansHendelser')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10&sorteringFelt=timestamp&sorteringRetning=DESC&kildeapplikasjonId=2&kildeapplikasjonInstansId=142312', {fixture: 'instansHendelser.json'}).as('getInstansHendelser')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=false', {fixture: 'instansHendelser.json'}).as('getInstansHendelser')
        cy.intercept('POST', '**/handlinger/instanser/44/prov-igjen', {statusCode: 200}).as('postRetry')
    })

    function prep() {
        cy.intercept("GET", "**/authorization/check-authorized", {statusCode: 200, fixture: "auth.json"}).as("getAuth")
        cy.intercept("GET", "**/authorization/user", {fixture: "user.json"}).as("getUser")
        cy.intercept('GET', '**/api/application/configuration', {
            forceNetworkError: true,
            fixture: 'basepathConfig.json'
        }).as('getConfig')
        cy.visit('/integration/instance/list')
        cy.wait('@getConfig')
    }

    it('should open and show table', () => {
        prep()
        cy.get('#instances-content-stack > :nth-child(2)').should('be.visible')
    })

    it('instance table should contain correct colunms', () => {
        prep()
        let columns = ['Kildeapplikasjon', 'Integrasjonsnavn', 'Tidspunkt', 'Status', 'Handlinger', 'Destinasjon ID']
        columns.forEach(column => {
            cy.get('#instances-content-stack > :nth-child(2)').should("contain.text", column)
        })
        cy.get('#instances-content-stack > :nth-child(2)').should("not.contain.text", 'not_a_column')
    })

    it('instance table and panel should have correct information', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get(':nth-child(1) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get(':nth-child(3) > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get('#instance-panel-1').should('contain.text', 'Instans registrert')
    })

    it('it should open error panel and show correct errors', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('.navds-link').click()
        cy.get('#error-list').should("be.visible")
        cy.get('#error-list').should("contain.text", "Valideringsfeil i mottak av instans")
        cy.get('#error-list').should("contain.text", "Instansen ble avvist av destinasjon med følgende feilmelding: 'Du har driti deg ut")
    })

    it('it should post correct id for retry', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('#\\30 -action-toggle > .navds-dropdown__toggle').click()
        cy.get('#retryButton').click()
        // cy.wait('@postRetry')
    })

    it('it should sort columns correctly', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('#instance-table > :nth-child(2) > :nth-child(1) > :nth-child(5)').should("contain.text", "Feilet under konvertering")
        cy.get('.navds-table__sort-button').click().click()
        cy.get('#instance-table > :nth-child(2) > :nth-child(1) > :nth-child(5)').should("contain.text", "Instans godtatt av destinasjon")

    })
});