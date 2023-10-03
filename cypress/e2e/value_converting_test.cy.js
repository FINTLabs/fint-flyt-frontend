function prep() {
    cy.intercept('GET', '**/api/application/configuration', { forceNetworkError: true, fixture: 'basepathConfig.json' }).as('getConfig')
    cy.visit('/valueconverting');
    cy.wait('@getConfig')
}

describe('Testing value converting page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', { fixture: 'valueconverting/valueconverting1.json' }).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', { fixture: 'kodeverk/format.json' }).as('getFormat')
        cy.intercept('POST', '**/value-convertings', { fixture: 'postFixture.json' }).as('postValueconverting')
    })

    it('should show page and table', () => {
        prep()
        cy.get('.MuiDataGrid-root').should('be.visible')
    })

    it('should show view value converting page', () => {
        prep()
        cy.get('[data-id="1"] > .MuiDataGrid-cell--withRenderer > .MuiButtonBase-root').click()
        cy.get('#cancel-button').click()
    })
});

describe('Testing create new value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
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


describe('Testing create new based on existing value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=fromApplicationId&sortDirection=ASC&excludeConvertingMap=true', { fixture: 'valueconverting/valueconvertings.json' }).as('getValueconvertings')
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

