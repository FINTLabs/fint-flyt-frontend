import React from 'react';
import {Link} from "react-router-dom";
import {Icon, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import routes from "./Routes";
import { useTranslation } from 'react-i18next';

const MenuItems = () => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'menuItems'});

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    console.log(routes)

    return (
        <List id="menuList">
            {routes.filter(route => route.inNavigationMenu).map((route, index) => (
                <ListItemButton
                    component={Link}
                    to={route.path}
                    id={route.name + 'Button'}
                    key={route.name}
                    selected={selectedIndex === index}
                    onClick={(event: any) => handleListItemClick(event, index)}
                >
                    <ListItemIcon>
                        <Icon>{route.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={t(route.name)} id={route.name + 'ButtonText'}/>
                </ListItemButton>
            ))}
        </List>
    );
};

export default MenuItems;
