import React from 'react';
import {Link} from "react-router-dom";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import ReceiptIcon from '@mui/icons-material/Receipt';

const MenuItems = () => {
    return (
        <List id="menuList">
            <ListItem button component={Link} to={'/'} id={'DashboardButton'}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} id={'DashboardButtonText'}/>
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to={'/new_integration'} id={'NewButton'}>
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary={'Ny integrasjon'} id={'NewButtonText'}/>
            </ListItem>
            <ListItem button component={Link} to={'/new_integration'} id={'IntegrationOverviewButton'}>
                <ListItemIcon>
                    <SyncIcon/>
                </ListItemIcon>
                <ListItemText primary={'Integrasjonsoversikt'} id={'IntegrationOverviewButtonText'}/>
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to={'/log_page'} id={'LogButton'}>
                <ListItemIcon>
                    <ReceiptIcon/>
                </ListItemIcon>
                <ListItemText primary={'Logg'} id={'LogButtonText'}/>
            </ListItem>
        </List>
    );
};

export default MenuItems;