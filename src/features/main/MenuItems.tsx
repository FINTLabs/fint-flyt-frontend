import React from 'react';
import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import routes from "./Routes";
import {useTranslation} from 'react-i18next';
import MuiList from '@mui/material/List';
import {styled} from "@mui/styles";

const MenuItems = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'menuItems'});

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const List = styled(MuiList)({
        color: 'white',
        '&& .Mui-selected, && .Mui-selected:hover': {
            backgroundColor: 'teal',
            borderRadius: 4,
            '&, & .MuiListItemIcon-root': {
                color: 'white',
            },
        },
        '& .MuiListItemButton-root:hover': {
            backgroundColor: 'lightgray',
            borderRadius: 4,
            '&, & .MuiListItemIcon-root': {
                color: 'black',
            },
        },
    });

    return (
        <List id="menuList" sx={{display: 'flex', flexDirection: 'row', padding: 0}}>
            {routes.filter(route => route.inNavigationMenu).map((route, index) => (
                <ListItem key={route.name} sx={{padding: 0, paddingRight: 2, width: 'fit-content'}}>
                    <ListItemButton
                        component={Link}
                        to={route.path}
                        id={route.name + 'Button'}
                        selected={selectedIndex === index}
                        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleListItemClick(event, index)}
                    >
                        <ListItemText sx={{justifyItems: 'center'}} primary={t(route.name)}
                                      id={route.name + 'ButtonText'}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default MenuItems;
