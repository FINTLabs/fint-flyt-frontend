import { useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router';
import { Dropdown, Hide, InternalHeader, Show } from '@navikt/ds-react';
import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/Routes';
import { AuthorizationContext } from '../../context/AuthorizationContext';

const MenuItems = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'menuItems' });
    const { hasAccessToUserPermissionPage } = useContext(AuthorizationContext);
    const navigate = useNavigate();
    return (
        <>
            <Dropdown>
                <Show below="lg" asChild>
                    <InternalHeader.Button as={Dropdown.Toggle}>
                        <MenuHamburgerIcon style={{ fontSize: '1.5rem' }} title="Menu" />
                    </InternalHeader.Button>
                </Show>

                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        {routes
                            .filter((route) => route.inNavigationMenu)
                            .map((route) => (
                                <Dropdown.Menu.GroupedList.Item
                                    as={RouterLink}
                                    to={route.path}
                                    key={route.name}
                                >
                                    {t(route.name)}
                                </Dropdown.Menu.GroupedList.Item>
                            ))}
                        {hasAccessToUserPermissionPage && (
                            <Dropdown.Menu.GroupedList.Item
                                key={'useraccess'}
                                as={RouterLink}
                                to={'/useraccess'}
                            >
                                {t('useraccess')}
                            </Dropdown.Menu.GroupedList.Item>
                        )}
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
            {routes
                .filter((route) => route.inNavigationMenu)
                .map((route) => (
                    <Hide below="lg" asChild key={route.name}>
                        <InternalHeader.Button
                            data-testid={`appbar-link-${route.name}`}
                            onClick={() => {
                                navigate(route.path);
                            }}
                        >
                            {t(route.name)}
                        </InternalHeader.Button>
                    </Hide>
                ))}
            {hasAccessToUserPermissionPage && (
                <Hide below="lg" asChild key={'useraccess'}>
                    <InternalHeader.Button
                        data-testid={'appbar-link-useraccess'}
                        onClick={() => {
                            navigate('/useraccess');
                        }}
                    >
                        {t('useraccess')}
                    </InternalHeader.Button>
                </Hide>
            )}
        </>
    );
};
export default MenuItems;
