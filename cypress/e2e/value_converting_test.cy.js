function prep() {
    cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
    cy.visit('/valueconverting');
    cy.wait('@getConfig')
}

describe('Testing value converting page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', { fixture: 'valueconverting/valueconverting1.json' }).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as('getFormat')
        cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as('postValueconverting')
    })

    it('should show page with table and content', () => {
        prep()
        cy.get('#value-converting-panel-header').should("be.visible")
        cy.get('#value-convertings-table').should("be.visible")
      cy.get('#new-button').should("be.visible")
    })
});

describe('Testing value converting table', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertingsWithMaps.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', { fixture: 'valueconverting/valueconverting1.json' }).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as('getFormat')
        cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as('postValueconverting')
    })

    it('should show page and show panel on expand click', () => {
        prep()
        cy.get('#table-row-1 > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get('#rg > .navds-table__expanded-row-cell > .navds-table__expanded-row-collapse > .navds-table__expanded-row-content > #value-converting-panel').should("be.visible")
    })

    it('should navigate to page 2 on more than 8 value convertings', () => {
        prep()
        cy.get('#table-row-0 > :nth-child(2)').should("contain.text", "test t2t")
        cy.get(':nth-child(3) > .navds-pagination__item').click()
        cy.get('#table-row-0 > :nth-child(2)').should("contain.text", "test9 next page")
  })
});

describe.skip('Testing create new value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', { fixture: 'valueconverting/valueconverting1.json' }).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as('getFormat')
        cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as('postValueconverting')
    })

    it('should open and fill new converting form', () => {
        prep()
        cy.get('#root-button').click()
        cy.get('#blank-button').click()
        cy.get('#displayName').type('testkonvertering', {delay: 0})
        cy.get('#fromApplicationId').click()
        cy.get('#menu-fromApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#fromTypeId').click()
        cy.get('#menu-fromTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#toApplicationId').click()
        cy.get('#menu-toApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#toTypeId').click()
        cy.get('#menu-toTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#add-icon').click()
        cy.get('#list-item-0').type('test')
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type('doc').type('{downArrow}').type('{enter}')
        cy.get('#submit-button').click()
        cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
                convertingMap: {test: 'kodeverk/format/systemid/DOCX'},
                displayName: "testkonvertering",
                fromApplicationId: "1",
                fromTypeId:"mediatype",
                toApplicationId: "fylkesrad",
                toTypeId: "filformat"
            }
        )
    })

});


describe.skip('Testing create new based on existing value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', { fixture: 'valueconverting/valueconverting1.json' }).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as('getFormat')
        cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as('postValueconverting')
    })

    it('should open and fill converting form based on existing', () => {
        prep()
        cy.get('#root-button').click()
        cy.get('#based-on-button').click()
        cy.get('#version-button-0').click()
        cy.get('#add-icon').click()
        cy.get('#list-item-1').type('test2')
        cy.get('#convertingArray\\.1\\.to').type('html')
        cy.get('#submit-button').click()
        cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
                convertingMap: {
                    test: 'kodeverk/format/systemid/M2V',
                    test2: 'html'},
                displayName: "test t2t",
                id: 1,
                fromApplicationId: 2,
                fromTypeId:"text",
                toApplicationId: "fylkesrad",
                toTypeId: "text"
            }
        )
    })
});

