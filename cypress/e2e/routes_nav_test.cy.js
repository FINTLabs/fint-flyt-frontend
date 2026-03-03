import {
    mockGenericAuthorizationRepository,
    mockGenericInstanceFlowTrackingRepository,
    mockGenericIntegrationRepository,
} from '../utils/interceptions.js';

describe('Testing Appbar', () => {
    const links = [
        '/integration/configuration/list',
        '/integration/instance/list',
        '/valueconverting',
        '/changelog',
    ];

    const allPages = [
        { linkName: 'dashboard', displayName: 'Dashbord' },
        { linkName: 'integrations', displayName: 'Integrasjoner' },
        { linkName: 'instances', displayName: 'Instanser' },
        { linkName: 'valueConverting', displayName: 'Verdikonvertering' },
        { linkName: 'version', displayName: 'Endringslogg' },
        { linkName: 'useraccess', displayName: 'Brukertilgang' },
    ];

    beforeEach(() => {
        mockGenericAuthorizationRepository()
        mockGenericIntegrationRepository();
        mockGenericInstanceFlowTrackingRepository();
    });

    function prep() {
        cy.visit('/');
    }

    it('all header links should exist and have correct text', () => {
        prep();

        cy.wrap(allPages).each((page) => {
            cy.get(`[data-testid="appbar-link-${page.linkName}"]`)
                .should('exist')
                .and('have.text', page.displayName);
        });
    });
});
