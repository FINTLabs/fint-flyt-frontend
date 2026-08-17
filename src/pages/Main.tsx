import { Page } from '@navikt/ds-react';
import React, { useContext, useEffect } from 'react';

import Router from '../routes/Router';
import { AppBar } from '../shared/components/appMenu/AppBar';
import Footer from '../shared/components/layout/Footer';
import { AuthorizationContext } from '../shared/context/AuthorizationContext';

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
                    activeUserSourceApps !== undefined && <Router />}
            </Page.Block>
        </Page>
    );
}

export default Main;
