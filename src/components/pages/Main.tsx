import React, { useContext, useEffect } from 'react';
import ConfigurationProvider from '../../context/ConfigurationContext';
import Router from '../../routes/Router';
import { Page } from '@navikt/ds-react';
import { AppBar } from '../organisms/AppBar';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import Footer from '../templates/Footer';

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
