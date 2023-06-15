describe('Testing instance list', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=2&bareSisteVersjoner=true', { fixture: 'metadataLatest.json' }).as('getLatestMetadata')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&bareSistePerInstans=true', { fixture: 'hendelser.json' }).as('getHendelser')
        cy.intercept('GET', '**/metadata?kildeapplikasjonId=1&bareSisteVersjoner=true', { fixture: 'metadata1.json' }).as('getMetadata1')
        cy.intercept('GET', '**/historikk/hendelser?side=0&antall=10000&sorteringFelt=timestamp&sorteringRetning=DESC&kildeapplikasjonId=1&kildeapplikasjonInstansId=1515557', { fixture: 'instansHendelser.json' }).as('getInstansHendelser')
        cy.intercept('POST', '**/handlinger/instanser/44/prov-igjen', {statusCode: 200}).as('postRetry')
    })

    function prep() {
        cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'config.json' }).as('getConfig')
        cy.visit('/integration/instance/list')
        cy.wait('@getConfig')
    }

    it('should open and show table', () => {
        prep()
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should contain correct colunms', () => {
        prep()
        let columns = ['Kildeapplikasjon', 'Kildeapplikasjons integrasjons-ID', 'Integrasjonsnavn', 'Kildeapplikasjons instans-ID', 'Konfigurasjon ID', 'Arkivsak ID', 'Tidspunkt', 'Status', 'Detaljer', 'Handlinger']
        columns.forEach(column => {
            cy.get('.MuiDataGrid-root').should("contain.text", column)
        })
        cy.get('.MuiDataGrid-root').should("not.contain.text", 'not_a_column')
    })

    it('instance panel should contain correct instances', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('.MuiDataGrid-row--lastVisible > [data-field="sourceApplicationIntegrationId"]').dblclick()
        cy.get('[data-id="0"] > [data-field="name"]').should('contain.text', 'Instans arkivert')
        cy.get('#back-button').click()
    })

    it('it should open error panel and show correct errors', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('#error-dialog-btn-0').click()
        cy.get('#ERROR-panel').should("be.visible")
        cy.get('#error-list').should('contain', 'skjema.Tittel')
        cy.get('#error-list').should('contain', 'Valideringsfeil i mottak av instans, \'kilde feilmelding\'')
        cy.get('#error-dialog-close-btn').click()
    })

    it('it should post correct id for retry', () => {
        prep()
        cy.viewport(3000, 2000)
        cy.get('#retry-btn-0').click()
        cy.wait('@postRetry')
    })
});
