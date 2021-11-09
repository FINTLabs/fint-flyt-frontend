import React from 'react';
import {Link} from "react-router-dom";
import {Icon, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import routes from "../util/routes";

const MenuItems = () => {
    return (
    <List id="menuList">
        {routes.map((route) => (
            <ListItem button component={Link} to={route.path} id={route.name + 'Button'}>
                <ListItemIcon>
                    <Icon>{route.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={route.name} id={route.name + 'ButtonText'}/>
            </ListItem>
        ))}
    </List>
    );
};

export default MenuItems;