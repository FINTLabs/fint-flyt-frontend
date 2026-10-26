import {
    mockGenericSourceApplicationRepository,
    mockGenericAuthorizationRepository,
    mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
    mockSelectablesFromInstanceFlowTrackingRepository,
    mockGenericInstanceRepository,
} from '../utils/interceptions.js';

describe('Testing instance list', () => {
    beforeEach(() => {
        mockGenericAuthorizationRepository();
        mockSelectablesFromInstanceFlowTrackingRepository();
        mockGenericIntegrationRepository();
        mockGenericSourceApplicationRepository();
        mockGenericInstanceFlowTrackingRepository();
        mockGenericInstanceRepository();
    });

    function prep() {
        cy.visit('/integration/instance/list');
    }

    it('should open and show table and content', () => {
        prep();
        cy.get('#instance-table').should('be.visible');
        cy.get('#instance-table thead tr th').should('have.length', 10);
        cy.get('#instance-table > tbody > tr').should('have.length', 20); // 20 because it is an expandable table

        // Status icon should have aria-label
        cy.get('#instance-table > tbody > :first-child > :nth-child(8) > div').should(
            'have.attr',
            'aria-label',
            'Overført'
        );

        cy.get('#instance-table > tbody > :nth-child(7) > :nth-child(8) > div').should(
            'have.attr',
            'aria-label',
            'Feilet'
        );
    });

    it('instance table should contain correct headers', () => {
        prep();
        cy.get('#instance-table').should('be.visible');
        let columns = [
            'Kildeapplikasjon',
            'Integrasjonsnavn',
            'Kildeapp. integrasjon-id',
            'Kildeapp. instans-id',
            'Tidspunkt',
            'Status',
            'Mellomlagring',
            'Destinasjons instans-id',
            ''
        ];
        columns.forEach((column) => {
            cy.get('#instance-table > :nth-child(1)').should('contain.text', column);
        });
        cy.get('#instance-table > :nth-child(1)').should('not.contain.text', 'not_a_column');
        cy.wait('@getMetadata');
    });

    it('open table and check for content in panel', () => {
        prep();
        cy.viewport(3000, 2000);

        cy.get('#instance-row-0').should('be.visible');
        cy.get('#instance-panel-0').should('not.exist');
        cy.get('#instance-row-0').click();
        cy.get('#instance-panel-0').should('be.visible');
        cy.get('#instance-panel-0 tbody tr').should('have.length', 2);
        cy.get('#instance-panel-0 tbody tr')
            .first()
            .find('a')
            .should('contain.text', 'Vis feilmelding');
    });

    it('should not show createdBy column when no events are triggered by a user', () => {
        prep();
        cy.viewport(3000, 2000);

        cy.get('#instance-row-0').click();
        cy.wait('@getHendelser');
        cy.get('#instance-panel-0').should('be.visible');
        cy.get('#instance-panel-0 thead').should('not.contain.text', 'Utført av');
    });

    it('should show createdBy column and user name when an event is triggered by a user', () => {
        cy.intercept(
            'GET',
            '**/instance-flow-tracking/events?size=10&sort=timestamp%2Cdesc&sourceApplicationId=2&sourceApplicationInstanceId=*&sourceApplicationIntegrationId=journalpost',
            { fixture: 'hendelserWithUser.json' }
        ).as('getHendelserWithUser');

        prep();
        cy.viewport(3000, 2000);

        cy.get('#instance-row-0').click();
        cy.wait('@getHendelserWithUser');
        cy.get('#instance-panel-0').should('be.visible');
        cy.get('#instance-panel-0 thead').should('contain.text', 'Utført av');
        cy.get('#instance-panel-0 tbody tr')
            .first()
            .should('contain.text', 'Test Testesen');
        cy.get('#instance-panel-0 tbody tr')
            .eq(1)
            .find('td')
            .eq(2)
            .should('have.text', '');
    });

    it('should show name and comment link when present, and hide them when absent', () => {
        cy.intercept(
            'GET',
            '**/instance-flow-tracking/events?size=10&sort=timestamp%2Cdesc&sourceApplicationId=2&sourceApplicationInstanceId=*&sourceApplicationIntegrationId=journalpost',
            { fixture: 'hendelserWithUserAndComment.json' }
        ).as('getHendelserWithUserAndComment');

        prep();
        cy.viewport(3000, 2000);

        cy.get('#instance-row-0').click();
        cy.wait('@getHendelserWithUserAndComment');
        cy.get('#instance-panel-0').should('be.visible');
        cy.get('#instance-panel-0 thead').should('contain.text', 'Utført av');

        cy.get('#instance-panel-0 tbody tr')
            .first()
            .find('td')
            .eq(2)
            .as('userCell');
        cy.get('@userCell').should('contain.text', 'Test Testesen');
        cy.get('@userCell').find('a').should('contain.text', 'Vis kommentar').click();
        cy.contains('Manuelt overført etter feil i mapping').should('be.visible');
        cy.get('.navds-modal__footer').contains('button', 'Lukk').click();

        cy.get('#instance-panel-0 tbody tr')
            .eq(1)
            .find('td')
            .eq(2)
            .as('systemCell');
        cy.get('@systemCell').should('not.contain.text', 'Test Testesen');
        cy.get('@systemCell').should('not.contain.text', 'Vis kommentar');
        cy.get('@systemCell').find('a').should('not.exist');
    });

    it('it should post correct id for retry', () => {
        prep();

        cy.viewport(3000, 2000);
        cy.get('#3-action-toggle > button').click();
        cy.get('#retryButton').click();

        cy.wait('@postRetry').its('response.statusCode').should('be.oneOf', [200])
    });

    it('should show the filters form in modal when the Filters button is clicked', () => {
        prep();

        cy.get('[data-testid="filters-form"]').should('not.exist'); // Adjust selector as needed
        cy.get('[data-testid="filters-form-button"]').should('have.text', 'Filtrer tabellen');

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="filters-form"]').should('be.visible');
    });

    it('should open filter menu and ann selected filters to toolbar', () => {
        prep();

        cy.get('[data-testid="active-filters"]').should('have.text', 'Ingen aktive filtre');


        cy.get('[data-testid="filters-form-button"]').click();

        cy.get('[data-testid="time-filter"]').should('exist');
        cy.get('[data-testid="time-filter"]').click();

        cy.get('[data-testid="integration-filter"]').should('exist');
        cy.get('[data-testid="integration-filter"]').click();

        cy.get('[data-testid="instance-filter"]').should('exist');
        cy.get('[data-testid="instance-filter"]').click();

        cy.get('[data-testid="status-filter"]').should('exist');
        cy.get('[data-testid="status-filter"]').click();
        cy.get('[data-testid="status-options"] > .navds-checkboxes').children().should('have.length', 4);
        cy.get('[data-testid="status-option-1"]').click();

        cy.get('[data-testid="advanced-filter"]').should('exist');
        cy.get('[data-testid="advanced-filter"]').click();

        cy.contains('button', 'Tilbakestill').should('be.visible');
        cy.get('[data-testid="filters-submit"]').should('have.text', 'Søk');

    });

    it('should show icon indicating active filters', () => {
        prep();

        cy.get('[data-testid="filters-form-button"]').click();
        cy.get('[data-testid="status-filter"]').click();
        cy.get('[data-testid="status-option-1"]').click();
        cy.get('[data-testid="filters-submit"]').click();

        cy.wait('@newSummariesWithFilter').then((interception) => {
            expect(interception).to.exist;
            expect(interception.response.statusCode).to.eq(200);
        });

            cy.get('[data-testid="active-filters"] > ul > li').should('have.length', 1);
            cy.get('[data-testid="active-filters"] > ul > li').first().should('have.text', 'Status: Overført');

            cy.get('[data-testid="active-filters"] > button').click();
            cy.get('[data-testid="active-filters"]').should('have.text', 'Ingen aktive filtre');

    });
});
