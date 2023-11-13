import React from 'react';
import {Link} from "react-router-dom";
import {Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import routes from "./Routes";
import {useTranslation} from 'react-i18next';

const MenuItems = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'menuItems'});

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <List id="menuList">
            {routes.filter(route => route.inNavigationMenu).map((route, index) => (
                <ListItem key={route.name} sx={{padding: 0}}>
                    <ListItemButton
                        component={Link}
                        to={route.path}
                        id={route.name + 'Button'}
                        selected={selectedIndex === index}
                        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleListItemClick(event, index)}
                    >
                        <ListItemIcon>
                            <Icon>{route.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={t(route.name)} id={route.name + 'ButtonText'}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default MenuItems;
