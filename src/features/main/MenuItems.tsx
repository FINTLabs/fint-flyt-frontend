import React from 'react';
import { useHistory } from 'react-router-dom';
import routes from './Routes';
import { useTranslation } from 'react-i18next';
import { Button, ToggleGroup } from '@navikt/ds-react';
const MenuItems = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'menuItems' });
    const history = useHistory();
    return (
        <ToggleGroup onChange={() => React.Children} >
            {routes
                .filter(route => route.inNavigationMenu)
                .map((route) => (
                    <Button size={"small"}
                        variant={'tertiary-neutral'}
                        onClick={() => {
                            history.push(route.path);
                        }}
                        key={route.name}>
                        {t(route.name)}
                    </Button>
                ))}
        </ToggleGroup>
    );
};
export default MenuItems;
