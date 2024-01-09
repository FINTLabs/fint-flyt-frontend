describe('Testing instance list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/intern/integrasjoner', { fixture: 'integrations.json' }).as('getIntegrations')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=*', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=*&bareSisteVersjoner=false', { fixture: 'metadata1.json' }).as('getMetadata1')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&kildeapplikasjonId=2&kildeapplikasjonInstansId=1515557', { fixture: 'instansHendelser.json' }).as('getInstansHendelser')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=1000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=false', { fixture: 'instansHendelser.json' }).as('getInstansHendelser')
        cy.intercept('POST', '**/handlinger/instanser/44/prov-igjen', {statusCode: 200}).as('postRetry')
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
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
        cy.get('#instance-panel > .navds-table > .navds-table__body > :nth-child(1) > :nth-child(1)').should('contain.text', '02/06/23 13:40')
        cy.get('#instance-panel > .navds-table > .navds-table__body > :nth-child(3) > :nth-child(2)').should('contain.text', 'Instans registrert')
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
        cy.get('#retry-btn-0').click()
        cy.wait('@postRetry')
    })
});