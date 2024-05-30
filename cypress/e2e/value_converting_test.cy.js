function prep() {
    cy.intercept("GET", "**/authorization/user/check-authorized", {fixture: "auth.json"}).as("getAuth")
    cy.intercept("GET", "**/authorization/adminuser/check-is-admin", {fixture: "user.json"}).as("getUser")
    cy.intercept("GET", "**/authorization/user/permission", {fixture: "permission.json"}).as("getPermission")
    cy.intercept("GET", "**/authorization/usersourceapplications", {fixture: "userSourceApplications.json"}).as("getUserSourceApplications")
    cy.intercept('GET', '**/api/application/configuration', {
        forceNetworkError: true,
        fixture: 'basepathConfig.json'
    }).as('getConfig')
    cy.visit('/valueconverting');
    cy.wait('@getConfig')
}

describe('Testing value converting page', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', {fixture: 'valueconverting/valueconverting1.json'}).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', {fixture: 'kodeverk/format.json'}).as('getFormat')
        cy.intercept('POST', '**/value-convertings', {fixture: 'postFixture.json'}).as('postValueconverting')
    })

    it('should show page with table and content', () => {
        prep()
        cy.get('#value-convertings-table').should("be.visible")
        cy.get('#new-button').should("be.visible")
    })
});

describe('Testing value converting table', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertingsWithMaps.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', {fixture: 'valueconverting/valueconverting1.json'}).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', {fixture: 'kodeverk/format.json'}).as('getFormat')
        cy.intercept('POST', '**/value-convertings', {fixture: 'postFixture.json'}).as('postValueconverting')
    })

    it('should show page and show panel on expand click', () => {
        prep()
        cy.get('#table-row-1 > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button').click()
        cy.get('#value-converting-panel-1')
    })

    it('should navigate to page 2 on more than 8 value convertings', () => {
        prep()
        cy.get('#table-row-0 > :nth-child(3)').should("contain.text", "test t2t")
        cy.get(':nth-child(3) > .navds-pagination__item').click()
        cy.get('#table-row-0 > :nth-child(3)').should("contain.text", "test9 next page")
    })
});

describe('Testing create new value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertings.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', {fixture: 'valueconverting/valueconverting1.json'}).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', {fixture: 'kodeverk/format.json'}).as('getFormat')
        cy.intercept('POST', '**/value-convertings', {fixture: 'postFixture.json'}).as('postValueconverting')
    })

    it('should open and fill new converting form', () => {
        prep()
        cy.get('#new-button').click()
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
        cy.get('#convertingArray\\.0\\.from').type('test')
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type('doc').type('{downArrow}').type('{enter}')
        cy.get('#submit-button').click()
        cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
                convertingMap: {test: 'kodeverk/format/systemid/DOCX'},
                displayName: "testkonvertering",
                fromApplicationId: "1",
                fromTypeId: "mediatype",
                toApplicationId: "fylkesrad",
                toTypeId: "filformat"
            }
        )
    })

    it('should fail when trying to save new value converting without all required fields', () => {
        prep()
        cy.get('#new-button').click()
        cy.get('#displayName').type('testkonvertering', {delay: 0})
        cy.get('#fromApplicationId').click()
        cy.get('#menu-fromApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#fromTypeId').click()
        cy.get('#menu-fromTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#toApplicationId').click()
        cy.get('#menu-toApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('#submit-button').click()
        cy.get('#from-to-container > :nth-child(2) > .navds-vstack > :nth-child(2)').should("contain.text", 'Påkrevd felt')
    })

});

describe('Testing create new based on existing value converting', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/value-convertings?page=0&size=100&sortProperty=id&sortDirection=DESC&excludeConvertingMap=false', {fixture: 'valueconverting/valueconvertingsWithMaps.json'}).as('getValueconvertings')
        cy.intercept('GET', '**/value-convertings/1', {fixture: 'valueconverting/valueconverting1.json'}).as('getValueconverting')
        cy.intercept('GET', '**/arkiv/kodeverk/format', {fixture: 'kodeverk/format.json'}).as('getFormat')
        cy.intercept('POST', '**/value-convertings', {fixture: 'postFixture.json'}).as('postValueconverting')
    })

    it('should open and fill converting form based on existing', () => {
        prep()
        cy.get('#table-row-0 > :nth-child(8) > .navds-dropdown__toggle').click()
        cy.get('#table-row-0 > :nth-child(8) > .navds-popover > .navds-dropdown__list > .navds-dropdown__list-item > .navds-dropdown__item').click()
        cy.get('#add-icon').click()
        cy.get('#convertingArray\\.1\\.from').type('test2')
        cy.get('#convertingArray\\.1\\.to').type('html')
        cy.get('#submit-button').click()
        cy.wait('@postValueconverting').its('request.body').should('deep.equal', {
                convertingMap: {
                    test: 'kodeverk/format/systemid/M2V',
                    test2: 'html'
                },
                displayName: "test t2t",
                id: 1,
                fromApplicationId: 2,
                fromTypeId: "text",
                toApplicationId: "fylkesrad",
                toTypeId: "text"
            }
        )
    })
});

