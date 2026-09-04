import {
    mockGenericAuthorizationRepository, mockGenericResourceRepository,
    mockGenericValueConvertingRepository,
} from '../utils/interceptions.js';

describe('Testing value converting page', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericValueConvertingRepository();
        mockGenericResourceRepository();
    });

    function prep() {
        cy.visit('/valueconverting');
    }

    it('should show page with table and button', () => {
        prep();
        cy.get('#value-convertings-table').should('be.visible');
        cy.get('#new-button').should('be.visible');
    });

    it('should expand panel and show correct content', () => {
        prep();
        cy.get(
            '#table-row-0 > .navds-table__toggle-expand-cell > .navds-table__toggle-expand-button'
        ).click();
        cy.get('#value-converting-panel-0 h1').should('have.text', 'Konvertering(er)');
        cy.get('#value-converting-panel-0 table tbody tr').should('have.length', 3);
    });

    it('should navigate to page 2 on more than 8 value convertings', () => {
        prep();
        cy.get('#table-row-0 > :nth-child(3)').should('contain.text', 'dokumenttype til dokumenttype v1');
        cy.get(':nth-child(3) > .navds-pagination__item').click();
        cy.get('#table-row-0 > :nth-child(3)').should('contain.text', 'journalposttype til dokumenttype v1');
    });

    it('should open and fill new converting form', () => {
        prep();
        cy.get('#new-button').click();
        cy.get('#displayName').type('testkonvertering', { delay: 0 });
        cy.get('#fromApplicationId').click();
        cy.get('#menu-fromApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#fromTypeId').click();
        cy.get('#menu-fromTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#toApplicationId').click();
        cy.get('#menu-toApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#toTypeId').click();
        cy.get('#menu-toTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#add-icon').click();
        cy.get('#convertingArray\\.0\\.from').type('test');
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root')
            .click()
            .type('doc')
            .type('{downArrow}')
            .type('{enter}');
        cy.get('#submit-button').click();
        cy.wait('@postValueconverting')
            .its('request.body')
            .should('deep.equal', {
                convertingMap: { test: 'kodeverk/format/systemid/DOCX' },
                displayName: 'testkonvertering',
                fromApplicationId: '1',
                fromTypeId: 'mediatype',
                toApplicationId: 'fylkesrad',
                toTypeId: 'filformat',
            });
    });

    it('should fail when trying to save new value converting without all required fields', () => {
        prep();
        cy.get('#new-button').click();
        cy.get('#displayName').type('testkonvertering', { delay: 0 });
        cy.get('#fromApplicationId').click();
        cy.get('#menu-fromApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#fromTypeId').click();
        cy.get('#menu-fromTypeId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#toApplicationId').click();
        cy.get('#menu-toApplicationId > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get('#submit-button').click();
        cy.get('#from-to-container > :nth-child(2) > .navds-vstack > :nth-child(2)').should(
            'contain.text',
            'Påkrevd felt'
        );
    });

    it('should open and fill converting form based on existing', () => {
        prep();
        cy.get('#table-row-0')
        cy.get('#table-row-0 #value-converting-1-action-toggle > button').click();
        cy.get('[data-testid="action-menu-content"]')
            .contains('Lag ny basert på denne')
            .click();
        cy.wait('@getValueconverting');
        cy.get('#add-icon').click();
        cy.get('#convertingArray\\.1\\.from').type('test2');
        cy.get('#convertingArray\\.1\\.to').type('html');
        cy.get('#submit-button').click();

        cy.get('#name-container #error-message').should('contain.text', 'Navn må være unikt');
        cy.get('#displayName').type(' ny versjon', { delay: 0 });
        cy.get('#submit-button').click();

        cy.wait('@postValueconverting')
            .its('request.body')
            .should('deep.equal', {
                convertingMap: {
                    test: 'kodeverk/format/systemid/M2V',
                    test2: 'html',
                },
                displayName: 'dokumenttype til dokumenttype v1 ny versjon',
                id: 1,
                fromApplicationId: 2,
                fromTypeId: 'text',
                toApplicationId: 'fylkesrad',
                toTypeId: 'text',
            });
    });

    it('should show optional columns when sorted or filtered by related fields', () => {
        prep();
        cy.get('#value-convertings-table thead').should('not.contain', 'Opprettet');
        cy.get('#value-convertings-table thead').should('not.contain', 'Til');

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="filters-form"] select').select('fylkesrad');
        cy.get('[data-testid="filters-submit"]').click();
        cy.get('#value-convertings-table thead').should('contain', 'Til');

        cy.contains('button', 'Sorter').click();
        cy.contains('[role="menuitemradio"]', 'Opprettet').click();
        cy.get('#value-convertings-table thead').should('contain', 'Opprettet');
    });
});
