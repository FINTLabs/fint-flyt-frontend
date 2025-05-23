import { useNavigate } from 'react-router-dom';
import routes from '../../routes/Routes';
import { useTranslation } from 'react-i18next';
import { InternalHeader } from '@navikt/ds-react';
import { useContext } from 'react';
import { AuthorizationContext } from '../../context/AuthorizationContext';

const MenuItems = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'menuItems' });
    const { hasAccessToUserPermissionPage } = useContext(AuthorizationContext);
    const history = useNavigate();
    return (
        <>
            {routes
                .filter((route) => route.inNavigationMenu)
                .map((route) => (
                    <InternalHeader.Button
                        key={route.name}
                        onClick={() => {
                            history(route.path);
                        }}>
                        {t(route.name)}
                    </InternalHeader.Button>
                ))}
            {hasAccessToUserPermissionPage && (
                <InternalHeader.Button
                    key={'useraccess'}
                    onClick={() => {
                        history('/useraccess');
                    }}>
                    {t('useraccess')}
                </InternalHeader.Button>
            )}
        </>
    );
};
export default MenuItems;
