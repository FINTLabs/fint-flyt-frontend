// noinspection DuplicatedCode

import { mockGenericSourceApplicationRepository, mockGenericAuthorizationRepository, mockGenericIntegrationRepository,
    mockGenericValueConvertingRepository
} from '../utils/interceptions.js';

describe('Testing create new integration', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericValueConvertingRepository();
    })

    function prep() {
        cy.visit('/integration/new')
    }

    it('should open and show form', () => {
        prep()
        cy.get('#integration-form').should('be.visible')
    })

    it('should fill form', () => {
        prep()
        cy.wait('@sourceApplications');
        cy.get('#sourceApplicationId')
            .find('option')
            .should('have.length', 6);

        cy.get('#sourceApplicationId').select('2');
        cy.get('#sourceApplicationId').should('have.value', '2');
        cy.get('#sourceApplicationId  option:selected').should('have.text', 'eGrunnerverv');

        cy.wait('@getAllIntegrationBySourceApplicationId');

        cy.get('#sourceApplicationIntegrationId').find('option').should('have.length', 3);
        cy.get('#sourceApplicationIntegrationId').select('sak');
        cy.get('#sourceApplicationIntegrationId').should('have.value', 'sak');
        cy.get('#sourceApplicationIntegrationId  option:selected').should(
            'have.text',
            '[sak] Arkivsak'
        );

        cy.get('#destination').select('fylkesrad');
        cy.get('#destination').should('have.value', 'fylkesrad');
        cy.get('#destination  option:selected').should('have.text', 'Arkivsystem');
    })

    it('should not allow submit on incomplete form', () => {
        prep()
        cy.get('#sourceApplicationId').select('2')
        cy.get('#sourceApplicationIntegrationId').select('sak')
        cy.get('#form-settings-confirm-btn').should('be.disabled')
    })

    it('should submit complete form and navigate to configuration form', () => {
        prep()
        cy.wait('@sourceApplications');
        cy.get('#sourceApplicationId');
        cy.get('#sourceApplicationId').select('2');
        cy.get('#sourceApplicationIntegrationId').select('sak');
        cy.get('#destination').select('fylkesrad');
        cy.get('#form-settings-confirm-btn').click()
        cy.wait('@postIntegration').its('request.body').should('deep.equal', {
                "sourceApplicationId": "2",
                "sourceApplicationIntegrationId": "sak",
                "destination": "fylkesrad",
                "state": "DEACTIVATED"
            }
        )
        cy.url().should('contain', '/configuration/new');
    })
});