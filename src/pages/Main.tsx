import { Page } from '@navikt/ds-react';
import React, { useContext, useEffect } from 'react';

import Router from '../routes/Router';
import { AppBar } from '../shared/components/appMenu/AppBar';
import { AuthorizationContext } from '../shared/context/AuthorizationContext';
import ConfigurationProvider from '../shared/context/ConfigurationContext';
import Footer from '../shared/components/layout/Footer';

function Main() {
    const {
        activeUserSourceApps,
        getUser,
        hasAccessToUserPermissionPage,
        getActiveUserSourceApps,
    } = useContext(AuthorizationContext);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);

    useEffect(() => {
        getUser();
        getAuthorization();
        getActiveUserSourceApps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page footer={<Footer />}>
            {hasAccessToUserPermissionPage !== undefined && <AppBar />}
            <Page.Block as="main">
                {authorized !== undefined &&
                    hasAccessToUserPermissionPage !== undefined &&
                    activeUserSourceApps !== undefined && (
                        <ConfigurationProvider>
                            <Router />
                        </ConfigurationProvider>
                    )}
            </Page.Block>
        </Page>
    );
}

export default Main;
